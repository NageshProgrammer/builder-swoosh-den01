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
  CreditCard, 
  User, 
  Shield,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Clock,
  FileText,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react";

const InsuranceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [patientContact, setPatientContact] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const searchResults = [
    {
      id: "BC-IN-2024-RAJ-001234567890",
      name: "Rajesh Kumar",
      age: 39,
      policyNumber: "MHI-2024-RAJ-789456",
      coverageAmount: "₹10,00,000",
      activeClaims: 1,
      lastClaim: "2024-01-10",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com"
    },
    {
      id: "BC-IN-2024-PRI-001234567891",
      name: "Priya Sharma",
      age: 32,
      policyNumber: "MHI-2024-PRI-789457",
      coverageAmount: "₹15,00,000",
      activeClaims: 0,
      lastClaim: "2023-11-15",
      phone: "+91 98765 43211",
      email: "priya.sharma@email.com"
    }
  ];

  const pendingClaims = [
    {
      id: "CLM-2024-001",
      patientName: "Rajesh Kumar",
      policyNumber: "MHI-2024-RAJ-789456",
      claimAmount: "₹25,000",
      treatmentType: "Cardiac Checkup",
      hospital: "Apollo Hospital",
      dateSubmitted: "2024-01-15",
      status: "Under Review"
    },
    {
      id: "CLM-2024-002",
      patientName: "Anita Singh",
      policyNumber: "MHI-2024-ANI-789458",
      claimAmount: "₹8,500",
      treatmentType: "Blood Tests",
      hospital: "Fortis Hospital",
      dateSubmitted: "2024-01-14",
      status: "Pending Documents"
    }
  ];

  const stats = [
    { label: "Active Policies", value: "2,847", icon: Users, color: "text-healthcare-primary" },
    { label: "Pending Claims", value: "23", icon: Clock, color: "text-healthcare-warning" },
    { label: "Claims Processed", value: "156", icon: CheckCircle, color: "text-healthcare-success" },
    { label: "Total Coverage", value: "₹28.4 Cr", icon: TrendingUp, color: "text-healthcare-accent" }
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowOtpModal(true);
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpModal(false);
      setOtpSent(false);
      setOtp("");
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
                <p className="text-sm text-muted-foreground">Insurance Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-healthcare-accent/10 border-healthcare-accent/20 text-healthcare-accent">
                <CreditCard className="h-3 w-3 mr-1" />
                Max Health Insurance
              </Badge>
              <Link to="/insurance/login">
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
          <h1 className="text-3xl font-bold text-medical-navy mb-2">Insurance Portal</h1>
          <p className="text-muted-foreground">Manage patient insurance records and process claims securely</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border hover:border-healthcare-accent/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-healthcare-accent/10 flex items-center justify-center">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-medical-navy">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-border">
            <TabsTrigger value="search" className="data-[state=active]:bg-healthcare-accent data-[state=active]:text-white">
              <Search className="h-4 w-4 mr-2" />
              Patient Search
            </TabsTrigger>
            <TabsTrigger value="claims" className="data-[state=active]:bg-healthcare-accent data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Claims Management
            </TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-healthcare-accent data-[state=active]:text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Policy Management
            </TabsTrigger>
          </TabsList>

          {/* Patient Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-healthcare-accent" />
                  <span>Search Patient by Blockchain ID</span>
                </CardTitle>
                <CardDescription>
                  Enter the unique blockchain Patient ID to access insurance information
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
                  <Button onClick={handleSearch} className="h-12 bg-healthcare-accent hover:bg-healthcare-accent/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                <Alert className="border-healthcare-accent/20 bg-healthcare-accent/5">
                  <Shield className="h-4 w-4 text-healthcare-accent" />
                  <AlertDescription className="text-healthcare-accent">
                    <strong>Privacy Notice:</strong> Patient consent via OTP is required before accessing insurance details.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchQuery && (
              <Card>
                <CardHeader>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>Found {searchResults.length} matching insurance records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {searchResults.map((patient) => (
                    <div key={patient.id} className="border border-border rounded-lg p-4 hover:border-healthcare-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-healthcare-accent/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-healthcare-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-medical-navy">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">Policy: {patient.policyNumber}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>Coverage: {patient.coverageAmount}</span>
                              <span>Active Claims: {patient.activeClaims}</span>
                              <span>Last Claim: {patient.lastClaim}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleSelectPatient(patient)}
                          className="bg-healthcare-accent hover:bg-healthcare-accent/90"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Access Insurance
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Claims Management Tab */}
          <TabsContent value="claims" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Claims</CardTitle>
                <CardDescription>Claims requiring review and processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingClaims.map((claim) => (
                  <div key={claim.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-medical-navy">{claim.patientName}</h3>
                        <p className="text-sm text-muted-foreground">Claim ID: {claim.id}</p>
                      </div>
                      <Badge variant="outline" className={
                        claim.status === "Under Review" ? "border-healthcare-warning/20 text-healthcare-warning" :
                        claim.status === "Pending Documents" ? "border-healthcare-error/20 text-healthcare-error" :
                        "border-border"
                      }>
                        {claim.status}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><span className="font-medium">Treatment:</span> {claim.treatmentType}</p>
                        <p><span className="font-medium">Hospital:</span> {claim.hospital}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Amount:</span> {claim.claimAmount}</p>
                        <p><span className="font-medium">Submitted:</span> {claim.dateSubmitted}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-healthcare-success hover:bg-healthcare-success/90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Review Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policy Management Tab */}
          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Policy Management</CardTitle>
                <CardDescription>Manage active insurance policies and coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-muted/20 mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Policy management features coming soon</p>
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
                <Shield className="h-5 w-5 text-healthcare-accent" />
                <span>Patient Consent Required</span>
              </CardTitle>
              <CardDescription>
                Patient verification is required before accessing insurance information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-healthcare-accent/5 border border-healthcare-accent/20 rounded-lg p-4">
                <h3 className="font-medium text-medical-navy mb-2">Selected Patient:</h3>
                <p className="text-sm">Name: {selectedPatient?.name}</p>
                <p className="text-sm">Policy: {selectedPatient?.policyNumber}</p>
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
                      An OTP will be sent to the patient for verification before you can access their insurance details.
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
                    className="flex-1 bg-healthcare-accent hover:bg-healthcare-accent/90"
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
                    className="flex-1 bg-healthcare-accent hover:bg-healthcare-accent/90"
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

export default InsuranceDashboard;
