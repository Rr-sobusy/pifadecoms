import prisma from '@/lib/prisma';

interface MemberFilters {
  memberName?: string | undefined;
  offsetPage?: number | undefined;
  returnAll?: boolean;
}

export async function fetchMembers({ memberName, offsetPage = 1, returnAll = false }: MemberFilters) {
  const totalCount = await prisma.members.count(); // Get total number of members

  const members = await prisma.members.findMany({
    orderBy: [
      {
        lastName: 'asc',
      },
      {
        firstName: 'asc',
      },
    ],
  });

  const extendedMembers = members.map((member, index) => ({
    ...member,
    id: index + 1,
  }));

  if (memberName) {
    const filteredByLastName = extendedMembers.filter(
      (member) =>
        member.lastName.toLowerCase().includes(memberName.toLowerCase()) ||
        member.firstName.toLowerCase().includes(memberName.toLowerCase())
    );
    return { totalCount: filteredByLastName.length, members: filteredByLastName };
  }

  if (returnAll) {
    return { totalCount, members: extendedMembers };
  }

  if (offsetPage) {
    const filteredByPage = extendedMembers.slice((offsetPage - 1) * 100, offsetPage * 100);
    return { totalCount, members: filteredByPage };
  }

  return { totalCount, members: extendedMembers };
}

//* Fetch data per member
export async function fetchMemberData(memberId: string) {
  const memberData = await prisma.members.findUnique({
    where: {
      memberId: memberId,
    },
    include: {
      invoice: {
        include: {
          InvoiceItems: {
            where: {
              isTotallyPaid: false,
            },
          },
        },
      },
    },
  });

  return memberData;
}
