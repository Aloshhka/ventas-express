function App() {
  const navItems = ['Categorías', 'Ofertas', 'Más vendidos', 'Cupones']

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>

      <header style={{
        backgroundColor: '#1E3A8A',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#374151',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            ⚡
          </div>
          <div style={{ lineHeight: '1.1' }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>
              VENTAS
            </div>
            <div style={{ color: '#374151', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px', backgroundColor: 'white', paddingLeft: '3px', borderRadius: '2px' }}>
              EXPRESS
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar productos..."
          style={{ flex: 1, padding: '10px 16px', borderRadius: '4px', border: 'none', fontSize: '15px', outline: 'none' }}
        />

        <button style={{
          backgroundColor: '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '15px',
          cursor: 'pointer'
        }}>
          Buscar
        </button>
      </header>

      <nav style={{ backgroundColor: '#1a3278', padding: '8px 24px', display: 'flex', gap: '8px' }}>
        {navItems.map(function(item) {
          return (
            <button key={item} style={{
              backgroundColor: '#F3F4F6',
              color: '#374151',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              {item}
            </button>
          )
        })}
      </nav>

      <main style={{ padding: '32px 24px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
        <h2 style={{ color: '#1E3A8A', marginBottom: '8px' }}>Bienvenido a Ventas Express</h2>
        <p style={{ color: '#374151' }}>Próximamente: productos de Mercado Libre aquí.</p>
      </main>

    </div>
  )
}

export default App