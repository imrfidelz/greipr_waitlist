import { Shield, Calendar, Briefcase, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VerificationCardProps {
  esnId: string;
  issuanceDate: string;
  tier: number;
  industries: string[];
  verificationCount: number;
}

export const VerificationCard = ({
  esnId,
  issuanceDate,
  tier,
  industries,
  verificationCount,
}: VerificationCardProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-primary/30 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">ESN Verification</h2>
          <p className="text-sm text-muted-foreground">Your Digital Identity</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* ESN ID */}
        <div className="bg-white/70 rounded-xl p-4 border border-white/50">
          <p className="text-xs text-muted-foreground mb-1">Employee Serial Number</p>
          <p className="text-2xl font-mono font-bold text-primary">{esnId}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-xl p-4 border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <p className="text-xs text-muted-foreground">Issued</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{issuanceDate}</p>
          </div>

          <div className="bg-white/70 rounded-xl p-4 border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-xs text-muted-foreground">Tier Level</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">Tier {tier}</p>
              {tier >= 3 && (
                <Badge variant="default" className="bg-success text-white text-xs">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="bg-white/70 rounded-xl p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">Verified Industries</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry, index) => (
              <Badge key={index} variant="outline" className="border-primary/30 text-primary">
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Verification Stats */}
        <div className="bg-white/70 rounded-xl p-4 border border-white/50">
          <p className="text-xs text-muted-foreground mb-1">Total Verifications</p>
          <p className="text-3xl font-bold text-primary">{verificationCount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
          View Verification History
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" className="w-full border-primary/30">
          <TrendingUp className="w-4 h-4 mr-2" />
          Upgrade Tier
        </Button>
      </div>
    </div>
  );
};
