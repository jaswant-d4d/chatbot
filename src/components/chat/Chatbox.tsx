import React, { useEffect, useState, useRef, type FormEvent } from 'react'

const conversation = [
  {
    "sender": "bot",
    "message": "Hi there! How can I assist you today?",
    "timestamp": "2025-05-13T10:00:00Z"
  }
]

interface Props {
  setChatBoxVisible: (status: boolean) => void
}

const Chatbox: React.FC<Props> = ({ setChatBoxVisible }) => {
  const [messages, setMessages] = useState(conversation || []);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const apiUrl = import.meta.env.VITE_BACKEND_LIVE_URL;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewMessage(value)
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newMessage.trim()) return;

    setLoading(true);

    const messageObj = {
      "sender": "user",
      "message": newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev: any) => [...prev, messageObj])
    // Api call 
    setNewMessage("")
    const response = await fetch(`${apiUrl}/gemini-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newMessage })
    })
    const data = await response.json();

    setLoading(false);
    setMessages((prev: any) => [...prev, data])
    // Clear Message Input 
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container absolute bottom-20 right-20 transform transition-all duration-500 fade-in-out">
      <div className='relative max-w-lg rounded-2xl h-[80vh] bg-slate-100 ml-auto transition-opacity duration-300 ease-in-out opacity-100 transform translate-y-0'>
        <div className='flex flex-col h-full'>
          {/* header */}
          <div className='py-4 px-4 sm:px-8 bg-slate-900 text-white rounded-t-2xl flex justify-between items-center'>
            <div className='flex justify-between items-center'>
              <img src='/images/bot.jfif' alt='Avatar' className='w-10 h-full rounded-full me-2' />
              <p className='text-white text-lg font-semibold '>Chatbot</p>
            </div>
            <button type='button' onClick={() => setChatBoxVisible(false)} className='cursor-pointer'>Close</button>
          </div>
          {/* Converations */}
          <div className="py-4 px-4 sm:px-8 space-y-4 h-[64vh] scrollbar-hide overflow-auto overscroll-none">
            {messages?.length > 0 && messages?.map((msg, index) => (
              <React.Fragment key={index}>
                {msg?.sender === "bot" ? (
                  < div className="flex items-start gap-3">
                    <img
                      src="/images/bot.jfif"
                      alt="Bot Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="bg-slate-200 text-gray-800 p-3 rounded-2xl max-w-[80%]">
                      <p className="mb-1 font-medium">{msg.message}</p>
                    </div>
                  </div >
                ) : (
                  <div className="flex items-start justify-end gap-3">

                    <div className="bg-blue-100 text-gray-800 p-3 rounded-2xl max-w-[80%] text-right">
                      <p className="mb-1 font-medium">{msg.message}</p>
                    </div>
                    <img
                      src="/images/avatar.jpg"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Footer */}
          <div className='absolute bottom-4 left-10 right-10'>
            <form onSubmit={submitHandler}>
              <div className='relative flex justify-center items-center'>
                <input type="text" name='message' value={newMessage} placeholder="Type a message..."
                  className='flex-1 px-4 py-2 me-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' onChange={inputHandler} />
                <button type="submit" disabled={loading} className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ${!loading ? "cursor-pointer" : "cursor-auto"}`}>Send </button>
              </div>
            </form>
          </div>
        </div></div>
    </div>
  )
}

export default Chatbox