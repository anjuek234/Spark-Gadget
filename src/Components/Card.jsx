import { useEffect, useState } from 'react'
import axios from 'axios'
import './Card.css'

const PRODUCTS_API = 'https://sample-e-1.onrender.com/product/getproducts'
const IMAGE_BASE_URL = 'https://sample-e-1.onrender.com/'

function resolveImageUrl(image) {
  if (!image) return ''
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  return new URL(image, IMAGE_BASE_URL).href
}

function formatPrice(price) {
  if (price == null || price === '') return '₹0'
  const numericPrice = typeof price === 'number' ? price : Number(price.toString().replace(/[^0-9.]/g, ''))
  if (Number.isNaN(numericPrice)) return `₹${price}`
  return `₹${numericPrice.toLocaleString('en-IN')}`
}

export default function Card({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await axios.get(PRODUCTS_API)
        const data = response.data
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : Array.isArray(data.data)
          ? data.data
          : []

        setProducts(list)
      } catch (err) {
        setError('Unable to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="product-loading">Loading products...</div>
  }

  if (error) {
    return <div className="product-error">{error}</div>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id || product._id} className="product-card">
          <div className="product-badge">{product.badge || 'Featured'}</div>
          <div className="product-image-wrapper">
            <img
              src={resolveImageUrl(product.image || product.imageUrl || product.photo)}
              alt={product.name || 'Product'}
              className="product-image"
            />
          </div>

          <div className="product-body">
            <h3>{product.name || 'Doll'}</h3>
            <p>{product.description || product.details || 'Beautiful doll for every occasion.'}</p>
          </div>

          <div className="product-footer">
            <span className="product-price">{formatPrice(product.price)}</span>
            <button
              className="product-btn"
              onClick={() => onAdd(product)}
            >
              Purchase
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
