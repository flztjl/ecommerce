import { Routes, Route } from "react-router-dom";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsShow } from "./ProductsShow";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Home } from "./Home";
import { ShoppingCart } from "./ShoppingCart";

export const Content = () => {
  // Determine the routes for all the pages.
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsIndex />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/products/:id" element={<ProductsShow />} />
      </Routes>
    </main>
  );
};
