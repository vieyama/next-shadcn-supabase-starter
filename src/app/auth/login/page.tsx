import { LoginView } from "@/features/auth/login-view"
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

const LoginPage = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginView />
      </div>
    </div>
  )
}

export default LoginPage