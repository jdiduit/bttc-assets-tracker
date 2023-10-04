import {Button, Fieldset, Stack, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useState} from "react";
import useTokenStore from "@/store/useTokenStore.tsx";
import {getContractInfo} from "@/utils/ethers.ts";
import ERC_20_ABI from "@/utils/erc20Abi.ts";
import {nprogress} from "@mantine/nprogress";
import useAuthStore from "@/store/useAuthStore.tsx";
import {notifications} from "@mantine/notifications";
import {IconX} from "@tabler/icons-react";
import {getTokenByAddress} from "@/apis/token.api.ts";

const AddTokenCard = () => {
    const {createToken} = useTokenStore()
    const {selectedChain} = useAuthStore()
    const [isLoadingAddAddress, setIsLoadingAddAddress] = useState(false)

    const form = useForm({
        initialValues: {address: ''},
        validate: {
            address: (value) => (/^0x([A-Fa-f0-9]{40})$/.test(value) ? null : 'Put an correct wallet address'),
        },
    });

    const onSubmit = async (formData: typeof form.values) => {
        setIsLoadingAddAddress(true)
        nprogress.set(50)
        try {
            const findTokenByAddress = await getTokenByAddress(formData?.address)
            if (findTokenByAddress) {
                notifications.show({
                    title: 'Error!',
                    icon: <IconX/>,
                    message: 'Token already exist!',
                    color: 'red'
                })
            } else {
                const tokenData = await getContractInfo(
                    selectedChain?.rpc!,
                    formData?.address,
                    ERC_20_ABI,
                    () => notifications.show({
                        title: 'Error!',
                        icon: <IconX/>,
                        message: 'Invalid address!',
                        color: 'red'
                    })
                )
                createToken({
                    address: formData?.address,
                    name: tokenData?.name,
                    symbol: tokenData?.symbol,
                    decimals: tokenData?.decimals,
                })
                form.reset()
            }
        } catch (e) {
            console.log(e)
        } finally {
            nprogress.complete()
            setIsLoadingAddAddress(false)
        }
    }

    return (
        <Fieldset py={'sm'} px={'sm'}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack gap={'xs'}>
                    <TextInput
                        withAsterisk
                        placeholder="Address"
                        {...form.getInputProps('address')}
                    />
                    <Button fullWidth type="submit" loading={isLoadingAddAddress}>Submit</Button>
                </Stack>
            </form>
        </Fieldset>
    );
};

export default AddTokenCard;