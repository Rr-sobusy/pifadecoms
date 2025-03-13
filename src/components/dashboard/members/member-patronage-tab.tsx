'use client';

import React from 'react';
import RouterLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface TabTypes {
  content: { month: string; value: number }[];
  children: React.ReactNode;
}

export function MemberPatronagesTab({ content, children }: TabTypes) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // reroute to filter=Jan query params in every mount
  React.useEffect(() => {
    router.push(`${pathname}?monthFilter=All`);
  }, []);
  return (
    <>
      <Tabs sx={{ borderBottom: '1px solid var(--mui-palette-divider)' }} value={searchParams.get('monthFilter')}>
        {content.map((ctx, index) => (
          <Tab
            key={index}
            LinkComponent={RouterLink}
            href={`${pathname}?monthFilter=${ctx.month}`}
            label={ctx.month}
            tabIndex={index}
            value={ctx.month}
          />
        ))}
      </Tabs>
      {children}
    </>
  );
}
