import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AvatarUpload from "./avatar-upload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UserMetadata } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ userMetaData, userId }: { userMetaData?: UserMetadata, userId?: string }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userMetaData?.fullname || '',
      email: userMetaData?.email || '',
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    const supabase = createClient();
    supabase.auth.updateUser({
      data: {
        fullname: data.name,
      },
    }).then(({ error }) => {
      if (error) {
        toast.error("Error updating profile");
        console.error("Error updating profile:", error);
      } else {
        toast.success("Profile updated successfully");
      }
    });
  }

  const handleAvatarUpload = async (file: File) => {
    const supabase = createClient();
    const bucketName = 'avatars';
    const filePath = `public/${userId}/${Date.now()}-${file.name}`

    supabase.storage.from(bucketName).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(({ data, error }) => {
      if (error) {
        toast.error("Error uploading avatar");
        console.error("Error uploading avatar:", error);
      } else {
        toast.success("Avatar uploaded successfully");
        const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);
        if (!publicUrlData || !publicUrlData.publicUrl) {
          toast.error("Error getting avatar URL");
          console.error("Error getting avatar URL");
        } else {
          // Update user metadata with the new avatar URL
          supabase.auth.updateUser({
            data: {
              avatar: publicUrlData.publicUrl
            },
          });
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information here. This information will be displayed publicly.
        </CardDescription>
      </CardHeader>

      <div className="w-fit mx-auto">
        <AvatarUpload
          initialImage={userMetaData?.avatar}
          onUpload={handleAvatarUpload}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default ProfileForm