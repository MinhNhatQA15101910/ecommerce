import { injectable } from "inversify";
import { IPrismaService } from "../interfaces/IPrismaService";
import { prismaClient } from "..";

@injectable()
export class PrismaService implements IPrismaService {
  async createTransaction(fn: (prisma: any) => Promise<any>): Promise<any> {
    return await prismaClient.$transaction(fn);
  }
}
