import {create} from 'zustand';
import {apiCurrentUser, apiLogin, apiregister, setCurrentChain} from "../apis/auth.api.ts";
import {AddressType} from "@/store/useAddressStore.tsx";
import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";
import {ChainType, ChainTypeEnum} from "@/store/useChainStore.tsx";
import {nprogress} from "@mantine/nprogress";

type UserType = {
    name: string,
    address: string,
    selectedAddress?: AddressType,
    selectedChain?: ChainType,
    selectedChainType: ChainTypeEnum.MAINNET | ChainTypeEnum.TESTNET,
    token: string
}

type UserStoreStatic = {
    selectedChainType: ChainTypeEnum.MAINNET | ChainTypeEnum.TESTNET,
    selectedChain: ChainType | null,
    user: Partial<UserType> | null,
    isLoadingUser: boolean,
}

type UserStoreActions = {
    fetchUser: (onSuccessCallback: any) => void,
    logout: () => void,
    login: (x: { password: string, username: string }, onSuccessCallback: any) => void,
    register: (x: { password: string, username: string }, onSuccessCallback: any) => void,
    setCurrentChainType: (type: any) => void,
    setCurrentChain: (id: string) => void,
}

const useAuthStore = create<UserStoreStatic & UserStoreActions>((set) => ({
    user: null,
    isLoadingUser: true,
    selectedChainType: ChainTypeEnum.MAINNET,
    selectedChain: null,
    login: async ({username, password}, onSuccessCallback) => {
        nprogress.set(50)
        try {
            set(() => ({isLoadingUser: true}));
            const currentUser: { token: string, user: any } = await apiLogin({
                password,
                username
            })
            if (!currentUser) {
                localStorage.removeItem('token');
                set({user: null, isLoadingUser: false})
            } else if (currentUser) {
                localStorage.setItem('token', currentUser?.token)
                set({
                    selectedChain: currentUser?.user?.selectedChain,
                    selectedChainType: currentUser?.user?.selectedChain?.type,
                    user: currentUser?.user,
                    isLoadingUser: false
                })
                if (onSuccessCallback) onSuccessCallback()
            }
        } catch (e: any) {
            console.log(e)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
            set(() => ({isLoadingUser: false}));
        } finally {
            nprogress.complete()
        }
    },
    register: async ({username, password}, onSuccessCallback) => {
        nprogress.set(50)
        try {
            set(() => ({isLoadingUser: true}));
            const currentUser: { token: string, user: any } = await apiregister({
                password,
                username,
            })
            if (!currentUser) {
                localStorage.removeItem('token');
                set({user: null, isLoadingUser: false})
            } else if (currentUser) {
                localStorage.setItem('token', currentUser?.token)
                set({
                    selectedChain: currentUser?.user?.selectedChain,
                    selectedChainType: currentUser?.user?.selectedChain?.type,
                    user: {
                        ...currentUser?.user,
                        selectedAddress: null,
                        isLoadingUser: false
                    }
                })
                if (onSuccessCallback) onSuccessCallback()
            }
        } catch (e: any) {
            console.log(e)
            notifications.show({
                title: 'Error!',
                icon: <IconX/>,
                message: e.response?.data?.error?.message,
                color: 'red'
            })
            set(() => ({isLoadingUser: false}));
        } finally {
            nprogress.complete()
        }
    },
    fetchUser: async (onSuccessCallback) => {
        if (localStorage.getItem('token')) {
            set(() => ({isLoadingUser: true}));
            try {
                const data: UserType = await apiCurrentUser()
                set(() => ({
                    isLoadingUser: false,
                    user: data,
                    selectedChain: data.selectedChain,
                    selectedChainType: data?.selectedChain?.type as ChainTypeEnum,
                }));
                if (onSuccessCallback) onSuccessCallback()
            } catch (e) {
                console.log(e)
                set(() => ({isLoadingUser: false}));
            } finally {
                set(() => ({isLoadingUser: false}));
            }
        }
    },
    logout: async () => {
        nprogress.set(50)
        set(() => ({user: null}));
        localStorage.removeItem('token')
        nprogress.complete
    },
    setCurrentChainType: async (type) => {
        try {
            nprogress.set(50)
            set({selectedChainType: type})
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
    setCurrentChain: async (id) => {
        try {
            nprogress.set(50)
            const selectedChain: ChainType = await setCurrentChain(id)
            set({selectedChain: selectedChain})
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
}));

export default useAuthStore;
