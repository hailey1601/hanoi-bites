import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import dbData from "../../../db.json";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const categoryMap = {
    sweet: { name: "Đồ ngọt", dbKey: "Đồ ngọt" },
    salty: { name: "Đồ mặn", dbKey: "Đồ mặn" },
    vegan: { name: "Món ăn chay", dbKey: "Đồ chay" },
    seafood: { name: "Món hải sản", dbKey: "Đồ hải sản" }
  };

  useEffect(() => {
    const currentCategory = categoryMap[categoryId];
    if (currentCategory) {
      setCategoryName(currentCategory.name);
      const filtered = dbData.restaurants.filter(
        (r) => r.category === currentCategory.dbKey
      );
      setRestaurants(filtered.slice(0, 5)); // Show up to 5 restaurants
    } else {
      setCategoryName("Danh mục không tồn tại");
      setRestaurants([]);
    }
  }, [categoryId]);

  return (
    <>
      <Header />
      <div className="category-container">
        <div className="category-header">
          <h1>{categoryName}</h1>
          <p>Khám phá những địa điểm tuyệt vời nhất cho {categoryName.toLowerCase()}</p>
        </div>

        {restaurants.length > 0 ? (
          <div className="category-grid">
            {restaurants.map((restaurant) => (
              <div className="category-card" key={restaurant.id}>
                <Link to={`/restaurant/${restaurant.id}`} className="card-link">
                  <div className="card-img-wrapper">
                    <img src={restaurant.img} alt={restaurant.name} />
                  </div>
                  <div className="card-content">
                    <h3>{restaurant.name}</h3>
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
            <Link to="/" className="back-btn">Khám phá các quán khác</Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
