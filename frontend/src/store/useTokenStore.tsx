import {create} from 'zustand';
import {createToken, getAllTokens, getAllTokensByStatus, toggleTokenActiveStatus} from "@/apis/token.api.ts";
import {TokenType} from "@/Pages/Tokens/TokenCard.tsx";
import {nprogress} from "@mantine/nprogress";
import {removeQuotes} from "@/utils/functions.ts";

type TokenStoreStatic = {
    totalCount: number,
    tokens: TokenType[],
    isLoadingTokens: boolean,
}

type TokenStoreActions = {
    setTokens: (tokens: TokenType[]) => void
    fetchTokens: (walletAddressId: string, cId: string, sortBy: string, orderSort: string) => void,
    fetchTokensByStatus: (walletAddressId: string, cId: string, sortBy: string, orderSort: string, status: string) => void,
    createToken: (_: { name: string, address: string, decimals: string, symbol: string }) => void
    toggleTokenActiveStatus: (_: { tokenId: string, walletAddressId: string, chainType: string }) => void
}

const useTokenStore = create<TokenStoreStatic & TokenStoreActions>((set) => ({
    tokens: [],
    totalCount: 0,
    isLoadingTokens: false,
    setTokens: (tokens: TokenType[]) => {
        set({tokens: tokens})
    },
    fetchTokens: async (walletAddressId, cId, sortBy, orderSort) => {
        try {
            set({isLoadingTokens: false})
            const tokensData = await getAllTokens(walletAddressId, cId, sortBy, orderSort)
            set({
                tokens: tokensData?.data,
                isLoadingTokens: false,
                totalCount: tokensData?.pagination?.totalCount
            })
        } catch (e) {
            console.log(e)
            set({isLoadingTokens: false})
        }
    },
    fetchTokensByStatus: async (walletAddressId, cId, sortBy, orderSort, status) => {
        try {
            set({isLoadingTokens: false})
            const tokensData = await getAllTokensByStatus(walletAddressId, cId, sortBy, orderSort, status)
            set({
                tokens: tokensData?.data,
                isLoadingTokens: false,
                totalCount: tokensData?.pagination?.totalCount
            })
        } catch (e) {
            console.log(e)
            set({isLoadingTokens: false})
        }
    },
    createToken: async ({name, address, decimals, symbol}) => {
        try {
            const newToken = await createToken({
                name: removeQuotes(name),
                address,
                decimals: parseInt(decimals).toString(),
                symbol: removeQuotes(symbol)
            })
            set((state) => ({tokens: [newToken, ...state.tokens]}))
        } catch (e) {
            console.log(e)
        }
    },
    toggleTokenActiveStatus: async ({tokenId, walletAddressId, chainType}) => {
        try {
            nprogress.set(50)
            const updatedToken = await toggleTokenActiveStatus({
                tokenId,
                walletAddressId,
                chainType
            })
            set((state) => ({
                tokens: state?.tokens?.map(token => token?.id === updatedToken?.tokenId ? {
                    ...token,
                    status: updatedToken?.status
                } : token)
            }))
        } catch (e) {
            console.log(e)
        } finally {
            nprogress.complete()
        }
    },
}));

export default useTokenStore;
