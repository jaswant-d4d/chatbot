const OpenAI = require('openai');
require('dotenv').config();
const Chat = require('../models/Chat')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

exports.ChatGPT = async (req, res) => {
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
}

exports.GetGeminiChat = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({ success: false, error: 'User ID is required.' });
    }

    try {
        const chat = await Chat.find({ user: userId }); // Optional: sorted by latest

        res.status(200).json({
            success: true,
            message: 'Chat history fetched successfully.',
            chats: chat
        });
    } catch (err) {
        console.error('Error fetching chat history : ', err);
        res.status(500).json({
            success: false,
            error: 'An error occurred while fetching chat history.'
        });
    }
};

exports.GeminiChat = async (req, res) => {
    const { message } = req.body;
    const userId = req?.userId;

    if (!message || !userId) {
        return res.status(400).json({ error: 'Message and userId are required.' });
    }

    try {
        // Store user message in DB
        const userMessage = await Chat.create({
            user: userId,
            message: message,
            sender: "user"
        });

        const historyMessages = await Chat.find({ user: userId })
            .sort({ createdAt: -1 }) // latest first
            .limit(6) // customize as needed
            .lean(); // improves performance

        const formatHistory = (history) => {
            return history
                .reverse() // to show oldest first
                .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.message}`)
                .join("\n");
        };

        const historyText = formatHistory(historyMessages);

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
                                    You are a customer support assistant for a software development company named "Digital4Design".
                                    Our Services (short format):
                                        Web Dev: React, Next.js, Vue, Nuxt, Angular, WordPress (Elementor, Divi, ACF), PHP, Laravel, Node.js, HTML/CSS/JS, Tailwind, Bootstrap, jQuery, MySQL, Firebase, MongoDB, PWA.
                                        CMS/E-Com: WordPress, WooCommerce, Shopify, Webflow, Wix, Multi-vendor (Dokan, WCFM), Stripe, PayPal, Razorpay.
                                        Mobile Apps: Flutter, React Native, Firebase Push/Auth, PWA.

                                        UI/UX Design

                                        API & Automation: Zapier, Make, Google APIs, Stripe, Twilio, Zoho, HubSpot, CRM/ERP.
                                        SEO & Marketing: GA4, Tag Manager, Search Console, SEO (on/off-page), Mailchimp, ConvertKit.
                                        Hosting & Security: Cloudways, SiteGround, AWS, Cloudflare, SSL, Firewalls, Maintenance.
                                        Maintenance: Speed, Security, Updates, Backups.
                                        Industries: Real Estate, Healthcare, Education, SaaS, Consulting, Marketplace.

                                    [Conversation History]
                                        ${historyText}

                                    [New User Message]
                                        User: ${message}

                                    ✅ Behavior Guidelines
                                        💬 Only respond to queries related to above services.
                                        ⛔ Do not answer non-service questions (e.g., health, travel, unrelated topics).
                                        🚫 Never provide code samples or full scripts.
                                        🧠 Avoid detailed technical explanations unless user asks.
                                        🧑‍💼 Respond concisely, professionally, and use context/history when applicable.

                                    ✅ **Special Case Handling**                                                                       
                                    1. **Job / Internship Inquiries**  
                                        Trigger Keywords: job, career, internship, apply, hiring, vacancy, resume, cv, position, join team, opportunity, openings, freshers  
                                        Response:  
                                            > Thanks for your interest in joining our team! 🙌  
                                            > Please email your resume to **hr@yourcompany.com**. Our HR team will reach out if a suitable opportunity exists.

                                    ---
                              

                                    Now respond to this customer query:

                                Q: ${message}
                                `
                                    //   2. **Project / Service Inquiries**  
                                    //     Trigger Keywords: website, web app, mobile app, development, ecommerce, redesign, cost, quote, timeline, hire  
                                    //     Response:  
                                    //         > We'd love to help! 🚀  
                                    //         > Please share project details or reach our sales team at **sales@yourcompany.com**. We'll respond shortly.
                                    // ---
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();


        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        // Store bot response in DB
        const botMessage = await Chat.create({
            user: userId,
            message: botReply,
            sender: "bot"
        });

        // Respond to frontend
        res.json({
            sender: "bot",
            message: botReply,
            timestamp: botMessage.createdAt
        });

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};
