import { PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from "@prisma/client/runtime/library";

export interface IPrismaService {
  createTransaction<R>(
    fn: (prisma: Omit<PrismaClient, ITXClientDenyList>) => Promise<R>
  ): Promise<R>;
}
