import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft, Heart } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
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
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-2 border-dashed border-healthcare-primary/30">
            <CardHeader className="pb-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-healthcare-primary/10 flex items-center justify-center mb-4">
                <Construction className="h-8 w-8 text-healthcare-primary" />
              </div>
              <CardTitle className="text-2xl text-medical-navy">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                This page is currently under development. We're working hard to bring you comprehensive healthcare features.
              </p>
              <div className="bg-healthcare-primary/5 border border-healthcare-primary/20 rounded-lg p-4 text-sm text-healthcare-primary">
                <strong>Coming Soon:</strong> This section will contain detailed information about {title.toLowerCase()}.
                Continue prompting to help us build this page with the specific content you need.
              </div>
              <div className="pt-4">
                <Link to="/">
                  <Button className="bg-healthcare-primary hover:bg-healthcare-primary/90">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
