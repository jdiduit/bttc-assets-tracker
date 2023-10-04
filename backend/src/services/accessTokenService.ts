import dayjs, {ManipulateType} from "dayjs";
import prisma from "../../prisma/PrismaClient";

export class AccessTokenService {
    async createToken(userId: string) {
        const exp = process.env.REFRESH_TOKEN_EXP.split(',')
        const expiresIn = dayjs().add(+exp[0] || 30, exp[1] as ManipulateType || 'days').unix()
        return prisma.refreshToken.create({
            data: {
                userId,
                expiresIn,
            }
        })
    }
}