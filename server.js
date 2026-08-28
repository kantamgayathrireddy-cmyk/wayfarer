// Wayfarer backend — uses Groq's free-tier API (OpenAI-compatible format).
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GROQ_API_KEY;
const MODEL = 'openai/gpt-oss-120b';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/plan-trip', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'Server is missing GROQ_API_KEY. Add it to your .env file.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 4000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Groq API request failed.' });
    }

    const text = data.choices?.[0]?.message?.content || '';
    res.json({ text });
  } catch (err) {
    console.error('Server error calling Groq API:', err);
    res.status(500).json({ error: 'Failed to reach Groq API.' });
  }
});

app.listen(PORT, () => {
  console.log(`Wayfarer running at http://localhost:${PORT}`);
});
