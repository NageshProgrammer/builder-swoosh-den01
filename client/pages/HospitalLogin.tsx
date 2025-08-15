import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Heart, 
  ArrowLeft, 
  Building2, 
  Smartphone,
  Shield,
  Timer,
  CheckCircle,
  Loader2
} from "lucide-react";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: phone input, 2: OTP verification
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendOtp = async () => {
    if (!phoneNumber) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setCountdown(30);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/hospital/dashboard');
    }, 2000);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('91')) {
      return digits.slice(0, 12);
    }
    return digits.slice(0, 10);
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
            <Badge variant="outline" className="mb-4 bg-healthcare-secondary/10 border-healthcare-secondary/20 text-healthcare-secondary">
              <Building2 className="h-3 w-3 mr-1" />
              Hospital Portal
            </Badge>
            <h1 className="text-3xl font-bold text-medical-navy mb-2">Hospital Staff Login</h1>
            <p className="text-muted-foreground">
              Secure access for authorized hospital personnel
            </p>
          </div>

          <Card className="border-2 border-border hover:border-healthcare-secondary/50 transition-all duration-200">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-healthcare-secondary/10 to-healthcare-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-healthcare-secondary" />
              </div>
              <CardTitle className="text-xl text-medical-navy">
                {step === 1 ? "Enter Mobile Number" : "Verify OTP"}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? "We'll send a secure OTP to verify your identity" 
                  : "Enter the 6-digit code sent to your mobile"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">+91</span>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                        className="pl-12"
                        maxLength={10}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Only registered hospital staff can access this portal
                    </p>
                  </div>

                  <Button 
                    onClick={handleSendOtp}
                    disabled={isLoading || phoneNumber.length !== 10}
                    className="w-full h-12 bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 h-4 w-4" />
                        Send OTP
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Alert className="border-healthcare-secondary/20 bg-healthcare-secondary/5">
                    <CheckCircle className="h-4 w-4 text-healthcare-secondary" />
                    <AlertDescription className="text-healthcare-secondary">
                      OTP sent successfully to +91 {phoneNumber}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Didn't receive the code?</span>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-xs"
                        disabled={countdown > 0}
                        onClick={handleSendOtp}
                      >
                        {countdown > 0 ? (
                          <span className="flex items-center">
                            <Timer className="h-3 w-3 mr-1" />
                            Resend in {countdown}s
                          </span>
                        ) : (
                          "Resend OTP"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleVerifyOtp}
                      disabled={isLoading || otp.length !== 6}
                      className="w-full h-12 bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verify & Login
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Change Number
                    </Button>
                  </div>
                </>
              )}

              <div className="space-y-3 pt-4">
                <h4 className="font-medium text-medical-navy text-sm">Hospital Portal Features:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-secondary"></div>
                    <span>Search patients by blockchain ID</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-secondary"></div>
                    <span>Update medical records with patient consent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-secondary"></div>
                    <span>OTP verification for all record changes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-healthcare-secondary"></div>
                    <span>Secure audit trail of all activities</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  This portal is restricted to authorized hospital staff only. 
                  All activities are logged for security purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Having trouble accessing your account?{" "}
              <Link to="/help" className="text-healthcare-secondary hover:underline">
                Contact IT support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
