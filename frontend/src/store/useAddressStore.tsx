import {create} from 'zustand'
import {
    apiAddAddress,
    apiDeleteAddresses,
    apiEditAddresses,
    apiGetAllAddresses,
    apiSetSelectAddress
} from "../apis/address.api.ts";
import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";
import {nprogress} from "@mantine/nprogress";

export type AddressType = {
    id: string,
    name: string,
    address: string,
    userId: string,
    nativeTokenSymbol: string,
    decimals: string,
    active: boolean
}

interface AddressState {
    addresses: Partial<AddressType>[],
    selectedAddress: AddressType | null,
    isLoading: boolean,
    addAddress: (address: Partial<AddressType>, onSuccessCallback: any) => void,
    setSelectedAddress: (address: Partial<AddressType>) => void,
    editAddress: (id: string, address: Partial<AddressType>, onSuccessCallback: any) => void,
    setAddresses: (addresses: Partial<AddressType>[]) => void,
    deleteAddress: (id: string) => void,
    getAddresses: () => void,
}

export const useAddressStore = create<AddressState>()((set, get) => ({
    addresses: [],
    selectedAddress: null,
    isLoading: false,
    setSelectedAddress: async (address) => {
        try {
            nprogress.set(50)
            if (get().selectedAddress?.address! !== address?.address) {
                const newAddress = await apiSetSelectAddress(address.id!)
                set((state) => ({
                    selectedAddress: newAddress, addresses: state?.addresses?.map(item => item?.id === newAddress?.id
                        ? {...item, active: true}
                        : {...item, active: false}
                    )
                }))
            }
        } catch (e: any) {
            console.log(e.response?.data?.error?.message)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
        } finally {
            nprogress.complete()
        }
    },
    addAddress: async (address, onSuccessCallback) => {
        nprogress.set(50)
        try {
            const newAddress = await apiAddAddress({
                address: address.address!,
                name: address.name!,
            })

            if (get().addresses?.length === 0) {
                set((state) => ({
                    addresses: [...state.addresses, {...newAddress, active: true}],
                    selectedAddress: {...newAddress, active: true}
                }));
            } else {
                set((state) => ({
                    addresses: [...state.addresses, newAddress],
                }));
            }
            if (onSuccessCallback) onSuccessCallback()
        } catch (e: any) {
            console.log(e.response?.data?.error?.message)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
        } finally {
            nprogress.complete()
        }
    },
    editAddress: async (id, payload, onSuccessCallback) => {
        nprogress.set(50)
        try {
            const updatedAddress = await apiEditAddresses({
                name: payload.name!,
                address: payload.address!,
                id: payload.id!
            })
            set((state) => ({
                addresses: state.addresses.map((address) =>
                    address.id === id ? updatedAddress : address
                ),
            }));
            if (onSuccessCallback) onSuccessCallback()
        } catch (e: any) {
            console.log(e)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
        } finally {
            nprogress.complete()
        }
    },
    deleteAddress: async (id) => {
        nprogress.set(50)
        try {
            await apiDeleteAddresses(id)
            set((state) => ({
                addresses: state.addresses.filter((address) => address.id !== id),
            }));
            if (get().addresses?.length === 0) set({selectedAddress: null})
        } catch (e: any) {
            console.log(e)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
        } finally {
            nprogress.complete()
        }
    },
    setAddresses: (addresses) => {
        set({addresses});
    },
    getAddresses: async () => {
        try {
            set({isLoading: true});
            const addresses = await apiGetAllAddresses()
            set({addresses: addresses?.addresses, selectedAddress: addresses?.selectedAddress, isLoading: false});
        } catch (e: any) {
            console.log(e)
            set({isLoading: false});
        }
    }
}))