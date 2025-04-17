import { WebClient } from '@slack/web-api';
import * as dotenv from 'dotenv';

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

const client = new WebClient(BOT_TOKEN);

async function deleteLastMessage(): Promise<void> {
  try {
    // First, get the channel history to find the last message from our bot
    const history = await client.conversations.history({
      channel,
      limit: 10 // Get last 10 messages to find our bot's message
    });

    if (!history.ok || !history.messages) {
      throw new Error('Failed to get channel history');
    }

    // Find the last message from our bot
    const authTest = await client.auth.test();
    if (!authTest.ok || !authTest.user_id) {
      throw new Error('Failed to get bot user ID');
    }

    const botUserId = authTest.user_id;
    const lastBotMessage = history.messages.find(msg => msg.user === botUserId);

    if (!lastBotMessage || !lastBotMessage.ts) {
      console.log('No messages from our bot found in the last 10 messages');
      return;
    }

    // Delete the message
    const result = await client.chat.delete({
      channel,
      ts: lastBotMessage.ts
    });

    if (result.ok) {
      console.log('Successfully deleted the last message');
    } else {
      console.error('Failed to delete message:', result);
    }
  } catch (error) {
    console.error('Error deleting last message:', error);
  }
}

deleteLastMessage(); 