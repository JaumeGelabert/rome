import AuthHeader from "@/components/auth/AuthHeader";
import SignupForm from "@/components/forms/auth/SignupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-start">
      <AuthHeader
        title="One last thing..."
        subtitle="How should we call you?"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
