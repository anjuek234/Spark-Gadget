import { useState } from 'react'
import { z } from 'zod'
import axios from 'axios'
import './Product.css'

const API_URL = 'https://sample-e-1.onrender.com'

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Price must be a valid number greater than 0'),
  category: z.string().min(1, 'Category is required'),
  stock: z
    .string()
    .min(1, 'Stock is required')
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, 'Stock must be a valid number'),
  image: z.string().min(1, 'Image URL is required'),
  // optional
  badge: z.string().optional(),
})

export default function Addproduct() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: '',
    badge: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')

    const result = productSchema.safeParse(formData)

    if (!result.success) {
      const newErrors = {}
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message
      })
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/product/addproduct`, result.data, {
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' },
      })

      setSuccess('Product added successfully! ✓')
      setFormData({ name: '', price: '', description: '', category: '', stock: '', image: '', badge: '' })
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to add product. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-page">
      <div className="product-container" style={{ gridTemplateColumns: '1fr' }}>
        <section className="product-form-section">
          <div className="form-card">
            <div className="form-header">
              <h1>Add New Product</h1>
              <p>Create a new product listing</p>
            </div>

            {errors.submit && <div className="error-message">{errors.submit}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 15 Pro"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  disabled={loading}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="99999"
                  className={`form-input ${errors.price ? 'input-error' : ''}`}
                  disabled={loading}
                  step="0.01"
                  min="0"
                />
                {errors.price && <span className="field-error">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product in detail..."
                  className={`form-input textarea ${errors.description ? 'input-error' : ''}`}
                  disabled={loading}
                  rows="4"
                />
                {errors.description && <span className="field-error">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Electronics, Gadgets"
                    className={`form-input ${errors.category ? 'input-error' : ''}`}
                    disabled={loading}
                  />
                  {errors.category && <span className="field-error">{errors.category}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`form-input ${errors.stock ? 'input-error' : ''}`}
                    disabled={loading}
                    min="0"
                  />
                  {errors.stock && <span className="field-error">{errors.stock}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className={`form-input ${errors.image ? 'input-error' : ''}`}
                    disabled={loading}
                  />
                  {errors.image && <span className="field-error">{errors.image}</span>}
                  {formData.image && (
                    <div className="image-preview">
                      <img
                        src={formData.image}
                        alt="Preview"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Invalid+Image'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="badge">Badge (Optional)</label>
                <input
                  type="text"
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  placeholder="e.g., Featured, New, Sale"
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

