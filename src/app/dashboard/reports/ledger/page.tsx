import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Export as ExportIcon } from '@phosphor-icons/react/dist/ssr/Export';
import { FunnelSimple as FilterIcon } from '@phosphor-icons/react/dist/ssr/FunnelSimple';
import { JournalType } from '@prisma/client';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { fetchLedgers } from '@/actions/reports/general-ledger';
import LedgerFilterModal from '@/components/dashboard/reports/ledgers/filter-modal';
import GeneralLedgerTable from '@/components/dashboard/reports/ledgers/general-ledger-table';

interface PageProps {
  searchParams: {
    startDate: string | Date;
    endDate: string | Date;
    isFilterOpen: boolean;
    journalType: JournalType | 'All';
  };
}
// const data = [
//   {
//       "account": {
//           "accountId": "ACC0001",
//           "accountName": "Account 1",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0001",
//       "_sum": {
//           "debit": 20806.3616115,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0002",
//           "accountName": "Account 2",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0002",
//       "_sum": {
//           "debit": 72814.6503113,
//           "credit": 25198.3273783
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0003",
//           "accountName": "Account 3",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0003",
//       "_sum": {
//           "debit": 81728.7468794,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0004",
//           "accountName": "Account 4",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0004",
//       "_sum": {
//           "debit": 63800.5243094,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0005",
//           "accountName": "Account 5",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0005",
//       "_sum": {
//           "debit": 90406.746704,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0006",
//           "accountName": "Account 6",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0006",
//       "_sum": {
//           "debit": 84892.1936593,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0007",
//           "accountName": "Account 7",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0007",
//       "_sum": {
//           "debit": 22549.5868435,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0008",
//           "accountName": "Account 8",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0008",
//       "_sum": {
//           "debit": 15031.6243519,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0009",
//           "accountName": "Account 9",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0009",
//       "_sum": {
//           "debit": 20977.1668853,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0010",
//           "accountName": "Account 10",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0010",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 97797.3947619
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0011",
//           "accountName": "Account 11",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0011",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 42705.6520428
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0012",
//           "accountName": "Account 12",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0012",
//       "_sum": {
//           "debit": 93453.9613836,
//           "credit": 35807.6050112
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0013",
//           "accountName": "Account 13",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0013",
//       "_sum": {
//           "debit": 65310.0375171,
//           "credit": 82697.3302056
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0014",
//           "accountName": "Account 14",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0014",
//       "_sum": {
//           "debit": 26036.0117724,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0015",
//           "accountName": "Account 15",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0015",
//       "_sum": {
//           "debit": 85987.2147121,
//           "credit": 73942.6833771
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0016",
//           "accountName": "Account 16",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0016",
//       "_sum": {
//           "debit": 73281.8129389,
//           "credit": 47903.4791495
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0017",
//           "accountName": "Account 17",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0017",
//       "_sum": {
//           "debit": 54025.1793338,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0018",
//           "accountName": "Account 18",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0018",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 60639.45554
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0019",
//           "accountName": "Account 19",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0019",
//       "_sum": {
//           "debit": 39837.2827077,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0020",
//           "accountName": "Account 20",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0020",
//       "_sum": {
//           "debit": 26292.6852893,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0021",
//           "accountName": "Account 21",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0021",
//       "_sum": {
//           "debit": 60276.009414,
//           "credit": 29694.9351234
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0022",
//           "accountName": "Account 22",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0022",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 80593.104318
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0023",
//           "accountName": "Account 23",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0023",
//       "_sum": {
//           "debit": 87992.66481,
//           "credit": 22938.7757327
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0024",
//           "accountName": "Account 24",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0024",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 58869.5316102
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0025",
//           "accountName": "Account 25",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0025",
//       "_sum": {
//           "debit": 42924.1424459,
//           "credit": 1817.1129752
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0026",
//           "accountName": "Account 26",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0026",
//       "_sum": {
//           "debit": 54075.2047222,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0027",
//           "accountName": "Account 27",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0027",
//       "_sum": {
//           "debit": 80093.1137017,
//           "credit": 90189.3505971
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0028",
//           "accountName": "Account 28",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0028",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 9673.1776337
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0029",
//           "accountName": "Account 29",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0029",
//       "_sum": {
//           "debit": 38539.6087718,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0030",
//           "accountName": "Account 30",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0030",
//       "_sum": {
//           "debit": 51018.6551699,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0031",
//           "accountName": "Account 31",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0031",
//       "_sum": {
//           "debit": 32402.7567293,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0032",
//           "accountName": "Account 32",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0032",
//       "_sum": {
//           "debit": 8561.5361914,
//           "credit": 55906.7949472
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0033",
//           "accountName": "Account 33",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0033",
//       "_sum": {
//           "debit": 28974.2214415,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0034",
//           "accountName": "Account 34",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0034",
//       "_sum": {
//           "debit": 72159.3745466,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0035",
//           "accountName": "Account 35",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0035",
//       "_sum": {
//           "debit": 461.164579,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0036",
//           "accountName": "Account 36",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0036",
//       "_sum": {
//           "debit": 17866.0252556,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0037",
//           "accountName": "Account 37",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0037",
//       "_sum": {
//           "debit": 78521.4239504,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0038",
//           "accountName": "Account 38",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0038",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 78397.2413129
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0039",
//           "accountName": "Account 39",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0039",
//       "_sum": {
//           "debit": 49253.5924068,
//           "credit": 74211.2080728
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0040",
//           "accountName": "Account 40",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0040",
//       "_sum": {
//           "debit": 7321.0099154,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0041",
//           "accountName": "Account 41",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0041",
//       "_sum": {
//           "debit": 62860.2493795,
//           "credit": 89819.9060022
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0042",
//           "accountName": "Account 42",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0042",
//       "_sum": {
//           "debit": 55081.1160855,
//           "credit": 91162.7997331
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0043",
//           "accountName": "Account 43",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0043",
//       "_sum": {
//           "debit": 57399.6209344,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0044",
//           "accountName": "Account 44",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0044",
//       "_sum": {
//           "debit": 53537.9142807,
//           "credit": 58062.9043178
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0045",
//           "accountName": "Account 45",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0045",
//       "_sum": {
//           "debit": 38452.83362,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0046",
//           "accountName": "Account 46",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0046",
//       "_sum": {
//           "debit": 39396.0877334,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0047",
//           "accountName": "Account 47",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0047",
//       "_sum": {
//           "debit": 72705.039812,
//           "credit": 25338.9375793
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0048",
//           "accountName": "Account 48",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0048",
//       "_sum": {
//           "debit": 60795.2581553,
//           "credit": 356.7809827
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0049",
//           "accountName": "Account 49",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0049",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 90722.560517
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0050",
//           "accountName": "Account 50",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0050",
//       "_sum": {
//           "debit": 6540.5386672,
//           "credit": 46468.1191336
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0051",
//           "accountName": "Account 51",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0051",
//       "_sum": {
//           "debit": 15339.8392437,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0052",
//           "accountName": "Account 52",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0052",
//       "_sum": {
//           "debit": 57417.9047117,
//           "credit": 73357.1178538
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0053",
//           "accountName": "Account 53",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0053",
//       "_sum": {
//           "debit": 32920.3298117,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0054",
//           "accountName": "Account 54",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0054",
//       "_sum": {
//           "debit": 20421.2035981,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0055",
//           "accountName": "Account 55",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0055",
//       "_sum": {
//           "debit": 53418.0889898,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0056",
//           "accountName": "Account 56",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0056",
//       "_sum": {
//           "debit": 83778.2486589,
//           "credit": 85012.5899249
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0057",
//           "accountName": "Account 57",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0057",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 13051.0123667
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0058",
//           "accountName": "Account 58",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0058",
//       "_sum": {
//           "debit": 22415.2265153,
//           "credit": 2777.9040812
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0059",
//           "accountName": "Account 59",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0059",
//       "_sum": {
//           "debit": 92744.2863435,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0060",
//           "accountName": "Account 60",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0060",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 56417.4849075
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0061",
//           "accountName": "Account 61",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0061",
//       "_sum": {
//           "debit": 24102.9826206,
//           "credit": 16234.0849291
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0062",
//           "accountName": "Account 62",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0062",
//       "_sum": {
//           "debit": 83865.6369153,
//           "credit": 18736.7802202
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0063",
//           "accountName": "Account 63",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0063",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 61707.6942259
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0064",
//           "accountName": "Account 64",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0064",
//       "_sum": {
//           "debit": 9365.3538438,
//           "credit": 32902.2038216
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0065",
//           "accountName": "Account 65",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0065",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 21181.3223082
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0066",
//           "accountName": "Account 66",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0066",
//       "_sum": {
//           "debit": 64612.2172667,
//           "credit": 1809.8757378
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0067",
//           "accountName": "Account 67",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0067",
//       "_sum": {
//           "debit": 96844.8111603,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0068",
//           "accountName": "Account 68",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0068",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 88640.0137662
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0069",
//           "accountName": "Account 69",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0069",
//       "_sum": {
//           "debit": 56713.5721516,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0070",
//           "accountName": "Account 70",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0070",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 66303.1491589
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0071",
//           "accountName": "Account 71",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0071",
//       "_sum": {
//           "debit": 29779.1593413,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0072",
//           "accountName": "Account 72",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0072",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 14516.9587659
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0073",
//           "accountName": "Account 73",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0073",
//       "_sum": {
//           "debit": 23007.8633157,
//           "credit": 38512.1329239
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0074",
//           "accountName": "Account 74",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0074",
//       "_sum": {
//           "debit": 63385.9775071,
//           "credit": 54373.6564081
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0075",
//           "accountName": "Account 75",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0075",
//       "_sum": {
//           "debit": 80457.6302933,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0076",
//           "accountName": "Account 76",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0076",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 96392.7076823
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0077",
//           "accountName": "Account 77",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0077",
//       "_sum": {
//           "debit": 91196.3219018,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0078",
//           "accountName": "Account 78",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0078",
//       "_sum": {
//           "debit": 55642.4403808,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0079",
//           "accountName": "Account 79",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0079",
//       "_sum": {
//           "debit": 85585.747083,
//           "credit": 68337.1108461
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0080",
//           "accountName": "Account 80",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0080",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 74078.64723
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0081",
//           "accountName": "Account 81",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0081",
//       "_sum": {
//           "debit": 52944.36068,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0082",
//           "accountName": "Account 82",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0082",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 84954.860162
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0083",
//           "accountName": "Account 83",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0083",
//       "_sum": {
//           "debit": 8644.2717208,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0084",
//           "accountName": "Account 84",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0084",
//       "_sum": {
//           "debit": 71429.5768175,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0085",
//           "accountName": "Account 85",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0085",
//       "_sum": {
//           "debit": 34444.686632,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0086",
//           "accountName": "Account 86",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0086",
//       "_sum": {
//           "debit": 60048.8254903,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0087",
//           "accountName": "Account 87",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0087",
//       "_sum": {
//           "debit": 70595.9804402,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0088",
//           "accountName": "Account 88",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0088",
//       "_sum": {
//           "debit": 45372.0638349,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0089",
//           "accountName": "Account 89",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0089",
//       "_sum": {
//           "debit": 1439.9116635,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0090",
//           "accountName": "Account 90",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0090",
//       "_sum": {
//           "debit": 65311.1071994,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0091",
//           "accountName": "Account 91",
//           "RootID": {
//               "rootType": "Equity"
//           }
//       },
//       "accountId": "ACC0091",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 31787.2976366
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0092",
//           "accountName": "Account 92",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0092",
//       "_sum": {
//           "debit": 52897.9783684,
//           "credit": 64042.0684645
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0093",
//           "accountName": "Account 93",
//           "RootID": {
//               "rootType": "Expense"
//           }
//       },
//       "accountId": "ACC0093",
//       "_sum": {
//           "debit": 62698.5820584,
//           "credit": 34101.7075942
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0094",
//           "accountName": "Account 94",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0094",
//       "_sum": {
//           "debit": 87544.299537,
//           "credit": 53036.2568068
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0095",
//           "accountName": "Account 95",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0095",
//       "_sum": {
//           "debit": 10583.8084195,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0096",
//           "accountName": "Account 96",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0096",
//       "_sum": {
//           "debit": 49765.3460699,
//           "credit": 9566.8137882
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0097",
//           "accountName": "Account 97",
//           "RootID": {
//               "rootType": "Revenue"
//           }
//       },
//       "accountId": "ACC0097",
//       "_sum": {
//           "debit": 11470.0233635,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0098",
//           "accountName": "Account 98",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC0098",
//       "_sum": {
//           "debit": 67194.2856934,
//           "credit": 0.0
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC0099",
//           "accountName": "Account 99",
//           "RootID": {
//               "rootType": "Assets"
//           }
//       },
//       "accountId": "ACC0099",
//       "_sum": {
//           "debit": 30822.7943447,
//           "credit": 68428.7218234
//       }
//   },
//   {
//       "account": {
//           "accountId": "ACC9999",
//           "accountName": "Balancing Entry",
//           "RootID": {
//               "rootType": "Liability"
//           }
//       },
//       "accountId": "ACC9999",
//       "_sum": {
//           "debit": 0.0,
//           "credit": 1419488.3524281
//       }
//   },
//   {
//     "account": {
//         "accountId": "ACC24011",
//         "accountName": "Accumulated Dep.",
//         "RootID": {
//             "rootType": "Contra_Assets"
//         }
//     },
//     "accountId": "ACC9999",
//     "_sum": {
//         "debit": 0.0,
//         "credit": 1419488.3524281
//     }
// },
// {
//     "account": {
//         "accountId": "ACC24099",
//         "accountName": "Accumulated Dep. 2",
//         "RootID": {
//             "rootType": "Contra_Assets"
//         }
//     },
//     "accountId": "ACC9999",
//     "_sum": {
//         "debit": 1419488.3524281,
//         "credit": 0.0
//     }
// }
// ]
async function page({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const { startDate, endDate, isFilterOpen, journalType } = searchParams;
  const generalLedgers = await fetchLedgers({ dateRange: { startDate, endDate }, journalType });

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">General Ledger</Typography>
          </Box>

          <Stack direction="row">
            <div>
              <Button
                variant="text"
                startIcon={<FilterIcon />}
                LinkComponent={Link}
                href={`${paths.dashboard.reports.ledgerList}?isFilterOpen=true`}
              >
                Filter lists
              </Button>
            </div>
            <div>
              <Button variant="text" startIcon={<ExportIcon />} LinkComponent={Link}>
                Export
              </Button>
            </div>
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'center', marginTop: 3 }}>
          <Typography color="" variant="overline">
            Pinagsibaan Farmer&apos;s Development Multi-purpose Cooperative
          </Typography>
          <Typography fontWeight="600" fontSize="23px" variant="body1">
            General Ledger of Accounts
          </Typography>
          <Typography color="textDisabled" variant="body2">
            {startDate && endDate
              ? `For the period ${dayjs(startDate).format('MMM DD YYYY')} to ${dayjs(endDate).format('MMM DD YYYY')}`
              : 'Select a date range to view report'}
          </Typography>

          <Card sx={{ marginTop: 3 }}>
            <CardContent>
              <GeneralLedgerTable rows={generalLedgers} />
            </CardContent>
          </Card>
        </Stack>
      </Stack>
      <LedgerFilterModal open={Boolean(isFilterOpen)} />
    </Box>
  );
}

export default page;
