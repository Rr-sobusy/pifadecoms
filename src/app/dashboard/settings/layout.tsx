import * as React from 'react';
import Box from '@mui/material/Box';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    // <Box
    //   sx={{
    //     maxWidth: 'var(--Content-maxWidth)',
    //     m: 'var(--Content-margin)',
    //     p: 'var(--Content-padding)',
    //     width: 'var(--Content-width)',
    //   }}
    // >
    //   <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
    //     <SideNav />
    //     <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
    //   </Stack>
    // </Box>
    <Box>
      Construction on-going.
    </Box>
  );
}
