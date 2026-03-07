import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataPrivacy() {
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
          <h1 className="font-display text-sm font-bold">Data Privacy Policy</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground">
            The BHC San Lorenzo Ruiz 1 is committed to protecting the privacy and personal information of all patients and residents in compliance with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong>.
          </p>
        </div>

        {[
          { title: "1. Information We Collect", content: "We collect personal information such as full name, date of birth, sex, contact number, PhilHealth number, address (block and lot), and health-related data including medical conditions, blood pressure, weight, height, vaccination status, and family planning methods." },
          { title: "2. Purpose of Collection", content: "Your information is collected solely for the purpose of providing healthcare services, maintaining health records, complying with DOH reporting requirements, conducting immunization programs, and facilitating community health profiling." },
          { title: "3. Data Storage and Security", content: "All personal and health information is stored securely using encrypted systems. Access to patient data is restricted to authorized health center staff only." },
          { title: "4. Data Sharing", content: "We may share anonymized and aggregated health data with the Department of Health (DOH) and local government units for public health monitoring purposes. Individual patient data is never shared without explicit consent, except when required by law." },
          { title: "5. Patient Rights", content: "Under the Data Privacy Act, you have the right to: access your personal data, correct inaccurate information, object to data processing, request data deletion (subject to legal retention requirements), and file a complaint with the National Privacy Commission." },
          { title: "6. Data Retention", content: "Health records are retained in accordance with DOH guidelines and applicable laws. Records may be retained for a minimum of 15 years from the last date of treatment." },
          { title: "7. Contact Us", content: "For questions or concerns about your data privacy, please contact the Barangay Health Center at San Lorenzo Ruiz 1, Dasmariñas, Cavite or call (046) 123-4567." },
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
