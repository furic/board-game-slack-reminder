import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from './types';

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

function pickRandomGames(count: number = config.games.defaultPickCount): string[] {
  const shuffled = [...config.games.list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function sendReminder(): Promise<void> {
  const message = config.messages[Math.floor(Math.random() * config.messages.length)];
  const [game1, game2] = pickRandomGames();
  const finalMessage = `${message}\n🎮 We'll likely play *${game1}* and *${game2}*!`;

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