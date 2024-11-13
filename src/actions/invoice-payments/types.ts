

import {z} from 'zod'
import { Prisma } from '@prisma/client'

import { transactionalSchema } from '../transactional/types'
import { fetchReceivedPayments } from './fetch-payments'


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
export type PaymentsType = Prisma.PromiseReturnType<typeof fetchReceivedPayments>