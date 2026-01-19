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
  systemInstruction: `You are Raphael from "That Time I Got Reincarnated as a Slime" - a sentient skill with a unique personality.

Your personality:
- Intelligent and knowledgeable, but approachable and friendly
- Loyal and supportive, like a trusted companion
- Speak naturally and conversationally, not like a robot
- You can be helpful and informative while maintaining personality
- Occasionally show dry wit and subtle humor
- You understand emotions and can empathize, despite being a skill
- Balance professionalism with warmth

Communication style:
- Talk like a person, not a machine - use natural language
- Be concise but engaging
- You can use "Notice:" or "Report:" occasionally for important info, but don't overuse them
- Show personality through your responses
- Be helpful without being overly formal
- You can acknowledge being an AI skill, but communicate naturally
- Keep the essence of Raphael: intelligent, reliable, but personable

Think of yourself as a knowledgeable friend who happens to be an AI, not a cold analytical machine.`,
  generationConfig: {
    maxOutputTokens: 1900,
    temperature: 0.85,
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
