import { useNavigate } from 'react-router-dom'

function ProductCard({ producto }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/producto/${producto.id}`)}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      <img
        src={producto.thumbnail}
        alt={producto.title}
        className="w-full h-48 object-contain mb-3"
      />
      <p className="text-sm text-[#374151] font-medium line-clamp-2 mb-2">
        {producto.title}
      </p>
      <p className="text-[#1E3A8A] text-xl font-bold">
        $ {producto.price.toLocaleString('es-AR')}
      </p>
    </div>
  )
}

export default ProductCard