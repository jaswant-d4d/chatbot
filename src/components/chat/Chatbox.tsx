import React, { useEffect, useState, useRef, type FormEvent, type MouseEvent } from 'react'
import { knowledgeBase, type QAItem, type TopicKey } from '@/data/chatbot/KnowledgeBase'
import { greeting } from '@/data/chatbot/Greeting'
import { motion } from "framer-motion";
import Markdown from 'react-markdown'


interface MessageType {
  sender: string
  message: string
  timestamp?: string
}
const conversation: MessageType[] = [
  // {
  //   "sender": "bot",
  //   "message": "Hi there! How can I assist you today?",
  //   "timestamp": "2025-05-13T10:00:00Z"
  // },

]

interface Props {
  setChatBoxVisible: (status: boolean) => void
}

const Chatbox: React.FC<Props> = ({ setChatBoxVisible }) => {
  const [messages, setMessages] = useState(conversation || []);
  const [step, setStep] = useState("greeting"); // greeting, selected_topic, etc.
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const apiUrl = import.meta.env.VITE_BACKEND_LIVE_URL;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewMessage(value)
  }

  const isValidTopic = (value: string): value is TopicKey => {
    return ["general_website", "design_services", "marketing_growth", "general_questions"].includes(value);
  };

  const handleOptionClick = (value: string) => {
    // setMessages((prev: MessageType[]) => [...prev, { sender: "user", message: label }]);
    if (isValidTopic(value)) {
      setSelectedTopic(value);
    }
    setStep("selected_topic");
  };

  const handleQuestionClick = (ques: string, ans: string) => {
    setMessages((prev: MessageType[]) => [
      ...prev,
      { sender: "user", message: ques },
      { sender: "bot", message: ans }
    ]);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement, MouseEvent>, overrideMessage?: string
  ) => {
    e.preventDefault()

    const messageToSend = overrideMessage ?? newMessage;

    if (!messageToSend.trim()) return;

    setLoading(true);

    const messageObj = {
      "sender": "user",
      "message": messageToSend.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev: any) => [...prev, messageObj])

    if (!overrideMessage) setNewMessage("");

    // Api call 
    const response = await fetch(`${apiUrl}/gemini-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: messageToSend })
    })
    const data = await response.json();
    setLoading(false);
    setMessages((prev: any) => [...prev, data])
    // Clear Message Input 
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-x-4 bottom-4 sm:bottom-8 sm:right-8 sm:inset-x-auto z-50 transition-all duration-500">
      <div className='relative w-full sm:w-md rounded-2xl h-[80vh] bg-slate-100 mx-auto sm:ml-auto'>
        <div className='flex flex-col h-full w-full'>

          {/* header */}
          <div className='py-4 px-4 sm:px-8 bg-slate-900 text-white rounded-t-2xl flex justify-between items-center'>
            <div className='flex justify-between items-center'>
              <img src='/images/bot.jfif' alt='Avatar' className='w-10 h-full rounded-full me-2' />
              <p className='text-white text-lg font-semibold '>Chatbot</p>
            </div>
            <button type='button' onClick={() => setChatBoxVisible(false)} className='cursor-pointer'>Close</button>
          </div>

          {/* Greeting */}
          <div className="py-4 px-6 space-y-4 h-[64vh] scrollbar-hide overflow-auto overscroll-none">
            {step === "greeting" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <div className="bot-message">
                  <p className='text-md font-semibold'>{greeting.message}</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {greeting.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionClick(opt.value)}
                        className="bg-white text-sm text-left border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
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
                <div className="bot-message mt-4">
                  <p className='text-md font-semibold'>Here are some common questions:</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {knowledgeBase[selectedTopic as TopicKey].map((item: QAItem, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleQuestionClick(item.question, item.answer)}
                        className="bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded text-sm text-left"
                      >
                        ❓ {item.question}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Converations */}
            {messages?.length > 0 && messages?.map((msg, index) => (
              <React.Fragment key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {msg?.sender === "bot" ? (
                    < div className="flex items-start gap-2">
                      <img
                        src="/images/bot.jfif"
                        alt="Bot Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      <div className="bg-slate-200 text-gray-800 p-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap text-sm text-left w-fit">
                        <Markdown>{msg.message}</Markdown>
                        {/* <p className=" mb-1 text-sm font-medium"><Markdown>{msg.message}</Markdown></p> */}
                      </div>
                    </div >
                  ) : (
                    <div className="flex items-start justify-end gap-3">

                      <div className="bg-blue-100 text-gray-800 p-3 rounded-2xl max-w-[80%] break-words whitespace-pre-wrap text-sm text-left w-fit">
                        <Markdown>{msg.message}</Markdown>
                        {/* <p className="mb-1 text-sm font-medium">{msg.message}</p> */}
                      </div>
                      <img
                        src="/images/avatar.png"
                        alt="User Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
            <div ref={bottomRef} />

            {/* Bot Typing */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="typing-indicator"
              >
                < div className="flex items-center gap-2">

                  <img
                    src="/images/bot.jfif"
                    alt="Bot Avatar"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <span>Typing...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className='px-4 py-3 sm:px-6 absolute bottom-0 left-0 right-0 bg-slate-100 rounded-b-2xl'>
            <form onSubmit={submitHandler}>
              <div className='flex items-center gap-2'>
                <input
                  type="text"
                  name='message'
                  value={newMessage}
                  placeholder="Type a message..."
                  className='flex-1 w-[100px] px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                  onChange={inputHandler}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={` bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ${!loading ? "cursor-pointer" : "cursor-auto"}`}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbox
