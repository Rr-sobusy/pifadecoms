'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useInView } from 'react-intersection-observer';

import { InvoiceType } from '@/actions/invoices/types';

interface Props {
  nextCursor: string | undefined;
  invoices: InvoiceType['invoice'];
}

function InfiniteScroll({ nextCursor, invoices }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView, entry } = useInView({ triggerOnce: false });
  const [lastCursor, setLastCursor] = React.useState<string | undefined>(undefined);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  // Detect scrolling interaction
  React.useEffect(() => {
    const handleScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', handleScroll, { once: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  React.useEffect(() => {
    if (hasScrolled && inView && nextCursor && nextCursor !== lastCursor) {
      const _searchParams = new URLSearchParams(searchParams.toString());
      _searchParams.set('cursor', String(nextCursor));
      router.push(`?${_searchParams.toString()}`, { scroll: false });

      setLastCursor(nextCursor);
    }
  }, [inView, nextCursor, hasScrolled]);

  /**
   * * Show only when invoice lists are exceeding into 15 list.
   */

  return (
    <>
      {invoices.length > 15 && (
        <Stack ref={ref} alignItems="center" justifyContent="center">
          <Typography variant="subtitle2">Loading more data . . .</Typography>
        </Stack>
      )}
    </>
  );
}

export default InfiniteScroll;
