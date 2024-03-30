import { Link } from "react-router-dom";
import backgroundImage from "./assets/banner.jpg";

export const Home = () => {
  return (
    <>
      {/* Home page background */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center bg-cover bg-center vh-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div className="display-4 fw-bold text-white mb-4">
          <h2 className="display-4 fw-bold text-white mb-4">
            Online Shopping Can Never be So Wonderful!
          </h2>

          {/* Link button to all products */}
          <Link
            to="/products"
            className="btn btn-primary btn-lg rounded-pill"
            role="button"
          >
            All Products
          </Link>
        </div>
      </div>
    </>
  );
};
