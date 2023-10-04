import {IconSortAscending, IconSortAZ, IconSortDescending, IconSortZA} from "@tabler/icons-react";
import {rem} from "@mantine/core";

export const PROXY_URL = 'https://corsproxy.xyz'
export const MORALIS_URL = 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder'

export enum CHAINS {
    MAINNET = '0xc7',
    TESTNET = '0x405',
}

export const MINT_CHAINS: Record<CHAINS, {
    nativeName: string,
    name: string,
    rpc: string;
    chainId: string,
    rpcFetch: string,
    type: string
}> = {
    [CHAINS.MAINNET]: {
        rpc: 'https://rpc.bt.io',
        rpcFetch: `${PROXY_URL}/https://rpc.bt.io`,
        chainId: '199',
        type: 'mainnet',
        name: 'BTTC Mainnet',
        nativeName: 'BTT'
    },
    [CHAINS.TESTNET]: {
        rpc: 'https://pre-rpc.bt.io',
        rpcFetch: `${PROXY_URL}/https://pre-rpc.bt.io`,
        chainId: '1029',
        type: 'testnet',
        name: 'BTTC Testnet (Donau)',
        nativeName: 'BTT'
    }
}

export const NFT_CONTRACT = '0xa1019535e6b364523949eaf45f4b17521c1cb074'
export const TESTNET_MINT_NFT_CONTRACT = '0x060555510A0AB989Ca75aF91C3acA7AA0f2DAB94'
export const MAINNET_MINT_NFT_CONTRACT = '0x060555510A0AB989Ca75aF91C3acA7AA0f2DAB94'
export const IPFS_GATEWAY = 'https://ipfs.moralis.io:2053/ipfs/'

export const TESTNET_TOKEN_IMAGES: Record<string, string> = {
    "0x61a17734e6b497cba51f16ae23bcf85aeb6984cb": "https://static.bt.io/production/upload/logo/0xB388C677F39698E3B691bEF62BBD32ce54A663F9.png",
    "0x0000000000000000000000000000000000001010": "https://static.bt.io/production/logo/1002000.png",
    "0xdf83e6ef1b1db73718d9a3c35380033b1b1915c3": "https://static.bt.io/production/logo/1002000.png",
    "0xd9dcae335acd3d4ffd2e6915dc702a59136ab46f": "https://static.bt.io/production/logo/1002000.png",
    "0x12196ecbcc63a4e61f6907535097990494e3d215": "https://static.bt.io/production/upload/logo/0x3fB73c6f883a15A5431688099880E8bFc79908f3.png",
    "0x2780f8f71db5beb7e7f9a9adf592437e5c0c8bb4": "https://static.bt.io/production/logo/just_icon.png",
    "0x73b35988f8b625caf2c0475996e8eeb99b99d026": "https://static.bt.io/production/logo/just_icon.png",
    "0x593ccdab8cd2a21467e4d27241ce999ab8de83bc": "https://static.bt.io/production/logo/just_icon.png",
    "0x7a5da577445729fe88d12f51ef8c1d0b022d8b57": "https://static.bt.io/production/upload/logo/TFczxzPhnThNSqr5by8tvxsdCFRRz6cPNq.png",
    "0x51132b16f526b2798b7a5ee8427480b9b430b2b6": "https://static.bt.io/production/upload/logo/TFczxzPhnThNSqr5by8tvxsdCFRRz6cPNq.png",
    "0x4e9446b6c98cbe38a77c31ff4413fd58d08b2a9d": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0x2f05ac16a299d77ab2566a9e7f40c25a2a5b0c03": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0xb1dd5e7556d90c0589d56c144df39337d82a1fea": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0x8e009872b8a6d469939139be5e3bbd99a731212f": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0xa20cfbff5b21c1cd64552c7babcece4a336088ef": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0x126e6fc28b9a4b31b51e78801216b09beed5b4c0": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0x88d81a35e07c72c01fbe14ce775941cb43231f84": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0xb2af0952703ca1eaba838af01448a19a72ca02e6": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0xa092706717dcb6892b93f0baacc07b902dbd509c": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0x834982c9b0690ed7ca35e10b18887c26c25cdc82": "https://static.bt.io/production/logo/usdtlogo.png",
    "0x298fa36a9e2ebd6d3698e552987294fa8b65cd00": "https://static.bt.io/production/logo/usdtlogo.png",
    "0x7b906030735435422675e0679bc02dae7dfc71da": "https://static.bt.io/production/logo/usdtlogo.png",
    "0xb386deec7cf7e2021a5873d2f48b4a3dacda083f": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg",
    "0x592fedee620c1c0eae56c44c79c4a5a69c8220be": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg",
    "0x52a4942848af737a5ac71bf23bf093dc64548d36": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg",
}

