import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Aadhaar (12 digits)
    if (!/^\d{12}$/.test(aadhaar)) {
      toast({
        title: "Invalid Aadhaar",
        description: "Aadhaar must be exactly 12 digits",
        variant: "destructive",
      });
      return;
    }

    // Validate DOB
    if (!dob) {
      toast({
        title: "Invalid Date",
        description: "Please enter your date of birth",
        variant: "destructive",
      });
      return;
    }

    // Store auth data and navigate
    sessionStorage.setItem("authenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "var(--gradient-dark)",
        }}
      />
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "var(--gradient-glow)",
        }}
      />

      <Card className="w-full max-w-md p-8 relative z-10 border-border/50 backdrop-blur-sm bg-card/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Threat Detection System</h1>
          <p className="text-muted-foreground text-center">Secure Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="aadhaar" className="text-foreground">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              type="text"
              placeholder="Enter 12-digit Aadhaar"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))}
              maxLength={12}
              className="bg-background/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-foreground">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-background/50 border-border"
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Your credentials are encrypted and secured
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Access System
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
