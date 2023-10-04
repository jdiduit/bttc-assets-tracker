import {
    ActionIcon,
    Alert,
    Box,
    Button,
    Drawer,
    Flex,
    Image,
    Paper,
    rem,
    ScrollArea,
    Stack,
    Text,
    UnstyledButton
} from "@mantine/core";
import Logo from '@/assets/images/logo.png'
import {IconChevronRight, IconInfoCircle, IconX} from "@tabler/icons-react";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {shortAddress} from "@/utils/functions.ts";
import s from "./LayoutDrawer.module.css";
import useAuthStore from "../../store/useAuthStore.tsx";
import {ToggleTheme} from "../ToggleTheme.tsx";
import {modals} from "@mantine/modals";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "@/Pages/routes.ts";
import useAppStore from "@/store/useAppStore.tsx";
import {useViewportSize} from "@mantine/hooks";

const LayoutDrawer = ({opened, toggle}: { opened: boolean, toggle: () => void }) => {
    const {setSelectedAddress, addresses} = useAddressStore()
    const {logout} = useAuthStore()
    const {setTabLocation} = useAppStore()
    const {height} = useViewportSize();

    const navigate = useNavigate()

    const onLogoutModal = () => {
        modals.openConfirmModal({
            title: 'Logout',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to log out?
                </Text>
            ),
            labels: {confirm: 'Confirm', cancel: 'Cancel'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                logout()
                toggle()
            }
        });
    }

    const onNavigateToSavedAddressPage = () => {
        setTabLocation(RoutePaths.SETTINGS)
        navigate(RoutePaths.SAVED_ADDRESSES)
        toggle()
    }

    return (
        <Drawer
            size="xs"
            p={0}
            scrollAreaComponent={ScrollArea.Autosize}
            opened={opened}
            withCloseButton={false}
            style={{position: 'relative', width: '100%', height: '100%', boxShadow: 'var(--mantine-shadow-md)',}}
            onClose={toggle}
        >
            <Box
                p={'xs'}
                top={0}
                left={0}
                right={0}
                w={'100%'}
                pos={'absolute'}
                style={{
                    zIndex: '100',
                    backgroundColor: 'var(--mantine-color-body)',
                    boxShadow: 'var(--mantine-shadow-sm)',
                }}
            >
                <Paper>
                    <Flex justify={'space-between'} align={'center'}>
                        <Flex align={'center'} justify={'center'} gap={10}>
                            <Paper style={{borderWidth: 2}} radius={'50%'} withBorder shadow={'md'}>
                                <Image radius={'50%'} maw={40} height={'auto'} fit={'contain'} src={Logo}/>
                            </Paper>
                            <Text
                                fz={20}
                                ta="center"
                                fw={800}
                            >
                                BTTC Asset Tracker
                            </Text>
                        </Flex>
                        <ActionIcon onClick={toggle} variant={'default'}>
                            <IconX/>
                        </ActionIcon>
                    </Flex>
                </Paper>
            </Box>

            <Paper mt={rem(60)} radius={'5px'} withBorder p={'sm'}>
                <ScrollArea h={height - 190}>
                    {addresses?.length !== 0
                        ? <Stack>
                            {addresses.map(address =>
                                <UnstyledButton key={address?.id} onClick={() => {
                                    setSelectedAddress(address)
                                    toggle()
                                }}>
                                    <Paper
                                        classNames={{root: `${s.settingButton} ${address?.active ? s.selectedAddress : ''}`}}
                                        p={'xs'} py={3}
                                        withBorder shadow={'sm'}
                                    >
                                        <Stack gap={1}>
                                            <Text size={'md'} fw={700}>{shortAddress(address?.name!, 20)}</Text>
                                            <Text>{shortAddress(address?.address!, 20)}</Text>
                                        </Stack>
                                    </Paper>
                                </UnstyledButton>
                            )}
                        </Stack>
                        : <Stack>
                            <Alert p={'xs'} variant="light" color="blue" icon={<IconInfoCircle/>}>
                                No wallet address
                            </Alert>
                            <Button onClick={onNavigateToSavedAddressPage} rightSection={<IconChevronRight/>}>
                                Add new address
                            </Button>
                        </Stack>
                    }
                </ScrollArea>
            </Paper>
            <Paper mt={'sm'} radius={'5px'} withBorder p={'xs'}>
                <Flex justify={'space-between'} align={'center'}>
                    <ToggleTheme/>
                    <Button
                        color={'red'}
                        size="compact-sm"
                        onClick={onLogoutModal}
                        variant="filled"
                        radius="xl"
                    >
                        Logout
                    </Button>
                </Flex>
            </Paper>
        </Drawer>
    );
};

export default LayoutDrawer;