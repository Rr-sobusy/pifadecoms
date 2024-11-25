'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { toast } from '@/components/core/toaster';

type ToasterProps = {
  routeLink: string;
  errorMessage: string;
};

function NotfoundToaster({ routeLink, errorMessage }: ToasterProps): null | never {
  const router = useRouter();
  React.useEffect(() => {
    toast.error(errorMessage);
    router.push(routeLink);
  }, []);

  return null;
}

export default NotfoundToaster;
