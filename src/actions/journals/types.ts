import { Prisma } from "@prisma/client";
import { fetchJournals } from "./fetch-journals";

export type JournalType = Prisma.PromiseReturnType<typeof fetchJournals>