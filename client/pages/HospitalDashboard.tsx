import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  LogOut, 
  Search, 
  Building2, 
  User, 
  Shield,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Edit3,
  Clock,
  Stethoscope,
  FileText,
  Phone,
  Mail
} from "lucide-react";

const HospitalDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [patientContact, setPatientContact] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results
  const searchResults = [
    {
      id: "BC-IN-2024-RAJ-001234567890",
      name: "Rajesh Kumar",
      age: 39,
      bloodGroup: "O+",
      lastVisit: "2024-01-15",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com"
    },
    {
      id: "BC-IN-2024-PRI-001234567891",
      name: "Priya Sharma",
      age: 32,
      bloodGroup: "A+",
      lastVisit: "2024-01-10",
      phone: "+91 98765 43211",
      email: "priya.sharma@email.com"
    }
  ];

  const handleSearch = () => {
    // Mock search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowOtpModal(true);
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(false);
      setOtpSent(false);
      setOtp("");
      // Here you would navigate to patient details or allow editing
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
                <p className="text-sm text-muted-foreground">Hospital Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-healthcare-secondary/10 border-healthcare-secondary/20 text-healthcare-secondary">
                <Building2 className="h-3 w-3 mr-1" />
                Apollo Hospital
              </Badge>
              <Link to="/hospital/login">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-navy mb-2">Hospital Staff Portal</h1>
          <p className="text-muted-foreground">Search for patients and manage medical records securely</p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-border">
            <TabsTrigger value="search" className="data-[state=active]:bg-healthcare-secondary data-[state=active]:text-white">
              <Search className="h-4 w-4 mr-2" />
              Patient Search
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-healthcare-secondary data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-healthcare-secondary data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Pending Updates
            </TabsTrigger>
          </TabsList>

          {/* Patient Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-healthcare-secondary" />
                  <span>Search Patient by Blockchain ID</span>
                </CardTitle>
                <CardDescription>
                  Enter the unique blockchain Patient ID to find patient records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter Blockchain Patient ID (e.g., BC-IN-2024-RAJ-001234567890)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button onClick={handleSearch} className="h-12 bg-healthcare-secondary hover:bg-healthcare-secondary/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <Alert className="border-healthcare-secondary/20 bg-healthcare-secondary/5">
                  <Shield className="h-4 w-4 text-healthcare-secondary" />
                  <AlertDescription className="text-healthcare-secondary">
                    <strong>Security Notice:</strong> All searches are logged. Patient consent via OTP is required before accessing records.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchQuery && (
              <Card>
                <CardHeader>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>Found {searchResults.length} matching records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {searchResults.map((patient) => (
                    <div key={patient.id} className="border border-border rounded-lg p-4 hover:border-healthcare-secondary/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-healthcare-secondary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-healthcare-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-medical-navy">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>Age: {patient.age}</span>
                              <span>Blood: {patient.bloodGroup}</span>
                              <span>Last Visit: {patient.lastVisit}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleSelectPatient(patient)}
                          className="bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Access Records
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest patient record updates and access logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-healthcare-success/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Updated medical record for Rajesh Kumar</p>
                      <p className="text-xs text-muted-foreground">Today, 2:30 PM • Dr. Priya Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-healthcare-primary/10 flex items-center justify-center">
                      <Stethoscope className="h-4 w-4 text-healthcare-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Accessed patient records for Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Today, 1:15 PM • Dr. Amit Patel</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Updates Tab */}
          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Record Updates</CardTitle>
                <CardDescription>Updates waiting for patient OTP verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-muted/20 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No pending updates at the moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-healthcare-secondary" />
                <span>Patient Consent Required</span>
              </CardTitle>
              <CardDescription>
                Patient verification is required before accessing medical records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-healthcare-secondary/5 border border-healthcare-secondary/20 rounded-lg p-4">
                <h3 className="font-medium text-medical-navy mb-2">Selected Patient:</h3>
                <p className="text-sm">Name: {selectedPatient?.name}</p>
                <p className="text-sm">ID: {selectedPatient?.id}</p>
              </div>

              {!otpSent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Patient's Contact (Email or Phone)</Label>
                    <Input
                      id="contact"
                      placeholder="Enter patient's email or phone number"
                      value={patientContact}
                      onChange={(e) => setPatientContact(e.target.value)}
                    />
                  </div>
                  <Alert className="border-healthcare-warning/20 bg-healthcare-warning/5">
                    <AlertTriangle className="h-4 w-4 text-healthcare-warning" />
                    <AlertDescription className="text-healthcare-warning">
                      An OTP will be sent to the patient for verification before you can access their records.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-healthcare-success/20 bg-healthcare-success/5">
                    <CheckCircle className="h-4 w-4 text-healthcare-success" />
                    <AlertDescription className="text-healthcare-success">
                      OTP sent to patient successfully. Please enter the OTP provided by the patient.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP from Patient</Label>
                    <Input
                      id="otp"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowOtpModal(false);
                    setOtpSent(false);
                    setOtp("");
                    setPatientContact("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                {!otpSent ? (
                  <Button
                    onClick={handleSendOtp}
                    disabled={isLoading || !patientContact}
                    className="flex-1 bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 h-4 w-4" />
                        Send OTP
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otp.length !== 6}
                    className="flex-1 bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify & Access
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
