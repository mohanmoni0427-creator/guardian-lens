import { Card } from "@/components/ui/card";
import { User, Calendar, Eye, Package, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DetectionResultsProps {
  data: {
    face: {
      detected: boolean;
      confidence: number;
      emotions: string[];
    };
    person: {
      gender: string;
      age: number;
      confidence: number;
    };
    objects: Array<{
      name: string;
      confidence: number;
    }>;
    text: string;
  };
}

const DetectionResults = ({ data }: DetectionResultsProps) => {
  return (
    <div className="space-y-4">
      {/* Face Detection */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Face Detection</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={data.face.detected ? "default" : "secondary"}>
              {data.face.detected ? "Detected" : "Not Detected"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className="text-sm font-medium text-foreground">
              {(data.face.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Emotions</span>
            <div className="flex gap-2">
              {data.face.emotions.map((emotion, idx) => (
                <Badge key={idx} variant="outline">{emotion}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Person Details */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Person Analysis</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Gender</span>
            <span className="text-sm font-medium text-foreground">{data.person.gender}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimated Age</span>
            <span className="text-sm font-medium text-foreground">{data.person.age} years</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className="text-sm font-medium text-foreground">
              {(data.person.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </Card>

      {/* Object Detection */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Objects Detected</h3>
        </div>
        <div className="space-y-2">
          {data.objects.map((obj, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{obj.name}</span>
              <span className="text-sm font-medium text-foreground">
                {(obj.confidence * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Text Extraction */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Extracted Text</h3>
        </div>
        <p className="text-sm text-muted-foreground bg-background/30 p-3 rounded border border-border/30">
          {data.text}
        </p>
      </Card>
    </div>
  );
};

export default DetectionResults;
