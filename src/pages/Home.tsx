import { useState } from 'react'
import Chatbox from '@/components/chat/Chatbox'

const Home = () => {
  const [chatBoxVisible, setChatBoxVisible] = useState(false);


  return (
    < div className='bg-blue-100 h-[100vh]' >
      {chatBoxVisible ? (
        <Chatbox setChatBoxVisible={setChatBoxVisible} />
      ) : (
        <div>
          <button type='button' className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300' onClick={() => setChatBoxVisible(true)}>
            <img src='/images/chat-icon.png' alt="Chat" className='h-14 w-14 rounded-full object-cover shadow-lg hover:scale-105 transition-transform' />
          </button>
        </div>
      )}
    </div>
  )
}
export default Home
