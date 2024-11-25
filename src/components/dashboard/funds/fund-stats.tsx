import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

import { formatToCurrency } from '@/lib/format-currency';

type Props = {};

function FundsStats({}: Props) {
  return (
    <Grid spacing={4} container>
      <Grid
        size={{
          md: 6,
          xl: 6,
          xs: 12,
        }}
      >
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={2} direction="row">
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-shadows-8)',
                  color: 'var(--mui-palette-text-primary)',
                }}
              >
                <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="body2">
                  Member Built-up Capital
                </Typography>
                <Typography variant="h6">{formatToCurrency(20000, 'Fil-ph', 'Php')}</Typography>
                <Typography color="text.secondary" variant="body2">
                  From _ _ member
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        size={{
          md: 6,
          xl: 6,
          xs: 12,
        }}
      >
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={2} direction="row">
              <Avatar
                sx={{
                  '--Avatar-size': '48px',
                  bgcolor: 'var(--mui-palette-background-paper)',
                  boxShadow: 'var(--mui-shadows-8)',
                  color: 'var(--mui-palette-text-primary)',
                }}
              >
                <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="body2">
                  Total Savings Deposits
                </Typography>
                <Typography variant="h6">{formatToCurrency(20000, 'Fil-ph', 'Php')}</Typography>
                <Typography color="text.secondary" variant="body2">
                  From _ _ member
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FundsStats;
