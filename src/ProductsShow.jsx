import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

export function ProductsShow() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      })
      .catch((error) =>
        console.error("There was an error fetching the product data:", error)
      );
  }, [params.id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      thumbnail: product.images[0],
    };
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 5000);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-1">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`img-thumbnail mb-2 thumbnail-hover-effect ${
                selectedImage === image ? "active-thumbnail" : ""
              }`}
              onClick={() => setSelectedImage(image)}
              style={{ width: "100%", cursor: "pointer" }}
            />
          ))}
        </div>
        <div className="col-md-5">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.title}
              className="img-fluid mb-3"
            />
          )}
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="fw-bold">${product.price}</p>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-select"
                >
                  {[...Array(30).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-center mt-3">
                <button className="btn btn-warning" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                {showAddedMessage && (
                  <div
                    className="alert alert-success d-flex align-items-center ms-2 mb-0 p-0"
                    role="alert"
                    style={{ overflow: "hidden" }}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>Added to cart</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
