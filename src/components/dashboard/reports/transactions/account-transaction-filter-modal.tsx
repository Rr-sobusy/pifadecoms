'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHelperText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { Option } from '@/components/core/option';

type FilteModalProps = {
  open: boolean;
};

function FilterModal({ open }: FilteModalProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClose() {
    router.push(pathname);
  }
  return (
    <Dialog
      maxWidth="md"
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'center' },
        '& .MuiDialog-paper': { minHeight: '60%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 3 }}
        >
          <Stack>
            <Typography variant="h6">Filter results</Typography>
            <Typography color='text.secondary' variant='caption'>Filter the data table based on filter inputs.</Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Grid spacing={2} container>
            <Grid
              size={{
                sm: 12,
                md: 6,
              }}
            >
              <DatePicker label="Start Date" sx={{ width: '100%' }} />
            </Grid>
            <Grid
              size={{
                sm: 12,
                md: 6,
              }}
            >
              <DatePicker label="End Date" sx={{ width: '100%' }} />
            </Grid>
          </Grid>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <FormControl fullWidth>
                <InputLabel>Filter by account</InputLabel>
                <Input inputProps={params.inputProps} ref={params.InputProps.ref} type="text" />
              </FormControl>
            )}
            renderOption={(props, options) => (
              <Option {...props} key={options} value={options}>
                <span style={{ marginLeft: 8 }}>{options}</span>
              </Option>
            )}
          />
             <Autocomplete
            options={[]}
            renderInput={(params) => (
              <FormControl fullWidth>
                <InputLabel>Filter by member</InputLabel>
                <Input inputProps={params.inputProps} ref={params.InputProps.ref} type="text" />
              </FormControl>
            )}
            renderOption={(props, options) => (
              <Option {...props} key={options} value={options}>
                <span style={{ marginLeft: 8 }}>{options}</span>
              </Option>
            )}
          />
          <Button sx={{marginTop : 2}} variant='contained'>Filter</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;
