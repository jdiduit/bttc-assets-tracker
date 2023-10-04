import {Box, Flex, rem, SegmentedControl, VisuallyHidden} from "@mantine/core";
import {IconGridDots, IconSettings, IconWallet} from "@tabler/icons-react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {useEffect} from "react";
import useAuthStore from "../../store/useAuthStore.tsx";
import {RoutePaths} from "@/Pages/routes.ts";
import useAppStore from "@/store/useAppStore.tsx";
import useTokenStore from "@/store/useTokenStore.tsx";

const iconProps = {
    style: {width: rem(20), height: rem(20), display: 'block'},
    stroke: 1.5,
};

const TabSegments = [
    {
        label: 'Balance',
        path: RoutePaths.BALANCE,
        icon: <IconWallet {...iconProps}/>
    },
    {
        label: 'NFT',
        path: RoutePaths.NFTS,
        icon: <IconGridDots {...iconProps}/>
    },
    {
        label: 'Settings',
        path: RoutePaths.SETTINGS,
        icon: <IconSettings {...iconProps}/>
    }
]

const AuthLayout = () => {
    const navigate = useNavigate()
    const {getAddresses} = useAddressStore()
    const {setTokens} = useTokenStore()
    const {setTabLocation, tabLocation} = useAppStore()
    const {user} = useAuthStore()

    const onChangeTab = (e: string) => {
        setTokens([])
        setTabLocation(e as RoutePaths)
        navigate(e)
    }

    useEffect(() => {
        if (user && localStorage.getItem('token')) {
            getAddresses()
        }
    }, [user]);

    useEffect(() => {
        setTabLocation(localStorage.getItem('location')!)
    }, []);

    return (
        <>
            <Outlet/>
            <Box
                bottom={0}
                left={0}
                right={0}
                w={'100%'}
                pos={'absolute'}
                style={{
                    backgroundColor: 'var(--mantine-color-body)',
                    boxShadow: 'var(--mantine-shadow-sm)',
                }}
            >
                <SegmentedControl
                    fullWidth
                    value={tabLocation!}
                    onChange={onChangeTab}
                    data={TabSegments.map(tab => ({
                        value: tab.path,
                        label: (
                            <Flex align={'center'} justify={'center'}>
                                {tab.icon}
                                <VisuallyHidden>{tab.label}</VisuallyHidden>
                            </Flex>
                        )
                    }))}
                />
            </Box>
        </>
    );
};

export default AuthLayout;