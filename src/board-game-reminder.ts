import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig, Game } from './types';

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('SLACK_BOT_TOKEN environment variable is not set');
}

// Load configuration
const configPath = path.join(__dirname, 'config.json');
const config: AppConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = new WebClient(BOT_TOKEN);

function pickRandomGames(count: number = config.games.pickCount): Game[] {
  const shuffled = [...config.games.list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function sendReminder(): Promise<void> {
  const message = config.messages[Math.floor(Math.random() * config.messages.length)];
  const games = pickRandomGames();
  const gamesList = games.map(game => `${game.emoji} *${game.name}*`).join(', ');
  const finalMessage = `${message}\n🎮 We'll likely play ${gamesList}!\n\nReact with the emoji of the game you'd like to play!`;

  try {
    await client.chat.postMessage({
      channel: 'social-board-games',
      text: finalMessage
    });
    console.log('Reminder sent successfully!');
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder(); 