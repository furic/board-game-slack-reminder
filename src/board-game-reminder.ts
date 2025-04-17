import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig, Game } from './types';

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL;

if (!BOT_TOKEN) {
  throw new Error('SLACK_BOT_TOKEN environment variable is not set');
}

if (!CHANNEL) {
  throw new Error('SLACK_CHANNEL environment variable is not set');
}

// At this point, TypeScript knows CHANNEL is a string
const channel: string = CHANNEL;

// Load configuration
const configPath = path.join(__dirname, 'config.json');
const config: AppConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = new WebClient(BOT_TOKEN);

function pickRandomGames(count: number = config.games.pickCount): Game[] {
  const shuffled = [...config.games.list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function addReactions(channel: string, timestamp: string, games: Game[]): Promise<void> {
  for (const game of games) {
    try {
      await client.reactions.add({
        channel,
        timestamp,
        name: game.emoji
      });
      console.log(`Added reaction ${game.emoji} for ${game.name}`);
    } catch (error) {
      console.error(`Error adding reaction ${game.emoji} for ${game.name}:`, error);
    }
  }
}

async function sendReminder(): Promise<void> {
  const message = config.messages[Math.floor(Math.random() * config.messages.length)];
  const games = pickRandomGames();
  const gamesList = games.map(game => `${game.emoji} *${game.name}*`).join(', ');
  const finalMessage = `${message}\n🎮 We'll likely play ${gamesList}!\n\nReact with the emoji of the game you'd like to play!`;

  try {
    const result = await client.chat.postMessage({
      channel,
      text: finalMessage
    });
    
    if (result.ok && result.ts) {
      console.log('Message sent successfully!');
      await addReactions(channel, result.ts, games);
    } else {
      console.error('Failed to get message timestamp:', result);
    }
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder(); 