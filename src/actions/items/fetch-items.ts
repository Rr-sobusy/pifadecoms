import prisma from '@/lib/prisma';

export async function fetchItems() {
  const itemLists = await prisma.items.findMany({
    include : {
      ItemSource : true
    }
  });
  return itemLists;
}
