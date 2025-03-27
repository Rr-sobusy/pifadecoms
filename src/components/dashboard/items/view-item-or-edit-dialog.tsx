'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogAction from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getValue } from '@mui/system';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { IUpdateItemSchema, updateItemSchema } from '@/actions/items/types';
import type { ItemTypes } from '@/actions/items/types';

import { FormInputFields } from '../member-loans/InputFields';

interface ViewItemDialogProps {
  isOpen: boolean;
  items: ItemTypes;
}

function ViewItemDialog({ isOpen, items }: ViewItemDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty },
  } = useForm<IUpdateItemSchema>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {},
  });

  const selectedItems = React.useMemo(
    () => items.find((item) => item.itemID === searchParams.get('itemId')),
    [searchParams]
  );

  const watchName = watch('itemName');

  const isFormChanged = React.useMemo(() => {
    return Object.is(JSON.stringify(watchName), JSON.stringify(selectedItems?.itemName));
  }, [watchName]);

  React.useEffect(() => {
    console.log(JSON.stringify(watchName), JSON.stringify(selectedItems?.itemName));
  }, [watchName]);

  React.useEffect(() => {
    Object.entries({
      itemId: selectedItems?.itemID || '',
      itemName: selectedItems?.itemName || '',
      itemDescription: selectedItems?.itemDescription || '',
      principalPrice: selectedItems?.sellingPrice || 0,
      trade: selectedItems?.trade,
      itemSource: selectedItems?.ItemSource.sourceName
    }).forEach(([key, value]) => setValue(key as keyof IUpdateItemSchema, value));
  }, [selectedItems]);

  function handleClose() {
    router.push(pathname);
  }

  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '90%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between', marginTop: 1 }}
        >
          <Stack>
            <Typography variant="h6">Item details</Typography>
            <Typography color="" variant="caption">
              View or update item
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <FormInputFields isDisabled control={control} variant="text" inputLabel="Item ID" name="itemId" />
          <FormInputFields isDisabled control={control} variant="text" inputLabel="Item name" name="itemName" />
          <FormInputFields isDisabled control={control} variant="text" inputLabel="Item source" name="itemSource" />
          <FormInputFields control={control} variant="text" inputLabel="Item description" name="itemDescription" />
          <FormInputFields control={control} variant="text" inputLabel="A.R Price" name="principalPrice" />
          <FormInputFields control={control} variant="text" inputLabel="Trade" name="trade" />
        </Stack>
        <Stack>
          <Button disabled={isFormChanged} variant="contained">
            Click me
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ViewItemDialog;
