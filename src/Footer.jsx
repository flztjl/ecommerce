export const Footer = () => {
  return (
    <footer className="bg-light text-secondary py-5">
      {/* Left column */}
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg">
            <p>
              Lei Jia <br /> University of Nevada, Las Vegas
            </p>
            <p>jial5@unlv.nevada.edu</p>
            <div className="d-flex justify-content-start gap-2">
              <a href="https://www.facebook.com" className="text-secondary">
                <i className="bi bi-facebook" style={{ fontSize: "24px" }}></i>
              </a>
              <a href="https://www.twitter.com" className="text-secondary">
                <i className="bi bi-twitter" style={{ fontSize: "24px" }}></i>
              </a>
              <a href="https://www.instagram.com" className="text-secondary">
                <i className="bi bi-instagram" style={{ fontSize: "24px" }}></i>
              </a>
              <a href="https://www.youtube.com" className="text-secondary">
                <i className="bi bi-youtube" style={{ fontSize: "24px" }}></i>
              </a>
              <a href="https://www.linkedin.com" className="text-secondary">
                <i className="bi bi-linkedin" style={{ fontSize: "24px" }}></i>
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="col-12 col-md-6 col-lg">
            <h5 className="text-uppercase fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-reset">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  About page
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Shopping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="col-12 col-md-6 col-lg">
            <h5 className="text-uppercase fw-bold mb-3">Shop</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-reset">
                  Men&apos;s Shopping
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Women&apos;s Shopping
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Kids&apos; Shopping
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Furniture
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Discount
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="col-12 col-md-6 col-lg">
            <h5 className="text-uppercase fw-bold mb-3">Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-reset">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="text-reset">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="col-12 col-md-6 col-lg">
            <h5 className="text-uppercase fw-bold mb-3">Subscribe</h5>
            <p>
              Receive updates, hot deals, discounts sent straight to your inbox
              daily.
            </p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Recipient's email"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white text-center py-3 mt-4">
        <p className="mb-0 text-black">
          Copyright © 2024. All Rights Reserved. Designed by Lei Jia.
        </p>
      </div>
    </footer>
  );
};
