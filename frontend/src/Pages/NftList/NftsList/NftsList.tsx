import PageWrapper from "@/components/PageWrapper.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import classes from "@/Pages/NftList/NftCollectionCard/NftCollectionCard.module.css";
import {
    Alert,
    AspectRatio,
    Badge,
    Button,
    Card,
    Center,
    Divider,
    Grid,
    Image,
    Loader,
    ScrollArea,
    Space,
    Stack,
    Text
} from "@mantine/core";
import {NftCard} from "@/Pages/NftList/NftCard/NftCard.tsx";
import {useViewportSize} from "@mantine/hooks";
import {useEffect, useMemo, useState} from "react";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import useAuthStore from "@/store/useAuthStore.tsx";
import {ethers} from "ethers";
import {NFT_ABI} from "@/utils/nftAbi.ts";
import CustomCollectionImg from "@/assets/images/collection-img.png";
import NftCollectionLogo from "@/assets/images/nftCollectionLogo.jpg";
import {MAINNET_MINT_NFT_CONTRACT, NFT_CONTRACT, PROXY_URL, TESTNET_MINT_NFT_CONTRACT} from "@/utils/constants.tsx";

export type NftAttributeType = {
    trait_type: string,
    value: string,
}

export type NftType = {
    attributes: NftAttributeType[],
    background_color: string
    createtime: string,
    description: string
    external_url: string
    id: string
    image: string
    tokenId: string
    name: string
    symbol: string
}

const NftsList = () => {
    const {id} = useParams()
    const {height} = useViewportSize();
    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isCustom = searchParams.get('isCustom');

    const [balance, setBalance] = useState(0)
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()
    const [nfts, setNfts] = useState<NftType[]>([])
    const [isLoading, setIsLoadng] = useState(false)
    const [contract, setContract] = useState<any>(null)

    const [isLoadingBalance, setIsLoadingBalance] = useState(false)

    const getNfts = async ({from, to, initialData, tokenContract}: {
        from: number,
        to: number,
        initialData: any,
        tokenContract?: any,
    }) => {
        try {
            const contr = tokenContract ?? contract
            setIsLoadng(true)
            const batchPromises = [];
            for (let i = from; i < to; i++) {
                batchPromises.push(contr.tokenOfOwnerByIndex(selectedAddress?.address, i));
            }
            const batchInfos = await Promise.all(batchPromises);

            const nftsDataPromises = []
            for (let i = 0; i < batchInfos?.length; i++) {
                nftsDataPromises.push(contr.tokenURI(batchInfos[i]));
            }
            const nftsDataIpfsUrl = await Promise.all(nftsDataPromises);

            const nftsData = []
            for (let i = 0; i < nftsDataIpfsUrl?.length; i++) {
                const res = await fetch(PROXY_URL + '/' + nftsDataIpfsUrl[i])
                const data = await res.json()
                nftsData.push({...data, tokenId: batchInfos[i].toString()});
            }
            setNfts([...initialData, ...nftsData]);
            setIsLoadng(false)
        } catch (e) {
            console.log(e);
            setIsLoadng(false)
        }
    };

    useEffect(() => {
        const getNFTBalance = async () => {
            const provider = new ethers.providers.JsonRpcProvider(selectedChain?.rpc);
            const tokenContract = new ethers.Contract(id!, NFT_ABI, provider);
            setNfts([])
            setContract(tokenContract)
            try {
                setIsLoadingBalance(true)
                const balance = await tokenContract.balanceOf(selectedAddress?.address);
                setBalance(parseInt(balance))
                setIsLoadingBalance(false)
                await getNfts({
                    from: 0,
                    to: Math.min(2, parseInt(balance)),
                    initialData: [],
                    tokenContract: tokenContract
                })
            } catch (error) {
                console.error('Error:', error);
                setIsLoadng(false)
                setIsLoadingBalance(false)
            }
        };

        if (id && selectedAddress) {
            getNFTBalance()
        }
    }, [id, selectedAddress]);

    const {pathname} = useLocation()

    const currentNftCollectionImg = useMemo(() => {
        if (id === TESTNET_MINT_NFT_CONTRACT) {
            return CustomCollectionImg
        } else if (id?.toLowerCase() === NFT_CONTRACT?.toLowerCase()) {
            return NftCollectionLogo
        }
        // return isCustom === 'true'
        //     ? CustomCollectionImg
        //     : img?.startsWith('ipfs://')
        //         ? img?.replace('ipfs://', `${IPFS_GATEWAY}`)
        //         : `${IPFS_GATEWAY}${img}`
    }, [isCustom, pathname, searchParams])

    return (
        <PageWrapper title={id === TESTNET_MINT_NFT_CONTRACT
            ? 'Free to mint NFTs'
            : id === MAINNET_MINT_NFT_CONTRACT
                ? 'Free to mint NFTs'
                : id === NFT_CONTRACT
                    ? 'BitTorrent Web3 Domains'
                    : ''
        } backLink={'/nfts'}>
            <ScrollArea.Autosize offsetScrollbars mt={'md'} mah={height - 180}>
                <Card mb={'xs'} maw={'70%'} p="2" radius="md"
                      className={classes.card}>
                    <AspectRatio>
                        <Image style={{borderRadius: 5}} src={currentNftCollectionImg}/>
                    </AspectRatio>
                </Card>

                {isLoadingBalance
                    ? <Center my={'sm'}>
                        <Loader size={'sm'}/>
                    </Center>
                    : <Center mb={'sm'}>
                        <Badge style={{textTransform: 'none'}} variant={'light'} size={'xl'}>
                            {balance} NFTs
                        </Badge>
                    </Center>
                }

                {!isLoadingBalance && !isLoading && nfts?.length === 0 &&
                    <Alert color={'red'} p={'xs'}>
                        Selected wallet does not have NFTs
                    </Alert>
                }

                {isCustom === 'true' &&
                    <>
                        <Alert mt={'sm'} color={'blue'} p={'xs'}>
                            <Stack gap={3}>
                                <Text>
                                    These NFTs can be minted for free
                                </Text>
                                <Button
                                    onClick={() => {
                                        if (chrome.extension) {
                                            window.open(`${import.meta.env.VITE_APP_URL}nfts/mint`, "_blank")
                                        } else {
                                            navigate(`/nfts/mint`)
                                        }
                                    }}
                                >
                                    Mint
                                </Button>
                            </Stack>
                        </Alert>
                        <Divider my={'md'}/>
                    </>
                }

                {isLoading && nfts?.length === 0 &&
                    <Center my={'sm'}>
                        <Loader/>
                    </Center>
                }

                {nfts?.length !== 0 &&
                    <>
                        <Grid>
                            {nfts?.map(item =>
                                <Grid.Col key={item?.id} span={6}>
                                    <NftCard nft={item}/>
                                </Grid.Col>
                            )}
                        </Grid>

                        {nfts?.length < balance &&
                            <Center my={'sm'}>
                                <Button loading={isLoading} onClick={() => {
                                    getNfts({
                                        from: nfts?.length,
                                        to: Math.min(balance, nfts?.length + 2),
                                        initialData: nfts
                                    })
                                }}>
                                    Show more
                                </Button>
                            </Center>
                        }
                    </>
                }
                <Space h={50}/>
            </ScrollArea.Autosize>
        </PageWrapper>
    );
};

export default NftsList;