import React from "react";
import { Link } from "react-router-dom"; // Import thẻ Link

const Footer = () => {
    return (
        <div className="sub-main4">
            <div className="o1">
                <h2> Ăn giúp bạn có năng lượng </h2>
                <i className="bx bxl-instagram" />
                <i className="bx bxl-facebook-circle" />
                <i className="bx bxl-tiktok" />
            </div>
            <div className="o2">
                <h2> Liên hệ </h2>
                <label> vietvana17@gmail.com </label> <br />
                <label> +84 917 26 515 </label>
            </div>
            <div className="o3">
                <h2> Liên kết hữu ích </h2>
                <label><Link to="/"> Trang chủ </Link></label> <br />
                <label><Link to="/info"> Thông tin </Link></label> <br />
                <label><Link to="/restaurants"> Quán ăn </Link></label> <br />
                <label><Link to="/feedback"> Gửi góp ý </Link></label> <br />
            </div>
            <div className="o4">
                <h2> Các thể loại món ăn </h2>
                <label><Link to="/category/sweet"> Đồ ngọt </Link></label> <br />
                <label><Link to="/category/vegan"> Đồ chay </Link></label> <br />
                <label><Link to="/category/salty"> Đồ mặn </Link></label> <br />
                <label><Link to="/category/seafood"> Đồ hải sản </Link></label> <br />
            </div>
        </div>
    );
};

export default Footer;