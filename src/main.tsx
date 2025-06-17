import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ChatProvider } from './contexts/ChatContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChatProvider>
  </StrictMode>,
)
