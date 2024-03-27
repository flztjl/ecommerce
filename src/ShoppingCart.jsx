import { useState, useEffect } from "react";

export const ShoppingCart = () => {
  const [cartedProducts, setCartedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching all carts; you might want to adjust this to fetch a specific user's cart if possible
    fetch("https://dummyjson.com/carts/user/1") // Adjusted for demonstration; replace '1' with the actual user ID if applicable
      .then((res) => res.json())
      .then((data) => {
        // Assuming we want to display products from the user's cart, and the user has at least one cart
        // Note: the "/carts/user/1" endpoint is hypothetical and used as an example. Use the correct endpoint as per the API documentation to fetch a specific cart or carts.
        setCartedProducts(data.carts?.length > 0 ? data.carts[0].products : []);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching carted products:", error)
      );
  }, []);

  const handleRemove = async (productId) => {
    console.log("Removing product with ID:", productId);
    // As the API might not support product removal via fetch, this is a placeholder
    // Optimistically remove the product from the UI
    setCartedProducts(
      cartedProducts.filter((product) => product.id !== productId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (cartedProducts.length === 0) {
    return <div>Your cart is empty.</div>;
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
              <div style={{ marginLeft: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  {product.title}
                </p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
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
