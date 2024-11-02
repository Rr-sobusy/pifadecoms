import { Prisma } from '@prisma/client';

import { fetchItems } from './fetch-items';

export type ItemTypes = Prisma.PromiseReturnType<typeof fetchItems>;
