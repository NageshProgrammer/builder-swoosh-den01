import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Building2, 
  FileText, 
  Lock, 
  Smartphone, 
  QrCode,
  ChevronRight,
  Heart,
  Activity,
  Database,
  Zap,
  CheckCircle,
  UserCheck,
  Globe
} from "lucide-react";

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Security",
      description: "Immutable patient records stored on secure blockchain infrastructure"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "OTP Verification",
      description: "Multi-factor authentication for all record updates and access"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Unique Patient ID",
      description: "Global blockchain-based Patient ID for every citizen of India"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Real-time Access",
      description: "Instant access to medical history across all healthcare providers"
    }
  ];

  const stats = [
    { number: "1M+", label: "Patients Protected" },
    { number: "500+", label: "Healthcare Partners" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "256-bit", label: "Encryption Security" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-healthcare-primary to-healthcare-secondary flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-medical-navy">MediChain</h1>
                <p className="text-sm text-muted-foreground">Blockchain Healthcare Records</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-healthcare-primary transition-colors">
                About
              </Link>
              <Link to="/security" className="text-sm font-medium text-muted-foreground hover:text-healthcare-primary transition-colors">
                Security
              </Link>
              <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-healthcare-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-healthcare-primary/10 border-healthcare-primary/20 text-healthcare-primary">
            <Zap className="h-3 w-3 mr-1" />
            Blockchain-Powered Healthcare
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-medical-navy mb-6 animate-fade-in">
            Secure Medical Records
            <span className="block text-healthcare-primary">On Blockchain</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionary healthcare platform that secures patient medical records using blockchain technology. 
            Providing immutable, transparent, and accessible health data for patients, hospitals, and insurance companies.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-healthcare-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-medical-navy mb-4">Choose Your Portal</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access MediChain through our specialized portals designed for different healthcare stakeholders
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Patient Portal */}
            <Card 
              className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                hoveredCard === 'patient' 
                  ? 'border-healthcare-primary shadow-2xl scale-105 bg-gradient-to-br from-healthcare-primary/5 to-healthcare-secondary/5' 
                  : 'border-border hover:border-healthcare-primary/50 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredCard('patient')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-healthcare-primary/20 to-transparent rounded-bl-3xl" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-healthcare-primary to-healthcare-secondary flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-healthcare-primary/10 text-healthcare-primary">
                    For Patients
                  </Badge>
                </div>
                <CardTitle className="text-xl text-medical-navy">Patient Portal</CardTitle>
                <CardDescription className="text-base">
                  Access your complete medical history, manage personal information, and control who sees your health data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Google Sign-In Authentication</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Unique Blockchain Patient ID</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Complete Medical History</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Insurance Details Management</span>
                  </div>
                </div>
                <Link to="/patient/login">
                  <Button className="w-full bg-healthcare-primary hover:bg-healthcare-primary/90 text-white group">
                    Access Patient Portal
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Hospital Portal */}
            <Card 
              className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                hoveredCard === 'hospital' 
                  ? 'border-healthcare-secondary shadow-2xl scale-105 bg-gradient-to-br from-healthcare-secondary/5 to-healthcare-accent/5' 
                  : 'border-border hover:border-healthcare-secondary/50 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredCard('hospital')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-healthcare-secondary/20 to-transparent rounded-bl-3xl" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-healthcare-secondary to-healthcare-accent flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-healthcare-secondary/10 text-healthcare-secondary">
                    For Hospitals
                  </Badge>
                </div>
                <CardTitle className="text-xl text-medical-navy">Hospital Portal</CardTitle>
                <CardDescription className="text-base">
                  Search patients, update medical records, and manage healthcare data with secure OTP verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Mobile OTP Authentication</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Patient Search by ID</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Secure Record Updates</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Patient Consent Verification</span>
                  </div>
                </div>
                <Link to="/hospital/login">
                  <Button className="w-full bg-healthcare-secondary hover:bg-healthcare-secondary/90 text-white group">
                    Access Hospital Portal
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Insurance Portal */}
            <Card 
              className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                hoveredCard === 'insurance' 
                  ? 'border-healthcare-accent shadow-2xl scale-105 bg-gradient-to-br from-healthcare-accent/5 to-medical-navy/5' 
                  : 'border-border hover:border-healthcare-accent/50 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredCard('insurance')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-healthcare-accent/20 to-transparent rounded-bl-3xl" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-healthcare-accent to-medical-navy flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-healthcare-accent/10 text-healthcare-accent">
                    For Insurance
                  </Badge>
                </div>
                <CardTitle className="text-xl text-medical-navy">Insurance Portal</CardTitle>
                <CardDescription className="text-base">
                  Review patient insurance details, process claims, and manage policy information securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Mobile OTP Authentication</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Insurance Data Access</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Claims Processing</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <span>Policy Management</span>
                  </div>
                </div>
                <Link to="/insurance/login">
                  <Button className="w-full bg-healthcare-accent hover:bg-healthcare-accent/90 text-white group">
                    Access Insurance Portal
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-medical-navy mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure maximum security and accessibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 border-border hover:border-healthcare-primary/50 transition-all duration-200 hover:shadow-lg group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 mx-auto mb-4 flex items-center justify-center text-healthcare-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-medical-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medical-navy text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-healthcare-primary to-healthcare-secondary flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">MediChain</h3>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Revolutionizing healthcare with blockchain technology. Secure, transparent, and accessible medical records for the future of healthcare.
              </p>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-healthcare-primary" />
                <span className="text-sm text-white/60">Serving healthcare providers across India</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-white/80 hover:text-healthcare-primary transition-colors">About Us</Link>
                <Link to="/security" className="block text-white/80 hover:text-healthcare-primary transition-colors">Security</Link>
                <Link to="/privacy" className="block text-white/80 hover:text-healthcare-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="block text-white/80 hover:text-healthcare-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/help" className="block text-white/80 hover:text-healthcare-primary transition-colors">Help Center</Link>
                <Link to="/contact" className="block text-white/80 hover:text-healthcare-primary transition-colors">Contact Support</Link>
                <Link to="/docs" className="block text-white/80 hover:text-healthcare-primary transition-colors">Documentation</Link>
                <Link to="/api" className="block text-white/80 hover:text-healthcare-primary transition-colors">API Reference</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 MediChain. All rights reserved. Built with ❤️ for better healthcare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
