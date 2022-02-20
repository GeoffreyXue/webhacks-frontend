import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import * as Colyseus from 'colyseus.js';

import { RoomProps } from '../../models/RoomProps';
import { IRoomState, PlayerState, TileArray, GameState, TeamColor } from '../../models/RoomState';

import WaitingMode from '../../components/WaitingMode/WaitingMode';
import PlayingMode from '../../components/PlayingMode/PlayingMode';

export default function Room() {
    const { name, roomID }: RoomProps = useLocation().state as RoomProps;
    const [team, setTeam] = useState<TeamColor>();
    const [players, setPlayers] = useState<PlayerState[]>([]);
    const [tiles, setTiles] = useState<TileArray[]>([]);
    const [status, setStatus] = useState<GameState>(GameState.Waiting);
    const [room, setRoom] = useState<Colyseus.Room<IRoomState>>();
    const client = new Colyseus.Client(`ws://localhost:2567`);

    useEffect(() => {
        client.joinOrCreate<IRoomState>("game", {name})
        .then(room => {
            setRoom(room);
            console.log(room.sessionId, "joined", room.name);
            
            // room.onStateChange((state) => {
            //     console.log("State changed");
            //     console.dir(state.playerStates.map(p => p.name));
            //     setTiles(state.tileStates);
            //     setStatus(state.gameState);
            // });

            room.onMessage("player-join", (newPlayers: PlayerState[]) => {
                console.log("player joined");
                setTeam(newPlayers.find(p => p.id == room.sessionId)?.team ?? TeamColor.Blue);
                setPlayers(newPlayers);
            })

            room.onMessage("player-leave", (newPlayers: PlayerState[]) => {
                console.log("player left");
                setPlayers(newPlayers);
            })

            room.onMessage("game-start", (gameState: GameState) => {
                console.log("Game started");
                setStatus(gameState);
            })
        })
        .catch(e => {
            console.log("JOIN ERROR", e);
        });
    }, []);

    function startGame() {
        room?.send("game-start", {});
    }

    function flipTile(x: number, y: number) {
        room?.send("flip", {x, y, team})
    }

    function render() {
        switch (status) {
            case GameState.Waiting:
                return <WaitingMode players={players} startGame={startGame}/>
            case GameState.Playing:
                return <PlayingMode flipTile={flipTile}/>
            default:
                return <div>Unexpected/unimplemented location</div>
        }
    }

    return render();
}
