import { useState } from "react";
import { CheckCircle2, Clock, RefreshCw, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  industry: string;
  status: "verified" | "pending" | "review";
  description?: string;
  achievements?: string[];
  reference?: {
    name: string;
    contact: string;
  };
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusConfig = (status: Experience["status"]) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle2,
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success",
          label: "Verified",
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning",
          label: "Pending",
        };
      case "review":
        return {
          icon: RefreshCw,
          color: "text-muted-foreground",
          bgColor: "bg-muted/50",
          borderColor: "border-muted",
          label: "Under Review",
        };
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Experience & Verification</h2>

      <div className="space-y-4">
        {experiences.map((exp, index) => {
          const statusConfig = getStatusConfig(exp.status);
          const StatusIcon = statusConfig.icon;
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className={cn(
                "relative border-2 rounded-xl p-4 transition-all duration-300",
                statusConfig.borderColor,
                statusConfig.bgColor,
                "hover:shadow-lg"
              )}
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-full h-4 w-0.5 bg-border" />
              )}

              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2",
                    statusConfig.borderColor,
                    "bg-white"
                  )}
                >
                  <StatusIcon className={cn("w-6 h-6", statusConfig.color)} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </h3>
                      <p className="text-sm font-medium text-primary">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {exp.industry}
                      </Badge>
                      <Badge
                        className={cn("text-xs", statusConfig.color)}
                        variant={exp.status === "verified" ? "default" : "outline"}
                      >
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  {(exp.description || exp.achievements || exp.reference) && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                        className="mt-2 text-xs"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            View Details
                          </>
                        )}
                      </Button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t animate-in slide-in-from-top-2 duration-300">
                          {exp.description && (
                            <div className="mb-3">
                              <p className="text-sm font-semibold text-foreground mb-1">
                                Description
                              </p>
                              <p className="text-sm text-muted-foreground">{exp.description}</p>
                            </div>
                          )}

                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-semibold text-foreground mb-1">
                                Key Achievements
                              </p>
                              <ul className="list-disc list-inside space-y-1">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="text-sm text-muted-foreground">
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {exp.reference && (
                            <div className="bg-white/50 rounded-lg p-3">
                              <p className="text-sm font-semibold text-foreground mb-1">
                                Reference Contact
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {exp.reference.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {exp.reference.contact}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button className="w-full mt-6" variant="outline">
        + Add Experience
      </Button>
    </div>
  );
};
