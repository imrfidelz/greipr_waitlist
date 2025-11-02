
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './UserProfileDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!(token && user));
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'text-brand-green after:w-full' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about-us" 
            className={`nav-link ${isActive('/about-us') ? 'text-brand-green after:w-full' : ''}`}
          >
            About Us
          </Link>
          <Link 
            to="/events" 
            className={`nav-link ${isActive('/events') ? 'text-brand-green after:w-full' : ''}`}
          >
            Events
          </Link>
          <Link 
            to="/contact-us" 
            className={`nav-link ${isActive('/contact-us') ? 'text-brand-green after:w-full' : ''}`}
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="secondary" 
                className="border-brand-green text-brand-green hover:bg-brand-green/5 whitespace-nowrap h-full py-3 px-6"
              >
                Dashboard
              </Button>
              <UserProfileDropdown />
            </>
          ) : (
            <>
              <Link to="/login" className="w-auto">
                <Button variant="secondary" className="border-brand-green text-brand-green hover:bg-brand-green/5 whitespace-nowrap h-full py-3 px-6">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="w-auto">
                <Button className="bg-brand-green text-white hover:bg-brand-green-light whitespace-nowrap h-full py-3 px-6">
                  Join our workforce
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-brand-gray hover:text-brand-green transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`py-2 px-4 hover:bg-slate-50 rounded-md transition-colors ${
                isActive('/') ? 'text-brand-green font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about-us" 
              className={`py-2 px-4 hover:bg-slate-50 rounded-md transition-colors ${
                isActive('/about-us') ? 'text-brand-green font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/events" 
              className={`py-2 px-4 hover:bg-slate-50 rounded-md transition-colors ${
                isActive('/events') ? 'text-brand-green font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/contact-us" 
              className={`py-2 px-4 hover:bg-slate-50 rounded-md transition-colors ${
                isActive('/contact-us') ? 'text-brand-green font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-brand-green text-white hover:bg-brand-green-light">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="secondary" className="w-full border-brand-green text-brand-green hover:bg-brand-green/5">
                    Login
                  </Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-brand-green text-white hover:bg-brand-green-light">
                    Join our workforce
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
