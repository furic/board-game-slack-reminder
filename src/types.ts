export interface Game {
  name: string;
  emoji: string;
  minPlayers?: number;
  maxPlayers?: number;
}

export interface GameConfig {
  list: Game[];
  pickCount: number;
}

export interface AppConfig {
  games: Game[];
  channel: string;
} 