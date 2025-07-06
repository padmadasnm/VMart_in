import React, { createContext, useEffect, useState } from "react";
import NavbarMain from "./ProjectComponents/NavbarMain";
import LoginPage from "./ProjectComponents/LoginPage";
import RegisterPage from "./ProjectComponents/RegisterPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductListInCard from "./ProjectComponents/ProductListInCard";
import ProductDetailPage from "./ProjectComponents/ProductDetailPage";
import AboutPage from "./ProjectComponents/AboutPage";
import HomePage from "./ProjectComponents/HomePage";
import CartPage from "./ProjectComponents/CartPage";
import HomePageImageDetails from "./ProjectComponents/HomePageImageDetails";
import PlaceOrderPage from "./ProjectComponents/PlaceOrderPage";

const comData = createContext();
const App = () => {
  const [show, setshow] = useState(false);
  const [hShow, setHshow] = useState(false);
  const [search, setSearch] = useState("");
  const [navVisible, setNavVisible] = useState(false);
  const [cartCnt, setcartCnt] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [tableName, settableName] = useState("");

  useEffect(() => {
    const storedLoginName = localStorage.getItem("loginName");
    settableName(storedLoginName);
  }, []);

  const renderNavigation = () => {
    try {
      if (navVisible && loginSuccess) {
        return <NavbarMain />;
      } else if (loginSuccess && !navVisible) {
        return <Navigate to="/register" />;
      } else {
        return <Navigate to="/" />;
      }
    } catch (error) {
      console.error("Navigation error:", error);
      <Navigate to="/" />;
    }
  };

  return (
    <div>
      <comData.Provider
        value={{
          show,
          setshow,
          search,
          setSearch,
          navVisible,
          setNavVisible,
          hShow,
          setHshow,
          cartCnt,
          setcartCnt,
          loginSuccess,
          setLoginSuccess,
          tableName,
          settableName
        }}
      >
        <BrowserRouter>
          {renderNavigation()}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/productList" element={<ProductListInCard />} />
            <Route
              path="/productList/details/:id"
              element={<ProductDetailPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/home/details/:id"
              element={<HomePageImageDetails />}
            />
            <Route path="/cart/placeoforder" element={<PlaceOrderPage />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </comData.Provider>
    </div>
  );
};

export default App;
export { comData };
