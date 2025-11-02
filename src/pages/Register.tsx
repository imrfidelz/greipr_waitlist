
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Button } from "@/components/ui/button";
import { Check, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { authService } from '@/services/authService';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Validation
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authService.register({
        name: fullName,
        email,
        phoneNumber: phone,
        password,
        role: 'user'
      });

      if (response.success) {
        toast({
          title: "Registration successful",
          description: "Please select your account type to continue",
        });
        
        // Redirect to user type selection
        navigate('/user-type-selection');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.';
      const isEmailTaken = error.response?.status === 400 && /email.*already/i.test(errorMessage);

      if (isEmailTaken) {
        toast({
          title: "Email already in use",
          description: "You can log in with this email or reset your password.",
          action: (
            <ToastAction altText="Go to Login" onClick={() => navigate('/login', { state: { email } })}>
              Go to Login
            </ToastAction>
          ),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mt-6 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Job Seeker Info */}
          <div className="bg-cover bg-center min-h-[600px] relative" 
               style={{ backgroundImage: "url('/uploads/reg.png')" }}>
            <div className="absolute inset-0 bg-black/60 p-12 flex flex-col justify-center">
              <h2 className="text-white text-4xl font-bold mb-4">
                Job Seeker Platform<br />Registration
              </h2>
              
              <ul className="text-white mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>1 year full work portfolio, Re-engineered CV</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Identification card, background clearance cert</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Greipr event pass and job placements etc</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <p className="text-white text-lg mb-2">Fee</p>
                <h3 className="text-white text-5xl font-bold">₦5,000</h3>
              </div>
            </div>
          </div>
          
          {/* Right Side - Registration Form */}
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-8">Register</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text"
                  placeholder="Full name"
                  className="w-full p-4 bg-gray-100 rounded-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              
              <div>
                <input 
                  type="email"
                  placeholder="Email address"
                  className="w-full p-4 bg-gray-100 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <input 
                  type="tel"
                  placeholder="Phone number"
                  className="w-full p-4 bg-gray-100 rounded-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-4 bg-gray-100 rounded-md pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-4 bg-gray-100 rounded-md pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit"
                  className="w-full bg-brand-green text-white hover:bg-brand-green-light py-6 text-xl"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
