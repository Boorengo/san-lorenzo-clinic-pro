import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/verify");
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl healthcare-gradient">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground">Register as a patient of BHC San Lorenzo Ruiz 1</p>
        </div>

        <form onSubmit={handleRegister} className="rounded-xl border bg-card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">First Name</Label>
              <Input placeholder="Juan" required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Last Name</Label>
              <Input placeholder="Dela Cruz" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input type="email" placeholder="juan@email.com" required />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Password</Label>
            <Input type="password" placeholder="Create a password" required />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Confirm Password</Label>
            <Input type="password" placeholder="Confirm password" required />
          </div>
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" required className="mt-0.5 accent-primary" />
            <p className="text-[11px] text-muted-foreground">
              I agree to the{" "}
              <button type="button" onClick={() => navigate("/terms")} className="text-primary hover:underline">Terms of Service</button>
              {" "}and{" "}
              <button type="button" onClick={() => navigate("/data-privacy")} className="text-primary hover:underline">Data Privacy Policy</button>
            </p>
          </div>
          <Button type="submit" className="w-full healthcare-gradient text-primary-foreground border-0 gap-1.5" disabled={loading}>
            <UserPlus className="h-4 w-4" />
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-primary hover:underline font-medium">Sign in</button>
        </p>
      </div>
    </div>
  );
}
