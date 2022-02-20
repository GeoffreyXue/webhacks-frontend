import { useEffect } from 'react';
import { Container, Center, Card, Title, SimpleGrid, Button, Text } from '@mantine/core';

import { PlayerState } from '../../models/RoomState';

interface WaitingModeProps {
    players: PlayerState[];
    startGame: () => void;
}

export default function WaitingMode({ players, startGame }: WaitingModeProps) {
    useEffect(() => {}, []);

    return (
        <Container style={{ height: '100vh'}}>
            <Center style={{ flexDirection: 'column', padding: 100 }}>
                <Button 
                    style={{
                        width: 300,
                        height: 50,
                        fontSize: 24,
                        marginBottom: 50
                    }}
                    onClick={startGame}
                >
                    Start Game!
                </Button>
                <Title style={{ marginBottom: 10}}>Players</Title>
                <SimpleGrid
                    cols={4}
                    spacing="lg"
                    breakpoints={[
                        { maxWidth: 980, cols: 3, spacing: 'md' },
                        { maxWidth: 755, cols: 2, spacing: 'sm' },
                        { maxWidth: 600, cols: 1, spacing: 'sm' },
                    ]}
                >
                    {players.map(player => (
                        <Card shadow="sm" padding="lg" radius="md" key={player.id}>
                            <Text weight="600" >{player.name}</Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Center>
        </Container>
    );
}
