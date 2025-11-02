
import { useEffect, useRef, useState } from 'react';
import snsWebSdk from '@sumsub/websdk';
import { useToast } from '@/hooks/use-toast';
import userService from '@/services/userService';

interface SumsubWidgetProps {
  onKycComplete?: (status: string) => void;
  onError?: (error: any) => void;
}

const SumsubWidget = ({ onKycComplete, onError }: SumsubWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initSumsubWidget = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await userService.initKycSumsub();

        if (!response.data.success || !response.data.accessToken) {
          throw new Error(response.data.message || 'Failed to get KYC credentials');
        }

        const { accessToken } = response.data;

        const snsWebSdkInstance = snsWebSdk
          .init(accessToken, () => Promise.resolve(accessToken)) // Ensures async access
          .withConf({
            lang: 'en',
            email: '',
            phone: '',
            i18n: {
              document: {
                subTitles: {
                  IDENTITY: 'Upload a document that proves your identity'
                }
              }
            }
          })
          .withOptions({
            addViewportTag: false,
            adaptIframeHeight: true
          })
          .on('idCheck.onReady', () => {
          })
          .on('idCheck.onError', (payload: any) => {
            const errorMessage = payload?.description || payload?.error || 'An error occurred in the KYC widget';
            toast({
              title: 'KYC Error',
              description: errorMessage,
              variant: 'destructive'
            });
            onError?.(payload);
          })
          .on('idCheck.onApplicantStatusChanged', (payload: any) => {
            if (payload.reviewStatus === 'completed' || payload.reviewStatus === 'GREEN') {
              onKycComplete?.('completed');
            }
          })
          .build();

        // Wait a bit before launching to make sure the container is mounted
        setTimeout(() => {
          if (containerRef.current) {
            snsWebSdkInstance.launch(containerRef.current);
          } else {
            throw new Error('KYC container not found');
          }
        }, 500);

        setIsLoading(false);
      } catch (err: any) {
        const errorMsg = err?.response?.data?.message || err?.message || 'Failed to initialize KYC';
        setError(errorMsg);
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        onError?.(err);
        setIsLoading(false);
      }
    };

    initSumsubWidget();

    // Listen for any postMessage events from Sumsub
    const listener = (event: MessageEvent) => {
      if (event.origin.includes('sumsub.com')) {
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);

  }, [toast, onKycComplete, onError]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p>Loading KYC widget...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full  border border-dashed border-gray-300" />
    </div>
  );
};

export default SumsubWidget;
