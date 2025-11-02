
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SumsubWidget from '@/components/sheared/SumsubWidget';
import { useToast } from '@/hooks/use-toast';

const KYCPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [kycStatus, setKycStatus] = useState<'idle' | 'in-progress' | 'completed' | 'error'>('idle');

  const handleKycComplete = (status: string) => {
    console.log('KYC completed with status:', status);
    setKycStatus('completed');
    
    toast({
      title: "KYC Submitted Successfully",
      description: "Your verification is under review. You'll be notified of the result.",
    });

    // Navigate back to settings after a delay and refresh the page
    setTimeout(() => {
      navigate('/settings#account');
      // Trigger a page refresh to update user context
      window.location.reload();
    }, 2000);
  };

  const handleKycError = (error: any) => {
    console.error('KYC error:', error);
    setKycStatus('error');
  };

  const handleStartKyc = () => {
    setKycStatus('in-progress');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    KYC Verification
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Complete your identity verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {kycStatus === 'idle' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Start KYC Verification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              To comply with regulations and ensure platform security, we need to verify your identity. 
              This process typically takes 5-10 minutes and requires a government-issued ID.
            </p>
            <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Prepare a government-issued photo ID
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Ensure good lighting for photo capture
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Follow the step-by-step instructions
                </span>
              </div>
            </div>
            <Button 
              onClick={handleStartKyc}
              size="lg"
              className="px-8"
            >
              Start Verification
            </Button>
          </div>
        )}

        {kycStatus === 'in-progress' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Complete Your Verification
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Follow the instructions below to verify your identity
              </p>
            </div>
            <div className="p-6">
              <SumsubWidget 
                onKycComplete={handleKycComplete}
                onError={handleKycError}
              />
            </div>
          </div>
        )}

        {kycStatus === 'completed' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Verification Submitted
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for submitting your verification documents. 
              We'll review them and notify you of the result within 24-48 hours.
            </p>
            <Button onClick={() => navigate('/settings#account')}>
              Return to Settings
            </Button>
          </div>
        )}

        {kycStatus === 'error' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There was an issue with the verification process. Please try again or contact support if the problem persists.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setKycStatus('idle')}>
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate('/settings#account')}>
                Return to Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCPage;
