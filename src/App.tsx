import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DarkModeToggle from "./components/DarkModeToggle";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Route, Routes } from "react-router";
import ProductDetail from "./pages/ProductDetail";

const App: React.FC = () => {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("dark-mode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("dark-mode", JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="app-root">
      <Header />
      <div className="container">
        <div className="top-row">
          <h2>Your Shopping List</h2>
          <DarkModeToggle dark={dark} setDark={setDark} />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm />
                <ProductList />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
