import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
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
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-secondary">
                GREiPR
              </h3>
              <p className="text-white/80 mb-8 leading-relaxed max-w-md">
                Transforming the African hospitality industry through innovative solutions 
                that celebrate our rich culture while embracing modern efficiency and sustainability.
              </p>
              
              {/* Newsletter signup */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button 
                    type="submit" 
                    className="bg-secondary hover:bg-secondary/90 text-primary-dark font-semibold"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Solutions</h4>
              <ul className="space-y-3">
                <li><a href="#solutions" className="text-white/80 hover:text-secondary transition-colors duration-300">Kitchen Optimization</a></li>
                <li><a href="#solutions" className="text-white/80 hover:text-secondary transition-colors duration-300">Menu Design</a></li>
                <li><a href="#solutions" className="text-white/80 hover:text-secondary transition-colors duration-300">Brand Building</a></li>
                <li><a href="#community" className="text-white/80 hover:text-secondary transition-colors duration-300">Community</a></li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a href="mailto:hello@greipr.com" className="text-white/80 hover:text-secondary transition-colors duration-300">
                    hello@greipr.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a href="tel:+27123456789" className="text-white/80 hover:text-secondary transition-colors duration-300">
                    +27 12 345 6789
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">
                    Lagos, Nigeria<br />
                    Expanding across Africa
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Bottom footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60 text-sm">
            © {currentYear} GREiPR. All rights reserved. Building the future of African hospitality.
          </div>
          
          {/* Social links */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
