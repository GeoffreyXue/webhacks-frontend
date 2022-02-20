import { TeamColor } from "../../models/RoomState";

interface PlayingModeProps {
    flipTile: (x: number, y: number) => void;
}

export default function PlayingMode({ flipTile }: PlayingModeProps) {
    return <div>Hello Playing Mode</div>;
}