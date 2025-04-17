import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig, Game } from './types';
import config from './config.json';

// Load environment variables from .env file
dotenv.config();

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('SLACK_BOT_TOKEN environment variable is not set');
}

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
  try {
    const message = await client.chat.postMessage({
      channel: config.channel,
      text: "🎲 *Board Game Night Reminder!* 🎲\n\nReact with the emoji of the game you'd like to play:",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🎲 *Board Game Night Reminder!* 🎲\n\nReact with the emoji of the game you'd like to play:"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: config.games.map(game => `${game.emoji} ${game.name}`).join('\n')
          }
        }
      ]
    });

    if (!message.ok || !message.ts) {
      throw new Error('Failed to send message');
    }

    // Add reactions for each game
    for (const game of config.games) {
      try {
        await client.reactions.add({
          channel: config.channel,
          timestamp: message.ts,
          name: game.emoji
        });
      } catch (error) {
        console.error(`Error adding reaction ${game.emoji} for ${game.name}:`, error);
      }
    }

    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder(); 