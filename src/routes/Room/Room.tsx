import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RoomProps } from '../../models/RoomProps';

export default function Room() {
    const { name, roomID }: RoomProps = useLocation().state as RoomProps;

    useEffect(() => {
        console.log(name);
    }, []);

    return <div>{roomID}</div>;
}
