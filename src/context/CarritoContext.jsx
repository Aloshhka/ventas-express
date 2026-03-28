import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([])
  const [compras, setCompras] = useState(() => {
    const guardadas = localStorage.getItem('misCompras')
    return guardadas ? JSON.parse(guardadas) : []
  })

  function agregarAlCarrito(producto) {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function quitarDelCarrito(id) {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }

  function cambiarCantidad(id, cantidad) {
    if (cantidad <= 0) {
      quitarDelCarrito(id)
      return
    }
    setCarrito(prev =>
      prev.map(p => p.id === id ? { ...p, cantidad } : p)
    )
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  function guardarCompra(datosComprador) {
    const nuevaCompra = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-AR'),
      hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      productos: carrito,
      total: totalPrecio,
      comprador: datosComprador
    }
    const nuevasCompras = [nuevaCompra, ...compras]
    setCompras(nuevasCompras)
    localStorage.setItem('misCompras', JSON.stringify(nuevasCompras))
  }

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)
  const totalPrecio = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0)

  return (
    <CarritoContext.Provider value={{
      carrito,
      compras,
      agregarAlCarrito,
      quitarDelCarrito,
      cambiarCantidad,
      vaciarCarrito,
      guardarCompra,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}