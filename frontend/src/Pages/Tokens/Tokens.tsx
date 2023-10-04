import PageWrapper from "@/components/PageWrapper";
import {RoutePaths} from "@/Pages/routes.ts";
import AddTokenCard from "@/Pages/Tokens/AddTokenCard.tsx";
import useTokenStore from "@/store/useTokenStore.tsx";
import {useEffect, useState} from "react";
import {ActionIcon, Badge, Button, Center, Collapse, Flex, Loader, Menu, ScrollArea, Space, Stack} from "@mantine/core";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import {IconArrowsSort, IconPlus} from "@tabler/icons-react";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import TokenCard from "@/Pages/Tokens/TokenCard.tsx";
import useAuthStore from "@/store/useAuthStore.tsx";
import {SortOrder} from "@/utils/constants.tsx";

const Tokens = () => {
    const [opened, {toggle: toggleShowAddForm}] = useDisclosure()
    const [sortBy, setSortBy] = useState(SortOrder[0])
    const {selectedChain} = useAuthStore()
    const {selectedAddress} = useAddressStore()
    const {
        tokens,
        fetchTokens,
        isLoadingTokens,
    } = useTokenStore()
    const {height} = useViewportSize();

    useEffect(() => {
        if (selectedAddress && selectedChain)
            fetchTokens(selectedAddress?.id!, selectedChain.id, sortBy.value, sortBy.order)
    }, [selectedAddress, selectedChain]);

    return (
        <PageWrapper backLink={RoutePaths.SETTINGS} title={'Tokens'}>
            <Flex mt={'xs'} justify={'center'}>
                <Menu shadow="md">
                    <Menu.Target>
                        <Flex align={'center'} gap={'xs'}>
                            <Button
                                size={'compact-sm'}
                                rightSection={<IconArrowsSort size={20}/>}
                                variant={'subtle'}
                            >
                                Sort by:
                            </Button>
                            <Badge>
                                {sortBy?.label} | {sortBy?.order}
                            </Badge>
                        </Flex>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {SortOrder?.map(item =>
                            <Menu.Item
                                key={item?.value}
                                onClick={() => {
                                    setSortBy(item)
                                    if ((selectedChain !== undefined && selectedChain !== null))
                                        fetchTokens(selectedAddress?.id!, selectedChain.id, item.value, item.order)
                                }}
                                leftSection={item.iconLeft}
                                rightSection={
                                    <ActionIcon
                                        color={item?.order === 'desc' ? 'red' : 'green'}
                                        variant={'transparent'}
                                        size="sm"
                                    >
                                        {item.iconRight}
                                    </ActionIcon>
                                }
                            >
                                {item.label}
                            </Menu.Item>
                        )}
                    </Menu.Dropdown>
                </Menu>
            </Flex>

            <Center>
                <Button
                    mt={'sm'}
                    variant={'subtle'}
                    rightSection={<IconPlus size={15}/>}
                    onClick={toggleShowAddForm}
                    size={'compact-sm'}
                >
                    Add custom token
                </Button>
            </Center>

            <ScrollArea.Autosize mt={'md'} mah={height - 252}>
                {isLoadingTokens && tokens?.length === 0
                    ? <Center style={{height: '100%'}}><Loader/></Center>
                    : <Stack gap={5}>
                        <Collapse in={opened}>
                            <AddTokenCard/>
                        </Collapse>
                        {tokens?.map(token =>
                            <TokenCard key={token?.id} {...token}/>
                        )}
                        {/*{tokens.length !== 0 && (tokens?.length + 1) <= totalCount &&*/}
                        {/*    <Button*/}
                        {/*        loading={isLoadingTokens}*/}
                        {/*        onClick={loadMoreTokens}*/}
                        {/*    >*/}
                        {/*        Load more*/}
                        {/*    </Button>*/}
                        {/*}*/}
                    </Stack>
                }
                <Space h={50}/>
            </ScrollArea.Autosize>
        </PageWrapper>
    );
};

export default Tokens;