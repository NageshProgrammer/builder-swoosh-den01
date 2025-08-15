import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Heart, 
  ArrowLeft, 
  Shield, 
  UserCheck, 
  Chrome,
  Info,
  Loader2
} from "lucide-react";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate loading for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      navigate('/patient/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-healthcare-primary to-healthcare-secondary flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-medical-navy">MediChain</h1>
                <p className="text-sm text-muted-foreground">Blockchain Healthcare Records</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 bg-healthcare-primary/10 border-healthcare-primary/20 text-healthcare-primary">
              <UserCheck className="h-3 w-3 mr-1" />
              Patient Portal
            </Badge>
            <h1 className="text-3xl font-bold text-medical-navy mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Access your secure medical records and manage your healthcare data
            </p>
          </div>

          <Card className="border-2 border-border hover:border-healthcare-primary/50 transition-all duration-200">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-healthcare-primary/10 to-healthcare-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-healthcare-primary" />
              </div>
              <CardTitle className="text-xl text-medical-navy">Secure Login</CardTitle>
              <CardDescription>
                Sign in with your Google account to access your blockchain-secured medical records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-healthcare-primary/20 bg-healthcare-primary/5">
                <Info className="h-4 w-4 text-healthcare-primary" />
                <AlertDescription className="text-healthcare-primary">
                  <strong>First-time users:</strong> A unique blockchain Patient ID will be automatically generated and assigned to your account.
                </AlertDescription>
              </Alert>

              <Button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-12 bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <Chrome className="mr-3 h-5 w-5" />
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="space-y-3 pt-4">
                <h4 className="font-medium text-medical-navy text-sm">What you'll get access to:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-primary"></div>
                    <span>Personal medical history and records</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-primary"></div>
                    <span>Insurance information and coverage details</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-primary"></div>
                    <span>Unique blockchain Patient ID</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-primary"></div>
                    <span>Control over who accesses your data</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you agree to our{" "}
                  <Link to="/terms" className="text-healthcare-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-healthcare-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link to="/help" className="text-healthcare-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
