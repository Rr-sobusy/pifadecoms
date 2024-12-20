import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
// import xl from 'exceljs';

// import { AccountType } from '@/lib/api-utils/account-tree';
// import { dayjs } from '@/lib/dayjs';
// import prisma from '@/lib/prisma';
// import { fetchInvoices } from '@/actions/invoices/fetch-invoice';
import { fetchMembers } from '@/actions/members/fetch-members';
import { MemberFilters } from '@/components/dashboard/members/members-filter';
import { MembersTable } from '@/components/dashboard/members/members-table';
import MembersPagination from '@/components/dashboard/members/members-table-pagination';

// import { Rows } from '@phosphor-icons/react';

interface PageProps {
  searchParams: { memberName: string; offsetPage: number };
};

// async function populateMembers(){
//   const workbook = new xl.Workbook();
//   await workbook.xlsx.readFile("public/data/2021.xlsx")
//   const worksheet = workbook.getWorksheet(1);

// if (!worksheet) {
//   console.error("Worksheet not found. Make sure the sheet exists.");
//   return;
// }

//   for(let i = 7; i <= 806 ; i++){
//     const row = worksheet.getRow(i);

//     const formattedDateString = (row.getCell(13).value?.toString().replace("-"," ")+ " "+row.getCell(14).value )
//      await prisma.members.create({
//       data:{
//           lastName : row.getCell(2).value,
//           firstName: row.getCell(3).value + "," + " " + row.getCell(5).value,
//           idNumber : Number(row.getCell(6).value),
//           tin : row.getCell(7).value,
//           arb: row.getCell(8).value,
//           dateAccepted :  new Date(row.getCell(9).value),
//           bodResNo: row.getCell(10).value,
//           membershipType : "Regular",
//           address : row.getCell(12).value,
//           contactNo: " ",
//           gender: row.getCell(16).value,
//           birthDate : row.getCell(14).value === null ? null : new Date(row.getCell(13).value?.toString().replace("-"," ")+ " "+row.getCell(14).value),
//           civilStatus : row.getCell(17).value,
//           highestEdAttain: row.getCell(18).value,
//           occupation : row.getCell(19).value,
//           numOfDependents : Number(row.getCell(20).value),
//           religion:  row.getCell(21).value,
//           annualIncom : row.getCell(22).value,
//       }
//      })
//     // console.log(row.getCell(14).value)
//   }
// }

// async function seed(arr: string[]) {
//   arr.map(async (rex) => {
//     await prisma.accountsSecondLvl.create({
//       data: {
//         rootType: 'Expense',
//         rootName : rex,
//       },
//     });
//   });
// }

const Page = async ({ searchParams }: PageProps): Promise<React.JSX.Element> => {
  // const rex = await seed(AccountType)
  // const rex = await populateMembers();

  const { memberName, offsetPage } = searchParams;
  const members = await fetchMembers({ memberName, offsetPage });
  // const rex = await seed(AccountType)
  // const rex = await populateMembers()
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
            <Typography variant="h4">Members</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained">
              Add
            </Button>
          </Box>
        </Stack>
        <Card>
          <MemberFilters filters={{ memberName }} />
          <Divider />
          <Box sx={{ overflowX: 'auto' }}>
            <MembersTable rows={members} />
          </Box>
          <Divider />
          <MembersPagination count={1000} offsetPage={offsetPage} />
        </Card>
      </Stack>
    </Box>
  );
};

export default Page;
