import { Prisma } from "@prisma/client";
import { fetchExpenses } from "./fetch-expenses";

export type ExpenseType = Prisma.PromiseReturnType<typeof fetchExpenses>