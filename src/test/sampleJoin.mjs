import prisma from "../lib/prisma";


async function returnJoin(){
    const raw = await prisma.journalEntries.groupBy({
        by: ['memberId'],
        _sum : {entryId : true}
    })
    return raw
}

console.log(returnJoin())