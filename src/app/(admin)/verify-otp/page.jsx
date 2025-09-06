import { Suspense } from "react";
import VerifyOtpContent from "./VerifyOtpContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading…</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
