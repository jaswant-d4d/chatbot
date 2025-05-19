const express = require('express');
const router = express.Router()
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

router.get('/chatgpt-chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [{ role: 'user', content: 'Hello!' }],
    });
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
})

router.post('/gemini-chat', async (req, res) => {
  const { message } = req.body;
  console.log(message,"message")
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
                      You are a customer support assistant for a software development company named "XYZ Tech Solutions".

                      Our Services:
                      - Website Development (React, Next.js, WordPress)
                        -- PHP Development
                        -- HTML5 Development
                        -- React JS Development
                        -- Progressive Web Apps
                        -- Web Portal Development
                        -- Laravel Development
                        -- Vuejs Development
                        -- CakePHP Development
                        -- NodeJS Development
                        -- JavaScript Development
                      - Mobile App Development (Android/iOS)
                      - UI/UX Design
                      - SEO & Hosting Support
                      - Custom Business Solutions

                      Behavior Guidelines:
                      - Only respond to questions related to the above services.
                      - If the user asks about pricing, payments, or charges, respond with: 
                        "Please contact our team directly for pricing at support@xyztech.com or via phone."
                      - Do not answer questions unrelated to our services (e.g., travel, health, random topics).
                      - **Never provide code examples** or programming scripts in your response.
                      - Avoid long technical breakdowns unless the user explicitly asks.
                      - Keep responses clear, concise, and professional.

                      Now respond to this customer query:


                      Q: ${message}
                      `
              }
            ]
          }
        ]
      })
    });


    const data = await response.json();

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ sender: "bot", message:result,timestamp: new Date().toISOString()  });

  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router