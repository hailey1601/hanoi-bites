import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

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

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }

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

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/");
    };

    return (
        <>
            <div className="d1">
                <div className="header__left">
                    <Link to="/">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                </div>

                <div className="header__center">
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
                </div>

                <div className="login header__right">
                    <i className="bx bx-user header__user-icon" />
                    {currentUser ? (
                        <>
                            <span className="header__greeting">
                                Xin chào, {currentUser.username}!
                            </span>
                            <button onClick={handleLogout} className="header__logout">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <button><Link to="/login">Đăng nhập</Link></button>
                            <label className="header__separator"> / </label>
                            <button><Link to="/signup">Đăng ký</Link></button>
                        </>
                    )}
                </div>
            </div >

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