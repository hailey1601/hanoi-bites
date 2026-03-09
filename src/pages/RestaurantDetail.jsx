import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import dbData from "../../db.json";

const RestaurantDetail = () => {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // const response = await fetch(`http://localhost:8000/restaurants/${id}`);
                // if (!response.ok) throw new Error("Không tìm thấy quán ăn.");
                // const data = await response.json();
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

    if (isLoading) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Đang dọn bàn...</h2>;
    if (!restaurant) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Quán ăn không tồn tại!</h2>;

    return (
        <>
            <Header />

            <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", fontFamily: "var(--font-body)" }}>
                <Link to="/" style={{ color: "var(--primary-gold)", textDecoration: "none", fontWeight: "bold" }}>
                    ← Quay lại
                </Link>

                <img
                    src={restaurant.img}
                    alt={restaurant.name}
                    style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px", marginTop: "20px" }}
                />

                <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--primary-gold)", marginTop: "20px" }}>
                    {restaurant.name}
                </h1>

                <div style={{ margin: "20px 0", fontSize: "1.1rem", lineHeight: "1.8" }}>
                    <p>📍 <b>Địa chỉ:</b> {restaurant.address}</p>
                    <p>💵 <b>Mức giá:</b> {restaurant.price}</p>
                    <p>🏷️ <b>Danh mục:</b> {restaurant.category}</p>
                </div>

                <button style={{ padding: "10px 20px", background: "var(--primary-gold)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem" }}>
                    ❤️ Thêm vào yêu thích
                </button>

                <hr style={{ margin: "40px 0", borderColor: "#eee" }} />
                <h3>Bình luận / Review</h3>
                <p style={{ color: "gray" }}>Tính năng bình luận sẽ được cập nhật sau...</p>

            </div>

            <Footer />
        </>
    );
};

export default RestaurantDetail;