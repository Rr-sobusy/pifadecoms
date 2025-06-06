'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import { IUpdateItemSchema, updateItemSchema } from '@/actions/items/types';
import type { ItemTypes } from '@/actions/items/types';
import { updateItemAction } from '@/actions/items/update-item';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../../core/InputFields';

interface ViewItemDialogProps {
  isOpen: boolean;
  items: ItemTypes;
}

function ViewItemDialog({ isOpen, items }: ViewItemDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { execute, isExecuting, result } = useAction(updateItemAction);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IUpdateItemSchema>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {},
  });

  const selectedItems = React.useMemo(
    () => items.find((item) => item.itemID === searchParams.get('itemId')),
    [searchParams]
  );

  React.useEffect(() => {
    if (result.data?.success) {
      toast.success('Item updated.');
      handleClose();
    }
  }, [result]);

  const watchPrincipal = watch('principalPrice');
  const watchTrade = watch('trade');

  const isFormChanged = React.useMemo(() => {
    if (!selectedItems) return false;
    return (
      JSON.stringify({ principal: watchPrincipal, trade: watchTrade }) ===
      JSON.stringify({ principal: selectedItems?.sellingPrice, trade: selectedItems?.trade })
    );
  }, [watchPrincipal, watchTrade, selectedItems]);

  React.useEffect(() => {
    Object.entries({
      itemId: selectedItems?.itemID || '',
      itemName: selectedItems?.itemName || '',
      itemDescription: selectedItems?.itemDescription || '',
      principalPrice: selectedItems?.sellingPrice || 0,
      trade: selectedItems?.trade,
      itemSource: selectedItems?.ItemSource.sourceName,
    }).forEach(([key, value]) => setValue(key as keyof IUpdateItemSchema, value));
  }, [selectedItems, setValue]);

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
      <form onSubmit={handleSubmit((data) => execute(data))}>
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
            <FormInputFields
              isDisabled
              control={control}
              variant="text"
              inputLabel="Item description"
              name="itemDescription"
            />
            <FormInputFields errors={errors} control={control} variant="number" inputLabel="A.R Price" name="principalPrice" />
            <FormInputFields errors={errors} control={control} variant="number" inputLabel="Trade" name="trade" />
          </Stack>
          <Stack>
            <Button type="submit" disabled={isFormChanged || isExecuting} variant="contained">
              Update
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default ViewItemDialog;
