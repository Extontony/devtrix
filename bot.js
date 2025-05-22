
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const { aiReply } = require('./ai');
const { validateAndSaveSession } = require('./sessionLoader');

// Check if session is provided as string (e.g. via env or paste)
const sessionInput = process.env.SESSION_ID;
if (sessionInput) validateAndSaveSession(sessionInput);

const { state, saveState } = useSingleFileAuthState('./session/session.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (text) {
      const replyText = await aiReply(text);
      await sock.sendMessage(msg.key.remoteJid, { text: replyText }, { quoted: msg });
    }
  });

  console.log('[BOT] Started. Scan QR if needed.');
}

startBot();
