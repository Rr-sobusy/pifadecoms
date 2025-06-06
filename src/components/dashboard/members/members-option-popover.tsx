'use client';

import React from 'react';
import RouterLink from 'next/link';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { UserFocus as User } from '@phosphor-icons/react/dist/ssr/UserFocus';

import { paths } from '@/paths';

interface MemberPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose?: () => void;
  onMarkAllAsRead?: () => void;
  onRemoveOne?: (id: string) => void;
  open?: boolean;
  memberId: string;
};

function MemberPopover({
  anchorEl,
  onClose,
  open = false,
  memberId,
}: MemberPopoverProps) {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '170px' } } }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <Stack spacing={1} padding={1}>
        <Button
          startIcon={<User />}
          size="small"
          LinkComponent={RouterLink}
          href={paths.dashboard.members.view(memberId)}
        >
          View Profile
        </Button>
      </Stack>
    </Popover>
  );
}

export default MemberPopover;
