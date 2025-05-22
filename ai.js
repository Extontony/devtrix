const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function aiReply(prompt) {
  try {
    const res = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      }
    });

    return res.data.choices[0].text.trim();
  } catch (err) {
    console.error('AI error:', err.message);
    return '⚠️ AI response failed.';
  }
}

module.exports = { aiReply };
