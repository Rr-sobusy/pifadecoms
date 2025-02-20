'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { Funnel } from '@phosphor-icons/react/dist/ssr/Funnel';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { dayjs } from '@/lib/dayjs';

type FiltererModalProps = {
  open: boolean;
};

function BalanceSheetFilterModal({ open }: FiltererModalProps) {
  const [asOf, setAsOf] = React.useState<Date | null>(dayjs().toDate());

  const router = useRouter();
  const pathname = usePathname();

  function handleClose() {
    router.push(pathname);
  }

  function selectHandler() {
    router.push(`${pathname}?asOf=${asOf}`);
  }
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '35%', width: '100%' },
      }}
      open={open}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
        >
          <Stack>
            <Typography variant="h6">Select target date</Typography>
            <Typography color="text.secondary" variant="caption">
              Generate balance sheet as of a specific date.
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Divider />
        <div>
          <FormControl>
            <InputLabel htmlFor="asOf">As of</InputLabel>
            <DatePicker
              onChange={(date) => {
                if (date) {
                  setAsOf(date.toDate());
                }
              }}
              defaultValue={dayjs(asOf)}
            />
          </FormControl>
        </div>
        <Stack paddingY={1} alignItems="flex-end">
          <div>
            <Button startIcon={<Funnel />} onClick={selectHandler} variant="contained">
              Filter Result
            </Button>
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default BalanceSheetFilterModal;
