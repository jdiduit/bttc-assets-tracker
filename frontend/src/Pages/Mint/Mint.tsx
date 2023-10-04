import PageWrapper from "@/components/PageWrapper.tsx";
import {
    ActionIcon,
    Alert,
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    FileInput,
    Flex,
    Group,
    Image,
    Paper,
    ScrollArea,
    SegmentedControl,
    Space,
    Stack,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {RoutePaths} from "@/Pages/routes.ts";
import {IconHome, IconInfoCircle, IconPlus, IconTrash, IconWallet} from "@tabler/icons-react";
import {useMetaMask} from "metamask-react";
import {shortAddress} from "@/utils/functions.ts";
import classes from "./Mint.module.css";
import {ChainTypeEnum} from "@/store/useChainStore.tsx";
import {useForm} from "@mantine/form";
import {useEffect, useRef, useState} from "react";
import {useViewportSize} from "@mantine/hooks";
import {notifications} from "@mantine/notifications";
import {nprogress} from "@mantine/nprogress";
import {
    CHAINS,
    MAINNET_MINT_NFT_CONTRACT,
    MINT_CHAINS,
    MORALIS_URL,
    TESTNET_MINT_NFT_CONTRACT
} from "@/utils/constants.tsx";
import {ethers} from "ethers";
import {MINT_NFT_ABI} from "@/utils/mintAbi.ts";
import {NftAttributeType} from "@/Pages/NftList/NftsList/NftsList.tsx";

const MORALIS_FETCH_HEADERS = {
    accept: "application/json",
    "content-type": "application/json",
    "X-API-Key": import.meta.env.VITE_IPFS_KEY,
}

const Mint = () => {
    const {status, connect, account, chainId, switchChain} = useMetaMask();
    const [selectedChainType, setCurrentChainType] = useState<string | any | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {height} = useViewportSize();
    const resetRef = useRef<any>(null);

    useEffect(() => {
        if (chainId !== null && chainId !== undefined) setCurrentChainType(chainId)
    }, [chainId]);

    const onConnect = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        connect()
    }

    const clearFile = () => {
        form.setFieldValue('file', null);
        resetRef.current?.();
    };

    const form = useForm<{
        name: string,
        description: string,
        file: any,
        attributes: { trait_type: string, value: string }[],
    }>({
        initialValues: {
            name: '',
            description: '',
            file: null,
            attributes: [],
        },
        validate: {
            name: (value) => {
                if (value.length < 1) return 'NFT name must have at least 1 letter'
                return null
            },
            description: (value) => {
                if (value.length < 1) return 'NFT description must have at least 1 letter'
                return null
            },
            file: (value) => {
                if (value === null || value === undefined) return 'PLease select image'
                return null
            },
            attributes: {
                trait_type: (value) => (value.length < 1 ? 'Attribute key must have at least 1 letter' : null),
                value: (value) => (value.length < 1 ? 'Attribute value must have at least 1 letter' : null),
            },
        },
    });

    const ipfsUploadImage = async (imgUrl: string) => {
        let resImage = await fetch(MORALIS_URL, {
            method: "POST",
            headers: MORALIS_FETCH_HEADERS,
            body: JSON.stringify([{path: 'image', content: imgUrl}]),
        });
        let resImg = await resImage.json();
        const parts = resImg[0]?.path.split("/");
        return parts[parts.length - 2] + '/' + parts[parts.length - 1];
    }

    const ipfsUploadJson = async ({name, description, attributes, imgUrl}: {
        name: string,
        description: string,
        attributes: NftAttributeType[],
        imgUrl: string
    }) => {
        let resData = await fetch(MORALIS_URL, {
            method: "POST",
            headers: MORALIS_FETCH_HEADERS,
            body: JSON.stringify([{
                path: 'data', content: {
                    name: name,
                    description: description,
                    attributes: attributes,
                    image: imgUrl
                }
            }]),
        });
        return await resData.json();
    }

    const onSubmitCreate = async (formData: typeof form.values) => {
        const customHttpProvider = new ethers.providers.JsonRpcProvider(MINT_CHAINS[chainId as CHAINS].rpc);
        const contractRead = new ethers.Contract(
            ChainTypeEnum.MAINNET === selectedChainType
                ? MAINNET_MINT_NFT_CONTRACT
                : TESTNET_MINT_NFT_CONTRACT
            , MINT_NFT_ABI, customHttpProvider);
        const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = metamaskProvider.getSigner();
        const contractWrite = contractRead.connect(signer)
        nprogress.set(50)
        try {
            if (formData.file) {
                setIsLoading(true)
                const reader = new FileReader();
                reader.onload = async (event) => {
                    // @ts-ignore
                    const imgUrl = await ipfsUploadImage(event?.target?.result?.split(',')[1])
                    const jsonUrl = await ipfsUploadJson({
                        imgUrl,
                        attributes: formData.attributes,
                        description: formData.description,
                        name: formData.name
                    })

                    try {
                        const tx = await contractWrite.mint(jsonUrl[0]?.path)
                        await tx.wait();
                        form.reset()
                        notifications.show({
                            title: 'Success!',
                            message: '',
                            color: 'green'
                        })
                        setIsLoading(false)
                    } catch (e) {
                        console.log(e)
                        setIsLoading(false)
                    }
                };
                reader.readAsDataURL(formData.file);
            }
        } catch (e) {
            setIsLoading(false)
            console.log(e)
            notifications.show({
                title: 'Error!',
                message: '',
                color: 'red'
            })
        } finally {
            nprogress.complete()
        }
    }

    const attributes = form.values.attributes.map((_, index) => (
        <Group key={index}>
            <Flex w={'100%'} gap={'xs'} justify={'space-between'} align={'flex-start'}>
                <TextInput
                    placeholder="Key"
                    style={{flex: 1}}
                    {...form.getInputProps(`attributes.${index}.trait_type`)}
                />
                <TextInput
                    placeholder="Value"
                    style={{flex: 1}}
                    {...form.getInputProps(`attributes.${index}.value`)}
                />
                <ActionIcon size={35} color="red" onClick={() => form.removeListItem('attributes', index)}>
                    <IconTrash size="1rem"/>
                </ActionIcon>
            </Flex>
        </Group>
    ));

    const onChainChange = async (chainId: CHAINS) => {
        try {
            await switchChain(chainId)
            setCurrentChainType(chainId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box className={classes.mintLayoutWrapper} pt={'md'} w={'100%'}>
            <PageWrapper backIcon={<IconHome/>} title={'Mint Free NFT'} backLink={RoutePaths.BALANCE}>
                <ScrollArea.Autosize pt={'sm'} offsetScrollbars mah={height - 70}>
                    <Flex w={'100%'} align={'center'} justify={'space-between'}>
                        {(status === "notConnected" || status === "connecting") &&
                            <Button onClick={onConnect} rightSection={<IconWallet size={'1rem'}/>}>
                                Connect
                            </Button>
                        }

                        {status === "unavailable" &&
                            <Alert p={'xs'} variant="light" color="red" icon={<IconInfoCircle/>}>
                                MetaMask not available
                            </Alert>
                        }

                        {status === "notConnected" &&
                            <Alert p={'xs'} variant="light" color="red" icon={<IconInfoCircle/>}>
                                Please connect wallet
                            </Alert>
                        }

                        {status === "connected" &&
                            <Center>
                                <Paper radius={50} py={2} p={'sm'} withBorder shadow={'sm'} w={'max-content'}>
                                    <Flex gap="xs" align="center">
                                        <Avatar radius="full"/>
                                        <Stack gap={0}>
                                            <Text>
                                                {shortAddress(account)}
                                            </Text>
                                            <Text>
                                                ChainId: {parseInt(chainId)}
                                            </Text>
                                        </Stack>
                                    </Flex>
                                </Paper>
                            </Center>
                        }

                        {status === 'connected' &&
                            <SegmentedControl
                                value={selectedChainType}
                                onChange={onChainChange}
                                radius="xl"
                                size="sm"
                                data={[
                                    {
                                        label: ChainTypeEnum.TESTNET,
                                        value: CHAINS.TESTNET,
                                    }, {
                                        label: ChainTypeEnum.MAINNET,
                                        value: CHAINS.MAINNET,
                                    }]}
                                classNames={{
                                    root: classes.toggleChainRoot,
                                    control: classes.toggleChainControl,
                                    label: classes.toggleChainLabel,
                                    indicator: classes.toggleChainIndicator,
                                }}
                            />
                        }
                    </Flex>

                    <Divider my={'sm'}/>

                    {status === "connected" && (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET) &&
                        <Alert my={'sm'} p={'xs'} variant="light" color="red" icon={<IconInfoCircle/>}>
                            Please connect to BTTC mainnet or testnet
                        </Alert>
                    }

                    <form style={{width: '100%'}} onSubmit={form.onSubmit(onSubmitCreate)}>
                        <Stack>
                            <TextInput
                                disabled={status !== 'connected' || (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET)}
                                w={'100%'}
                                withAsterisk
                                {...form.getInputProps('name')}
                                placeholder={"Name"}
                            />

                            <Textarea
                                disabled={status !== 'connected' || (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET)}
                                w={'100%'}
                                withAsterisk
                                {...form.getInputProps('description')}
                                placeholder={"Description"}
                            />

                            <Flex w={'100%'} gap={10}>

                                <FileInput
                                    disabled={status !== 'connected' || (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET)}
                                    w={'100%'} ref={resetRef}
                                    placeholder="File" {...form.getInputProps('file')} />
                                {form.values?.file &&
                                    <Button disabled={!form.values?.file} color="red" onClick={clearFile}>
                                        Reset
                                    </Button>
                                }
                            </Flex>

                            {attributes?.length !== 0 &&
                                <Paper withBorder shadow={'sm'} p={'xs'}>
                                    <Stack gap={'xs'}>
                                        {attributes}
                                    </Stack>
                                </Paper>
                            }

                            <Group justify="flex-end">
                                <Button
                                    disabled={form?.values?.attributes?.length >= 5 || status !== 'connected' || (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET)}
                                    rightSection={<IconPlus size={'1rem'}/>}
                                    onClick={() => {
                                        if (form?.values?.attributes?.length < 5) {
                                            form.insertListItem('attributes', {trait_type: '', value: ''})
                                        }
                                    }}
                                >
                                    {form?.values?.attributes?.length < 5 ? 'Add attribute' : 'Max 5 attributes'}
                                </Button>
                            </Group>

                            {(form.values?.file)
                                && <Image
                                    radius={10}
                                    w={'100%'}
                                    mah={250}
                                    fit={'cover'}
                                    src={!form.values?.file ? '' : URL.createObjectURL(form.values.file)}
                                />
                            }

                            <Button
                                disabled={status !== 'connected' || (selectedChainType !== CHAINS.MAINNET && selectedChainType !== CHAINS.TESTNET)}
                                loading={isLoading} type={'submit'}>
                                Mint
                            </Button>
                        </Stack>
                    </form>
                    <Space h={50}/>
                </ScrollArea.Autosize>
            </PageWrapper>
        </Box>
    );
};

export default Mint;
