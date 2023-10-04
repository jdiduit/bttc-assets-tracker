import {ActionIcon, Flex, Menu, Paper, rem, Stack, Text, TextInput} from "@mantine/core";
import {AddressType, useAddressStore} from "@/store/useAddressStore.tsx";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {IconAdjustmentsAlt, IconDeviceFloppy, IconEdit, IconTrash, IconX} from "@tabler/icons-react";
import {shortAddress} from "@/utils/functions.ts";
import CopyButton from "../../components/CopyButton.tsx";
import {modals} from "@mantine/modals";
import {useDisclosure} from "@mantine/hooks";

const WalletAddressCard = (props: Partial<AddressType>) => {
    const {address, name, id, userId} = props
    const [isLoadingEdit, setIsLoadingEdit] = useState(false)
    const [isEditMode, {close: disableEditMode, open: enableEditMode}] = useDisclosure();
    const {editAddress, deleteAddress} = useAddressStore()

    const form = useForm({
        initialValues: {name: name!},
        validate: {
            name: (value) => (value.length < 1 ? 'Write a name of address' : null),
        },
    });

    const onSubmitForm = (formData: typeof form.values) => {
        setIsLoadingEdit(true)
        editAddress(id!, {address, name: formData.name, id, userId}, () => {
            disableEditMode()
            setIsLoadingEdit(false)
        })
    }

    const onDeleteAddressModal = () => {
        modals.openConfirmModal({
            title: 'Logout',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete address?
                </Text>
            ),
            labels: {confirm: 'Confirm', cancel: 'Cancel'},
            onCancel: () => console.log('Cancel'),
            onConfirm: () => {
                deleteAddress(id!.toString())
                disableEditMode()
            }
        });
    }

    return (
        <Paper radius="md" p={'sm'} withBorder shadow={'md'}>
            <Stack gap={'xs'}>
                <Flex gap={'xs'} align={'flex-start'} justify={'space-between'}>
                    <form style={{width: '100%'}}>
                        {isEditMode
                            ? <TextInput
                                variant={!isEditMode ? "filled" : 'default'}
                                w={'100%'}
                                size={'sm'}
                                disabled={!isEditMode}
                                placeholder="Name"
                                {...form.getInputProps('name')}
                            />
                            : <Text fz={18} fw={'700'}>{name}</Text>
                        }
                    </form>
                    {isEditMode
                        ? <Flex align={'center'} justify={'center'}>
                            <ActionIcon
                                loading={isLoadingEdit}
                                color={'green'}
                                onClick={() => form.onSubmit(onSubmitForm)()}
                                size={'lg'}
                                variant={'subtle'}
                            >
                                <IconDeviceFloppy/>
                            </ActionIcon>
                            <ActionIcon
                                loading={isLoadingEdit} color={'red'}
                                onClick={disableEditMode}
                                size={'lg'}
                                variant={'subtle'}
                            >
                                <IconX/>
                            </ActionIcon>
                        </Flex>
                        : <Menu position={'bottom-end'} shadow="md">
                            <Menu.Target>
                                <ActionIcon variant={'subtle'} size={36} loading={isLoadingEdit}>
                                    <IconAdjustmentsAlt/>
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={enableEditMode}
                                    leftSection={<IconEdit style={{width: rem(14), height: rem(14)}}/>}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item onClick={onDeleteAddressModal} color={'red'}
                                           leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}>
                                    Delete
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    }
                </Flex>
                <CopyButton str={shortAddress(address!)} value={address!}/>
            </Stack>
        </Paper>
    );
};

export default WalletAddressCard;