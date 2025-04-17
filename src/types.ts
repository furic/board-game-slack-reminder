export interface Game {
  name: string;
  emoji: string;
}

export interface GameConfig {
  list: Game[];
  pickCount: number;
}

export interface AppConfig {
  messages: string[];
  games: GameConfig;
} 