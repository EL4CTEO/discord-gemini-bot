# Discord Gemini Bot

Bot Discord powered by **Google Gemini 2.5 Lite** - Conversazioni intelligenti gratuite!

## 🚀 Caratteristiche

- ✨ Powered by Google Gemini 2.5 Lite (GRATIS)
- 💬 Memoria conversazionale per ogni canale
- 🔄 Supporto menzioni e DM
- 📝 Gestione messaggi lunghi automatica
- ⚡ Risposte rapide e intelligenti

## 📋 Prerequisiti

- Node.js (v16 o superiore)
- Account Discord
- Google Gemini API Key (gratuita)

## 🛠️ Installazione

1. **Clona il repository**
```bash
git clone https://github.com/EL4CTEO/discord-gemini-bot.git
cd discord-gemini-bot
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Configura le variabili d'ambiente**
```bash
cp .env.example .env
```

Modifica il file `.env` con le tue credenziali:
- `DISCORD_TOKEN`: Token del bot Discord
- `GEMINI_API_KEY`: API Key di Google Gemini

## 🔑 Ottieni le credenziali

### Discord Bot Token

1. Vai su [Discord Developer Portal](https://discord.com/developers/applications)
2. Crea una nuova applicazione
3. Vai su "Bot" → "Add Bot"
4. Copia il Token
5. Abilita "MESSAGE CONTENT INTENT" in "Privileged Gateway Intents"
6. Invita il bot: `https://discord.com/api/oauth2/authorize?client_id=TUO_CLIENT_ID&permissions=2048&scope=bot`

### Google Gemini API Key (GRATUITA)

1. Vai su [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Clicca "Create API Key"
3. Copia la chiave
4. **Limite gratuito**: 60 richieste/minuto

## ▶️ Avvio

```bash
npm start
```

## 💬 Utilizzo

- **Menziona il bot**: `@NomeBot ciao come stai?`
- **Solo ping**: `@NomeBot` → Riceverai un messaggio di benvenuto
- **DM**: Scrivi direttamente al bot in privato

## 🧠 Funzionalità

- **Memoria conversazionale**: Il bot ricorda gli ultimi 20 messaggi per canale
- **Risposte lunghe**: Divide automaticamente messaggi oltre i 2000 caratteri
- **Typing indicator**: Mostra quando il bot sta "scrivendo"

## 📁 Struttura

```
discord-gemini-bot/
├── index.js           # Codice principale
├── package.json       # Dipendenze
├── .env.example       # Template variabili
├── .env              # Le tue credenziali (non committare!)
└── README.md         # Questa guida
```

## 🐛 Troubleshooting

**Errore: Invalid token**
- Verifica che il token Discord sia corretto in `.env`

**Errore: Missing Access**
- Abilita "MESSAGE CONTENT INTENT" nel Developer Portal

**Errore API Gemini**
- Verifica la validità dell'API Key
- Controlla di non aver superato il rate limit (60/min)

## 📝 Note

- Google Gemini è **completamente gratuito** (fino a 60 req/min)
- Ogni canale ha la propria conversazione indipendente
- Il bot risponde solo quando menzionato o in DM

## 📄 Licenza

MIT License - Sentiti libero di modificare e distribuire!

## 🤝 Contributi

Pull request benvenute! Per cambiamenti importanti, apri prima un issue.

## ⭐ Supporto

Se questo progetto ti è stato utile, lascia una stella! ⭐
