import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              Spark Gadget is a modern platform dedicated to providing exceptional service
              and innovative solutions for your needs.
            </p>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter">𝕏</a>
              <a href="#facebook" aria-label="Facebook">f</a>
              <a href="#linkedin" aria-label="LinkedIn">in</a>
              <a href="#github" aria-label="GitHub">⚙</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#status">Status</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MyApp. All rights reserved.</p>
          <p>Made with ❤️ by MyApp Team</p>
        </div>
      </div>
    </footer>
  );
}
