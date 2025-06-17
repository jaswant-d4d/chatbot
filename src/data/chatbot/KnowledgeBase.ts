export type TopicKey = 'hiring' | 'services' | 'project';

export const topics: { key: TopicKey; label: string }[] = [
  { key: 'hiring', label: 'Hiring / Careers' },
  { key: 'services', label: 'Our Services' },
  { key: 'project', label: 'Project Inquiry' },
];

export const knowledgeBase: Record<string, { question: string; answer: string }[]> = {
  hiring: [
    {
      question: "Are there any current job openings?",
      answer: "Thanks for your interest! 🙌 Please send your resume to **hr@digital4design.com**. Our HR team will review and get back to you if there’s a suitable opening."
    },
    {
      question: "Do you offer internships for freshers?",
      answer: "Yes, we do offer internships. Kindly send your resume and area of interest to **hr@digital4design.com**. We'll reach out if your profile matches."
    },
    {
      question: "Can I apply as a remote freelancer?",
      answer: "Yes, we welcome talented freelancers. Please email your portfolio and CV to **hr@digital4design.com**."
    },
    {
      question: "What’s the hiring process like?",
      answer: "Our process includes an initial resume screening, a technical round, and a final HR interview. You'll be notified at each step."
    }
  ],

  services: [
    {
      question: "What technologies do you work with?",
      answer: "We specialize in Web & Mobile Development (React, Next.js, Flutter), CMS (WordPress, Shopify), Automation, SEO, and more."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely! We offer complete redesign services to improve UX/UI, performance, and SEO. Please share your current site URL to get started."
    },
    {
      question: "Do you provide ongoing support & maintenance?",
      answer: "Yes, we provide ongoing maintenance plans covering updates, security, backups, and performance optimization."
    },
    {
      question: "Can I integrate payment gateways in my app?",
      answer: "Yes, we support integration with Stripe, PayPal, Razorpay, and other major gateways depending on your business needs."
    }
  ],

  project: [
    {
      question: "How do I start a new project with your team?",
      answer: "We’d love to help! 🚀 Please share your project idea here or email us at **sales@digital4design.com**. Our team will follow up shortly."
    },
    {
      question: "What’s your average project timeline?",
      answer: "Timelines vary based on scope. Simple sites take 2–3 weeks, while complex platforms may take 6–12 weeks. Contact us for an estimate."
    },
    {
      question: "What’s the cost for a mobile app or website?",
      answer: "Pricing depends on features, complexity, and integrations. Please share your requirements for a custom quote at **sales@digital4design.com**."
    },
    {
      question: "Do you sign NDAs for projects?",
      answer: "Yes, we sign NDAs to ensure confidentiality before project discussions."
    }
  ]
};
