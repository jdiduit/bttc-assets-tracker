import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware'
import {RoutePaths} from "@/Pages/routes.ts";

type AppStoreStatic = {
    location: string,
}

type AppStoreActions = {
    setLocation: (location: string) => void,
    tabLocation: RoutePaths,
    setTabLocation: (location: string) => void
}

export const useAppStore = create(
    persist<AppStoreStatic & AppStoreActions>(
        (setState) => ({
            location: '',
            tabLocation: RoutePaths.BALANCE,
            setTabLocation: (location) => {
                localStorage.setItem('location', location)
                setState(() => ({tabLocation: location as RoutePaths}));
            },
            setLocation: (content) => {
                setState(() => ({location: content}));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

export default useAppStore;
