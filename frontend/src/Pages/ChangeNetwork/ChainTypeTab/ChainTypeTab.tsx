import {SegmentedControl} from '@mantine/core';
import classes from './ChainTypeTab.module.css'
import useAuthStore from "@/store/useAuthStore.tsx";
import {ChainTypeEnum} from "@/store/useChainStore.tsx";

const ChainTypeTab = () => {
    const {setCurrentChainType, selectedChainType} = useAuthStore()

    return (
        <SegmentedControl
            value={selectedChainType}
            onChange={(e) => {
                setCurrentChainType(e as ChainTypeEnum)
            }}
            radius="xl"
            size="sm"
            data={[ChainTypeEnum.TESTNET, ChainTypeEnum.MAINNET]}
            classNames={classes}
        />
    );
};

export default ChainTypeTab;