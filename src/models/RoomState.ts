import { Schema, ArraySchema, Context, type } from "@colyseus/schema";

export enum TeamColor {
    Red,
    Blue,
}

export class PlayerState extends Schema {
    @type('string')
    id: string;

    @type('string')
    name: string;

    @type('number')
    team: TeamColor;

    constructor(id: string, name: string, team: TeamColor) {
        super();

        this.id = id;
        this.name = name;
        this.team = team;
    }
}

export class TileState extends Schema {
    @type('number')
    color: TeamColor;

    constructor(color: TeamColor) {
        super();

        this.color = color;
    }
}

export class TileArray extends Schema {
    @type([TileState])
    tiles: TileState[];

    constructor() {
        super();

        this.tiles = [];
    }
}

export enum GameState {
    Waiting,
    Playing,
    Ended
}

export interface IRoomState extends Schema {
    playerStates: PlayerState[];
  
    gameState: GameState;
  
    tileStates: TileArray[];

}