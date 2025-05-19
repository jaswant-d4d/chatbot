import React, { useState } from 'react'
import Chatbox from '@/components/chat/Chatbox'

const geminiResponse = "```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello World</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>This is a simple HTML document.</p>\n</body>\n</html>\n```\n\n**Explanation:**\n\n*   **`<!DOCTYPE html>`:**  Tells the browser that this is an HTML5 document.\n*   **`<html>`:**  The root element of the page.  All other HTML elements are contained within this.\n*   **`<head>`:**  Contains metadata about the HTML document, such as the title (which appears in the browser tab).  It's not displayed in the main content area.\n*   **`<title>Hello World</title>`:** Sets the title of the browser tab.\n*   **`<body>`:**  Contains the content of the HTML document that will be visible to the user.\n*   **`<h1>Hello World!</h1>`:**  A heading (the most important level heading).  `h1` to `h6` are heading levels.\n*   **`<p>This is a simple HTML document.</p>`:**  A paragraph of text.\n\n**How to use this code:**\n\n1.  **Open a text editor:** (Notepad, Sublime Text, VS Code, etc.)\n2.  **Copy and paste** the code into the text editor.\n3.  **Save the file** as `index.html` (or any name you like, but make sure the extension is `.html`).\n4.  **Open the file in a web browser:**  Find the `index.html` file on your computer and double-click it.  Your web browser should open and display \"Hello World!\" on the page.\n"
const Home = () => {
  const [chatBoxVisible, setChatBoxVisible] = useState(false);

  const GeminiReply = (reply: string) => {
    // Match ```html ... ``` block
    const match = reply?.match(/```html\n([\s\S]*?)```/);

    const code = match ? match[1] : null;
    const explanation = reply?.replace(/```html[\s\S]*?```/, "").trim();

    return (
      <div className="space-y-4 bg-gray-100 p-4 rounded">
        {code && (
          <pre className="bg-black text-green-200 p-4 rounded overflow-auto">
            <code>{code}</code>
          </pre> 
        )}
        <p className="text-gray-800 whitespace-pre-line">{explanation}</p>
      </div>
    );
  };

  
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