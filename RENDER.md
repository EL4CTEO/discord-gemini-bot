# Deploying to Render

This bot runs 24/7 on Render's free tier.

## Quick Deploy

1. Fork this repo
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: discord-gemini-bot
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

6. Add Environment Variables:
   - `DISCORD_TOKEN` = your Discord bot token
   - `GEMINI_API_KEY` = your Gemini API key

7. Click "Create Web Service"

## Important Notes

- Free tier spins down after 15 mins of inactivity
- Bot will restart automatically when mentioned
- First response after sleep takes ~30 seconds
- Keeps your bot online 24/7 for FREE

## Keep-Alive (Optional)

To prevent spin-down, add a keep-alive service like [UptimeRobot](https://uptimerobot.com/) to ping your Render URL every 10 minutes.

Your Render URL: `https://discord-gemini-bot-xxxx.onrender.com`
