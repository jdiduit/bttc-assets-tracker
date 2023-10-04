import bcrypt from 'bcrypt'
import {LoginPayloadRequest, RegisterPayloadRequest} from "../types/auth.types";
import prisma from "../../prisma/PrismaClient";
import {ErrorHandler} from "../errors/ErrorHandler";
import {TokenDecode} from "../middlewares/auth.middleware";
import {AccessTokenService} from "./accessTokenService";
import {generateToken} from "../utils/tokenUtils";

export class AuthService {
    async register({username, password}: RegisterPayloadRequest) {
        const existingUser = await prisma.user.findUnique({
            where: {username},
        });

        if (existingUser) {
            throw new ErrorHandler(400, 'User already registered');
        }

        const passHash: string = await bcrypt.hash(password, 10);

        const firstChain = await prisma.chain.findFirst()

        const newUser = await prisma.user.create({
            data: {
                username, 
                password: passHash,
                selectedChain: {
                    connect: {
                        id: firstChain?.id
                    }
                }
            },
            include: {
                selectedAddress: true,
                WalletAddresses: true,
                selectedChain: true
            }
        });

        const token = await generateToken(newUser.id);

        const generateRefreshToken = new AccessTokenService();
        await generateRefreshToken.createToken(newUser.id);

        return {user: newUser, token};
    }

    async login({username, password}: Partial<LoginPayloadRequest>) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                selectedAddress: true,
                WalletAddresses: true,
                selectedChain: true
            }
        });

        if (!user) {
            throw new ErrorHandler(401, 'Incorrect username or password');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new ErrorHandler(401, 'Incorrect username or password');
        }

        const token = await generateToken(user.id);

        await prisma.refreshToken.deleteMany({
            where: {
                userId: user.id,
            },
        });

        const generateRefreshToken = new AccessTokenService();
        await generateRefreshToken.createToken(user.id);

        return {token, user};
    }

    async getAllUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                selectedAddress: true
            },
        });
    }

    async getMy(user: TokenDecode) {
        const userDb = await prisma.user.findFirst({
            where: {
                id: user?.userId
            },
            include: {
                selectedAddress: true,
                selectedChain: true,
                WalletAddresses: true
            }
        })

        if (!userDb) {
            throw new ErrorHandler(404, 'User not found');
        }

        if(userDb.selectedChain === null) {
            const firstChain = await prisma.chain.findFirst()

            const updatedUser = await prisma.user.update({
                where: {
                    id: user?.userId
                },
                data: {
                    selectedChain: {
                        connect: {
                            id: firstChain?.id
                        }
                    }
                },
                include: {
                    selectedAddress: true,
                    selectedChain: true,
                    WalletAddresses: true
                }
            });

            return updatedUser
        }

        return userDb;
    }

    async setSelectedChain(id: string, user: { userId: string }) {
        const findChain = await prisma.chain.findUnique({
            where: {
                id: id
            }
        });

        if (!findChain) {
            throw new ErrorHandler(404, "Chain not found!");
        }

        await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                selectedChain: {
                    connect: {
                        id: findChain?.id
                    }
                }
            },
        });

        return findChain
    }
}

