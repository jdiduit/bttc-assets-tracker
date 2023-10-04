import {AspectRatio, Card, Flex, Image, Loader, Stack, Text} from '@mantine/core';
import classes from './NftCollectionCard.module.css';
import {Link} from "react-router-dom";
import {ethers} from 'ethers';
import useAuthStore from "@/store/useAuthStore.tsx";
import {useEffect, useState} from "react";
import {NFT_ABI} from "@/utils/nftAbi.ts";
import {useAddressStore} from "@/store/useAddressStore.tsx";

export function NftCollectionCard({name, symbol, img, nftAddress, isCustom}: {
    symbol: string,
    img: string,
    name: string,
    isCustom: boolean,
    nftAddress: string
}) {
    const [balance, setBalance] = useState(0)
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)

    useEffect(() => {
        const getNFTBalance = async () => {
            setIsLoadingBalance(true)
            const provider = new ethers.providers.JsonRpcProvider(selectedChain?.rpc);
            const tokenContract = new ethers.Contract(nftAddress, NFT_ABI, provider);
            try {
                const balance = await tokenContract.balanceOf(selectedAddress?.address);
                setBalance(parseInt(balance))
                setIsLoadingBalance(false)
            } catch (error) {
                console.error('Error:', error);
                setIsLoadingBalance(false)
            }
        };

        if (nftAddress && selectedAddress) getNFTBalance()
    }, [nftAddress, selectedAddress]);

    return <Card p="0" radius="md" component={Link} to={`/nfts/${nftAddress}?isCustom=${isCustom}`}
                 className={classes.card}>
        <AspectRatio>
            <Image src={img}/>
        </AspectRatio>
        <Stack p={'xs'} gap={'0'}>
            <Text fw={700}>
                {name} [{symbol}]
            </Text>
            {isLoadingBalance
                ? <Flex align={'center'}><Loader size={'xs'}/></Flex>
                : <Text c="dimmed" size={"sm"} fw={700}>
                    {balance} NFTs
                </Text>
            }
        </Stack>
    </Card>
}