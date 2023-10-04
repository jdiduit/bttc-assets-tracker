import {Badge, Box, Burger, Button, Divider, Flex, Image, Paper, Text, Tooltip} from "@mantine/core";
import {IconCopy} from "@tabler/icons-react";
import {shortAddress} from "@/utils/functions.ts";
import {ToggleTheme} from "../ToggleTheme.tsx";
import LayoutDrawer from "../LayoutDrawer/LayoutDrawer.tsx";
import useAuthStore from "../../store/useAuthStore.tsx";
import {useDisclosure} from "@mantine/hooks";
import classes from "./Header.module.css";
import Logo from "@/assets/images/logo.png";
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {ChainTypeEnum} from "@/store/useChainStore.tsx";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import {useState} from "react";

const Header = () => {
    const {user} = useAuthStore()
    const [opened, {toggle}] = useDisclosure();
    const {selectedAddress} = useAddressStore()
    const {selectedChain} = useAuthStore()

    const [_, copyToClipboard] = useCopyToClipboard();
    const [hasCopiedText, setHasCopiedText] = useState(false)

    return (
        <Box className={classes.header}>
            <Flex align={'center'} justify={'space-between'} h="100%" px="md">
                {!user &&
                    <Flex align={'center'} justify={'center'} gap={10}>
                        <Paper style={{borderWidth: 2}} radius={'50%'} withBorder shadow={'md'}>
                            <Image radius={'50%'} maw={35} height={'auto'} fit={'contain'} src={Logo}/>
                        </Paper>
                        <Text
                            fz={17}
                            ta="center"
                            fw={800}
                        >
                            BTTC Asset Tracker
                        </Text>
                    </Flex>
                }

                {user
                    ? <>
                        <Burger opened={opened} onClick={toggle} size="sm"/>
                        {selectedAddress &&
                            <Tooltip offset={8} label={!hasCopiedText ? 'Copy to clipboard' : 'Copied'}>
                                <Button
                                    radius="xl"
                                    variant={!hasCopiedText ? 'default' : 'subtle'}
                                    size={'compact-sm'}
                                    color={hasCopiedText ? 'blue' : 'gray'}
                                    onClick={() => {
                                        copyToClipboard!(selectedAddress?.address!)
                                        setHasCopiedText(true)
                                        setTimeout(() => {
                                            setHasCopiedText(false)
                                        }, 500)
                                    }}
                                    rightSection={<IconCopy size={15}/>}
                                >
                                    <Box mr={'xs'}>
                                        {shortAddress(selectedAddress?.name, 10)}
                                    </Box>
                                    <Divider orientation="vertical"/>
                                    <Box ml={'xs'}>
                                        {shortAddress(selectedAddress?.address!, 10)}
                                    </Box>
                                </Button>
                            </Tooltip>
                        }
                        <Tooltip position={'bottom-end'} label={'BTTC ' + selectedChain?.type}>
                            <Badge
                                style={{cursor: 'pointer'}}
                                size={'sm'}
                                color={selectedChain?.type === ChainTypeEnum.MAINNET ? 'teal' : 'yellow'}
                            ></Badge>
                        </Tooltip>
                    </>
                    : <>
                        <Box></Box>
                        <ToggleTheme/>
                    </>
                }
            </Flex>
            <LayoutDrawer opened={opened} toggle={toggle}/>
        </Box>
    );
};

export default Header;