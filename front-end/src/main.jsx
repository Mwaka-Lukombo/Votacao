import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom'
import { WidthProvider } from './hooks/widthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <WidthProvider>
      <App />
    </WidthProvider>
    </BrowserRouter>
  </StrictMode>,
)
