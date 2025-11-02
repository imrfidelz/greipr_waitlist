import { GraduationCap, FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
  verified: boolean;
  certificateUrl?: string;
}

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Education & Certifications</h2>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{edu.institution}</h3>
                    <p className="text-sm font-medium text-primary">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </div>
                  {edu.verified && (
                    <Badge variant="default" className="bg-success text-white">
                      Verified
                    </Badge>
                  )}
                </div>

                {edu.certificateUrl && (
                  <Button variant="outline" size="sm" className="mt-2">
                    <FileText className="w-4 h-4 mr-2" />
                    View Certificate
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-6" variant="outline">
        + Add Education
      </Button>
    </div>
  );
};
