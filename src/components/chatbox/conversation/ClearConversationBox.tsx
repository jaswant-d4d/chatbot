import { useChat } from "@/contexts/ChatContext";

const ClearConversationBox = () => {
    const { isClearModalOpen, setPage, setClearModalOpen } = useChat();

    if (!isClearModalOpen) return null;

    const endChatHandler = () => {
        setClearModalOpen(false);
        setPage('home');
    }
    return (
        <div
            id="drawer-swipe2"
            className={`absolute z-40 w-full bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-2xl transition-transform duration-300 ease-in-out 
                ${isClearModalOpen ? "translate-y-0" : "translate-y-full"}`}
            role="dialog"
        >
            <section className="flex flex-col items-center py-4">
                <h3 className="text-center text-md sm:text-lg font-semibold text-slate-900 mb-3">
                    End Chat
                </h3>
                <p className="mb-4 text-sm">
                    Are you sure you want to end chat?
                </p>
                <div className="p-4 flex flex-col w-full">
                    <button
                        type="button"
                        className="w-full text-sm sm:text-xs rounded-md bg-red-400 py-2 mb-3 cursor-pointer font-semibold hover:bg-red-500"
                        onClick={endChatHandler}
                    >
                        End Chat
                    </button>
                    <button
                        type="button"
                        className="w-full text-sm sm:text-xs rounded-md bg-transparent cursor-pointer font-semibold"
                        onClick={() => setClearModalOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ClearConversationBox;
