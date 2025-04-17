# Board Game Slack Reminder

A Slack bot that sends reminders for board game sessions and helps coordinate game selection through emoji reactions.

## Features

- Sends friendly reminders about board game sessions
- Randomly selects games to suggest from a configurable list
- Adds emoji reactions for each game, allowing participants to vote
- Supports both production and testing environments
- Shows player count requirements for each game

## Setup

1. Create a Slack App:
   - Go to https://api.slack.com/apps
   - Click "Create New App" and choose "From scratch"
   - Name your app and select your workspace

2. Configure Bot Token Scopes:
   - In your app settings, go to "OAuth & Permissions"
   - Under "Bot Token Scopes", add these scopes:
     - `chat:write` (for sending messages)
     - `channels:read` (for accessing channels)
     - `groups:read` (for accessing private channels)
     - `chat:write.public` (for sending messages to public channels)
     - `reactions:write` (for adding emoji reactions)

3. Install the app to your workspace:
   - Click "Install to Workspace" and authorize the app
   - Copy the "Bot User OAuth Token" for later use

4. Clone and Setup:
   ```bash
   git clone https://github.com/furic/board-game-slack-reminder.git
   cd board-game-slack-reminder
   npm install
   ```

5. Configure Environment:
   - Create a `.env` file for production:
     ```
     SLACK_BOT_TOKEN=xoxb-your-bot-token
     ```
   - Create a `.env.local` file for testing:
     ```
     SLACK_BOT_TOKEN=xoxb-your-bot-token
     ```

6. Add the Bot to Channels:
   - Invite the bot to your channels using `/invite @your-bot-name`
   - Required for both production (`board-games`) and testing (`board-games-testing`) channels

7. Configure Games:
   - Edit `src/config.json` for production settings
   - Edit `src/config.test.json` for test settings
   - Add or modify games with their emoji and player count requirements

## Usage

Build and run in production:
```bash
npm run build
npm start
```

Run in test environment:
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
  - `emoji`: Associated emoji
  - `minPlayers`: Minimum number of players required
  - `maxPlayers`: Maximum number of players allowed

## Recent Updates

- Added TypeScript support for better type safety
- Moved channel configuration to `config.json`
- Added separate test configuration with `config.test.json`
- Added player count requirements for games
- Improved error handling and logging
- Added emoji reactions for game voting

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

## 🚀 Setup Instructions

### 1. Create a Slack App
- Go to https://api.slack.com/apps
- Create a new app (from scratch)
- Add these bot token scopes:
  - chat:write
  - channels:read
  - groups:read
- Install it to your workspace
- Copy the Bot User OAuth Token (starts with `xoxb-...`)

---

### 2. Fork or Clone This Repository

```bash
git clone https://github.com/furic/board-game-slack-reminder.git
cd board-game-slack-reminder
```

---

### 3. Add the Slack Bot Token to GitHub

Go to your repo → Settings → Secrets and variables → Actions → New repository secret

Name: `SLACK_BOT_TOKEN`  
Value: your `xoxb-...` token

---

### 4. Customize Your Message and Game List

Edit the `board-game-reminder.js` file:
- ✍️ Add or change casual messages
- 🎮 Modify the `boardGames` array

---

### 5. Schedule (Already Configured)

The GitHub Action is preconfigured to run:

```
cron: '0 7 * * 4'  # Every Thursday at 5PM Melbourne time (AEST/UTC+10)
```

You can manually trigger it too via GitHub Actions → "Run workflow"

---

## 📁 File Structure

```
📦 board-game-slack-reminder
├── board-game-reminder.js       # The main script
├── package.json                 # Slack SDK dependency
└── .github/
    └── workflows/
        └── slack-reminder.yml  # GitHub Actions workflow
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
