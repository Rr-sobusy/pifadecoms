
/**
 * * For creating manual journal entries
 */
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { transactionalSchema } from "./types";


const createManualJournal = actionClient.schema(transactionalSchema).action(async({parsedInput:Request})=>{
        try{
            await prisma.journalEntries.create({
                data : {
                    entryDate : Request.entryDate,
                    journalType : Request.journalType,
                    referenceName : Request.reference,
                    notes : Request.notes,
                    referenceType : Request.referenceType
                }
            })
        }
        catch(error){
            console.error(error)
        }
})