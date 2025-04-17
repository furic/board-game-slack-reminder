export interface GameConfig {
  list: string[];
  defaultPickCount: number;
}

export interface MessageConfig {
  casual: string[];
}

export interface AppConfig {
  messages: MessageConfig;
  games: GameConfig;
} 