export async function buscarProductos(query) {
  const response = await fetch(
    `http://localhost:3001/api/buscar?q=${encodeURIComponent(query)}`
  )
  const data = await response.json()
  return data || []
}