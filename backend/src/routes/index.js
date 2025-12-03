const express = require('express');
const router = express.Router();

const jwtVerify = require('../middleware/jwtVerify');

const { GeminiChat, ChatGPT, GetGeminiChat } = require('../controllers/chat');
const { register, verifyToken } = require('../controllers/user');
const validateWidgetAccess = require('../middleware/validateWidgetAccess');

router.get('/verify-token', verifyToken)

router.post('/register', register)

router.post('/gemini-chat', jwtVerify, GeminiChat);

router.get('/get-chat-history', jwtVerify, GetGeminiChat);

router.get('/chatgpt-chat', ChatGPT)

router.get("/test", (req, res) => {
  res.json({ message: "Server is working fine!" })
})

router.get("/validate-widget", validateWidgetAccess, (req, res) => {
  res.json({ success: true });
});


module.exports = router