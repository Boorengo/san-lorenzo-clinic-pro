import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffLayout from "./components/layout/StaffLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import FormsReports from "./pages/FormsReports";
import FormFill from "./pages/FormFill";
import Immunization from "./pages/Immunization";
import Inventory from "./pages/Inventory";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PatientPortal from "./pages/PatientPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/" element={<StaffLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="forms" element={<FormsReports />} />
            <Route path="forms/:templateId" element={<FormFill />} />
            <Route path="immunization" element={<Immunization />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="documents" element={<Documents />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
