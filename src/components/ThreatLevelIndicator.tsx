import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, AlertCircle, XCircle, CheckCircle } from "lucide-react";

interface ThreatLevelIndicatorProps {
  level: number; // 1-5
}

const ThreatLevelIndicator = ({ level }: ThreatLevelIndicatorProps) => {
  const getLevelInfo = () => {
    switch (level) {
      case 1:
        return {
          label: "Safe",
          color: "threat-safe",
          icon: CheckCircle,
          description: "No immediate threats detected"
        };
      case 2:
        return {
          label: "Low Threat",
          color: "threat-low",
          icon: Shield,
          description: "Minimal risk detected"
        };
      case 3:
        return {
          label: "Medium Threat",
          color: "threat-medium",
          icon: AlertCircle,
          description: "Moderate risk - monitoring required"
        };
      case 4:
        return {
          label: "High Threat",
          color: "threat-high",
          icon: AlertTriangle,
          description: "Significant risk - immediate attention needed"
        };
      case 5:
        return {
          label: "Critical Threat",
          color: "threat-critical",
          icon: XCircle,
          description: "Severe risk - take immediate action"
        };
      default:
        return {
          label: "Unknown",
          color: "muted",
          icon: AlertCircle,
          description: "Unable to assess threat level"
        };
    }
  };

  const levelInfo = getLevelInfo();
  const Icon = levelInfo.icon;

  return (
    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Threat Assessment</h3>
        <div className={`w-12 h-12 rounded-full bg-${levelInfo.color}/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${levelInfo.color}`} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-2xl font-bold text-${levelInfo.color}`}>
              {levelInfo.label}
            </span>
            <span className="text-sm text-muted-foreground">
              Level {level}/5
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{levelInfo.description}</p>
        </div>

        {/* Threat Level Bar */}
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i <= level
                    ? `bg-${levelInfo.color}`
                    : 'bg-muted/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThreatLevelIndicator;
