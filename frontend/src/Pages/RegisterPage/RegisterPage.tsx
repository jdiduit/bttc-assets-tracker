import {Anchor, Box, Button, Group, Paper, PasswordInput, TextInput, Title,} from '@mantine/core';
import {Link, useNavigate} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.tsx";
import {useForm} from "@mantine/form";
import {RoutePaths} from "@/Pages/routes.ts";

const RegisterPage = () => {
    const {register} = useAuthStore()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {username: '', password: ''},
        validate: {
            username: (value) => (value.length < 2 ? 'Username must have at least 2 letters' : null),
            password: (value) => (value.length < 2 ? 'Password must have at least 2 letters' : null),
        },
    });

    const onSubmitLogin = async (formData: typeof form.values) => {
        register(formData, () => {
            navigate(RoutePaths.BALANCE)
            localStorage.setItem('location', RoutePaths.BALANCE)
        })
    }

    return <Box px={'sm'} left={0} right={0} top={'50%'} pos={'absolute'} style={{transform: 'translateY(-50%)'}}>
        <Title style={{fontWeight: 900, textAlign: 'center'}}>
            Register
        </Title>

        <form onSubmit={form.onSubmit(onSubmitLogin)}>
            <Paper shadow="md" p={30} radius="md">
                <TextInput mt="sm" label="Username" placeholder="Username" {...form.getInputProps('username')} />
                <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
                <Group style={{justifyContent: 'space-between'}} mt="sm">
                    <Link to={RoutePaths.LOGIN}>
                        <Anchor size="sm" component="button">
                            Login
                        </Anchor>
                    </Link>
                </Group>
                <Button type={'submit'} fullWidth mt="md">
                    Sign up
                </Button>
            </Paper>
        </form>
    </Box>
}

export default RegisterPage