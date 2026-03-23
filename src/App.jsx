import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from './context/CarritoContext'
import ProductCard from './components/ProductCard'

const CATEGORIAS = [
  { label: 'Todos', value: '' },
  { label: 'Electrónica', value: 'electronics' },
  { label: 'Joyería', value: 'jewelery' },
  { label: 'Ropa hombre', value: "men's clothing" },
  { label: 'Ropa mujer', value: "women's clothing" },
]

function App() {
  const navigate = useNavigate()
  const { totalItems } = useCarrito()
  const [query, setQuery] = useState('')
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoriaActiva, setCategoriaActiva] = useState('')

  async function cargarProductos(q = '', categoria = '') {
    setCargando(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (q) params.append('q', q)
      if (categoria) params.append('categoria', categoria)
      const response = await fetch(`http://localhost:3001/api/buscar?${params}`)
      const data = await response.json()
      setProductos(data)
    } catch {
      setError('Error al cargar productos.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  function handleBuscar() {
    cargarProductos(query, categoriaActiva)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleBuscar()
  }

  function handleCategoria(valor) {
    setCategoriaActiva(valor)
    cargarProductos(query, valor)
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
            <div className="text-white font-bold text-base tracking-widest">VENTAS</div>
            <div className="text-[#374151] font-bold text-base tracking-widest bg-white px-1 rounded-sm">EXPRESS</div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 rounded text-base outline-none border-2 border-[#4B6FBA] bg-[#F3F4F6] text-[#374151] placeholder-[#9CA3AF]"
        />

        <button
          onClick={handleBuscar}
          className="bg-[#374151] text-white px-5 py-2 rounded font-bold text-base cursor-pointer hover:bg-[#4B5563] transition-colors"
        >
          Buscar
        </button>

        <button
          onClick={() => navigate('/carrito')}
          className="relative text-white text-2xl ml-2"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>

      </header>

      {/* CATEGORÍAS */}
      <nav className="bg-[#1a3278] px-6 py-2 flex gap-2 flex-wrap">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.value}
            onClick={() => handleCategoria(cat.value)}
            className={`px-4 py-1.5 rounded text-sm font-bold cursor-pointer transition-colors
              ${categoriaActiva === cat.value
                ? 'bg-[#374151] text-white'
                : 'bg-[#F3F4F6] text-[#374151] hover:bg-white'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* BODY */}
      <main className="bg-[#F3F4F6] p-8 min-h-screen">

        {cargando && (
          <div className="text-center mt-20">
            <p className="text-[#1E3A8A] text-xl font-bold">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-20">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {!cargando && productos.length === 0 && !error && (
          <div className="text-center mt-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-[#374151] text-lg">No se encontraron productos.</p>
          </div>
        )}

        {!cargando && productos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map(producto => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

export default App