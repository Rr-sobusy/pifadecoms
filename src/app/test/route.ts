
// import { stringify } from 'json-bigint';

// import { fetchFundLedger } from '@/actions/funds/fetch-fund-ledgers';

// interface MonthlyBalance {
//   month: string;
//   balance: number;
// }

// interface MemberMonthlyBalances {
//   [memberId: string]: MonthlyBalance[];
// }

// const computeMonthlyBalancesPerMember = async (
//   year: 2024 | 2025 | 2026 | 2027 | 2028 | 2029
// ): Promise<MemberMonthlyBalances> => {
//   const allMembersTransactions: MemberFundsType = await getAllMemberFunds(); // <- You must replace this with your actual fetch logic

//   const results: MemberMonthlyBalances = {};

//   for (const member of allMembersTransactions) {
//     const fundTypes: ('Savings' | 'ShareCapital')[] = ['Savings', 'ShareCapital'];

//     results[member.memberId] = {
//       Savings: [],
//       ShareCapital: [],
//     };

//     for (const fundType of fundTypes) {
//       const months = Array.from({ length: 12 }, (_, i) => ({
//         month: i + 1,
//         totalBalance: 0,
//         daysCount: 0,
//       }));

//       const transactionsList = member.Transactions || [];

//       const yearTransactions = transactionsList
//         .filter((transaction) => {
//           const entryDate = transaction.JournalEntries?.entryDate;
//           if (!entryDate) return false;

//           const transactionDate = dayjs(entryDate);
//           return transactionDate.isValid() && transactionDate.year() === year && transaction.fundType === fundType;
//         })
//         .sort((a, b) =>
//           dayjs(a.JournalEntries?.entryDate).diff(dayjs(b.JournalEntries?.entryDate))
//         );

//       if (yearTransactions.length === 0) {
//         const fallbackBalance =
//           fundType === 'Savings' ? member.savingsBal || 0 : member.shareCapBal || 0;

//         results[member.memberId][fundType] = months.map(({ month }) => ({
//           month: dayjs().month(month - 1).format('MMMM'),
//           balance: fallbackBalance,
//         }));
//         continue;
//       }

//       const firstTransaction = yearTransactions[0];
//       const firstTransactionDate = dayjs(firstTransaction.JournalEntries?.entryDate);

//       let initialBalance =
//         firstTransaction.transactionType === 'SavingsDeposit' ||
//         firstTransaction.transactionType === 'ShareCapDeposit'
//           ? Number(firstTransaction.newBalance) - Number(firstTransaction.postedBalance)
//           : Number(firstTransaction.newBalance) + Number(firstTransaction.postedBalance);

//       let runningBalance = initialBalance;
//       const dailyBalances: Record<string, number> = {};

//       yearTransactions.forEach((transaction) => {
//         const transactionDate = dayjs(transaction.JournalEntries?.entryDate);
//         const dateKey = transactionDate.format('YYYY-MM-DD');
//         runningBalance = Number(transaction.newBalance);
//         dailyBalances[dateKey] = runningBalance;
//       });

//       let lastKnownBalance = initialBalance;
//       for (let month = 1; month <= 12; month++) {
//         const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
//         let monthlyBalance = 0;

//         for (let day = 1; day <= daysInMonth; day++) {
//           const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

//           if (dayjs(dateKey).isBefore(firstTransactionDate, 'day')) {
//             lastKnownBalance = initialBalance;
//           }

//           if (dailyBalances[dateKey] !== undefined) {
//             lastKnownBalance = dailyBalances[dateKey];
//           }

//           monthlyBalance += lastKnownBalance;
//         }

//         months[month - 1].totalBalance = monthlyBalance;
//         months[month - 1].daysCount = daysInMonth;
//       }

//       results[member.memberId][fundType] = months.map(({ month, totalBalance, daysCount }) => ({
//         month: dayjs().month(month - 1).format('MMMM'),
//         balance: daysCount > 0 ? totalBalance / daysCount : 0,
//       }));
//     }
//   }

//   return results;
// };

// export async function GET() {
 
// }
