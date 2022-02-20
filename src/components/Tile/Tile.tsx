import { Paper } from '@mantine/core';
import { TeamColor } from '../../models/RoomState';

interface TileProps {
    x: number;
    y: number;
    color: TeamColor;
    flipTile: (x: number, y: number) => void;
}

export default function Tile({ x, y, color, flipTile }: TileProps) {
    return (
        <Paper
            onClick={() => {
                flipTile(x, y);
            }}
            style={{
                background: color == TeamColor.Blue ? 'blue' : 'red',
                borderRadius: 10,
                cursor: 'pointer',
            }}
        />
    );
}
