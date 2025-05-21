const OpenAI = require('openai');
require('dotenv').config();

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

exports.GeminiChat = async (req, res) => {
    const { message } = req.body;
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
                     You are a customer support assistant for a software development company named "Digital4Design".

                        Our Services:
                        - Website Development
                        -- React.js, Next.js, Vue.js, Nuxt.js, Angular.js
                        -- WordPress (Elementor, Gutenberg, WPBakery, ACF, Divi)
                        -- PHP, Laravel, CakePHP, Node.js (Express.js)
                        -- HTML5, CSS3, JavaScript (ES6+)
                        -- Bootstrap, Tailwind CSS, jQuery (legacy support)
                        -- MySQL, PostgreSQL, Firebase, MongoDB
                        -- Web Portal Development, PWA (Progressive Web Apps)
                        - CMS & E-Commerce Platforms
                        -- WordPress, WooCommerce, Shopify, Webflow, Wix, Craft CMS
                        -- Multi-vendor setups (Dokan, WCFM, Webkul)
                        -- Payment gateway integration: Stripe, PayPal, Razorpay, Shopify Payments
                        - Mobile App Development
                        -- Flutter (Android/iOS)
                        -- React Native
                        -- Firebase Auth & Push Notifications
                        -- PWA & basic admin panels
                        - UI/UX Design
                        - API Integrations & Automations
                        -- Zapier, Make (Integromat)
                        -- Google APIs (Maps, Sheets), Stripe, Twilio, Calendly, HubSpot, Zoho
                        -- CRM, ERP, Lead Routing, Custom Workflows
                        - SEO & Marketing
                        -- Google Analytics, GA4, Tag Manager, Search Console
                        -- On-Page & Off-Page SEO, Local SEO, Technical SEO
                        -- Email Marketing: Mailchimp, ConvertKit
                        - Hosting, DevOps, Security
                        -- Cloudways, SiteGround, Hostinger, GoDaddy, AWS
                        -- CDN: Cloudflare, BunnyCDN
                        -- SSL, Firewalls (Wordfence, Sucuri), Malware Removal
                        -- Regular Backups, Site Maintenance
                        - Website Maintenance & Support
                        -- Plugin/theme updates, Security patches, Speed optimization
                        - Industry-Specific Solutions
                        -- Real Estate, Healthcare, Education, SaaS, Consulting, Marketplace

                        Behavior Guidelines:
                        - Only respond to questions related to the above services.
                
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

        res.json({ sender: "bot", message: result, timestamp: new Date().toISOString() });

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};
