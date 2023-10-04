import {$authHost} from "./api.ts";
import {AddressType} from "@/store/useAddressStore.tsx";

type ApiAddAddressPayload = {
    name: string,
    address: string,
}

type ApiEditAddressPayload = {
    name: string,
    address: string,
    id: string
}

type ApiGetAddressesResponse = {
    selectedAddress: AddressType,
    addresses: AddressType[]
}

type ApiEditAddressResponse = {
    id: string,
    name: string,
    address: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}

export const apiAddAddress = async (payload: ApiAddAddressPayload): Promise<any> => {
    const {data} = await $authHost.post('wallet-address/add', payload);
    return data;
};

export const apiGetAllAddresses = async (): Promise<ApiGetAddressesResponse> => {
    const {data} = await $authHost.get('wallet-address');
    return data;
};

export const apiEditAddresses = async (payload: ApiEditAddressPayload): Promise<ApiEditAddressResponse> => {
    const {data} = await $authHost.put('wallet-address', payload);
    return data;
};

export const apiDeleteAddresses = async (addressId: string): Promise<any> => {
    const {data} = await $authHost.delete('wallet-address', {
        params: {id: addressId}
    });
    return data;
};

export const apiSetSelectAddress = async (addressId: string): Promise<any> => {
    const {data} = await $authHost.patch('wallet-address/selected-address', {id: addressId});
    return data;
};
