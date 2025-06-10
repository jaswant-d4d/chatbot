import { useState } from 'react'
import Chatbox from '@/components/chat/Chatbox'
import ChatIcon from '/images/chat-icon.png'

const Home = () => {
  const [chatBoxVisible, setChatBoxVisible] = useState(false);

  return (
    <div>
      {chatBoxVisible ? (
        <Chatbox setChatBoxVisible={setChatBoxVisible} />
      ) : (
        <div>
          <button type='button' className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300' onClick={() => setChatBoxVisible(true)}>
            <img src={ChatIcon} alt="Chat" className='h-14 w-14 rounded-full object-cover shadow-lg hover:scale-105 transition-transform' />
          </button>
        </div>
      )}
    </div>
  )
}
export default Home
