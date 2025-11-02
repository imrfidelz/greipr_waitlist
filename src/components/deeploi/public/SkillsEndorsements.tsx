import { Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  endorsements: number;
  proficiency: number;
}

interface SkillsEndorsementsProps {
  skills: Skill[];
}

export const SkillsEndorsements = ({ skills }: SkillsEndorsementsProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">Skills & Endorsements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">{skill.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{skill.endorsements} endorsements</span>
                </div>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                {skill.proficiency}%
              </Badge>
            </div>

            <div>
              <Progress value={skill.proficiency} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
