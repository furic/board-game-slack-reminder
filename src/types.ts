export interface GameConfig {
  list: string[];
  pickCount: number;
}

export interface AppConfig {
  messages: string[];
  games: GameConfig;
} 