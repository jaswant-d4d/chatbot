import { useAuth } from "@/contexts/AuthContext";
import React, { useState, type FormEvent, type MouseEvent } from "react";
import { useChat } from "@/contexts/ChatContext";

const Footer = () => {

    const { apiBaseUrl, isAuthenticated } = useAuth();
    const { page, setBotTyping, setRegisterOpen, setMessages } = useChat();
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>, overrideMessage?: string) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setRegisterOpen(true)
            return false
        }

        const messageToSend = overrideMessage?.trim() || newMessage.trim();
        if (!messageToSend) return;

        // Add user's message immediately
        const messageObj = {
            "sender": "user",
            "message": messageToSend.trim(),
            timestamp: new Date().toISOString(),
        };

        // Reset input if not an override
        setMessages((prev: any) => [...prev, messageObj])

        // Clear input if not an override
        if (!overrideMessage) setNewMessage("");

        // Set loading and typing state
        setLoading(true);

        setTimeout(() => {
            setBotTyping(true)
        }, 500);
        try {
            const response = await fetch(`${apiBaseUrl}/gemini-chat`,
                {
                    method: 'POST',
                    body: JSON.stringify({ message: messageToSend }),
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    },
                    credentials: "include"
                })
            const botResponse = await response.json();

            // Simulate typing delay before showing response
            setTimeout(() => {
                setMessages((prev: any) => [...prev, botResponse]);
                setLoading(false);
                setBotTyping(false);
            }, 1000);

        } catch (error) {
            setLoading(false);
            setBotTyping(false);
            console.error("Error fetching response:", error);
        }
    }


    if (page !== "chat") return null

    return (
        <>
            {/* Footer */}
            <div className="px-2 sm:px-4 pb-3 absolute bottom-0 left-0 right-0 border-slate-200">
                <form onSubmit={submitHandler} className="relative">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="message"
                            value={newMessage}
                            placeholder="Type your message..."
                            className="w-full py-3  p-2 pr-8 border-t-1 border-slate-300 focus:outline-none text-sm"
                            onChange={inputHandler}
                            autoComplete="off"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading || !newMessage.trim()}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${loading || !newMessage.trim()
                                ? " cursor-not-allowed"
                                : " cursor-pointer"
                                }`}
                            aria-label="Send Message"
                        >
                            {/* {!loading ? ( */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                            {/* ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="min-w-10"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                            )} */}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Footer;