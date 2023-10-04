import prisma from "../../prisma/PrismaClient";
import {ErrorHandler} from "../errors/ErrorHandler";

type CreateTokenRequest = {
    name: string,
    decimals: string,
    symbol: string,
    address: string,
    user: { userId: string }
}

type ToggleTokenActiveStatusRequest = {
    walletAddressId: string,
    tokenId: string,
    chainType: string,
}

export class TokenService {
    async createToken({name, address, symbol, decimals, user}: CreateTokenRequest) {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: user?.userId
            },
            include: {
                selectedChain: {
                    select: {
                        id: true
                    }
                }
            }
        })

        const existingToken = await prisma.token.findUnique({
            where: {
                address_chainId: {
                    address: address,
                    chainId: currentUser?.selectedChain?.id
                }
            }
        });

        if (existingToken) {
            throw new ErrorHandler(400, 'Token already exist');
        }

        const newToken = await prisma.token.create({
            data: {
                name,
                address,
                decimals,
                symbol,
                chain: {
                    connect: {
                        id: currentUser?.selectedChain?.id
                    }
                }
            },
        });

        return newToken;
    }

    async getAllTokens(walletAddressId: string, chainId: string, sortBy: string, orderSort: 'asc' | 'desc') {
        const tokensCount = await prisma.token.count({
            where: {
                chainId: chainId
            },
        })

        const tokens = await prisma.token.findMany({
            where: {
                chainId: chainId
            },
            select: {
                id: true,
                name: true,
                address: true,
                symbol: true,
                walletAssignments: {
                    where: {
                        walletAddressId,
                        status: 'ACTIVE',
                    },
                },
            },
            orderBy: {
                [sortBy]: orderSort,
            },
        });

        return {
            data: tokens.map((token) => ({
                ...token,
                status: token.walletAssignments.length > 0 ? 'ACTIVE' : 'DISABLED',
            })),
            pagination: {
                totalCount: tokensCount
            }
        };
    }

    async checkExistTokenByAddress(address: string) {
        const tokenDb = await prisma.token.findFirst({
            where: {
                address: address
            },
        })

        return tokenDb ?? null
    }

    async getAllTokensByStatus(walletAddressId: any, chainId: any, status: any, orderSort: string, sortBy: string) {
        const tokensCount = await prisma.token.count({
            where: {
                walletAssignments: {
                    some: {
                        status: status,
                    },
                },
                chainId: chainId,
            },
        });

        const tokens = await prisma.token.findMany({
            where: {
                walletAssignments: {
                    some: {
                        status: status,
                        walletAddressId: walletAddressId
                    },
                },
                chainId: chainId,
            },
            select: {
                id: true,
                name: true,
                address: true,
                chain: true,
                decimals: true,
                symbol: true,
                walletAssignments: {
                    where: {
                        walletAddressId: walletAddressId,
                        status: status,
                    },
                },
            },
            orderBy: {
                [sortBy]: orderSort,
            },
        });

        return {
            data: tokens.map((token) => ({
                ...token,
                status: token.walletAssignments.length > 0 ? 'ACTIVE' : 'DISABLED',
            })),
            pagination: {
                totalCount: tokensCount,
            },
        };
    }

    async toggleTokenActiveStatus({walletAddressId, tokenId, chainType}: ToggleTokenActiveStatusRequest) {
        const existingToken = await prisma.token.findUnique({
            where: {
                id: tokenId
            }
        });

        if (!existingToken) {
            throw new ErrorHandler(400, 'Token not exist');
        }

        const existingWalletAddress = await prisma.walletAddress.findUnique({
            where: {
                id: walletAddressId
            }
        });

        if (!existingWalletAddress) {
            throw new ErrorHandler(400, 'Wallet address not exist');
        }

        const existingTokenAssignment = await prisma.tokenAssignment.findUnique({
            where: {
                tokenId_walletAddressId_chainType: {
                    walletAddressId,
                    tokenId,
                    chainType
                }
            },
            include: {
                token: true,
                walletAddress: true
            }
        });

        if (existingTokenAssignment) {
            return await prisma.tokenAssignment.update({
                where: {
                    tokenId_walletAddressId_chainType: {
                        walletAddressId,
                        tokenId,
                        chainType
                    }
                },
                data: {
                    status: existingTokenAssignment?.status == 'ACTIVE' ? 'DISABLED' : 'ACTIVE',
                },
            });
        } else {
            return await prisma.tokenAssignment.create({
                data: {
                    tokenId,
                    walletAddressId,
                    chainType,
                    status: 'ACTIVE',
                },
            });
        }
    }
}
