const fs = require('fs');

function validateAndSaveSession(sessionString) {
  try {
    if (!sessionString.trim().startsWith('exton')) {
      console.log('❌ Invalid session: must start with "exton"');
      return;
    }

    const jsonPart = sessionString.trim().slice(5);
    const sessionData = JSON.parse(jsonPart);
    fs.writeFileSync('./session/session.json', JSON.stringify(sessionData, null, 2));
    console.log('✅ Session saved.');
  } catch (err) {
    console.error('❌ Failed to save session:', err.message);
  }
}

module.exports = { validateAndSaveSession };