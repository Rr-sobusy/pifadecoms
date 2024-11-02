import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { fetchItems } from '@/actions/items/fetch-items';
import { fetchMembers } from '@/actions/members/fetch-members';
import InvoiceCreateForm2 from '@/components/dashboard/invoice/_invoice-create-form';

type Props = {};

const page = async (props: Props) => {
  const members = await fetchMembers({ returnAll: true });
  const items = await fetchItems();
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
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Invoices
            </Link>
          </div>
          <div>
            <Typography variant="h4">Create invoice</Typography>
          </div>
        </Stack>
        <InvoiceCreateForm2
          items={items.map((item) => {
            return {
              itemId: item.itemID,
              itemName: item.itemName,
              itemType: item.itemType,
              rate: item.sellingPrice
            };
          })}
          members={members.map((member) => {
            return { ...member };
          })}
        />
      </Stack>
    </Box>
  );
};

export default page;
