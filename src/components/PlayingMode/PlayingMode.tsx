import { Badge, Center, Grid, Title, useMantineTheme } from '@mantine/core';

import { PlayerState, TeamColor, TileArray } from '../../models/RoomState';

import Tile from '../../components/Tile/Tile';
import { useEffect } from 'react';

interface PlayingModeProps {
    player: PlayerState | undefined;
    time: number;
    tileArrays: TileArray[];
    flipTile: (x: number, y: number) => void;
}

export default function PlayingMode({ player, time, tileArrays, flipTile }: PlayingModeProps) {
    const theme = useMantineTheme();

    useEffect(() => {
        console.log('tiles', tileArrays);
    }, []);

    return (
        <Center style={{ padding: 0, height: '100%', flexDirection: 'column' }}>
            <Title
                style={{
                    color:
                        player?.team == TeamColor.Blue ? theme.colors.blue[6] : theme.colors.red[6],
                }}
            >
                Team {player?.team === TeamColor.Blue ? 'Blue' : 'Red'}
            </Title>

            <Title>Time Left: {time} seconds</Title>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 1fr)',
                    gridTemplateRows: 'repeat(10, 1fr)',
                    height: '40vw',
                    width: '40vw',
                    gap: 5,
                }}
            >
                {tileArrays.map((a, r) => {
                    return a.tiles.map((t, c) => (
                        <Tile color={t.color} x={r} y={c} flipTile={flipTile} />
                    ));
                })}
            </div>
        </Center>
    );
}
