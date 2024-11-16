import prisma from "@/lib/prisma";

export async function fetchJournals(){
        const journalEntries = await prisma.journalEntries.findMany();
        return journalEntries
}