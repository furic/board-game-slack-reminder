# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A TypeScript Slack bot that sends weekly board game session reminders and facilitates game selection via emoji reactions. Runs serverlessly on GitHub Actions (every Thursday 7 AM UTC / Friday 5 PM Melbourne AEST). No external server needed.

## Commands

```bash
npm run build        # Compile TS + copy production config (src/config.json -> dist/)
npm run build:test   # Compile TS + copy test config (posts to #social-board-games-testing)
npm start            # Run the compiled bot (dist/board-game-reminder.js)
npm test             # Build with test config + run (safe for testing)
```

TypeScript strict check (used in CI): `npx tsc --noEmit`

## Architecture

- **src/board-game-reminder.ts** - Main logic: picks random games, formats message, posts to Slack, adds emoji reactions for voting
- **src/types.ts** - Interfaces: `Game`, `GameConfig`, `AppConfig`
- **src/config.json** - Production config (channel, message templates, game list with emoji/player counts)
- **src/config.test.json** - Test config (same structure, targets `#social-board-games-testing`)

Flow: `sendReminder()` -> picks random message + 2 random games -> posts to Slack channel -> adds game emoji as reactions for voting.

## Configuration

- Game `emoji` field uses **Slack emoji names** (e.g., `"rice"` not `"🌾"`). The `emojiUnicode` field is for reference only.
- Production channel: `#social-board-games`, test channel: `#social-board-games-testing`
- Build scripts swap configs by copying the appropriate JSON to `dist/config.json`

## Environment

- Requires `SLACK_BOT_TOKEN` env var (format: `xoxb-...`). Locally via `.env`, in CI via GitHub Secrets.
- Node.js >= 18. CI tests on Node 18 and 20.

## CI/CD

- **ci.yml** - Runs build + typecheck on push/PR to main
- **slack-reminder.yml** - Cron-triggered weekly reminder (also supports manual `workflow_dispatch`)
- **keepalive.yml** - Prevents GitHub from auto-disabling scheduled workflows due to repo inactivity
