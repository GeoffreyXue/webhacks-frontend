import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import * as Colyseus from 'colyseus.js';

import { RoomProps } from '../../models/RoomProps';
import { IRoomState, PlayerState } from '../../models/RoomState';

import WaitingMode from '../../components/WaitingMode/WaitingMode';

export default function Room() {
    const { name, roomID }: RoomProps = useLocation().state as RoomProps;
    const [players, setPlayers] = useState<PlayerState[]>([]);
    // const [room, setRoom] = useState<Colyseus.Room<GameState> | undefined>(undefined);
    const client = new Colyseus.Client(`ws://localhost:2567`);

    useEffect(() => {

        function roomSetup(room: Colyseus.Room<IRoomState>) {
            room.onStateChange((state) => {
                console.dir(state);
                setPlayers(state.playerStates);
            });

            // room.onMessage("message_type", (message) => {
            //     console.log("received on", room.name, message);
            // });

            // room.onError((code, message) => {
            //     console.log("couldn't join", room.name);
            // });

            // room.onLeave((code) => {
            //     console.log("left", room.name);
            // });
        }

        client.joinOrCreate("game", {name})
        .then(r => {
            const room = r as Colyseus.Room<IRoomState>;
            console.log(room.sessionId, "joined", room.name);
            console.log(room);
            
            roomSetup(room);
        })
        .catch(e => {
            console.log("JOIN ERROR", e);
        });
    }, []);

    return (
        <WaitingMode players={players} startGame={() => {}}/>
    );
}
