import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaSearch, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          A&D CLOTHS<span className="text-danger">.</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Collapsible Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/collection">Collection</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/contact">Contact</Link>
            </li>

            {/* Icons Move Inside on Small Screens - FIXED ALIGNMENT */}
            <li className="nav-item d-lg-none">
              <div className="d-flex flex-column align-items-center mt-3 gap-3">
                <FaSearch size={18} className="text-dark cursor-pointer" />
                <Link className="nav-link" to='/login'>
                  <FaUser size={20} className="text-dark cursor-pointer"/>
                </Link>
                <div className="position-relative">
                  <FaShoppingBag size={20} className="text-dark cursor-pointer" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    5
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right-side Icons (Only for Large Screens) */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <FaSearch size={18} className="text-dark cursor-pointer" />
          <Link className="nav-link" to='/login'>
            <FaUser size={20} className="text-dark cursor-pointer"/>
          </Link>
          <div className="position-relative">
            <FaShoppingBag size={20} className="text-dark cursor-pointer" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              5
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
