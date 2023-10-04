import {$authHost} from "./api.ts";
import {ChainType, ChainTypeEnum} from "@/store/useChainStore.tsx";

export const getAllChains = async (type: ChainTypeEnum): Promise<ChainType[]> => {
    const {data} = await $authHost.get(`chains/${type}`);
    return data;
};

