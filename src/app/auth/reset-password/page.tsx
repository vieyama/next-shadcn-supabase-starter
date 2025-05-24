import { ResetPasswordView } from "@/features/auth/reset-password-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};
interface ResetPasswordPageProps {
  searchParams: { code?: string };
}

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
  const code = searchParams.code;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordView code={code} />
      </div>
    </div>
  )
}

export default ResetPasswordPage