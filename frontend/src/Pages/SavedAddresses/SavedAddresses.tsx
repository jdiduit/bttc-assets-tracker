import {Button, Center, Collapse, Flex, Loader, ScrollArea, Space, Stack} from "@mantine/core";
import AddAddressCard from "./AddAddressCard.tsx";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {useEffect} from "react";
import WalletAddressCard from "./WalletAddressCard.tsx";
import PageWrapper from "../../components/PageWrapper.tsx";
import {RoutePaths} from "@/Pages/routes.ts";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import {IconPlus} from "@tabler/icons-react";

const SavedAddresses = () => {
    const [opened, {toggle: toggleShowAddForm, open}] = useDisclosure()
    const {height} = useViewportSize();

    const {addresses, getAddresses, isLoading} = useAddressStore()

    useEffect(() => {
        getAddresses()
        if(addresses?.length === 0) open()
    }, []);

    if (isLoading)
        return <Center style={{height: '100%'}}><Loader/></Center>

    return (
        <PageWrapper backLink={RoutePaths.SETTINGS} title={'Saved addresses'}>
            <Flex justify={'end'} pr={'xs'}>
                <Button
                    variant={'subtle'}
                    rightSection={<IconPlus size={15}/>}
                    onClick={toggleShowAddForm}
                    size={'compact-sm'}
                >
                    Add address
                </Button>
            </Flex>
            <ScrollArea h={height - 195} offsetScrollbars>
                <Collapse in={opened}>
                    <Space mt={'sm'}/>
                    <AddAddressCard/>
                </Collapse>
                <Stack mt={'sm'} gap={10}>
                    {addresses.map(address =>
                        <WalletAddressCard key={address?.id} {...address}/>
                    )}
                </Stack>
                <Space h={50}/>
            </ScrollArea>
        </PageWrapper>
    );
};

export default SavedAddresses;