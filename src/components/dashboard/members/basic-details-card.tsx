'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { useAction } from 'next-safe-action/hooks';
import { Controller, useForm } from 'react-hook-form';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { formatToCurrency } from '@/lib/format-currency';
import { fetchMemberData } from '@/actions/members/fetch-members';
import type { MemberDataType } from '@/actions/members/types';
import { IMemberUpdateSchema, memberUpdateSchema } from '@/actions/members/types';
import { updateMemberStatsAction } from '@/actions/members/update-member-stats';
import { fetchMemberPatronages } from '@/actions/reports/patronages';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { toast } from '@/components/core/toaster';

import { FormInputFields } from '../member-loans/InputFields';

interface BasicDetailsCardProps {
  memberData: MemberDataType;
}

/**
 * * Compare values that changed from original state
 */
const getChangedValues = (newValues: IMemberUpdateSchema, oldValues: IMemberUpdateSchema) => {
  return Object.fromEntries(
    Object.entries(newValues).filter(([key, value]) => value !== oldValues[key as keyof IMemberUpdateSchema])
  );
};

function getDefaultValues(memberData: MemberDataType): IMemberUpdateSchema {
  return {
    lastName: memberData?.lastName,
    middleName: memberData?.middleName || '',
    firstName: memberData?.firstName,
    address: memberData?.address ?? '',
    birthDate: memberData?.birthDate || null,
    annualIncom: memberData?.annualIncom || 0,
    civilStatus: memberData?.civilStatus || '',
    dateAccepted: memberData?.dateAccepted || null,
    contactNo: memberData?.contactNo || '',
    highestEduAttainment: memberData?.highestEdAttain || '',
    occupation: memberData?.occupation || '',
    tin: memberData?.tin || '',
  };
}

function BasicDetailsCard({ memberData }: BasicDetailsCardProps) {
  const { control, handleSubmit } = useForm<IMemberUpdateSchema>({
    resolver: zodResolver(memberUpdateSchema),
    defaultValues: getDefaultValues(memberData),
  });
  const [isUpdateMode, setUpdateMode] = React.useState<boolean>(false);

  const { execute, isExecuting, result } = useAction(updateMemberStatsAction.bind(null, memberData?.memberId || ''));

  function formSubmitHandler(data: IMemberUpdateSchema) {
    const filtered: IMemberUpdateSchema = getChangedValues(data, getDefaultValues(memberData));
    execute(filtered);

  }

  React.useEffect(() => {
    if (result.data?.success) {
      setUpdateMode(false);
      toast.success('Member data updated successfully!');
    }
  }, [result]);

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => setUpdateMode((prev) => !prev)}>
              <PencilSimpleIcon />
            </IconButton>
          }
          avatar={
            <Avatar>
              <UserIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
          }
          title="Basic details"
        />
        <PropertyList divider={<Divider />} orientation="vertical" sx={{ '--PropertyItem-padding': '12px 24px' }}>
          {(
            [
              {
                key: 'Customer ID',
                value: <Chip label={memberData?.memberId} size="small" variant="soft" />,
                editMode: <Chip label={memberData?.memberId} size="small" variant="soft" />,
              },
              {
                key: 'Last Name',
                value: `${memberData?.lastName}`,
                editMode: (
                  <FormInputFields hideLabel control={control} inputLabel="LastName" name="lastName" variant="text" />
                ),
              },
              {
                key: 'First',
                value: `${memberData?.firstName}`,
                editMode: <FormInputFields hideLabel control={control} inputLabel="" name="firstName" variant="text" />,
              },
              {
                key: 'Middle Name',
                value: memberData?.middleName ?? null,
                editMode: (
                  <FormInputFields hideLabel control={control} inputLabel="" name="middleName" variant="text" />
                ),
              },
              {
                key: 'Birth Date',
                value: dayjs(memberData?.birthDate).format('MMM DD YYYY'),
                editMode: (
                  <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={dayjs(field.value)}
                        onChange={(date) => field.onChange(date?.toDate())}
                      />
                    )}
                  />
                ),
              },
              {
                key: 'Address',
                value: memberData?.address ?? 'N/A',
                editMode: <FormInputFields control={control} name="address" hideLabel variant="text" inputLabel="" />,
              },
              {
                key: 'Phone',
                value: memberData?.contactNo ?? 'N/A',
                editMode: <FormInputFields control={control} name="contactNo" hideLabel variant="text" inputLabel="" />,
              },
              {
                key: 'Occupation',
                value: memberData?.occupation,
                editMode: (
                  <FormInputFields control={control} name="occupation" hideLabel variant="text" inputLabel="" />
                ),
              },
              {
                key: 'Date Accepted',
                value: dayjs(memberData?.dateAccepted).format('MM DD YYYY'),
                editMode: (
                  <Controller
                    control={control}
                    name="dateAccepted"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={dayjs(field.value)}
                        onChange={(date) => field.onChange(date?.toDate())}
                      />
                    )}
                  />
                ),
              },
              {
                key: 'TIN',
                value: memberData?.tin ?? 'N/A',
                editMode: <FormInputFields control={control} name="tin" hideLabel variant="text" inputLabel="" />,
              },
              {
                key: 'Civil Status',
                value: memberData?.civilStatus,
                editMode: (
                  <FormInputFields control={control} name="civilStatus" hideLabel variant="text" inputLabel="" />
                ),
              },
              {
                key: 'Highest Education Attainment',
                value: memberData?.highestEdAttain,
                editMode: (
                  <FormInputFields
                    control={control}
                    name="highestEduAttainment"
                    hideLabel
                    variant="text"
                    inputLabel=""
                  />
                ),
              },
              {
                key: 'Annual Income',
                value: memberData?.annualIncom ?? formatToCurrency(memberData?.annualIncom ?? 0, 'Fil-ph', 'Php'),
                editMode: (
                  <FormInputFields control={control} name="annualIncom" hideLabel variant="number" inputLabel="" />
                ),
              },
            ] satisfies { key: string; value: React.ReactNode; editMode?: React.ReactNode }[]
          ).map((item): React.JSX.Element => {
            return <PropertyItem key={item.key} name={item.key} value={!isUpdateMode ? item.value : item.editMode} />;
          })}
        </PropertyList>
        {isUpdateMode && (
          <Stack margin={3} alignItems="flex-end">
            <div>
              <Button disabled={isExecuting} type="submit" variant="contained">
                Update
              </Button>
            </div>
          </Stack>
        )}
      </Card>
    </form>
  );
}

export default BasicDetailsCard;
