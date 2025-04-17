export interface GameConfig {
  list: string[];
  defaultPickCount: number;
}

export interface AppConfig {
  messages: string[];
  games: GameConfig;
} 