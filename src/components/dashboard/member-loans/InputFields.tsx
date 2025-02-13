import React from 'react'
import { FormControl } from '@mui/material';
import type { SxProps } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Controller, FieldValues, Path, type Control, type FieldErrors } from 'react-hook-form';

interface FormInputFieldsProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  errors?: FieldErrors<TFormValues> | undefined;
  variant: 'text' | 'number';
  inputLabel: string;
  isRequired?: boolean;
  sx?: SxProps;
};

export const FormInputFields = <TFormValues extends FieldValues>({
  control,
  name,
  errors,
  inputLabel,
  variant,
  isRequired = false,
  sx,
}: FormInputFieldsProps<TFormValues>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl sx={sx} error={Boolean(errors ? errors[name] : false)} fullWidth>
            <InputLabel required={isRequired}>{inputLabel}</InputLabel>
            <OutlinedInput
              {...field}
              type={variant}
              onChange={(e) => {
                const value = variant === 'number' ? Number(e.target.value) : e.target.value;
                field.onChange(value);
              }}
            />
            {errors?.[name] && <FormHelperText>{errors[name]?.message?.toString()}</FormHelperText>}
          </FormControl>
        )}
      />
    </div>
  );
};
