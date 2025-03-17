
// import type { AccountTypes } from '@prisma/client';
// import { PrismaClientValidationError } from '@prisma/client/runtime/library';


// import prisma from '@/lib/prisma';

// interface ChildAccount {
//   accountName: string;
//   balance: number;
// }

// function convertBigInt(obj: any): any {
//   if (typeof obj === 'bigint') {
//     return obj.toString();
//   }
//   if (Array.isArray(obj)) {
//     return obj.map(convertBigInt);
//   }
//   if (obj !== null && typeof obj === 'object') {
//     return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertBigInt(value)]));
//   }
//   return obj;
// }

// interface ParentAccount {
//   parentAccount: string;
//   isContra: boolean;
//   totalBalance: number;
//   children: ChildAccount[];
// }

// type BalanceSheet = Record<Exclude<AccountTypes, 'Expense' | 'Revenue' | 'Contra_Assets'>, ParentAccount[]>;

// export async function GET(asOf = new Date() as Date) {
//   try {
//     const balancesPreceeding = await prisma.journalItems.groupBy({
//         by: ['accountId'],
//         where : {
//           JournalEntries : {
//             entryDate : {
//               gt : asOf
//             }
//           }
//         },
//         _sum : {
//           credit : true,
//           debit : true
//         }
//       })
    
//       return Response.json(convertBigInt(balancesPreceeding));
//   } catch (e) {
//     if (e instanceof PrismaClientValidationError) {
//       return Response.json({ error: e.message });
//     }
//   }

//   /**
//    * * Filter the accounts with children having positive balance in application level instead of database level
//    */
//   //   accounts
//   //     .filter((acc) => acc.Children.some((ctx) => Number(ctx.runningBalance) > 0))
//   //     .forEach((account) => {
//   //       const category = account.rootType as Exclude<AccountTypes, 'Expense' | 'Revenue'>;

//   //       const totalBalance = account.Children.reduce((sum, child) => sum + Number(child.runningBalance), 0);

//   //       if (totalBalance !== 0) {
//   //         // Append 'Contra_Assets' children to 'Assets'
//   //         if (category === 'Contra_Assets') {
//   //           console.log('contra found');
//   //           balanceSheet.Assets.push({
//   //             parentAccount: account.rootName,
//   //             totalBalance,
//   //             isContra: true,
//   //             children: account.Children.map((child) => ({
//   //               accountName: child.accountName,
//   //               balance: Number(child.runningBalance),
//   //             })),
//   //           });
//   //         } else {
//   //           balanceSheet[category].push({
//   //             parentAccount: account.rootName,
//   //             totalBalance,
//   //             isContra: false,
//   //             children: account.Children.map((child) => ({
//   //               accountName: child.accountName,
//   //               balance: Number(child.runningBalance),
//   //             })),
//   //           });
//   //         }
//   //       }
//   //     });

//   //   return balanceSheet;
// }
