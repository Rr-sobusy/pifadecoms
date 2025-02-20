import { Prisma } from '@prisma/client';

import { fetchLedgers } from './general-ledger';
import { fetchAccountTransactions } from './account-transactions';
import { getBalanceSheet } from './balance-sheet';
import { fetchIncomeAndLossReport } from './income-and-loss';
export type LedgerTypes = Prisma.PromiseReturnType<typeof fetchLedgers>;
export type AccountTransactionTypes = Prisma.PromiseReturnType<typeof fetchAccountTransactions>
export type BalanceSheetTypes = Prisma.PromiseReturnType<typeof getBalanceSheet>
export type IncomeAndLossTypes = Prisma.PromiseReturnType<typeof fetchIncomeAndLossReport>
