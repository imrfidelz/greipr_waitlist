import { QrCode, Copy, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface ShareCVProps {
  esnId: string;
}

export const ShareCV = ({ esnId }: ShareCVProps) => {
  const [visibility, setVisibility] = useState({
    public: true,
    verifiedEmployersOnly: false,
    industryPeers: true,
  });

  const cvLink = `https://greipr.com/cv/${esnId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cvLink);
    toast.success("ESN link copied to clipboard!");
  };

  const handleGenerateQR = () => {
    toast.success("QR code generated! Download starting...");
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Share2 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Share Your CV</h2>
      </div>

      {/* ESN Link */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-foreground mb-2 block">Your ESN Link</Label>
        <div className="flex gap-2">
          <div className="flex-1 bg-muted/50 rounded-lg px-4 py-3 border border-border">
            <p className="text-sm font-mono text-foreground truncate">{cvLink}</p>
          </div>
          <Button onClick={handleCopyLink} variant="outline">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* QR Code */}
      <div className="mb-6">
        <Button onClick={handleGenerateQR} className="w-full" variant="outline">
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Perfect for physical resumes and networking events
        </p>
      </div>

      {/* Visibility Settings */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <Label className="text-sm font-semibold text-foreground">Visibility Permissions</Label>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="public" className="text-sm font-medium text-foreground">
                Public Profile
              </Label>
              <p className="text-xs text-muted-foreground">Anyone can view your CV</p>
            </div>
            <Switch
              id="public"
              checked={visibility.public}
              onCheckedChange={(checked) =>
                setVisibility({ ...visibility, public: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label
                htmlFor="employers"
                className="text-sm font-medium text-foreground"
              >
                Verified Employers Only
              </Label>
              <p className="text-xs text-muted-foreground">
                Restrict to employers on STRAiVR
              </p>
            </div>
            <Switch
              id="employers"
              checked={visibility.verifiedEmployersOnly}
              onCheckedChange={(checked) =>
                setVisibility({ ...visibility, verifiedEmployersOnly: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="peers" className="text-sm font-medium text-foreground">
                Industry Peers
              </Label>
              <p className="text-xs text-muted-foreground">
                Visible to verified peers in your industry
              </p>
            </div>
            <Switch
              id="peers"
              checked={visibility.industryPeers}
              onCheckedChange={(checked) =>
                setVisibility({ ...visibility, industryPeers: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
