'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import { updateNotesAction } from '@/actions/loans/update-notes';
import { toast } from '@/components/core/toaster';

interface Props {
  notes: string | null;
  loanId: bigint;
}

function LoanNotes({ notes, loanId }: Props) {
  const [formState, setFormState] = React.useState(notes);

  async function changeHandler() {
    const result = await updateNotesAction({ loanId, notes: formState ?? '' });

    if (result?.data?.success) {
      toast.success('Notes updated successfully');
    }
  }
  return (
    <Card>
      <form>
        <CardContent>
          <TextField
            defaultValue={formState}
            onChange={(event) => setFormState(event.target.value)}
            label="Notes"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
            <Button onClick={changeHandler} disabled={(notes ?? '') === formState?.trim()} variant="contained">
              Save
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

export default LoanNotes;
