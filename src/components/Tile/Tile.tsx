import { Paper, useMantineTheme } from '@mantine/core';
import { TeamColor } from '../../models/RoomState';

interface TileProps {
    x: number;
    y: number;
    color: TeamColor;
    flipTile: (x: number, y: number) => void;
}

export default function Tile({ x, y, color, flipTile }: TileProps) {
    const theme = useMantineTheme();

    return (
        <Paper
            onClick={() => {
                flipTile(x, y);
            }}
            style={{
                background: color == TeamColor.Blue ? theme.colors.blue[6] : theme.colors.red[6],
                borderRadius: 10,
                cursor: 'pointer',
            }}
        />
    );
}
