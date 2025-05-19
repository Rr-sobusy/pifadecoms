'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { signInUsingCredentials } from '@/actions/auth/sign-in-action';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  username: zod.string().min(1, { message: 'username is required' }),
  password: zod.string().min(1, { message: 'Password is required' }),
});

export type SignInSchema = zod.infer<typeof schema>;

const defaultValues = { username: 'pifadeco_user', password: '' } satisfies SignInSchema;

export function SignInForm(): React.JSX.Element {

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({ defaultValues, resolver: zodResolver(schema) });

  async function submitHandler(data: SignInSchema): Promise<void> {
    try {
      setIsPending(true);
      await signInUsingCredentials(data);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      toast.error('Login failed', {
        style: {
          backgroundColor: 'var(--mui-palette-error-main)',
          color: 'var(--mui-palette-error-contrastText)',
        },
      });
    }
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">Sign in to continue</Typography>
      </Stack>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <FormControl error={Boolean(errors.username)}>
                  <InputLabel>Username</InputLabel>
                  <OutlinedInput {...field} type="text" />
                  {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    endAdornment={
                      showPassword ? (
                        <EyeIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <EyeSlashIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(true);
                          }}
                        />
                      )
                    }
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit" variant="contained">
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
