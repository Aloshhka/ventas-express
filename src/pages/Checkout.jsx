import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Checkout() {
  const navigate = useNavigate()
  const { carrito, totalPrecio, totalItems, vaciarCarrito } = useCarrito()
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

function handleConfirmar(e) {
  e.preventDefault()
  vaciarCarrito()
  setPedidoConfirmado(true)
}

  const formCompleto = Object.values(form).every(v => v.trim() !== '')

  if (pedidoConfirmado) {
    return (
      <div className="font-sans min-h-screen bg-[#F3F4F6]">
        <header className="bg-[#1E3A8A] px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-[#374151] rounded-full w-10 h-10 flex items-center justify-center text-xl">⚡</div>
            <div className="leading-tight">
              <div className="text-white font-bold text-base tracking-widest">VENTAS</div>
              <div className="text-[#374151] font-bold text-base tracking-widest bg-white px-1 rounded-sm">EXPRESS</div>
            </div>
          </div>
        </header>
        <div className="max-w-lg mx-auto mt-20 text-center p-8 bg-white rounded-lg shadow">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">¡Pedido confirmado!</h2>
          <p className="text-[#6B7280] mb-2">Gracias <strong>{form.nombre}</strong>, tu pedido fue recibido.</p>
          <p className="text-[#6B7280] mb-6">Te enviaremos los detalles a <strong>{form.email}</strong></p>
          <div className="bg-[#F3F4F6] rounded-lg p-4 mb-6 text-left">
            <p className="text-[#374151] font-bold mb-2">Resumen del pedido:</p>
            {carrito.map(p => (
              <div key={p.id} className="flex justify-between text-sm text-[#6B7280] mb-1">
                <span className="line-clamp-1 flex-1">{p.title} x{p.cantidad}</span>
                <span className="ml-4 font-bold">$ {(p.price * p.cantidad).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="border-t border-[#E5E7EB] mt-3 pt-3 flex justify-between font-bold text-[#1E3A8A]">
              <span>Total</span>
              <span>$ {totalPrecio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-bold hover:bg-[#374151] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

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
        <h1 className="text-white font-bold text-xl ml-4">Finalizar compra</h1>
      </header>

      <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* FORMULARIO */}
        <div>
          <h2 className="text-[#1E3A8A] font-bold text-xl mb-4">Datos de entrega</h2>
          <form onSubmit={handleConfirmar} className="flex flex-col gap-4">

            <div>
              <label className="text-sm font-bold text-[#374151] mb-1 block">Nombre completo</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#374151] mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@email.com"
                className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#374151] mb-1 block">Teléfono</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="351 123 4567"
                className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#374151] mb-1 block">Dirección</label>
              <input
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Av. Colón 1234"
                className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#374151] mb-1 block">Ciudad</label>
                <input
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Córdoba"
                  className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#374151] mb-1 block">Provincia</label>
                <input
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChange}
                  placeholder="Córdoba"
                  className="w-full px-4 py-2 rounded border border-[#D1D5DB] outline-none focus:border-[#1E3A8A] text-[#374151]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!formCompleto}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-colors mt-2 ${
                formCompleto
                  ? 'bg-[#1E3A8A] text-white hover:bg-[#374151]'
                  : 'bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              Confirmar pedido
            </button>

          </form>
        </div>

        {/* RESUMEN */}
        <div>
          <h2 className="text-[#1E3A8A] font-bold text-xl mb-4">
            Resumen ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </h2>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
            {carrito.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.thumbnail} alt={p.title} className="w-14 h-14 object-contain" />
                <div className="flex-1">
                  <p className="text-sm text-[#374151] font-medium line-clamp-2">{p.title}</p>
                  <p className="text-xs text-[#9CA3AF]">Cantidad: {p.cantidad}</p>
                </div>
                <p className="text-[#1E3A8A] font-bold text-sm">
                  $ {(p.price * p.cantidad).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
            <div className="border-t border-[#E5E7EB] pt-3 flex justify-between items-center">
              <span className="font-bold text-[#374151]">Total</span>
              <span className="font-bold text-[#1E3A8A] text-xl">
                $ {totalPrecio.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout