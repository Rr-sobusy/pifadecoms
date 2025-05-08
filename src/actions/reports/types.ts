import { Prisma } from '@prisma/client';

import { fetchAccountTransactions, fetchSingleAccountTransaction } from './account-transactions/account-transactions';
import { getBalanceSheet } from './balance-sheet';
import { fetchLedgers } from './general-ledger';
import { fetchIncomeAndLossReport } from './income-and-loss';
import { fetchMemberPatronages } from './patronages';
import { fetchDoubleEntryPosted } from './account-transactions/fetch-double-entry-posted';

export type LedgerTypes = Prisma.PromiseReturnType<typeof fetchLedgers>;
export type AccountTransactionTypes = Prisma.PromiseReturnType<typeof fetchAccountTransactions>;
export type SingleAccountTransactionType = Prisma.PromiseReturnType<typeof fetchSingleAccountTransaction>
export type BalanceSheetTypes = Prisma.PromiseReturnType<typeof getBalanceSheet>;
export type IncomeAndLossTypes = Prisma.PromiseReturnType<typeof fetchIncomeAndLossReport>;
export type MemberPatronageType = Prisma.PromiseReturnType<typeof fetchMemberPatronages>;
export type DoubleEntryType = Prisma.PromiseReturnType<typeof fetchDoubleEntryPosted>
