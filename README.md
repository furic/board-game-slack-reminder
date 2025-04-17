# Board Game Slack Reminder

[![CI](https://github.com/furic/board-game-slack-reminder/actions/workflows/ci.yml/badge.svg)](https://github.com/furic/board-game-slack-reminder/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Slack bot that sends reminders for board game sessions and helps coordinate game selection through emoji reactions.

## Features

- Sends friendly reminders about board game sessions
- Randomly selects games to suggest from a configurable list
- Adds emoji reactions for each game, allowing participants to vote
- Supports both production and testing environments
- Shows player count requirements for each game

## Example Output

![Bot Message Example](docs/images/bot-message-example.png)

The bot sends a friendly reminder and adds emoji reactions for each game, making it easy for users to indicate which games they'd like to play.

## Quick Start

### 1. Create and Configure Slack App

Choose one of these methods:

#### Method 1: Using App Manifest (Recommended)
1. Go to https://api.slack.com/apps
2. Click "Create New App" → "From an app manifest"
3. Select your workspace
4. Copy and paste the contents of `slack-manifest.json` from this repository
5. Click "Create"

#### Method 2: From Scratch
1. Go to https://api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. Name your app and select your workspace
4. Go to "OAuth & Permissions" and add these scopes:
   - `chat:write` (for sending messages)
   - `channels:read` (for accessing channels)
   - `groups:read` (for accessing private channels)
   - `chat:write.public` (for sending messages to public channels)
   - `reactions:write` (for adding emoji reactions)

### 2. Install and Configure

1. Install the app to your workspace:
   - Click "Install to Workspace"
   - Copy the "Bot User OAuth Token" (starts with `xoxb-...`)

2. Clone and setup the repository:
   ```bash
   git clone https://github.com/furic/board-game-slack-reminder.git
   cd board-game-slack-reminder
   npm install
   ```

3. Configure environment:
   - Create a `.env` file with your bot token:
     ```
     SLACK_BOT_TOKEN=xoxb-your-bot-token
     ```

4. Add the bot to channels:
   - Invite the bot using `/invite @your-bot-name`
   - Required channels:
     - Production: `social-board-games`
     - Testing: `social-board-games-testing`

5. Customize game settings:
   - Edit `src/config.json` for production
   - Edit `src/config.test.json` for testing
   - Configure games, messages, and player counts

### 3. Run the Bot

Production:
```bash
npm run build
npm start
```

Testing:
```bash
npm test
```

## Configuration

The bot uses two configuration files:
- `src/config.json`: Production configuration
- `src/config.test.json`: Test configuration

Each config file contains:
- `channel`: The Slack channel name
- `messages`: Array of possible reminder messages
- `games`: Array of games with:
  - `name`: Game name
  - `emoji`: Slack emoji name (without colons, e.g., "game_die" not ":game_die:" or "🎲")
  - `minPlayers`: Minimum number of players required
  - `maxPlayers`: Maximum number of players allowed

> **Note**: For the `emoji` field, use valid Slack emoji names without colons. For example, use "rice" for 🌾, "castle" for 🏰, etc. You can find a list of available emojis in your Slack workspace by typing `:` in the message input.

## Recent Updates

- Added TypeScript support for better type safety
- Moved channel configuration to `config.json`
- Added separate test configuration with `config.test.json`
- Added player count requirements for games
- Improved error handling and logging
- Added emoji reactions for game voting
- Added Slack app manifest for easier setup

---

## 💡 Example Output

Don't make weekend plans – we roll dice tomorrow, 4:30pm L9 😉  
🎮 We'll likely play *Catan* and *The Resistance*!

---

## ⚙️ Features

- ✅ Weekly scheduled message (via GitHub Actions cron job)
- ✅ Uses Slack Bot Token for authenticated posting
- ✅ Editable game list and messages
- ✅ Zero infrastructure (runs serverlessly via GitHub)

---

## 📁 File Structure

```
📦 board-game-slack-reminder
├── src/
│   ├── board-game-reminder.ts  # The main script
│   ├── config.json            # Production configuration
│   └── config.test.json       # Test configuration
├── package.json               # Dependencies and scripts
├── slack-manifest.json        # Slack app configuration
└── .github/
    └── workflows/
        └── slack-reminder.yml # GitHub Actions workflow
```

---

## 🙋‍♀️ Contributions

Got a fun feature idea? Open an issue or submit a PR! Suggestions like:
- Google Sheets integration
- RSVP interactivity
- Random snacks generator 🍕?

---

## 📄 License

MIT – Free to use, modify, or share.

---

Made with ☕ and 🎲 by gamers, for gamers.
