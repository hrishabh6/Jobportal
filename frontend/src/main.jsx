import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './lib/ThemeProvider'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
    <App/>
    <Toaster/>
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
