import { Link } from "react-router-dom";
import "./index.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto footer__wrapper">
        <div>
          <img className="footer__logo" src="/logo.svg" alt="Logo" />
          <p className="footer__description">
            A starter for React apps with authentication, a protected admin
            area and a typed data layer.
          </p>
        </div>
        <div className="footer__quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__bottom">
        © {new Date().getFullYear()} - Boilerplate
      </p>
    </footer>
  );
};

export default Footer;
