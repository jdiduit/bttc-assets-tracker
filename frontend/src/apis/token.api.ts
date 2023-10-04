import {$authHost} from "./api.ts";
import {TokenType} from "@/Pages/Tokens/TokenCard.tsx";

type PaginationType = {
    totalCount: number
}

type CreateTokenPayload = {
    name: string,
    address: string,
    symbol: string,
    decimals: string
}

type ToggleTokenActiveStatusPayload = {
    walletAddressId: string,
    tokenId: string,
    chainType: string,
}

export const createToken = async (payload: CreateTokenPayload): Promise<TokenType> => {
    const {data} = await $authHost.post('tokens/add', payload);
    return data;
};

export const getAllTokens = async (walletAddressId: string, cId: string, sortBy: string, orderSort: string): Promise<{
    data: TokenType[],
    pagination: PaginationType
}> => {
    const {data} = await $authHost.get(`tokens`, {
        params: {
            chainId: cId,
            walletAddressId: walletAddressId,
            sortBy: sortBy,
            orderSort: orderSort
        }
    });
    return data;
};

export const getTokenByAddress = async (address: string): Promise<TokenType> => {
    const {data} = await $authHost.get(`tokens/${address}`);
    return data;
};

export const getAllTokensByStatus = async (walletAddressId: string, cId: string, sortBy: string, orderSort: string, status: string): Promise<{
    data: TokenType[],
    pagination: PaginationType
}> => {
    const {data} = await $authHost.get(`tokens/by-status`, {
        params: {
            status: status,
            chainId: cId,
            walletAddressId: walletAddressId,
            sortBy,
            orderSort
        },
    });
    return data;
};

export const toggleTokenActiveStatus = async ({
                                                  walletAddressId,
                                                  tokenId,
                                                  chainType
                                              }: ToggleTokenActiveStatusPayload) => {
    const {data} = await $authHost.patch('tokens', {
        tokenId,
        walletAddressId,
        chainType
    });
    return data;
};
