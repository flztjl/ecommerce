import { useState } from "react";

export const Login = () => {
  const [errors, setErrors] = useState([]);

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
        console.log("User ID acquired:", data.id);
        localStorage.setItem("flashMessage", data.id.toString());
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]);
      });
  };

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
        </form>
      </div>
    </div>
  );
};
