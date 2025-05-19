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
          <button type='button' className='fixed right-10 bottom-10 flex items-end' onClick={() => setChatBoxVisible(true)}>
            <img src='/images/chat-icon.png' alt="Chat" className='h-14 w-full rounded-full object-cover ' />
          </button>
        </div>
      )}
    </div>
  )
}
export default Home