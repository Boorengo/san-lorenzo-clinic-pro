import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl healthcare-gradient">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold">BHC San Lorenzo Ruiz 1</h1>
          <p className="text-sm text-muted-foreground">Health Center Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Username</Label>
            <Input placeholder="Enter username" required />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Password</Label>
            <Input type="password" placeholder="Enter password" required />
          </div>
          <Button type="submit" className="w-full healthcare-gradient text-primary-foreground border-0 gap-1.5" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center">
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          </div>
        </form>

        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="text-primary hover:underline font-medium">Register</button>
          </p>
          <p className="text-xs text-muted-foreground">
            Are you a patient?{" "}
            <button onClick={() => navigate("/patient-portal")} className="text-primary hover:underline font-medium">
              Patient Portal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
