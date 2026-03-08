import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogIn, ArrowLeft, Stethoscope, Shield, Users, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

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
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden healthcare-gradient items-center justify-center p-12">
        <div className="hero-blob w-96 h-96 bg-white/10 -top-20 -left-20" style={{ position: "absolute" }} />
        <div className="hero-blob w-80 h-80 bg-white/10 -bottom-10 -right-10" style={{ position: "absolute" }} />
        <div className="relative text-center space-y-8 max-w-md">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur shadow-lg">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-display text-3xl font-extrabold text-primary-foreground">BHC San Lorenzo Ruiz 1</h1>
            <p className="text-primary-foreground/80 mt-2 text-sm">Health Center Management System</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex justify-center gap-6">
            {[
              { icon: Stethoscope, label: "Consultations" },
              { icon: Shield, label: "Immunization" },
              { icon: Users, label: "Family Planning" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur mb-2">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-medium text-primary-foreground/70">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm space-y-6">
          <div>
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground -ml-2 mb-4" onClick={() => navigate("/")}>
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Button>
            <div className="lg:hidden flex items-center gap-2.5 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl healthcare-gradient shadow-md">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-sm font-bold text-foreground block">BHC San Lorenzo Ruiz 1</span>
                <span className="text-[10px] text-muted-foreground">Health Center</span>
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to the staff dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Username</Label>
              <Input placeholder="Enter username" required className="h-11" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Password</Label>
                <button type="button" onClick={() => navigate("/forgot-password")} className="text-[11px] text-primary hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <Input type="password" placeholder="Enter password" required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 healthcare-gradient text-primary-foreground border-0 gap-2 shadow-md hover:shadow-lg transition-shadow" disabled={loading}>
              <LogIn className="h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or</span></div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full text-xs h-10 gap-1.5" onClick={() => navigate("/register")}>
              Create a new account
            </Button>
            <Button variant="ghost" className="w-full text-xs h-10 gap-1.5 text-primary" onClick={() => navigate("/patient-portal")}>
              <Heart className="h-3.5 w-3.5" /> Go to Patient Portal
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
