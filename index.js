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
  generationConfig: {
    maxOutputTokens: 1900,
    temperature: 0.9,
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
