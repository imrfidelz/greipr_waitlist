import teamImage from "@/assets/team-collaboration.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Revolutionizing African Talent Acquisition
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                We are Africa's premier talent matching platform, connecting skilled professionals 
                with quality employers across the continent. Our mission is to bridge the employment 
                gap by providing verified candidates and streamlined recruitment processes that 
                benefit both job seekers and employers.
              </p>
              
              <p>
                Through our comprehensive approach focusing on <span className="text-primary font-semibold">Verified Skills</span>, 
                <span className="text-primary font-semibold"> Cultural Fit</span>, and 
                <span className="text-primary font-semibold"> Career Growth</span>, we create meaningful 
                connections that drive success for professionals and organizations across Africa.
              </p>
            </div>

          </div>

          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Professional African team collaboration" 
                className="w-full rounded-2xl shadow-warm"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;