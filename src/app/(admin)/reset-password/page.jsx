// app/reset-password/page.jsx
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
