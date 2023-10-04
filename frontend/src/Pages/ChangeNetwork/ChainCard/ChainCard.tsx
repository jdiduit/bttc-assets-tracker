import {Checkbox, Image, Paper, Text, UnstyledButton} from '@mantine/core';
import classes from './ChainCard.module.css';
import {ChainType} from "@/store/useChainStore.tsx";
import useAuthStore from "@/store/useAuthStore.tsx";
import ChainLogo from '@/assets/images/logo.png'

type ImageCheckboxProps = ChainType & {
    checked?: boolean;
    defaultChecked?: boolean;
    className?: string;
    onChange?(checked: boolean): void;
}

const Chains = {
    'BTTC Mainnet': {
        logo: ChainLogo
    },
    'BTTC Testnet (Donau)': {
        logo: ChainLogo
    },
}

export const ImageCheckbox = ({
                                  checked,
                                  defaultChecked,
                                  onChange,
                                  className,
                                  name,
                                  type,
                                  chainId,
                                  id,
                                  ...others
                              }: ImageCheckboxProps) => {
    const {setCurrentChain, selectedChain} = useAuthStore()

    return (
        <Paper withBorder>
            <UnstyledButton
                {...others}
                onClick={() => {
                    if (selectedChain?.type) setCurrentChain(id)
                }}
                data-checked={selectedChain?.id === id ? true : undefined}
                className={classes.button}
                py={8}
                px={10}
            >
                {/*// @ts-ignore*/}
                <Image src={Chains[name]?.logo || ''} alt={name} width={40} height={40}/>
                <div className={classes.body}>
                    <Text c="dimmed" size="xs" lh={1} mb={5}>
                        {type}
                    </Text>
                    <Text fw={500} size="sm" lh={1}>
                        {name}
                    </Text>
                </div>
                <Checkbox
                    checked={selectedChain?.id === id}
                    onChange={() => {
                    }}
                    tabIndex={-1}
                    styles={{input: {cursor: 'pointer'}}}
                />
            </UnstyledButton>
        </Paper>
    );
};
