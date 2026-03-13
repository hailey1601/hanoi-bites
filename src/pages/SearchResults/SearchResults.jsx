import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./SearchResults.css";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const districtQuery = searchParams.get("district");

    return (
        <>
            <Header />
            <div className="search-results">
                <h1 className="search-results__title">
                    Kết quả tìm kiếm cho: <span className="search-results__highlight">{districtQuery}</span>
                </h1>

                <p>Danh sách các quán ăn tại {districtQuery} sẽ hiển thị ở đây...</p>

            </div>
            <Footer />
        </>
    );
};

export default SearchResults;