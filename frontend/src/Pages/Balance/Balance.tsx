import PageWrapper from "../../components/PageWrapper.tsx";
import {
    ActionIcon,
    Alert,
    Badge,
    Button,
    Center,
    Flex,
    Loader,
    Menu,
    Paper,
    ScrollArea,
    Space,
    Stack,
    Text
} from "@mantine/core";
import {IconArrowsSort, IconInfoCircle} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import useAuthStore from "@/store/useAuthStore.tsx";
import useTokenStore from "@/store/useTokenStore.tsx";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import BalanceCard from "@/Pages/Balance/BalanceCard/BalanceCard.tsx";
import {ethers} from "ethers";
import {useViewportSize} from "@mantine/hooks";
import {SortOrder} from "@/utils/constants.tsx";

const Balance = () => {
    const [sortBy, setSortBy] = useState<{ label: string, value: string, order: string } | null>(SortOrder[0])
    const {selectedChain} = useAuthStore()
    const {selectedAddress} = useAddressStore()
    const [isMounted, setIsMounted] = useState(false)
    const [selectedBalance, setSelectedBalance] = useState(0)
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)
    const {tokens, fetchTokensByStatus, isLoadingTokens} = useTokenStore()
    const {height} = useViewportSize();

    useEffect(() => {
        setIsMounted(true)
    }, []);

    useEffect(() => {
        const getBalance = async () => {
            try {
                setIsLoadingBalance(true)
                const provider = new ethers.providers.JsonRpcProvider(selectedChain?.rpc);
                const balance = await provider.getBalance(selectedAddress!.address);
                const balanceInEth = ethers.utils.formatEther(balance);
                setSelectedBalance(Number(balanceInEth))
                setIsLoadingBalance(false)
            } catch (e) {
                console.log(e)
                setIsLoadingBalance(false)
            }
        }

        if (selectedAddress && selectedChain) {
            fetchTokensByStatus(selectedAddress?.id!, selectedChain.id, sortBy?.value!, sortBy?.order!, "ACTIVE")
            getBalance()
        }
    }, [selectedAddress, selectedChain]);

    return (
        <PageWrapper title={'Balance'}>
            <Stack>
                {selectedAddress
                    ? <>
                        <Center>
                            <Stack gap={'sm'} align={'center'} justify={'center'}>
                                {isLoadingBalance
                                    ? <Center><Loader size={'xs'}/></Center>
                                    : <Badge variant={'light'} size={'xl'}>
                                        {selectedBalance} {selectedChain?.nativeTokenSymbol}
                                    </Badge>
                                }
                                <Text c={'dimmed'} fz={18} fw={600}>
                                    Tracked BRC20 tokens:
                                </Text>
                            </Stack>
                        </Center>


                        {tokens?.length !== 0 &&
                            <Paper p={'xs'} withBorder shadow={'sm'}>
                                <Flex justify={'center'}>
                                    {isMounted
                                        ? <Menu shadow="md">
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
                                                                fetchTokensByStatus(selectedAddress?.id!, selectedChain.id, item?.value!, item?.order!, "ACTIVE")
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
                                        : <></>
                                    }
                                </Flex>
                            </Paper>
                        }
                        {tokens?.length === 0 &&
                            <Alert p={'xs'} variant="light" color="blue" icon={<IconInfoCircle/>}>
                                No tracked tokens
                            </Alert>
                        }
                    </>
                    : <Alert p={'xs'} variant="light" color="red" icon={<IconInfoCircle/>}>
                        No selected address
                    </Alert>
                }
            </Stack>

            <ScrollArea.Autosize mt={'md'} mah={height - 310}>
                {isLoadingTokens && tokens?.length === 0
                    ? <Center style={{height: '100%'}}><Loader/></Center>
                    : <Stack gap={5}>
                        {tokens?.map(token =>
                            <BalanceCard key={token.id} {...token}/>
                        )}
                    </Stack>
                }
                <Space h={50}/>
            </ScrollArea.Autosize>
        </PageWrapper>
    );
};

export default Balance;