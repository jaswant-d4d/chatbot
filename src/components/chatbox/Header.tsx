import { useChat } from "@/contexts/ChatContext";
import ChatIcon from '/images/chat-icon-transparent.png'
import { useAuth } from "@/contexts/AuthContext";


const Header = () => {
    const { page, messages, setPage, setChatVisible, setRegisterOpen, setClearModalOpen } = useChat();
    const { isAuthenticated } = useAuth();

    const clearConversationHandler = () => {
        if (!isAuthenticated) {
            setRegisterOpen(false)
        }
        if (messages?.length > 0) {
            setClearModalOpen(true)
        } else {
            setChatVisible(false);
            setPage('home')
        }
    }

    const minimizeHandler = () => {
        if (!isAuthenticated) {
            setRegisterOpen(false)
        }
        setChatVisible(false);
        setPage('home')
    }

    return (
        <>
            {/* Header */}
            <div className="bg-blue-500 p-2 sm:p-4 absolute left-0 right-0 top-0">
                <div className='text-white flex justify-between items-center '>
                    <div className='flex items-center space-x-1'>
                        {page === "chat" && (
                            <button
                                className="bg-trasnparent cursor-pointer flex items-center justify-center"
                                aria-label="Go back"
                                title="Go back"
                                onClick={() => setPage("home")}
                            >
                                <svg className="size-5 sm:size-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                </svg>
                            </button>
                        )}
                        <img src={ChatIcon} alt='Bot Avatar' className='w-10 h-full object-contain' />
                        <h3 className="text-lg font-semibold ">Chatbot</h3>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={minimizeHandler}
                            className=" flex items-center justify-center rounded cursor-pointer hover:scale-110 transition-all duration-300  focus:outline-none focus:ring"
                            aria-label="Minimize Chat"
                            title="Minimize"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" className="size-4 sm:size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /></svg>
                        </button>

                        <button
                            type="button"
                            onClick={clearConversationHandler}
                            className=" flex items-center justify-center rounded cursor-pointer hover:scale-110 transition-all duration-300 focus:outline-none focus:ring"
                            aria-label="End Chat"
                            title="End Chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" className="size-4 sm:size-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                    </div>

                </div>
                <div className="my-10 hidden">
                    <div className=' '>
                        <h2 className="flex items-center gap-2 mb-4">
                            <span className="text-white font-semibold text-3xl">Hi there!
                            </span>
                            <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png" className="w-8 h-full" alt="👋" />
                        </h2>
                        <p className="text-white text-md">How can we help you? </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
