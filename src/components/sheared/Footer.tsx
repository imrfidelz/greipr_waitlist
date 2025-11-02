import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed successfully!",
        description: "You'll receive our latest updates and insights.",
      });
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/80 text-sm">
            © {currentYear} GREiPR. All rights reserved. Building the future of African hospitality.
          </div>
          
          {/* Social links */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-green hover:scale-110 transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-green hover:scale-110 transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-green hover:scale-110 transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-green hover:scale-110 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
