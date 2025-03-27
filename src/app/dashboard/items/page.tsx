import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { fetchItems } from '@/actions/items/fetch-items';
import { ItemsTable } from '@/components/dashboard/items/items-table';
import ViewItemDialog from '@/components/dashboard/items/view-item-or-edit-dialog';
import type { Filters } from '@/components/dashboard/product/products-filters';

export const metadata = { title: `List | Products | Dashboard | ${config.site.name}` } satisfies Metadata;
interface PageProps {
  searchParams: { itemId:string };
}

export default async function Page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  // const { category, previewId, sortDir, sku, status } = searchParams;

  // const orderedProducts = applySort(products, sortDir);
  // const filteredProducts = applyFilters(orderedProducts, { category, sku, status });

  const items = await fetchItems();

  return (
    <React.Fragment>
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
              <Typography variant="h4">Items</Typography>
            </Box>
            <div>
              <Button
                component={RouterLink}
                href={paths.dashboard.items.create}
                startIcon={<PlusIcon />}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <Card>
            {/* <ProductsFilters filters={{ category, sku, status }} sortDir={sortDir} /> */}
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <ItemsTable rows={items} />
            </Box>
            <Divider />
            {/* <ProductsPagination count={filteredProducts.length} page={0} /> */}
          </Card>
        </Stack>
      </Box>
      <ViewItemDialog items={items} isOpen={Boolean(searchParams.itemId)} />
    </React.Fragment>
  );
}
