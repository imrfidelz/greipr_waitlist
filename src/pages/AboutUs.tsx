import { useState, useEffect } from 'react';
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Shield, 
  Heart, 
  Users, 
  Star, 
  Zap, 
  Target, 
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle through sections for demo
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const coreValues = [
    {
      icon: Lightbulb,
      title: "INNOVATION",
      description: "We constantly push boundaries with innovative solutions to meet the evolving demands of businesses.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      image: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    },
    {
      icon: Shield,
      title: "INTEGRITY",
      description: "In a world overwhelmed by technology and changing data, we commit to maintaining transparency and collaborating with innovative technologies, and in our approach to resources, the highest quality standard is maintained.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      image: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    },
    {
      icon: Heart,
      title: "AUTHENTICITY",
      description: "Our people are authentic and adhere to the highest level of ethics and honesty. We pride ourselves on being transparent with clients, colleagues, individuals and customers.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      image: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    },
    {
      icon: Users,
      title: "DIVERSITY",
      description: "Diversity strengthens people of all skill levels and cultural backgrounds. We provide equal access to opportunities and resources.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      image: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    }
  ];

  const whyChooseUs = [
    {
      icon: Star,
      title: "DIFFERENTIATION",
      description: "We are the premier differently abled platform for businesses to reach out from start-up to scale and are the best choice for sustainable business and human resource development.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Zap,
      title: "TECHNOLOGY",
      description: "The world has truly entered the era of data and technology and we are poised to harness this data and transform into simple processes that provide lasting solutions.",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Target,
      title: "COST LEADERSHIP",
      description: "Our prices are very affordable, as our model is created to set your financial burdens free. We provide cost-saving options as well as custom-tailored arrangements.",
      gradient: "from-green-400 to-teal-500"
    }
  ];

  const services = [
    {
      name: "GRUPPA",
      description: "Workforce and Recruitment hub",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      features: ["Talent Acquisition", "Workforce Management", "Skills Assessment"]
    },
    {
      name: "DEEPLOI",
      description: "Tech HR management platform",
      icon: "🤖",
      color: "from-purple-500 to-purple-600",
      features: ["AI-Powered HR", "Employee Analytics", "Performance Tracking"]
    },
    {
      name: "THINQRE",
      description: "Consultation and training",
      icon: "🎯",
      color: "from-green-500 to-green-600",
      features: ["Strategic Consulting", "Training Programs", "Skill Development"]
    },
    {
      name: "STRAIVR",
      description: "Digital Literacy initiative",
      icon: "🚀",
      color: "from-orange-500 to-orange-600",
      features: ["Digital Skills", "Technology Training", "Innovation Labs"]
    }
  ];

  const stats = [
    { number: "500+", label: "Companies Served", icon: Globe },
    { number: "10K+", label: "Professionals Placed", icon: Users },
    { number: "95%", label: "Client Satisfaction", icon: Award },
    { number: "24/7", label: "Support Available", icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/uploads/about.png" 
            alt="About Us Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/90 via-brand-green/70 to-emerald-600/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-white text-7xl font-bold mb-6 drop-shadow-lg">
              About <span className="text-yellow-300">GREiPR</span>
            </h1>
            <p className="text-white/90 text-xl max-w-3xl mx-auto drop-shadow mb-8 leading-relaxed">
              Transforming businesses through innovative HR solutions and cutting-edge technology. 
              We simplify human resource management while fostering growth and productivity.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                >
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Company Description */}
        <div className="max-w-5xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
              Who We Are
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-emerald-600 mx-auto mb-8"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-500">
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-gray-700 first-letter:text-6xl first-letter:font-bold first-letter:text-brand-green first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                The <span className="font-bold text-brand-green">GREIPR GROUP</span> as the name implies, is a mini-holding company for several tech and non-tech products and services centered around human resource structures 
                and processes, the hospitality/entertainment hub, growing businesses.
              </p>
              <p className="text-gray-700">
                Our company has made it a mission to provide the necessary resources for business activities, simplifying hospitality and simplifying human resource
                management processes. We understand the challenges that burden organizations today and want to offer cost-effective and efficient solutions to help manage the
                interaction with, fostering and improving hiring process for, and retention of valuable human resources while not adding technical/operational debt and scatter processes.
              </p>
              <div className="bg-gradient-to-r from-brand-green/10 to-emerald-100 p-6 rounded-2xl border-l-4 border-brand-green">
                <p className="text-gray-800 font-medium">
                  Paired with our core goal and mission, we provide tech-management of processes and services with a deep focus in event, hospitality outsourcing and consultancy.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To simplify human resource experience via our tech products to enhance and yet simplify human resource processes 
              to integrate with management systems. We aim to create smart AI individuals as integral tools and making the 
              experience of human-to-Human resource management seamless. 
              We go for total and effective enhancement of service delivery, leveraging on data to optimize both compliance and security.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-brand-green to-emerald-600 rounded-3xl shadow-xl p-8 lg:p-10 text-white hover:shadow-2xl transition-all duration-500 group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="text-white w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Mission</h2>
            </div>
            <p className="leading-relaxed text-lg text-white/95">
              To streamline organizational operations with innovative HR solutions. 
              We're committed to enhancing workplace productivity and 
              fostering growth through our dedication to providing top-tier 
              consulting services to give our clients a competitive advantage.
            </p>
            <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Discover How</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
        
        {/* Core Principles */}
        <div className="mb-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
              Core Principles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our fundamental values guide every decision we make and shape the way we serve our clients.
            </p>
          </div>
          
          <div className="space-y-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center animate-fade-in-up ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-3xl blur group-hover:blur-md transition-all duration-300" 
                         style={{ background: `linear-gradient(135deg, ${value.color.split(' ')[1]}, ${value.color.split(' ')[3]})` }}></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                      <img 
                        src={value.image}
                        alt={value.title} 
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <value.icon className="text-white w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <value.icon className="text-white w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {value.description}
                    </p>
                    <div className="mt-6">
                      <div className={`h-2 ${value.bgColor} rounded-full overflow-hidden`}>
                        <div className={`h-full bg-gradient-to-r ${value.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="mb-20 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover what sets us apart and makes us the preferred choice for businesses worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <item.icon className="text-white w-10 h-10" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500" 
                       style={{ background: `linear-gradient(135deg, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` }}></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-center group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  {item.description}
                </p>
                
                <div className="mt-6 flex justify-center">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* What We Do */}
        <div className="mb-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions designed to transform your business operations and drive growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 group animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <span className="text-4xl">{service.icon}</span>
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-all duration-500" 
                         style={{ background: `linear-gradient(135deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` }}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-brand-green group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Central Logo */}
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-brand-green to-emerald-600 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-all duration-700"></div>
              <div className="relative w-80 h-80 bg-gradient-to-br from-brand-green to-emerald-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 cursor-pointer">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <span className="text-brand-green font-bold text-6xl group-hover:rotate-12 transition-transform duration-500">G</span>
                </div>
                
                {/* Floating icons */}
                <div className="absolute top-8 right-16 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-bounce-slow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-12 left-12 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '1s' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-20 left-8 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '2s' }}>
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-brand-green to-emerald-600 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of companies that trust GREiPR to manage their human resources and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-brand-green hover:bg-gray-100 py-6 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-green py-6 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .first-letter\\:text-6xl::first-letter {
          font-size: 4rem;
          line-height: 1;
        }

        .first-letter\\:font-bold::first-letter {
          font-weight: 700;
        }

        .first-letter\\:text-brand-green::first-letter {
          color: var(--brand-green);
        }

        .first-letter\\:float-left::first-letter {
          float: left;
        }

        .first-letter\\:mr-3::first-letter {
          margin-right: 0.75rem;
        }

        .first-letter\\:mt-1::first-letter {
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
