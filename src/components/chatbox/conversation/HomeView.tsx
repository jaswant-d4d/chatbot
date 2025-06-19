import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { topics, knowledgeBase, type TopicKey } from "@/data/chatbot/KnowledgeBase";

interface MessageType {
    sender: string
    message: string
    timestamp?: string
}

const HomeView = () => {
    const { isAuthenticated } = useAuth();
    const { setPage, setBotTyping, setMessages, setRegisterOpen } = useChat();

    const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
    const [step, setStep] = useState("select_topic");

    const handleTopicSelect = (topic: TopicKey) => {
        setSelectedTopic(topic);
        setStep("selected_topic");
    };

    const handleQuestionClick = (ques: string, ans: string) => {
        const userMessage: MessageType = { sender: "user", message: ques, timestamp: new Date().toISOString() };
        const botMessage: MessageType = { sender: "bot", message: ans, timestamp: new Date().toISOString() };

        // Step 1: Add user message instantly
        setMessages((prev: MessageType[]) => [...prev, userMessage]);

        // Step 2: Show bot typing after small delay
        setTimeout(() => {
            setBotTyping(true);

            // Step 3: Add bot message after delay
            setTimeout(() => {
                setMessages((prev: MessageType[]) => [...prev, botMessage]);
                setBotTyping(false);
            }, 1000);
        }, 300);
        setPage("chat");

    };

    const handleResetConversation = () => {
        setStep("select_topic");
        setSelectedTopic(null);
    };

    return (
        <>
            <div className="p-4 space-y-4  scrollbar-hide overflow-auto overscroll-none">

                {/* Greeting */}
                {step === "select_topic" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        {/* <div className="bot-message ">
                        <h3 className=' font-semibold text-xl '>👋 Hi there! <br/> </h3>
                        <p className='mb-8 font-semibold text-xl '>Welcome to Digital4Design. <br/> </p>
                        <p className='mb-4 font-medium'>💬 How can we assist you today?</p>

                    </div> */}
                        <div className="bot-message bg-blue-50 rounded-lg p-3 sm:p-6 ">
                            <h3 className="text-xl font-bold text-gray-800 leading-snug mb-2">👋 Hi there!</h3>
                            <p className="text-sm sm:text-md font-semibold text-gray-900 mb-6">Welcome to <span className="text-blue-500">Digital4Design</span>.</p>
                            <div className="flex items-center gap-2 text-gray-700 text-base mb-6">
                                <span className="text-sm">💬</span>
                                <p className="text-xs sm:text-sm">How can we assist you today?</p>
                            </div>
                        </div>
                        <div className="grid gap-3 py-4 ">
                            {topics.map((topic) => (
                                <React.Fragment key={topic.key}>
                                    <button
                                        key={topic.key}
                                        onClick={() => handleTopicSelect(topic.key)}
                                        className="bg-blue-50 text-xs sm:text-sm border px-2 sm:px-4 py-2 rounded-lg border-gray-400 shadow-md cursor-pointer hover:bg-blue-100 "
                                    >
                                        {topic.label}
                                    </button>
                                </React.Fragment>
                            ))}

                        </div>
                    </motion.div>
                )}
                {/* Common Questions */}
                {step === "selected_topic" && selectedTopic && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        <div className="bot-message my-4">
                            <div className="space-y-3 mt-2">
                                {knowledgeBase[selectedTopic].map((item, i) => (
                                    <button
                                        key={`topic-${i}`}
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                setRegisterOpen(true)
                                                return false
                                            }
                                            handleQuestionClick(item.question, item.answer)
                                            setPage("chat")
                                        }}
                                        className="bg-blue-50 text-xs sm:text-sm border rounded-lg text-left px-2 sm:px-4 py-2 border-gray-400 cursor-pointer shadow-md hover:bg-blue-100"
                                    >
                                        {item.question}
                                    </button>
                                ))}
                                <button
                                    onClick={handleResetConversation}
                                    className="w-full text-blue-500 text-xs sm:text-sm text-center mt-2 flex justify-center items-center cursor-pointer hover:underline"
                                >
                                    <svg className="text-blue-500 size-4 sm:size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g>
                                    </svg>
                                    Back to Topics
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default HomeView;