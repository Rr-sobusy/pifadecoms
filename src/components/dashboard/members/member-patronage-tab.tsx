'use client';

import React, { useEffect } from 'react';
import RouterLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab, Tabs } from '@mui/material';

interface TabTypes {
  content: { month: string; value: number }[];
  children: React.ReactNode;
}

export function MemberPatronagesTab({ content, children }: TabTypes) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert searchParams to a mutable object
  const params = new URLSearchParams(searchParams.toString());

  // Ensure 'monthFilter' is set on mount
  useEffect(() => {
    if (!searchParams.get('monthFilter')) {
      params.set('monthFilter', 'All');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  return (
    <>
      <Tabs
        sx={{ borderBottom: '1px solid var(--mui-palette-divider)' }}
        value={searchParams.get('monthFilter') || 'All'}
      >
        {content.map((ctx, index) => {
          const newParams = new URLSearchParams(params.toString()); // Preserve existing params
          newParams.set('monthFilter', ctx.month); // Update only monthFilter

          return (
            <Tab
              key={index}
              LinkComponent={RouterLink}
              href={`?${newParams.toString()}`}
              label={ctx.month}
              tabIndex={index}
              value={ctx.month}
            />
          );
        })}
      </Tabs>
      {children}
    </>
  );
}
