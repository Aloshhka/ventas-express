import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const navigate = useNavigate()
  const { carrito, quitarDelCarrito, cambiarCantidad, totalPrecio } = useCarrito()

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
        <h1 className="text-white font-bold text-xl ml-4">Mi carrito</h1>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1E3A8A] font-bold mb-6 flex items-center gap-2 hover:underline"
        >
          ← Volver
        </button>

        {carrito.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-[#374151] text-lg font-bold">Tu carrito está vacío</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#374151] transition-colors"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {carrito.map(producto => (
              <div key={producto.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                <img
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1">
                  <p className="text-[#374151] font-medium line-clamp-2">{producto.title}</p>
                  <p className="text-[#1E3A8A] font-bold text-lg">$ {producto.price.toLocaleString('es-AR')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}
                    className="w-8 h-8 bg-[#F3F4F6] rounded-full font-bold text-[#374151] hover:bg-[#E5E7EB] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold">{producto.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}
                    className="w-8 h-8 bg-[#F3F4F6] rounded-full font-bold text-[#374151] hover:bg-[#E5E7EB] transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => quitarDelCarrito(producto.id)}
                  className="text-red-400 hover:text-red-600 font-bold text-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* TOTAL */}
            <div className="bg-white rounded-lg shadow p-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#374151] font-bold text-lg">Total:</span>
                <span className="text-[#1E3A8A] font-bold text-2xl">
                  $ {totalPrecio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#374151] transition-colors">
                Finalizar compra
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Carrito