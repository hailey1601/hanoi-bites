import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);

    const hanoiDistricts = [
        "Quận Hoàn Kiếm",
        "Quận Đống Đa",
        "Quận Ba Đình",
        "Quận Hai Bà Trưng",
        "Quận Tây Hồ",
        "Quận Cầu Giấy"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDistrictClick = (district) => {
        setShowSuggestions(false);
        navigate(`/search?district=${encodeURIComponent(district)}`);
    };

    return (
        <>
            <div className="d1">
                <div>
                    <Link to="/">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="search" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo quận, tên quán..."
                            onClick={() => setShowSuggestions(true)}
                        />
                        <i className="bx bx-search" />

                        {showSuggestions && (
                            <div className="search-suggestions">
                                <h4>📍 Khám phá theo Quận</h4>
                                <ul>
                                    {hanoiDistricts.map((district, index) => (
                                        <li key={index} onClick={() => handleDistrictClick(district)}>
                                            {district}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </form>

                <div className="login">
                    <i className="bx bx-user" />
                    <button><Link to="/login">Đăng nhập</Link></button>
                    <label> / </label>
                    <button><Link to="/register">Đăng ký</Link></button>
                </div>
            </div>

            <hr className="duongke" />

            <div className="menu">
                <ul>
                    <li><Link to="/">Trang chủ</Link></li>
                    <li
                        onMouseEnter={() => setIsSubMenuOpen(true)}
                        onMouseLeave={() => setIsSubMenuOpen(false)}
                    >
                        <Link to="/restaurants">Quán ăn <i className="bx bx-chevron-down"></i></Link>
                        {isSubMenuOpen && (
                            <ul className="sub-menu active">
                                <li><Link to="/category/sweet">Đồ ngọt</Link></li>
                                <li><Link to="/category/salty">Đồ mặn</Link></li>
                                <li><Link to="/category/vegan">Món ăn chay</Link></li>
                                <li><Link to="/category/seafood">Món hải sản</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/wishlist">Yêu thích</Link></li>
                    <li><Link to="/about">Giới thiệu</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;