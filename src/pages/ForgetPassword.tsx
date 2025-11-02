
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { authService } from '@/services/authService';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authService.forgotPassword(email);
      
      if (response.data.success) {
        toast({
          title: "Reset link sent",
          description: "If an account exists with this email, you'll receive a password reset link",
        });
        
        setIsSubmitted(true);
      }
    } catch (error: any) {
      // Even on error, show success message for security (don't reveal if email exists)
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you'll receive a password reset link",
      });
      
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mt-6 mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-brand-green hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#9b87f5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#9b87f5]" />
              </div>
              <h1 className="text-2xl font-bold">Forgot Password</h1>
              
              {!isSubmitted ? (
                <p className="text-gray-600 mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              ) : (
                <p className="text-gray-600 mt-2">
                  Check your inbox for the reset link. The link will expire in 1 hour.
                </p>
              )}
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-light text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 py-3"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-brand-green hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgetPassword;
