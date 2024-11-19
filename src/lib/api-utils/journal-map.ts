import type { JournalType } from "@prisma/client";

export const JournalMap: Record<string, JournalType> = {
    'Cash Receipts': 'cashReceipts',
    'Cash Disbursement': 'cashDisbursement',
    'General Journal': 'generalJournal',
  };