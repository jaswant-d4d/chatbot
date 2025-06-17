import Chatbox from '@/components/chatbox'
import ChatIcon from '/images/chat-icon.png'
import { useChat } from '@/contexts/ChatContext';

const Home = () => {
  const { isChatVisible, setChatVisible } = useChat();

  const chatHandler = () => {
    setChatVisible(true);
  }

  return (
    <div>
      {isChatVisible ? (
        <Chatbox />
      ) : (
        <div>
          <button type='button' className='fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-50 transition-all duration-300 shadow-lg  rounded-4xl hover:scale-125' onClick={chatHandler}>
            <img src={ChatIcon} alt="Chat" className='h-14 w-14 rounded-full object-cover shadow-lg hover:scale-105 transition-transform' />
          </button>
        </div>
      )}
    </div>
  )
}
export default Home
