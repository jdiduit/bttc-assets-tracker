import {Paper, Stack, Text, UnstyledButton} from "@mantine/core";
import s from "./Settings.module.css";
import {Link} from "react-router-dom";
import PageWrapper from "../../components/PageWrapper.tsx";
import {RoutePaths} from "@/Pages/routes.ts";
import useTokenStore from "@/store/useTokenStore.tsx";
import {useEffect} from "react";

const Settings = () => {
    const {setTokens} = useTokenStore()

    useEffect(() => {
        setTokens([])
    }, []);

    return (
        <PageWrapper title={'Settings'}>
            <Stack px={'sm'}>
                <UnstyledButton component={Link} to={RoutePaths.SAVED_ADDRESSES}>
                    <Paper classNames={{root: s.settingButton}} p={'xs'} py={4} withBorder shadow={'sm'}>
                        <Stack gap={3}>
                            <Text size={'xl'} fw={700}>Saved addresses</Text>
                            <Text>View, edit or remove added addresses</Text>
                        </Stack>
                    </Paper>
                </UnstyledButton>
                <UnstyledButton component={Link} to={RoutePaths.CHANGE_NETWORK}>
                    <Paper classNames={{root: s.settingButton}} p={'xs'} py={4} withBorder shadow={'sm'}>
                        <Stack gap={3}>
                            <Text size={'xl'} fw={700}>Network</Text>
                            <Text>Change your network settings</Text>
                        </Stack>
                    </Paper>
                </UnstyledButton>
                <UnstyledButton component={Link} to={RoutePaths.TOKENS}>
                    <Paper classNames={{root: s.settingButton}} p={'xs'} py={4} withBorder shadow={'sm'}>
                        <Stack gap={3}>
                            <Text size={'xl'} fw={700}>Tokens</Text>
                            <Text>List of tracked BRC20 tokens</Text>
                        </Stack>
                    </Paper>
                </UnstyledButton>
            </Stack>
        </PageWrapper>
    );
};

export default Settings