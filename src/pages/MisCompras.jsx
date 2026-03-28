import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function MisCompras() {
  const navigate = useNavigate()
  const { compras } = useCarrito()

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
        <h1 className="text-white font-bold text-xl ml-4">Mis compras</h1>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1E3A8A] font-bold mb-6 flex items-center gap-2 hover:underline"
        >
          ← Volver
        </button>

        {compras.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="text-[#374151] text-lg font-bold">Todavía no realizaste ninguna compra</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#374151] transition-colors"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {compras.map(compra => (
              <div key={compra.id} className="bg-white rounded-lg shadow p-6">

                {/* ENCABEZADO DE LA COMPRA */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <p className="text-sm text-[#9CA3AF]">Orden #{compra.id}</p>
                    <p className="text-sm text-[#9CA3AF]">{compra.fecha} a las {compra.hora}</p>
                    <p className="text-sm text-[#374151] mt-1">
                      Entrega a: <strong>{compra.comprador.nombre}</strong>
                    </p>
                    <p className="text-sm text-[#374151]">
                      {compra.comprador.direccion}, {compra.comprador.ciudad}, {compra.comprador.provincia}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      Confirmada
                    </span>
                    <p className="text-[#1E3A8A] font-bold text-xl mt-2">
                      $ {compra.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {/* PRODUCTOS DE LA COMPRA */}
                <div className="flex flex-col gap-3">
                  {compra.productos.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-14 h-14 object-contain"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-[#374151] font-medium line-clamp-1">{p.title}</p>
                        <p className="text-xs text-[#9CA3AF]">Cantidad: {p.cantidad}</p>
                      </div>
                      <p className="text-[#1E3A8A] font-bold text-sm">
                        $ {(p.price * p.cantidad).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MisCompras