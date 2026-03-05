import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext/ThemeContext.jsx'
import { AuthProvider } from './Context/AuthContext/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
