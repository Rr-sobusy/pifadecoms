'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import {z} from 'zod'

const invoiceSchema = z.bigint();

export const deleteInvoiceAction = actionClient.schema(invoiceSchema).action(async ({ parsedInput }) => {
  let serverResponse;

  try {
    await prisma.invoice.delete({
      where: {
        invoiceId: parsedInput,
      },
    });
    serverResponse = { sucess: true, message: 'Invoice deleted successfully' };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      sucess: false,
      message: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : 'Error occured in server.',
    };
  }

  revalidatePath(paths.dashboard.invoice.list);
  return serverResponse;
});
