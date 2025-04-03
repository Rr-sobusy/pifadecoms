import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '@/paths';
import { fetchItemSources } from '@/actions/items/fetch-item-sources';
import AddItemSourceDialog from '@/components/dashboard/items/add-item-source-dialog';
import ItemSourceTable from '@/components/dashboard/items/item-source-table';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';

export const metadata: Metadata = {
  title: 'PIFADECO | Item sources',
};


interface PageProps {
  searchParams: { createNew: boolean };
}

async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {

  const { createNew } = searchParams;
  const [itemSources, accounts] = await Promise.all([fetchItemSources(), fetchAccountTree()])
  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Item Sources</Typography>
          </Box>
          <div>
            <Button
              component={RouterLink}
              href={`${paths.dashboard.items.source}?createNew=true`}
              startIcon={<PlusIcon />}
              variant="contained"
            >
              Add
            </Button>
          </div>
        </Stack>
        <Stack>
          <ItemSourceTable rows={itemSources} />
        </Stack>
      </Stack>
      <AddItemSourceDialog accounts={accounts} isOpen={Boolean(createNew)} />
    </Box>
  );
}

export default page;
