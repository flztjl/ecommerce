import { useState, useEffect } from "react";

export const Login = () => {
  const [errors, setErrors] = useState([]);

  // Const for pop up messages when log in and logout.
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Handle Log in event, use jwt for security, redirect to home page after log in.
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("userId", data.id.toString());
        localStorage.setItem("jwt", data.token);
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
          window.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]);
      });
  };

  // If logout event is detected, pop up log out message and close after 1.5 seconds.
  useEffect(() => {
    if (localStorage.getItem("loggedOut")) {
      setShowLogoutMessage(true);
      localStorage.removeItem("loggedOut");
      setTimeout(() => {
        setShowLogoutMessage(false);
      }, 1500);
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-90 bg-light pb-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="mb-4 text-center">Login</h1>
        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        {/* Show log out message if redirect from log out event */}
        {showLogoutMessage && (
          <div
            className="alert alert-success d-flex align-items-center position-relative mt-3"
            role="alert"
            style={{ overflow: "hidden" }}
          >
            <i className="bi bi-check-circle-fill me-2"></i>
            <div>Logged out successfully!</div>
          </div>
        )}

        {/* Log in information */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          {/* Show log in message when done */}
          {showAlertMessage && (
            <div
              className="alert alert-success d-flex align-items-center position-relative mt-3"
              role="alert"
              style={{ overflow: "hidden" }}
            >
              <i className="bi bi-check-circle-fill me-2"></i>
              <div>Logged in successfully!</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
