import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProductsIndex = () => {
  const [products, setProducts] = useState([]);

  // Fetch the products information
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-5">
      {/* Showcase all the products with main image and title */}
      <h1 className="mb-4">All Products</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              {/* Clickable main image leading to product details */}
              {product.images && product.images.length > 0 && (
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      background: "#eee",
                    }}
                  />
                </Link>
              )}

              {/* Link to product details */}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
