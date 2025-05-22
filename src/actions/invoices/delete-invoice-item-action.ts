'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';

const invoiceItemId = zod.bigint();

export const deleteInvoiceItemAction = actionClient.schema(invoiceItemId).action(async ({ parsedInput }) => {
  let serverResponse;

  try {
    await prisma.invoiceItems.delete({
      where: {
        invoiceItemId: parsedInput,
      },
    });

    serverResponse = {
      success: true,
      message: 'Invoice item deleted successfully',
    };
  } catch (error) {
    logger.debug(error);
    serverResponse = {
      success: false,
      message: 'Error occured in the server',
    };
  }

  revalidatePath(paths.dashboard.invoice.details(parsedInput));
  return serverResponse;
});
