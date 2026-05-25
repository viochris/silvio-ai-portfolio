
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // Throw error to trigger Next.js error overlay in development
      // while providing central handling
      if (process.env.NODE_ENV === 'development') {
         console.error(error.message);
      }
      
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You don't have permission to perform this action.",
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
