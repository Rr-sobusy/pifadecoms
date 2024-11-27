import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Popover from '@mui/material/Popover';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { type Dayjs } from 'dayjs';
import { z } from 'zod';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { toast } from '@/components/core/toaster';

const dayjsSchema = z.string().refine((dateStr) => dayjs(dateStr).isValid(), {
  message: 'Invalid date',
});

const dateRangeSchema = z.object({
  startDate: dayjsSchema,
  endDate: dayjsSchema,
});

type DateRangePopoverProps = {
  anchorEl: null | Element | HTMLButtonElement;
  onClose?: () => void;
  onMarkAllAsRead?: () => void;
  onRemoveOne?: (id: string) => void;
  open?: boolean;
};

function DateRangePopover({ anchorEl, onClose, open = false }: DateRangePopoverProps) {
  const [dateRange, setDateRange] = React.useState<{ startDate: Dayjs; endDate: Dayjs }>({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const router = useRouter();

  function submitHandler() {
    const result = dateRangeSchema.safeParse({
      startDate: dateRange.startDate.format(),
      endDate: dateRange.endDate.format(),
    });

    if (result.error?.issues) {
      toast.error('Fill the date fields.');
    } else {

      const searchParams = new URLSearchParams();
      searchParams.set('startDate', dateRange.startDate.toString())
      searchParams.set('endDate', dateRange.endDate.toString())

      router.push(`${paths.dashboard.reports.ledgerList}?${searchParams.toString()}`)
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { maxWidth: '750px' } } }}
      marginThreshold={2}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Grid container>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <DateCalendar          
            onChange={(date) => setDateRange({ endDate: dateRange.startDate, startDate: dayjs(date) })}
            value={dayjs(dateRange.startDate)}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <DateCalendar
            onChange={(date) => setDateRange({ endDate: dayjs(date), startDate: dateRange.startDate })}
            value={dayjs(dateRange.endDate)}
          />
        </Grid>
        <Button onClick={submitHandler} sx={{ minWidth: '50%', marginX: 'auto', marginBottom: 3 }} variant="contained">
          Filter by date
        </Button>
      </Grid>
    </Popover>
  );
}

export default DateRangePopover;
