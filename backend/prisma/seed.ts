import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.chain.create({
        data: {
            name: 'BTTC Testnet (Donau)',
            type: 'TESTNET',
            nativeTokenSymbol: 'BTT',
            chainId: '0x405',
            rpc: 'https://pre-rpc.bt.io'
        }
    })

    await prisma.chain.create({
        data: {
            name: 'BTTC Mainnet',
            type: 'MAINNET',
            nativeTokenSymbol: 'BTT',
            chainId: '0xc7',
            rpc: 'https://rpc.bt.io'
        }
    })
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })