import { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/home" className="logo-link" onClick={() => setIsMenuOpen(false)}>
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Spark Gadget</span>
          </Link>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/addproduct" onClick={() => setIsMenuOpen(false)}>Add Product</Link></li>
          <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="navbar-auth">
          <Link to="/login" className="auth-link login-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="auth-link signup-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
