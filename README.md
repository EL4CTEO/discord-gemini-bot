# Discord Gemini Bot

A chill Discord bot powered by Google Gemini 2.5 Lite. Free AI chats, no BS.

## What's cool about it

- 🤖 Uses Google Gemini 2.5 Flash-Lite (totally FREE)
- 💾 Remembers your convo (last 20 messages per channel)
- 💬 Works with mentions & DMs
- ✂️ Auto-splits long messages
- ⚡ Fast responses with typing indicators
- 📊 1000 requests/day free tier (15 RPM)

## Setup

**Requirements:**
- Node.js v16+
- Discord account
- Google Gemini API key (free)

**Install:**
```bash
git clone https://github.com/EL4CTEO/discord-gemini-bot.git
cd discord-gemini-bot
npm install
cp .env.example .env
```

Edit `.env` with your tokens:
```
DISCORD_TOKEN=your_discord_bot_token
GEMINI_API_KEY=your_gemini_api_key
```

## Getting your tokens

**Discord Bot:**
1. Go to [Discord Dev Portal](https://discord.com/developers/applications)
2. New Application → Bot → Add Bot
3. Copy token
4. Enable "MESSAGE CONTENT INTENT" 
5. Invite: `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=274877908032&scope=bot`

**Gemini API (FREE):**
1. [Get API Key](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy it
4. Free tier: **1000 requests/day, 15/min**

## Run it

```bash
npm start
```

## How to use

- Mention the bot: `@BotName what's good?`
- Just ping: `@BotName` → gets a welcome msg
- DM: message the bot directly

## Features

- **Memory**: keeps last 20 messages per channel
- **Long msgs**: auto-chunks over 2000 chars
- **Typing**: shows "typing..." while thinking

## Troubleshooting

**"Invalid token"** → Check your Discord token in `.env`

**"Missing Access"** → Enable MESSAGE CONTENT INTENT in dev portal

**"Quota exceeded"** → Wait a bit or check [quota limits](https://ai.google.dev/gemini-api/docs/rate-limits)

## Why 2.5 Flash-Lite?

It's the best free model for Discord bots:
- **1000 daily requests** (vs 100 for Pro models)
- **15 requests/minute** (highest in free tier)
- **Super fast**: 392 tokens/sec
- **Cheap AF**: $0.10/M input, $0.40/M output if you go paid

## License

MIT - do whatever you want with it

## Contributing

PRs welcome! Found a bug? Open an issue.

---

Made with ☕ and procrastination
