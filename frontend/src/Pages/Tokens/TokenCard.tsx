import useTokenStore from "@/store/useTokenStore.tsx";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {Avatar, Flex, Paper, Stack, Switch, Text} from "@mantine/core";
import CopyButton from "@/components/CopyButton.tsx";
import {shortAddress} from "@/utils/functions.ts";
import useAuthStore from "@/store/useAuthStore.tsx";
import {MAINNET_TOKENS_IMAGES, TESTNET_TOKEN_IMAGES} from "@/utils/constants.tsx";
import {useMemo} from "react";
import {ChainTypeEnum} from "@/store/useChainStore.tsx";

export type TokenType = {
    address: string
    id: string
    status: 'ACTIVE' | 'DISABLED'
    name: string,
    decimals: string,
    symbol: string
}

const TokenCard = ({address, name, id, status, symbol}: TokenType) => {
    const {toggleTokenActiveStatus} = useTokenStore()
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()

    const handleActivate = () => {
        toggleTokenActiveStatus({
            tokenId: id,
            walletAddressId: selectedAddress?.id!,
            chainType: selectedChain?.type!
        })
    }

    const currectTokenImg = useMemo(() => {
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
                    <Avatar src={currectTokenImg} alt={name} size={40}>
                        {name[0]}
                    </Avatar>
                    <Stack gap={'xs'} justify={'space-between'}>
                        <Text fw={500} size="md" lh={1}>
                            {name}
                        </Text>
                        <Text c={'dimmed'} size="xs" lh={1} mb={5}>
                            {symbol}
                        </Text>
                    </Stack>
                </Flex>
                <Flex align={'center'} justify={'center'}>
                    <Switch disabled={!selectedAddress} checked={status === 'ACTIVE'} onChange={handleActivate}/>
                </Flex>
            </Flex>
            <CopyButton str={shortAddress(address!)} value={address!}/>
        </Stack>
    </Paper>
}

export default TokenCard