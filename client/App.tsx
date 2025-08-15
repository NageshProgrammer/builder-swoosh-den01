import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientLogin from "./pages/PatientLogin";
import HospitalLogin from "./pages/HospitalLogin";
import InsuranceLogin from "./pages/InsuranceLogin";
import PatientDashboard from "./pages/PatientDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import InsuranceDashboard from "./pages/InsuranceDashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Patient Routes */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Hospital Routes */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

          {/* Insurance Routes */}
          <Route path="/insurance/login" element={<InsuranceLogin />} />
          <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />

          {/* Placeholder Pages */}
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route path="/security" element={<PlaceholderPage title="Security" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/help" element={<PlaceholderPage title="Help Center" />} />
          <Route path="/docs" element={<PlaceholderPage title="Documentation" />} />
          <Route path="/api" element={<PlaceholderPage title="API Reference" />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