export const MAINNET_TOKENS_IMAGES: Record<string, string> = {
    "0xeeca56f73594b8c8eace49044be41ee321a6523f": "https://static.bt.io/production/BTTC_Logo/AAVE.svg",
    "0x43559b1786c06d6b826e3cf9aa667ed8840f9106": "https://static.bt.io/production/BTTC_Logo/ADA.svg",
    "0x56dd25296e5124b1eab55244f312d024aaf31f22": "https://static.bt.io/production/BTTC_Logo/ALPACA.svg",
    "0x4cc2fc7373b491db83be3feb5db622e0773420cf": "https://static.bt.io/production/BTTC_Logo/AUTO.svg",
    "0xbd1d93ed87cdc4fdfc8ec1baac3d1097f77ef6c9": "https://static.bt.io/production/BTTC_Logo/AXS.svg",
    "0xb817b1acf8568c8aa28667ea643c31caf7a29dfd": "https://static.bt.io/production/BTTC_Logo/BAKE.svg",
    "0xb8e7f4a9c72f0c8a6611a2d5a6887db8753ab38a": "https://static.bt.io/production/BTTC_Logo/BCH.svg",
    "0x0000000000000000000000000000000000001010": "https://static.bt.io/production/logo/1002000.png",
    "0xcbb9edf6775e39748ea6483a7fa6a385cd7e9a4e": "https://static.bt.io/production/logo/1002000.png",
    "0x65676055e58b02e61272cedec6e5c6d56badfb86": "https://static.bt.io/production/logo/1002000.png",
    "0x4bf20082a4e60dc3d48808e98662181c701e438d": "https://static.bt.io/production/BTTC_Logo/BUNNY.svg",
    "0x1aa43ade447976518b8b3850b25071e4893df397": "https://static.bt.io/production/BTTC_Logo/BURGER.svg",
    "0xde47772ac041a4ccf3c865632131d1093e51c02d": "https://static.bt.io/production/BTTC_Logo/BUSD.svg",
    "0x6e626c62d54554737697e633ef9578ac3c4ba4ea": "https://static.bt.io/production/BTTC_Logo/BUSD.svg",
    "0x2eb6d639621da30f61458d160338cd90547ade9f": "https://static.bt.io/production/BTTC_Logo/CAKE.svg",
    "0xf0bace186818844758c89b4b2b252d3918781a8a": "https://static.bt.io/production/BTTC_Logo/comp.svg",
    "0x2e5c72f567da40d0021fb9cadb6980c86c3a8aa7": "https://static.bt.io/production/BTTC_Logo/CRV.svg",
    "0xe7dc549ae8db61bde71f22097becc8db542ca100": "https://static.bt.io/bttc/4943.png",
    "0x352cb5e19b12fc216548a2677bd0fce83bae434b": "https://static.bt.io/production/BTTC_Logo/DOT.svg",
    "0x1249c65afb11d179ffb3ce7d4eedd1d9b98ad006": "https://static.bt.io/production/BTTC_Logo/ETH.svg",
    "0xa20dfb01dca223c0e52b0d4991d4afa7e08e3a50": "https://static.bt.io/production/BTTC_Logo/ETH.svg",
    "0xbd1a85ff96d48c3491fc65943166b7be19966d4f": "https://static.bt.io/production/BTTC_Logo/ETH.svg",
    "0xad9a21ff0c9d854ca8c1360af28d4fcbdac53b4f": "https://static.bt.io/production/BTTC_Logo/FTM.svg",
    "0x01ef4875f33992617775800a0afc4b087bae808a": "https://static.bt.io/production/BTTC_Logo/FTT.svg",
    "0x2df7f3f1b413e9acc2140d19257a37b4e79fd163": "https://static.bt.io/production/BTTC_Logo/GRT.svg",
    "0x4c6df5adecc64a35c13863daab59b886cc1c780c": "https://static.bt.io/production/BTTC_Logo/JST.svg",
    "0x6c0a243302429d3ab54207414aeabb7c6be70aeb": "https://static.bt.io/production/BTTC_Logo/JST.svg",
    "0x17501034df227d8565a8c11f41df2418f5d403b6": "https://static.bt.io/production/BTTC_Logo/JST.svg",
    "0x18fa72e0ee4c580a129b0ce5bd0694d716c7443e": "https://static.bt.io/production/logo/logo-knc.png",
    "0xe467f79e9869757dd818dfb8535068120f6bcb97": "https://static.bt.io/production/logo/logo-knc.png",
    "0xfd3b093ab6bd4f40810f19e5ff822ac8cc7e3184": "https://static.bt.io/production/BTTC_Logo/LINK.svg",
    "0xe9122fb2ae79709beae4a6d41b06cd4ec9ed932d": "https://static.bt.io/production/BTTC_Logo/LTC.svg",
    "0x39a2ec2e3570aa234e49ffec96f0684a352e3e0e": "https://static.bt.io/production/BTTC_Logo/MATIC.svg",
    "0x01910c7821f7652fedeb21334a9e256059084579": "https://static.bt.io/production/BTTC_Logo/NFT.svg",
    "0x0e0c0f3df7f7989272e63a459483dd86c4a9a943": "https://static.bt.io/production/BTTC_Logo/NFT.svg",
    "0x89a93f94c0a3f388930c4a568430f5e8ffffd3ec": "https://static.bt.io/production/BTTC_Logo/NFT.svg",
    "0x26290429ac8839cb7b16aa283dab359b43e574eb": "https://static.bt.io/production/BTTC_Logo/SHIB.svg",
    "0xcfb48b550e4d864766e9aefe6b104871972a3b34": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0x13990e637e74ec35fa6aefccd0292ee5fa83738d": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0x76accfb75b8bb7c6c295f04d19c1d184d274c853": "https://static.bt.io/production/logo/TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S.png",
    "0xedf53026aea60f8f75fca25f8830b7e2d6200662": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0xdc3e2d18b6b1b5db09ecdb7f6c8b8fa01564236f": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0x5bae3d53484848a4a15607b2490d51b484bf42dc": "https://static.bt.io/production/upload/logo/TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR.png",
    "0xa2611f4488c92e1a91eb4d2a8d30110eba9925b5": "https://static.bt.io/production/BTTC_Logo/TUSD.svg",
    "0xe7424ab0e1828d83ad402da5644142e55598c782": "https://static.bt.io/production/BTTC_Logo/TUSD.svg",
    "0x04b0f8bd78d07be6d27209163a5174b4b4ec0fbd": "https://static.bt.io/production/BTTC_Logo/TUSD.svg",
    "0x1e0c6878f875da634f19c8eb989f416f5c759252": "https://static.bt.io/production/BTTC_Logo/TWT.svg",
    "0xe86c326e9a97c3fb6086d22ca396013d62bfecca": "https://static.bt.io/production/BTTC_Logo/UNI.svg",
    "0xca424b845497f7204d9301bd13ff87c0e2e86fcf": "https://static.bt.io/production/BTTC_Logo/USDC.svg",
    "0xae17940943ba9440540940db0f1877f101d39e8b": "https://static.bt.io/production/BTTC_Logo/USDC.svg",
    "0x935faa2fcec6ab81265b301a30467bbc804b43d3": "https://static.bt.io/production/BTTC_Logo/USDC.svg",
    "0x74e7cef747db9c8752874321ba8b26119ef70c9e": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0xb602f26bf29b83e4e1595244000e0111a9d39f62": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0x17f235fd5974318e4e2a5e37919a209f7c37a6d1": "https://usdd-images.s3.amazonaws.com/images/USDD.png",
    "0xdd85d7bdd2b35a38f527f73bad1acb09b7a1e35c": "https://static.bt.io/production/logo/usdj.png",
    "0x9b5f27f6ea9bbd753ce3793a07cba3c74644330d": "https://static.bt.io/production/BTTC_Logo/USDT.svg",
    "0xe887512ab8bc60bcc9224e1c3b5be68e26048b8b": "https://static.bt.io/production/BTTC_Logo/USDT.svg",
    "0xdb28719f7f938507dbfe4f0eae55668903d34a15": "https://static.bt.io/production/BTTC_Logo/USDT.svg",
    "0xeb7121ea70e95c7141c58f15e79f89c5cfb9acbc": "https://static.bt.io/production/BTTC_Logo/UST.svg",
    "0x9888221fe6b5a2ad4ce7266c7826d2ad74d40ccf": "https://static.bt.io/production/BTTC_Logo/WBTC.svg",
    "0x366c21bffbb2e60aadf8a1d1d6e0c45096f07d9f": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg",
    "0xf93d4af9caf6f9995bcc347eb7a1a93424b4723a": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg",
    "0xd36ca9a2efff2ec05ed016d7cd28e38659d7d09b": "https://static.bt.io/profile_images/JKtJTydD_400x400.jpg"
}

export const SortOrder = [
    {
        label: 'Name',
        value: 'name',
        order: 'asc',
        iconLeft: <IconSortAscending style={{width: rem(14), height: rem(14)}}/>,
        iconRight: <IconSortAZ/>
    },
    {
        label: 'Name',
        value: 'name',
        order: 'desc',
        iconLeft: <IconSortDescending style={{width: rem(14), height: rem(14)}}/>,
        iconRight: <IconSortZA/>
    },
]