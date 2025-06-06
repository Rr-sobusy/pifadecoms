import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchMemberData, fetchMembers } from './fetch-members';

export type MembersType = Prisma.PromiseReturnType<typeof fetchMembers> & { id: number };

export type MemberDataType = Prisma.PromiseReturnType<typeof fetchMemberData>;

export const memberSchema = z.object({
  lastName: z.string().min(1, { message: 'Last name must not be empty!' }),
  firstName: z.string().min(1, { message: 'First name must not be empty!' }),
  gender: z.enum(['Male', 'Female'], { message: 'Must be M or F!' }),
  address: z.string().min(1, { message: 'Address must not be empty!' }),
  birthDate: z.date(),
  occupation: z.string().optional(),
  contactNo: z.string().length(11, { message: 'Contact number must be 11 characters' }),
});

export const memberUpdateSchema = z.object({
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  middleName:z.string().optional(),
  address: z.string().optional(),
  birthDate: z.date().optional().nullable(),
  contactNo: z.string().optional(),
  occupation: z.string().optional(),
  dateAccepted: z.date().optional().nullable(),
  tin:z.string().optional(),
  civilStatus:z.string().optional(),
  highestEduAttainment: z.string().optional(),
  annualIncom: z.number().optional()
});

export type MemberSchema = z.infer<typeof memberSchema> & { id: number };
export type IMemberUpdateSchema = z.infer<typeof memberUpdateSchema>