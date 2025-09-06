// app/reset-password/page.jsx (Server Component)
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage({ searchParams }) {
  return <ResetPasswordForm searchParams={searchParams} />;
}
