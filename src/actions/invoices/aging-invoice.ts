
import prisma from "@/lib/prisma";


export async function fetchAgingInvoiceItems(){
    
    const agingInvoiceItems = await prisma.invoiceItems.findMany({
        where : {
            isTotallyPaid : false,
        },
    })

    return agingInvoiceItems
}