import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import Signup from "./pages/Singup/signup.jsx";
import SearchResults from "./pages/SearchResults/SearchResults.jsx";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail.jsx";
import CategoryPage from "./pages/Category/CategoryPage.jsx";
import Restaurants from "./pages/Restaurants/Restaurants.jsx";
import About from "./pages/About/About.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import "./App.css";

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="*" element={<h1 className="app__not-found">404 - Không tìm thấy trang</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;