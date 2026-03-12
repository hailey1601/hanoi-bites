import React from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./About.css";

const About = () => {
    return (
        <>
            <Header />
            <div className="about-container">
                <div className="about-hero">
                    <h1>Về Hanoi Bites</h1>
                    <p>Khám phá bản sắc ẩm thực Thủ đô qua từng hương vị.</p>
                </div>
                
                <div className="about-content">
                    <div className="about-section">
                        <h2>Sứ mệnh của chúng tôi</h2>
                        <p>Hanoi Bites ra đời với mong muốn trở thành cẩm nang ẩm thực đáng tin cậy nhất dành cho người yêu thích đồ ăn Hà Nội. Chúng tôi mang đến cho bạn những đánh giá chân thực, các thông tin chi tiết và trải nghiệm trực quan nhất về các nhà hàng, quán ăn ngon từ khắp nẻo đường Thủ đô.</p>
                    </div>

                    <div className="about-section image-text">
                        <img src="/img/tora.png" alt="Hanoi Food" className="about-img"/>
                        <div>
                            <h2>Vì sao chọn Hanoi Bites?</h2>
                            <ul>
                                <li><strong>🔍 Tìm kiếm thông minh:</strong> Trang bị trợ lý AI giúp bạn dễ dàng tìm được quán ăn ưng ý.</li>
                                <li><strong>🌟 Đánh giá công tâm:</strong> Tổng hợp thông tin từ những người yêu ẩm thực chân chính.</li>
                                <li><strong>🍲 Đa dạng lựa chọn:</strong> Hệ thống phân chia danh mục rõ ràng từ đồ ăn mặn, đồ ngọt đến thực đơn ăn chay và hải sản tươi sống.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="about-section team-section">
                        <h2>Đội ngũ phát triển</h2>
                        <p>Chúng tôi là những con người mang trong mình niềm đam mê bất tận với ẩm thực Hà Nội. Hi vọng Hanoi Bites sẽ là người bạn đồng hành hữu ích cùng bạn trải nghiệm trọn vẹn văn hoá ăn uống đầy màu sắc này!</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
