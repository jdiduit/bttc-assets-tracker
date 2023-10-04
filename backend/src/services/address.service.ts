import prisma from "../../prisma/PrismaClient";
import {ErrorHandler} from "../errors/ErrorHandler";

export class WalletService {
    async addAddress({
                         name,
                         address,
                         user,
                     }: {
        name: string;
        address: string;
        user: { userId: string };
    }) {
        const dbAddress = await prisma.walletAddress.findFirst({
            where: {
                address,
                userId: user.userId,
            },
        });

        if (dbAddress) {
            throw new ErrorHandler(400, "Address already exists!");
        }

        const findUser = await prisma.user?.findUnique({
            where: {
                id: user?.userId
            },
            select: {
                _count: {
                    select: {
                        WalletAddresses: true
                    }
                }
            }
        })

        const newAddress = await prisma.walletAddress.create({
            data: {
                name,
                address,
                user: {
                    connect: {
                        id: user.userId,
                    },
                },
            },
        });

        if (findUser?._count?.WalletAddresses === 0) {
            await prisma.user?.update({
                where: {
                    id: user?.userId
                },
                data: {
                    selectedAddress: {
                        connect: {
                            id: newAddress?.id
                        }
                    }
                }
            })
        }

        return newAddress;
    }

    async allAddresses(user: { userId: string }) {
        const findUser = await prisma.user.findUnique({
            where: {
                id: user?.userId
            },
            include: {
                WalletAddresses: true,
                selectedAddress: true
            }
        });

        const selectedAddress = findUser?.WalletAddresses?.find(address => address?.id == findUser?.selectedAddress?.id)

        const mapResult = findUser?.WalletAddresses?.map(address => address?.id == findUser?.selectedAddress?.id
            ? {...address, active: true}
            : {...address, active: false}
        )
        return {addresses: mapResult, selectedAddress: selectedAddress};
    }

    async editAddress({
                          id,
                          name,
                          address,
                          user,
                      }: {
        id: string;
        name: string;
        address: string;
        user: { userId: string };
    }) {
        const existingAddress = await prisma.walletAddress.findUnique({
            where: {
                id,
            },
        });

        if (!existingAddress) {
            throw new ErrorHandler(404, "Address not found!");
        }

        const otherAddressWithSameName = await prisma.walletAddress.findFirst({
            where: {
                id: {
                    not: id,
                },
                address,
                name,
                userId: user.userId,
            },
        });

        if (otherAddressWithSameName) {
            throw new ErrorHandler(
                400,
                "Another address with the same name and address already exists."
            );
        }

        const updatedAddress = await prisma.walletAddress.update({
            where: {
                id,
            },
            data: {
                name,
                address,
                user: {
                    connect: {
                        id: user.userId,
                    },
                },
            },
        });

        return updatedAddress;
    }

    async deleteAddress(addressId: string, user: any) {
        const existingAddress = await prisma.walletAddress.findUnique({
            where: {
                id: addressId,
            },
        });

        if (!existingAddress) {
            throw new ErrorHandler(404, "Address not found!");
        }

        await prisma.tokenAssignment.deleteMany({
            where: {
                walletAddressId: addressId,
            },
        });

        await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                selectedAddress: {
                    disconnect: true
                }
            }
        });

        await prisma.walletAddress.delete({
            where: {
                id: addressId,
            },
        });

        return existingAddress;
    }

    async setSelectedAddress(user: { userId: string }, addressId: string) {
        const userDb = await prisma.user.findUnique({
            where: {
                id: user.userId,
            },
            include: {
                WalletAddresses: true,
            },
        });

        if (!userDb) {
            throw new ErrorHandler(404, "User not found!");
        }

        const selectedAddress = userDb.WalletAddresses.find(
            (address) => address.id === addressId
        );

        if (!selectedAddress) {
            throw new ErrorHandler(404, "Address not found for the user!");
        }

        await prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                selectedAddress: {
                    connect: {
                        id: selectedAddress.id,
                    },
                },
            },
        });

        return selectedAddress;
    }
}
