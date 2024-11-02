import prisma from '@/lib/prisma';

export async function fetchItems() {
  const itemLists = await prisma.items.findMany();
  return itemLists;
}
