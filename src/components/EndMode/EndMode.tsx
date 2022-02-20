import { Button, Center, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlayerState, TeamColor, TileArray, TileState } from '../../models/RoomState';

interface EndModeProps {
    player: PlayerState | undefined;
    tileArrays: TileArray[];
    leaveGame: () => void;
}

export default function EndMode({ player, tileArrays, leaveGame }: EndModeProps) {
    const navigate = useNavigate();

    const [blueCount, setBlueCount] = useState(0);
    const [redCount, setRedCount] = useState(0);

    useEffect(() => {
        let blueCount = 0;
        let redCount = 0;
        tileArrays.forEach((a) => {
            a.tiles.forEach((t) => {
                if (t.color === TeamColor.Blue) blueCount++;
                else redCount++;
            });
        });

        setBlueCount(blueCount);
        setRedCount(redCount);
    });

    function renderWinner() {
        if (blueCount === redCount) {
            return <Title>Tie!</Title>;
        } else if (blueCount > redCount) {
            return <Title>Blue Won!</Title>;
        } else {
            return <Title>Red Won!</Title>;
        }
    }

    return (
        <Center style={{ padding: 0, height: '100%', flexDirection: 'column' }}>
            {renderWinner()}
            <Button
                onClick={() => {
                    leaveGame();
                    navigate('/');
                }}
            >
                Play Again?
            </Button>
        </Center>
    );
}
