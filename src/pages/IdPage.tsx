import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

const IdPage = () => {
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { esn } = useParams();
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  // Basic tier configuration
  const tier = {
    name: 'Basic Tier',
    symbol: Shield,
    color: '#f6efe9',
    fg: '#8a6b5e',
    bgClass: 'bg-[#f6efe9]',
    textClass: 'text-[#8a6b5e]',
    description: 'Entry-level access with essential features'
  };

  // Fetch user data by ESN if ESN parameter exists
  useEffect(() => {
    const fetchUserData = async () => {
      if (esn) {
        setLoading(true);
        setError(null);
        try {
          // Clean the ESN parameter by removing any leading colon
          const cleanESN = esn.startsWith(':') ? esn.substring(1) : esn;
          console.log('Original ESN param:', esn);
          console.log('Cleaned ESN:', cleanESN);
          const response = await fetch(`https://greip-backend.onrender.com/api/v1/users/esn/${cleanESN}`);
          if (!response.ok) {
            throw new Error('User not found');
          }
          const result = await response.json();
          setUserData({
            name: result.data.name,
            wtl: result.data.esn,
            exp: '12/2027', // Default expiry
            joinDate: new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        // Get user data from navigation state or fallback to mock data
        const backendUserData = location.state?.userData;
        setUserData(backendUserData ? {
          name: backendUserData.name,
          wtl: backendUserData.esn,
          exp: '12/2027', // Default expiry
          joinDate: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          })
        } : {
          // Fallback mock data
          name: 'Isabel Mercado',
          wtl: 'WTL-2345-••••',
          exp: '12/2027',
          joinDate: 'Sept 2024'
        });
      }
    };

    fetchUserData();
  }, [esn, location.state]);

  // Download ID card as image
  const handleDownloadId = async () => {
    if (!cardRef.current || !userData) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `${userData.name.replace(/\s+/g, '_')}_ID_Card.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "ID Downloaded",
        description: "Your ID card has been saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download ID card. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Share ID functionality
  const handleShareId = async () => {
    const shareUrl = `${window.location.origin}/id/${userData?.wtl}`;
    const shareData = {
      title: `${userData?.name}'s Digital ID`,
      text: `Check out my professional digital ID card`,
      url: shareUrl,
    };

    try {
      // Try Web Share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Your ID has been shared.",
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "ID link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      // Final fallback - just show the URL
      toast({
        title: "Share Link",
        description: shareUrl,
      });
    }
  };

  const IconComponent = tier.symbol;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">User Not Found</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">Please check the ESN and try again.</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            GREiPR ESN Digital ID
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Your Professional ID
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome to the community! You've been assigned a {tier.name} membership.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
            <Button
              variant={cardSide === 'front' ? 'default' : 'outline'}
              onClick={() => setCardSide('front')}
              size="sm"
            >
              Front View
            </Button>
            <Button
              variant={cardSide === 'back' ? 'default' : 'outline'}
              onClick={() => setCardSide('back')}
              size="sm"
            >
              Back View
            </Button>
          </div>
        </div>

        {/* ID Card */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <Card ref={cardRef} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              {cardSide === 'front' ? (
                /* Front Card */
                <div 
                  className={`${tier.bgClass} p-8 min-h-[320px] flex flex-col justify-between relative overflow-hidden`}
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-current rounded-full"></div>
                    <div className="absolute top-8 right-6 w-1 h-1 bg-current rounded-full"></div>
                    <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-current rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-current rounded-full"></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-start justify-between relative z-10">
                    <div 
                      className={`w-20 h-20 rounded-xl flex items-center justify-center ${tier.textClass}`}
                      style={{ backgroundColor: `${tier.fg}15` }}
                    >
                      <IconComponent className="w-10 h-10" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`relative z-10 ${tier.textClass}`}>
                    <h2 className="text-3xl font-bold mb-3">{userData.name}</h2>
                    <p className="text-xl font-medium mb-3">{tier.name}</p>
                    <p className="font-mono text-base mb-2">{userData.wtl}</p>
                    <p className="text-sm">Valid Thru {userData.exp}</p>
                  </div>
                  
                  {/* Tier Badge */}
                  <div 
                    className={`absolute top-4 right-4 px-4 py-2 rounded-lg ${tier.textClass} text-xs font-semibold border`}
                    style={{ 
                      backgroundColor: `${tier.fg}10`,
                      borderColor: `${tier.fg}30`
                    }}
                  >
                    {tier.name}
                  </div>
                </div>
              ) : (
                /* Back Card */
                <div 
                  className={`${tier.bgClass} p-8 min-h-[320px] flex flex-col justify-between`}
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`
                  }}
                >
                  <div className={`${tier.textClass} space-y-6`}>
                    <h3 className="text-2xl font-semibold">Digital CV</h3>
                    
                    {/* QR Code and Info */}
                    <div className="flex gap-6">
                      <div 
                        className="w-28 h-28 bg-white rounded-lg flex items-center justify-center border-2 p-2"
                        style={{ borderColor: tier.fg }}
                      >
                        <QRCodeSVG
                          value={`${window.location.origin}/id/${userData.wtl}`}
                          size={96}
                          level="M"
                          bgColor="white"
                          fgColor={tier.fg}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3 text-sm">
                        <p><span className="font-semibold">Name:</span> {userData.name}</p>
                        <p><span className="font-semibold">WTL:</span> {userData.wtl}</p>
                        <p><span className="font-semibold">Tier:</span> {tier.name}</p>
                        <p><span className="font-semibold">Valid Thru:</span> {userData.exp}</p>
                        <p><span className="font-semibold">Joined:</span> {userData.joinDate}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs mt-4">Scan QR code to view Digital CV</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleDownloadId}
          >
            <Download className="w-4 h-4" />
            Download ID
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleShareId}
          >
            <Share2 className="w-4 h-4" />
            Share ID
          </Button>
        </div>

        {/* Info */}
        <div className="text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Your Membership Status</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've successfully joined the waitlist and received your {tier.name} membership. 
              As you engage with the community, you may be eligible for tier upgrades.
            </p>
            <p className="text-xs text-muted-foreground">
              ID issued on {userData.joinDate} • Membership benefits apply immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdPage;