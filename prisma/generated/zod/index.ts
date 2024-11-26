import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const MembersScalarFieldEnumSchema = z.enum(['memberId','lastName','firstName','gender','idNumber','tin','dateAccepted','arb','bodResNo','membershipType','civilStatus','highestEdAttain','numOfDependents','religion','annualIncom','birthDate','address','occupation','contactNo','createdAt','updatedAt']);

export const MemberFundsScalarFieldEnumSchema = z.enum(['fundId','memberId','createdAt','updatedAt','savingsBal','shareCapBal']);

export const FundTransactionsScalarFieldEnumSchema = z.enum(['fundTransactId','fundId','ledgerId','fundType','transactionType','createdAt','postedBalance']);

export const InvoiceScalarFieldEnumSchema = z.enum(['invoiceId','memberId','dateOfInvoice','baseGrandTotal','outStandingAmt','journalId']);

export const InvoiceItemsScalarFieldEnumSchema = z.enum(['invoiceItemId','invoiceId','itemID','rate','trade','quantity']);

export const InvoicePaymentsScalarFieldEnumSchema = z.enum(['paymentId','invoiceId','orNo','paymentReceived','journalRef','paymentDate']);

export const ItemsScalarFieldEnumSchema = z.enum(['itemID','itemName','itemDescription','itemType','sellingPrice','costPrice','createdAt','updatedAt','stocks']);

export const AccountsSecondLvlScalarFieldEnumSchema = z.enum(['rootId','rootType','rootName','createdAt']);

export const AccountsThirdLvlScalarFieldEnumSchema = z.enum(['accountId','accountName','rootId','openingBalance','runningBalance','createdAt','updatedAt','isActive']);

export const DividendsScalarFieldEnumSchema = z.enum(['dividendId','memberId','accountId','datePosted','amount']);

export const SavingsTransactScalarFieldEnumSchema = z.enum(['transactionId','savingsId','transactionType']);

export const JournalEntriesScalarFieldEnumSchema = z.enum(['entryId','entryDate','referenceName','referenceType','notes','createdAt','memberId','journalType']);

