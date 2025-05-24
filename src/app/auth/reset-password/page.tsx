import { ResetPasswordView } from "@/features/auth/reset-password-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Reset Password",
  description: "Reset your password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams
  const code = (query?.code as string) || '';

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordView code={code} />
      </div>
    </div>
  );
}
