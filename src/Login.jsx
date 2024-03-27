import { useState } from "react";

export const Login = () => {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData(event.target);
    const username = formData.get("email"); // Assuming the form uses 'email' as the name
    const password = formData.get("password");

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username, // Updated to use form data
        password, // Updated to use form data
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.token); // Assuming the response includes a token
        localStorage.setItem("user_role", data.user?.role); // Update based on actual response
        localStorage.setItem("flashMessage", "Logged in successfully!");
        window.location.href = "/"; // Redirect or update UI as needed
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]); // Adjust based on error response structure
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1
        style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}
      >
        Login
      </h1>
      <ul style={{ marginBottom: "20px" }}>
        {errors.map((error) => (
          <li key={error} style={{ color: "#ef4444" }}>
            {error}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
