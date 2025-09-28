import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Backend API URL
const API_BASE_URL = "https://greip-backend.onrender.com/api/v1";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("job_seeker");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: userType === "job_seeker" ? "user" : "employers",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userTypeLabel = userType === "job_seeker" ? "job seeker" : "employer";
        toast({
          title: "Welcome to the waitlist!",
          description: `Thanks ${name}! Your Basic Tier ID has been created - ${userTypeLabel} features coming soon.`,
        });
        
        // Redirect to ID page with user data
        navigate("/id", { state: { userData: data.data } });
      } else {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting to backend:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-background">
      {/* Header */}
      <header className="flex flex-row items-center justify-between gap-4 p-4 sm:p-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3">
          <div>
            <span className="font-bold text-lg sm:text-xl hover:scale-105 transition-transform duration-300">GREiPR</span>
            <span className="text-muted-foreground text-xs sm:text-sm ml-2 hidden sm:inline">ESN-Powered Hiring</span>
          </div>
        </div>
        
        {/* User Type Toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex bg-foreground text-background rounded-full p-1 hover:scale-105 transition-transform duration-300">
            <button
              type="button"
              onClick={() => setUserType("job_seeker")}
              className={`px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                userType === "job_seeker" 
                  ? "bg-background text-foreground shadow-md" 
                  : "text-background/80 hover:text-background"
              }`}
            >
              <span className="hidden sm:inline">Employees / Jobseekers</span>
              <span className="sm:hidden">Employees</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType("employer")}
              className={`px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                userType === "employer" 
                  ? "bg-background text-foreground shadow-md" 
                  : "text-background/80 hover:text-background"
              }`}
            >
              Employers
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {userType === "job_seeker" ? (
            <>
              {/* Left Content - Job Seekers */}
              <div className="space-y-8 animate-fade-in">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-sm text-muted-foreground hover:scale-105 transition-all duration-300 hover:bg-muted/80">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  For Employees & Jobseekers (DEEPLOI)
                </div>

                {/* Main Headline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                    Discover Real Work <br />
                    Opportunities — Without <br />
                    the Risk.
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                    No agents. No scams. Build your ESN-backed digital portfolio and get 
                    matched to verified employers.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="flex-1 sm:w-40 lg:w-48"
                    />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 sm:w-40 lg:w-48"
                    />
                    <Button 
                      type="submit" 
                      disabled={!name || !email || isSubmitting}
                      className="bg-foreground text-background hover:bg-foreground/90 px-4 sm:px-6 whitespace-nowrap hover:scale-105 transition-all duration-300"
                    >
                      <span className="hidden sm:inline">{isSubmitting ? "Submitting..." : "Join the DEEPLOI Waitlist →"}</span>
                      <span className="sm:hidden">{isSubmitting ? "Submitting..." : "Join Waitlist"}</span>
                    </Button>
                  </form>
                  <Button 
                    variant="outline" 
                    onClick={handleLearnMore}
                    className="px-4 sm:px-6 w-full sm:w-auto hover:scale-105 transition-all duration-300"
                  >
                    Learn more
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm hover:scale-105 transition-all duration-300">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center pulse">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Verified Employers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm hover:scale-105 transition-all duration-300">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center pulse">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">ESN Digital Identity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm hover:scale-105 transition-all duration-300">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center pulse">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Scam-Free Listings</span>
                  </div>
                </div>
              </div>

              {/* Right Content - ESN Verification Card */}
              <div className="lg:ml-8 animate-fade-in">
                <Card className="p-6 space-y-6 bg-card border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Identity</p>
                      <p className="font-medium">ESN-Verified</p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground">Trust Badge Active</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">Candidate • DEEPLOI</p>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-muted-foreground">Real-time Updates</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Why this matters</p>
                    <p className="text-sm leading-relaxed">
                      Your Employment Security Number (ESN) becomes your portable work identity. 
                      Let your work speak — securely.
                    </p>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <>
              {/* Left Content - Employers */}
              <div className="space-y-8 animate-fade-in">
                {/* Main Headline */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                    Recruit Smarter. Onboard <br />
                    Better. <span className="underline decoration-4 underline-offset-8">Grow Faster.</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                    Hire from an ESN-verified talent pool, cut hiring risk, and standardize 
                    onboarding/offboarding in minutes.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="flex-1 sm:w-40 lg:w-48"
                    />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 sm:w-40 lg:w-48"
                    />
                    <Button 
                      type="submit" 
                      disabled={!name || !email || isSubmitting}
                      className="bg-foreground text-background hover:bg-foreground/90 px-4 sm:px-6 whitespace-nowrap hover:scale-105 transition-all duration-300"
                    >
                      <span className="hidden sm:inline">{isSubmitting ? "Submitting..." : "Join the STRAIVR Waitlist →"}</span>
                      <span className="sm:hidden">{isSubmitting ? "Submitting..." : "Join Waitlist"}</span>
                    </Button>
                  </form>
                  <Button 
                    variant="outline" 
                    onClick={handleLearnMore}
                    className="px-4 sm:px-6 w-full sm:w-auto hover:scale-105 transition-all duration-300"
                  >
                    Learn more
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">ESN Checks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Structured Onboarding</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Lower Hiring Risk</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Employer Verification Card */}
              <div className="lg:ml-8 animate-fade-in">
                <Card className="p-6 space-y-6 bg-card border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Identity</p>
                      <p className="font-medium">ESN-Verified</p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground">Trust Badge Active</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">Employer • STRAIVR</p>
                      <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-muted-foreground">Real-time Updates</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Why this matters</p>
                    <p className="text-sm leading-relaxed">
                      ESN history reveals real tenure, onboarding records, and references. See what's 
                      true — instantly.
                    </p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
