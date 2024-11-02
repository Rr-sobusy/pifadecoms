import prisma from '@/lib/prisma';

/**
 *  Note: Fetch all members without limiting because i think the total rows for members is not too really
 *  a hardware expensive task.
 *
 *  Paginating in server using offsetPage params in use javascript array methods to manipulate it
 */

type MemberFilters = {
  lastName?: string | undefined;
  offsetPage?: number | undefined;
  returnAll?: boolean
};

export async function fetchMembers({ lastName, offsetPage = 1, returnAll = false }: MemberFilters) {
  const members = await prisma.members.findMany({
    orderBy: {
      lastName: 'asc',
    },
  })
  const extendedMembers = members.map((member, index)=>({
      ...member,
      id: index + 1
  }))
  

  if (lastName) {
    const filteredByLastName = members.filter((member) =>
      member.lastName.toLowerCase().includes(lastName.toLowerCase())
    );
    return filteredByLastName.length ? filteredByLastName : [];
  }

  if(returnAll){
    return extendedMembers
  }

  if (offsetPage) {
    const filteredByPage = extendedMembers.slice((offsetPage - 1) * 100, offsetPage * 100);
    return Boolean(filteredByPage) ? filteredByPage : [];
  }

  return extendedMembers;
}
