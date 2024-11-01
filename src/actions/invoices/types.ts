import { Prisma } from '@prisma/client';

import { fetchInvoices } from './fetch-invoice';

export type InvoiceType = Prisma.PromiseReturnType<typeof fetchInvoices>;
