import React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { fetchInvoiceItemPerMember } from '@/actions/invoices/fetch-invoice';
import { fetchMembers } from '@/actions/members/fetch-members';
import { MembersType } from '@/actions/members/types';
import InvoiceItemTable from '@/components/dashboard/invoice/_invoice-item-per-member';
import MemberDropDown from '@/components/dashboard/invoice/member-dropdown';
import { fetchAccountTree } from '@/actions/accounts/fetch-accounts';

interface PageProps {
  searchParams: { memberId: string };
}

async function page({ searchParams }: PageProps) {
  const invoiceItems = await fetchInvoiceItemPerMember(searchParams.memberId);
  const members = await fetchMembers({ returnAll: true });
  const accounts = await fetchAccountTree()
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
            <Typography variant="h4">Invoice Item per member</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button LinkComponent={RouterLink} href={paths.dashboard.invoice.create} variant="contained">
              Create New Invoice
            </Button>
          </Box>
        </Stack>

        <Stack direction="column" spacing={4} sx={{ alignItems: 'flex-start' }}>
          <MemberDropDown members={members as MembersType} />

          <InvoiceItemTable accounts={accounts} data={invoiceItems} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default page;
