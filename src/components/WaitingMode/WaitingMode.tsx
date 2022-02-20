import { useEffect } from 'react';
import { Container, Center, Card, Grid, Title, SimpleGrid, Button, Text } from '@mantine/core';

import FadeIn from 'react-fade-in';

import { PlayerState, TeamColor } from '../../models/RoomState';

interface WaitingModeProps {
    player: PlayerState | undefined;
    players: PlayerState[];
    startGame: () => void;
}

export default function WaitingMode({ player, players, startGame }: WaitingModeProps) {
    useEffect(() => {
        console.log('Players updated');
        console.log(players.map((p) => p.name));
    }, [players]);

    return (
        <div style={{ height: '100vh' }}>
            <Center style={{ flexDirection: 'column', paddingTop: 100 }}>
                <Button
                    style={{
                        width: 300,
                        height: 50,
                        fontSize: 24,
                        marginBottom: 50,
                    }}
                    onClick={startGame}
                >
                    Start Game!
                </Button>
                <Title style={{ marginBottom: 10 }}>Players ({players.length} / 12)</Title>
                <Grid grow style={{ width: '75vw' }}>
                    <Grid.Col span={5}>
                        <Text size='xl' color='blue'>
                            Blue
                        </Text>
                        <SimpleGrid
                            cols={3}
                            spacing='sm'
                            breakpoints={[
                                { maxWidth: 1500, cols: 2, spacing: 'sm' },
                                { maxWidth: 1000, cols: 1, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                            ]}
                        >
                            {players
                                .filter((p) => p.team == TeamColor.Blue)
                                .map((p) => (
                                    <FadeIn key={p.id}>
                                        <Card shadow='sm' padding='md' radius='md' key={p.id}>
                                            <Text
                                                align='center'
                                                weight={p.id == player?.id ? '700' : '600'}
                                            >
                                                {p.name}
                                            </Text>
                                        </Card>
                                    </FadeIn>
                                ))}
                        </SimpleGrid>
                    </Grid.Col>
                    <Grid.Col span={1}></Grid.Col>
                    <Grid.Col span={5}>
                        <Text align='right' size='xl' color='red'>
                            Red
                        </Text>
                        <SimpleGrid
                            cols={3}
                            spacing='sm'
                            breakpoints={[
                                { maxWidth: 1500, cols: 2, spacing: 'sm' },
                                { maxWidth: 1000, cols: 1, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                            ]}
                            style={{ gridAutoFlow: 'dense', direction: 'rtl' }}
                        >
                            {players
                                .filter((player) => player.team == TeamColor.Red)
                                .map((player) => (
                                    <FadeIn>
                                        <Card shadow='sm' padding='lg' radius='md' key={player.id}>
                                            <Text align='center' weight='600'>
                                                {player.name}
                                            </Text>
                                        </Card>
                                    </FadeIn>
                                ))}
                        </SimpleGrid>
                    </Grid.Col>
                </Grid>
            </Center>
        </div>
    );
}
