import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';


interface ChatContextType {
    isRegisterOpen: boolean
    setRegisterOpen: (status: boolean) => void
    isClearModalOpen: boolean
    setClearModalOpen: (status: boolean) => void
    isChatVisible: boolean
    setChatVisible: (status: boolean) => void
    botTyping: boolean
    setBotTyping: (status: boolean) => void
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    page: string;
    setPage: (value: "home" | "chat") => void;
}

interface MessageType {
    sender: string
    message: string
    timestamp?: string
}
const conversation: MessageType[] = [];


const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
    const [isChatVisible, setChatVisible] = useState(false);
    const [isClearModalOpen, setClearModalOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [botTyping, setBotTyping] = useState(false);
    const [page, setPage] = useState<"home" | "chat">("home");

    const [messages, setMessages] = useState<MessageType[]>(conversation || []);

    const apiBaseUrl = import.meta.env.VITE_BACKEND_LIVE_URL;

    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}/get-chat-history`,
                    {
                        method: "GET",
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json'
                        },
                        credentials: "include"
                    }
                );
                const data = await res.json();

                if (res.ok) {
                    setMessages(data.chats);
                }
                else {
                    setMessages([]);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
            }
        };

        getChat();
    }, []);

    return (
        <ChatContext.Provider value={{
            page,
            setPage,
            messages,
            setMessages,
            botTyping,
            setBotTyping,
            isChatVisible,
            setChatVisible,
            isClearModalOpen,
            setClearModalOpen,
            isRegisterOpen,
            setRegisterOpen,
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}