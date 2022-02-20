import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import * as Colyseus from 'colyseus.js';

import { RoomProps } from '../../models/RoomProps';
import { IRoomState, PlayerState, TileArray, GameState, TeamColor } from '../../models/RoomState';

import WaitingMode from '../../components/WaitingMode/WaitingMode';
import PlayingMode from '../../components/PlayingMode/PlayingMode';
import EndMode from '../../components/EndMode/EndMode';

export default function Room() {
    const { name, roomID }: RoomProps = useLocation().state as RoomProps;
    const [player, setPlayer] = useState<PlayerState>();

    const [players, setPlayers] = useState<PlayerState[]>([]);
    const [tiles, setTiles] = useState<TileArray[]>([]);
    const [status, setStatus] = useState<GameState>(GameState.Waiting);
    const [time, setTime] = useState<number>(60);

    const [room, setRoom] = useState<Colyseus.Room<IRoomState>>();

    const client = new Colyseus.Client(`ws://localhost:2567`);

    useEffect(() => {
        client
            .joinOrCreate<IRoomState>('game', { name })
            .then((room) => {
                setRoom(room);
                console.log(room.sessionId, 'joined', room.name);
                setStatus(room.state.gameState);

                room.onStateChange((state) => {
                    console.log('State changed');
                    console.dir(state.tileStates.length);
                });

                room.onMessage('player-join', (newPlayers: PlayerState[]) => {
                    console.log('player joined');
                    setPlayer(newPlayers.find((p) => p.id == room.sessionId));
                    setPlayers(newPlayers);
                });

                room.onMessage('player-leave', (newPlayers: PlayerState[]) => {
                    console.log('player left');
                    setPlayers(newPlayers);
                });

                room.onMessage('game-start', (gameState: GameState) => {
                    console.log('Game started');
                    setStatus(gameState);
                });

                room.onMessage('tile-update', (tileStates: TileArray[]) => {
                    console.log('tile-update');
                    setTiles(tileStates);
                });

                room.onMessage('game-time', (time: number) => {
                    console.log('game-time', time);
                    setTime(time);
                });

                room.onMessage('game-end', (gameState: GameState) => {
                    console.log('Game ended');
                    setStatus(gameState);
                });
            })
            .catch((e) => {
                console.log('JOIN ERROR', e);
            });
    }, []);

    function startGame() {
        room?.send('game-start', {});
    }

    function flipTile(x: number, y: number) {
        room?.send('flip', { x, y, team: player?.team });
    }

    function render() {
        switch (status) {
            default:
                return <WaitingMode player={player} players={players} startGame={startGame} />;
            case GameState.Playing:
                return (
                    <PlayingMode
                        player={player}
                        time={time}
                        tileArrays={tiles}
                        flipTile={flipTile}
                    />
                );
            case GameState.Ended:
                return <EndMode player={player} tileArrays={tiles} />;
        }
    }

    return render();
}
