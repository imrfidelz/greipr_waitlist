import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import VisionMetricsSection from "@/components/VisionMetricsSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <VisionMetricsSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
