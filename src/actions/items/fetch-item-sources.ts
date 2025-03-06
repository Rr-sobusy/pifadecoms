import prisma from "@/lib/prisma";


export async function fetchItemSources(){
    const itemSources = await prisma.itemSource.findMany({
      include : {
        Accounts : {
            select : {
                accountName : true
            }
        }
      }
    });

    return itemSources
}