import { useNavigate } from 'react-router-dom';
import { Container, Center, Title, Button } from '@mantine/core';

export default function NoMatch() {
    const navigate = useNavigate();

    return (
        <Container style={{ height: '100vh' }}>
            <Center style={{ height: '100%', flexDirection: 'column' }}>
                <Title style={{ margin: 10 }}>Nothing here!</Title>
                <Button
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Back to the home page
                </Button>
            </Center>
        </Container>
    );
}
