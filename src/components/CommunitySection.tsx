import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, MessageCircle, GraduationCap } from "lucide-react";
import designTeamImage from "@/assets/design-team.png";

const resources = [
  {
    icon: Briefcase,
    title: "Career Resources",
    description: "Access resume templates, interview guides, and career development tools to advance your professional journey."
  },
  {
    icon: Calendar,
    title: "Networking Events",
    description: "Join regular career fairs, industry meetups, and professional networking events across Africa."
  },
  {
    icon: MessageCircle,
    title: "Professional Community",
    description: "Connect with peers, mentors, and industry leaders. Share experiences and grow your network."
  },
  {
    icon: GraduationCap,
    title: "Skills Development",
    description: "Enhance your skills with professional courses and certifications that employers value."
  }
];

const CommunitySection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="animate-fade-in order-2 lg:order-1">
            <div className="relative">
              <img 
                src={designTeamImage} 
                alt="Design team collaborating on digital projects" 
                className="w-full rounded-2xl shadow-warm"
              />
              <div className="absolute inset-0 bg-gradient-warm opacity-10 rounded-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Professional Network & Growth
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12">
              Join Africa's largest professional community. Access career resources, 
              connect with industry leaders, and accelerate your career growth through 
              networking and continuous learning.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card 
                  key={resource.title} 
                  className="group hover:shadow-warm transition-all duration-300 border-glass hover:border-primary/30 backdrop-blur-glass bg-glass/50 hover:bg-glass/70 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 mb-3 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;