
import { useEffect, useRef } from "react";

import { useChat } from "@/contexts/ChatContext";
import { motion } from "framer-motion";

import ChatView from "./ChatView";
import HomeView from "./HomeView";



const Conversation = () => {
    const { botTyping, messages, page, setPage } = useChat();

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, botTyping]);

    return (
        <>
            <div className="p-4 space-y-4 h-[64vh] scrollbar-hide overflow-auto overscroll-none">
                {page === "home" && (<HomeView />)}
                {page === "chat" && (<ChatView />)}
                <div ref={bottomRef} />
            </div>

            {page === "home" && (
                <div className="px-4 py-4 absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-evenly items-center gap-2"
                    >
                        {/* Home Button */}
                        <button className="px-6 py-2 flex flex-col items-center group" onClick={() => setPage("home")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className={`rounded-full p-1 transition
                                ${page === "home"
                                        ? "bg-blue-500 text-white"
                                        : "text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"}`}
                                fill="currentColor"
                            >
                                <path d="M 12 2.1 L 1 12 H 4 V 21 H 11 V 15 H 13 V 21 H 20 V 12 H 23 L 12 2.1 Z M 12 4.79 L 18 10.19 V 11 V 19 H 15 V 13 H 9 V 19 H 6 V 10.19 L 12 4.79 Z" />
                            </svg>
                            <span
                                className={`mt-1 text-sm font-medium transition
                                ${page === "home"
                                        ? "text-blue-600 font-bold"
                                        : "text-gray-600 group-hover:text-blue-600 group-hover:font-bold"}`}
                            >
                                Home
                            </span>
                        </button>

                        {/* Chat Button */}
                        <button className="px-6 py-2 flex flex-col items-center group" onClick={() => setPage("chat")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                                className={`rounded-full p-1 transition text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600`}
                                fill="currentColor"
                            >
                                <path d="M 16 3 C 12.21 3 8.77 4.11 6.22 5.98 C 3.67 7.84 2 10.51 2 13.5 C 2 17.13 4.47 20.2 8 22.05 V 29 L 14.75 23.94 C 15.16 23.97 15.57 24 16 24 C 19.79 24 23.23 22.89 25.78 21.03 C 28.33 19.16 30 16.49 30 13.5 C 30 10.51 28.33 7.84 25.78 5.98 C 23.23 4.11 19.79 3 16 3 Z M 16 5 C 19.39 5 22.45 6.02 24.6 7.59 C 26.76 9.16 28 11.25 28 13.5 C 28 15.75 26.76 17.84 24.6 19.41 C 22.45 20.98 19.39 22 16 22 C 15.51 22 15.02 21.97 14.52 21.93 L 14.14 21.89 L 10 25 V 20.86 L 9.42 20.59 C 6.07 19.02 4 16.39 4 13.5 C 4 11.25 5.24 9.16 7.4 7.59 C 9.55 6.02 12.61 5 16 5 Z" />
                            </svg>
                            <span
                                className={`mt-1 text-sm font-medium transition text-gray-600 group-hover:text-blue-600 group-hover:font-bold`}
                            >
                                Chat
                            </span>
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    )
}

export default Conversation