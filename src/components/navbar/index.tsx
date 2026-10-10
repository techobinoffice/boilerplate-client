import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { getStoredUser } from "../../utils/auth";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = getStoredUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = user ? (
    <li>
      <Link className="navbar__list__item" to="/dashboard">
        Dashboard
      </Link>
    </li>
  ) : (
    <>
      <li>
        <Link className="navbar__list__item" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="navbar__list__item" to="/register">
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className={`navigation relative ${isVisible ? "sticky" : ""}`}>
      <div className="container mx-auto navbar">
        <Link className="navbar__logo" to="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
        <div className="navbar__list">
          <ul className="nav_items">
            <li>
              <Link className="navbar__list__item" to="/">
                Home
              </Link>
            </li>
            {links}
          </ul>
          <button
            type="button"
            className="navbar__toggle"
            aria-label="Toggle menu"
            aria-expanded={showDropdown}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      {showDropdown && (
        <div className="navbar__mobile" onClick={() => setShowDropdown(false)}>
          <ul>
            <li>
              <Link className="navbar__list__item" to="/">
                Home
              </Link>
            </li>
            {links}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
