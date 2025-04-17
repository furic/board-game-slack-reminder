import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('SLACK_BOT_TOKEN environment variable is not set');
}

const client = new WebClient(BOT_TOKEN);

const casualMessages: string[] = [
  "Heads up, nerds! It's board game Friday tomorrow 🃏 – 4:30pm at L9!",
  "Warning: Friday fun incoming! Join us 4:30pm tomorrow at L9 🎲",
  "Don't make weekend plans – we roll dice tomorrow, 4:30pm L9 😉",
  "Game on! Board games kick off 4:30pm tomorrow at L9 – be there or be square 🎯"
];

const boardGames: string[] = [
  "Catan",
  "Carcassonne",
  "7 Wonders",
  "Azul",
  "Cascadia",
  "Wingspan",
  "Ticket to Ride",
  "ROOT",
];

function pickRandomGames(count: number = 2): string[] {
  const shuffled = [...boardGames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function sendReminder(): Promise<void> {
  const message = casualMessages[Math.floor(Math.random() * casualMessages.length)];
  const [game1, game2] = pickRandomGames();
  const finalMessage = `${message}\n🎮 We'll likely play *${game1}* and *${game2}*!`;

  try {
    await client.chat.postMessage({
      channel: 'social-board-games', // Channel name without the # prefix
      text: finalMessage
    });
    console.log('Reminder sent successfully!');
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder(); 