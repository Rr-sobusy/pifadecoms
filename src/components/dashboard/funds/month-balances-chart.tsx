import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { formatToCurrency } from '@/lib/format-currency';
import { NoSsr } from '@/components/core/no-ssr';

type Props = {
  data: { month: string; balance: number }[];
  interestRate: number;
};

const bars = [
  //   { name: 'month', dataKey: 'v1', color: 'var(--mui-palette-primary-400)' },
  { name: 'month', dataKey: 'balance', color: 'var(--mui-palette-primary-500)' },
] satisfies { name: string; dataKey: string; color: string }[];
function MonthBalancesChart({ data, interestRate }: Props) {
  return (
    <NoSsr fallback={<Box sx={{ height: `${300}px` }} />}>
      <ResponsiveContainer height={300}>
        <BarChart barGap={-32} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis axisLine={false} dataKey="month" tickLine={false} type="category" xAxisId={0} />
          <XAxis axisLine={false} dataKey="month" hide type="category" xAxisId={1} />
          <YAxis axisLine={false} domain={[0, 50]} hide tickCount={6} type="number" />
          {bars.map(
            (bar, index): React.JSX.Element => (
              <Bar
                animationDuration={300}
                barSize={32}
                dataKey={bar.dataKey}
                fill={bar.color}
                key={bar.name}
                name={bar.name}
                radius={[5, 5, 5, 5]}
                xAxisId={index}
              />
            )
          )}
          <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
      <Stack justifyContent="center" alignItems="center" gap={1} flexDirection="row">
        <Typography>Accrued Average Daily Balance:</Typography>
        <Typography>{formatToCurrency((data.reduce((curr , acc) => curr + acc.balance, 0) / 12), 'Fil-ph', 'Php')}</Typography>
        <Typography>X</Typography>
        <Stack>
          <Typography variant="subtitle1">{interestRate ?? 0}%</Typography>
        </Stack>
        <Typography>=</Typography>
        <Stack>
          <Typography>Interest Payable</Typography>
          <Typography>
            {formatToCurrency(
              (data.reduce((curr, acc) => curr + acc.balance, 0) * interestRate) / 1200,
              'Fil-ph',
              'Php'
            )}
          </Typography>
        </Stack>
      </Stack>
    </NoSsr>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { fill: string; name: string; dataKey: string; value: number }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map(
          (entry): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US').format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}

export default React.memo(MonthBalancesChart);
