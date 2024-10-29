import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { fetchMembers } from './fetch-members';

export type MembersType = Prisma.PromiseReturnType<typeof fetchMembers>;

export const memberSchema = z.object({
  lastName: z.string().min(1, { message: 'Last name must not be empty!' }),
  firstName: z.string().min(1, { message: 'First name must not be empty!' }),
  gender: z.enum(['Male', 'Female'], { message: 'Must be M or F!' }),
  address: z.string().min(1, { message: 'Address must not be empty!' }),
  birthDate: z.date(),
  occupation: z.string().optional(),
  contactNo: z.string().length(11, { message: 'Contact number must be 11 characters' }),
});

export type MemberSchema = z.infer<typeof memberSchema>;
