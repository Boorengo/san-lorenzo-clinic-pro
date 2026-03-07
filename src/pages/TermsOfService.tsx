import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg healthcare-gradient">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="font-display text-sm font-bold">Terms of Service</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
          <FileText className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground">
            By using the BHC San Lorenzo Ruiz 1 Health Center Management System, you agree to the following terms and conditions.
          </p>
        </div>

        {[
          { title: "1. Acceptance of Terms", content: "By accessing and using this system, you agree to be bound by these Terms of Service. If you do not agree, please do not use the system." },
          { title: "2. Use of the System", content: "This system is designed for patient registration, health profiling, and management of health records for the residents of San Lorenzo Ruiz 1. Users must provide accurate and truthful information when registering." },
          { title: "3. User Accounts", content: "Users are responsible for maintaining the confidentiality of their account credentials. Any activity under your account is your responsibility. Report unauthorized access immediately to the health center staff." },
          { title: "4. Accuracy of Information", content: "You are required to provide accurate, current, and complete information during registration and health profiling. Providing false information may result in the suspension of your access." },
          { title: "5. Limitation of Liability", content: "This system is a tool for health record management and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns." },
          { title: "6. System Availability", content: "We strive to maintain system availability but cannot guarantee uninterrupted access. The system may be temporarily unavailable due to maintenance, updates, or technical issues." },
          { title: "7. Modifications", content: "The Barangay Health Center reserves the right to modify these terms at any time. Continued use of the system after changes constitutes acceptance of the updated terms." },
          { title: "8. Governing Law", content: "These Terms of Service are governed by the laws of the Republic of the Philippines." },
        ].map(({ title, content }) => (
          <div key={title} className="space-y-2">
            <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
