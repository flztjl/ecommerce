import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import logoImage from "./assets/logo.jpg";

export const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-success me-2"
                onClick={toggleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
              {isSearchVisible && (
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              )}
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownUserButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill"></i>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownUserButton"
                >
                  {localStorage.getItem("jwt") ? (
                    <li>
                      <LogoutLink />
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Log In
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <Link className="btn btn-outline-dark ms-2" to="/shoppingcart">
                <i className="bi bi-cart-fill"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
