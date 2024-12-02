-- CreateEnum
CREATE TYPE "AccountTypes" AS ENUM ('Assets', 'Liability', 'Equity', 'Revenue', 'Expense');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "SavingsType" AS ENUM ('sharedCap', 'memberSavings');

-- CreateEnum
CREATE TYPE "SavingsTransactionType" AS ENUM ('withdrawal', 'deposit');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('product', 'services');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('pending', 'paid', 'cancelled');

-- CreateEnum
CREATE TYPE "JournalType" AS ENUM ('cashReceipts', 'cashDisbursement', 'generalJournal');

-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('MemberRegistration', 'SalesPayments', 'LoanDisbursements', 'LoanRepayments', 'SavingsDeposit', 'SavingsWithdrawal', 'ShareDeposit', 'ShareWithdrawal', 'ManualJournals');

-- CreateEnum
CREATE TYPE "FundType" AS ENUM ('Savings', 'ShareCapital');

-- CreateEnum
CREATE TYPE "FundTransactionsType" AS ENUM ('SavingsDeposit', 'SavingsWithdrawal', 'ShareCapDeposit', 'ShareCapWithdrawal');

-- CreateTable
CREATE TABLE "members" (
    "memberId" TEXT NOT NULL,
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'Active',
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "idNumber" INTEGER,
    "tin" TEXT,
    "dateAccepted" TIMESTAMP(3),
    "arb" TEXT,
    "bodResNo" TEXT,
    "membershipType" TEXT,
    "civilStatus" TEXT,
    "highestEdAttain" TEXT,
    "numOfDependents" INTEGER,
    "religion" TEXT,
    "annualIncom" INTEGER,
    "birthDate" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "occupation" TEXT,
    "contactNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "member_funds" (
    "fundId" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "savingsBal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shareCapBal" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "member_funds_pkey" PRIMARY KEY ("fundId")
);

-- CreateTable
CREATE TABLE "fund_transactions" (
    "fundTransactId" SERIAL NOT NULL,
    "fundId" INTEGER NOT NULL,
    "ledgerId" BIGINT,
    "fundType" "FundType" NOT NULL,
    "transactionType" "FundTransactionsType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fund_transactions_pkey" PRIMARY KEY ("fundTransactId")
);

-- CreateTable
CREATE TABLE "invoices" (
    "invoiceId" BIGSERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "dateOfInvoice" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "baseGrandTotal" DOUBLE PRECISION NOT NULL,
    "outStandingAmt" DOUBLE PRECISION NOT NULL,
    "journalId" BIGINT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "invoiceItemId" BIGSERIAL NOT NULL,
    "invoiceId" BIGINT NOT NULL,
    "itemID" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "trade" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("invoiceItemId")
);

-- CreateTable
CREATE TABLE "invoice_payments" (
    "paymentId" BIGSERIAL NOT NULL,
    "invoiceId" BIGINT NOT NULL,
    "orNo" TEXT NOT NULL,
    "paymentReceived" DOUBLE PRECISION NOT NULL,
    "journalRef" BIGINT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_payments_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Items" (
    "itemID" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "itemDescription" TEXT,
    "itemType" "ItemType" NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "costPrice" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stocks" INTEGER DEFAULT 0,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "accounts_second" (
    "rootId" SERIAL NOT NULL,
    "rootType" "AccountTypes" NOT NULL,
    "rootName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_second_pkey" PRIMARY KEY ("rootId")
);

-- CreateTable
CREATE TABLE "AccountsThirdLvl" (
    "accountId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "rootId" INTEGER NOT NULL,
    "openingBalance" DOUBLE PRECISION NOT NULL,
    "runningBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AccountsThirdLvl_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "dividends" (
    "dividendId" BIGSERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "datePosted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "dividends_pkey" PRIMARY KEY ("dividendId")
);

-- CreateTable
CREATE TABLE "SavingsTransact" (
    "transactionId" BIGSERIAL NOT NULL,
    "savingsId" TEXT NOT NULL,
    "transactionType" "SavingsTransactionType" NOT NULL,

    CONSTRAINT "SavingsTransact_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "journal_entries" (
    "entryId" BIGSERIAL NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "referenceName" TEXT NOT NULL,
    "referenceType" "ReferenceType" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memberId" TEXT,
    "journalType" "JournalType" NOT NULL,

    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("entryId")
);

-- CreateTable
CREATE TABLE "journal_items" (
    "journalItemsId" BIGSERIAL NOT NULL,
    "entryId" BIGINT NOT NULL,
    "accountId" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "journal_items_pkey" PRIMARY KEY ("journalItemsId")
);

-- CreateIndex
CREATE INDEX "members_lastName_firstName_idx" ON "members"("lastName", "firstName");

-- CreateIndex
CREATE UNIQUE INDEX "member_funds_memberId_key" ON "member_funds"("memberId");

-- CreateIndex
CREATE INDEX "fund_transactions_fundId_idx" ON "fund_transactions"("fundId");

-- CreateIndex
CREATE INDEX "invoices_dateOfInvoice_memberId_outStandingAmt_idx" ON "invoices"("dateOfInvoice", "memberId", "outStandingAmt");

-- CreateIndex
CREATE INDEX "invoice_payments_invoiceId_idx" ON "invoice_payments"("invoiceId");

-- CreateIndex
CREATE INDEX "dividends_memberId_accountId_datePosted_idx" ON "dividends"("memberId", "accountId", "datePosted");

-- CreateIndex
CREATE INDEX "journal_entries_entryDate_memberId_idx" ON "journal_entries"("entryDate", "memberId");

-- CreateIndex
CREATE INDEX "journal_items_accountId_entryId_idx" ON "journal_items"("accountId", "entryId");

-- AddForeignKey
ALTER TABLE "member_funds" ADD CONSTRAINT "member_funds_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "journal_entries"("entryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "member_funds"("fundId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("itemID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payments" ADD CONSTRAINT "invoice_payments_journalRef_fkey" FOREIGN KEY ("journalRef") REFERENCES "journal_entries"("entryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payments" ADD CONSTRAINT "invoice_payments_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountsThirdLvl" ADD CONSTRAINT "AccountsThirdLvl_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "accounts_second"("rootId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dividends" ADD CONSTRAINT "dividends_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dividends" ADD CONSTRAINT "dividends_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AccountsThirdLvl"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("memberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_items" ADD CONSTRAINT "journal_items_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "journal_entries"("entryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_items" ADD CONSTRAINT "journal_items_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AccountsThirdLvl"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
