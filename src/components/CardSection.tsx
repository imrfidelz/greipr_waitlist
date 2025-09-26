import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Star, Gem, Zap, Shield } from "lucide-react";

const tiers = {
  basic: {
    name: 'Basic Tier',
    symbol: Shield,
    color: '#f6efe9',
    fg: '#8a6b5e',
    bgClass: 'bg-[#f6efe9]',
    textClass: 'text-[#8a6b5e]',
    description: 'Entry-level access with essential features'
  },
  bronze: {
    name: 'Bronze Tier',
    symbol: Award,
    color: '#efe0d7',
    fg: '#7a3f2a',
    bgClass: 'bg-[#efe0d7]',
    textClass: 'text-[#7a3f2a]',
    description: 'Enhanced features for growing professionals'
  },
  silver: {
    name: 'Silver Tier',
    symbol: Star,
    color: '#eef3f7',
    fg: '#2f4756',
    bgClass: 'bg-[#eef3f7]',
    textClass: 'text-[#2f4756]',
    description: 'Advanced tools for established careers'
  },
  gold: {
    name: 'Gold Tier',
    symbol: Crown,
    color: '#fff3d9',
    fg: '#6a4b12',
    bgClass: 'bg-[#fff3d9]',
    textClass: 'text-[#6a4b12]',
    description: 'Premium features for industry leaders'
  },
  platinum: {
    name: 'Platinum Tier',
    symbol: Gem,
    color: '#0f2030',
    fg: '#cfd6da',
    bgClass: 'bg-[#0f2030]',
    textClass: 'text-[#cfd6da]',
    description: 'Elite status with exclusive benefits'
  },
  diamond: {
    name: 'Diamond Tier',
    symbol: Zap,
    color: '#f0ebff',
    fg: '#3a1b5b',
    bgClass: 'bg-[#f0ebff]',
    textClass: 'text-[#3a1b5b]',
    description: 'Ultimate tier with unlimited access'
  }
};

const CardSection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  const mockData = {
    name: 'Isabel Mercado',
    wtl: 'WTL-2345-••••',
    exp: '12/2027'
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            GREiPR ESN (WTL) ID Templates
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional ID Cards
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Clean, professional ID cards for different membership tiers with secure WTL masking and Digital CV integration
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
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
            {selectedTier && (
              <Button
                variant="ghost"
                onClick={() => setSelectedTier(null)}
                size="sm"
              >
                View All
              </Button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(tiers).map(([tierKey, tier]) => {
            if (selectedTier && selectedTier !== tierKey) return null;
            
            const IconComponent = tier.symbol;
            
            return (
              <div
                key={tierKey}
                className="group cursor-pointer"
                onClick={() => setSelectedTier(selectedTier === tierKey ? null : tierKey)}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  {cardSide === 'front' ? (
                    /* Front Card */
                    <div 
                      className={`${tier.bgClass} p-6 min-h-[280px] flex flex-col justify-between relative overflow-hidden`}
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
                          className={`w-16 h-16 rounded-xl flex items-center justify-center ${tier.textClass}`}
                          style={{ backgroundColor: `${tier.fg}15` }}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className={`relative z-10 ${tier.textClass}`}>
                        <h3 className="text-2xl font-bold mb-2">{mockData.name}</h3>
                        <p className="text-lg font-medium mb-2">{tier.name}</p>
                        <p className="font-mono text-sm mb-2">{mockData.wtl}</p>
                        <p className="text-sm">Valid Thru {mockData.exp}</p>
                      </div>
                      
                      {/* Tier Badge */}
                      <div 
                        className={`absolute top-4 right-4 px-3 py-1 rounded-lg ${tier.textClass} text-xs font-semibold border`}
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
                      className={`${tier.bgClass} p-6 min-h-[280px] flex flex-col justify-between`}
                      style={{
                        background: `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`
                      }}
                    >
                      <div className={`${tier.textClass} space-y-4`}>
                        <h3 className="text-xl font-semibold">Digital CV</h3>
                        
                        {/* QR Code Placeholder */}
                        <div className="flex gap-6">
                          <div 
                            className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border-2"
                            style={{ borderColor: tier.fg }}
                          >
                            <div className="grid grid-cols-3 gap-1 p-2">
                              {Array.from({ length: 9 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="w-2 h-2 rounded-sm"
                                  style={{ backgroundColor: tier.fg }}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-2 text-sm">
                            <p><span className="font-semibold">Name:</span> {mockData.name}</p>
                            <p><span className="font-semibold">WTL:</span> {mockData.wtl}</p>
                            <p><span className="font-semibold">Tier:</span> {tier.name}</p>
                            <p><span className="font-semibold">Valid Thru:</span> {mockData.exp}</p>
                          </div>
                        </div>
                        
                        <p className="text-xs mt-4">Scan QR code for Digital CV</p>
                      </div>
                    </div>
                  )}
                </Card>
                
                {/* Tier Description */}
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-foreground mb-1">{tier.name}</h4>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            Professional ID card templates featuring tier-based access levels, secure WTL masking, 
            and integrated Digital CV functionality. Each tier offers distinct visual styling and 
            symbolic representation for clear identification.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardSection;