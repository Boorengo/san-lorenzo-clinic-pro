import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffLayout from "./components/layout/StaffLayout";
import DoctorLayout from "./components/layout/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorQueue from "./pages/doctor/DoctorQueue";
import Prescriptions from "./pages/doctor/Prescriptions";
import FollowUps from "./pages/doctor/FollowUps";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import UserProfile from "./pages/UserProfile";
import FormsReports from "./pages/FormsReports";
import FormFill from "./pages/FormFill";
import Immunization from "./pages/Immunization";
import Inventory from "./pages/Inventory";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Consultations from "./pages/Consultations";
import Referrals from "./pages/Referrals";
import LabResults from "./pages/LabResults";
import AuditLog from "./pages/AuditLog";
import Security from "./pages/Security";
import Scanner from "./pages/Scanner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Verify from "./pages/Verify";
import PatientPortal from "./pages/PatientPortal";
import DataPrivacy from "./pages/DataPrivacy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route path="/data-privacy" element={<DataPrivacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/dashboard" element={<StaffLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="forms" element={<FormsReports />} />
            <Route path="forms/:templateId" element={<FormFill />} />
            <Route path="immunization" element={<Immunization />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="documents" element={<Documents />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="lab-results" element={<LabResults />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="security" element={<Security />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="queue" element={<DoctorQueue />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="lab-results" element={<LabResults />} />
            <Route path="immunization" element={<Immunization />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="follow-ups" element={<FollowUps />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
