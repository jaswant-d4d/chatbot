export type TopicKey = "general_website" | "design_services" | "marketing_growth" | "general_questions";

export interface Greeting {
  message: string;
  options: {
    label: string;
    value: TopicKey;
  }[];
}

export const greeting: Greeting = {
  message: "Hey there! 👋 Welcome to Digital4Design — it’s great to have you here. Whether you’re starting a new website, need expert design and development, or want to grow your online presence, we’re here to help. 😊 What brings you here today?",
  options: [
    { label: "🌐 I need a new website", value: "general_website" },
    { label: "🎨 I’m exploring design/development services", value: "design_services" },
    { label: "📈 I’m looking to boost my business online", value: "marketing_growth" },
    { label: "❓ I just have a quick question", value: "general_questions" }
  ]
};
