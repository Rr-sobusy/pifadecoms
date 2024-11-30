/**
 * * In here, the main goal is to fetch members that still not created their funds but their data was in `members` table.
 */

import prisma from '@/lib/prisma';

export async function membersStillNotRegistered() {
  const member = await prisma.members.findMany({
    where: {
      Funds: null,
    },
  });

  return member;
}
