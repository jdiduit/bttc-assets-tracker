import prisma from "../../prisma/PrismaClient";

export class ChainService {
    async getAllByType(chainType: string) {
        return await prisma.chain.findMany({
            where: {
                type: chainType
            }
        })
    }

    async getAll() {
        return await prisma.chain.findMany()
    }
}
