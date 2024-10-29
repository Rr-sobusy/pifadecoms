import prisma from '@/lib/prisma';

/**
 *  Note: Fetch all members without limiting because i think the total rows for members is not too really
 *  a hardware expensive task.
 */

type MemberFilters = {
  lastName?: string | undefined;
};

export async function fetchMembers({ lastName }: MemberFilters) {
  const members = await prisma.members.findMany({
    orderBy : {
      lastName : 'asc'
    }
  });

  if (lastName) {
    const filteredByLastName = members.filter((member) =>
      member.lastName.toLowerCase().includes(lastName.toLowerCase())
    );
    return filteredByLastName.length ? filteredByLastName : [];
  }

  return members;
}