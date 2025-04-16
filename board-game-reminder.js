const { WebClient } = require('@slack/web-api');
const BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

const client = new WebClient(BOT_TOKEN);

const casualMessages = [
  "Heads up, nerds! It's board game Friday tomorrow 🃏 – 4:30pm at L9!",
  "Warning: Friday fun incoming! Join us 4:30pm tomorrow at L9 🎲",
  "Don't make weekend plans – we roll dice tomorrow, 4:30pm L9 😉",
  "Game on! Board games kick off 4:30pm tomorrow at L9 – be there or be square 🎯"
];

const boardGames = [
  "Catan",
  "Carcassonne",
  "7 Wonders",
  "Azul",
  "Cascadia",
  "Wingspan",
  "Ticket to Ride",
  "ROOT",
];

function pickRandomGames(count = 2) {
  const shuffled = boardGames.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function sendReminder() {
  const message = casualMessages[Math.floor(Math.random() * casualMessages.length)];
  const [game1, game2] = pickRandomGames();
  const finalMessage = `${message}\n🎮 We'll likely play *${game1}* and *${game2}*!`;

  try {
    await client.chat.postMessage({
      channel: '#social-board-game',
      text: finalMessage
    });
    console.log('Reminder sent!');
  } catch (error) {
    console.error('Error sending reminder:', error);
  }
}

sendReminder();