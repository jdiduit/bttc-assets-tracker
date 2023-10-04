import {Button, Fieldset, Flex, Stack, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useAddressStore} from "@/store/useAddressStore.tsx";
import {useState} from "react";

const AddAddressCard = () => {
    const {addAddress} = useAddressStore()
    const [isLoadingAddAddress, setIsLoadingAddAddress] = useState(false)

    const form = useForm({
        initialValues: {name: '', address: ''},
        validate: {
            name: (value) => (value.length < 1 ? 'Write a name of address' : null),
            address: (value) => (/^0x([A-Fa-f0-9]{40})$/.test(value) ? null : 'Put an correct wallet address'),
        },
    });

    const onSubmit = (formData: typeof form.values) => {
        setIsLoadingAddAddress(true)
        addAddress({name: formData?.name, address: formData?.address}, () => {
            setIsLoadingAddAddress(false)
            form.reset()
        })
    }

    return (
        <Fieldset py={'sm'} px={'sm'}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack gap={2}>
                    <TextInput
                        withAsterisk
                        placeholder="Address"
                        {...form.getInputProps('address')}
                    />
                    <Flex gap={10} w={'100%'} mt="xs" align={'flex-start'} justify={'space-between'}>
                        <TextInput
                            w={'100%'}
                            withAsterisk
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <Button type="submit" loading={isLoadingAddAddress}>
                            Submit
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </Fieldset>
    );
};

export default AddAddressCard;