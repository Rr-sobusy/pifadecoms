import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, SxProps } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface FormInputFieldsProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  errors?: FieldErrors<TFormValues>;
  variant: 'text' | 'number';
  inputLabel: string;
  isRequired?: boolean;
  sx?: SxProps;
  isDisabled?: boolean;
  hideLabel?: boolean;
}

export const FormInputFields = <TFormValues extends FieldValues>({
  control,
  name,
  errors,
  inputLabel,
  variant,
  isRequired = false,
  sx,
  isDisabled = false,
  hideLabel = false,
}: FormInputFieldsProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...rest } }) => {
        const isNumberField = variant === 'number';
        return (
          <FormControl sx={sx} disabled={isDisabled} error={Boolean(errors?.[name])}>
            {!hideLabel ? <InputLabel required={isRequired}>{inputLabel}</InputLabel> : null}
            {isNumberField ? (
              <NumericFormat
                {...rest}
                customInput={OutlinedInput}
                thousandSeparator=","
                decimalScale={3}
                allowNegative={false}
                value={value ?? ''}
                onValueChange={(values) => onChange(values.floatValue ?? null)}
              />
            ) : (
              <OutlinedInput {...rest} sx={sx} onChange={onChange} value={value} type="text" />
            )}
            {errors?.[name] && <FormHelperText>{errors[name]?.message?.toString()}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};
{
  /* <div>
<Controller
  name={name}
  control={control}
  render={({ field }) => (
    <FormControl disabled={isDisabled} sx={sx} error={Boolean(errors ? errors[name] : false)} fullWidth>
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
</div> */
}
