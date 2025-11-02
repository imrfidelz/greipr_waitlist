import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, TrendingUp, TrendingDown, Award, Target, Calendar, Share2, CheckCircle2, Mail, MessageSquare, Copy, Link2, Twitter, Linkedin, Facebook  } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const EmployabilityScore = () => {
  const [score, setScore] = useState(720);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [progressValues, setProgressValues] = useState({ skills: 0, experience: 0, profile: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const minScore = 300;
  const maxScore = 850;
  const [scoreChange] = useState(12);
  const lastUpdated = "August 18, 2021";

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = score / 50;
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return Math.min(prev + increment, score);
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  // Animate progress bars
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValues({ skills: 85, experience: 78, profile: 92 });
      setSkillsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setAnimatedScore(0);
    setProgressValues({ skills: 0, experience: 0, profile: 0 });
    
    setTimeout(() => {
      // Animate score refresh
      const increment = score / 30;
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            setIsRefreshing(false);
            return score;
          }
          return Math.min(prev + increment, score);
        });
      }, 50);
      
      // Re-animate progress bars
      setTimeout(() => {
        setProgressValues({ skills: 85, experience: 78, profile: 92 });
      }, 500);
    }, 1000);
  };

  const profileUrl = window.location.origin + "/esn-score";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link copied!",
      description: "Profile link copied to clipboard",
    });
  };

  const handleShare = (platform: string) => {
    const text = "Check out my GREiPR ESN Score - Digital Work Identity";
    const url = profileUrl;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    setShareDialogOpen(false);
  };

  const getScoreColor = (score: number) => {
    if (score < 450) return "hsl(0, 84%, 60%)"; // red
    if (score < 600) return "hsl(39, 100%, 50%)"; // orange
    if (score < 700) return "hsl(45, 100%, 51%)"; // yellow
    return "hsl(142, 71%, 45%)"; // green
  };

  const getScoreRating = (score: number) => {
    if (score < 450) return "Needs Improvement";
    if (score < 600) return "Fair";
    if (score < 700) return "Good";
    if (score < 800) return "Very Good";
    return "Excellent";
  };

  const scorePercentage = ((animatedScore - minScore) / (maxScore - minScore)) * 100;

  return (
     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <header className="glass-card rounded-3xl p-6 animate-fade-in border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg gold-glow animate-float hover:scale-110 transition-all duration-300 cursor-pointer">
                G
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  GREiPR
                </h1>
                <p className="text-sm text-muted-foreground font-medium opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                  Digital Work Identity Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className="bg-white/50 border-primary/20 hover:bg-white/70 transition-all duration-300 hover:scale-105 hover:border-primary/40 animate-bounce-subtle"
              >
                ESN: WTL-23•••1982
              </Badge>
              <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="gold-gradient text-primary-foreground border-0 gold-glow gap-2 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg transform-gpu"
                  >
                    <Share2 className="w-4 h-4 animate-pulse" />
                    Share Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md glass-card animate-scale-in">
                  <DialogHeader>
                    <DialogTitle className="font-display animate-fade-in">Share Your ESN Profile</DialogTitle>
                    <DialogDescription className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      Share your verified digital work identity with employers and connections
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Copy Link */}
                    <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm truncate">
                        {profileUrl}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCopyLink} 
                        className="gap-2 hover:scale-105 transition-all duration-200"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                    
                    {/* Social Share Buttons */}
                    <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <p className="text-sm font-medium">Share on social media</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant="outline" 
                          className="gap-2 bg-white/50 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-all duration-300 hover:scale-105"
                          onClick={() => handleShare('twitter')}
                        >
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </Button>
                        <Button 
                          variant="outline" 
                          className="gap-2 bg-white/50 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all duration-300 hover:scale-105"
                          onClick={() => handleShare('linkedin')}
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </Button>
                        <Button 
                          variant="outline" 
                          className="gap-2 bg-white/50 hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2] transition-all duration-300 hover:scale-105"
                          onClick={() => handleShare('facebook')}
                        >
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Identity Card */}
        <Card className="glass-card rounded-3xl p-8 animate-scale-in border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative hover:-translate-y-1 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-2xl gold-gradient gold-glow flex items-center justify-center text-6xl animate-float shadow-2xl hover:scale-110 transition-all duration-500 cursor-pointer group-hover:rotate-3">
              🦅
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-3xl font-display font-bold hover:scale-105 transition-transform duration-300">
                      Gold Onyekwere
                    </h2>
                    <CheckCircle2 className="w-6 h-6 text-primary animate-glow hover:scale-125 transition-all duration-300" />
                  </div>
                  <p className="text-lg font-medium text-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Legal Officer • Fintech Compliance
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <span className="text-lg animate-bounce-subtle">🇳🇬</span> Nigeria • Lagos
                  </p>
                </div>
                <Badge className="gold-gradient text-primary-foreground border-0 gold-glow px-4 py-2 text-sm font-bold shadow-lg hover:scale-110 transition-all duration-300 animate-pulse-subtle">
                  ★ GOLD TIER
                </Badge>
              </div>
              <p className="text-foreground/90 leading-relaxed text-base animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Forward-thinking legal professional specializing in fintech compliance frameworks and NDPA implementation. 
                Verified ESN holder with multi-tier authentication and proven expertise in regulatory excellence.
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { text: "✓ Verified Profile", color: "primary", delay: "0.5s" },
                  { text: "🟢 Available for Hire", color: "green", delay: "0.6s" },
                  { text: "📊 Top 5% Performer", color: "blue", delay: "0.7s" }
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-full bg-${badge.color === 'primary' ? 'primary' : badge.color === 'green' ? 'green-500' : 'blue-500'}/10 text-${badge.color === 'primary' ? 'primary' : badge.color === 'green' ? 'green-600' : 'blue-600'} text-sm font-semibold border border-${badge.color === 'primary' ? 'primary' : badge.color === 'green' ? 'green-500' : 'blue-500'}/20 animate-fade-in-up hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-md`}
                    style={{ animationDelay: badge.delay, animationFillMode: 'forwards', opacity: 0 }}
                  >
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Main Score Card */}
        <Card className="relative overflow-hidden glass-card rounded-3xl border-2 border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <CardHeader className="relative">
            <CardTitle className="text-3xl font-display bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Your ESN Score
            </CardTitle>
            <CardDescription className="text-base animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Employment Suitability Network Score • Powered by DeepLoi AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            {/* Circular Score Gauge */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-72 h-72 hover:scale-105 transition-transform duration-500">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="144"
                    cy="144"
                    r="120"
                    stroke="hsl(var(--muted))"
                    strokeWidth="24"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Score Arc */}
                  <circle
                    cx="144"
                    cy="144"
                    r="120"
                    stroke={getScoreColor(score)}
                    strokeWidth="24"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(scorePercentage / 100) * 754} 754`}
                    className="transition-all duration-2000 ease-out drop-shadow-lg animate-draw-circle"
                    style={{ 
                      filter: `drop-shadow(0 0 10px ${getScoreColor(score)}40)`,
                      animation: isRefreshing ? 'spin 1s linear infinite' : undefined
                    }}
                  />
                </svg>
                {/* Score Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent transition-all duration-500 hover:scale-110">
                      {Math.round(animatedScore)}
                    </span>
                    {scoreChange !== 0 && (
                      <Badge
                        variant="outline"
                        className="border-primary text-primary bg-primary/10 px-3 py-1 animate-scale-in hover:scale-110 transition-all duration-300"
                      >
                        {scoreChange > 0 ? <TrendingUp className="w-4 h-4 mr-1 animate-bounce-subtle" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {Math.abs(scoreChange)}
                      </Badge>
                    )}
                  </div>
                  <span className="text-base font-semibold text-muted-foreground mt-3 animate-fade-in" style={{ color: getScoreColor(score), animationDelay: '1s' }}>
                    {getScoreRating(score)}
                  </span>
                </div>
              </div>
              
              {/* Score Range */}
              <div className="flex justify-between w-72 mt-6 text-sm font-medium text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-muted hover:scale-110 transition-all duration-300 cursor-pointer">
                  {minScore}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted hover:scale-110 transition-all duration-300 cursor-pointer">
                  {maxScore}
                </span>
              </div>
            </div>

            {/* Last Updated & Refresh */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
                <Calendar className="w-4 h-4 animate-bounce-subtle" />
                Updated: {lastUpdated}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2 hover:scale-105 transition-all duration-300 hover:shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : "hover:rotate-180 transition-transform duration-300"}`} />
                Refresh Score
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Score Factors */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Skills Match", description: "85% Match Rate", value: progressValues.skills, icon: Award, color: "primary" },
            { title: "Experience", description: "4+ Years", value: progressValues.experience, icon: Target, color: "primary" },
            { title: "Profile Quality", description: "92% Complete", value: progressValues.profile, icon: TrendingUp, color: "primary" }
          ].map((factor, idx) => (
            <Card 
              key={idx}
              className="glass-card rounded-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-500 hover:shadow-lg group hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(factor.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-md group-hover:rotate-12">
                    <factor.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display group-hover:text-primary transition-colors duration-300">
                      {factor.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium">
                      {factor.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={factor.value} 
                  className="h-3 shadow-sm group-hover:shadow-md transition-all duration-500" 
                />
                <div className="text-right text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {factor.value}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Timeline */}
        <Card className="glass-card rounded-3xl p-8 animate-fade-in hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-xl font-display font-bold mb-6 hover:text-primary transition-colors duration-300">
            Professional Journey
          </h3>
          <div className="space-y-4">
            {[
              { year: "2025", role: "Legal Officer", company: "GREiPR LTD", verified: true, current: true },
              { year: "2023", role: "Compliance Analyst", company: "XYZ Ventures", verified: false, current: false },
              { year: "2020", role: "Legal Intern", company: "ABC Corp", verified: true, current: false },
            ].map((job, idx) => (
              <div 
                key={idx} 
                className="flex gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 cursor-pointer group hover:scale-102 hover:shadow-md animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${job.verified ? 'bg-primary group-hover:scale-150 group-hover:shadow-lg' : 'bg-muted'}`} />
                  {idx !== 2 && <div className="w-0.5 h-full bg-border" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold group-hover:text-primary transition-colors duration-300">
                      {job.role}
                    </p>
                    {job.verified && <CheckCircle2 className="w-4 h-4 text-primary animate-glow group-hover:scale-125 transition-all duration-300" />}
                    {job.current && <Badge variant="secondary" className="text-xs animate-pulse-subtle">Current</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{job.year} → {job.current ? 'Present' : '2025'}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills Grid */}
        <Card className="glass-card rounded-3xl p-8 animate-fade-in hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-xl font-display font-bold mb-6 hover:text-primary transition-colors duration-300">
            Skills & Competencies
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Compliance", level: 95 },
              { name: "Risk Management", level: 88 },
              { name: "Legal Drafting", level: 92 },
              { name: "Fintech Law", level: 85 },
              { name: "NDPA Implementation", level: 90 },
              { name: "Ethics", level: 96 },
            ].map((skill, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:scale-110 hover:shadow-lg ${skillsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-glow group-hover:scale-150 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Certificates */}
        <Card className="glass-card rounded-3xl p-8 animate-fade-in hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-xl font-display font-bold mb-6 hover:text-primary transition-colors duration-300">
            Certificates & Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: "Bronze", date: "Jan 2024", emoji: "🦌" },
              { tier: "Silver", date: "Jun 2024", emoji: "🐺" },
              { tier: "Gold", date: "Oct 2025", emoji: "🦅" },
            ].map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 border border-white/40 hover:scale-110 transition-all duration-500 cursor-pointer group hover:shadow-xl animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {cert.emoji}
                </div>
                <p className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                  {cert.tier} Tier
                </p>
                <p className="text-sm text-muted-foreground">Verified {cert.date}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 w-full text-primary hover:scale-105 transition-all duration-300 hover:bg-primary/10"
                >
                  Verify Certificate
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Summary */}
        <Card className="glass-card rounded-3xl p-8 animate-fade-in hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-xl font-display font-bold mb-4 hover:text-primary transition-colors duration-300">
            AI Profile Summary
          </h3>
          <p className="text-foreground/80 leading-relaxed hover:text-foreground transition-colors duration-300">
            Gold is a forward-thinking Legal Officer specializing in fintech compliance and NDPA frameworks. 
            With a verified ESN status and multi-tier validation, she represents the next generation of ethical, 
            data-driven professionals ready to navigate complex regulatory landscapes with precision and integrity.
          </p>
        </Card>

        {/* Contact Panel */}
        <Card className="glass-card rounded-3xl p-8 animate-fade-in border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-2xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            Contact & Collaboration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="gold-gradient text-primary-foreground border-0 gold-glow hover:opacity-90 transition-all duration-300 h-12 shadow-lg hover:shadow-xl hover:scale-105 group">
              <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Request Access
            </Button>
            <Button variant="outline" className="bg-white/50 hover:bg-white/70 border-2 hover:border-primary/30 transition-all duration-300 h-12 shadow-md hover:shadow-lg hover:scale-105 group">
              <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Schedule Interview
            </Button>
            <Button variant="outline" className="bg-white/50 hover:bg-white/70 border-2 hover:border-primary/30 transition-all duration-300 h-12 shadow-md hover:shadow-lg hover:scale-105 group">
              <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Send Message
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground space-y-2 animate-fade-in hover:text-foreground transition-colors duration-500">
          <p className="font-semibold">Powered by GREiPR | DEEPLOi | STRAiVR</p>
          <p className="text-xs">© 2025 GREiPR LIMITED — "Creativity and the Future of Work"</p>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
        }

        @keyframes draw-circle {
          from {
            stroke-dasharray: 0 754;
          }
          to {
            stroke-dasharray: ${(scorePercentage / 100) * 754} 754;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-draw-circle {
          animation: draw-circle 2s ease-out forwards;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        .transition-bounce {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
     </div>
  );
};

export default EmployabilityScore;
