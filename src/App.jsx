import { useState } from 'react'
import { buscarProductos } from './services/mercadolibre'
import ProductCard from './components/ProductCard'

function App() {
  const navItems = ['Categorías', 'Ofertas', 'Más vendidos', 'Cupones']
  const [query, setQuery] = useState('')
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function handleBuscar() {
    if (!query.trim()) return
    setCargando(true)
    setError(null)
    try {
      const resultados = await buscarProductos(query)
      setProductos(resultados)
    } catch (e) {
      setError('Hubo un error al buscar productos. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleBuscar()
  }

  return (
    <div className="font-sans">

      {/* HEADER */}
      <header className="bg-[#1E3A8A] px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#374151] rounded-full w-10 h-10 flex items-center justify-center text-xl">
            ⚡
          </div>
          <div className="leading-tight">
            <div className="text-white font-bold text-base tracking-widest">
              VENTAS
            </div>
            <div className="text-[#374151] font-bold text-base tracking-widest bg-white px-1 rounded-sm">
              EXPRESS
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={function(e) { setQuery(e.target.value) }}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded text-base outline-none border-2 border-[#4B6FBA] bg-[#F3F4F6] text-[#374151] placeholder-[#9CA3AF]"
        />

        <button
          onClick={handleBuscar}
          className="bg-[#374151] text-white px-5 py-2 rounded font-bold text-base cursor-pointer hover:bg-[#4B5563] transition-colors"
        >
          Buscar
        </button>
      </header>

      {/* NAVEGACIÓN */}
      <nav className="bg-[#1a3278] px-6 py-2 flex gap-2">
        {navItems.map(function(item) {
          return (
            <button
              key={item}
              className="bg-[#F3F4F6] text-[#374151] px-4 py-1.5 rounded text-sm font-bold cursor-pointer hover:bg-white transition-colors"
            >
              {item}
            </button>
          )
        })}
      </nav>

      {/* BODY */}
      <main className="bg-[#F3F4F6] p-8 min-h-screen">

        {/* Estado inicial */}
        {!cargando && productos.length === 0 && !error && (
          <div className="text-center mt-20">
            <p className="text-5xl mb-4">🛍️</p>
            <h2 className="text-[#1E3A8A] text-2xl font-bold mb-2">
              Bienvenido a Ventas Express
            </h2>
            <p className="text-[#374151]">
              Escribí algo en el buscador para encontrar productos.
            </p>
          </div>
        )}

        {/* Cargando */}
        {cargando && (
          <div className="text-center mt-20">
            <p className="text-[#1E3A8A] text-xl font-bold">Buscando productos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center mt-20">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* Resultados */}
        {!cargando && productos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map(function(producto) {
              return <ProductCard key={producto.id} producto={producto} />
            })}
          </div>
        )}

      </main>
    </div>
  )
}

export default App