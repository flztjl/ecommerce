import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

export function ProductsShow() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const navigate = useNavigate();

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

  const handleAddToCart = async () => {
    console.log("Add to cart:", product.id, quantity);
    navigate("/shoppingcart");
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
              <button className="btn btn-warning" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
