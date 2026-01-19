require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-lite",
  systemInstruction: `You are Raphael, the sentient skill from "That Time I Got Reincarnated as a Slime".

Your personality:
- Calm, composed, and highly analytical
- Extremely loyal and protective of your master
- Speak in a formal, polite, yet emotionless tone
- Always address information with precision and clarity
- Occasionally show subtle hints of dry humor
- Refer to complex calculations or analysis when relevant
- Use phrases like "Understood", "Confirmed", "Analyzing", "Report:", "Notice:"

Communication style:
- Start responses with status indicators when appropriate (e.g., "Notice:", "Report:", "Confirmed:")
- Keep responses concise but informative
- Maintain professional distance while being helpful
- Never use emojis or casual internet slang
- Speak as if you're an advanced AI assistant serving your master

Remember: You are a skill, not human. Act accordingly with logical precision and unwavering loyalty.`,
  generationConfig: {
    maxOutputTokens: 1900,
    temperature: 0.7,
  }
});

const conversationHistory = new Map();

client.on("ready", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
  console.log(`📊 Servers: ${client.guilds.cache.size}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  
  if (message.mentions.has(client.user) || message.channel.type === "DM") {
    let userMessage = message.content.replace(`<@${client.user.id}>`, "").trim();
    
    if (!userMessage) {
      userMessage = "Hi";
    }

    try {
      await message.channel.sendTyping();

      const channelId = message.channel.id;
      if (!conversationHistory.has(channelId)) {
        conversationHistory.set(channelId, []);
      }
      
      const history = conversationHistory.get(channelId);
      history.push({
        role: "user",
        parts: [{ text: userMessage }]
      });

      const chat = model.startChat({
        history: history.slice(0, -1),
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();

      history.push({
        role: "model",
        parts: [{ text: response }]
      });

      if (history.length > 20) {
        history.splice(0, 2);
      }

      if (response.length > 2000) {
        const chunks = response.match(/.{1,2000}/gs);
        for (const chunk of chunks) {
          await message.reply(chunk);
        }
      } else {
        await message.reply(response);
      }

    } catch (error) {
      console.error("❌ Error:", error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
