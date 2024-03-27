import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.target);
    const firstName = formData.get("name").split(" ")[0];
    const lastName = formData.get("name").split(" ")[1];
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("flashMessage", "User created successfully!");
        toast.success("Signup successful! Redirecting to login page...", {
          onClose: () => (window.location.href = "/"),
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]);
        setStatus("error");
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        paddingTop: "16px",
        padding: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Signup
      </h1>
      {status && (
        <img
          src={`https://http.cat/${status}`}
          style={{ display: "block", margin: "0 auto", marginBottom: "12px" }}
          alt="Status"
        />
      )}
      <ul>
        {errors.map((error, index) => (
          <li key={index} style={{ color: "#ff0000", fontSize: "14px" }}>
            {error}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginBottom: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <small style={{ display: "block", color: "#666", fontSize: "12px" }}>
            {20 - name.length} characters remaining
          </small>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Email:
          </label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginBottom: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginBottom: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Password Confirmation:
          </label>
          <input
            name="password_confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginBottom: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            backgroundColor: "#007bff",
            color: "#ffffff",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};
