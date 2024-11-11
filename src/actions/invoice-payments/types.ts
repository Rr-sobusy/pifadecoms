

import {z} from 'zod'

import { transactionalSchema } from '../transactional/types'


export const paymentSchema = transactionalSchema.extend({
        invoiceId : z.bigint(),
        orNo : z.string(),
        paymentReceived: z.number(),
        depositingAccount: z.object({
                accountId : z.string(),
                accountName: z.string()
        })
})

export type PaymentSchema = z.infer<typeof paymentSchema>