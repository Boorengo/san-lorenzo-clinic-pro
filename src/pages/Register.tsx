import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, UserPlus, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const benefits = [
  "Access your family health records anytime",
  "View vaccination schedules and reminders",
  "Track health profiles for all family members",
  "Get updates from your Barangay Health Center",
];

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/verify");
    }, 600);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden healthcare-gradient items-center justify-center p-12">
        <div className="hero-blob w-96 h-96 bg-white/10 -top-20 -right-20" style={{ position: "absolute" }} />
        <div className="hero-blob w-72 h-72 bg-white/10 -bottom-10 -left-10" style={{ position: "absolute" }} />
        <div className="relative max-w-md space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shadow-lg">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-2xl font-extrabold text-primary-foreground">Join Our Health Community</h2>
            <p className="text-primary-foreground/80 text-sm mt-2">Create an account and get access to all health services.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground/80 shrink-0" />
                <span className="text-sm text-primary-foreground/90">{b}</span>
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
              <span className="font-display text-sm font-bold text-foreground">BHC San Lorenzo Ruiz 1</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Create Account</h2>
            <p className="text-sm text-muted-foreground mt-1">Register as a patient of BHC San Lorenzo Ruiz 1</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">First Name</Label>
                <Input placeholder="Juan" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Last Name</Label>
                <Input placeholder="Dela Cruz" required className="h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Email</Label>
              <Input type="email" placeholder="juan@email.com" required className="h-11" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Create a password" required className="h-11 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Confirm Password</Label>
              <div className="relative">
                <Input type={showConfirm ? "text" : "password"} placeholder="Confirm password" required className="h-11 pr-10" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" required className="mt-1 accent-primary h-4 w-4 rounded" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <button type="button" onClick={() => navigate("/terms")} className="text-primary hover:underline font-medium">Terms of Service</button>
                {" "}and{" "}
                <button type="button" onClick={() => navigate("/data-privacy")} className="text-primary hover:underline font-medium">Data Privacy Policy</button>
              </p>
            </div>
            <Button type="submit" className="w-full h-11 healthcare-gradient text-primary-foreground border-0 gap-2 shadow-md hover:shadow-lg transition-shadow" disabled={loading}>
              <UserPlus className="h-4 w-4" />
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary hover:underline font-medium">Sign in</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
