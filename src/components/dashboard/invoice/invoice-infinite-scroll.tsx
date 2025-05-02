'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { InvoiceType } from '@/actions/invoices/types';

interface Props {
  nextCursor: string | undefined;
}

function InfiniteScroll({ nextCursor}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView && nextCursor) {
      const delay = setTimeout(() => {
        const _searchParams = new URLSearchParams(searchParams.toString());
        _searchParams.set('cursor', String(nextCursor));
        router.replace(`?${_searchParams.toString()}`, { scroll: true });
      }, 2000);
      return () => clearTimeout(delay);
    }
  }, [inView, nextCursor]);

  if (!nextCursor || nextCursor === 'undefined') return null;

  return (
    <Stack ref={ref} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Loading more data . . .</Typography>
    </Stack>
  );
}

export default InfiniteScroll;
