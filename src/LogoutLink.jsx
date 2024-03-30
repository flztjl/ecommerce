import axios from "axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_role");

    // Set log out to true in localStorage. Then navigate to log in page and show log out message.
    localStorage.setItem("loggedOut", "true");
    window.location.href = "/Login";
  };

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}
