import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate

const Header = () => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false); // Quản lý ẩn/hiện gợi ý

    const navigate = useNavigate();
    const searchRef = useRef(null); // Dùng để nhận biết khi click ra ngoài thanh tìm kiếm

    // Danh sách các quận gợi ý
    const hanoiDistricts = [
        "Quận Hoàn Kiếm",
        "Quận Đống Đa",
        "Quận Ba Đình",
        "Quận Hai Bà Trưng",
        "Quận Tây Hồ",
        "Quận Cầu Giấy"
    ];

    // Hàm tắt gợi ý khi click ra ngoài vùng tìm kiếm
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Hàm xử lý khi click vào một Quận
    const handleDistrictClick = (district) => {
        setShowSuggestions(false); // Đóng gợi ý
        // Chuyển sang trang search và truyền tên quận lên thanh URL
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
                    {/* Bọc thanh search bằng div có ref */}
                    <div className="search" ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo quận, tên quán..."
                            onClick={() => setShowSuggestions(true)} // Mở gợi ý khi click
                        />
                        <i className="bx bx-search" />

                        {/* Hộp thoại gợi ý thả xuống */}
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
            {/* ... Phần menu bên dưới giữ nguyên ... */}
        </>
    );
};

export default Header;