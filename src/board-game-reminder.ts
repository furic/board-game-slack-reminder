import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';
import { Game } from './types';
import config from './config.json';

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('SLACK_BOT_TOKEN environment variable is not set');
}

const client = new WebClient(BOT_TOKEN);

function pickRandomGames(count: number = 2): Game[] {
  const shuffled = [...config.games].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function addReactions(channel: string, ts: string, game: Game) {
  try {
    await client.reactions.add({
      channel,
      timestamp: ts,
      name: game.emoji
    });
  } catch (error) {
    console.error('Error adding reactions:', error);
  }
}

async function sendReminder(): Promise<void> {
  try {
    const message = config.messages[Math.floor(Math.random() * config.messages.length)];
    const games = pickRandomGames();
    const gamesList = games.map(game => `:${game.emoji}: *${game.name}*`).join(', ');
    const finalMessage = `${message}\n🎮 We'll likely play ${gamesList}!\n\nReact with the emoji of the game you'd like to play!`;

    const result = await client.chat.postMessage({
      channel: config.channel,
      text: finalMessage
    });

    if (result.ok && result.ts && result.channel) {
      console.log('Message sent successfully!');
      for (const game of games) {
        await addReactions(result.channel, result.ts, game);
      }
    } else {
      console.error('Failed to get message timestamp or channel:', result);
    }
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder(); 