# 🎲 Board Game Slack Reminder Bot

A lightweight Slack bot that sends a fun, randomized message to a Slack channel every **Thursday at 5PM (Melbourne Time)** to remind your team about **Board Game Friday** 🎉

Includes:
- Randomized casual and funny reminder messages
- Randomly picks 2 games from a custom game list
- Runs fully automated using **GitHub Actions**

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
