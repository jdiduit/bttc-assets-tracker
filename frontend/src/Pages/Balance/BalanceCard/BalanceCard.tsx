import {Avatar, Flex, Loader, Paper, Stack, Text} from "@mantine/core";
import CopyButton from "@/components/CopyButton.tsx";
import {shortAddress} from "@/utils/functions.ts";
import {useEffect, useMemo, useState} from "react";
import {ethers} from "ethers";
import ERC_20_ABI from "@/utils/erc20Abi.ts";
import useAuthStore from "@/store/useAuthStore.tsx";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {ChainType, ChainTypeEnum} from "@/store/useChainStore.tsx";
import {MAINNET_TOKENS_IMAGES, TESTNET_TOKEN_IMAGES} from "@/utils/constants.tsx";

export type BalanceCardType = {
    address: string
    decimals: string
    symbol: string
    id: string
    status: 'ACTIVE' | 'DISABLED'
    name: string,
    chain?: ChainType
}

const BalanceCard = ({address, name, decimals, symbol}: BalanceCardType) => {
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()
    const [tokenBalance, setTokenBalance] = useState(0)
    const [isLoadingCurrentBalance, setIsLoadingCurrentBalance] = useState(false)

    useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider(selectedChain?.rpc);
        const tokenAddress = address;
        const userAddress = selectedAddress?.address;
        const tokenContract = new ethers.Contract(tokenAddress, ERC_20_ABI, provider);

        const getBRC20Balance = async () => {
            try {
                setIsLoadingCurrentBalance(true)
                const balance = await tokenContract.balanceOf(userAddress);
                setTokenBalance(parseInt(balance) / (10 ** parseInt(decimals)))
                setIsLoadingCurrentBalance(false)
            } catch (error) {
                console.error('Error:', error);
                setIsLoadingCurrentBalance(false)
            }
        };

        if (selectedAddress && selectedChain) getBRC20Balance()
    }, [selectedAddress, selectedChain]);

    const transformString = (inputString: string): string => {
        const numberValue = parseFloat(inputString);
        if (!isNaN(numberValue)) {
            const formattedString = numberValue.toFixed(12);
            const trimmedString = formattedString.replace(/\.?0+$/, '');
            return trimmedString;
        } else {
            return 'Invalid input';
        }
    };

    const currentTokenImg = useMemo(() => {
        if (selectedChain?.type === ChainTypeEnum.MAINNET) {
            return MAINNET_TOKENS_IMAGES[address?.toLowerCase()]
        } else {
            return TESTNET_TOKEN_IMAGES[address?.toLowerCase()]
        }
    }, [selectedChain, address])

    return <Paper radius="md" p={'sm'} withBorder shadow={'md'}>
        <Stack gap={5}>
            <Flex gap={5} align={'flex-start'} justify={'space-between'}>
                <Flex align={'center'} gap={'sm'}>
                    <Avatar src={currentTokenImg} alt={name} size={45}>
                        {name[0]}
                    </Avatar>
                    <Stack gap={5} justify={'space-between'}>
                        <Text fw={500} size="md" lh={1}>
                            {name}
                        </Text>
                        {isLoadingCurrentBalance
                            ? <Flex align={'center'}><Loader size={12}/></Flex>
                            : tokenBalance !== undefined && tokenBalance !== null &&
                            <Text fw={700} c={'dimmed'} fz={15} px={'0'} style={{textTransform: 'none'}}>
                                Balance: {parseFloat(tokenBalance.toString()) !== 0 ? transformString(tokenBalance.toString()) : 0} {symbol}
                            </Text>
                        }
                    </Stack>
                </Flex>
            </Flex>
            <CopyButton str={shortAddress(address!, 25)} value={address!}/>
        </Stack>
    </Paper>
}

export default BalanceCard