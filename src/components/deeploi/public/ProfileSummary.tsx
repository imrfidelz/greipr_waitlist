import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, MapPin } from "lucide-react";

interface ProfileSummaryProps {
  name: string;
  esnId: string;
  tier: number;
  location: string;
  bio: string;
  employabilityScore: number;
  avatarUrl?: string;
  skills: string[];
}

export const ProfileSummary = ({
  name,
  esnId,
  tier,
  location,
  bio,
  employabilityScore,
  avatarUrl,
  skills,
}: ProfileSummaryProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-primary">{getInitials(name)}</span>
              )}
            </div>
          </div>
          {tier >= 3 && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">{name}</h1>
              <p className="text-sm font-mono text-muted-foreground mb-2">ESN: {esnId}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            </div>
            <Badge variant={tier >= 3 ? "default" : "secondary"} className="text-xs">
              Tier {tier}
            </Badge>
          </div>

          <p className="text-muted-foreground mb-4 max-w-2xl">{bio}</p>

          {/* Employability Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Employability Score</span>
              <span className="text-sm font-bold text-primary">{employabilityScore}%</span>
            </div>
            <Progress value={employabilityScore} className="h-2" />
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Primary Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
