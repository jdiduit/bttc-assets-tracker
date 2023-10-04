import PageWrapper from "@/components/PageWrapper.tsx";
import {Link, useLocation, useParams} from "react-router-dom";
import {
    AspectRatio,
    Badge,
    Box,
    Card,
    Center,
    Divider,
    Flex,
    Grid,
    Image,
    Loader,
    Paper,
    ScrollArea,
    Space,
    Stack,
    Text
} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {NftType} from "@/Pages/NftList/NftsList/NftsList.tsx";
import {ethers} from "ethers";
import {NFT_ABI} from "@/utils/nftAbi.ts";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import useAuthStore from "@/store/useAuthStore.tsx";
import {shortAddress} from "@/utils/functions.ts";
import {IPFS_GATEWAY, PROXY_URL} from "@/utils/constants.tsx";
import classes from "./NftDetails.module.css";

const NftDetails = () => {
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()
    const {id, tokenId} = useParams()
    const {height} = useViewportSize();
    const [isLoading, setIsLoadng] = useState(false)
    const [nftData, setNftData] = useState<NftType | null>(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isCustom = searchParams.get('isCustom');

    const getNft = async () => {
        const provider = new ethers.providers.JsonRpcProvider(selectedChain?.rpc);
        const contract = new ethers.Contract(id!, NFT_ABI, provider);

        try {
            setIsLoadng(true)
            let ipfsUrl = await contract.tokenURI(tokenId)
            const res = await fetch(PROXY_URL + '/' + ipfsUrl)
            const data = await res.json()
            setNftData({...data, tokenId: tokenId})
            setIsLoadng(false)
        } catch (e) {
            console.log(e);
            setIsLoadng(false)
        }
    };

    useEffect(() => {
        if (id && selectedAddress) getNft()
    }, [id, selectedAddress]);

    return (
        <PageWrapper title={'NFT details'} backLink={`/nfts/${id}?isCustom=${isCustom}`}>
            <ScrollArea.Autosize offsetScrollbars mt={'md'} mah={height - 190}>
                <Flex mx={'auto'} justify={'center'} align={'center'} w={'90%'}>
                    <Box w={'100%'}>
                        <Card
                            p="sm" radius="md" component={Link} to=""
                            className={classes.card}>
                            {isLoading
                                ? <Center my={'sm'}>
                                    <Loader/>
                                </Center>
                                : <>
                                    <AspectRatio mb={'sm'}>
                                        <Image style={{borderRadius: 5}}
                                               src={isCustom === 'false' ? nftData?.image : `${IPFS_GATEWAY}${nftData?.image}`}/>
                                    </AspectRatio>

                                    {id !== undefined &&
                                        <Flex justify={'space-between'} align={'center'}>
                                            <Text fw={600}>
                                                Contract:
                                            </Text>
                                            <Badge variant={'filled'}>
                                                {shortAddress(id)}
                                            </Badge>
                                        </Flex>
                                    }

                                    {tokenId !== undefined &&
                                        <Flex justify={'space-between'} align={'center'}>
                                            <Text fw={600}>
                                                Token ID:
                                            </Text>
                                            <Badge variant={'filled'}>
                                                {shortAddress(tokenId)}
                                            </Badge>
                                        </Flex>
                                    }

                                    <Divider my={'xs'}/>

                                    <Stack gap={4} justify={'space-between'} align={'flex-start'}>
                                        <Text fw={600}>
                                            Description:
                                        </Text>
                                        <Text c={'dimmed'}>
                                            {nftData?.description}
                                        </Text>
                                    </Stack>

                                    <Divider my={'xs'}/>

                                    <Stack gap={4} justify={'space-between'} align={'center'}>
                                        <Text fz={'xl'} fw={600}>
                                            Attributes:
                                        </Text>
                                        <Stack gap={3} w={'100%'}>
                                            <Grid w={'100%'}>
                                                {nftData?.attributes?.map(atribute =>
                                                    <Grid.Col key={atribute?.trait_type + atribute?.value} span={6}>
                                                        <Paper className={classes.attributeCard} py={2} p={'xs'}
                                                               withBorder shadow={'md'}
                                                               w={'100%'}>
                                                            <Stack w={'100%'} justify={'space-between'}
                                                                   align={'flex-start'}>
                                                                <Text fz={15} fw={700}>
                                                                    {atribute?.trait_type}
                                                                </Text>
                                                                <Text fz={13}>
                                                                    {atribute?.value ?? '-'}
                                                                </Text>
                                                            </Stack>
                                                        </Paper>
                                                    </Grid.Col>
                                                )}
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                </>
                            }
                        </Card>
                    </Box>
                </Flex>
                <Space h={50}/>
            </ScrollArea.Autosize>
        </PageWrapper>
    );
};

export default NftDetails;