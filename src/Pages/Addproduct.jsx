import { useState } from 'react'
import axios from 'axios'
import './Addproduct.css'

const ADD_PRODUCT_API = 'https://sample-e-1.onrender.com/product/addProduct'

const initialForm = {
  name: '',
  price: '',
  description: '',
  stock: '',
  category: '',
}

export default function Addproduct() {
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { name, price, description, stock, category } = form

    if (!name || !price || !description || !stock || !category) {
      setError('Please fill in all product fields.')
      return
    }

    if (!image) {
      setError('Please select an image file before adding the product.')
      return
    }

    setLoading(true)

    try {
      const payload = new FormData()
      payload.append('name', name)
      payload.append('price', price)
      payload.append('description', description)
      payload.append('stock', stock)
      payload.append('category', category)
      if (image) {
        payload.append('image', image)
      }

      const response = await axios.post(ADD_PRODUCT_API, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data?.success || response.status === 200 || response.status === 201) {
        setSuccess('Product added successfully.')
        setForm(initialForm)
        setImage(null)
      } else {
        setError(response.data?.message || 'Unable to add product.')
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong while adding the product.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <div className="add-product-header">
          <p className="eyebrow">Inventory</p>
          <h1>Add Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the product"
              disabled={loading}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="Available quantity"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Toys">Toys</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="file-group">
            <label htmlFor="image">Choose File</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              disabled={loading}
            />
            <span>{image ? image.name : 'No file chosen'}</span>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
