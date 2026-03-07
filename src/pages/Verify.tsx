import { useNavigate } from "react-router-dom";
import { Heart, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Verify() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl healthcare-gradient">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold">Verify Your Email</h1>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm text-foreground font-medium">We sent a verification link to your email</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please check your inbox and click the verification link to activate your account. This may take a few minutes.
          </p>
          <div className="pt-2 space-y-2">
            <Button variant="outline" className="w-full text-xs" disabled>
              Resend Verification Email
            </Button>
            <Button variant="ghost" className="w-full text-xs" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
