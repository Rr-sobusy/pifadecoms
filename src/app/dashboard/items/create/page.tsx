import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { fetchChartofAccounts } from '@/actions/accounts/fetch-accounts';
import { fetchItemSources } from '@/actions/items/fetch-item-sources';
import ItemCreateForm from '@/components/dashboard/items/item-create-form';

async function page(): Promise<React.JSX.Element> {
  const [chartOfAccounts, itemSources] = await Promise.all([fetchChartofAccounts(), fetchItemSources()]);
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
        <Stack spacing={3}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.items.list}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Items
            </Link>
          </div>
          <div>
            <Typography variant="h4">Create Item</Typography>
          </div>
        </Stack>
        <ItemCreateForm
          itemSources={itemSources}
          accounts={chartOfAccounts.map((account) => {
            return {
              accountId: account.accountId,
              accountName: account.accountName,
              accountRootType: account.RootID.rootType,
            };
          })}
        />
      </Stack>
    </Box>
  );
}

export default page;
