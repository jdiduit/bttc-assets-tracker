import PageWrapper from "../../components/PageWrapper";
import {Center, Loader, ScrollArea, Stack} from "@mantine/core";
import {RoutePaths} from "@/Pages/routes.ts";
import useChainStore from "@/store/useChainStore.tsx";
import {useEffect} from "react";
import ChainTypeTab from "@/Pages/ChangeNetwork/ChainTypeTab/ChainTypeTab.tsx";
import {ImageCheckbox} from "@/Pages/ChangeNetwork/ChainCard/ChainCard.tsx";
import useAuthStore from "@/store/useAuthStore.tsx";

const ChangeNetwork = () => {
    const {selectedChainType} = useAuthStore()
    const {chains, isLoadingChains, fetchChainsByType} = useChainStore()

    useEffect(() => {
        if (selectedChainType) fetchChainsByType(selectedChainType)
    }, [selectedChainType]);

    return (
        <PageWrapper backLink={RoutePaths.SETTINGS} title={'Networks'}>
            <Center>
                <ChainTypeTab/>
            </Center>
            <ScrollArea mt={'md'} h={380} offsetScrollbars>
                {isLoadingChains && chains?.length === 0
                    ? <Center style={{height: '100%'}}><Loader/></Center>
                    : <Stack>
                        {chains.map((item) =>
                            <ImageCheckbox {...item} key={item.name}/>
                        )}
                    </Stack>
                }
            </ScrollArea>
        </PageWrapper>
    );
};

export default ChangeNetwork;