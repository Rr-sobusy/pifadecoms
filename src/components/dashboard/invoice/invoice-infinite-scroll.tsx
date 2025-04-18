'use client';

import React, { useEffect } from 'react';
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
  const { ref, inView } = useInView({ triggerOnce: false });

  const updateURLWithDelay = (nextCursor: string | undefined) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const _searchParams = new URLSearchParams(searchParams.toString());
        _searchParams.set('cursor', String(nextCursor));
        router.replace(`?${_searchParams.toString()}`, { scroll: true });
        resolve();
      }, 2000);
    });
  };

  useEffect(() => {
    if (inView && nextCursor) {
      updateURLWithDelay(nextCursor);
    }
  }, [inView]);

  // Prevent rendering if nextCursor is invalid (i.e., no more data)
  if (!nextCursor || invoices.length < 15) return null;

  return (
    <Stack ref={ref} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Loading more data . . .</Typography>
    </Stack>
  );
}

export default InfiniteScroll;
