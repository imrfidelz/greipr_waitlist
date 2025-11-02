import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerifying(false);
        return;
      }

      try {
        const response = await authService.verifyEmail(token);
        if (response.data.success) {
          setSuccess(true);
          toast({
            title: "Email Verified",
            description: "Your email has been successfully verified.",
          });
        }
      } catch (error: any) {
        console.error('Email verification error:', error);
        toast({
          title: "Verification Failed",
          description: error.response?.data?.error || "Failed to verify email. The link may be invalid or expired.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying Email
            </CardTitle>
            <CardDescription>Please wait while we verify your email address...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {success ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                Email Verified
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                Verification Failed
              </>
            )}
          </CardTitle>
          <CardDescription>
            {success
              ? "Your email has been successfully verified. You can now access all features."
              : "We couldn't verify your email. The link may be invalid or expired."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => navigate('/settings')} className="w-full">
            Go to Settings
          </Button>
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
