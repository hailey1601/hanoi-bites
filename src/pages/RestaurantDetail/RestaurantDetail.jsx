import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import dbData from "../../../db.json";
import "./RestaurantDetail.css";

const RestaurantDetail = () => {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = dbData.restaurants.find(r => r.id.toString() === id);
                if (!data) throw new Error("Không tìm thấy quán ăn.");
                setRestaurant(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (isLoading) return <h2 className="restaurant-detail__status">Đang dọn bàn...</h2>;
    if (!restaurant) return <h2 className="restaurant-detail__status">Quán ăn không tồn tại!</h2>;

    return (
        <>
            <Header />

            <div className="restaurant-detail">
                <Link to="/" className="restaurant-detail__back">
                    ← Quay lại
                </Link>

                <img
                    src={restaurant.img}
                    alt={restaurant.name}
                    className="restaurant-detail__image"
                />

                <h1 className="restaurant-detail__title">
                    {restaurant.name}
                </h1>

                <div className="restaurant-detail__info">
                    <p>📍 <b>Địa chỉ:</b> {restaurant.address}</p>
                    <p>💵 <b>Mức giá:</b> {restaurant.price}</p>
                    <p>🏷️ <b>Danh mục:</b> {restaurant.category}</p>
                </div>

                <button 
                    onClick={() => {
                        const user = localStorage.getItem("currentUser");
                        if (!user) {
                            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
                            return;
                        }
                        const parsedUser = JSON.parse(user);
                        const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${parsedUser.username}`)) || [];
                        if (localWishlist.includes(restaurant.id)) {
                            alert("Quán này đã có trong danh sách yêu thích của bạn!");
                        } else {
                            localWishlist.push(restaurant.id);
                            localStorage.setItem(`wishlist_${parsedUser.username}`, JSON.stringify(localWishlist));
                            alert("Đã thêm vào danh sách yêu thích thành công!");
                        }
                    }}
                    className="restaurant-detail__wishlist-btn">
                    ❤️ Thêm vào yêu thích
                </button>

                <hr className="restaurant-detail__divider" />
                <h3>Bình luận / Review</h3>
                <p className="restaurant-detail__coming-soon">Tính năng bình luận sẽ được cập nhật sau...</p>

            </div>

            <Footer />
        </>
    );
};

export default RestaurantDetail;