import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import dbData from "../../../db.json";
import "./Wishlist.css";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            const parsedUser = JSON.parse(user);
            setCurrentUser(parsedUser);
            
            const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${parsedUser.username}`)) || [];
            
            const items = localWishlist.map(id => dbData.restaurants.find(r => r.id === id)).filter(Boolean);
            setWishlistItems(items);
        }
    }, []);

    const removeFromWishlist = (id) => {
        if (!currentUser) return;
        const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.username}`)) || [];
        const newWishlist = localWishlist.filter(itemId => itemId !== id);
        localStorage.setItem(`wishlist_${currentUser.username}`, JSON.stringify(newWishlist));
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <>
            <Header />
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1>Danh sách Yêu thích</h1>
                    <p>Những địa điểm bạn muốn ghé thăm tại Hanoi Bites</p>
                </div>

                {!currentUser ? (
                    <div className="wishlist-empty">
                        <i className="bx bx-user-circle"></i>
                        <h2>Vui lòng đăng nhập</h2>
                        <p>Đăng nhập để lưu lại các quán ăn yêu thích của bạn nhé!</p>
                        <Link to="/login" className="wishlist-action-btn">Đăng nhập ngay</Link>
                    </div>
                ) : wishlistItems.length > 0 ? (
                    <div className="wishlist-grid">
                        {wishlistItems.map((restaurant) => (
                            <div className="wishlist-card" key={restaurant.id}>
                                <Link to={`/restaurant/${restaurant.id}`} className="card-link">
                                    <div className="card-img-wrapper">
                                        <img src={restaurant.img} alt={restaurant.name} />
                                    </div>
                                    <div className="card-content">
                                        <h3>{restaurant.name}</h3>
                                        <p className="card-category">🏷️ {restaurant.category}</p>
                                        <p className="card-location">📍 {restaurant.address}</p>
                                    </div>
                                </Link>
                                <button className="remove-btn" onClick={() => removeFromWishlist(restaurant.id)}>
                                    <i className="bx bx-trash"></i> Bỏ thích
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="wishlist-empty">
                        <i className="bx bx-heart"></i>
                        <h2>Chưa có mục nào trong danh sách</h2>
                        <p>Hãy khám phá thêm các quán ăn và thêm vào danh sách yêu thích nha!</p>
                        <Link to="/restaurants" className="wishlist-action-btn">Khám phá ngay</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;
