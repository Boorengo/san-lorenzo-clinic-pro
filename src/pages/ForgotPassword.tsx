import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Password reset link sent to your email");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl healthcare-gradient">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Email Address</Label>
              <Input type="email" placeholder="juan@email.com" required />
            </div>
            <Button type="submit" className="w-full healthcare-gradient text-primary-foreground border-0 gap-1.5">
              <Mail className="h-4 w-4" />
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="rounded-xl border bg-card p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Check your email</p>
            <p className="text-xs text-muted-foreground">We've sent a password reset link to your email address. Please check your inbox.</p>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          <button onClick={() => navigate("/login")} className="text-primary hover:underline font-medium">Back to login</button>
        </p>
      </div>
    </div>
  );
}
