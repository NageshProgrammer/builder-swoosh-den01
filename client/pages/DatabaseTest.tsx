import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Server,
  Link
} from "lucide-react";

interface DbStatus {
  success: boolean;
  database?: {
    state: string;
    stateCode: number;
    connected: boolean;
    host: string;
    name: string;
    collections: string[];
  };
  environment?: {
    nodeEnv: string;
    mongoUri: string;
  };
  message?: string;
  error?: string;
}

const DatabaseTest = () => {
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setDbStatus(data);
    } catch (error) {
      setDbStatus({
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      });
    }
    setLoading(false);
  };

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed-database', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        alert('Database seeded successfully!');
        testDatabase(); // Refresh status
      } else {
        alert('Seeding failed: ' + data.message);
      }
    } catch (error) {
      alert('Seeding failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
    setLoading(false);
  };

  useEffect(() => {
    testDatabase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-white to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medical-navy mb-2">Database Connection Test</h1>
          <p className="text-muted-foreground">Test and manage your MongoDB connection</p>
        </div>

        <div className="grid gap-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-healthcare-primary" />
                <span>MongoDB Connection Status</span>
              </CardTitle>
              <CardDescription>Current database connection information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Connection Test</span>
                <Button onClick={testDatabase} disabled={loading} size="sm">
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>

              {dbStatus && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {dbStatus.database?.connected ? (
                      <CheckCircle className="h-5 w-5 text-healthcare-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-healthcare-error" />
                    )}
                    <Badge variant={dbStatus.database?.connected ? "default" : "destructive"}>
                      {dbStatus.database?.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      State: {dbStatus.database?.state || 'Unknown'}
                    </span>
                  </div>

                  {dbStatus.database?.connected && (
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Host:</span> {dbStatus.database.host}
                      </div>
                      <div>
                        <span className="font-medium">Database:</span> {dbStatus.database.name}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Collections:</span> {
                          dbStatus.database.collections.length > 0 
                            ? dbStatus.database.collections.join(', ')
                            : 'None created yet'
                        }
                      </div>
                    </div>
                  )}

                  {dbStatus.error && (
                    <Alert className="border-healthcare-error/20 bg-healthcare-error/5">
                      <XCircle className="h-4 w-4 text-healthcare-error" />
                      <AlertDescription className="text-healthcare-error">
                        {dbStatus.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Environment Info */}
          {dbStatus?.environment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-healthcare-secondary" />
                  <span>Environment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Node Environment:</span>
                  <Badge variant="outline">{dbStatus.environment.nodeEnv}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>MongoDB URI:</span>
                  <Badge variant={dbStatus.environment.mongoUri === 'SET' ? "default" : "destructive"}>
                    {dbStatus.environment.mongoUri}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Database Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Manage your database with test data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dbStatus?.database?.connected ? (
                <div className="space-y-3">
                  <Button onClick={seedDatabase} disabled={loading} className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    {loading ? 'Seeding...' : 'Seed Database with Test Data'}
                  </Button>
                  
                  <Alert className="border-healthcare-primary/20 bg-healthcare-primary/5">
                    <CheckCircle className="h-4 w-4 text-healthcare-primary" />
                    <AlertDescription className="text-healthcare-primary">
                      <strong>Database Connected!</strong> You can now seed the database with test data for patients, hospitals, and insurance companies.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <Alert className="border-healthcare-warning/20 bg-healthcare-warning/5">
                  <XCircle className="h-4 w-4 text-healthcare-warning" />
                  <AlertDescription className="text-healthcare-warning">
                    <strong>Database Not Connected</strong> - The application is running in mock data mode. 
                    All features work but data won't persist.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5 text-healthcare-accent" />
                <span>Quick Navigation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                🏠 Home Page
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/patient/login'}>
                👤 Patient Portal
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/hospital/login'}>
                🏥 Hospital Portal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTest;
