import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

export const App = () => {
  const [flashMessage, setFlashMessage] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    if (localStorage.flashMessage) {
      setFlashMessage(localStorage.flashMessage);
      localStorage.removeItem("flashMessage");
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header setSearchVisible={setSearchVisible} />
        <div onClick={() => setFlashMessage(null)}>{flashMessage}</div>
        <Content
          searchVisible={searchVisible}
          setSearchVisible={setSearchVisible}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
};
