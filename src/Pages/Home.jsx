import { useState } from 'react'
import Card from '../Components/Card'
import './Home.css'

export default function Home() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-label">Spark Gadget</span>
          <h1>Step into the Spark Gadget</h1>
          <p>
          Find the newest laptops, smartphones, accessories, and gadgets all in one place. Shop smarter, stay connected, and experience technology without limits. 🚀💻📱 
          </p>
          <div className="hero-actions">
            <a href="#products" className="hero-button">Browse Items</a>
            <div className="hero-status">{cart.length} item(s) in cart</div>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="products-header">
          <span className="section-subtitle">Featured Devicess</span>
          <h2>Purchase your next favorite Device</h2>
        </div>

        <Card onAdd={addToCart} />
      </section>
    </div>
  )
}
