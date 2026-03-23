import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProducto(data)
      } catch (e) {
        console.error(e)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) return (
    <div className="text-center mt-20">
      <p className="text-[#1E3A8A] text-xl font-bold">Cargando producto...</p>
    </div>
  )

  if (!producto) return (
    <div className="text-center mt-20">
      <p className="text-red-500">Producto no encontrado.</p>
    </div>
  )

  return (
    <div className="font-sans min-h-screen bg-[#F3F4F6]">

      {/* HEADER */}
      <header className="bg-[#1E3A8A] px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-[#374151] rounded-full w-10 h-10 flex items-center justify-center text-xl">⚡</div>
          <div className="leading-tight">
            <div className="text-white font-bold text-base tracking-widest">VENTAS</div>
            <div className="text-[#374151] font-bold text-base tracking-widest bg-white px-1 rounded-sm">EXPRESS</div>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1E3A8A] font-bold mb-6 flex items-center gap-2 hover:underline"
        >
          ← Volver
        </button>

        <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">

          {/* IMAGEN */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={producto.image}
              alt={producto.title}
              className="max-h-80 object-contain"
            />
          </div>

          {/* INFO */}
          <div className="flex-1">
            <span className="text-xs text-[#9CA3AF] uppercase tracking-widest">
              {producto.category}
            </span>
            <h1 className="text-xl font-bold text-[#374151] mt-2 mb-4">
              {producto.title}
            </h1>
            <p className="text-3xl font-bold text-[#1E3A8A] mb-4">
              $ {producto.price.toLocaleString('es-AR')}
            </p>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              {producto.description}
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400">★</span>
              <span className="text-[#374151] font-bold">{producto.rating?.rate}</span>
              <span className="text-[#9CA3AF]">({producto.rating?.count} reseñas)</span>
            </div>
            <button className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#374151] transition-colors">
              Agregar al carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductoDetalle