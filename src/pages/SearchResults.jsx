import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const districtQuery = searchParams.get("district");

    return (
        <>
            <Header />
            <div style={{ minHeight: "60vh", padding: "80px 5%", background: "var(--light-bg)" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--dark-bg)", marginBottom: "30px" }}>
                    Kết quả tìm kiếm cho: <span style={{ color: "var(--primary-gold)" }}>{districtQuery}</span>
                </h1>

                <p>Danh sách các quán ăn tại {districtQuery} sẽ hiển thị ở đây...</p>

            </div>
            <Footer />
        </>
    );
};

export default SearchResults;