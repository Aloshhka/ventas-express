import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import './index.css'
import App from './App.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import Carrito from './pages/Carrito.jsx'
import Checkout from './pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>
)