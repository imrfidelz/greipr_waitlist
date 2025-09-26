import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const solutions = [
  {
    icon: Users,
    title: "For Job Seekers",
    subtitle: "Find Your Dream Career",
    description: "Access verified job opportunities from reputable employers across Africa. Showcase your skills, build your professional profile, and advance your career.",
    features: ["Verified job listings", "AI-powered skill assessment", "Personalized career guidance", "Professional networking"],
    stats: "50,000+ Active Job Seekers",
    cta: "Start Your Journey",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Building2,
    title: "For Employers",
    subtitle: "Hire Top Talent",
    description: "Find qualified, pre-screened candidates quickly and efficiently. Post jobs, manage applications, and hire the best talent for your organization.",
    features: ["AI candidate screening", "Smart application management", "Automated interview scheduling", "Advanced talent analytics"],
    stats: "5,000+ Trusted Companies",
    cta: "Post a Job",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Verified Matching",
    subtitle: "Trust & Security First",
    description: "Our advanced verification system ensures quality connections between genuine employers and skilled professionals, creating trust on both sides.",
    features: ["Multi-layer identity verification", "Skills validation & testing", "Company verification process", "Comprehensive background checks"],
    stats: "99.8% Verification Rate",
    cta: "Learn More",
    color: "from-purple-500 to-violet-500"
  }
];

const SolutionsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'orbital' | 'grid'>('orbital');
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 55,000+ Professionals
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering Africa's workforce through innovative technology and 
            verified connections that drive career success
          </p>
          
          {/* View Toggle for Mobile */}
          <div className="mt-8 flex justify-center lg:hidden">
            <div className="inline-flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveView('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'grid' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setActiveView('orbital')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'orbital' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Orbital View
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className={`lg:hidden ${activeView === 'grid' ? 'block' : 'hidden'}`}>
          <div className="grid gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={solution.title}
                className="group hover:shadow-warm transition-all duration-500 border-glass hover:border-primary/30 backdrop-blur-glass bg-glass/50 hover:bg-glass/70 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                        {solution.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">{solution.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {solution.stats}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </CardDescription>
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li 
                        key={feature} 
                        className="flex items-center text-sm text-muted-foreground animate-fade-in"
                        style={{ animationDelay: `${(index * 0.2) + (featureIndex * 0.1)}s` }}
                      >
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
                    size="lg"
                  >
                    {solution.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Orbital Layout for Desktop */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center min-h-[900px]">
            {/* Enhanced Central Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full bg-gradient-primary shadow-glow flex flex-col items-center justify-center text-center p-10 animate-fade-in backdrop-blur-glass border border-white/20 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                {selectedSolution !== null ? (
                  <div className="relative z-10 animate-fade-in">
                    {(() => {
                      const IconComponent = solutions[selectedSolution].icon;
                      return (
                        <>
                          <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${solutions[selectedSolution].color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {solutions[selectedSolution].title}
                          </h3>
                          <p className="text-white/90 text-lg mb-4">
                            {solutions[selectedSolution].subtitle}
                          </p>
                          <p className="text-white/80 text-sm leading-relaxed mb-6">
                            {solutions[selectedSolution].description}
                          </p>
                          <div className="text-white/70 text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">
                            {solutions[selectedSolution].stats}
                          </div>
                          <button
                            onClick={() => setSelectedSolution(null)}
                            className="text-white/60 hover:text-white text-sm underline transition-colors"
                          >
                            Back to Overview
                          </button>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-white mb-4">
                      Connecting Africa's Talent
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      Building bridges between opportunity and talent across the continent
                    </p>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        55,000+ Users
                      </div>
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        5,000+ Companies
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mt-4">
                      Click on any orbit item to learn more
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[650px] h-[650px] rounded-full border-2 border-primary/20 animate-spin opacity-60" style={{ animationDuration: '120s' }}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[750px] h-[750px] rounded-full border border-primary/10 animate-spin opacity-40" style={{ animationDuration: '180s', animationDirection: 'reverse' }}></div>
            </div>

            {/* Enhanced Solution Cards in Orbit */}
            {solutions.map((solution, index) => {
              const angles = [-90, 30, 150]; // Better positioning
              const angle = angles[index];
              const radius = 320;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={solution.title}
                  className="absolute animate-fade-in"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    left: '50%',
                    top: '50%',
                    animationDelay: `${index * 0.4}s`
                  }}
                >
                  {/* Enhanced Connecting Line */}
                  <div 
                    className={`absolute transition-all duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                      width: `${radius}px`,
                      height: '2px',
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, transparent 100%)`,
                      transformOrigin: '0 50%',
                      transform: `rotate(${angle + 180}deg)`,
                      left: '50%',
                      top: '50%'
                    }}
                  ></div>

                  <Card 
                    className={`w-80 group hover:shadow-glow transition-all duration-500 border-glass backdrop-blur-glass bg-glass/50 hover:bg-glass/80 relative z-10 cursor-pointer ${
                      hoveredCard === index ? 'scale-110 border-primary/50' : 'hover:scale-105 hover:border-primary/30'
                    } ${selectedSolution === index ? 'ring-2 ring-primary border-primary' : ''}`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedSolution(index)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <solution.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                            {solution.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground font-medium">{solution.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full w-fit">
                        {solution.stats}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                        {solution.description}
                      </CardDescription>
                      <Button 
                        className={`w-full group/btn transition-all duration-300 ${
                          hoveredCard === index 
                            ? 'bg-gradient-to-r from-primary to-primary/80 text-white' 
                            : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                        }`}
                        size="lg"
                      >
                        {solution.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Orbital Layout */}
        <div className={`lg:hidden ${activeView === 'orbital' ? 'block' : 'hidden'}`}>
          <div className="relative flex items-center justify-center min-h-[600px] scale-75">
            {/* Simplified central circle for mobile */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-primary shadow-glow flex flex-col items-center justify-center text-center p-6 animate-fade-in backdrop-blur-glass border border-white/20">
                <h3 className="text-lg font-bold text-white mb-2">
                  Connecting Africa's Talent
                </h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  55,000+ Professionals Trust Us
                </p>
              </div>
            </div>

            {/* Simplified orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '60s' }}></div>
            </div>

            {/* Mobile orbital cards */}
            {solutions.map((solution, index) => {
              const angles = [-90, 30, 150];
              const angle = angles[index];
              const radius = 180;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={solution.title}
                  className="absolute animate-fade-in"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <Card className="w-52 group hover:shadow-warm transition-all duration-500 border-glass hover:border-primary/30 backdrop-blur-glass bg-glass/50 hover:bg-glass/70 hover:scale-105 relative z-10 cursor-pointer"
                    onClick={() => setSelectedSolution(index)}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                        {solution.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{solution.subtitle}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full text-center">
                        {solution.stats}
                      </div>
                      <Button 
                        className="w-full group/btn bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs"
                        size="sm"
                      >
                        {solution.cta}
                        <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;