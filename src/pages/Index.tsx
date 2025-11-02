
import { useEffect } from 'react';
import Navbar from '@/components/sheared/Navbar';
import ClientLogos from '@/components/home/ClientLogos';
import FeatureCards from '@/components/home/FeatureCards';
import BusinessSection from '@/components/home/BusinessSection';
import Footer from '@/components/sheared/Footer';
import ScrollToTop from '@/components/sheared/ScrollToTop';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="hero-circle"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <div className="max-w-xl">
                <div className="animate-on-scroll">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Creativity and the{' '}
                    <span className="text-brand-green">future of work.</span>
                  </h1>
                </div>
                
                <div className="animate-on-scroll stagger-delay-1">
                  <p className="text-lg text-brand-gray-light mb-8 max-w-md">
                    This is the business of the future where it becomes possible for organizations to 
                    think creatively to foster collaboration and to make the way businesses manage their workforce. At our core, 
                    we provide the tools for businesses to foster creativity for hospitality companies and are committed to providing value.
                  </p>
                </div>
                
                <div className="animate-on-scroll stagger-delay-2 flex gap-4">
                  <Link to="/register">
                    <Button className="px-8 py-4 text-lg bg-brand-green text-white hover:bg-brand-green-light">
                      Join our workforce
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="animate-on-scroll stagger-delay-1 relative w-3/4">
                <div className="relative z-10 bg-white  overflow-hidden aspect-square">
                  <img 
                    src="/uploads/hero.png" 
                    alt="Hospitality Professional" 
                    className="w-full h-full object-cover "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ClientLogos />
      <BusinessSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
