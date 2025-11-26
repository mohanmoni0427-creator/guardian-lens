import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Upload, Camera, LogOut, MapPin, User, Calendar, Eye, Package, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DetectionResults from "@/components/DetectionResults";
import ThreatLevelIndicator from "@/components/ThreatLevelIndicator";

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionData, setDetectionData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    navigate("/");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        processImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockData = {
        face: {
          detected: true,
          confidence: 0.94,
          emotions: ["Neutral", "Alert"]
        },
        person: {
          gender: Math.random() > 0.5 ? "Male" : "Female",
          age: Math.floor(Math.random() * 40) + 20,
          confidence: 0.87
        },
        objects: [
          { name: "Backpack", confidence: 0.91 },
          { name: "Phone", confidence: 0.88 },
          { name: "Watch", confidence: 0.76 }
        ],
        text: "Gate 5, Terminal 2, Airport Road, Mumbai - 400099",
        location: {
          address: "Airport Road, Mumbai - 400099",
          coordinates: { lat: 19.0896, lng: 72.8656 }
        },
        threatLevel: Math.floor(Math.random() * 5) + 1
      };
      
      setDetectionData(mockData);
      setIsProcessing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Threat detection processing finished",
      });
    }, 2000);
  };

  const openInGoogleMaps = () => {
    if (detectionData?.location?.coordinates) {
      const { lat, lng } = detectionData.location.coordinates;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: "var(--gradient-dark)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Threat Detection System</h1>
              <p className="text-xs text-muted-foreground">Real-time Security Monitoring</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Image Analysis</h2>
            
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="h-32 flex-col gap-3 bg-primary/10 hover:bg-primary/20 border-2 border-dashed border-primary/30 text-foreground"
                  variant="outline"
                >
                  <Upload className="w-8 h-8" />
                  <span className="font-semibold">Upload Image</span>
                </Button>
                
                <Button
                  className="h-32 flex-col gap-3 bg-primary/10 hover:bg-primary/20 border-2 border-dashed border-primary/30 text-foreground"
                  variant="outline"
                >
                  <Camera className="w-8 h-8" />
                  <span className="font-semibold">Capture Photo</span>
                </Button>
              </div>

              {selectedImage && (
                <div className="mt-6 space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full rounded-lg border-2 border-border"
                  />
                  
                  {isProcessing && (
                    <div className="flex items-center justify-center gap-3 p-4 bg-primary/10 rounded-lg">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-foreground font-medium">Processing image...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {detectionData && (
              <>
                <ThreatLevelIndicator level={detectionData.threatLevel} />
                <DetectionResults data={detectionData} />
                
                {detectionData.location && (
                  <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Location Data
                      </h3>
                      <Button 
                        size="sm"
                        onClick={openInGoogleMaps}
                        className="gap-2 bg-primary hover:bg-primary/90"
                      >
                        <MapPin className="w-4 h-4" />
                        Open Maps
                      </Button>
                    </div>
                    <p className="text-muted-foreground">{detectionData.location.address}</p>
                  </Card>
                )}
              </>
            )}
            
            {!detectionData && !isProcessing && (
              <Card className="p-12 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Analysis Yet</h3>
                    <p className="text-muted-foreground">Upload or capture an image to start threat detection</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
