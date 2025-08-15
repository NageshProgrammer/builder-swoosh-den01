import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Heart, 
  LogOut, 
  User, 
  FileText, 
  Shield, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  QrCode,
  Download,
  Lock,
  Activity,
  Pill,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock patient data
  const patientData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    blockchainId: "BC-IN-2024-RAJ-001234567890",
    dateOfBirth: "15-03-1985",
    bloodGroup: "O+",
    emergencyContact: "+91 98765 43211",
    insuranceProvider: "Max Health Insurance",
    policyNumber: "MHI-2024-RAJ-789456",
    coverageAmount: "₹10,00,000"
  };

  const medicalHistory = [
    {
      id: 1,
      date: "2024-01-15",
      hospital: "Apollo Hospital, Bangalore",
      doctor: "Dr. Priya Sharma",
      type: "Regular Checkup",
      diagnosis: "Routine health assessment - All vitals normal",
      status: "completed",
      verified: true
    },
    {
      id: 2,
      date: "2023-11-22",
      hospital: "Fortis Hospital, Bangalore",
      doctor: "Dr. Amit Patel",
      type: "Blood Test",
      diagnosis: "Complete blood count - Normal ranges",
      status: "completed",
      verified: true
    },
    {
      id: 3,
      date: "2023-09-08",
      hospital: "Manipal Hospital, Bangalore",
      doctor: "Dr. Sunita Reddy",
      type: "Vaccination",
      diagnosis: "COVID-19 booster dose administered",
      status: "completed",
      verified: true
    }
  ];

  const medications = [
    {
      name: "Vitamin D3",
      dosage: "1000 IU daily",
      prescribedBy: "Dr. Priya Sharma",
      startDate: "2024-01-15",
      status: "active"
    },
    {
      name: "Omega-3",
      dosage: "500mg twice daily",
      prescribedBy: "Dr. Priya Sharma",
      startDate: "2024-01-15",
      status: "active"
    }
  ];

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
                <p className="text-sm text-muted-foreground">Patient Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-healthcare-success/10 border-healthcare-success/20 text-healthcare-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Account
              </Badge>
              <Link to="/patient/login">
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-healthcare-primary/20">
                <AvatarImage src="/api/placeholder/64/64" alt={patientData.name} />
                <AvatarFallback className="bg-healthcare-primary/10 text-healthcare-primary text-lg font-semibold">
                  {patientData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-medical-navy">Welcome back, {patientData.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Your health data is secure on the blockchain</p>
              </div>
            </div>
            <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </div>

          {/* Blockchain ID Card */}
          <Card className="border-2 border-healthcare-primary/20 bg-gradient-to-r from-healthcare-primary/5 to-healthcare-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-healthcare-primary to-healthcare-secondary flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-navy">Blockchain Patient ID</h3>
                    <p className="text-sm text-muted-foreground">Unique identifier on the blockchain</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold text-healthcare-primary">{patientData.blockchainId}</p>
                  <Badge variant="secondary" className="mt-1">
                    <Lock className="h-3 w-3 mr-1" />
                    Verified on Blockchain
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="personal" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="medical" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Medical History
            </TabsTrigger>
            <TabsTrigger value="insurance" className="data-[state=active]:bg-healthcare-primary data-[state=active]:text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Insurance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border hover:border-healthcare-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Recent Visits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-medical-navy">{medicalHistory.length}</div>
                  <p className="text-xs text-muted-foreground">Last visit: {medicalHistory[0]?.date}</p>
                </CardContent>
              </Card>
              
              <Card className="border-border hover:border-healthcare-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-medical-navy">{medications.filter(m => m.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">Currently prescribed</p>
                </CardContent>
              </Card>
              
              <Card className="border-border hover:border-healthcare-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Insurance Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-medical-navy">{patientData.coverageAmount}</div>
                  <p className="text-xs text-muted-foreground">{patientData.insuranceProvider}</p>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-healthcare-primary/20 bg-healthcare-primary/5">
              <AlertTriangle className="h-4 w-4 text-healthcare-primary" />
              <AlertDescription className="text-healthcare-primary">
                <strong>Reminder:</strong> Your next routine checkup is due in 3 months. Consider scheduling an appointment.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-healthcare-primary" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>Your basic personal and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-medical-navy font-medium">{patientData.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                    <p className="text-medical-navy font-medium">{patientData.dateOfBirth}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                    <Badge variant="outline" className="text-healthcare-error border-healthcare-error/20">
                      {patientData.bloodGroup}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                    <p className="text-medical-navy font-medium">{patientData.emergencyContact}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-healthcare-primary" />
                    <span>{patientData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-healthcare-primary" />
                    <span>{patientData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-healthcare-primary" />
                    <span>{patientData.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="medical" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-medical-navy">Medical History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
            </div>

            <div className="space-y-4">
              {medicalHistory.map((record) => (
                <Card key={record.id} className="border-border hover:border-healthcare-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-healthcare-primary/10 flex items-center justify-center">
                          <Stethoscope className="h-5 w-5 text-healthcare-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-medical-navy">{record.type}</h3>
                            <Badge variant="outline" className="text-xs">
                              {record.status}
                            </Badge>
                            {record.verified && (
                              <Badge variant="secondary" className="text-xs bg-healthcare-success/10 text-healthcare-success">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {record.date}
                            </span>
                            <span>{record.hospital}</span>
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-healthcare-primary" />
                  <span>Current Medications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-healthcare-primary/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-medical-navy">{med.name}</h4>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      <p className="text-xs text-muted-foreground">Prescribed by {med.prescribedBy}</p>
                    </div>
                    <Badge variant="outline" className="bg-healthcare-success/10 text-healthcare-success border-healthcare-success/20">
                      {med.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-healthcare-primary" />
                  <span>Insurance Information</span>
                </CardTitle>
                <CardDescription>Your current health insurance coverage details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Insurance Provider</label>
                      <p className="text-lg font-semibold text-medical-navy">{patientData.insuranceProvider}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Policy Number</label>
                      <p className="font-mono text-medical-navy">{patientData.policyNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Coverage Amount</label>
                      <p className="text-2xl font-bold text-healthcare-primary">{patientData.coverageAmount}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-healthcare-primary/5 border border-healthcare-primary/20 rounded-lg p-4">
                      <h4 className="font-medium text-medical-navy mb-2">Coverage Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Hospitalization coverage</li>
                        <li>• Outpatient treatments</li>
                        <li>• Emergency services</li>
                        <li>• Prescription medications</li>
                        <li>• Preventive care checkups</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-medical-navy">Policy Status</h4>
                      <p className="text-sm text-muted-foreground">Active and up to date</p>
                    </div>
                    <Badge className="bg-healthcare-success text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
