import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { useChat } from '@/contexts/ChatContext';
import { useFormatDate, useFormatTime } from '@/hooks/useFormatDateTime';
import BotImg from "/images/girl.jpg";
import Markdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';


const ChatView = () => {
    const { user } = useAuth();
    const { botTyping, messages } = useChat();

    const lastDateRef = useRef<string | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50); // small delay to allow DOM update

        return () => clearTimeout(timeout);
    }, [messages, botTyping]);


    return (

        <>
            <div className="p-2 sm:p-4 space-y-4  scrollbar-hide overflow-auto overscroll-none">
                {/* Converations */}
                {messages?.length > 0 && messages?.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    const formattedTime = msg.timestamp ? useFormatTime(msg.timestamp) : '';
                    const currentDate = msg.timestamp ? useFormatDate(msg.timestamp) : '';
                    const todayDate = msg.timestamp ? useFormatDate(new Date()) : '';

                    const isToday = currentDate === todayDate;
                    const showDateDivider = currentDate !== lastDateRef.current;

                    if (showDateDivider) {
                        lastDateRef.current = currentDate; // update the last used date
                    }
                    return (
                        <React.Fragment key={index}>

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                {showDateDivider && currentDate && (
                                    <div className="flex justify-center my-5">
                                        <div className="text-xs text-white bg-gray-500 px-3 py-1 rounded  shadow">
                                            {isToday ? "Today" : currentDate}
                                        </div>
                                    </div>
                                )}
                                <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} `}>
                                    <div className="w-full max-w-[84%] flex flex-col gap-1">
                                        <div className={`flex items-end gap-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                                            {!isUser && (
                                                <img
                                                    src={BotImg}
                                                    alt="Bot Avatar"
                                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shadow-md"
                                                />
                                            )}

                                            <div

                                            >
                                                {/* ? 'bg-[#e1ddde] text-[#1e2939] rounded-br-none' */}
                                                <div className={`p-2 rounded-md shadow max-w-full break-words whitespace-pre-wrap text-xs font-medium leading-4 ${isUser
                                                    ? 'bg-blue-500 text-white rounded-br-none'
                                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                                    }`}>
                                                    <Markdown>{msg.message}</Markdown>
                                                </div>
                                                <span className={`text-[9px] mt-1 font-medium text-gray-500 tracking-normal flex ${isUser ? 'justify-start pr-2' : 'justify-end pl-2'}`}>
                                                    {formattedTime}
                                                </span>
                                            </div>

                                            {isUser && (
                                                <>
                                                    {/* <img
                                                            src={UserImg}
                                                            alt="User Avatar"
                                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shadow-md"
                                                        /> */}
                                                    <span className="min-w-6 min-h-6 sm:min-w-8 sm:min-h-8 bg-sky-100 uppercase font-bold text-slate-900 rounded-full flex justify-center items-center shadow-md"
                                                    >{user?.name ? user?.name?.charAt(0) : "U"}</span>
                                                </>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </React.Fragment>
                    )
                })}

                {/* Bot Typing */}
                {botTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="typing-indicator"
                    >
                        < div className="flex items-center gap-2">

                            <img
                                src={BotImg}
                                alt="Bot Avatar"
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                            />
                            <span>Thinking...</span>
                        </div>
                    </motion.div>
                )}

                <div ref={bottomRef} />
            </div>
        </>
    )
}


export default ChatView