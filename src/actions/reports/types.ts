import { Prisma } from '@prisma/client';

import { fetchLedgers } from './general-ledger';

export type LedgerTypes = Prisma.PromiseReturnType<typeof fetchLedgers>;
