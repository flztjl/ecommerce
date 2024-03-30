import { useState, useEffect } from "react";

export const ShoppingCart = () => {
  const [cartedProducts, setCartedProducts] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartedProducts(cart);
  }, []);

  // Quantity change function
  const handleQuantityChange = (productId, newQuantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartedProducts(cart);
  };

  // Product remove function
  const handleRemove = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartedProducts(cart);
  };

  // Message shows when empty cart
  if (cartedProducts.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <h3 className="text-center text-muted">Your cart is empty.</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Shopping Cart
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* List all the products in the cart */}
        {cartedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            {/* Product thumbnail and title */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />

              {/* Quantity */}
              <div style={{ marginLeft: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {product.title}
                </p>
                <div className="mb-3">
                  <label
                    htmlFor={`quantity-${product.id}`}
                    className="form-label"
                  >
                    Quantity:
                  </label>

                  {/* Quantity change button */}
                  <select
                    id={`quantity-${product.id}`}
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    className="form-select"
                    style={{ width: "100px" }}
                  >
                    {[...Array(30).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product remove button */}
            <div>
              <button
                onClick={() => handleRemove(product.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
