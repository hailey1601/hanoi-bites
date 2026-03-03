import React, { useState } from "react";
import { Link } from "react-router-dom"; 

const Header = () => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <>
            <div className="d1">
                <div>
                    <img src="/img/logo.png" alt="Logo" />
                </div>
                <form>
                    <div className="search">
                        <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        <i className="bx bx-search" />
                    </div>
                </form>
                <div className="login">
                    <i className="bx bx-user" />
                    <button>
                        <Link to="/login">Đăng nhập</Link>
                    </button>
                    <label> / </label>
                    <button>
                        <Link to="/signup">Đăng ký</Link>
                    </button>
                </div>
            </div>

            <hr className="duongke" />

            <div className="menu">
                <ul>
                    <li>
                        <Link to="/"> Trang chủ </Link>
                    </li>
                    <li>
                        <span
                            style={{ cursor: "pointer", fontWeight: 600, color: "var(--text-main)", textTransform: "uppercase", fontSize: "0.9rem" }}
                            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                        >
                            Quán ăn
                            <i
                                className={`bx bx-chevron-${isSubMenuOpen ? "up" : "down"}`}
                                style={{ marginLeft: "5px" }}
                            ></i>
                        </span>
                        {isSubMenuOpen && (
                            <ul className="sub-menu active">
                                <li><Link to="/category/sweet"> Đồ ngọt </Link></li>
                                <li><Link to="/category/vegan"> Đồ chay </Link></li>
                                <li><Link to="/category/salty"> Đồ mặn </Link></li>
                                <li><Link to="/category/seafood"> Đồ hải sản </Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/favorites"> Yêu thích </Link></li>
                    <li><Link to="/info"> Thông tin </Link></li>
                    <li><Link to="/contact"> Liên hệ </Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;