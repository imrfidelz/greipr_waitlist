import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose STRAIVR?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Streamline your hiring process with ESN-verified talent and structured onboarding
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="p-6 sm:p-8 bg-card border text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">ESN-Verified Talent Pool</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Instant visibility into real work history with Employment Security Numbers.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 bg-card border text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Reduce Hiring Risk</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Background clarity and reference flow built-in. Hire right the first time.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 bg-card border text-center sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Onboard in Minutes</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Standardize onboarding/offboarding and track progress with zero chaos.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;