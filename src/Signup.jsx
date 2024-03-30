import { useState } from "react";

export const Signup = () => {
  const [setErrors] = useState([]);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [setStatus] = useState(null);
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    // Set const required for signup
    const formData = new FormData(event.target);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const userName = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password_confirmation");

    // Post filled sign up information, pop up signed up message if sucessed and redirect to log in page
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        email,
        password,
        passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User created successfully with ID:", data.id);
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
          window.location.href = "/Login";
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setErrors(["An error occurred. Please try again."]);
        setStatus("Error");
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

      {/* Sign up information */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          {/* First name and Last name, combined in one row */}
          <div style={{ width: "48%" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>
              First Name:
            </label>
            <input
              name="firstname"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ width: "48%" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>
              Last Name:
            </label>
            <input
              name="lastname"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginBottom: "4px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        {/* User name row, set a characters control */}
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            User Name:
          </label>
          <input
            name="username"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
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
            {20 - userName.length} characters remaining
          </small>
        </div>

        {/* Email information */}
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

        {/* Password and password confirmation */}
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

        {/* Submit button */}
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

        {/* Show sign up message when done */}
        {showAlertMessage && (
          <div
            className="alert alert-success d-flex align-items-center position-relative mt-3"
            role="alert"
            style={{ overflow: "hidden" }}
          >
            <i className="bi bi-check-circle-fill me-2"></i>
            <div>Sign up successfully!</div>
          </div>
        )}
      </form>
    </div>
  );
};
