import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import dbData from "../../db.json";
import "./Restaurants.css";

const Restaurants = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const categories = ["Tất cả", "Đồ ngọt", "Đồ mặn", "Đồ chay", "Đồ hải sản"];

  useEffect(() => {
    // Load data from db.json
    setAllRestaurants(dbData.restaurants);
    setFilteredRestaurants(dbData.restaurants);
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "Tất cả") {
      setFilteredRestaurants(allRestaurants);
    } else {
      const filtered = allRestaurants.filter((r) => r.category === category);
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <>
      <Header />
      <div className="restaurants-container">
        <div className="restaurants-header">
          <h1>Danh sách Quán Ăn</h1>
          <p>Khám phá mọi hương vị tuyệt vời tại Hanoi Bites</p>
        </div>

        <div className="filter-buttons">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <Link to={`/restaurant/${restaurant.id}`} className="card-link">
                  <div className="card-img-wrapper">
                    <img src={restaurant.img} alt={restaurant.name} />
                  </div>
                  <div className="card-content">
                    <h3>{restaurant.name}</h3>
                    <p className="card-category">🏷️ {restaurant.category}</p>
                    <p className="card-location">📍 {restaurant.address}</p>
                    <p className="card-price">💵 {restaurant.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-restaurants">
            <h2>Chưa có quán ăn nào trong danh mục này.</h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Restaurants;
