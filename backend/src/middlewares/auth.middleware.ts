import dayjs from 'dayjs'
import {NextFunction, Request, Response} from 'express'
import {decode} from 'jsonwebtoken'
import prisma from "../../prisma/PrismaClient";
import {ErrorHandler} from "../errors/ErrorHandler";
import {isNullOrUndefined} from "is-what";
import {generateToken, validateAccessToken} from "../utils/tokenUtils";

export type TokenDecode = {
    id: string,
    expiresIn: number,
    userId: string
}

export type ServerRequest = Request & {
    user?: TokenDecode
}

const authMiddleware = async (req: ServerRequest, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return next(new ErrorHandler(401, 'Token is missing'));
    }

    try {
        const decodedToken = decode(authToken)
        const validRefreshToken = await prisma.refreshToken.findFirst({
            where: {userId: decodedToken['subject']},
        });

        if (!validRefreshToken) {
            next(new Error("Invalid Refresh Token"))
        }

        const expiredToken = dayjs().isAfter(dayjs.unix(decodedToken['exp']))
        const expiredRefreshToken = dayjs().isAfter(dayjs.unix(validRefreshToken.expiresIn))

        if (!expiredToken || expiredRefreshToken) {
            const userData = validateAccessToken(authToken)
            if (isNullOrUndefined(userData)) {
                return next(new ErrorHandler(401, 'User is unauthorized!'))
            }
        } else {
            const token = await generateToken(decodedToken['subject'])
            next(new ErrorHandler(401, token))
        }

        req.user = validRefreshToken
        return next();
    } catch (err) {
        return next(new ErrorHandler(401, 'User is unauthorized'))
    }
}

export default authMiddleware