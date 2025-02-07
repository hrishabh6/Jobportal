import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './lib/ThemeProvider'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Analytics } from '@vercel/analytics/next';

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  
)