export const JournalItemsScalarFieldEnumSchema = z.enum(['journalItemsId','entryId','accountId','debit','credit']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const AccountTypesSchema = z.enum(['Assets','Liability','Equity','Revenue','Expense']);

export type AccountTypesType = `${z.infer<typeof AccountTypesSchema>}`

export const GenderSchema = z.enum(['Male','Female']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const AccountStatusSchema = z.enum(['active','inactive']);

export type AccountStatusType = `${z.infer<typeof AccountStatusSchema>}`

export const SavingsTypeSchema = z.enum(['sharedCap','memberSavings']);

export type SavingsTypeType = `${z.infer<typeof SavingsTypeSchema>}`

export const SavingsTransactionTypeSchema = z.enum(['withdrawal','deposit']);

export type SavingsTransactionTypeType = `${z.infer<typeof SavingsTransactionTypeSchema>}`

export const ItemTypeSchema = z.enum(['product','services']);

export type ItemTypeType = `${z.infer<typeof ItemTypeSchema>}`

export const InvoiceStatusSchema = z.enum(['pending','paid','cancelled']);

export type InvoiceStatusType = `${z.infer<typeof InvoiceStatusSchema>}`

export const JournalTypeSchema = z.enum(['cashReceipts','cashDisbursement','generalJournal']);

export type JournalTypeType = `${z.infer<typeof JournalTypeSchema>}`

export const ReferenceTypeSchema = z.enum(['MemberRegistration','SalesPayments','LoanDisbursements','LoanRepayments','ManualJournals']);

export type ReferenceTypeType = `${z.infer<typeof ReferenceTypeSchema>}`

export const FundTypeSchema = z.enum(['Savings','ShareCapital']);

export type FundTypeType = `${z.infer<typeof FundTypeSchema>}`

export const FundTransactionsTypeSchema = z.enum(['SavingsDeposit','SavingsWithdrawal','ShareCapDeposit','ShareCapWithdrawal']);

export type FundTransactionsTypeType = `${z.infer<typeof FundTransactionsTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MEMBERS SCHEMA
/////////////////////////////////////////

export const MembersSchema = z.object({
  gender: GenderSchema,
  memberId: z.string().cuid(),
  lastName: z.string(),
  firstName: z.string(),
  idNumber: z.number().int().nullable(),
  tin: z.string().nullable(),
  dateAccepted: z.coerce.date().nullable(),
  arb: z.string().nullable(),
  bodResNo: z.string().nullable(),
  membershipType: z.string().nullable(),
  civilStatus: z.string().nullable(),
  highestEdAttain: z.string().nullable(),
  numOfDependents: z.number().int().nullable(),
  religion: z.string().nullable(),
  annualIncom: z.number().int().nullable(),
  birthDate: z.coerce.date().nullable(),
  address: z.string(),
  occupation: z.string().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Members = z.infer<typeof MembersSchema>

/////////////////////////////////////////
// MEMBER FUNDS SCHEMA
/////////////////////////////////////////

export const MemberFundsSchema = z.object({
  fundId: z.number().int(),
  memberId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  savingsBal: z.number(),
  shareCapBal: z.number(),
})

export type MemberFunds = z.infer<typeof MemberFundsSchema>

/////////////////////////////////////////
// FUND TRANSACTIONS SCHEMA
/////////////////////////////////////////

export const FundTransactionsSchema = z.object({
  fundType: FundTypeSchema,
  transactionType: FundTransactionsTypeSchema,
  fundTransactId: z.number().int(),
  fundId: z.number().int(),
  ledgerId: z.bigint().nullable(),
  createdAt: z.coerce.date(),
  postedBalance: z.number(),
})

export type FundTransactions = z.infer<typeof FundTransactionsSchema>

/////////////////////////////////////////
// INVOICE SCHEMA
/////////////////////////////////////////

export const InvoiceSchema = z.object({
  invoiceId: z.bigint(),
  memberId: z.string(),
  dateOfInvoice: z.coerce.date(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().nullable(),
})

export type Invoice = z.infer<typeof InvoiceSchema>

/////////////////////////////////////////
// INVOICE ITEMS SCHEMA
/////////////////////////////////////////

export const InvoiceItemsSchema = z.object({
  invoiceItemId: z.bigint(),
  invoiceId: z.bigint(),
  itemID: z.string(),
  rate: z.number().int(),
  trade: z.number().int().nullable(),
  quantity: z.number().int(),
})

export type InvoiceItems = z.infer<typeof InvoiceItemsSchema>

/////////////////////////////////////////
// INVOICE PAYMENTS SCHEMA
/////////////////////////////////////////

export const InvoicePaymentsSchema = z.object({
  paymentId: z.bigint(),
  invoiceId: z.bigint(),
  orNo: z.string(),
  paymentReceived: z.number(),
  journalRef: z.bigint(),
  paymentDate: z.coerce.date(),
})

export type InvoicePayments = z.infer<typeof InvoicePaymentsSchema>

/////////////////////////////////////////
// ITEMS SCHEMA
/////////////////////////////////////////

export const ItemsSchema = z.object({
  itemType: ItemTypeSchema,
  itemID: z.string().cuid(),
  itemName: z.string(),
  itemDescription: z.string().nullable(),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stocks: z.number().int().nullable(),
})

export type Items = z.infer<typeof ItemsSchema>

/////////////////////////////////////////
// ACCOUNTS SECOND LVL SCHEMA
/////////////////////////////////////////

export const AccountsSecondLvlSchema = z.object({
  rootType: AccountTypesSchema,
  rootId: z.number().int(),
  rootName: z.string(),
  createdAt: z.coerce.date(),
})

export type AccountsSecondLvl = z.infer<typeof AccountsSecondLvlSchema>

/////////////////////////////////////////
// ACCOUNTS THIRD LVL SCHEMA
/////////////////////////////////////////

export const AccountsThirdLvlSchema = z.object({
  accountId: z.string().cuid(),
  accountName: z.string(),
  rootId: z.number().int(),
  openingBalance: z.number(),
  runningBalance: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isActive: z.boolean(),
})

export type AccountsThirdLvl = z.infer<typeof AccountsThirdLvlSchema>

/////////////////////////////////////////
// DIVIDENDS SCHEMA
/////////////////////////////////////////

export const DividendsSchema = z.object({
  dividendId: z.bigint(),
  memberId: z.string(),
  accountId: z.string(),
  datePosted: z.coerce.date(),
  amount: z.number(),
})

export type Dividends = z.infer<typeof DividendsSchema>

/////////////////////////////////////////
// SAVINGS TRANSACT SCHEMA
/////////////////////////////////////////

export const SavingsTransactSchema = z.object({
  transactionType: SavingsTransactionTypeSchema,
  transactionId: z.bigint(),
  savingsId: z.string(),
})

export type SavingsTransact = z.infer<typeof SavingsTransactSchema>

/////////////////////////////////////////
// JOURNAL ENTRIES SCHEMA
/////////////////////////////////////////

export const JournalEntriesSchema = z.object({
  referenceType: ReferenceTypeSchema,
  journalType: JournalTypeSchema,
  entryId: z.bigint(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  notes: z.string().nullable(),
  createdAt: z.coerce.date(),
  memberId: z.string().nullable(),
})

export type JournalEntries = z.infer<typeof JournalEntriesSchema>

/////////////////////////////////////////
// JOURNAL ITEMS SCHEMA
/////////////////////////////////////////

export const JournalItemsSchema = z.object({
  journalItemsId: z.bigint(),
  entryId: z.bigint(),
  accountId: z.string(),
  debit: z.number(),
  credit: z.number(),
})

export type JournalItems = z.infer<typeof JournalItemsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MEMBERS
//------------------------------------------------------

export const MembersIncludeSchema: z.ZodType<Prisma.MembersInclude> = z.object({
  Funds: z.union([z.boolean(),z.lazy(() => MemberFundsArgsSchema)]).optional(),
  dividends: z.union([z.boolean(),z.lazy(() => DividendsFindManyArgsSchema)]).optional(),
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  Journals: z.union([z.boolean(),z.lazy(() => JournalEntriesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MembersCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MembersArgsSchema: z.ZodType<Prisma.MembersDefaultArgs> = z.object({
  select: z.lazy(() => MembersSelectSchema).optional(),
  include: z.lazy(() => MembersIncludeSchema).optional(),
}).strict();

export const MembersCountOutputTypeArgsSchema: z.ZodType<Prisma.MembersCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MembersCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MembersCountOutputTypeSelectSchema: z.ZodType<Prisma.MembersCountOutputTypeSelect> = z.object({
  dividends: z.boolean().optional(),
  invoice: z.boolean().optional(),
  Journals: z.boolean().optional(),
}).strict();

export const MembersSelectSchema: z.ZodType<Prisma.MembersSelect> = z.object({
  memberId: z.boolean().optional(),
  lastName: z.boolean().optional(),
  firstName: z.boolean().optional(),
  gender: z.boolean().optional(),
  idNumber: z.boolean().optional(),
  tin: z.boolean().optional(),
  dateAccepted: z.boolean().optional(),
  arb: z.boolean().optional(),
  bodResNo: z.boolean().optional(),
  membershipType: z.boolean().optional(),
  civilStatus: z.boolean().optional(),
  highestEdAttain: z.boolean().optional(),
  numOfDependents: z.boolean().optional(),
  religion: z.boolean().optional(),
  annualIncom: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  address: z.boolean().optional(),
  occupation: z.boolean().optional(),
  contactNo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Funds: z.union([z.boolean(),z.lazy(() => MemberFundsArgsSchema)]).optional(),
  dividends: z.union([z.boolean(),z.lazy(() => DividendsFindManyArgsSchema)]).optional(),
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  Journals: z.union([z.boolean(),z.lazy(() => JournalEntriesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MembersCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEMBER FUNDS
//------------------------------------------------------

export const MemberFundsIncludeSchema: z.ZodType<Prisma.MemberFundsInclude> = z.object({
  Member: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  Transactions: z.union([z.boolean(),z.lazy(() => FundTransactionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberFundsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MemberFundsArgsSchema: z.ZodType<Prisma.MemberFundsDefaultArgs> = z.object({
  select: z.lazy(() => MemberFundsSelectSchema).optional(),
  include: z.lazy(() => MemberFundsIncludeSchema).optional(),
}).strict();

export const MemberFundsCountOutputTypeArgsSchema: z.ZodType<Prisma.MemberFundsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MemberFundsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MemberFundsCountOutputTypeSelectSchema: z.ZodType<Prisma.MemberFundsCountOutputTypeSelect> = z.object({
  Transactions: z.boolean().optional(),
}).strict();

export const MemberFundsSelectSchema: z.ZodType<Prisma.MemberFundsSelect> = z.object({
  fundId: z.boolean().optional(),
  memberId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  savingsBal: z.boolean().optional(),
  shareCapBal: z.boolean().optional(),
  Member: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  Transactions: z.union([z.boolean(),z.lazy(() => FundTransactionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberFundsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FUND TRANSACTIONS
//------------------------------------------------------

export const FundTransactionsIncludeSchema: z.ZodType<Prisma.FundTransactionsInclude> = z.object({
  JournalEntries: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  MemberFunds: z.union([z.boolean(),z.lazy(() => MemberFundsArgsSchema)]).optional(),
}).strict()

export const FundTransactionsArgsSchema: z.ZodType<Prisma.FundTransactionsDefaultArgs> = z.object({
  select: z.lazy(() => FundTransactionsSelectSchema).optional(),
  include: z.lazy(() => FundTransactionsIncludeSchema).optional(),
}).strict();

export const FundTransactionsSelectSchema: z.ZodType<Prisma.FundTransactionsSelect> = z.object({
  fundTransactId: z.boolean().optional(),
  fundId: z.boolean().optional(),
  ledgerId: z.boolean().optional(),
  fundType: z.boolean().optional(),
  transactionType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  postedBalance: z.boolean().optional(),
  JournalEntries: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  MemberFunds: z.union([z.boolean(),z.lazy(() => MemberFundsArgsSchema)]).optional(),
}).strict()

// INVOICE
//------------------------------------------------------

export const InvoiceIncludeSchema: z.ZodType<Prisma.InvoiceInclude> = z.object({
  Members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  InvoiceItems: z.union([z.boolean(),z.lazy(() => InvoiceItemsFindManyArgsSchema)]).optional(),
  InvoicePayments: z.union([z.boolean(),z.lazy(() => InvoicePaymentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InvoiceArgsSchema: z.ZodType<Prisma.InvoiceDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceSelectSchema).optional(),
  include: z.lazy(() => InvoiceIncludeSchema).optional(),
}).strict();

export const InvoiceCountOutputTypeArgsSchema: z.ZodType<Prisma.InvoiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InvoiceCountOutputTypeSelectSchema: z.ZodType<Prisma.InvoiceCountOutputTypeSelect> = z.object({
  InvoiceItems: z.boolean().optional(),
  InvoicePayments: z.boolean().optional(),
}).strict();

export const InvoiceSelectSchema: z.ZodType<Prisma.InvoiceSelect> = z.object({
  invoiceId: z.boolean().optional(),
  memberId: z.boolean().optional(),
  dateOfInvoice: z.boolean().optional(),
  baseGrandTotal: z.boolean().optional(),
  outStandingAmt: z.boolean().optional(),
  journalId: z.boolean().optional(),
  Members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  InvoiceItems: z.union([z.boolean(),z.lazy(() => InvoiceItemsFindManyArgsSchema)]).optional(),
  InvoicePayments: z.union([z.boolean(),z.lazy(() => InvoicePaymentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INVOICE ITEMS
//------------------------------------------------------

export const InvoiceItemsIncludeSchema: z.ZodType<Prisma.InvoiceItemsInclude> = z.object({
  Item: z.union([z.boolean(),z.lazy(() => ItemsArgsSchema)]).optional(),
  Invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
}).strict()

export const InvoiceItemsArgsSchema: z.ZodType<Prisma.InvoiceItemsDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceItemsSelectSchema).optional(),
  include: z.lazy(() => InvoiceItemsIncludeSchema).optional(),
}).strict();

export const InvoiceItemsSelectSchema: z.ZodType<Prisma.InvoiceItemsSelect> = z.object({
  invoiceItemId: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  itemID: z.boolean().optional(),
  rate: z.boolean().optional(),
  trade: z.boolean().optional(),
  quantity: z.boolean().optional(),
  Item: z.union([z.boolean(),z.lazy(() => ItemsArgsSchema)]).optional(),
  Invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
}).strict()

// INVOICE PAYMENTS
//------------------------------------------------------

export const InvoicePaymentsIncludeSchema: z.ZodType<Prisma.InvoicePaymentsInclude> = z.object({
  JournalEntry: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  Invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
}).strict()

export const InvoicePaymentsArgsSchema: z.ZodType<Prisma.InvoicePaymentsDefaultArgs> = z.object({
  select: z.lazy(() => InvoicePaymentsSelectSchema).optional(),
  include: z.lazy(() => InvoicePaymentsIncludeSchema).optional(),
}).strict();

export const InvoicePaymentsSelectSchema: z.ZodType<Prisma.InvoicePaymentsSelect> = z.object({
  paymentId: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  orNo: z.boolean().optional(),
  paymentReceived: z.boolean().optional(),
  journalRef: z.boolean().optional(),
  paymentDate: z.boolean().optional(),
  JournalEntry: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  Invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
}).strict()

// ITEMS
//------------------------------------------------------

export const ItemsIncludeSchema: z.ZodType<Prisma.ItemsInclude> = z.object({
  InvoiceItems: z.union([z.boolean(),z.lazy(() => InvoiceItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItemsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ItemsArgsSchema: z.ZodType<Prisma.ItemsDefaultArgs> = z.object({
  select: z.lazy(() => ItemsSelectSchema).optional(),
  include: z.lazy(() => ItemsIncludeSchema).optional(),
}).strict();

export const ItemsCountOutputTypeArgsSchema: z.ZodType<Prisma.ItemsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ItemsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ItemsCountOutputTypeSelectSchema: z.ZodType<Prisma.ItemsCountOutputTypeSelect> = z.object({
  InvoiceItems: z.boolean().optional(),
}).strict();

export const ItemsSelectSchema: z.ZodType<Prisma.ItemsSelect> = z.object({
  itemID: z.boolean().optional(),
  itemName: z.boolean().optional(),
  itemDescription: z.boolean().optional(),
  itemType: z.boolean().optional(),
  sellingPrice: z.boolean().optional(),
  costPrice: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  stocks: z.boolean().optional(),
  InvoiceItems: z.union([z.boolean(),z.lazy(() => InvoiceItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItemsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNTS SECOND LVL
//------------------------------------------------------

export const AccountsSecondLvlIncludeSchema: z.ZodType<Prisma.AccountsSecondLvlInclude> = z.object({
  Children: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountsSecondLvlCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountsSecondLvlArgsSchema: z.ZodType<Prisma.AccountsSecondLvlDefaultArgs> = z.object({
  select: z.lazy(() => AccountsSecondLvlSelectSchema).optional(),
  include: z.lazy(() => AccountsSecondLvlIncludeSchema).optional(),
}).strict();

export const AccountsSecondLvlCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountsSecondLvlCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountsSecondLvlCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountsSecondLvlCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountsSecondLvlCountOutputTypeSelect> = z.object({
  Children: z.boolean().optional(),
}).strict();

export const AccountsSecondLvlSelectSchema: z.ZodType<Prisma.AccountsSecondLvlSelect> = z.object({
  rootId: z.boolean().optional(),
  rootType: z.boolean().optional(),
  rootName: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  Children: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountsSecondLvlCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNTS THIRD LVL
//------------------------------------------------------

export const AccountsThirdLvlIncludeSchema: z.ZodType<Prisma.AccountsThirdLvlInclude> = z.object({
  RootID: z.union([z.boolean(),z.lazy(() => AccountsSecondLvlArgsSchema)]).optional(),
  Dividends: z.union([z.boolean(),z.lazy(() => DividendsFindManyArgsSchema)]).optional(),
  JournalItems: z.union([z.boolean(),z.lazy(() => JournalItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountsThirdLvlArgsSchema: z.ZodType<Prisma.AccountsThirdLvlDefaultArgs> = z.object({
  select: z.lazy(() => AccountsThirdLvlSelectSchema).optional(),
  include: z.lazy(() => AccountsThirdLvlIncludeSchema).optional(),
}).strict();

export const AccountsThirdLvlCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountsThirdLvlCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountsThirdLvlCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountsThirdLvlCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountsThirdLvlCountOutputTypeSelect> = z.object({
  Dividends: z.boolean().optional(),
  JournalItems: z.boolean().optional(),
}).strict();

export const AccountsThirdLvlSelectSchema: z.ZodType<Prisma.AccountsThirdLvlSelect> = z.object({
  accountId: z.boolean().optional(),
  accountName: z.boolean().optional(),
  rootId: z.boolean().optional(),
  openingBalance: z.boolean().optional(),
  runningBalance: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isActive: z.boolean().optional(),
  RootID: z.union([z.boolean(),z.lazy(() => AccountsSecondLvlArgsSchema)]).optional(),
  Dividends: z.union([z.boolean(),z.lazy(() => DividendsFindManyArgsSchema)]).optional(),
  JournalItems: z.union([z.boolean(),z.lazy(() => JournalItemsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DIVIDENDS
//------------------------------------------------------

export const DividendsIncludeSchema: z.ZodType<Prisma.DividendsInclude> = z.object({
  members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlArgsSchema)]).optional(),
}).strict()

export const DividendsArgsSchema: z.ZodType<Prisma.DividendsDefaultArgs> = z.object({
  select: z.lazy(() => DividendsSelectSchema).optional(),
  include: z.lazy(() => DividendsIncludeSchema).optional(),
}).strict();

export const DividendsSelectSchema: z.ZodType<Prisma.DividendsSelect> = z.object({
  dividendId: z.boolean().optional(),
  memberId: z.boolean().optional(),
  accountId: z.boolean().optional(),
  datePosted: z.boolean().optional(),
  amount: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlArgsSchema)]).optional(),
}).strict()

// SAVINGS TRANSACT
//------------------------------------------------------

export const SavingsTransactSelectSchema: z.ZodType<Prisma.SavingsTransactSelect> = z.object({
  transactionId: z.boolean().optional(),
  savingsId: z.boolean().optional(),
  transactionType: z.boolean().optional(),
}).strict()

// JOURNAL ENTRIES
//------------------------------------------------------

export const JournalEntriesIncludeSchema: z.ZodType<Prisma.JournalEntriesInclude> = z.object({
  JournalItems: z.union([z.boolean(),z.lazy(() => JournalItemsFindManyArgsSchema)]).optional(),
  MemberFundsTransact: z.union([z.boolean(),z.lazy(() => FundTransactionsFindManyArgsSchema)]).optional(),
  Members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  InvoicePayments: z.union([z.boolean(),z.lazy(() => InvoicePaymentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JournalEntriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const JournalEntriesArgsSchema: z.ZodType<Prisma.JournalEntriesDefaultArgs> = z.object({
  select: z.lazy(() => JournalEntriesSelectSchema).optional(),
  include: z.lazy(() => JournalEntriesIncludeSchema).optional(),
}).strict();

export const JournalEntriesCountOutputTypeArgsSchema: z.ZodType<Prisma.JournalEntriesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => JournalEntriesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const JournalEntriesCountOutputTypeSelectSchema: z.ZodType<Prisma.JournalEntriesCountOutputTypeSelect> = z.object({
  JournalItems: z.boolean().optional(),
  MemberFundsTransact: z.boolean().optional(),
  InvoicePayments: z.boolean().optional(),
}).strict();

export const JournalEntriesSelectSchema: z.ZodType<Prisma.JournalEntriesSelect> = z.object({
  entryId: z.boolean().optional(),
  entryDate: z.boolean().optional(),
  referenceName: z.boolean().optional(),
  referenceType: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  memberId: z.boolean().optional(),
  journalType: z.boolean().optional(),
  JournalItems: z.union([z.boolean(),z.lazy(() => JournalItemsFindManyArgsSchema)]).optional(),
  MemberFundsTransact: z.union([z.boolean(),z.lazy(() => FundTransactionsFindManyArgsSchema)]).optional(),
  Members: z.union([z.boolean(),z.lazy(() => MembersArgsSchema)]).optional(),
  InvoicePayments: z.union([z.boolean(),z.lazy(() => InvoicePaymentsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JournalEntriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// JOURNAL ITEMS
//------------------------------------------------------

export const JournalItemsIncludeSchema: z.ZodType<Prisma.JournalItemsInclude> = z.object({
  JournalEntries: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  Accounts: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlArgsSchema)]).optional(),
}).strict()

export const JournalItemsArgsSchema: z.ZodType<Prisma.JournalItemsDefaultArgs> = z.object({
  select: z.lazy(() => JournalItemsSelectSchema).optional(),
  include: z.lazy(() => JournalItemsIncludeSchema).optional(),
}).strict();

export const JournalItemsSelectSchema: z.ZodType<Prisma.JournalItemsSelect> = z.object({
  journalItemsId: z.boolean().optional(),
  entryId: z.boolean().optional(),
  accountId: z.boolean().optional(),
  debit: z.boolean().optional(),
  credit: z.boolean().optional(),
  JournalEntries: z.union([z.boolean(),z.lazy(() => JournalEntriesArgsSchema)]).optional(),
  Accounts: z.union([z.boolean(),z.lazy(() => AccountsThirdLvlArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MembersWhereInputSchema: z.ZodType<Prisma.MembersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  idNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  tin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateAccepted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  arb: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bodResNo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  membershipType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  civilStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  highestEdAttain: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numOfDependents: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  religion: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  annualIncom: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  occupation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Funds: z.union([ z.lazy(() => MemberFundsNullableRelationFilterSchema),z.lazy(() => MemberFundsWhereInputSchema) ]).optional().nullable(),
  dividends: z.lazy(() => DividendsListRelationFilterSchema).optional(),
  invoice: z.lazy(() => InvoiceListRelationFilterSchema).optional(),
  Journals: z.lazy(() => JournalEntriesListRelationFilterSchema).optional()
}).strict();

export const MembersOrderByWithRelationInputSchema: z.ZodType<Prisma.MembersOrderByWithRelationInput> = z.object({
  memberId: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  idNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAccepted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  arb: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bodResNo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  membershipType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  civilStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highestEdAttain: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numOfDependents: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  religion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  annualIncom: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactNo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Funds: z.lazy(() => MemberFundsOrderByWithRelationInputSchema).optional(),
  dividends: z.lazy(() => DividendsOrderByRelationAggregateInputSchema).optional(),
  invoice: z.lazy(() => InvoiceOrderByRelationAggregateInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MembersWhereUniqueInputSchema: z.ZodType<Prisma.MembersWhereUniqueInput> = z.object({
  memberId: z.string().cuid()
})
.and(z.object({
  memberId: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersWhereInputSchema),z.lazy(() => MembersWhereInputSchema).array() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  idNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  tin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateAccepted: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  arb: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bodResNo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  membershipType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  civilStatus: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  highestEdAttain: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  numOfDependents: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  religion: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  annualIncom: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  occupation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contactNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Funds: z.union([ z.lazy(() => MemberFundsNullableRelationFilterSchema),z.lazy(() => MemberFundsWhereInputSchema) ]).optional().nullable(),
  dividends: z.lazy(() => DividendsListRelationFilterSchema).optional(),
  invoice: z.lazy(() => InvoiceListRelationFilterSchema).optional(),
  Journals: z.lazy(() => JournalEntriesListRelationFilterSchema).optional()
}).strict());

export const MembersOrderByWithAggregationInputSchema: z.ZodType<Prisma.MembersOrderByWithAggregationInput> = z.object({
  memberId: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  idNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateAccepted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  arb: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bodResNo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  membershipType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  civilStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  highestEdAttain: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  numOfDependents: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  religion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  annualIncom: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactNo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MembersCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MembersAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MembersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MembersMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MembersSumOrderByAggregateInputSchema).optional()
}).strict();

export const MembersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MembersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MembersScalarWhereWithAggregatesInputSchema),z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MembersScalarWhereWithAggregatesInputSchema),z.lazy(() => MembersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  memberId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  idNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  tin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  dateAccepted: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  arb: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bodResNo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  membershipType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  civilStatus: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  highestEdAttain: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  numOfDependents: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  religion: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  annualIncom: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  occupation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contactNo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MemberFundsWhereInputSchema: z.ZodType<Prisma.MemberFundsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemberFundsWhereInputSchema),z.lazy(() => MemberFundsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberFundsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberFundsWhereInputSchema),z.lazy(() => MemberFundsWhereInputSchema).array() ]).optional(),
  fundId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  savingsBal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  shareCapBal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  Member: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  Transactions: z.lazy(() => FundTransactionsListRelationFilterSchema).optional()
}).strict();

export const MemberFundsOrderByWithRelationInputSchema: z.ZodType<Prisma.MemberFundsOrderByWithRelationInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional(),
  Member: z.lazy(() => MembersOrderByWithRelationInputSchema).optional(),
  Transactions: z.lazy(() => FundTransactionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MemberFundsWhereUniqueInputSchema: z.ZodType<Prisma.MemberFundsWhereUniqueInput> = z.union([
  z.object({
    fundId: z.number().int(),
    memberId: z.string()
  }),
  z.object({
    fundId: z.number().int(),
  }),
  z.object({
    memberId: z.string(),
  }),
])
.and(z.object({
  fundId: z.number().int().optional(),
  memberId: z.string().optional(),
  AND: z.union([ z.lazy(() => MemberFundsWhereInputSchema),z.lazy(() => MemberFundsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberFundsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberFundsWhereInputSchema),z.lazy(() => MemberFundsWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  savingsBal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  shareCapBal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  Member: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  Transactions: z.lazy(() => FundTransactionsListRelationFilterSchema).optional()
}).strict());

export const MemberFundsOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemberFundsOrderByWithAggregationInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MemberFundsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MemberFundsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MemberFundsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MemberFundsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MemberFundsSumOrderByAggregateInputSchema).optional()
}).strict();

export const MemberFundsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemberFundsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MemberFundsScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberFundsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberFundsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberFundsScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberFundsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  fundId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  memberId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  savingsBal: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  shareCapBal: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const FundTransactionsWhereInputSchema: z.ZodType<Prisma.FundTransactionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundTransactionsWhereInputSchema),z.lazy(() => FundTransactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundTransactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundTransactionsWhereInputSchema),z.lazy(() => FundTransactionsWhereInputSchema).array() ]).optional(),
  fundTransactId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fundId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ledgerId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => EnumFundTypeFilterSchema),z.lazy(() => FundTypeSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumFundTransactionsTypeFilterSchema),z.lazy(() => FundTransactionsTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  postedBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  JournalEntries: z.union([ z.lazy(() => JournalEntriesNullableRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional().nullable(),
  MemberFunds: z.union([ z.lazy(() => MemberFundsRelationFilterSchema),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
}).strict();

export const FundTransactionsOrderByWithRelationInputSchema: z.ZodType<Prisma.FundTransactionsOrderByWithRelationInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fundType: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional(),
  JournalEntries: z.lazy(() => JournalEntriesOrderByWithRelationInputSchema).optional(),
  MemberFunds: z.lazy(() => MemberFundsOrderByWithRelationInputSchema).optional()
}).strict();

export const FundTransactionsWhereUniqueInputSchema: z.ZodType<Prisma.FundTransactionsWhereUniqueInput> = z.object({
  fundTransactId: z.number().int()
})
.and(z.object({
  fundTransactId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FundTransactionsWhereInputSchema),z.lazy(() => FundTransactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundTransactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundTransactionsWhereInputSchema),z.lazy(() => FundTransactionsWhereInputSchema).array() ]).optional(),
  fundId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ledgerId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => EnumFundTypeFilterSchema),z.lazy(() => FundTypeSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumFundTransactionsTypeFilterSchema),z.lazy(() => FundTransactionsTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  postedBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  JournalEntries: z.union([ z.lazy(() => JournalEntriesNullableRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional().nullable(),
  MemberFunds: z.union([ z.lazy(() => MemberFundsRelationFilterSchema),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
}).strict());

export const FundTransactionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FundTransactionsOrderByWithAggregationInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fundType: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FundTransactionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FundTransactionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FundTransactionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FundTransactionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FundTransactionsSumOrderByAggregateInputSchema).optional()
}).strict();

export const FundTransactionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FundTransactionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FundTransactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => FundTransactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundTransactionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundTransactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => FundTransactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  fundTransactId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  fundId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ledgerId: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => EnumFundTypeWithAggregatesFilterSchema),z.lazy(() => FundTypeSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumFundTransactionsTypeWithAggregatesFilterSchema),z.lazy(() => FundTransactionsTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  postedBalance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const InvoiceWhereInputSchema: z.ZodType<Prisma.InvoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateOfInvoice: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  baseGrandTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  outStandingAmt: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  Members: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsListRelationFilterSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsListRelationFilterSchema).optional()
}).strict();

export const InvoiceOrderByWithRelationInputSchema: z.ZodType<Prisma.InvoiceOrderByWithRelationInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  dateOfInvoice: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Members: z.lazy(() => MembersOrderByWithRelationInputSchema).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsOrderByRelationAggregateInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InvoiceWhereUniqueInputSchema: z.ZodType<Prisma.InvoiceWhereUniqueInput> = z.object({
  invoiceId: z.bigint()
})
.and(z.object({
  invoiceId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceWhereInputSchema),z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateOfInvoice: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  baseGrandTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  outStandingAmt: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  Members: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsListRelationFilterSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsListRelationFilterSchema).optional()
}).strict());

export const InvoiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoiceOrderByWithAggregationInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  dateOfInvoice: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => InvoiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvoiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvoiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const InvoiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dateOfInvoice: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  baseGrandTotal: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  outStandingAmt: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  journalId: z.union([ z.lazy(() => BigIntNullableWithAggregatesFilterSchema),z.bigint() ]).optional().nullable(),
}).strict();

export const InvoiceItemsWhereInputSchema: z.ZodType<Prisma.InvoiceItemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceItemsWhereInputSchema),z.lazy(() => InvoiceItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceItemsWhereInputSchema),z.lazy(() => InvoiceItemsWhereInputSchema).array() ]).optional(),
  invoiceItemId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  itemID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  trade: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Item: z.union([ z.lazy(() => ItemsRelationFilterSchema),z.lazy(() => ItemsWhereInputSchema) ]).optional(),
  Invoice: z.union([ z.lazy(() => InvoiceRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.InvoiceItemsOrderByWithRelationInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemID: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  Item: z.lazy(() => ItemsOrderByWithRelationInputSchema).optional(),
  Invoice: z.lazy(() => InvoiceOrderByWithRelationInputSchema).optional()
}).strict();

export const InvoiceItemsWhereUniqueInputSchema: z.ZodType<Prisma.InvoiceItemsWhereUniqueInput> = z.object({
  invoiceItemId: z.bigint()
})
.and(z.object({
  invoiceItemId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => InvoiceItemsWhereInputSchema),z.lazy(() => InvoiceItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceItemsWhereInputSchema),z.lazy(() => InvoiceItemsWhereInputSchema).array() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  itemID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  trade: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Item: z.union([ z.lazy(() => ItemsRelationFilterSchema),z.lazy(() => ItemsWhereInputSchema) ]).optional(),
  Invoice: z.union([ z.lazy(() => InvoiceRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
}).strict());

export const InvoiceItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoiceItemsOrderByWithAggregationInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemID: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvoiceItemsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvoiceItemsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoiceItemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoiceItemsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvoiceItemsSumOrderByAggregateInputSchema).optional()
}).strict();

export const InvoiceItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoiceItemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceItemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoiceItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  invoiceItemId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  itemID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  trade: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const InvoicePaymentsWhereInputSchema: z.ZodType<Prisma.InvoicePaymentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicePaymentsWhereInputSchema),z.lazy(() => InvoicePaymentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicePaymentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicePaymentsWhereInputSchema),z.lazy(() => InvoicePaymentsWhereInputSchema).array() ]).optional(),
  paymentId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  orNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentReceived: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalRef: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  paymentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  JournalEntry: z.union([ z.lazy(() => JournalEntriesRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  Invoice: z.union([ z.lazy(() => InvoiceRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsOrderByWithRelationInputSchema: z.ZodType<Prisma.InvoicePaymentsOrderByWithRelationInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  orNo: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional(),
  paymentDate: z.lazy(() => SortOrderSchema).optional(),
  JournalEntry: z.lazy(() => JournalEntriesOrderByWithRelationInputSchema).optional(),
  Invoice: z.lazy(() => InvoiceOrderByWithRelationInputSchema).optional()
}).strict();

export const InvoicePaymentsWhereUniqueInputSchema: z.ZodType<Prisma.InvoicePaymentsWhereUniqueInput> = z.object({
  paymentId: z.bigint()
})
.and(z.object({
  paymentId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => InvoicePaymentsWhereInputSchema),z.lazy(() => InvoicePaymentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicePaymentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicePaymentsWhereInputSchema),z.lazy(() => InvoicePaymentsWhereInputSchema).array() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  orNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentReceived: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalRef: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  paymentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  JournalEntry: z.union([ z.lazy(() => JournalEntriesRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  Invoice: z.union([ z.lazy(() => InvoiceRelationFilterSchema),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
}).strict());

export const InvoicePaymentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvoicePaymentsOrderByWithAggregationInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  orNo: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional(),
  paymentDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvoicePaymentsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InvoicePaymentsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvoicePaymentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvoicePaymentsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InvoicePaymentsSumOrderByAggregateInputSchema).optional()
}).strict();

export const InvoicePaymentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoicePaymentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicePaymentsScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoicePaymentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicePaymentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicePaymentsScalarWhereWithAggregatesInputSchema),z.lazy(() => InvoicePaymentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  paymentId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  orNo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  paymentReceived: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  journalRef: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  paymentDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItemsWhereInputSchema: z.ZodType<Prisma.ItemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  itemID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itemName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itemDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => EnumItemTypeFilterSchema),z.lazy(() => ItemTypeSchema) ]).optional(),
  sellingPrice: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  costPrice: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stocks: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsListRelationFilterSchema).optional()
}).strict();

export const ItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.ItemsOrderByWithRelationInput> = z.object({
  itemID: z.lazy(() => SortOrderSchema).optional(),
  itemName: z.lazy(() => SortOrderSchema).optional(),
  itemDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  itemType: z.lazy(() => SortOrderSchema).optional(),
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ItemsWhereUniqueInputSchema: z.ZodType<Prisma.ItemsWhereUniqueInput> = z.object({
  itemID: z.string().cuid()
})
.and(z.object({
  itemID: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsWhereInputSchema),z.lazy(() => ItemsWhereInputSchema).array() ]).optional(),
  itemName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itemDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => EnumItemTypeFilterSchema),z.lazy(() => ItemTypeSchema) ]).optional(),
  sellingPrice: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  costPrice: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stocks: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsListRelationFilterSchema).optional()
}).strict());

export const ItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItemsOrderByWithAggregationInput> = z.object({
  itemID: z.lazy(() => SortOrderSchema).optional(),
  itemName: z.lazy(() => SortOrderSchema).optional(),
  itemDescription: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  itemType: z.lazy(() => SortOrderSchema).optional(),
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ItemsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItemsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItemsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItemsSumOrderByAggregateInputSchema).optional()
}).strict();

export const ItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => ItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  itemID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  itemName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  itemDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => EnumItemTypeWithAggregatesFilterSchema),z.lazy(() => ItemTypeSchema) ]).optional(),
  sellingPrice: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  costPrice: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  stocks: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const AccountsSecondLvlWhereInputSchema: z.ZodType<Prisma.AccountsSecondLvlWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountsSecondLvlWhereInputSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsSecondLvlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsSecondLvlWhereInputSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema).array() ]).optional(),
  rootId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rootType: z.union([ z.lazy(() => EnumAccountTypesFilterSchema),z.lazy(() => AccountTypesSchema) ]).optional(),
  rootName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Children: z.lazy(() => AccountsThirdLvlListRelationFilterSchema).optional()
}).strict();

export const AccountsSecondLvlOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountsSecondLvlOrderByWithRelationInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  rootType: z.lazy(() => SortOrderSchema).optional(),
  rootName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  Children: z.lazy(() => AccountsThirdLvlOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountsSecondLvlWhereUniqueInputSchema: z.ZodType<Prisma.AccountsSecondLvlWhereUniqueInput> = z.object({
  rootId: z.number().int()
})
.and(z.object({
  rootId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AccountsSecondLvlWhereInputSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsSecondLvlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsSecondLvlWhereInputSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema).array() ]).optional(),
  rootType: z.union([ z.lazy(() => EnumAccountTypesFilterSchema),z.lazy(() => AccountTypesSchema) ]).optional(),
  rootName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Children: z.lazy(() => AccountsThirdLvlListRelationFilterSchema).optional()
}).strict());

export const AccountsSecondLvlOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountsSecondLvlOrderByWithAggregationInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  rootType: z.lazy(() => SortOrderSchema).optional(),
  rootName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountsSecondLvlCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountsSecondLvlAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountsSecondLvlMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountsSecondLvlMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountsSecondLvlSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountsSecondLvlScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountsSecondLvlScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountsSecondLvlScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountsSecondLvlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsSecondLvlScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsSecondLvlScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountsSecondLvlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  rootId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rootType: z.union([ z.lazy(() => EnumAccountTypesWithAggregatesFilterSchema),z.lazy(() => AccountTypesSchema) ]).optional(),
  rootName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountsThirdLvlWhereInputSchema: z.ZodType<Prisma.AccountsThirdLvlWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountsThirdLvlWhereInputSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsThirdLvlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsThirdLvlWhereInputSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rootId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  openingBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  runningBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  RootID: z.union([ z.lazy(() => AccountsSecondLvlRelationFilterSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsListRelationFilterSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsListRelationFilterSchema).optional()
}).strict();

export const AccountsThirdLvlOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountsThirdLvlOrderByWithRelationInput> = z.object({
  accountId: z.lazy(() => SortOrderSchema).optional(),
  accountName: z.lazy(() => SortOrderSchema).optional(),
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  RootID: z.lazy(() => AccountsSecondLvlOrderByWithRelationInputSchema).optional(),
  Dividends: z.lazy(() => DividendsOrderByRelationAggregateInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountsThirdLvlWhereUniqueInputSchema: z.ZodType<Prisma.AccountsThirdLvlWhereUniqueInput> = z.object({
  accountId: z.string().cuid()
})
.and(z.object({
  accountId: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AccountsThirdLvlWhereInputSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsThirdLvlWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsThirdLvlWhereInputSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema).array() ]).optional(),
  accountName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rootId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  openingBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  runningBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  RootID: z.union([ z.lazy(() => AccountsSecondLvlRelationFilterSchema),z.lazy(() => AccountsSecondLvlWhereInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsListRelationFilterSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsListRelationFilterSchema).optional()
}).strict());

export const AccountsThirdLvlOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountsThirdLvlOrderByWithAggregationInput> = z.object({
  accountId: z.lazy(() => SortOrderSchema).optional(),
  accountName: z.lazy(() => SortOrderSchema).optional(),
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountsThirdLvlCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountsThirdLvlAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountsThirdLvlMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountsThirdLvlMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountsThirdLvlSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountsThirdLvlScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountsThirdLvlScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsThirdLvlScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rootId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  openingBalance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  runningBalance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const DividendsWhereInputSchema: z.ZodType<Prisma.DividendsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DividendsWhereInputSchema),z.lazy(() => DividendsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DividendsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DividendsWhereInputSchema),z.lazy(() => DividendsWhereInputSchema).array() ]).optional(),
  dividendId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datePosted: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  members: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  account: z.union([ z.lazy(() => AccountsThirdLvlRelationFilterSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema) ]).optional(),
}).strict();

export const DividendsOrderByWithRelationInputSchema: z.ZodType<Prisma.DividendsOrderByWithRelationInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  datePosted: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => MembersOrderByWithRelationInputSchema).optional(),
  account: z.lazy(() => AccountsThirdLvlOrderByWithRelationInputSchema).optional()
}).strict();

export const DividendsWhereUniqueInputSchema: z.ZodType<Prisma.DividendsWhereUniqueInput> = z.object({
  dividendId: z.bigint()
})
.and(z.object({
  dividendId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => DividendsWhereInputSchema),z.lazy(() => DividendsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DividendsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DividendsWhereInputSchema),z.lazy(() => DividendsWhereInputSchema).array() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datePosted: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  members: z.union([ z.lazy(() => MembersRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  account: z.union([ z.lazy(() => AccountsThirdLvlRelationFilterSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema) ]).optional(),
}).strict());

export const DividendsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DividendsOrderByWithAggregationInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  datePosted: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DividendsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DividendsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DividendsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DividendsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DividendsSumOrderByAggregateInputSchema).optional()
}).strict();

export const DividendsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DividendsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DividendsScalarWhereWithAggregatesInputSchema),z.lazy(() => DividendsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DividendsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DividendsScalarWhereWithAggregatesInputSchema),z.lazy(() => DividendsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  dividendId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  datePosted: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SavingsTransactWhereInputSchema: z.ZodType<Prisma.SavingsTransactWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SavingsTransactWhereInputSchema),z.lazy(() => SavingsTransactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SavingsTransactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SavingsTransactWhereInputSchema),z.lazy(() => SavingsTransactWhereInputSchema).array() ]).optional(),
  transactionId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  savingsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumSavingsTransactionTypeFilterSchema),z.lazy(() => SavingsTransactionTypeSchema) ]).optional(),
}).strict();

export const SavingsTransactOrderByWithRelationInputSchema: z.ZodType<Prisma.SavingsTransactOrderByWithRelationInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  savingsId: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SavingsTransactWhereUniqueInputSchema: z.ZodType<Prisma.SavingsTransactWhereUniqueInput> = z.object({
  transactionId: z.bigint()
})
.and(z.object({
  transactionId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => SavingsTransactWhereInputSchema),z.lazy(() => SavingsTransactWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SavingsTransactWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SavingsTransactWhereInputSchema),z.lazy(() => SavingsTransactWhereInputSchema).array() ]).optional(),
  savingsId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumSavingsTransactionTypeFilterSchema),z.lazy(() => SavingsTransactionTypeSchema) ]).optional(),
}).strict());

export const SavingsTransactOrderByWithAggregationInputSchema: z.ZodType<Prisma.SavingsTransactOrderByWithAggregationInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  savingsId: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SavingsTransactCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SavingsTransactAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SavingsTransactMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SavingsTransactMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SavingsTransactSumOrderByAggregateInputSchema).optional()
}).strict();

export const SavingsTransactScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SavingsTransactScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SavingsTransactScalarWhereWithAggregatesInputSchema),z.lazy(() => SavingsTransactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SavingsTransactScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SavingsTransactScalarWhereWithAggregatesInputSchema),z.lazy(() => SavingsTransactScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  transactionId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  savingsId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumSavingsTransactionTypeWithAggregatesFilterSchema),z.lazy(() => SavingsTransactionTypeSchema) ]).optional(),
}).strict();

export const JournalEntriesWhereInputSchema: z.ZodType<Prisma.JournalEntriesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JournalEntriesWhereInputSchema),z.lazy(() => JournalEntriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntriesWhereInputSchema),z.lazy(() => JournalEntriesWhereInputSchema).array() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  entryDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  referenceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referenceType: z.union([ z.lazy(() => EnumReferenceTypeFilterSchema),z.lazy(() => ReferenceTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  memberId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => EnumJournalTypeFilterSchema),z.lazy(() => JournalTypeSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsListRelationFilterSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsListRelationFilterSchema).optional(),
  Members: z.union([ z.lazy(() => MembersNullableRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional().nullable(),
  InvoicePayments: z.lazy(() => InvoicePaymentsListRelationFilterSchema).optional()
}).strict();

export const JournalEntriesOrderByWithRelationInputSchema: z.ZodType<Prisma.JournalEntriesOrderByWithRelationInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional(),
  entryDate: z.lazy(() => SortOrderSchema).optional(),
  referenceName: z.lazy(() => SortOrderSchema).optional(),
  referenceType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  journalType: z.lazy(() => SortOrderSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsOrderByRelationAggregateInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsOrderByRelationAggregateInputSchema).optional(),
  Members: z.lazy(() => MembersOrderByWithRelationInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const JournalEntriesWhereUniqueInputSchema: z.ZodType<Prisma.JournalEntriesWhereUniqueInput> = z.object({
  entryId: z.bigint()
})
.and(z.object({
  entryId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => JournalEntriesWhereInputSchema),z.lazy(() => JournalEntriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntriesWhereInputSchema),z.lazy(() => JournalEntriesWhereInputSchema).array() ]).optional(),
  entryDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  referenceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referenceType: z.union([ z.lazy(() => EnumReferenceTypeFilterSchema),z.lazy(() => ReferenceTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  memberId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => EnumJournalTypeFilterSchema),z.lazy(() => JournalTypeSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsListRelationFilterSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsListRelationFilterSchema).optional(),
  Members: z.union([ z.lazy(() => MembersNullableRelationFilterSchema),z.lazy(() => MembersWhereInputSchema) ]).optional().nullable(),
  InvoicePayments: z.lazy(() => InvoicePaymentsListRelationFilterSchema).optional()
}).strict());

export const JournalEntriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.JournalEntriesOrderByWithAggregationInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional(),
  entryDate: z.lazy(() => SortOrderSchema).optional(),
  referenceName: z.lazy(() => SortOrderSchema).optional(),
  referenceType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  journalType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JournalEntriesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JournalEntriesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JournalEntriesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JournalEntriesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JournalEntriesSumOrderByAggregateInputSchema).optional()
}).strict();

export const JournalEntriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JournalEntriesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JournalEntriesScalarWhereWithAggregatesInputSchema),z.lazy(() => JournalEntriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntriesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntriesScalarWhereWithAggregatesInputSchema),z.lazy(() => JournalEntriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  entryDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  referenceName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  referenceType: z.union([ z.lazy(() => EnumReferenceTypeWithAggregatesFilterSchema),z.lazy(() => ReferenceTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  memberId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => EnumJournalTypeWithAggregatesFilterSchema),z.lazy(() => JournalTypeSchema) ]).optional(),
}).strict();

export const JournalItemsWhereInputSchema: z.ZodType<Prisma.JournalItemsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JournalItemsWhereInputSchema),z.lazy(() => JournalItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalItemsWhereInputSchema),z.lazy(() => JournalItemsWhereInputSchema).array() ]).optional(),
  journalItemsId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  debit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  credit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  JournalEntries: z.union([ z.lazy(() => JournalEntriesRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  Accounts: z.union([ z.lazy(() => AccountsThirdLvlRelationFilterSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema) ]).optional(),
}).strict();

export const JournalItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.JournalItemsOrderByWithRelationInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional(),
  JournalEntries: z.lazy(() => JournalEntriesOrderByWithRelationInputSchema).optional(),
  Accounts: z.lazy(() => AccountsThirdLvlOrderByWithRelationInputSchema).optional()
}).strict();

export const JournalItemsWhereUniqueInputSchema: z.ZodType<Prisma.JournalItemsWhereUniqueInput> = z.object({
  journalItemsId: z.bigint()
})
.and(z.object({
  journalItemsId: z.bigint().optional(),
  AND: z.union([ z.lazy(() => JournalItemsWhereInputSchema),z.lazy(() => JournalItemsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalItemsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalItemsWhereInputSchema),z.lazy(() => JournalItemsWhereInputSchema).array() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  debit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  credit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  JournalEntries: z.union([ z.lazy(() => JournalEntriesRelationFilterSchema),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  Accounts: z.union([ z.lazy(() => AccountsThirdLvlRelationFilterSchema),z.lazy(() => AccountsThirdLvlWhereInputSchema) ]).optional(),
}).strict());

export const JournalItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.JournalItemsOrderByWithAggregationInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JournalItemsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JournalItemsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JournalItemsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JournalItemsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JournalItemsSumOrderByAggregateInputSchema).optional()
}).strict();

export const JournalItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JournalItemsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JournalItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => JournalItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalItemsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalItemsScalarWhereWithAggregatesInputSchema),z.lazy(() => JournalItemsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  journalItemsId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  debit: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  credit: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const MembersCreateInputSchema: z.ZodType<Prisma.MembersCreateInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUncheckedCreateInputSchema: z.ZodType<Prisma.MembersUncheckedCreateInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsUncheckedCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUpdateInputSchema: z.ZodType<Prisma.MembersUpdateInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersUncheckedUpdateInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUncheckedUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersCreateManyInputSchema: z.ZodType<Prisma.MembersCreateManyInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MembersUpdateManyMutationInputSchema: z.ZodType<Prisma.MembersUpdateManyMutationInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateManyInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberFundsCreateInputSchema: z.ZodType<Prisma.MemberFundsCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional(),
  Member: z.lazy(() => MembersCreateNestedOneWithoutFundsInputSchema),
  Transactions: z.lazy(() => FundTransactionsCreateNestedManyWithoutMemberFundsInputSchema).optional()
}).strict();

export const MemberFundsUncheckedCreateInputSchema: z.ZodType<Prisma.MemberFundsUncheckedCreateInput> = z.object({
  fundId: z.number().int().optional(),
  memberId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional(),
  Transactions: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutMemberFundsInputSchema).optional()
}).strict();

export const MemberFundsUpdateInputSchema: z.ZodType<Prisma.MemberFundsUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Member: z.lazy(() => MembersUpdateOneRequiredWithoutFundsNestedInputSchema).optional(),
  Transactions: z.lazy(() => FundTransactionsUpdateManyWithoutMemberFundsNestedInputSchema).optional()
}).strict();

export const MemberFundsUncheckedUpdateInputSchema: z.ZodType<Prisma.MemberFundsUncheckedUpdateInput> = z.object({
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Transactions: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutMemberFundsNestedInputSchema).optional()
}).strict();

export const MemberFundsCreateManyInputSchema: z.ZodType<Prisma.MemberFundsCreateManyInput> = z.object({
  fundId: z.number().int().optional(),
  memberId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional()
}).strict();

export const MemberFundsUpdateManyMutationInputSchema: z.ZodType<Prisma.MemberFundsUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberFundsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MemberFundsUncheckedUpdateManyInput> = z.object({
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsCreateInputSchema: z.ZodType<Prisma.FundTransactionsCreateInput> = z.object({
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number(),
  JournalEntries: z.lazy(() => JournalEntriesCreateNestedOneWithoutMemberFundsTransactInputSchema).optional(),
  MemberFunds: z.lazy(() => MemberFundsCreateNestedOneWithoutTransactionsInputSchema)
}).strict();

export const FundTransactionsUncheckedCreateInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedCreateInput> = z.object({
  fundTransactId: z.number().int().optional(),
  fundId: z.number().int(),
  ledgerId: z.bigint().optional().nullable(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const FundTransactionsUpdateInputSchema: z.ZodType<Prisma.FundTransactionsUpdateInput> = z.object({
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntries: z.lazy(() => JournalEntriesUpdateOneWithoutMemberFundsTransactNestedInputSchema).optional(),
  MemberFunds: z.lazy(() => MemberFundsUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const FundTransactionsUncheckedUpdateInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ledgerId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsCreateManyInputSchema: z.ZodType<Prisma.FundTransactionsCreateManyInput> = z.object({
  fundTransactId: z.number().int().optional(),
  fundId: z.number().int(),
  ledgerId: z.bigint().optional().nullable(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const FundTransactionsUpdateManyMutationInputSchema: z.ZodType<Prisma.FundTransactionsUpdateManyMutationInput> = z.object({
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateManyInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ledgerId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceCreateInputSchema: z.ZodType<Prisma.InvoiceCreateInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutInvoiceInputSchema),
  InvoiceItems: z.lazy(() => InvoiceItemsCreateNestedManyWithoutInvoiceInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceUncheckedCreateInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateInput> = z.object({
  invoiceId: z.bigint().optional(),
  memberId: z.string(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceUpdateInputSchema: z.ZodType<Prisma.InvoiceUpdateInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Members: z.lazy(() => MembersUpdateOneRequiredWithoutInvoiceNestedInputSchema).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsUpdateManyWithoutInvoiceNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceCreateManyInputSchema: z.ZodType<Prisma.InvoiceCreateManyInput> = z.object({
  invoiceId: z.bigint().optional(),
  memberId: z.string(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable()
}).strict();

export const InvoiceUpdateManyMutationInputSchema: z.ZodType<Prisma.InvoiceUpdateManyMutationInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvoiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvoiceItemsCreateInputSchema: z.ZodType<Prisma.InvoiceItemsCreateInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int(),
  Item: z.lazy(() => ItemsCreateNestedOneWithoutInvoiceItemsInputSchema),
  Invoice: z.lazy(() => InvoiceCreateNestedOneWithoutInvoiceItemsInputSchema)
}).strict();

export const InvoiceItemsUncheckedCreateInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedCreateInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  invoiceId: z.bigint(),
  itemID: z.string(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoiceItemsUpdateInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Item: z.lazy(() => ItemsUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema).optional(),
  Invoice: z.lazy(() => InvoiceUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema).optional()
}).strict();

export const InvoiceItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  itemID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsCreateManyInputSchema: z.ZodType<Prisma.InvoiceItemsCreateManyInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  invoiceId: z.bigint(),
  itemID: z.string(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoiceItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyMutationInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateManyInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  itemID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsCreateInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateInput> = z.object({
  paymentId: z.bigint().optional(),
  orNo: z.string(),
  paymentReceived: z.number(),
  paymentDate: z.coerce.date().optional(),
  JournalEntry: z.lazy(() => JournalEntriesCreateNestedOneWithoutInvoicePaymentsInputSchema),
  Invoice: z.lazy(() => InvoiceCreateNestedOneWithoutInvoicePaymentsInputSchema)
}).strict();

export const InvoicePaymentsUncheckedCreateInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedCreateInput> = z.object({
  paymentId: z.bigint().optional(),
  invoiceId: z.bigint(),
  orNo: z.string(),
  paymentReceived: z.number(),
  journalRef: z.bigint(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const InvoicePaymentsUpdateInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntry: z.lazy(() => JournalEntriesUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema).optional(),
  Invoice: z.lazy(() => InvoiceUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema).optional()
}).strict();

export const InvoicePaymentsUncheckedUpdateInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalRef: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsCreateManyInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyInput> = z.object({
  paymentId: z.bigint().optional(),
  invoiceId: z.bigint(),
  orNo: z.string(),
  paymentReceived: z.number(),
  journalRef: z.bigint(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const InvoicePaymentsUpdateManyMutationInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyMutationInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateManyInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalRef: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItemsCreateInputSchema: z.ZodType<Prisma.ItemsCreateInput> = z.object({
  itemID: z.string().cuid().optional(),
  itemName: z.string(),
  itemDescription: z.string().optional().nullable(),
  itemType: z.lazy(() => ItemTypeSchema),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stocks: z.number().int().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemsUncheckedCreateInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateInput> = z.object({
  itemID: z.string().cuid().optional(),
  itemName: z.string(),
  itemDescription: z.string().optional().nullable(),
  itemType: z.lazy(() => ItemTypeSchema),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stocks: z.number().int().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedCreateNestedManyWithoutItemInputSchema).optional()
}).strict();

export const ItemsUpdateInputSchema: z.ZodType<Prisma.ItemsUpdateInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutItemNestedInputSchema).optional()
}).strict();

export const ItemsCreateManyInputSchema: z.ZodType<Prisma.ItemsCreateManyInput> = z.object({
  itemID: z.string().cuid().optional(),
  itemName: z.string(),
  itemDescription: z.string().optional().nullable(),
  itemType: z.lazy(() => ItemTypeSchema),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stocks: z.number().int().optional().nullable()
}).strict();

export const ItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.ItemsUpdateManyMutationInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateManyInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountsSecondLvlCreateInputSchema: z.ZodType<Prisma.AccountsSecondLvlCreateInput> = z.object({
  rootType: z.lazy(() => AccountTypesSchema),
  rootName: z.string(),
  createdAt: z.coerce.date().optional(),
  Children: z.lazy(() => AccountsThirdLvlCreateNestedManyWithoutRootIDInputSchema).optional()
}).strict();

export const AccountsSecondLvlUncheckedCreateInputSchema: z.ZodType<Prisma.AccountsSecondLvlUncheckedCreateInput> = z.object({
  rootId: z.number().int().optional(),
  rootType: z.lazy(() => AccountTypesSchema),
  rootName: z.string(),
  createdAt: z.coerce.date().optional(),
  Children: z.lazy(() => AccountsThirdLvlUncheckedCreateNestedManyWithoutRootIDInputSchema).optional()
}).strict();

export const AccountsSecondLvlUpdateInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateInput> = z.object({
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Children: z.lazy(() => AccountsThirdLvlUpdateManyWithoutRootIDNestedInputSchema).optional()
}).strict();

export const AccountsSecondLvlUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountsSecondLvlUncheckedUpdateInput> = z.object({
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Children: z.lazy(() => AccountsThirdLvlUncheckedUpdateManyWithoutRootIDNestedInputSchema).optional()
}).strict();

export const AccountsSecondLvlCreateManyInputSchema: z.ZodType<Prisma.AccountsSecondLvlCreateManyInput> = z.object({
  rootId: z.number().int().optional(),
  rootType: z.lazy(() => AccountTypesSchema),
  rootName: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AccountsSecondLvlUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateManyMutationInput> = z.object({
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountsSecondLvlUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountsSecondLvlUncheckedUpdateManyInput> = z.object({
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlCreateInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  RootID: z.lazy(() => AccountsSecondLvlCreateNestedOneWithoutChildrenInputSchema),
  Dividends: z.lazy(() => DividendsCreateNestedManyWithoutAccountInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedCreateInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedCreateInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  rootId: z.number().int(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  Dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlUpdateInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  RootID: z.lazy(() => AccountsSecondLvlUpdateOneRequiredWithoutChildrenNestedInputSchema).optional(),
  Dividends: z.lazy(() => DividendsUpdateManyWithoutAccountNestedInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateManyInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateManyInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  rootId: z.number().int(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional()
}).strict();

export const AccountsThirdLvlUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateManyMutationInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateManyInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsCreateInputSchema: z.ZodType<Prisma.DividendsCreateInput> = z.object({
  dividendId: z.bigint().optional(),
  datePosted: z.coerce.date().optional(),
  amount: z.number(),
  members: z.lazy(() => MembersCreateNestedOneWithoutDividendsInputSchema),
  account: z.lazy(() => AccountsThirdLvlCreateNestedOneWithoutDividendsInputSchema)
}).strict();

export const DividendsUncheckedCreateInputSchema: z.ZodType<Prisma.DividendsUncheckedCreateInput> = z.object({
  dividendId: z.bigint().optional(),
  memberId: z.string(),
  accountId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const DividendsUpdateInputSchema: z.ZodType<Prisma.DividendsUpdateInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembersUpdateOneRequiredWithoutDividendsNestedInputSchema).optional(),
  account: z.lazy(() => AccountsThirdLvlUpdateOneRequiredWithoutDividendsNestedInputSchema).optional()
}).strict();

export const DividendsUncheckedUpdateInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsCreateManyInputSchema: z.ZodType<Prisma.DividendsCreateManyInput> = z.object({
  dividendId: z.bigint().optional(),
  memberId: z.string(),
  accountId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const DividendsUpdateManyMutationInputSchema: z.ZodType<Prisma.DividendsUpdateManyMutationInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateManyInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SavingsTransactCreateInputSchema: z.ZodType<Prisma.SavingsTransactCreateInput> = z.object({
  transactionId: z.bigint().optional(),
  savingsId: z.string(),
  transactionType: z.lazy(() => SavingsTransactionTypeSchema)
}).strict();

export const SavingsTransactUncheckedCreateInputSchema: z.ZodType<Prisma.SavingsTransactUncheckedCreateInput> = z.object({
  transactionId: z.bigint().optional(),
  savingsId: z.string(),
  transactionType: z.lazy(() => SavingsTransactionTypeSchema)
}).strict();

export const SavingsTransactUpdateInputSchema: z.ZodType<Prisma.SavingsTransactUpdateInput> = z.object({
  transactionId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  savingsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => EnumSavingsTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SavingsTransactUncheckedUpdateInputSchema: z.ZodType<Prisma.SavingsTransactUncheckedUpdateInput> = z.object({
  transactionId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  savingsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => EnumSavingsTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SavingsTransactCreateManyInputSchema: z.ZodType<Prisma.SavingsTransactCreateManyInput> = z.object({
  transactionId: z.bigint().optional(),
  savingsId: z.string(),
  transactionType: z.lazy(() => SavingsTransactionTypeSchema)
}).strict();

export const SavingsTransactUpdateManyMutationInputSchema: z.ZodType<Prisma.SavingsTransactUpdateManyMutationInput> = z.object({
  transactionId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  savingsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => EnumSavingsTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SavingsTransactUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SavingsTransactUncheckedUpdateManyInput> = z.object({
  transactionId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  savingsId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => EnumSavingsTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalEntriesCreateInputSchema: z.ZodType<Prisma.JournalEntriesCreateInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutJournalsInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedCreateInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  memberId: z.string().optional().nullable(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesUpdateInputSchema: z.ZodType<Prisma.JournalEntriesUpdateInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  Members: z.lazy(() => MembersUpdateOneWithoutJournalsNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesCreateManyInputSchema: z.ZodType<Prisma.JournalEntriesCreateManyInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  memberId: z.string().optional().nullable(),
  journalType: z.lazy(() => JournalTypeSchema)
}).strict();

export const JournalEntriesUpdateManyMutationInputSchema: z.ZodType<Prisma.JournalEntriesUpdateManyMutationInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalEntriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateManyInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsCreateInputSchema: z.ZodType<Prisma.JournalItemsCreateInput> = z.object({
  journalItemsId: z.bigint().optional(),
  debit: z.number(),
  credit: z.number(),
  JournalEntries: z.lazy(() => JournalEntriesCreateNestedOneWithoutJournalItemsInputSchema),
  Accounts: z.lazy(() => AccountsThirdLvlCreateNestedOneWithoutJournalItemsInputSchema)
}).strict();

export const JournalItemsUncheckedCreateInputSchema: z.ZodType<Prisma.JournalItemsUncheckedCreateInput> = z.object({
  journalItemsId: z.bigint().optional(),
  entryId: z.bigint(),
  accountId: z.string(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const JournalItemsUpdateInputSchema: z.ZodType<Prisma.JournalItemsUpdateInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntries: z.lazy(() => JournalEntriesUpdateOneRequiredWithoutJournalItemsNestedInputSchema).optional(),
  Accounts: z.lazy(() => AccountsThirdLvlUpdateOneRequiredWithoutJournalItemsNestedInputSchema).optional()
}).strict();

export const JournalItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsCreateManyInputSchema: z.ZodType<Prisma.JournalItemsCreateManyInput> = z.object({
  journalItemsId: z.bigint().optional(),
  entryId: z.bigint(),
  accountId: z.string(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const JournalItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.JournalItemsUpdateManyMutationInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateManyInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const MemberFundsNullableRelationFilterSchema: z.ZodType<Prisma.MemberFundsNullableRelationFilter> = z.object({
  is: z.lazy(() => MemberFundsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MemberFundsWhereInputSchema).optional().nullable()
}).strict();

export const DividendsListRelationFilterSchema: z.ZodType<Prisma.DividendsListRelationFilter> = z.object({
  every: z.lazy(() => DividendsWhereInputSchema).optional(),
  some: z.lazy(() => DividendsWhereInputSchema).optional(),
  none: z.lazy(() => DividendsWhereInputSchema).optional()
}).strict();

export const InvoiceListRelationFilterSchema: z.ZodType<Prisma.InvoiceListRelationFilter> = z.object({
  every: z.lazy(() => InvoiceWhereInputSchema).optional(),
  some: z.lazy(() => InvoiceWhereInputSchema).optional(),
  none: z.lazy(() => InvoiceWhereInputSchema).optional()
}).strict();

export const JournalEntriesListRelationFilterSchema: z.ZodType<Prisma.JournalEntriesListRelationFilter> = z.object({
  every: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  some: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  none: z.lazy(() => JournalEntriesWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DividendsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DividendsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvoiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JournalEntriesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembersCountOrderByAggregateInputSchema: z.ZodType<Prisma.MembersCountOrderByAggregateInput> = z.object({
  memberId: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  idNumber: z.lazy(() => SortOrderSchema).optional(),
  tin: z.lazy(() => SortOrderSchema).optional(),
  dateAccepted: z.lazy(() => SortOrderSchema).optional(),
  arb: z.lazy(() => SortOrderSchema).optional(),
  bodResNo: z.lazy(() => SortOrderSchema).optional(),
  membershipType: z.lazy(() => SortOrderSchema).optional(),
  civilStatus: z.lazy(() => SortOrderSchema).optional(),
  highestEdAttain: z.lazy(() => SortOrderSchema).optional(),
  numOfDependents: z.lazy(() => SortOrderSchema).optional(),
  religion: z.lazy(() => SortOrderSchema).optional(),
  annualIncom: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  contactNo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembersAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MembersAvgOrderByAggregateInput> = z.object({
  idNumber: z.lazy(() => SortOrderSchema).optional(),
  numOfDependents: z.lazy(() => SortOrderSchema).optional(),
  annualIncom: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MembersMaxOrderByAggregateInput> = z.object({
  memberId: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  idNumber: z.lazy(() => SortOrderSchema).optional(),
  tin: z.lazy(() => SortOrderSchema).optional(),
  dateAccepted: z.lazy(() => SortOrderSchema).optional(),
  arb: z.lazy(() => SortOrderSchema).optional(),
  bodResNo: z.lazy(() => SortOrderSchema).optional(),
  membershipType: z.lazy(() => SortOrderSchema).optional(),
  civilStatus: z.lazy(() => SortOrderSchema).optional(),
  highestEdAttain: z.lazy(() => SortOrderSchema).optional(),
  numOfDependents: z.lazy(() => SortOrderSchema).optional(),
  religion: z.lazy(() => SortOrderSchema).optional(),
  annualIncom: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  contactNo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembersMinOrderByAggregateInputSchema: z.ZodType<Prisma.MembersMinOrderByAggregateInput> = z.object({
  memberId: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  idNumber: z.lazy(() => SortOrderSchema).optional(),
  tin: z.lazy(() => SortOrderSchema).optional(),
  dateAccepted: z.lazy(() => SortOrderSchema).optional(),
  arb: z.lazy(() => SortOrderSchema).optional(),
  bodResNo: z.lazy(() => SortOrderSchema).optional(),
  membershipType: z.lazy(() => SortOrderSchema).optional(),
  civilStatus: z.lazy(() => SortOrderSchema).optional(),
  highestEdAttain: z.lazy(() => SortOrderSchema).optional(),
  numOfDependents: z.lazy(() => SortOrderSchema).optional(),
  religion: z.lazy(() => SortOrderSchema).optional(),
  annualIncom: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  contactNo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MembersSumOrderByAggregateInputSchema: z.ZodType<Prisma.MembersSumOrderByAggregateInput> = z.object({
  idNumber: z.lazy(() => SortOrderSchema).optional(),
  numOfDependents: z.lazy(() => SortOrderSchema).optional(),
  annualIncom: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const MembersRelationFilterSchema: z.ZodType<Prisma.MembersRelationFilter> = z.object({
  is: z.lazy(() => MembersWhereInputSchema).optional(),
  isNot: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export const FundTransactionsListRelationFilterSchema: z.ZodType<Prisma.FundTransactionsListRelationFilter> = z.object({
  every: z.lazy(() => FundTransactionsWhereInputSchema).optional(),
  some: z.lazy(() => FundTransactionsWhereInputSchema).optional(),
  none: z.lazy(() => FundTransactionsWhereInputSchema).optional()
}).strict();

export const FundTransactionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FundTransactionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemberFundsCountOrderByAggregateInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MemberFundsAvgOrderByAggregateInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MemberFundsMaxOrderByAggregateInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsMinOrderByAggregateInputSchema: z.ZodType<Prisma.MemberFundsMinOrderByAggregateInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsSumOrderByAggregateInputSchema: z.ZodType<Prisma.MemberFundsSumOrderByAggregateInput> = z.object({
  fundId: z.lazy(() => SortOrderSchema).optional(),
  savingsBal: z.lazy(() => SortOrderSchema).optional(),
  shareCapBal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BigIntNullableFilterSchema: z.ZodType<Prisma.BigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumFundTypeFilterSchema: z.ZodType<Prisma.EnumFundTypeFilter> = z.object({
  equals: z.lazy(() => FundTypeSchema).optional(),
  in: z.lazy(() => FundTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => NestedEnumFundTypeFilterSchema) ]).optional(),
}).strict();

export const EnumFundTransactionsTypeFilterSchema: z.ZodType<Prisma.EnumFundTransactionsTypeFilter> = z.object({
  equals: z.lazy(() => FundTransactionsTypeSchema).optional(),
  in: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema) ]).optional(),
}).strict();

export const JournalEntriesNullableRelationFilterSchema: z.ZodType<Prisma.JournalEntriesNullableRelationFilter> = z.object({
  is: z.lazy(() => JournalEntriesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => JournalEntriesWhereInputSchema).optional().nullable()
}).strict();

export const MemberFundsRelationFilterSchema: z.ZodType<Prisma.MemberFundsRelationFilter> = z.object({
  is: z.lazy(() => MemberFundsWhereInputSchema).optional(),
  isNot: z.lazy(() => MemberFundsWhereInputSchema).optional()
}).strict();

export const FundTransactionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FundTransactionsCountOrderByAggregateInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.lazy(() => SortOrderSchema).optional(),
  fundType: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundTransactionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FundTransactionsAvgOrderByAggregateInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundTransactionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FundTransactionsMaxOrderByAggregateInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.lazy(() => SortOrderSchema).optional(),
  fundType: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundTransactionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FundTransactionsMinOrderByAggregateInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.lazy(() => SortOrderSchema).optional(),
  fundType: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FundTransactionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FundTransactionsSumOrderByAggregateInput> = z.object({
  fundTransactId: z.lazy(() => SortOrderSchema).optional(),
  fundId: z.lazy(() => SortOrderSchema).optional(),
  ledgerId: z.lazy(() => SortOrderSchema).optional(),
  postedBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const EnumFundTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFundTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FundTypeSchema).optional(),
  in: z.lazy(() => FundTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => NestedEnumFundTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFundTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFundTypeFilterSchema).optional()
}).strict();

export const EnumFundTransactionsTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFundTransactionsTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FundTransactionsTypeSchema).optional(),
  in: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => NestedEnumFundTransactionsTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema).optional()
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const InvoiceItemsListRelationFilterSchema: z.ZodType<Prisma.InvoiceItemsListRelationFilter> = z.object({
  every: z.lazy(() => InvoiceItemsWhereInputSchema).optional(),
  some: z.lazy(() => InvoiceItemsWhereInputSchema).optional(),
  none: z.lazy(() => InvoiceItemsWhereInputSchema).optional()
}).strict();

export const InvoicePaymentsListRelationFilterSchema: z.ZodType<Prisma.InvoicePaymentsListRelationFilter> = z.object({
  every: z.lazy(() => InvoicePaymentsWhereInputSchema).optional(),
  some: z.lazy(() => InvoicePaymentsWhereInputSchema).optional(),
  none: z.lazy(() => InvoicePaymentsWhereInputSchema).optional()
}).strict();

export const InvoiceItemsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicePaymentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceCountOrderByAggregateInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  dateOfInvoice: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceAvgOrderByAggregateInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceMaxOrderByAggregateInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  dateOfInvoice: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceMinOrderByAggregateInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  dateOfInvoice: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceSumOrderByAggregateInput> = z.object({
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  baseGrandTotal: z.lazy(() => SortOrderSchema).optional(),
  outStandingAmt: z.lazy(() => SortOrderSchema).optional(),
  journalId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const ItemsRelationFilterSchema: z.ZodType<Prisma.ItemsRelationFilter> = z.object({
  is: z.lazy(() => ItemsWhereInputSchema).optional(),
  isNot: z.lazy(() => ItemsWhereInputSchema).optional()
}).strict();

export const InvoiceRelationFilterSchema: z.ZodType<Prisma.InvoiceRelationFilter> = z.object({
  is: z.lazy(() => InvoiceWhereInputSchema).optional(),
  isNot: z.lazy(() => InvoiceWhereInputSchema).optional()
}).strict();

export const InvoiceItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsCountOrderByAggregateInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemID: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceItemsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsAvgOrderByAggregateInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsMaxOrderByAggregateInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemID: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsMinOrderByAggregateInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  itemID: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoiceItemsSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoiceItemsSumOrderByAggregateInput> = z.object({
  invoiceItemId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  rate: z.lazy(() => SortOrderSchema).optional(),
  trade: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesRelationFilterSchema: z.ZodType<Prisma.JournalEntriesRelationFilter> = z.object({
  is: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  isNot: z.lazy(() => JournalEntriesWhereInputSchema).optional()
}).strict();

export const InvoicePaymentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsCountOrderByAggregateInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  orNo: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional(),
  paymentDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicePaymentsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsAvgOrderByAggregateInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicePaymentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsMaxOrderByAggregateInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  orNo: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional(),
  paymentDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicePaymentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsMinOrderByAggregateInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  orNo: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional(),
  paymentDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvoicePaymentsSumOrderByAggregateInputSchema: z.ZodType<Prisma.InvoicePaymentsSumOrderByAggregateInput> = z.object({
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.lazy(() => SortOrderSchema).optional(),
  paymentReceived: z.lazy(() => SortOrderSchema).optional(),
  journalRef: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumItemTypeFilterSchema: z.ZodType<Prisma.EnumItemTypeFilter> = z.object({
  equals: z.lazy(() => ItemTypeSchema).optional(),
  in: z.lazy(() => ItemTypeSchema).array().optional(),
  notIn: z.lazy(() => ItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => NestedEnumItemTypeFilterSchema) ]).optional(),
}).strict();

export const ItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsCountOrderByAggregateInput> = z.object({
  itemID: z.lazy(() => SortOrderSchema).optional(),
  itemName: z.lazy(() => SortOrderSchema).optional(),
  itemDescription: z.lazy(() => SortOrderSchema).optional(),
  itemType: z.lazy(() => SortOrderSchema).optional(),
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsAvgOrderByAggregateInput> = z.object({
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMaxOrderByAggregateInput> = z.object({
  itemID: z.lazy(() => SortOrderSchema).optional(),
  itemName: z.lazy(() => SortOrderSchema).optional(),
  itemDescription: z.lazy(() => SortOrderSchema).optional(),
  itemType: z.lazy(() => SortOrderSchema).optional(),
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsMinOrderByAggregateInput> = z.object({
  itemID: z.lazy(() => SortOrderSchema).optional(),
  itemName: z.lazy(() => SortOrderSchema).optional(),
  itemDescription: z.lazy(() => SortOrderSchema).optional(),
  itemType: z.lazy(() => SortOrderSchema).optional(),
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItemsSumOrderByAggregateInputSchema: z.ZodType<Prisma.ItemsSumOrderByAggregateInput> = z.object({
  sellingPrice: z.lazy(() => SortOrderSchema).optional(),
  costPrice: z.lazy(() => SortOrderSchema).optional(),
  stocks: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumItemTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ItemTypeSchema).optional(),
  in: z.lazy(() => ItemTypeSchema).array().optional(),
  notIn: z.lazy(() => ItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => NestedEnumItemTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumItemTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumItemTypeFilterSchema).optional()
}).strict();

export const EnumAccountTypesFilterSchema: z.ZodType<Prisma.EnumAccountTypesFilter> = z.object({
  equals: z.lazy(() => AccountTypesSchema).optional(),
  in: z.lazy(() => AccountTypesSchema).array().optional(),
  notIn: z.lazy(() => AccountTypesSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => NestedEnumAccountTypesFilterSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlListRelationFilterSchema: z.ZodType<Prisma.AccountsThirdLvlListRelationFilter> = z.object({
  every: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional(),
  some: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional(),
  none: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional()
}).strict();

export const AccountsThirdLvlOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsSecondLvlCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsSecondLvlCountOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  rootType: z.lazy(() => SortOrderSchema).optional(),
  rootName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsSecondLvlAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsSecondLvlAvgOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsSecondLvlMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsSecondLvlMaxOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  rootType: z.lazy(() => SortOrderSchema).optional(),
  rootName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsSecondLvlMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsSecondLvlMinOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  rootType: z.lazy(() => SortOrderSchema).optional(),
  rootName: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsSecondLvlSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsSecondLvlSumOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAccountTypesWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccountTypesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountTypesSchema).optional(),
  in: z.lazy(() => AccountTypesSchema).array().optional(),
  notIn: z.lazy(() => AccountTypesSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => NestedEnumAccountTypesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountTypesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountTypesFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AccountsSecondLvlRelationFilterSchema: z.ZodType<Prisma.AccountsSecondLvlRelationFilter> = z.object({
  is: z.lazy(() => AccountsSecondLvlWhereInputSchema).optional(),
  isNot: z.lazy(() => AccountsSecondLvlWhereInputSchema).optional()
}).strict();

export const JournalItemsListRelationFilterSchema: z.ZodType<Prisma.JournalItemsListRelationFilter> = z.object({
  every: z.lazy(() => JournalItemsWhereInputSchema).optional(),
  some: z.lazy(() => JournalItemsWhereInputSchema).optional(),
  none: z.lazy(() => JournalItemsWhereInputSchema).optional()
}).strict();

export const JournalItemsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JournalItemsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsThirdLvlCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlCountOrderByAggregateInput> = z.object({
  accountId: z.lazy(() => SortOrderSchema).optional(),
  accountName: z.lazy(() => SortOrderSchema).optional(),
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsThirdLvlAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlAvgOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsThirdLvlMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlMaxOrderByAggregateInput> = z.object({
  accountId: z.lazy(() => SortOrderSchema).optional(),
  accountName: z.lazy(() => SortOrderSchema).optional(),
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsThirdLvlMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlMinOrderByAggregateInput> = z.object({
  accountId: z.lazy(() => SortOrderSchema).optional(),
  accountName: z.lazy(() => SortOrderSchema).optional(),
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountsThirdLvlSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountsThirdLvlSumOrderByAggregateInput> = z.object({
  rootId: z.lazy(() => SortOrderSchema).optional(),
  openingBalance: z.lazy(() => SortOrderSchema).optional(),
  runningBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const AccountsThirdLvlRelationFilterSchema: z.ZodType<Prisma.AccountsThirdLvlRelationFilter> = z.object({
  is: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional(),
  isNot: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional()
}).strict();

export const DividendsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DividendsCountOrderByAggregateInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  datePosted: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DividendsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DividendsAvgOrderByAggregateInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DividendsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DividendsMaxOrderByAggregateInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  datePosted: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DividendsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DividendsMinOrderByAggregateInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  datePosted: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DividendsSumOrderByAggregateInputSchema: z.ZodType<Prisma.DividendsSumOrderByAggregateInput> = z.object({
  dividendId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSavingsTransactionTypeFilterSchema: z.ZodType<Prisma.EnumSavingsTransactionTypeFilter> = z.object({
  equals: z.lazy(() => SavingsTransactionTypeSchema).optional(),
  in: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const SavingsTransactCountOrderByAggregateInputSchema: z.ZodType<Prisma.SavingsTransactCountOrderByAggregateInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  savingsId: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SavingsTransactAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SavingsTransactAvgOrderByAggregateInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SavingsTransactMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SavingsTransactMaxOrderByAggregateInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  savingsId: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SavingsTransactMinOrderByAggregateInputSchema: z.ZodType<Prisma.SavingsTransactMinOrderByAggregateInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  savingsId: z.lazy(() => SortOrderSchema).optional(),
  transactionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SavingsTransactSumOrderByAggregateInputSchema: z.ZodType<Prisma.SavingsTransactSumOrderByAggregateInput> = z.object({
  transactionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSavingsTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSavingsTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SavingsTransactionTypeSchema).optional(),
  in: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => NestedEnumSavingsTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema).optional()
}).strict();

export const EnumReferenceTypeFilterSchema: z.ZodType<Prisma.EnumReferenceTypeFilter> = z.object({
  equals: z.lazy(() => ReferenceTypeSchema).optional(),
  in: z.lazy(() => ReferenceTypeSchema).array().optional(),
  notIn: z.lazy(() => ReferenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => NestedEnumReferenceTypeFilterSchema) ]).optional(),
}).strict();

export const EnumJournalTypeFilterSchema: z.ZodType<Prisma.EnumJournalTypeFilter> = z.object({
  equals: z.lazy(() => JournalTypeSchema).optional(),
  in: z.lazy(() => JournalTypeSchema).array().optional(),
  notIn: z.lazy(() => JournalTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => NestedEnumJournalTypeFilterSchema) ]).optional(),
}).strict();

export const MembersNullableRelationFilterSchema: z.ZodType<Prisma.MembersNullableRelationFilter> = z.object({
  is: z.lazy(() => MembersWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MembersWhereInputSchema).optional().nullable()
}).strict();

export const JournalEntriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntriesCountOrderByAggregateInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional(),
  entryDate: z.lazy(() => SortOrderSchema).optional(),
  referenceName: z.lazy(() => SortOrderSchema).optional(),
  referenceType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  journalType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntriesAvgOrderByAggregateInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntriesMaxOrderByAggregateInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional(),
  entryDate: z.lazy(() => SortOrderSchema).optional(),
  referenceName: z.lazy(() => SortOrderSchema).optional(),
  referenceType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  journalType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntriesMinOrderByAggregateInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional(),
  entryDate: z.lazy(() => SortOrderSchema).optional(),
  referenceName: z.lazy(() => SortOrderSchema).optional(),
  referenceType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  memberId: z.lazy(() => SortOrderSchema).optional(),
  journalType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalEntriesSumOrderByAggregateInputSchema: z.ZodType<Prisma.JournalEntriesSumOrderByAggregateInput> = z.object({
  entryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReferenceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReferenceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReferenceTypeSchema).optional(),
  in: z.lazy(() => ReferenceTypeSchema).array().optional(),
  notIn: z.lazy(() => ReferenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => NestedEnumReferenceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReferenceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReferenceTypeFilterSchema).optional()
}).strict();

export const EnumJournalTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumJournalTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JournalTypeSchema).optional(),
  in: z.lazy(() => JournalTypeSchema).array().optional(),
  notIn: z.lazy(() => JournalTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => NestedEnumJournalTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJournalTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJournalTypeFilterSchema).optional()
}).strict();

export const JournalItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.JournalItemsCountOrderByAggregateInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalItemsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JournalItemsAvgOrderByAggregateInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JournalItemsMaxOrderByAggregateInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.JournalItemsMinOrderByAggregateInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JournalItemsSumOrderByAggregateInputSchema: z.ZodType<Prisma.JournalItemsSumOrderByAggregateInput> = z.object({
  journalItemsId: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  debit: z.lazy(() => SortOrderSchema).optional(),
  credit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberFundsCreateNestedOneWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsCreateNestedOneWithoutMemberInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutMemberInputSchema).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional()
}).strict();

export const DividendsCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.DividendsCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsCreateWithoutMembersInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoiceCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceCreateWithoutMembersInputSchema).array(),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema),z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema).array(),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntriesCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberFundsUncheckedCreateNestedOneWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUncheckedCreateNestedOneWithoutMemberInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutMemberInputSchema).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional()
}).strict();

export const DividendsUncheckedCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUncheckedCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsCreateWithoutMembersInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoiceUncheckedCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceCreateWithoutMembersInputSchema).array(),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema),z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesUncheckedCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateNestedManyWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema).array(),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntriesCreateManyMembersInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const MemberFundsUpdateOneWithoutMemberNestedInputSchema: z.ZodType<Prisma.MemberFundsUpdateOneWithoutMemberNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutMemberInputSchema).optional(),
  upsert: z.lazy(() => MemberFundsUpsertWithoutMemberInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberFundsUpdateToOneWithWhereWithoutMemberInputSchema),z.lazy(() => MemberFundsUpdateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutMemberInputSchema) ]).optional(),
}).strict();

export const DividendsUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.DividendsUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsCreateWithoutMembersInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DividendsUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => DividendsUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DividendsUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => DividendsUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DividendsUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => DividendsUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoiceUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceCreateWithoutMembersInputSchema).array(),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema),z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => InvoiceUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema),z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.JournalEntriesUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema).array(),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalEntriesUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntriesCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalEntriesUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalEntriesScalarWhereInputSchema),z.lazy(() => JournalEntriesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberFundsUncheckedUpdateOneWithoutMemberNestedInputSchema: z.ZodType<Prisma.MemberFundsUncheckedUpdateOneWithoutMemberNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutMemberInputSchema).optional(),
  upsert: z.lazy(() => MemberFundsUpsertWithoutMemberInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MemberFundsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberFundsUpdateToOneWithWhereWithoutMemberInputSchema),z.lazy(() => MemberFundsUpdateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutMemberInputSchema) ]).optional(),
}).strict();

export const DividendsUncheckedUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsCreateWithoutMembersInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DividendsUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => DividendsUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DividendsUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => DividendsUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DividendsUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => DividendsUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoiceUncheckedUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceCreateWithoutMembersInputSchema).array(),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema),z.lazy(() => InvoiceCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => InvoiceUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceWhereUniqueInputSchema),z.lazy(() => InvoiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => InvoiceUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => InvoiceUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema),z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesUncheckedUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateManyWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema).array(),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema),z.lazy(() => JournalEntriesCreateOrConnectWithoutMembersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalEntriesUpsertWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpsertWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalEntriesCreateManyMembersInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalEntriesWhereUniqueInputSchema),z.lazy(() => JournalEntriesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithWhereUniqueWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpdateWithWhereUniqueWithoutMembersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalEntriesUpdateManyWithWhereWithoutMembersInputSchema),z.lazy(() => JournalEntriesUpdateManyWithWhereWithoutMembersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalEntriesScalarWhereInputSchema),z.lazy(() => JournalEntriesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembersCreateNestedOneWithoutFundsInputSchema: z.ZodType<Prisma.MembersCreateNestedOneWithoutFundsInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutFundsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutFundsInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional()
}).strict();

export const FundTransactionsCreateNestedManyWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsCreateNestedManyWithoutMemberFundsInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyMemberFundsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundTransactionsUncheckedCreateNestedManyWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedCreateNestedManyWithoutMemberFundsInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyMemberFundsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MembersUpdateOneRequiredWithoutFundsNestedInputSchema: z.ZodType<Prisma.MembersUpdateOneRequiredWithoutFundsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutFundsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutFundsInputSchema).optional(),
  upsert: z.lazy(() => MembersUpsertWithoutFundsInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MembersUpdateToOneWithWhereWithoutFundsInputSchema),z.lazy(() => MembersUpdateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutFundsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsUpdateManyWithoutMemberFundsNestedInputSchema: z.ZodType<Prisma.FundTransactionsUpdateManyWithoutMemberFundsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyMemberFundsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutMemberFundsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FundTransactionsUncheckedUpdateManyWithoutMemberFundsNestedInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateManyWithoutMemberFundsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyMemberFundsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutMemberFundsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesCreateNestedOneWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesCreateNestedOneWithoutMemberFundsTransactInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMemberFundsTransactInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutMemberFundsTransactInputSchema).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional()
}).strict();

export const MemberFundsCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional()
}).strict();

export const EnumFundTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumFundTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => FundTypeSchema).optional()
}).strict();

export const EnumFundTransactionsTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumFundTransactionsTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => FundTransactionsTypeSchema).optional()
}).strict();

export const JournalEntriesUpdateOneWithoutMemberFundsTransactNestedInputSchema: z.ZodType<Prisma.JournalEntriesUpdateOneWithoutMemberFundsTransactNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMemberFundsTransactInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutMemberFundsTransactInputSchema).optional(),
  upsert: z.lazy(() => JournalEntriesUpsertWithoutMemberFundsTransactInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => JournalEntriesWhereInputSchema) ]).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JournalEntriesUpdateToOneWithWhereWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUpdateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutMemberFundsTransactInputSchema) ]).optional(),
}).strict();

export const MemberFundsUpdateOneRequiredWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.MemberFundsUpdateOneRequiredWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberFundsCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => MemberFundsUpsertWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => MemberFundsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberFundsUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUpdateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const NullableBigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional().nullable(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const MembersCreateNestedOneWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersCreateNestedOneWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedCreateWithoutInvoiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutInvoiceInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional()
}).strict();

export const InvoiceItemsCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoiceItemsUncheckedCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedCreateNestedManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedCreateNestedManyWithoutInvoiceInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyInvoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const MembersUpdateOneRequiredWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.MembersUpdateOneRequiredWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedCreateWithoutInvoiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutInvoiceInputSchema).optional(),
  upsert: z.lazy(() => MembersUpsertWithoutInvoiceInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MembersUpdateToOneWithWhereWithoutInvoiceInputSchema),z.lazy(() => MembersUpdateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutInvoiceInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoiceItemsUncheckedUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedUpdateManyWithoutInvoiceNestedInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateManyWithoutInvoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyInvoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItemsCreateNestedOneWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsCreateNestedOneWithoutInvoiceItemsInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutInvoiceItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemsCreateOrConnectWithoutInvoiceItemsInputSchema).optional(),
  connect: z.lazy(() => ItemsWhereUniqueInputSchema).optional()
}).strict();

export const InvoiceCreateNestedOneWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutInvoiceItemsInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoiceItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutInvoiceItemsInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional()
}).strict();

export const ItemsUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema: z.ZodType<Prisma.ItemsUpdateOneRequiredWithoutInvoiceItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItemsCreateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutInvoiceItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItemsCreateOrConnectWithoutInvoiceItemsInputSchema).optional(),
  upsert: z.lazy(() => ItemsUpsertWithoutInvoiceItemsInputSchema).optional(),
  connect: z.lazy(() => ItemsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ItemsUpdateToOneWithWhereWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedUpdateWithoutInvoiceItemsInputSchema) ]).optional(),
}).strict();

export const InvoiceUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateOneRequiredWithoutInvoiceItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoiceItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutInvoiceItemsInputSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutInvoiceItemsInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateToOneWithWhereWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoiceItemsInputSchema) ]).optional(),
}).strict();

export const JournalEntriesCreateNestedOneWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesCreateNestedOneWithoutInvoicePaymentsInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutInvoicePaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutInvoicePaymentsInputSchema).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional()
}).strict();

export const InvoiceCreateNestedOneWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceCreateNestedOneWithoutInvoicePaymentsInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoicePaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutInvoicePaymentsInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional()
}).strict();

export const JournalEntriesUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema: z.ZodType<Prisma.JournalEntriesUpdateOneRequiredWithoutInvoicePaymentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutInvoicePaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutInvoicePaymentsInputSchema).optional(),
  upsert: z.lazy(() => JournalEntriesUpsertWithoutInvoicePaymentsInputSchema).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JournalEntriesUpdateToOneWithWhereWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]).optional(),
}).strict();

export const InvoiceUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateOneRequiredWithoutInvoicePaymentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoicePaymentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutInvoicePaymentsInputSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutInvoicePaymentsInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateToOneWithWhereWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsCreateNestedManyWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsCreateNestedManyWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoiceItemsUncheckedCreateNestedManyWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedCreateNestedManyWithoutItemInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyItemInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumItemTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumItemTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ItemTypeSchema).optional()
}).strict();

export const InvoiceItemsUpdateManyWithoutItemNestedInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoiceItemsUncheckedUpdateManyWithoutItemNestedInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateManyWithoutItemNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema).array(),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema),z.lazy(() => InvoiceItemsCreateOrConnectWithoutItemInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpsertWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoiceItemsCreateManyItemInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoiceItemsWhereUniqueInputSchema),z.lazy(() => InvoiceItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpdateWithWhereUniqueWithoutItemInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutItemInputSchema),z.lazy(() => InvoiceItemsUpdateManyWithWhereWithoutItemInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountsThirdLvlCreateNestedManyWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateNestedManyWithoutRootIDInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema).array(),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountsThirdLvlCreateManyRootIDInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountsThirdLvlUncheckedCreateNestedManyWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedCreateNestedManyWithoutRootIDInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema).array(),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountsThirdLvlCreateManyRootIDInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumAccountTypesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccountTypesFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AccountTypesSchema).optional()
}).strict();

export const AccountsThirdLvlUpdateManyWithoutRootIDNestedInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateManyWithoutRootIDNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema).array(),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountsThirdLvlCreateManyRootIDInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountsThirdLvlUncheckedUpdateManyWithoutRootIDNestedInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateManyWithoutRootIDNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema).array(),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountsThirdLvlCreateManyRootIDInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountsSecondLvlCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => AccountsSecondLvlCreateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsSecondLvlCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => AccountsSecondLvlWhereUniqueInputSchema).optional()
}).strict();

export const DividendsCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.DividendsCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsCreateWithoutAccountInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsCreateNestedManyWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsCreateNestedManyWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyAccountsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DividendsUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsCreateWithoutAccountInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsUncheckedCreateNestedManyWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUncheckedCreateNestedManyWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyAccountsInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const AccountsSecondLvlUpdateOneRequiredWithoutChildrenNestedInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateOneRequiredWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountsSecondLvlCreateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsSecondLvlCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => AccountsSecondLvlUpsertWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => AccountsSecondLvlWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountsSecondLvlUpdateToOneWithWhereWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUpdateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict();

export const DividendsUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.DividendsUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsCreateWithoutAccountInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DividendsUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => DividendsUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DividendsUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => DividendsUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DividendsUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => DividendsUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsUpdateManyWithoutAccountsNestedInputSchema: z.ZodType<Prisma.JournalItemsUpdateManyWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutAccountsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyAccountsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutAccountsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalItemsUpdateManyWithWhereWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpdateManyWithWhereWithoutAccountsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DividendsUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsCreateWithoutAccountInputSchema).array(),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema),z.lazy(() => DividendsCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DividendsUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => DividendsUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DividendsCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DividendsWhereUniqueInputSchema),z.lazy(() => DividendsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DividendsUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => DividendsUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DividendsUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => DividendsUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsUncheckedUpdateManyWithoutAccountsNestedInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateManyWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutAccountsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutAccountsInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyAccountsInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutAccountsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalItemsUpdateManyWithWhereWithoutAccountsInputSchema),z.lazy(() => JournalItemsUpdateManyWithWhereWithoutAccountsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembersCreateNestedOneWithoutDividendsInputSchema: z.ZodType<Prisma.MembersCreateNestedOneWithoutDividendsInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutDividendsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutDividendsInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateNestedOneWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateNestedOneWithoutDividendsInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutDividendsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutDividendsInputSchema).optional(),
  connect: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).optional()
}).strict();

export const MembersUpdateOneRequiredWithoutDividendsNestedInputSchema: z.ZodType<Prisma.MembersUpdateOneRequiredWithoutDividendsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutDividendsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutDividendsInputSchema).optional(),
  upsert: z.lazy(() => MembersUpsertWithoutDividendsInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MembersUpdateToOneWithWhereWithoutDividendsInputSchema),z.lazy(() => MembersUpdateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutDividendsInputSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlUpdateOneRequiredWithoutDividendsNestedInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateOneRequiredWithoutDividendsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutDividendsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutDividendsInputSchema).optional(),
  upsert: z.lazy(() => AccountsThirdLvlUpsertWithoutDividendsInputSchema).optional(),
  connect: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateToOneWithWhereWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUpdateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutDividendsInputSchema) ]).optional(),
}).strict();

export const EnumSavingsTransactionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSavingsTransactionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SavingsTransactionTypeSchema).optional()
}).strict();

export const JournalItemsCreateNestedManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsCreateNestedManyWithoutJournalEntriesInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundTransactionsCreateNestedManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsCreateNestedManyWithoutJournalEntriesInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MembersCreateNestedOneWithoutJournalsInputSchema: z.ZodType<Prisma.MembersCreateNestedOneWithoutJournalsInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutJournalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutJournalsInputSchema).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional()
}).strict();

export const InvoicePaymentsCreateNestedManyWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateNestedManyWithoutJournalEntryInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumReferenceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReferenceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReferenceTypeSchema).optional()
}).strict();

export const EnumJournalTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumJournalTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => JournalTypeSchema).optional()
}).strict();

export const JournalItemsUpdateManyWithoutJournalEntriesNestedInputSchema: z.ZodType<Prisma.JournalItemsUpdateManyWithoutJournalEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalItemsUpdateManyWithWhereWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpdateManyWithWhereWithoutJournalEntriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundTransactionsUpdateManyWithoutJournalEntriesNestedInputSchema: z.ZodType<Prisma.FundTransactionsUpdateManyWithoutJournalEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MembersUpdateOneWithoutJournalsNestedInputSchema: z.ZodType<Prisma.MembersUpdateOneWithoutJournalsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MembersCreateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutJournalsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MembersCreateOrConnectWithoutJournalsInputSchema).optional(),
  upsert: z.lazy(() => MembersUpsertWithoutJournalsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MembersWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MembersWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MembersUpdateToOneWithWhereWithoutJournalsInputSchema),z.lazy(() => MembersUpdateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutJournalsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUpdateManyWithoutJournalEntryNestedInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyWithoutJournalEntryNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JournalItemsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JournalItemsWhereUniqueInputSchema),z.lazy(() => JournalItemsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JournalItemsUpdateManyWithWhereWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUpdateManyWithWhereWithoutJournalEntriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema).array(),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FundTransactionsCreateManyJournalEntriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FundTransactionsWhereUniqueInputSchema),z.lazy(() => FundTransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema).array(),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),z.lazy(() => InvoicePaymentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JournalEntriesCreateNestedOneWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesCreateNestedOneWithoutJournalItemsInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutJournalItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutJournalItemsInputSchema).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateNestedOneWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateNestedOneWithoutJournalItemsInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutJournalItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutJournalItemsInputSchema).optional(),
  connect: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).optional()
}).strict();

export const JournalEntriesUpdateOneRequiredWithoutJournalItemsNestedInputSchema: z.ZodType<Prisma.JournalEntriesUpdateOneRequiredWithoutJournalItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutJournalItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JournalEntriesCreateOrConnectWithoutJournalItemsInputSchema).optional(),
  upsert: z.lazy(() => JournalEntriesUpsertWithoutJournalItemsInputSchema).optional(),
  connect: z.lazy(() => JournalEntriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JournalEntriesUpdateToOneWithWhereWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUpdateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutJournalItemsInputSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlUpdateOneRequiredWithoutJournalItemsNestedInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateOneRequiredWithoutJournalItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutJournalItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountsThirdLvlCreateOrConnectWithoutJournalItemsInputSchema).optional(),
  upsert: z.lazy(() => AccountsThirdLvlUpsertWithoutJournalItemsInputSchema).optional(),
  connect: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateToOneWithWhereWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUpdateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutJournalItemsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBigIntNullableFilterSchema: z.ZodType<Prisma.NestedBigIntNullableFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumFundTypeFilterSchema: z.ZodType<Prisma.NestedEnumFundTypeFilter> = z.object({
  equals: z.lazy(() => FundTypeSchema).optional(),
  in: z.lazy(() => FundTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => NestedEnumFundTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumFundTransactionsTypeFilterSchema: z.ZodType<Prisma.NestedEnumFundTransactionsTypeFilter> = z.object({
  equals: z.lazy(() => FundTransactionsTypeSchema).optional(),
  in: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntNullableWithAggregatesFilter> = z.object({
  equals: z.bigint().optional().nullable(),
  in: z.bigint().array().optional().nullable(),
  notIn: z.bigint().array().optional().nullable(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntNullableFilterSchema).optional()
}).strict();

export const NestedEnumFundTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFundTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FundTypeSchema).optional(),
  in: z.lazy(() => FundTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => NestedEnumFundTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFundTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFundTypeFilterSchema).optional()
}).strict();

export const NestedEnumFundTransactionsTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFundTransactionsTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => FundTransactionsTypeSchema).optional(),
  in: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  notIn: z.lazy(() => FundTransactionsTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => NestedEnumFundTransactionsTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumFundTransactionsTypeFilterSchema).optional()
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const NestedEnumItemTypeFilterSchema: z.ZodType<Prisma.NestedEnumItemTypeFilter> = z.object({
  equals: z.lazy(() => ItemTypeSchema).optional(),
  in: z.lazy(() => ItemTypeSchema).array().optional(),
  notIn: z.lazy(() => ItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => NestedEnumItemTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumItemTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ItemTypeSchema).optional(),
  in: z.lazy(() => ItemTypeSchema).array().optional(),
  notIn: z.lazy(() => ItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => NestedEnumItemTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumItemTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumItemTypeFilterSchema).optional()
}).strict();

export const NestedEnumAccountTypesFilterSchema: z.ZodType<Prisma.NestedEnumAccountTypesFilter> = z.object({
  equals: z.lazy(() => AccountTypesSchema).optional(),
  in: z.lazy(() => AccountTypesSchema).array().optional(),
  notIn: z.lazy(() => AccountTypesSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => NestedEnumAccountTypesFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAccountTypesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccountTypesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountTypesSchema).optional(),
  in: z.lazy(() => AccountTypesSchema).array().optional(),
  notIn: z.lazy(() => AccountTypesSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => NestedEnumAccountTypesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountTypesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountTypesFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumSavingsTransactionTypeFilterSchema: z.ZodType<Prisma.NestedEnumSavingsTransactionTypeFilter> = z.object({
  equals: z.lazy(() => SavingsTransactionTypeSchema).optional(),
  in: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSavingsTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSavingsTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SavingsTransactionTypeSchema).optional(),
  in: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => SavingsTransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SavingsTransactionTypeSchema),z.lazy(() => NestedEnumSavingsTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSavingsTransactionTypeFilterSchema).optional()
}).strict();

export const NestedEnumReferenceTypeFilterSchema: z.ZodType<Prisma.NestedEnumReferenceTypeFilter> = z.object({
  equals: z.lazy(() => ReferenceTypeSchema).optional(),
  in: z.lazy(() => ReferenceTypeSchema).array().optional(),
  notIn: z.lazy(() => ReferenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => NestedEnumReferenceTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumJournalTypeFilterSchema: z.ZodType<Prisma.NestedEnumJournalTypeFilter> = z.object({
  equals: z.lazy(() => JournalTypeSchema).optional(),
  in: z.lazy(() => JournalTypeSchema).array().optional(),
  notIn: z.lazy(() => JournalTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => NestedEnumJournalTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReferenceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReferenceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReferenceTypeSchema).optional(),
  in: z.lazy(() => ReferenceTypeSchema).array().optional(),
  notIn: z.lazy(() => ReferenceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => NestedEnumReferenceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReferenceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReferenceTypeFilterSchema).optional()
}).strict();

export const NestedEnumJournalTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumJournalTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => JournalTypeSchema).optional(),
  in: z.lazy(() => JournalTypeSchema).array().optional(),
  notIn: z.lazy(() => JournalTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => NestedEnumJournalTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumJournalTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumJournalTypeFilterSchema).optional()
}).strict();

export const MemberFundsCreateWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsCreateWithoutMemberInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional(),
  Transactions: z.lazy(() => FundTransactionsCreateNestedManyWithoutMemberFundsInputSchema).optional()
}).strict();

export const MemberFundsUncheckedCreateWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUncheckedCreateWithoutMemberInput> = z.object({
  fundId: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional(),
  Transactions: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutMemberFundsInputSchema).optional()
}).strict();

export const MemberFundsCreateOrConnectWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsCreateOrConnectWithoutMemberInput> = z.object({
  where: z.lazy(() => MemberFundsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]),
}).strict();

export const DividendsCreateWithoutMembersInputSchema: z.ZodType<Prisma.DividendsCreateWithoutMembersInput> = z.object({
  dividendId: z.bigint().optional(),
  datePosted: z.coerce.date().optional(),
  amount: z.number(),
  account: z.lazy(() => AccountsThirdLvlCreateNestedOneWithoutDividendsInputSchema)
}).strict();

export const DividendsUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUncheckedCreateWithoutMembersInput> = z.object({
  dividendId: z.bigint().optional(),
  accountId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const DividendsCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.DividendsCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const DividendsCreateManyMembersInputEnvelopeSchema: z.ZodType<Prisma.DividendsCreateManyMembersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DividendsCreateManyMembersInputSchema),z.lazy(() => DividendsCreateManyMembersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvoiceCreateWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceCreateWithoutMembersInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsCreateNestedManyWithoutInvoiceInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateWithoutMembersInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const InvoiceCreateManyMembersInputEnvelopeSchema: z.ZodType<Prisma.InvoiceCreateManyMembersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceCreateManyMembersInputSchema),z.lazy(() => InvoiceCreateManyMembersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JournalEntriesCreateWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesCreateWithoutMembersInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateWithoutMembersInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const JournalEntriesCreateManyMembersInputEnvelopeSchema: z.ZodType<Prisma.JournalEntriesCreateManyMembersInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JournalEntriesCreateManyMembersInputSchema),z.lazy(() => JournalEntriesCreateManyMembersInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MemberFundsUpsertWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUpsertWithoutMemberInput> = z.object({
  update: z.union([ z.lazy(() => MemberFundsUpdateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutMemberInputSchema) ]),
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutMemberInputSchema) ]),
  where: z.lazy(() => MemberFundsWhereInputSchema).optional()
}).strict();

export const MemberFundsUpdateToOneWithWhereWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUpdateToOneWithWhereWithoutMemberInput> = z.object({
  where: z.lazy(() => MemberFundsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MemberFundsUpdateWithoutMemberInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutMemberInputSchema) ]),
}).strict();

export const MemberFundsUpdateWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUpdateWithoutMemberInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Transactions: z.lazy(() => FundTransactionsUpdateManyWithoutMemberFundsNestedInputSchema).optional()
}).strict();

export const MemberFundsUncheckedUpdateWithoutMemberInputSchema: z.ZodType<Prisma.MemberFundsUncheckedUpdateWithoutMemberInput> = z.object({
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Transactions: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutMemberFundsNestedInputSchema).optional()
}).strict();

export const DividendsUpsertWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUpsertWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DividendsUpdateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => DividendsCreateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const DividendsUpdateWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUpdateWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DividendsUpdateWithoutMembersInputSchema),z.lazy(() => DividendsUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const DividendsUpdateManyWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUpdateManyWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => DividendsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DividendsUpdateManyMutationInputSchema),z.lazy(() => DividendsUncheckedUpdateManyWithoutMembersInputSchema) ]),
}).strict();

export const DividendsScalarWhereInputSchema: z.ZodType<Prisma.DividendsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DividendsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DividendsScalarWhereInputSchema),z.lazy(() => DividendsScalarWhereInputSchema).array() ]).optional(),
  dividendId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  datePosted: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const InvoiceUpsertWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUpsertWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const InvoiceUpdateWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutMembersInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const InvoiceUpdateManyWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => InvoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateManyMutationInputSchema),z.lazy(() => InvoiceUncheckedUpdateManyWithoutMembersInputSchema) ]),
}).strict();

export const InvoiceScalarWhereInputSchema: z.ZodType<Prisma.InvoiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema),z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema),z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  memberId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dateOfInvoice: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  baseGrandTotal: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  outStandingAmt: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
}).strict();

export const JournalEntriesUpsertWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUpsertWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const JournalEntriesUpdateWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUpdateWithWhereUniqueWithoutMembersInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JournalEntriesUpdateWithoutMembersInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const JournalEntriesUpdateManyWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUpdateManyWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => JournalEntriesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JournalEntriesUpdateManyMutationInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateManyWithoutMembersInputSchema) ]),
}).strict();

export const JournalEntriesScalarWhereInputSchema: z.ZodType<Prisma.JournalEntriesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JournalEntriesScalarWhereInputSchema),z.lazy(() => JournalEntriesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalEntriesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalEntriesScalarWhereInputSchema),z.lazy(() => JournalEntriesScalarWhereInputSchema).array() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  entryDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  referenceName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  referenceType: z.union([ z.lazy(() => EnumReferenceTypeFilterSchema),z.lazy(() => ReferenceTypeSchema) ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  memberId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => EnumJournalTypeFilterSchema),z.lazy(() => JournalTypeSchema) ]).optional(),
}).strict();

export const MembersCreateWithoutFundsInputSchema: z.ZodType<Prisma.MembersCreateWithoutFundsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dividends: z.lazy(() => DividendsCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUncheckedCreateWithoutFundsInputSchema: z.ZodType<Prisma.MembersUncheckedCreateWithoutFundsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersCreateOrConnectWithoutFundsInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutFundsInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutFundsInputSchema) ]),
}).strict();

export const FundTransactionsCreateWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsCreateWithoutMemberFundsInput> = z.object({
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number(),
  JournalEntries: z.lazy(() => JournalEntriesCreateNestedOneWithoutMemberFundsTransactInputSchema).optional()
}).strict();

export const FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedCreateWithoutMemberFundsInput> = z.object({
  fundTransactId: z.number().int().optional(),
  ledgerId: z.bigint().optional().nullable(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const FundTransactionsCreateOrConnectWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsCreateOrConnectWithoutMemberFundsInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema) ]),
}).strict();

export const FundTransactionsCreateManyMemberFundsInputEnvelopeSchema: z.ZodType<Prisma.FundTransactionsCreateManyMemberFundsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FundTransactionsCreateManyMemberFundsInputSchema),z.lazy(() => FundTransactionsCreateManyMemberFundsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MembersUpsertWithoutFundsInputSchema: z.ZodType<Prisma.MembersUpsertWithoutFundsInput> = z.object({
  update: z.union([ z.lazy(() => MembersUpdateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutFundsInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutFundsInputSchema) ]),
  where: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export const MembersUpdateToOneWithWhereWithoutFundsInputSchema: z.ZodType<Prisma.MembersUpdateToOneWithWhereWithoutFundsInput> = z.object({
  where: z.lazy(() => MembersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MembersUpdateWithoutFundsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutFundsInputSchema) ]),
}).strict();

export const MembersUpdateWithoutFundsInputSchema: z.ZodType<Prisma.MembersUpdateWithoutFundsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dividends: z.lazy(() => DividendsUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersUncheckedUpdateWithoutFundsInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateWithoutFundsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUpsertWithWhereUniqueWithoutMemberFundsInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateWithoutMemberFundsInputSchema) ]),
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutMemberFundsInputSchema) ]),
}).strict();

export const FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUpdateWithWhereUniqueWithoutMemberFundsInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FundTransactionsUpdateWithoutMemberFundsInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateWithoutMemberFundsInputSchema) ]),
}).strict();

export const FundTransactionsUpdateManyWithWhereWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUpdateManyWithWhereWithoutMemberFundsInput> = z.object({
  where: z.lazy(() => FundTransactionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FundTransactionsUpdateManyMutationInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutMemberFundsInputSchema) ]),
}).strict();

export const FundTransactionsScalarWhereInputSchema: z.ZodType<Prisma.FundTransactionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FundTransactionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FundTransactionsScalarWhereInputSchema),z.lazy(() => FundTransactionsScalarWhereInputSchema).array() ]).optional(),
  fundTransactId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fundId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ledgerId: z.union([ z.lazy(() => BigIntNullableFilterSchema),z.bigint() ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => EnumFundTypeFilterSchema),z.lazy(() => FundTypeSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => EnumFundTransactionsTypeFilterSchema),z.lazy(() => FundTransactionsTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  postedBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const JournalEntriesCreateWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesCreateWithoutMemberFundsTransactInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutJournalsInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedCreateWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateWithoutMemberFundsTransactInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  memberId: z.string().optional().nullable(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesCreateOrConnectWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesCreateOrConnectWithoutMemberFundsTransactInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMemberFundsTransactInputSchema) ]),
}).strict();

export const MemberFundsCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsCreateWithoutTransactionsInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional(),
  Member: z.lazy(() => MembersCreateNestedOneWithoutFundsInputSchema)
}).strict();

export const MemberFundsUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsUncheckedCreateWithoutTransactionsInput> = z.object({
  fundId: z.number().int().optional(),
  memberId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  savingsBal: z.number().optional(),
  shareCapBal: z.number().optional()
}).strict();

export const MemberFundsCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => MemberFundsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const JournalEntriesUpsertWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesUpsertWithoutMemberFundsTransactInput> = z.object({
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutMemberFundsTransactInputSchema) ]),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutMemberFundsTransactInputSchema) ]),
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional()
}).strict();

export const JournalEntriesUpdateToOneWithWhereWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesUpdateToOneWithWhereWithoutMemberFundsTransactInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JournalEntriesUpdateWithoutMemberFundsTransactInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutMemberFundsTransactInputSchema) ]),
}).strict();

export const JournalEntriesUpdateWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesUpdateWithoutMemberFundsTransactInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  Members: z.lazy(() => MembersUpdateOneWithoutJournalsNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateWithoutMemberFundsTransactInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateWithoutMemberFundsTransactInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const MemberFundsUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => MemberFundsUpdateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => MemberFundsCreateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => MemberFundsWhereInputSchema).optional()
}).strict();

export const MemberFundsUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => MemberFundsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MemberFundsUpdateWithoutTransactionsInputSchema),z.lazy(() => MemberFundsUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const MemberFundsUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsUpdateWithoutTransactionsInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Member: z.lazy(() => MembersUpdateOneRequiredWithoutFundsNestedInputSchema).optional()
}).strict();

export const MemberFundsUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.MemberFundsUncheckedUpdateWithoutTransactionsInput> = z.object({
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  savingsBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shareCapBal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MembersCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersCreateWithoutInvoiceInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUncheckedCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersUncheckedCreateWithoutInvoiceInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsUncheckedCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoiceItemsCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsCreateWithoutInvoiceInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int(),
  Item: z.lazy(() => ItemsCreateNestedOneWithoutInvoiceItemsInputSchema)
}).strict();

export const InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedCreateWithoutInvoiceInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  itemID: z.string(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoiceItemsCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoiceItemsCreateManyInvoiceInputEnvelopeSchema: z.ZodType<Prisma.InvoiceItemsCreateManyInvoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceItemsCreateManyInvoiceInputSchema),z.lazy(() => InvoiceItemsCreateManyInvoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvoicePaymentsCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateWithoutInvoiceInput> = z.object({
  paymentId: z.bigint().optional(),
  orNo: z.string(),
  paymentReceived: z.number(),
  paymentDate: z.coerce.date().optional(),
  JournalEntry: z.lazy(() => JournalEntriesCreateNestedOneWithoutInvoicePaymentsInputSchema)
}).strict();

export const InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedCreateWithoutInvoiceInput> = z.object({
  paymentId: z.bigint().optional(),
  orNo: z.string(),
  paymentReceived: z.number(),
  journalRef: z.bigint(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const InvoicePaymentsCreateOrConnectWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateOrConnectWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoicePaymentsCreateManyInvoiceInputEnvelopeSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyInvoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoicePaymentsCreateManyInvoiceInputSchema),z.lazy(() => InvoicePaymentsCreateManyInvoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MembersUpsertWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersUpsertWithoutInvoiceInput> = z.object({
  update: z.union([ z.lazy(() => MembersUpdateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedCreateWithoutInvoiceInputSchema) ]),
  where: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export const MembersUpdateToOneWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersUpdateToOneWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => MembersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MembersUpdateWithoutInvoiceInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export const MembersUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersUpdateWithoutInvoiceInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersUncheckedUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateWithoutInvoiceInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUncheckedUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUpsertWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceItemsUpdateWithoutInvoiceInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoiceItemsUpdateManyWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceItemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceItemsUpdateManyMutationInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoiceItemsScalarWhereInputSchema: z.ZodType<Prisma.InvoiceItemsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceItemsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceItemsScalarWhereInputSchema),z.lazy(() => InvoiceItemsScalarWhereInputSchema).array() ]).optional(),
  invoiceItemId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  itemID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rate: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  trade: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUpsertWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateWithoutInvoiceInputSchema) ]),
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateWithWhereUniqueWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoicePaymentsUpdateWithoutInvoiceInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoicePaymentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoicePaymentsUpdateManyMutationInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutInvoiceInputSchema) ]),
}).strict();

export const InvoicePaymentsScalarWhereInputSchema: z.ZodType<Prisma.InvoicePaymentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoicePaymentsScalarWhereInputSchema),z.lazy(() => InvoicePaymentsScalarWhereInputSchema).array() ]).optional(),
  paymentId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  invoiceId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  orNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  paymentReceived: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  journalRef: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  paymentDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItemsCreateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsCreateWithoutInvoiceItemsInput> = z.object({
  itemID: z.string().cuid().optional(),
  itemName: z.string(),
  itemDescription: z.string().optional().nullable(),
  itemType: z.lazy(() => ItemTypeSchema),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stocks: z.number().int().optional().nullable()
}).strict();

export const ItemsUncheckedCreateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsUncheckedCreateWithoutInvoiceItemsInput> = z.object({
  itemID: z.string().cuid().optional(),
  itemName: z.string(),
  itemDescription: z.string().optional().nullable(),
  itemType: z.lazy(() => ItemTypeSchema),
  sellingPrice: z.number().int(),
  costPrice: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stocks: z.number().int().optional().nullable()
}).strict();

export const ItemsCreateOrConnectWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsCreateOrConnectWithoutInvoiceItemsInput> = z.object({
  where: z.lazy(() => ItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItemsCreateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutInvoiceItemsInputSchema) ]),
}).strict();

export const InvoiceCreateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceCreateWithoutInvoiceItemsInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutInvoiceInputSchema),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceUncheckedCreateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateWithoutInvoiceItemsInput> = z.object({
  invoiceId: z.bigint().optional(),
  memberId: z.string(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceCreateOrConnectWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutInvoiceItemsInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoiceItemsInputSchema) ]),
}).strict();

export const ItemsUpsertWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsUpsertWithoutInvoiceItemsInput> = z.object({
  update: z.union([ z.lazy(() => ItemsUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedUpdateWithoutInvoiceItemsInputSchema) ]),
  create: z.union([ z.lazy(() => ItemsCreateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedCreateWithoutInvoiceItemsInputSchema) ]),
  where: z.lazy(() => ItemsWhereInputSchema).optional()
}).strict();

export const ItemsUpdateToOneWithWhereWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsUpdateToOneWithWhereWithoutInvoiceItemsInput> = z.object({
  where: z.lazy(() => ItemsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ItemsUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => ItemsUncheckedUpdateWithoutInvoiceItemsInputSchema) ]),
}).strict();

export const ItemsUpdateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsUpdateWithoutInvoiceItemsInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ItemsUncheckedUpdateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.ItemsUncheckedUpdateWithoutInvoiceItemsInput> = z.object({
  itemID: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itemDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  itemType: z.union([ z.lazy(() => ItemTypeSchema),z.lazy(() => EnumItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  sellingPrice: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  costPrice: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stocks: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const InvoiceUpsertWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceUpsertWithoutInvoiceItemsInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoiceItemsInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoiceItemsInputSchema) ]),
  where: z.lazy(() => InvoiceWhereInputSchema).optional()
}).strict();

export const InvoiceUpdateToOneWithWhereWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutInvoiceItemsInput> = z.object({
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutInvoiceItemsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoiceItemsInputSchema) ]),
}).strict();

export const InvoiceUpdateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceUpdateWithoutInvoiceItemsInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Members: z.lazy(() => MembersUpdateOneRequiredWithoutInvoiceNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateWithoutInvoiceItemsInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateWithoutInvoiceItemsInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const JournalEntriesCreateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesCreateWithoutInvoicePaymentsInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutJournalsInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedCreateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateWithoutInvoicePaymentsInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  memberId: z.string().optional().nullable(),
  journalType: z.lazy(() => JournalTypeSchema),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional()
}).strict();

export const JournalEntriesCreateOrConnectWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesCreateOrConnectWithoutInvoicePaymentsInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutInvoicePaymentsInputSchema) ]),
}).strict();

export const InvoiceCreateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceCreateWithoutInvoicePaymentsInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutInvoiceInputSchema),
  InvoiceItems: z.lazy(() => InvoiceItemsCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceUncheckedCreateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceUncheckedCreateWithoutInvoicePaymentsInput> = z.object({
  invoiceId: z.bigint().optional(),
  memberId: z.string(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedCreateNestedManyWithoutInvoiceInputSchema).optional()
}).strict();

export const InvoiceCreateOrConnectWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceCreateOrConnectWithoutInvoicePaymentsInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoicePaymentsInputSchema) ]),
}).strict();

export const JournalEntriesUpsertWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesUpsertWithoutInvoicePaymentsInput> = z.object({
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutInvoicePaymentsInputSchema) ]),
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional()
}).strict();

export const JournalEntriesUpdateToOneWithWhereWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesUpdateToOneWithWhereWithoutInvoicePaymentsInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JournalEntriesUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]),
}).strict();

export const JournalEntriesUpdateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesUpdateWithoutInvoicePaymentsInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  Members: z.lazy(() => MembersUpdateOneWithoutJournalsNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateWithoutInvoicePaymentsInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional()
}).strict();

export const InvoiceUpsertWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceUpsertWithoutInvoicePaymentsInput> = z.object({
  update: z.union([ z.lazy(() => InvoiceUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceCreateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedCreateWithoutInvoicePaymentsInputSchema) ]),
  where: z.lazy(() => InvoiceWhereInputSchema).optional()
}).strict();

export const InvoiceUpdateToOneWithWhereWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutInvoicePaymentsInput> = z.object({
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutInvoicePaymentsInputSchema),z.lazy(() => InvoiceUncheckedUpdateWithoutInvoicePaymentsInputSchema) ]),
}).strict();

export const InvoiceUpdateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceUpdateWithoutInvoicePaymentsInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Members: z.lazy(() => MembersUpdateOneRequiredWithoutInvoiceNestedInputSchema).optional(),
  InvoiceItems: z.lazy(() => InvoiceItemsUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateWithoutInvoicePaymentsInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateWithoutInvoicePaymentsInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceItemsCreateWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsCreateWithoutItemInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int(),
  Invoice: z.lazy(() => InvoiceCreateNestedOneWithoutInvoiceItemsInputSchema)
}).strict();

export const InvoiceItemsUncheckedCreateWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedCreateWithoutItemInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  invoiceId: z.bigint(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoiceItemsCreateOrConnectWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsCreateOrConnectWithoutItemInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const InvoiceItemsCreateManyItemInputEnvelopeSchema: z.ZodType<Prisma.InvoiceItemsCreateManyItemInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceItemsCreateManyItemInputSchema),z.lazy(() => InvoiceItemsCreateManyItemInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InvoiceItemsUpsertWithWhereUniqueWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUpsertWithWhereUniqueWithoutItemInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoiceItemsUpdateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateWithoutItemInputSchema) ]),
  create: z.union([ z.lazy(() => InvoiceItemsCreateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedCreateWithoutItemInputSchema) ]),
}).strict();

export const InvoiceItemsUpdateWithWhereUniqueWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateWithWhereUniqueWithoutItemInput> = z.object({
  where: z.lazy(() => InvoiceItemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceItemsUpdateWithoutItemInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateWithoutItemInputSchema) ]),
}).strict();

export const InvoiceItemsUpdateManyWithWhereWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyWithWhereWithoutItemInput> = z.object({
  where: z.lazy(() => InvoiceItemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceItemsUpdateManyMutationInputSchema),z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutItemInputSchema) ]),
}).strict();

export const AccountsThirdLvlCreateWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateWithoutRootIDInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  Dividends: z.lazy(() => DividendsCreateNestedManyWithoutAccountInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedCreateWithoutRootIDInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  Dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateOrConnectWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateOrConnectWithoutRootIDInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema) ]),
}).strict();

export const AccountsThirdLvlCreateManyRootIDInputEnvelopeSchema: z.ZodType<Prisma.AccountsThirdLvlCreateManyRootIDInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountsThirdLvlCreateManyRootIDInputSchema),z.lazy(() => AccountsThirdLvlCreateManyRootIDInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpsertWithWhereUniqueWithoutRootIDInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutRootIDInputSchema) ]),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutRootIDInputSchema) ]),
}).strict();

export const AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateWithWhereUniqueWithoutRootIDInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutRootIDInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutRootIDInputSchema) ]),
}).strict();

export const AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateManyWithWhereWithoutRootIDInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountsThirdLvlUpdateManyMutationInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateManyWithoutRootIDInputSchema) ]),
}).strict();

export const AccountsThirdLvlScalarWhereInputSchema: z.ZodType<Prisma.AccountsThirdLvlScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountsThirdLvlScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountsThirdLvlScalarWhereInputSchema),z.lazy(() => AccountsThirdLvlScalarWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rootId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  openingBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  runningBalance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const AccountsSecondLvlCreateWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlCreateWithoutChildrenInput> = z.object({
  rootType: z.lazy(() => AccountTypesSchema),
  rootName: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AccountsSecondLvlUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlUncheckedCreateWithoutChildrenInput> = z.object({
  rootId: z.number().int().optional(),
  rootType: z.lazy(() => AccountTypesSchema),
  rootName: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AccountsSecondLvlCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => AccountsSecondLvlWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountsSecondLvlCreateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const DividendsCreateWithoutAccountInputSchema: z.ZodType<Prisma.DividendsCreateWithoutAccountInput> = z.object({
  dividendId: z.bigint().optional(),
  datePosted: z.coerce.date().optional(),
  amount: z.number(),
  members: z.lazy(() => MembersCreateNestedOneWithoutDividendsInputSchema)
}).strict();

export const DividendsUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUncheckedCreateWithoutAccountInput> = z.object({
  dividendId: z.bigint().optional(),
  memberId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const DividendsCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.DividendsCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const DividendsCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.DividendsCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DividendsCreateManyAccountInputSchema),z.lazy(() => DividendsCreateManyAccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JournalItemsCreateWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsCreateWithoutAccountsInput> = z.object({
  journalItemsId: z.bigint().optional(),
  debit: z.number(),
  credit: z.number(),
  JournalEntries: z.lazy(() => JournalEntriesCreateNestedOneWithoutJournalItemsInputSchema)
}).strict();

export const JournalItemsUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUncheckedCreateWithoutAccountsInput> = z.object({
  journalItemsId: z.bigint().optional(),
  entryId: z.bigint(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const JournalItemsCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const JournalItemsCreateManyAccountsInputEnvelopeSchema: z.ZodType<Prisma.JournalItemsCreateManyAccountsInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JournalItemsCreateManyAccountsInputSchema),z.lazy(() => JournalItemsCreateManyAccountsInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountsSecondLvlUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => AccountsSecondLvlUpdateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => AccountsSecondLvlCreateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedCreateWithoutChildrenInputSchema) ]),
  where: z.lazy(() => AccountsSecondLvlWhereInputSchema).optional()
}).strict();

export const AccountsSecondLvlUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateToOneWithWhereWithoutChildrenInput> = z.object({
  where: z.lazy(() => AccountsSecondLvlWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountsSecondLvlUpdateWithoutChildrenInputSchema),z.lazy(() => AccountsSecondLvlUncheckedUpdateWithoutChildrenInputSchema) ]),
}).strict();

export const AccountsSecondLvlUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateWithoutChildrenInput> = z.object({
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountsSecondLvlUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.AccountsSecondLvlUncheckedUpdateWithoutChildrenInput> = z.object({
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rootType: z.union([ z.lazy(() => AccountTypesSchema),z.lazy(() => EnumAccountTypesFieldUpdateOperationsInputSchema) ]).optional(),
  rootName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DividendsUpdateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => DividendsCreateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const DividendsUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => DividendsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DividendsUpdateWithoutAccountInputSchema),z.lazy(() => DividendsUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const DividendsUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => DividendsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DividendsUpdateManyMutationInputSchema),z.lazy(() => DividendsUncheckedUpdateManyWithoutAccountInputSchema) ]),
}).strict();

export const JournalItemsUpsertWithWhereUniqueWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUpsertWithWhereUniqueWithoutAccountsInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const JournalItemsUpdateWithWhereUniqueWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUpdateWithWhereUniqueWithoutAccountsInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JournalItemsUpdateWithoutAccountsInputSchema),z.lazy(() => JournalItemsUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const JournalItemsUpdateManyWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUpdateManyWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => JournalItemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JournalItemsUpdateManyMutationInputSchema),z.lazy(() => JournalItemsUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const JournalItemsScalarWhereInputSchema: z.ZodType<Prisma.JournalItemsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JournalItemsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JournalItemsScalarWhereInputSchema),z.lazy(() => JournalItemsScalarWhereInputSchema).array() ]).optional(),
  journalItemsId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  entryId: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  debit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  credit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const MembersCreateWithoutDividendsInputSchema: z.ZodType<Prisma.MembersCreateWithoutDividendsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsCreateNestedOneWithoutMemberInputSchema).optional(),
  invoice: z.lazy(() => InvoiceCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUncheckedCreateWithoutDividendsInputSchema: z.ZodType<Prisma.MembersUncheckedCreateWithoutDividendsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsUncheckedCreateNestedOneWithoutMemberInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersCreateOrConnectWithoutDividendsInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutDividendsInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutDividendsInputSchema) ]),
}).strict();

export const AccountsThirdLvlCreateWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateWithoutDividendsInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  RootID: z.lazy(() => AccountsSecondLvlCreateNestedOneWithoutChildrenInputSchema),
  JournalItems: z.lazy(() => JournalItemsCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedCreateWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedCreateWithoutDividendsInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  rootId: z.number().int(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedCreateNestedManyWithoutAccountsInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateOrConnectWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateOrConnectWithoutDividendsInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutDividendsInputSchema) ]),
}).strict();

export const MembersUpsertWithoutDividendsInputSchema: z.ZodType<Prisma.MembersUpsertWithoutDividendsInput> = z.object({
  update: z.union([ z.lazy(() => MembersUpdateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutDividendsInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutDividendsInputSchema) ]),
  where: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export const MembersUpdateToOneWithWhereWithoutDividendsInputSchema: z.ZodType<Prisma.MembersUpdateToOneWithWhereWithoutDividendsInput> = z.object({
  where: z.lazy(() => MembersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MembersUpdateWithoutDividendsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutDividendsInputSchema) ]),
}).strict();

export const MembersUpdateWithoutDividendsInputSchema: z.ZodType<Prisma.MembersUpdateWithoutDividendsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUpdateOneWithoutMemberNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersUncheckedUpdateWithoutDividendsInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateWithoutDividendsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUncheckedUpdateOneWithoutMemberNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  Journals: z.lazy(() => JournalEntriesUncheckedUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUpsertWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpsertWithoutDividendsInput> = z.object({
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutDividendsInputSchema) ]),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutDividendsInputSchema) ]),
  where: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional()
}).strict();

export const AccountsThirdLvlUpdateToOneWithWhereWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateToOneWithWhereWithoutDividendsInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutDividendsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutDividendsInputSchema) ]),
}).strict();

export const AccountsThirdLvlUpdateWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateWithoutDividendsInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  RootID: z.lazy(() => AccountsSecondLvlUpdateOneRequiredWithoutChildrenNestedInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedUpdateWithoutDividendsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateWithoutDividendsInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const JournalItemsCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsCreateWithoutJournalEntriesInput> = z.object({
  journalItemsId: z.bigint().optional(),
  debit: z.number(),
  credit: z.number(),
  Accounts: z.lazy(() => AccountsThirdLvlCreateNestedOneWithoutJournalItemsInputSchema)
}).strict();

export const JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUncheckedCreateWithoutJournalEntriesInput> = z.object({
  journalItemsId: z.bigint().optional(),
  accountId: z.string(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const JournalItemsCreateOrConnectWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsCreateOrConnectWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const JournalItemsCreateManyJournalEntriesInputEnvelopeSchema: z.ZodType<Prisma.JournalItemsCreateManyJournalEntriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JournalItemsCreateManyJournalEntriesInputSchema),z.lazy(() => JournalItemsCreateManyJournalEntriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FundTransactionsCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsCreateWithoutJournalEntriesInput> = z.object({
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number(),
  MemberFunds: z.lazy(() => MemberFundsCreateNestedOneWithoutTransactionsInputSchema)
}).strict();

export const FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedCreateWithoutJournalEntriesInput> = z.object({
  fundTransactId: z.number().int().optional(),
  fundId: z.number().int(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const FundTransactionsCreateOrConnectWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsCreateOrConnectWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const FundTransactionsCreateManyJournalEntriesInputEnvelopeSchema: z.ZodType<Prisma.FundTransactionsCreateManyJournalEntriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FundTransactionsCreateManyJournalEntriesInputSchema),z.lazy(() => FundTransactionsCreateManyJournalEntriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MembersCreateWithoutJournalsInputSchema: z.ZodType<Prisma.MembersCreateWithoutJournalsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersUncheckedCreateWithoutJournalsInputSchema: z.ZodType<Prisma.MembersUncheckedCreateWithoutJournalsInput> = z.object({
  memberId: z.string().cuid().optional(),
  lastName: z.string(),
  firstName: z.string(),
  gender: z.lazy(() => GenderSchema),
  idNumber: z.number().int().optional().nullable(),
  tin: z.string().optional().nullable(),
  dateAccepted: z.coerce.date().optional().nullable(),
  arb: z.string().optional().nullable(),
  bodResNo: z.string().optional().nullable(),
  membershipType: z.string().optional().nullable(),
  civilStatus: z.string().optional().nullable(),
  highestEdAttain: z.string().optional().nullable(),
  numOfDependents: z.number().int().optional().nullable(),
  religion: z.string().optional().nullable(),
  annualIncom: z.number().int().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  address: z.string(),
  occupation: z.string().optional().nullable(),
  contactNo: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Funds: z.lazy(() => MemberFundsUncheckedCreateNestedOneWithoutMemberInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutMembersInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedCreateNestedManyWithoutMembersInputSchema).optional()
}).strict();

export const MembersCreateOrConnectWithoutJournalsInputSchema: z.ZodType<Prisma.MembersCreateOrConnectWithoutJournalsInput> = z.object({
  where: z.lazy(() => MembersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MembersCreateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutJournalsInputSchema) ]),
}).strict();

export const InvoicePaymentsCreateWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateWithoutJournalEntryInput> = z.object({
  paymentId: z.bigint().optional(),
  orNo: z.string(),
  paymentReceived: z.number(),
  paymentDate: z.coerce.date().optional(),
  Invoice: z.lazy(() => InvoiceCreateNestedOneWithoutInvoicePaymentsInputSchema)
}).strict();

export const InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedCreateWithoutJournalEntryInput> = z.object({
  paymentId: z.bigint().optional(),
  invoiceId: z.bigint(),
  orNo: z.string(),
  paymentReceived: z.number(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const InvoicePaymentsCreateOrConnectWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateOrConnectWithoutJournalEntryInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema) ]),
}).strict();

export const InvoicePaymentsCreateManyJournalEntryInputEnvelopeSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyJournalEntryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputSchema),z.lazy(() => InvoicePaymentsCreateManyJournalEntryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUpsertWithWhereUniqueWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JournalItemsUpdateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => JournalItemsCreateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedCreateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUpdateWithWhereUniqueWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => JournalItemsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JournalItemsUpdateWithoutJournalEntriesInputSchema),z.lazy(() => JournalItemsUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const JournalItemsUpdateManyWithWhereWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUpdateManyWithWhereWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => JournalItemsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JournalItemsUpdateManyMutationInputSchema),z.lazy(() => JournalItemsUncheckedUpdateManyWithoutJournalEntriesInputSchema) ]),
}).strict();

export const FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUpsertWithWhereUniqueWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FundTransactionsUpdateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => FundTransactionsCreateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedCreateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUpdateWithWhereUniqueWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => FundTransactionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FundTransactionsUpdateWithoutJournalEntriesInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateWithoutJournalEntriesInputSchema) ]),
}).strict();

export const FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUpdateManyWithWhereWithoutJournalEntriesInput> = z.object({
  where: z.lazy(() => FundTransactionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FundTransactionsUpdateManyMutationInputSchema),z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutJournalEntriesInputSchema) ]),
}).strict();

export const MembersUpsertWithoutJournalsInputSchema: z.ZodType<Prisma.MembersUpsertWithoutJournalsInput> = z.object({
  update: z.union([ z.lazy(() => MembersUpdateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutJournalsInputSchema) ]),
  create: z.union([ z.lazy(() => MembersCreateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedCreateWithoutJournalsInputSchema) ]),
  where: z.lazy(() => MembersWhereInputSchema).optional()
}).strict();

export const MembersUpdateToOneWithWhereWithoutJournalsInputSchema: z.ZodType<Prisma.MembersUpdateToOneWithWhereWithoutJournalsInput> = z.object({
  where: z.lazy(() => MembersWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MembersUpdateWithoutJournalsInputSchema),z.lazy(() => MembersUncheckedUpdateWithoutJournalsInputSchema) ]),
}).strict();

export const MembersUpdateWithoutJournalsInputSchema: z.ZodType<Prisma.MembersUpdateWithoutJournalsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const MembersUncheckedUpdateWithoutJournalsInputSchema: z.ZodType<Prisma.MembersUncheckedUpdateWithoutJournalsInput> = z.object({
  memberId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  idNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateAccepted: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arb: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bodResNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  membershipType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  civilStatus: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  highestEdAttain: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  numOfDependents: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  religion: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  annualIncom: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birthDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Funds: z.lazy(() => MemberFundsUncheckedUpdateOneWithoutMemberNestedInputSchema).optional(),
  dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutMembersNestedInputSchema).optional(),
  invoice: z.lazy(() => InvoiceUncheckedUpdateManyWithoutMembersNestedInputSchema).optional()
}).strict();

export const InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUpsertWithWhereUniqueWithoutJournalEntryInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvoicePaymentsUpdateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateWithoutJournalEntryInputSchema) ]),
  create: z.union([ z.lazy(() => InvoicePaymentsCreateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedCreateWithoutJournalEntryInputSchema) ]),
}).strict();

export const InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateWithWhereUniqueWithoutJournalEntryInput> = z.object({
  where: z.lazy(() => InvoicePaymentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoicePaymentsUpdateWithoutJournalEntryInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateWithoutJournalEntryInputSchema) ]),
}).strict();

export const InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyWithWhereWithoutJournalEntryInput> = z.object({
  where: z.lazy(() => InvoicePaymentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoicePaymentsUpdateManyMutationInputSchema),z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryInputSchema) ]),
}).strict();

export const JournalEntriesCreateWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesCreateWithoutJournalItemsInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema),
  MemberFundsTransact: z.lazy(() => FundTransactionsCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  Members: z.lazy(() => MembersCreateNestedOneWithoutJournalsInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedCreateWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedCreateWithoutJournalItemsInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  memberId: z.string().optional().nullable(),
  journalType: z.lazy(() => JournalTypeSchema),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedCreateNestedManyWithoutJournalEntriesInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedCreateNestedManyWithoutJournalEntryInputSchema).optional()
}).strict();

export const JournalEntriesCreateOrConnectWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesCreateOrConnectWithoutJournalItemsInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutJournalItemsInputSchema) ]),
}).strict();

export const AccountsThirdLvlCreateWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateWithoutJournalItemsInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  RootID: z.lazy(() => AccountsSecondLvlCreateNestedOneWithoutChildrenInputSchema),
  Dividends: z.lazy(() => DividendsCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedCreateWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedCreateWithoutJournalItemsInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  rootId: z.number().int(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  Dividends: z.lazy(() => DividendsUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountsThirdLvlCreateOrConnectWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateOrConnectWithoutJournalItemsInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutJournalItemsInputSchema) ]),
}).strict();

export const JournalEntriesUpsertWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesUpsertWithoutJournalItemsInput> = z.object({
  update: z.union([ z.lazy(() => JournalEntriesUpdateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutJournalItemsInputSchema) ]),
  create: z.union([ z.lazy(() => JournalEntriesCreateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedCreateWithoutJournalItemsInputSchema) ]),
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional()
}).strict();

export const JournalEntriesUpdateToOneWithWhereWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesUpdateToOneWithWhereWithoutJournalItemsInput> = z.object({
  where: z.lazy(() => JournalEntriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => JournalEntriesUpdateWithoutJournalItemsInputSchema),z.lazy(() => JournalEntriesUncheckedUpdateWithoutJournalItemsInputSchema) ]),
}).strict();

export const JournalEntriesUpdateWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesUpdateWithoutJournalItemsInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  Members: z.lazy(() => MembersUpdateOneWithoutJournalsNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateWithoutJournalItemsInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateWithoutJournalItemsInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUpsertWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpsertWithoutJournalItemsInput> = z.object({
  update: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutJournalItemsInputSchema) ]),
  create: z.union([ z.lazy(() => AccountsThirdLvlCreateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedCreateWithoutJournalItemsInputSchema) ]),
  where: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional()
}).strict();

export const AccountsThirdLvlUpdateToOneWithWhereWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateToOneWithWhereWithoutJournalItemsInput> = z.object({
  where: z.lazy(() => AccountsThirdLvlWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountsThirdLvlUpdateWithoutJournalItemsInputSchema),z.lazy(() => AccountsThirdLvlUncheckedUpdateWithoutJournalItemsInputSchema) ]),
}).strict();

export const AccountsThirdLvlUpdateWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateWithoutJournalItemsInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  RootID: z.lazy(() => AccountsSecondLvlUpdateOneRequiredWithoutChildrenNestedInputSchema).optional(),
  Dividends: z.lazy(() => DividendsUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedUpdateWithoutJournalItemsInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateWithoutJournalItemsInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rootId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const DividendsCreateManyMembersInputSchema: z.ZodType<Prisma.DividendsCreateManyMembersInput> = z.object({
  dividendId: z.bigint().optional(),
  accountId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const InvoiceCreateManyMembersInputSchema: z.ZodType<Prisma.InvoiceCreateManyMembersInput> = z.object({
  invoiceId: z.bigint().optional(),
  dateOfInvoice: z.coerce.date().optional(),
  baseGrandTotal: z.number(),
  outStandingAmt: z.number(),
  journalId: z.bigint().optional().nullable()
}).strict();

export const JournalEntriesCreateManyMembersInputSchema: z.ZodType<Prisma.JournalEntriesCreateManyMembersInput> = z.object({
  entryId: z.bigint().optional(),
  entryDate: z.coerce.date(),
  referenceName: z.string(),
  referenceType: z.lazy(() => ReferenceTypeSchema),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  journalType: z.lazy(() => JournalTypeSchema)
}).strict();

export const DividendsUpdateWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUpdateWithoutMembersInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  account: z.lazy(() => AccountsThirdLvlUpdateOneRequiredWithoutDividendsNestedInputSchema).optional()
}).strict();

export const DividendsUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateWithoutMembersInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateManyWithoutMembersInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceUpdateWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUpdateWithoutMembersInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUpdateManyWithoutInvoiceNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateWithoutMembersInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  InvoiceItems: z.lazy(() => InvoiceItemsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutInvoiceNestedInputSchema).optional()
}).strict();

export const InvoiceUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.InvoiceUncheckedUpdateManyWithoutMembersInput> = z.object({
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  dateOfInvoice: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  baseGrandTotal: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  outStandingAmt: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JournalEntriesUpdateWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUpdateWithoutMembersInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateWithoutMembersInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  MemberFundsTransact: z.lazy(() => FundTransactionsUncheckedUpdateManyWithoutJournalEntriesNestedInputSchema).optional(),
  InvoicePayments: z.lazy(() => InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryNestedInputSchema).optional()
}).strict();

export const JournalEntriesUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.JournalEntriesUncheckedUpdateManyWithoutMembersInput> = z.object({
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  referenceName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  referenceType: z.union([ z.lazy(() => ReferenceTypeSchema),z.lazy(() => EnumReferenceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  journalType: z.union([ z.lazy(() => JournalTypeSchema),z.lazy(() => EnumJournalTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsCreateManyMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsCreateManyMemberFundsInput> = z.object({
  fundTransactId: z.number().int().optional(),
  ledgerId: z.bigint().optional().nullable(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const FundTransactionsUpdateWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUpdateWithoutMemberFundsInput> = z.object({
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntries: z.lazy(() => JournalEntriesUpdateOneWithoutMemberFundsTransactNestedInputSchema).optional()
}).strict();

export const FundTransactionsUncheckedUpdateWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateWithoutMemberFundsInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ledgerId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsUncheckedUpdateManyWithoutMemberFundsInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateManyWithoutMemberFundsInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ledgerId: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsCreateManyInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsCreateManyInvoiceInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  itemID: z.string(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoicePaymentsCreateManyInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyInvoiceInput> = z.object({
  paymentId: z.bigint().optional(),
  orNo: z.string(),
  paymentReceived: z.number(),
  journalRef: z.bigint(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const InvoiceItemsUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateWithoutInvoiceInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Item: z.lazy(() => ItemsUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema).optional()
}).strict();

export const InvoiceItemsUncheckedUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateWithoutInvoiceInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  itemID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsUncheckedUpdateManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateManyWithoutInvoiceInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  itemID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateWithoutInvoiceInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntry: z.lazy(() => JournalEntriesUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema).optional()
}).strict();

export const InvoicePaymentsUncheckedUpdateWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateWithoutInvoiceInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalRef: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedUpdateManyWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateManyWithoutInvoiceInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  journalRef: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsCreateManyItemInputSchema: z.ZodType<Prisma.InvoiceItemsCreateManyItemInput> = z.object({
  invoiceItemId: z.bigint().optional(),
  invoiceId: z.bigint(),
  rate: z.number().int(),
  trade: z.number().int().optional().nullable(),
  quantity: z.number().int()
}).strict();

export const InvoiceItemsUpdateWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUpdateWithoutItemInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Invoice: z.lazy(() => InvoiceUpdateOneRequiredWithoutInvoiceItemsNestedInputSchema).optional()
}).strict();

export const InvoiceItemsUncheckedUpdateWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateWithoutItemInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoiceItemsUncheckedUpdateManyWithoutItemInputSchema: z.ZodType<Prisma.InvoiceItemsUncheckedUpdateManyWithoutItemInput> = z.object({
  invoiceItemId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  rate: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trade: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountsThirdLvlCreateManyRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlCreateManyRootIDInput> = z.object({
  accountId: z.string().cuid().optional(),
  accountName: z.string(),
  openingBalance: z.number(),
  runningBalance: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional()
}).strict();

export const AccountsThirdLvlUpdateWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateWithoutRootIDInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsUpdateManyWithoutAccountNestedInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedUpdateWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateWithoutRootIDInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Dividends: z.lazy(() => DividendsUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
  JournalItems: z.lazy(() => JournalItemsUncheckedUpdateManyWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountsThirdLvlUncheckedUpdateManyWithoutRootIDInputSchema: z.ZodType<Prisma.AccountsThirdLvlUncheckedUpdateManyWithoutRootIDInput> = z.object({
  accountId: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  openingBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  runningBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsCreateManyAccountInputSchema: z.ZodType<Prisma.DividendsCreateManyAccountInput> = z.object({
  dividendId: z.bigint().optional(),
  memberId: z.string(),
  datePosted: z.coerce.date().optional(),
  amount: z.number()
}).strict();

export const JournalItemsCreateManyAccountsInputSchema: z.ZodType<Prisma.JournalItemsCreateManyAccountsInput> = z.object({
  journalItemsId: z.bigint().optional(),
  entryId: z.bigint(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const DividendsUpdateWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUpdateWithoutAccountInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => MembersUpdateOneRequiredWithoutDividendsNestedInputSchema).optional()
}).strict();

export const DividendsUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateWithoutAccountInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DividendsUncheckedUpdateManyWithoutAccountInputSchema: z.ZodType<Prisma.DividendsUncheckedUpdateManyWithoutAccountInput> = z.object({
  dividendId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  memberId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  datePosted: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUpdateWithoutAccountsInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  JournalEntries: z.lazy(() => JournalEntriesUpdateOneRequiredWithoutJournalItemsNestedInputSchema).optional()
}).strict();

export const JournalItemsUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateWithoutAccountsInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateManyWithoutAccountsInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsCreateManyJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsCreateManyJournalEntriesInput> = z.object({
  journalItemsId: z.bigint().optional(),
  accountId: z.string(),
  debit: z.number(),
  credit: z.number()
}).strict();

export const FundTransactionsCreateManyJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsCreateManyJournalEntriesInput> = z.object({
  fundTransactId: z.number().int().optional(),
  fundId: z.number().int(),
  fundType: z.lazy(() => FundTypeSchema),
  transactionType: z.lazy(() => FundTransactionsTypeSchema),
  createdAt: z.coerce.date().optional(),
  postedBalance: z.number()
}).strict();

export const InvoicePaymentsCreateManyJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyJournalEntryInput> = z.object({
  paymentId: z.bigint().optional(),
  invoiceId: z.bigint(),
  orNo: z.string(),
  paymentReceived: z.number(),
  paymentDate: z.coerce.date().optional()
}).strict();

export const JournalItemsUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUpdateWithoutJournalEntriesInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  Accounts: z.lazy(() => AccountsThirdLvlUpdateOneRequiredWithoutJournalItemsNestedInputSchema).optional()
}).strict();

export const JournalItemsUncheckedUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateWithoutJournalEntriesInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JournalItemsUncheckedUpdateManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.JournalItemsUncheckedUpdateManyWithoutJournalEntriesInput> = z.object({
  journalItemsId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  debit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  credit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUpdateWithoutJournalEntriesInput> = z.object({
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  MemberFunds: z.lazy(() => MemberFundsUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const FundTransactionsUncheckedUpdateWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateWithoutJournalEntriesInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FundTransactionsUncheckedUpdateManyWithoutJournalEntriesInputSchema: z.ZodType<Prisma.FundTransactionsUncheckedUpdateManyWithoutJournalEntriesInput> = z.object({
  fundTransactId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fundType: z.union([ z.lazy(() => FundTypeSchema),z.lazy(() => EnumFundTypeFieldUpdateOperationsInputSchema) ]).optional(),
  transactionType: z.union([ z.lazy(() => FundTransactionsTypeSchema),z.lazy(() => EnumFundTransactionsTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postedBalance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUpdateWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUpdateWithoutJournalEntryInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Invoice: z.lazy(() => InvoiceUpdateOneRequiredWithoutInvoicePaymentsNestedInputSchema).optional()
}).strict();

export const InvoicePaymentsUncheckedUpdateWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateWithoutJournalEntryInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryInputSchema: z.ZodType<Prisma.InvoicePaymentsUncheckedUpdateManyWithoutJournalEntryInput> = z.object({
  paymentId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  invoiceId: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  orNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  paymentReceived: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paymentDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MembersFindFirstArgsSchema: z.ZodType<Prisma.MembersFindFirstArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembersScalarFieldEnumSchema,MembersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MembersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MembersFindFirstOrThrowArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembersScalarFieldEnumSchema,MembersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MembersFindManyArgsSchema: z.ZodType<Prisma.MembersFindManyArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MembersScalarFieldEnumSchema,MembersScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MembersAggregateArgsSchema: z.ZodType<Prisma.MembersAggregateArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithRelationInputSchema.array(),MembersOrderByWithRelationInputSchema ]).optional(),
  cursor: MembersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MembersGroupByArgsSchema: z.ZodType<Prisma.MembersGroupByArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
  orderBy: z.union([ MembersOrderByWithAggregationInputSchema.array(),MembersOrderByWithAggregationInputSchema ]).optional(),
  by: MembersScalarFieldEnumSchema.array(),
  having: MembersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MembersFindUniqueArgsSchema: z.ZodType<Prisma.MembersFindUniqueArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
}).strict() ;

export const MembersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MembersFindUniqueOrThrowArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
}).strict() ;

export const MemberFundsFindFirstArgsSchema: z.ZodType<Prisma.MemberFundsFindFirstArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereInputSchema.optional(),
  orderBy: z.union([ MemberFundsOrderByWithRelationInputSchema.array(),MemberFundsOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberFundsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberFundsScalarFieldEnumSchema,MemberFundsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFundsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MemberFundsFindFirstOrThrowArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereInputSchema.optional(),
  orderBy: z.union([ MemberFundsOrderByWithRelationInputSchema.array(),MemberFundsOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberFundsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberFundsScalarFieldEnumSchema,MemberFundsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFundsFindManyArgsSchema: z.ZodType<Prisma.MemberFundsFindManyArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereInputSchema.optional(),
  orderBy: z.union([ MemberFundsOrderByWithRelationInputSchema.array(),MemberFundsOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberFundsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberFundsScalarFieldEnumSchema,MemberFundsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFundsAggregateArgsSchema: z.ZodType<Prisma.MemberFundsAggregateArgs> = z.object({
  where: MemberFundsWhereInputSchema.optional(),
  orderBy: z.union([ MemberFundsOrderByWithRelationInputSchema.array(),MemberFundsOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberFundsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberFundsGroupByArgsSchema: z.ZodType<Prisma.MemberFundsGroupByArgs> = z.object({
  where: MemberFundsWhereInputSchema.optional(),
  orderBy: z.union([ MemberFundsOrderByWithAggregationInputSchema.array(),MemberFundsOrderByWithAggregationInputSchema ]).optional(),
  by: MemberFundsScalarFieldEnumSchema.array(),
  having: MemberFundsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberFundsFindUniqueArgsSchema: z.ZodType<Prisma.MemberFundsFindUniqueArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereUniqueInputSchema,
}).strict() ;

export const MemberFundsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MemberFundsFindUniqueOrThrowArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereUniqueInputSchema,
}).strict() ;

export const FundTransactionsFindFirstArgsSchema: z.ZodType<Prisma.FundTransactionsFindFirstArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereInputSchema.optional(),
  orderBy: z.union([ FundTransactionsOrderByWithRelationInputSchema.array(),FundTransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FundTransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundTransactionsScalarFieldEnumSchema,FundTransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundTransactionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FundTransactionsFindFirstOrThrowArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereInputSchema.optional(),
  orderBy: z.union([ FundTransactionsOrderByWithRelationInputSchema.array(),FundTransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FundTransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundTransactionsScalarFieldEnumSchema,FundTransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundTransactionsFindManyArgsSchema: z.ZodType<Prisma.FundTransactionsFindManyArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereInputSchema.optional(),
  orderBy: z.union([ FundTransactionsOrderByWithRelationInputSchema.array(),FundTransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FundTransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FundTransactionsScalarFieldEnumSchema,FundTransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FundTransactionsAggregateArgsSchema: z.ZodType<Prisma.FundTransactionsAggregateArgs> = z.object({
  where: FundTransactionsWhereInputSchema.optional(),
  orderBy: z.union([ FundTransactionsOrderByWithRelationInputSchema.array(),FundTransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: FundTransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundTransactionsGroupByArgsSchema: z.ZodType<Prisma.FundTransactionsGroupByArgs> = z.object({
  where: FundTransactionsWhereInputSchema.optional(),
  orderBy: z.union([ FundTransactionsOrderByWithAggregationInputSchema.array(),FundTransactionsOrderByWithAggregationInputSchema ]).optional(),
  by: FundTransactionsScalarFieldEnumSchema.array(),
  having: FundTransactionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FundTransactionsFindUniqueArgsSchema: z.ZodType<Prisma.FundTransactionsFindUniqueArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereUniqueInputSchema,
}).strict() ;

export const FundTransactionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FundTransactionsFindUniqueOrThrowArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereUniqueInputSchema,
}).strict() ;

export const InvoiceFindFirstArgsSchema: z.ZodType<Prisma.InvoiceFindFirstArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoiceFindFirstOrThrowArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceFindManyArgsSchema: z.ZodType<Prisma.InvoiceFindManyArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema,InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceAggregateArgsSchema: z.ZodType<Prisma.InvoiceAggregateArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(),InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceGroupByArgsSchema: z.ZodType<Prisma.InvoiceGroupByArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceOrderByWithAggregationInputSchema.array(),InvoiceOrderByWithAggregationInputSchema ]).optional(),
  by: InvoiceScalarFieldEnumSchema.array(),
  having: InvoiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceFindUniqueArgsSchema: z.ZodType<Prisma.InvoiceFindUniqueArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvoiceFindUniqueOrThrowArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceItemsFindFirstArgsSchema: z.ZodType<Prisma.InvoiceItemsFindFirstArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceItemsOrderByWithRelationInputSchema.array(),InvoiceItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceItemsScalarFieldEnumSchema,InvoiceItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoiceItemsFindFirstOrThrowArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceItemsOrderByWithRelationInputSchema.array(),InvoiceItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceItemsScalarFieldEnumSchema,InvoiceItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceItemsFindManyArgsSchema: z.ZodType<Prisma.InvoiceItemsFindManyArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceItemsOrderByWithRelationInputSchema.array(),InvoiceItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceItemsScalarFieldEnumSchema,InvoiceItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoiceItemsAggregateArgsSchema: z.ZodType<Prisma.InvoiceItemsAggregateArgs> = z.object({
  where: InvoiceItemsWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceItemsOrderByWithRelationInputSchema.array(),InvoiceItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceItemsGroupByArgsSchema: z.ZodType<Prisma.InvoiceItemsGroupByArgs> = z.object({
  where: InvoiceItemsWhereInputSchema.optional(),
  orderBy: z.union([ InvoiceItemsOrderByWithAggregationInputSchema.array(),InvoiceItemsOrderByWithAggregationInputSchema ]).optional(),
  by: InvoiceItemsScalarFieldEnumSchema.array(),
  having: InvoiceItemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoiceItemsFindUniqueArgsSchema: z.ZodType<Prisma.InvoiceItemsFindUniqueArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereUniqueInputSchema,
}).strict() ;

export const InvoiceItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvoiceItemsFindUniqueOrThrowArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereUniqueInputSchema,
}).strict() ;

export const InvoicePaymentsFindFirstArgsSchema: z.ZodType<Prisma.InvoicePaymentsFindFirstArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereInputSchema.optional(),
  orderBy: z.union([ InvoicePaymentsOrderByWithRelationInputSchema.array(),InvoicePaymentsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicePaymentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicePaymentsScalarFieldEnumSchema,InvoicePaymentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicePaymentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoicePaymentsFindFirstOrThrowArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereInputSchema.optional(),
  orderBy: z.union([ InvoicePaymentsOrderByWithRelationInputSchema.array(),InvoicePaymentsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicePaymentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicePaymentsScalarFieldEnumSchema,InvoicePaymentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicePaymentsFindManyArgsSchema: z.ZodType<Prisma.InvoicePaymentsFindManyArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereInputSchema.optional(),
  orderBy: z.union([ InvoicePaymentsOrderByWithRelationInputSchema.array(),InvoicePaymentsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicePaymentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoicePaymentsScalarFieldEnumSchema,InvoicePaymentsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvoicePaymentsAggregateArgsSchema: z.ZodType<Prisma.InvoicePaymentsAggregateArgs> = z.object({
  where: InvoicePaymentsWhereInputSchema.optional(),
  orderBy: z.union([ InvoicePaymentsOrderByWithRelationInputSchema.array(),InvoicePaymentsOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoicePaymentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoicePaymentsGroupByArgsSchema: z.ZodType<Prisma.InvoicePaymentsGroupByArgs> = z.object({
  where: InvoicePaymentsWhereInputSchema.optional(),
  orderBy: z.union([ InvoicePaymentsOrderByWithAggregationInputSchema.array(),InvoicePaymentsOrderByWithAggregationInputSchema ]).optional(),
  by: InvoicePaymentsScalarFieldEnumSchema.array(),
  having: InvoicePaymentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvoicePaymentsFindUniqueArgsSchema: z.ZodType<Prisma.InvoicePaymentsFindUniqueArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereUniqueInputSchema,
}).strict() ;

export const InvoicePaymentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvoicePaymentsFindUniqueOrThrowArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereUniqueInputSchema,
}).strict() ;

export const ItemsFindFirstArgsSchema: z.ZodType<Prisma.ItemsFindFirstArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindFirstOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsFindManyArgsSchema: z.ZodType<Prisma.ItemsFindManyArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItemsScalarFieldEnumSchema,ItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItemsAggregateArgsSchema: z.ZodType<Prisma.ItemsAggregateArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithRelationInputSchema.array(),ItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: ItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemsGroupByArgsSchema: z.ZodType<Prisma.ItemsGroupByArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
  orderBy: z.union([ ItemsOrderByWithAggregationInputSchema.array(),ItemsOrderByWithAggregationInputSchema ]).optional(),
  by: ItemsScalarFieldEnumSchema.array(),
  having: ItemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItemsFindUniqueArgsSchema: z.ZodType<Prisma.ItemsFindUniqueArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() ;

export const ItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItemsFindUniqueOrThrowArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() ;

export const AccountsSecondLvlFindFirstArgsSchema: z.ZodType<Prisma.AccountsSecondLvlFindFirstArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsSecondLvlOrderByWithRelationInputSchema.array(),AccountsSecondLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsSecondLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsSecondLvlScalarFieldEnumSchema,AccountsSecondLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsSecondLvlFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountsSecondLvlFindFirstOrThrowArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsSecondLvlOrderByWithRelationInputSchema.array(),AccountsSecondLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsSecondLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsSecondLvlScalarFieldEnumSchema,AccountsSecondLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsSecondLvlFindManyArgsSchema: z.ZodType<Prisma.AccountsSecondLvlFindManyArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsSecondLvlOrderByWithRelationInputSchema.array(),AccountsSecondLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsSecondLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsSecondLvlScalarFieldEnumSchema,AccountsSecondLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsSecondLvlAggregateArgsSchema: z.ZodType<Prisma.AccountsSecondLvlAggregateArgs> = z.object({
  where: AccountsSecondLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsSecondLvlOrderByWithRelationInputSchema.array(),AccountsSecondLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsSecondLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountsSecondLvlGroupByArgsSchema: z.ZodType<Prisma.AccountsSecondLvlGroupByArgs> = z.object({
  where: AccountsSecondLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsSecondLvlOrderByWithAggregationInputSchema.array(),AccountsSecondLvlOrderByWithAggregationInputSchema ]).optional(),
  by: AccountsSecondLvlScalarFieldEnumSchema.array(),
  having: AccountsSecondLvlScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountsSecondLvlFindUniqueArgsSchema: z.ZodType<Prisma.AccountsSecondLvlFindUniqueArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsSecondLvlFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountsSecondLvlFindUniqueOrThrowArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsThirdLvlFindFirstArgsSchema: z.ZodType<Prisma.AccountsThirdLvlFindFirstArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsThirdLvlOrderByWithRelationInputSchema.array(),AccountsThirdLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsThirdLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsThirdLvlScalarFieldEnumSchema,AccountsThirdLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsThirdLvlFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountsThirdLvlFindFirstOrThrowArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsThirdLvlOrderByWithRelationInputSchema.array(),AccountsThirdLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsThirdLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsThirdLvlScalarFieldEnumSchema,AccountsThirdLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsThirdLvlFindManyArgsSchema: z.ZodType<Prisma.AccountsThirdLvlFindManyArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsThirdLvlOrderByWithRelationInputSchema.array(),AccountsThirdLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsThirdLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountsThirdLvlScalarFieldEnumSchema,AccountsThirdLvlScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountsThirdLvlAggregateArgsSchema: z.ZodType<Prisma.AccountsThirdLvlAggregateArgs> = z.object({
  where: AccountsThirdLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsThirdLvlOrderByWithRelationInputSchema.array(),AccountsThirdLvlOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountsThirdLvlWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountsThirdLvlGroupByArgsSchema: z.ZodType<Prisma.AccountsThirdLvlGroupByArgs> = z.object({
  where: AccountsThirdLvlWhereInputSchema.optional(),
  orderBy: z.union([ AccountsThirdLvlOrderByWithAggregationInputSchema.array(),AccountsThirdLvlOrderByWithAggregationInputSchema ]).optional(),
  by: AccountsThirdLvlScalarFieldEnumSchema.array(),
  having: AccountsThirdLvlScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountsThirdLvlFindUniqueArgsSchema: z.ZodType<Prisma.AccountsThirdLvlFindUniqueArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsThirdLvlFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountsThirdLvlFindUniqueOrThrowArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereUniqueInputSchema,
}).strict() ;

export const DividendsFindFirstArgsSchema: z.ZodType<Prisma.DividendsFindFirstArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereInputSchema.optional(),
  orderBy: z.union([ DividendsOrderByWithRelationInputSchema.array(),DividendsOrderByWithRelationInputSchema ]).optional(),
  cursor: DividendsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DividendsScalarFieldEnumSchema,DividendsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DividendsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DividendsFindFirstOrThrowArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereInputSchema.optional(),
  orderBy: z.union([ DividendsOrderByWithRelationInputSchema.array(),DividendsOrderByWithRelationInputSchema ]).optional(),
  cursor: DividendsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DividendsScalarFieldEnumSchema,DividendsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DividendsFindManyArgsSchema: z.ZodType<Prisma.DividendsFindManyArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereInputSchema.optional(),
  orderBy: z.union([ DividendsOrderByWithRelationInputSchema.array(),DividendsOrderByWithRelationInputSchema ]).optional(),
  cursor: DividendsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DividendsScalarFieldEnumSchema,DividendsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DividendsAggregateArgsSchema: z.ZodType<Prisma.DividendsAggregateArgs> = z.object({
  where: DividendsWhereInputSchema.optional(),
  orderBy: z.union([ DividendsOrderByWithRelationInputSchema.array(),DividendsOrderByWithRelationInputSchema ]).optional(),
  cursor: DividendsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DividendsGroupByArgsSchema: z.ZodType<Prisma.DividendsGroupByArgs> = z.object({
  where: DividendsWhereInputSchema.optional(),
  orderBy: z.union([ DividendsOrderByWithAggregationInputSchema.array(),DividendsOrderByWithAggregationInputSchema ]).optional(),
  by: DividendsScalarFieldEnumSchema.array(),
  having: DividendsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DividendsFindUniqueArgsSchema: z.ZodType<Prisma.DividendsFindUniqueArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereUniqueInputSchema,
}).strict() ;

export const DividendsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DividendsFindUniqueOrThrowArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereUniqueInputSchema,
}).strict() ;

export const SavingsTransactFindFirstArgsSchema: z.ZodType<Prisma.SavingsTransactFindFirstArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereInputSchema.optional(),
  orderBy: z.union([ SavingsTransactOrderByWithRelationInputSchema.array(),SavingsTransactOrderByWithRelationInputSchema ]).optional(),
  cursor: SavingsTransactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SavingsTransactScalarFieldEnumSchema,SavingsTransactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SavingsTransactFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SavingsTransactFindFirstOrThrowArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereInputSchema.optional(),
  orderBy: z.union([ SavingsTransactOrderByWithRelationInputSchema.array(),SavingsTransactOrderByWithRelationInputSchema ]).optional(),
  cursor: SavingsTransactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SavingsTransactScalarFieldEnumSchema,SavingsTransactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SavingsTransactFindManyArgsSchema: z.ZodType<Prisma.SavingsTransactFindManyArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereInputSchema.optional(),
  orderBy: z.union([ SavingsTransactOrderByWithRelationInputSchema.array(),SavingsTransactOrderByWithRelationInputSchema ]).optional(),
  cursor: SavingsTransactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SavingsTransactScalarFieldEnumSchema,SavingsTransactScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SavingsTransactAggregateArgsSchema: z.ZodType<Prisma.SavingsTransactAggregateArgs> = z.object({
  where: SavingsTransactWhereInputSchema.optional(),
  orderBy: z.union([ SavingsTransactOrderByWithRelationInputSchema.array(),SavingsTransactOrderByWithRelationInputSchema ]).optional(),
  cursor: SavingsTransactWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SavingsTransactGroupByArgsSchema: z.ZodType<Prisma.SavingsTransactGroupByArgs> = z.object({
  where: SavingsTransactWhereInputSchema.optional(),
  orderBy: z.union([ SavingsTransactOrderByWithAggregationInputSchema.array(),SavingsTransactOrderByWithAggregationInputSchema ]).optional(),
  by: SavingsTransactScalarFieldEnumSchema.array(),
  having: SavingsTransactScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SavingsTransactFindUniqueArgsSchema: z.ZodType<Prisma.SavingsTransactFindUniqueArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereUniqueInputSchema,
}).strict() ;

export const SavingsTransactFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SavingsTransactFindUniqueOrThrowArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereUniqueInputSchema,
}).strict() ;

export const JournalEntriesFindFirstArgsSchema: z.ZodType<Prisma.JournalEntriesFindFirstArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereInputSchema.optional(),
  orderBy: z.union([ JournalEntriesOrderByWithRelationInputSchema.array(),JournalEntriesOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntriesScalarFieldEnumSchema,JournalEntriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalEntriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JournalEntriesFindFirstOrThrowArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereInputSchema.optional(),
  orderBy: z.union([ JournalEntriesOrderByWithRelationInputSchema.array(),JournalEntriesOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntriesScalarFieldEnumSchema,JournalEntriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalEntriesFindManyArgsSchema: z.ZodType<Prisma.JournalEntriesFindManyArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereInputSchema.optional(),
  orderBy: z.union([ JournalEntriesOrderByWithRelationInputSchema.array(),JournalEntriesOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalEntriesScalarFieldEnumSchema,JournalEntriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalEntriesAggregateArgsSchema: z.ZodType<Prisma.JournalEntriesAggregateArgs> = z.object({
  where: JournalEntriesWhereInputSchema.optional(),
  orderBy: z.union([ JournalEntriesOrderByWithRelationInputSchema.array(),JournalEntriesOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalEntriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JournalEntriesGroupByArgsSchema: z.ZodType<Prisma.JournalEntriesGroupByArgs> = z.object({
  where: JournalEntriesWhereInputSchema.optional(),
  orderBy: z.union([ JournalEntriesOrderByWithAggregationInputSchema.array(),JournalEntriesOrderByWithAggregationInputSchema ]).optional(),
  by: JournalEntriesScalarFieldEnumSchema.array(),
  having: JournalEntriesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JournalEntriesFindUniqueArgsSchema: z.ZodType<Prisma.JournalEntriesFindUniqueArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereUniqueInputSchema,
}).strict() ;

export const JournalEntriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JournalEntriesFindUniqueOrThrowArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereUniqueInputSchema,
}).strict() ;

export const JournalItemsFindFirstArgsSchema: z.ZodType<Prisma.JournalItemsFindFirstArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereInputSchema.optional(),
  orderBy: z.union([ JournalItemsOrderByWithRelationInputSchema.array(),JournalItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalItemsScalarFieldEnumSchema,JournalItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JournalItemsFindFirstOrThrowArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereInputSchema.optional(),
  orderBy: z.union([ JournalItemsOrderByWithRelationInputSchema.array(),JournalItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalItemsScalarFieldEnumSchema,JournalItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalItemsFindManyArgsSchema: z.ZodType<Prisma.JournalItemsFindManyArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereInputSchema.optional(),
  orderBy: z.union([ JournalItemsOrderByWithRelationInputSchema.array(),JournalItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JournalItemsScalarFieldEnumSchema,JournalItemsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const JournalItemsAggregateArgsSchema: z.ZodType<Prisma.JournalItemsAggregateArgs> = z.object({
  where: JournalItemsWhereInputSchema.optional(),
  orderBy: z.union([ JournalItemsOrderByWithRelationInputSchema.array(),JournalItemsOrderByWithRelationInputSchema ]).optional(),
  cursor: JournalItemsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JournalItemsGroupByArgsSchema: z.ZodType<Prisma.JournalItemsGroupByArgs> = z.object({
  where: JournalItemsWhereInputSchema.optional(),
  orderBy: z.union([ JournalItemsOrderByWithAggregationInputSchema.array(),JournalItemsOrderByWithAggregationInputSchema ]).optional(),
  by: JournalItemsScalarFieldEnumSchema.array(),
  having: JournalItemsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const JournalItemsFindUniqueArgsSchema: z.ZodType<Prisma.JournalItemsFindUniqueArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereUniqueInputSchema,
}).strict() ;

export const JournalItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JournalItemsFindUniqueOrThrowArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereUniqueInputSchema,
}).strict() ;

export const MembersCreateArgsSchema: z.ZodType<Prisma.MembersCreateArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  data: z.union([ MembersCreateInputSchema,MembersUncheckedCreateInputSchema ]),
}).strict() ;

export const MembersUpsertArgsSchema: z.ZodType<Prisma.MembersUpsertArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
  create: z.union([ MembersCreateInputSchema,MembersUncheckedCreateInputSchema ]),
  update: z.union([ MembersUpdateInputSchema,MembersUncheckedUpdateInputSchema ]),
}).strict() ;

export const MembersCreateManyArgsSchema: z.ZodType<Prisma.MembersCreateManyArgs> = z.object({
  data: z.union([ MembersCreateManyInputSchema,MembersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MembersCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MembersCreateManyAndReturnArgs> = z.object({
  data: z.union([ MembersCreateManyInputSchema,MembersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MembersDeleteArgsSchema: z.ZodType<Prisma.MembersDeleteArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  where: MembersWhereUniqueInputSchema,
}).strict() ;

export const MembersUpdateArgsSchema: z.ZodType<Prisma.MembersUpdateArgs> = z.object({
  select: MembersSelectSchema.optional(),
  include: MembersIncludeSchema.optional(),
  data: z.union([ MembersUpdateInputSchema,MembersUncheckedUpdateInputSchema ]),
  where: MembersWhereUniqueInputSchema,
}).strict() ;

export const MembersUpdateManyArgsSchema: z.ZodType<Prisma.MembersUpdateManyArgs> = z.object({
  data: z.union([ MembersUpdateManyMutationInputSchema,MembersUncheckedUpdateManyInputSchema ]),
  where: MembersWhereInputSchema.optional(),
}).strict() ;

export const MembersDeleteManyArgsSchema: z.ZodType<Prisma.MembersDeleteManyArgs> = z.object({
  where: MembersWhereInputSchema.optional(),
}).strict() ;

export const MemberFundsCreateArgsSchema: z.ZodType<Prisma.MemberFundsCreateArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  data: z.union([ MemberFundsCreateInputSchema,MemberFundsUncheckedCreateInputSchema ]),
}).strict() ;

export const MemberFundsUpsertArgsSchema: z.ZodType<Prisma.MemberFundsUpsertArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereUniqueInputSchema,
  create: z.union([ MemberFundsCreateInputSchema,MemberFundsUncheckedCreateInputSchema ]),
  update: z.union([ MemberFundsUpdateInputSchema,MemberFundsUncheckedUpdateInputSchema ]),
}).strict() ;

export const MemberFundsCreateManyArgsSchema: z.ZodType<Prisma.MemberFundsCreateManyArgs> = z.object({
  data: z.union([ MemberFundsCreateManyInputSchema,MemberFundsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MemberFundsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MemberFundsCreateManyAndReturnArgs> = z.object({
  data: z.union([ MemberFundsCreateManyInputSchema,MemberFundsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MemberFundsDeleteArgsSchema: z.ZodType<Prisma.MemberFundsDeleteArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  where: MemberFundsWhereUniqueInputSchema,
}).strict() ;

export const MemberFundsUpdateArgsSchema: z.ZodType<Prisma.MemberFundsUpdateArgs> = z.object({
  select: MemberFundsSelectSchema.optional(),
  include: MemberFundsIncludeSchema.optional(),
  data: z.union([ MemberFundsUpdateInputSchema,MemberFundsUncheckedUpdateInputSchema ]),
  where: MemberFundsWhereUniqueInputSchema,
}).strict() ;

export const MemberFundsUpdateManyArgsSchema: z.ZodType<Prisma.MemberFundsUpdateManyArgs> = z.object({
  data: z.union([ MemberFundsUpdateManyMutationInputSchema,MemberFundsUncheckedUpdateManyInputSchema ]),
  where: MemberFundsWhereInputSchema.optional(),
}).strict() ;

export const MemberFundsDeleteManyArgsSchema: z.ZodType<Prisma.MemberFundsDeleteManyArgs> = z.object({
  where: MemberFundsWhereInputSchema.optional(),
}).strict() ;

export const FundTransactionsCreateArgsSchema: z.ZodType<Prisma.FundTransactionsCreateArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  data: z.union([ FundTransactionsCreateInputSchema,FundTransactionsUncheckedCreateInputSchema ]),
}).strict() ;

export const FundTransactionsUpsertArgsSchema: z.ZodType<Prisma.FundTransactionsUpsertArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereUniqueInputSchema,
  create: z.union([ FundTransactionsCreateInputSchema,FundTransactionsUncheckedCreateInputSchema ]),
  update: z.union([ FundTransactionsUpdateInputSchema,FundTransactionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const FundTransactionsCreateManyArgsSchema: z.ZodType<Prisma.FundTransactionsCreateManyArgs> = z.object({
  data: z.union([ FundTransactionsCreateManyInputSchema,FundTransactionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FundTransactionsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FundTransactionsCreateManyAndReturnArgs> = z.object({
  data: z.union([ FundTransactionsCreateManyInputSchema,FundTransactionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FundTransactionsDeleteArgsSchema: z.ZodType<Prisma.FundTransactionsDeleteArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  where: FundTransactionsWhereUniqueInputSchema,
}).strict() ;

export const FundTransactionsUpdateArgsSchema: z.ZodType<Prisma.FundTransactionsUpdateArgs> = z.object({
  select: FundTransactionsSelectSchema.optional(),
  include: FundTransactionsIncludeSchema.optional(),
  data: z.union([ FundTransactionsUpdateInputSchema,FundTransactionsUncheckedUpdateInputSchema ]),
  where: FundTransactionsWhereUniqueInputSchema,
}).strict() ;

export const FundTransactionsUpdateManyArgsSchema: z.ZodType<Prisma.FundTransactionsUpdateManyArgs> = z.object({
  data: z.union([ FundTransactionsUpdateManyMutationInputSchema,FundTransactionsUncheckedUpdateManyInputSchema ]),
  where: FundTransactionsWhereInputSchema.optional(),
}).strict() ;

export const FundTransactionsDeleteManyArgsSchema: z.ZodType<Prisma.FundTransactionsDeleteManyArgs> = z.object({
  where: FundTransactionsWhereInputSchema.optional(),
}).strict() ;

export const InvoiceCreateArgsSchema: z.ZodType<Prisma.InvoiceCreateArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  data: z.union([ InvoiceCreateInputSchema,InvoiceUncheckedCreateInputSchema ]),
}).strict() ;

export const InvoiceUpsertArgsSchema: z.ZodType<Prisma.InvoiceUpsertArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
  create: z.union([ InvoiceCreateInputSchema,InvoiceUncheckedCreateInputSchema ]),
  update: z.union([ InvoiceUpdateInputSchema,InvoiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvoiceCreateManyArgsSchema: z.ZodType<Prisma.InvoiceCreateManyArgs> = z.object({
  data: z.union([ InvoiceCreateManyInputSchema,InvoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvoiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvoiceCreateManyInputSchema,InvoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoiceDeleteArgsSchema: z.ZodType<Prisma.InvoiceDeleteArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceUpdateArgsSchema: z.ZodType<Prisma.InvoiceUpdateArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: InvoiceIncludeSchema.optional(),
  data: z.union([ InvoiceUpdateInputSchema,InvoiceUncheckedUpdateInputSchema ]),
  where: InvoiceWhereUniqueInputSchema,
}).strict() ;

export const InvoiceUpdateManyArgsSchema: z.ZodType<Prisma.InvoiceUpdateManyArgs> = z.object({
  data: z.union([ InvoiceUpdateManyMutationInputSchema,InvoiceUncheckedUpdateManyInputSchema ]),
  where: InvoiceWhereInputSchema.optional(),
}).strict() ;

export const InvoiceDeleteManyArgsSchema: z.ZodType<Prisma.InvoiceDeleteManyArgs> = z.object({
  where: InvoiceWhereInputSchema.optional(),
}).strict() ;

export const InvoiceItemsCreateArgsSchema: z.ZodType<Prisma.InvoiceItemsCreateArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  data: z.union([ InvoiceItemsCreateInputSchema,InvoiceItemsUncheckedCreateInputSchema ]),
}).strict() ;

export const InvoiceItemsUpsertArgsSchema: z.ZodType<Prisma.InvoiceItemsUpsertArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereUniqueInputSchema,
  create: z.union([ InvoiceItemsCreateInputSchema,InvoiceItemsUncheckedCreateInputSchema ]),
  update: z.union([ InvoiceItemsUpdateInputSchema,InvoiceItemsUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvoiceItemsCreateManyArgsSchema: z.ZodType<Prisma.InvoiceItemsCreateManyArgs> = z.object({
  data: z.union([ InvoiceItemsCreateManyInputSchema,InvoiceItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoiceItemsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvoiceItemsCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvoiceItemsCreateManyInputSchema,InvoiceItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoiceItemsDeleteArgsSchema: z.ZodType<Prisma.InvoiceItemsDeleteArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  where: InvoiceItemsWhereUniqueInputSchema,
}).strict() ;

export const InvoiceItemsUpdateArgsSchema: z.ZodType<Prisma.InvoiceItemsUpdateArgs> = z.object({
  select: InvoiceItemsSelectSchema.optional(),
  include: InvoiceItemsIncludeSchema.optional(),
  data: z.union([ InvoiceItemsUpdateInputSchema,InvoiceItemsUncheckedUpdateInputSchema ]),
  where: InvoiceItemsWhereUniqueInputSchema,
}).strict() ;

export const InvoiceItemsUpdateManyArgsSchema: z.ZodType<Prisma.InvoiceItemsUpdateManyArgs> = z.object({
  data: z.union([ InvoiceItemsUpdateManyMutationInputSchema,InvoiceItemsUncheckedUpdateManyInputSchema ]),
  where: InvoiceItemsWhereInputSchema.optional(),
}).strict() ;

export const InvoiceItemsDeleteManyArgsSchema: z.ZodType<Prisma.InvoiceItemsDeleteManyArgs> = z.object({
  where: InvoiceItemsWhereInputSchema.optional(),
}).strict() ;

export const InvoicePaymentsCreateArgsSchema: z.ZodType<Prisma.InvoicePaymentsCreateArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  data: z.union([ InvoicePaymentsCreateInputSchema,InvoicePaymentsUncheckedCreateInputSchema ]),
}).strict() ;

export const InvoicePaymentsUpsertArgsSchema: z.ZodType<Prisma.InvoicePaymentsUpsertArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereUniqueInputSchema,
  create: z.union([ InvoicePaymentsCreateInputSchema,InvoicePaymentsUncheckedCreateInputSchema ]),
  update: z.union([ InvoicePaymentsUpdateInputSchema,InvoicePaymentsUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvoicePaymentsCreateManyArgsSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyArgs> = z.object({
  data: z.union([ InvoicePaymentsCreateManyInputSchema,InvoicePaymentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoicePaymentsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.InvoicePaymentsCreateManyAndReturnArgs> = z.object({
  data: z.union([ InvoicePaymentsCreateManyInputSchema,InvoicePaymentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InvoicePaymentsDeleteArgsSchema: z.ZodType<Prisma.InvoicePaymentsDeleteArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  where: InvoicePaymentsWhereUniqueInputSchema,
}).strict() ;

export const InvoicePaymentsUpdateArgsSchema: z.ZodType<Prisma.InvoicePaymentsUpdateArgs> = z.object({
  select: InvoicePaymentsSelectSchema.optional(),
  include: InvoicePaymentsIncludeSchema.optional(),
  data: z.union([ InvoicePaymentsUpdateInputSchema,InvoicePaymentsUncheckedUpdateInputSchema ]),
  where: InvoicePaymentsWhereUniqueInputSchema,
}).strict() ;

export const InvoicePaymentsUpdateManyArgsSchema: z.ZodType<Prisma.InvoicePaymentsUpdateManyArgs> = z.object({
  data: z.union([ InvoicePaymentsUpdateManyMutationInputSchema,InvoicePaymentsUncheckedUpdateManyInputSchema ]),
  where: InvoicePaymentsWhereInputSchema.optional(),
}).strict() ;

export const InvoicePaymentsDeleteManyArgsSchema: z.ZodType<Prisma.InvoicePaymentsDeleteManyArgs> = z.object({
  where: InvoicePaymentsWhereInputSchema.optional(),
}).strict() ;

export const ItemsCreateArgsSchema: z.ZodType<Prisma.ItemsCreateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  data: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
}).strict() ;

export const ItemsUpsertArgsSchema: z.ZodType<Prisma.ItemsUpsertArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
  create: z.union([ ItemsCreateInputSchema,ItemsUncheckedCreateInputSchema ]),
  update: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItemsCreateManyArgsSchema: z.ZodType<Prisma.ItemsCreateManyArgs> = z.object({
  data: z.union([ ItemsCreateManyInputSchema,ItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItemsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItemsCreateManyAndReturnArgs> = z.object({
  data: z.union([ ItemsCreateManyInputSchema,ItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItemsDeleteArgsSchema: z.ZodType<Prisma.ItemsDeleteArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  where: ItemsWhereUniqueInputSchema,
}).strict() ;

export const ItemsUpdateArgsSchema: z.ZodType<Prisma.ItemsUpdateArgs> = z.object({
  select: ItemsSelectSchema.optional(),
  include: ItemsIncludeSchema.optional(),
  data: z.union([ ItemsUpdateInputSchema,ItemsUncheckedUpdateInputSchema ]),
  where: ItemsWhereUniqueInputSchema,
}).strict() ;

export const ItemsUpdateManyArgsSchema: z.ZodType<Prisma.ItemsUpdateManyArgs> = z.object({
  data: z.union([ ItemsUpdateManyMutationInputSchema,ItemsUncheckedUpdateManyInputSchema ]),
  where: ItemsWhereInputSchema.optional(),
}).strict() ;

export const ItemsDeleteManyArgsSchema: z.ZodType<Prisma.ItemsDeleteManyArgs> = z.object({
  where: ItemsWhereInputSchema.optional(),
}).strict() ;

export const AccountsSecondLvlCreateArgsSchema: z.ZodType<Prisma.AccountsSecondLvlCreateArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  data: z.union([ AccountsSecondLvlCreateInputSchema,AccountsSecondLvlUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountsSecondLvlUpsertArgsSchema: z.ZodType<Prisma.AccountsSecondLvlUpsertArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereUniqueInputSchema,
  create: z.union([ AccountsSecondLvlCreateInputSchema,AccountsSecondLvlUncheckedCreateInputSchema ]),
  update: z.union([ AccountsSecondLvlUpdateInputSchema,AccountsSecondLvlUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountsSecondLvlCreateManyArgsSchema: z.ZodType<Prisma.AccountsSecondLvlCreateManyArgs> = z.object({
  data: z.union([ AccountsSecondLvlCreateManyInputSchema,AccountsSecondLvlCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountsSecondLvlCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountsSecondLvlCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountsSecondLvlCreateManyInputSchema,AccountsSecondLvlCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountsSecondLvlDeleteArgsSchema: z.ZodType<Prisma.AccountsSecondLvlDeleteArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  where: AccountsSecondLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsSecondLvlUpdateArgsSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateArgs> = z.object({
  select: AccountsSecondLvlSelectSchema.optional(),
  include: AccountsSecondLvlIncludeSchema.optional(),
  data: z.union([ AccountsSecondLvlUpdateInputSchema,AccountsSecondLvlUncheckedUpdateInputSchema ]),
  where: AccountsSecondLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsSecondLvlUpdateManyArgsSchema: z.ZodType<Prisma.AccountsSecondLvlUpdateManyArgs> = z.object({
  data: z.union([ AccountsSecondLvlUpdateManyMutationInputSchema,AccountsSecondLvlUncheckedUpdateManyInputSchema ]),
  where: AccountsSecondLvlWhereInputSchema.optional(),
}).strict() ;

export const AccountsSecondLvlDeleteManyArgsSchema: z.ZodType<Prisma.AccountsSecondLvlDeleteManyArgs> = z.object({
  where: AccountsSecondLvlWhereInputSchema.optional(),
}).strict() ;

export const AccountsThirdLvlCreateArgsSchema: z.ZodType<Prisma.AccountsThirdLvlCreateArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  data: z.union([ AccountsThirdLvlCreateInputSchema,AccountsThirdLvlUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountsThirdLvlUpsertArgsSchema: z.ZodType<Prisma.AccountsThirdLvlUpsertArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereUniqueInputSchema,
  create: z.union([ AccountsThirdLvlCreateInputSchema,AccountsThirdLvlUncheckedCreateInputSchema ]),
  update: z.union([ AccountsThirdLvlUpdateInputSchema,AccountsThirdLvlUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountsThirdLvlCreateManyArgsSchema: z.ZodType<Prisma.AccountsThirdLvlCreateManyArgs> = z.object({
  data: z.union([ AccountsThirdLvlCreateManyInputSchema,AccountsThirdLvlCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountsThirdLvlCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountsThirdLvlCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountsThirdLvlCreateManyInputSchema,AccountsThirdLvlCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountsThirdLvlDeleteArgsSchema: z.ZodType<Prisma.AccountsThirdLvlDeleteArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  where: AccountsThirdLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsThirdLvlUpdateArgsSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateArgs> = z.object({
  select: AccountsThirdLvlSelectSchema.optional(),
  include: AccountsThirdLvlIncludeSchema.optional(),
  data: z.union([ AccountsThirdLvlUpdateInputSchema,AccountsThirdLvlUncheckedUpdateInputSchema ]),
  where: AccountsThirdLvlWhereUniqueInputSchema,
}).strict() ;

export const AccountsThirdLvlUpdateManyArgsSchema: z.ZodType<Prisma.AccountsThirdLvlUpdateManyArgs> = z.object({
  data: z.union([ AccountsThirdLvlUpdateManyMutationInputSchema,AccountsThirdLvlUncheckedUpdateManyInputSchema ]),
  where: AccountsThirdLvlWhereInputSchema.optional(),
}).strict() ;

export const AccountsThirdLvlDeleteManyArgsSchema: z.ZodType<Prisma.AccountsThirdLvlDeleteManyArgs> = z.object({
  where: AccountsThirdLvlWhereInputSchema.optional(),
}).strict() ;

export const DividendsCreateArgsSchema: z.ZodType<Prisma.DividendsCreateArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  data: z.union([ DividendsCreateInputSchema,DividendsUncheckedCreateInputSchema ]),
}).strict() ;

export const DividendsUpsertArgsSchema: z.ZodType<Prisma.DividendsUpsertArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereUniqueInputSchema,
  create: z.union([ DividendsCreateInputSchema,DividendsUncheckedCreateInputSchema ]),
  update: z.union([ DividendsUpdateInputSchema,DividendsUncheckedUpdateInputSchema ]),
}).strict() ;

export const DividendsCreateManyArgsSchema: z.ZodType<Prisma.DividendsCreateManyArgs> = z.object({
  data: z.union([ DividendsCreateManyInputSchema,DividendsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DividendsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DividendsCreateManyAndReturnArgs> = z.object({
  data: z.union([ DividendsCreateManyInputSchema,DividendsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DividendsDeleteArgsSchema: z.ZodType<Prisma.DividendsDeleteArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  where: DividendsWhereUniqueInputSchema,
}).strict() ;

export const DividendsUpdateArgsSchema: z.ZodType<Prisma.DividendsUpdateArgs> = z.object({
  select: DividendsSelectSchema.optional(),
  include: DividendsIncludeSchema.optional(),
  data: z.union([ DividendsUpdateInputSchema,DividendsUncheckedUpdateInputSchema ]),
  where: DividendsWhereUniqueInputSchema,
}).strict() ;

export const DividendsUpdateManyArgsSchema: z.ZodType<Prisma.DividendsUpdateManyArgs> = z.object({
  data: z.union([ DividendsUpdateManyMutationInputSchema,DividendsUncheckedUpdateManyInputSchema ]),
  where: DividendsWhereInputSchema.optional(),
}).strict() ;

export const DividendsDeleteManyArgsSchema: z.ZodType<Prisma.DividendsDeleteManyArgs> = z.object({
  where: DividendsWhereInputSchema.optional(),
}).strict() ;

export const SavingsTransactCreateArgsSchema: z.ZodType<Prisma.SavingsTransactCreateArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  data: z.union([ SavingsTransactCreateInputSchema,SavingsTransactUncheckedCreateInputSchema ]),
}).strict() ;

export const SavingsTransactUpsertArgsSchema: z.ZodType<Prisma.SavingsTransactUpsertArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereUniqueInputSchema,
  create: z.union([ SavingsTransactCreateInputSchema,SavingsTransactUncheckedCreateInputSchema ]),
  update: z.union([ SavingsTransactUpdateInputSchema,SavingsTransactUncheckedUpdateInputSchema ]),
}).strict() ;

export const SavingsTransactCreateManyArgsSchema: z.ZodType<Prisma.SavingsTransactCreateManyArgs> = z.object({
  data: z.union([ SavingsTransactCreateManyInputSchema,SavingsTransactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SavingsTransactCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SavingsTransactCreateManyAndReturnArgs> = z.object({
  data: z.union([ SavingsTransactCreateManyInputSchema,SavingsTransactCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SavingsTransactDeleteArgsSchema: z.ZodType<Prisma.SavingsTransactDeleteArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  where: SavingsTransactWhereUniqueInputSchema,
}).strict() ;

export const SavingsTransactUpdateArgsSchema: z.ZodType<Prisma.SavingsTransactUpdateArgs> = z.object({
  select: SavingsTransactSelectSchema.optional(),
  data: z.union([ SavingsTransactUpdateInputSchema,SavingsTransactUncheckedUpdateInputSchema ]),
  where: SavingsTransactWhereUniqueInputSchema,
}).strict() ;

export const SavingsTransactUpdateManyArgsSchema: z.ZodType<Prisma.SavingsTransactUpdateManyArgs> = z.object({
  data: z.union([ SavingsTransactUpdateManyMutationInputSchema,SavingsTransactUncheckedUpdateManyInputSchema ]),
  where: SavingsTransactWhereInputSchema.optional(),
}).strict() ;

export const SavingsTransactDeleteManyArgsSchema: z.ZodType<Prisma.SavingsTransactDeleteManyArgs> = z.object({
  where: SavingsTransactWhereInputSchema.optional(),
}).strict() ;

export const JournalEntriesCreateArgsSchema: z.ZodType<Prisma.JournalEntriesCreateArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  data: z.union([ JournalEntriesCreateInputSchema,JournalEntriesUncheckedCreateInputSchema ]),
}).strict() ;

export const JournalEntriesUpsertArgsSchema: z.ZodType<Prisma.JournalEntriesUpsertArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereUniqueInputSchema,
  create: z.union([ JournalEntriesCreateInputSchema,JournalEntriesUncheckedCreateInputSchema ]),
  update: z.union([ JournalEntriesUpdateInputSchema,JournalEntriesUncheckedUpdateInputSchema ]),
}).strict() ;

export const JournalEntriesCreateManyArgsSchema: z.ZodType<Prisma.JournalEntriesCreateManyArgs> = z.object({
  data: z.union([ JournalEntriesCreateManyInputSchema,JournalEntriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JournalEntriesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JournalEntriesCreateManyAndReturnArgs> = z.object({
  data: z.union([ JournalEntriesCreateManyInputSchema,JournalEntriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JournalEntriesDeleteArgsSchema: z.ZodType<Prisma.JournalEntriesDeleteArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  where: JournalEntriesWhereUniqueInputSchema,
}).strict() ;

export const JournalEntriesUpdateArgsSchema: z.ZodType<Prisma.JournalEntriesUpdateArgs> = z.object({
  select: JournalEntriesSelectSchema.optional(),
  include: JournalEntriesIncludeSchema.optional(),
  data: z.union([ JournalEntriesUpdateInputSchema,JournalEntriesUncheckedUpdateInputSchema ]),
  where: JournalEntriesWhereUniqueInputSchema,
}).strict() ;

export const JournalEntriesUpdateManyArgsSchema: z.ZodType<Prisma.JournalEntriesUpdateManyArgs> = z.object({
  data: z.union([ JournalEntriesUpdateManyMutationInputSchema,JournalEntriesUncheckedUpdateManyInputSchema ]),
  where: JournalEntriesWhereInputSchema.optional(),
}).strict() ;

export const JournalEntriesDeleteManyArgsSchema: z.ZodType<Prisma.JournalEntriesDeleteManyArgs> = z.object({
  where: JournalEntriesWhereInputSchema.optional(),
}).strict() ;

export const JournalItemsCreateArgsSchema: z.ZodType<Prisma.JournalItemsCreateArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  data: z.union([ JournalItemsCreateInputSchema,JournalItemsUncheckedCreateInputSchema ]),
}).strict() ;

export const JournalItemsUpsertArgsSchema: z.ZodType<Prisma.JournalItemsUpsertArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereUniqueInputSchema,
  create: z.union([ JournalItemsCreateInputSchema,JournalItemsUncheckedCreateInputSchema ]),
  update: z.union([ JournalItemsUpdateInputSchema,JournalItemsUncheckedUpdateInputSchema ]),
}).strict() ;

export const JournalItemsCreateManyArgsSchema: z.ZodType<Prisma.JournalItemsCreateManyArgs> = z.object({
  data: z.union([ JournalItemsCreateManyInputSchema,JournalItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JournalItemsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.JournalItemsCreateManyAndReturnArgs> = z.object({
  data: z.union([ JournalItemsCreateManyInputSchema,JournalItemsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const JournalItemsDeleteArgsSchema: z.ZodType<Prisma.JournalItemsDeleteArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  where: JournalItemsWhereUniqueInputSchema,
}).strict() ;

export const JournalItemsUpdateArgsSchema: z.ZodType<Prisma.JournalItemsUpdateArgs> = z.object({
  select: JournalItemsSelectSchema.optional(),
  include: JournalItemsIncludeSchema.optional(),
  data: z.union([ JournalItemsUpdateInputSchema,JournalItemsUncheckedUpdateInputSchema ]),
  where: JournalItemsWhereUniqueInputSchema,
}).strict() ;

export const JournalItemsUpdateManyArgsSchema: z.ZodType<Prisma.JournalItemsUpdateManyArgs> = z.object({
  data: z.union([ JournalItemsUpdateManyMutationInputSchema,JournalItemsUncheckedUpdateManyInputSchema ]),
  where: JournalItemsWhereInputSchema.optional(),
}).strict() ;

export const JournalItemsDeleteManyArgsSchema: z.ZodType<Prisma.JournalItemsDeleteManyArgs> = z.object({
  where: JournalItemsWhereInputSchema.optional(),
}).strict() ;