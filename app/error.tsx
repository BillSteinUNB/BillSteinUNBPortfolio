'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log errors in development, use error tracking service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
    // TODO: Add error tracking service (Sentry, LogRocket, etc.) for production
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            An unexpected error occurred. Don't worry, it's not your fault.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Go home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 rounded-lg bg-muted text-left">
            <p className="text-sm font-mono text-red-500">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
