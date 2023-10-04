import {create} from 'zustand';
import {getAllChains} from "@/apis/chain.api.ts";

export enum ChainTypeEnum {
    MAINNET = 'MAINNET',
    TESTNET = 'TESTNET'
}

export type ChainType = {
    id: string,
    chainId: string,
    name: string,
    rpc: string,
    type: string,
    nativeTokenSymbol: string,
    createdAt: string,
    updatedAt: string,
}

type ChainStoreStatic = {
    chains: ChainType[]
    isLoadingChains: boolean
}

type ChainStoreActions = {
    fetchChainsByType: (type: any) => void,
}

const useChainStore = create<ChainStoreStatic & ChainStoreActions>((set) => ({
    chains: [],
    isLoadingChains: false,
    fetchChainsByType: async (type) => {
        try {
            set({isLoadingChains: false})
            const chains: ChainType[] = await getAllChains(type)
            set({chains: chains, isLoadingChains: false})
        } catch (e) {
            console.log(e)
            set({isLoadingChains: false})
        }
    }
}));

export default useChainStore;
