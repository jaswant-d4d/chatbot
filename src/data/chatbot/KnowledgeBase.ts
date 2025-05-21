export interface QAItem {
  question: string;
  answer: string;
}

export type TopicKey = "general_website" | "design_services" | "marketing_growth" | "general_questions" | "custom_web_application" | "mobile_app_development" | "marketplace_website_app" | "digital_marketing" | "project_process_pricing" | "Website_Strategy_Planning" | "website_features_functionality" | "e-commerce_development" | "mobile-first_and_performance" | "support_maintenance_security" | "digital_marketing_analytics";

export type KnowledgeBase = {
  [key in TopicKey]: QAItem[];
};

export const knowledgeBase: KnowledgeBase = {
  "general_website": [
    {
      "question": "I want to create a new website. Where do I start?",
      "answer": "Great! We’ll help you define the purpose, target audience, and features you need. We can handle everything—from design to launch."
    },
    {
      "question": "What platforms do you use to build websites?",
      "answer": "We specialize in WordPress, Shopify, PHP, React, Node.js, and custom-coded solutions depending on your project’s needs."
    }
  ],
  "design_services": [
    {
      "question": "Can you redesign my existing website?",
      "answer": "Absolutely! We start by auditing your current site, understanding your goals, and crafting a modern, high-converting redesign."
    },
    {
      "question": "Will I lose my current content during a redesign?",
      "answer": "No, we carefully migrate your existing content while refreshing the design and improving performance."
    }
  ],
  "general_questions": [
    {
      "question": "Do you work with WordPress?",
      "answer": "Yes! We’ve built hundreds of websites using WordPress—ranging from business sites to e-commerce and custom applications."
    },
    {
      "question": "Can you build with Elementor?",
      "answer": "Definitely! Elementor is one of our preferred page builders for creating beautiful, responsive websites quickly and efficiently."
    },
    {
      "question": "Can you customize WordPress themes and plugins?",
      "answer": "Yes. Whether it’s adjusting theme layouts or extending plugin functionality, we can tailor everything to fit your exact needs."
    }
  ],
  "marketing_growth": [
    {
      "question": "I need a website for my real estate business. Can you help?",
    "answer": "Yes! We build real estate websites with property listings, filters, CRM integrations, and lead capture forms."
    },
    {
      "question": "Can you develop a website for a clinic or healthcare provider?",
      "answer": "Absolutely. We’ve created HIPAA-compliant, SEO-optimized websites for clinics, hospitals, and medical consultants with appointment booking features."
    }
  ],
  "custom_web_application": [
    {
      "question": "Can you build a custom web application for my business?",
      "answer": "Yes, we can build scalable, secure, and user-friendly web apps tailored to your workflow—whether it’s CRM, dashboards, or booking systems"
    },
    {
      "question": "What technologies do you use for web apps?",
      "answer": "We use Laravel, React, Node.js, or custom PHP depending on the project scope and performance needs."
    }
  ],
  "marketplace_website_app": [
    {
      "question": "Can you build a custom web application for my business?",
      "answer": "Yes, we can build scalable, secure, and user-friendly web apps tailored to your workflow—whether it’s CRM, dashboards, or booking systems"
    },
    {
      "question": "What technologies do you use for web apps?",
      "answer": "We use Laravel, React, Node.js, or custom PHP depending on the project scope and performance needs."
    }
  ],
  "mobile_app_development": [
    {
      "question": "Do you develop mobile apps too?",
      "answer": "Yes! We develop both iOS and Android apps—native or hybrid—tailored to your business goals."
    },
    {
      "question": "Can you turn my website into a mobile app?",
      "answer": "Definitely. We can convert your site into a fast, mobile-friendly app while adding push notifications and offline access."
    }
  ],
  "digital_marketing": [
    {
      "question": "Do you offer digital marketing services too?",
      "answer": "Yes! From SEO and Google Ads to social media marketing and email automation—we’ve got you covered."
    },
    {
      "question": "Can you help my website rank on Google?",
      "answer": "Absolutely! We optimize your site’s speed, structure, and content to improve organic rankings and increase visibility."
    },
    {
      "question": "Do you run paid ad campaigns?",
      "answer": "Yes, we manage Google, Facebook, and Instagram ads for e-commerce, service businesses, and local companies."
    }
  ],
  "project_process_pricing": [
    {
      "question": "How long will it take to build my website or app?",
      "answer": "Timelines vary based on complexity, but most websites are completed in 2–4 weeks, and apps in 4–8 weeks."
    },
    {
      "question": "How much does it cost to work with you?",
      "answer": "Costs depend on your project requirements. Share some details, and we’ll get back to you with a free quote!"
    },
  ],
  "Website_Strategy_Planning": [
    {
      "question": "What information do you need to start my website project?",
      "answer": "We typically need your business goals, preferred design styles, competitor references, and the features you’d like included."
    },
    {
      "question": "Can you help me choose the right platform for my site?",
      "answer": "Yes! We’ll guide you based on your budget, scalability needs, and long-term goals—whether WordPress, Shopify, or a custom build."
    },
    {
      "question": "Will you help me write the content too?",
      "answer": "Yes, we offer copywriting services to create SEO-friendly, brand-aligned content for your website."
    },
    {
      "question": "Do you offer branding or logo design?",
      "answer": "Absolutely! We provide complete branding services including logos, style guides, and visual identities."
    },
  ],
  "website_features_functionality": [
    {
      "question": "Can you integrate third-party tools like HubSpot, Mailchimp, or CRMs?",
      "answer": "Yes! We integrate all major CRMs, email platforms, and automation tools to streamline your business workflows."
    },
    {
      "question": "I need booking functionality. Can you do that?",
      "answer": "Definitely. We can add appointment booking systems with calendar sync, reminders, and admin controls."
    },
    {
      "question": "Can you add multi-language support to my site?",
      "answer": "Yes, we can build multilingual sites using tools like WPML, Weglot, or custom solutions."
    },
    {
      "question": "Will my site be GDPR or HIPAA compliant?",
      "answer": "Yes. We follow best practices and compliance requirements depending on your industry and region."
    },
  ],
  "e-commerce_development": [
    {
      "question": "Can I sell products or services through the site?",
      "answer": "Absolutely. We build full e-commerce websites using WooCommerce or Shopify with secure payment options."
    },
    {
      "question": "Can I manage inventory and orders easily?",
      "answer": "Yes. We set up user-friendly dashboards where you can manage products, inventory, orders, and customers."
    },
    {
      "question": "Do you offer product import or migration services?",
      "answer": "Yes. We can migrate your products and data from Excel, CSV, or other platforms like Wix or Magento."
    },
  ],
  "mobile-first_and_performance": [
    {
      "question": "Will my website work well on mobile?",
      "answer": "100%! Every site we build is fully responsive and tested across all devices and screen sizes."
    },
    {
      "question": "Can you optimize my current site for speed?",
      "answer": "Yes. We optimize images, scripts, and server settings to boost your site’s load time and performance score."
    },
    {
      "question": "Do you offer AMP or progressive web apps (PWA)?",
      "answer": "Yes, we can implement AMP for blogs or convert your site into a PWA for mobile-like experience and offline use."
    },
  ],
  "support_maintenance_security": [
    {
      "question": "Do you offer website maintenance after launch?",
      "answer": "Yes! Our maintenance plans include updates, backups, uptime monitoring, and emergency support."
    },
    {
      "question": "How do you handle website security?",
      "answer": "We implement firewalls, SSL certificates, malware scanning, and regular updates to keep your site secure."
    },
    {
      "question": "What happens if something breaks after the website is live?",
      "answer": "We offer support and warranty periods. If you’re on a maintenance plan, we’ll fix issues immediately."
    },
  ],
  "digital_marketing_analytics": [
    {
      "question": "Will my website be SEO-friendly?",
      "answer": "Yes! We structure sites for SEO from the ground up and can also provide advanced on-page/off-page SEO packages."
    },
    {
      "question": "Can you set up Google Analytics and tracking?",
      "answer": "Yes, we install and configure Google Analytics, GA4, Facebook Pixel, and other tracking tools for insights."
    },
    {
      "question": "Do you create landing pages for ad campaigns?",
      "answer": "Definitely! We build high-converting, fast-loading landing pages tailored for Google Ads or social media campaigns."
    },
  ],
}
