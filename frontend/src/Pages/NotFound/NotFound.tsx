import {Button, Container, Group, Title} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import classes from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Not found page</Title>
            <Group justify="center">
                <Button onClick={() => navigate('/')} variant="subtle" size="md">
                    Take me back to home page
                </Button>
            </Group>
        </Container>
    );
};

export default NotFound