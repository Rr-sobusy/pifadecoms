import prisma from '@/lib/prisma';

export async function fetchMemberFunds() {
  const memberFunds = await prisma.memberFunds.findMany({
    include : {
        Member : true
    }
  });
  return memberFunds;
}
