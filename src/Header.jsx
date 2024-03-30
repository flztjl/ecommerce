import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import logoImage from "./assets/logo.jpg";

export const Header = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Search actions, navigate to the selected result and clear the search results.
  const handleSearchSelect = (itemId) => {
    setSuggestions([]);
    setQuery("");
    navigate(`/products/${itemId}`);
  };

  // Check the keyword with product list first, if no match, check category then.
  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        try {
          let response = await fetch(
            `https://dummyjson.com/products/search?q=${query}`
          );
          let data = await response.json();
          let products = data.products || [];

          if (products.length === 0) {
            response = await fetch(
              `https://dummyjson.com/products/category/${query}`
            );
            data = await response.json();
            products = data.products || [];
          }

          setSuggestions(products);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Shop logo */}
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
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarContent"
          >
            {/* Home and products link */}
            <ul className="navbar-nav">
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

            {/* Search Bar */}
            <form
              className="d-flex position-relative"
              onSubmit={(e) => e.preventDefault()}
              style={{ width: "50%" }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "calc(100% - 2.5rem)", paddingRight: "2.5rem" }}
              />
              <button
                className="btn position-absolute"
                type="submit"
                style={{
                  right: "0",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <i className="bi bi-search"></i>
              </button>
              {suggestions.length > 0 && (
                <div
                  className="search-results position-absolute bg-white mt-1 w-100"
                  style={{ zIndex: 1050, top: "100%" }}
                >
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center p-2"
                      onClick={() => handleSearchSelect(item.id)}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: "50px", marginRight: "10px" }}
                      />
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* Account and Cart */}
            <div className="d-flex align-items-center">
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

              {/* Shopping cart */}
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
