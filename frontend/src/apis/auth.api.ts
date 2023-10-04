import {$authHost, $host} from "./api.ts";

type ApiLoginPayload = {
    username: string,
    password: string
}

type ApiRegisterPayload = {
    username: string,
    password: string
}

export const apiLogin = async (payload: ApiLoginPayload): Promise<{ token: string, user: any }> => {
    const {data} = await $host.post('auth/login', payload);
    return data;
};

export const apiregister = async (payload: ApiRegisterPayload): Promise<{ token: string, user: any }> => {
    const {data} = await $host.post('auth/register', payload);
    return data;
};

export const apiCurrentUser = async () => {
    const {data} = await $authHost.get('auth/current-user');
    return data;
};

export const apiUserMe = async () => {
    const {data} = await $authHost.get('auth/me');
    return data;
};

export const setCurrentChain = async (id: string): Promise<any> => {
    const {data} = await $authHost.patch(`auth/set-current-chain`, {}, {
        params: {id: id}
    });
    return data;
};