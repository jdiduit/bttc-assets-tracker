import axios from 'axios';

const $host = axios.create({baseURL: `${import.meta.env.VITE_SERVER_API_URL}api/`});
const $authHost = axios.create({baseURL: `${import.meta.env.VITE_SERVER_API_URL}api/`});

const authInterceptor = (config: any) => {
    config.headers.authorization = `${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
    (config: any) => {
        return config;
    },
    async (error: any) => {
        const originalRequest = error.config;
        if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                localStorage.setItem('token', error.response?.data?.error?.message);
                return $authHost.request(originalRequest);
            } catch (e) {
                console.log('No authorized');
            }
        }
        throw error;
    }
);

export {$host, $authHost};
