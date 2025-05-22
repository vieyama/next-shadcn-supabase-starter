import { RegisterView } from "@/features/auth/register-view";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: 'Authentication | Register',
  description: 'Register page for authentication.'
};

const RegisterPage = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterView />
      </div>
    </div>
  )
}

export default RegisterPage