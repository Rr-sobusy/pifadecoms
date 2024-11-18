import { Prisma } from '@prisma/client';

import { fetchLedgers } from './general-ledger';
import { fetchAccountTransactions } from './account-transactions';

export type LedgerTypes = Prisma.PromiseReturnType<typeof fetchLedgers>;
export type AccountTransactionTypes = Prisma.PromiseReturnType<typeof fetchAccountTransactions>
