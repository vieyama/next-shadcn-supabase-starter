'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"


const passwordFormSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordViewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  code?: string;
}

export function ResetPasswordView({
  className,
  code,
  ...props
}: ResetPasswordViewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    },
  })

  const supabase = createClient();

  useEffect(() => {
    if (!code) {
      toast.error("Invalid or expired password reset link");
      router.push('/auth/login');
      return;
    }
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        try {
          await supabase.auth.setSession({
            access_token: code,
            refresh_token: "",
          });
          // Optionally, re-check user after setting session
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError || !userData?.user) {
            toast.error("Invalid or expired password reset link");
            router.push('/auth/login');
          }
        } catch (e) {
          toast.error("Invalid or expired password reset link");
          router.push('/auth/login');
        }
      }
    })();
  }, [code, router, supabase]);

  function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsLoading(true);
    supabase.auth.updateUser({ password: values.newPassword })
      .then(({ error }) => {
        setIsLoading(false);
        if (error) {
          toast.error(error.message || 'Failed to reset password');
        } else {
          toast.success('Password has been reset. Please log in.');
          router.push('/auth/login');
        }
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="New Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" isLoading={isLoading} className="cursor-pointer w-full">
                  Send reset password email
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
