const VisionMetricsSection = () => {
  const metrics = [
    {
      number: "2M+",
      label: "workers verified with WTLs within 2 years"
    },
    {
      number: "300",
      label: "hospitality businesses onboarded"
    },
    {
      number: "500",
      label: "vendors integrated"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Content */}
        <div className="text-center space-y-8 sm:space-y-12">
          {/* Headline */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight hover:text-primary transition-colors duration-300">
              Millions of work identities.<br />
              Thousands of businesses.<br />
              One trusted system.
            </h2>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl text-muted-foreground animate-fade-in">
                GREiPR's mission is to formalize Africa's workforce:
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-background border rounded-lg p-6 sm:p-8 text-center space-y-3 hover:shadow-lg hover:scale-105 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary hover:scale-110 transition-transform duration-300">
                  {metric.number}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Market Context */}
          <div className="bg-background border rounded-xl p-6 sm:p-8 max-w-4xl mx-auto hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
              Backed by a market of <span className="font-semibold text-foreground">84M+ active Nigerian workers</span>, where <span className="font-semibold text-foreground">92% lack formal systems</span>
            </p>
          </div>

          {/* Mission Statement */}
          <div className="space-y-4 animate-fade-in">
            <p className="text-lg sm:text-xl font-medium text-foreground max-w-3xl mx-auto leading-relaxed hover:text-primary transition-colors duration-300">
              Every WTL is proof that powers jobs, credit, healthcare, and opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMetricsSection;
