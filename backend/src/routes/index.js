const express = require('express');
const router = express.Router();

const { GeminiChat, ChatGPT } = require('../controllers/chat');

router.get('/chatgpt-chat', ChatGPT)

router.post('/gemini-chat', GeminiChat);

router.get("/test", (req, res) => {
  res.json({ message: "Server is working fine!" })
})


module.exports = router