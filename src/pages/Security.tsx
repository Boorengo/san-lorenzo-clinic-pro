import { Shield, Key, Smartphone, Lock, AlertTriangle, Check, Monitor, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sessions = [
  { device: "Chrome on Windows", location: "Quezon City, PH", current: true, last: "Active now" },
  { device: "Safari on iPhone", location: "Quezon City, PH", current: false, last: "2 hours ago" },
  { device: "Chrome on Android", location: "Manila, PH", current: false, last: "Yesterday" },
];

export default function Security() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Security & Privacy</h1>
        <p className="text-sm text-muted-foreground">Manage authentication, sessions, and data encryption</p>
      </div>

      {/* Password */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Change Password</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Current password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">New password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Confirm password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Password strength</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-3/4 bg-success rounded-full" />
            </div>
            <span className="font-medium text-success">Strong</span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="healthcare-gradient text-primary-foreground border-0">Update password</Button>
        </div>
      </div>

      {/* 2FA */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Two-Factor Authentication</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { name: "Authenticator App", desc: "Google Authenticator, Authy", enabled: true },
            { name: "SMS Code", desc: "One-time code via text", enabled: false },
            { name: "Email Code", desc: "One-time code via email", enabled: false },
          ].map((m) => (
            <div key={m.name} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{m.name}</p>
                <Switch defaultChecked={m.enabled} />
              </div>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
              {m.enabled && (
                <p className="text-[10px] mt-2 text-success flex items-center gap-1"><Check className="h-3 w-3" /> Enabled</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Encryption */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Data Encryption</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Encryption at rest (AES-256)", status: "Active", on: true },
            { label: "TLS 1.3 in transit", status: "Active", on: true },
            { label: "Field-level PHI encryption", status: "Active", on: true },
            { label: "Automatic key rotation (90 days)", status: "Active", on: true },
          ].map((e) => (
            <div key={e.label} className="flex items-center justify-between rounded-lg border px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-sm">{e.label}</span>
              </div>
              <span className="text-xs font-medium text-success flex items-center gap-1">
                <Check className="h-3 w-3" /> {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <div className="rounded-xl border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold">Active Sessions</h3>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
            <LogOut className="h-3.5 w-3.5" /> Sign out all
          </Button>
        </div>
        <div className="space-y-2">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">
                  {s.device}
                  {s.current && <span className="text-[10px] rounded-full bg-primary/10 text-primary px-2 py-0.5">Current</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.location} · {s.last}</p>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="text-destructive text-xs">Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="rounded-xl border bg-warning/5 border-warning/30 p-4 flex gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">Data Privacy Compliance</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            This system follows the Philippine Data Privacy Act of 2012 (RA 10173). Patient data is handled with strict confidentiality and encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
