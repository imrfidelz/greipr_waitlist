
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { authService } from '@/services/authService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = (location.state as any)?.email || '';
  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [tempToken, setTempToken] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const response = await authService.login(email, password);
      
      // Check if 2FA is required
      if (response.requires2FA && response.tempToken) {
        setTempToken(response.tempToken);
        setShow2FAModal(true);
        toast({
          title: "2FA Required",
          description: "Please enter your authentication code",
        });
        setIsLoading(false);
        return;
      }
      
      if (response.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login(email, password, otpValue);
      
      if (response.success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        setShow2FAModal(false);
        navigate('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Invalid 2FA code';
      toast({
        title: "2FA verification failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mt-6 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Login Info */}
          <div className="bg-cover bg-center min-h-[600px] relative" 
               style={{ backgroundImage: "url('/uploads/log.png')" }}>
            <div className="absolute inset-0 bg-black/60 p-12 flex flex-col justify-center">
              <h2 className="text-white text-4xl font-bold mb-4">
                Welcome Back to<br />Greipr
              </h2>
              
              <ul className="text-white mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Access your personalized dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Track your job applications in real-time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Connect with potential employers and networks</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="p-8">
            <h2 className="text-4xl font-bold mb-8">Login</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-4 bg-gray-100 rounded-md pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-brand-green hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit"
                  className="w-full bg-brand-green text-white hover:bg-brand-green-light py-6 text-xl"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login to your account'}
                </Button>
              </div>
              
              <div className="text-center pt-4">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-brand-green hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* 2FA Modal */}
      <Dialog open={show2FAModal} onOpenChange={setShow2FAModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter the 6-digit code from your authenticator app
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <Button 
              onClick={handle2FASubmit}
              disabled={isLoading || otpValue.length !== 6}
              className="w-full"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Login;
