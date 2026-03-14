function App() {
  const navItems = ['Categorías', 'Ofertas', 'Más vendidos', 'Cupones']

  return (
    <div className="font-sans">

      {/* HEADER */}
      <header className="bg-[#1E3A8A] px-6 py-3 flex items-center gap-3">

        {/* LOGO */}
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

        {/* BARRA DE BÚSQUEDA */}
        <input
          type="text"
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 rounded text-base outline-none border-2 border-[#4B6FBA] bg-[#F3F4F6] text-[#374151] placeholder-[#9CA3AF]"
        />

        {/* BOTÓN BUSCAR */}
        <button className="bg-[#374151] text-white px-5 py-2 rounded font-bold text-base cursor-pointer hover:bg-[#4B5563] transition-colors">
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
        <h2 className="text-[#1E3A8A] text-2xl font-bold mb-2">
          Bienvenido a Ventas Express
        </h2>
        <p className="text-[#374151]">
          Encontrá los mejores productos al mejor precio.
        </p>
      </main>

    </div>
  )
}

export default App