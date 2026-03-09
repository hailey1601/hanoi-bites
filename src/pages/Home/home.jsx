import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./home.css";
import dbData from "../../../db.json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
  const navigate = useNavigate();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const handleAiSearch = async () => {
    if (!aiPrompt.trim()) {
      alert("Bạn hãy nhập yêu cầu để AI gợi ý nhé!");
      return;
    }

    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const restaurants = dbData.restaurants;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const promptText = `
        Bạn là trợ lý ẩm thực thông minh của app Hanoi Bites.
        Đây là danh sách các quán ăn hiện có trong hệ thống:
        ${JSON.stringify(restaurants)}

        Người dùng đang yêu cầu: "${aiPrompt}"

        Hãy phân tích yêu cầu này, đối chiếu với danh mục, giá tiền và địa chỉ để chọn ra 1 quán ăn phù hợp nhất.
        BẠN CHỈ ĐƯỢC PHÉP TRẢ VỀ DUY NHẤT 1 ĐOẠN JSON CHÍNH XÁC NHƯ SAU, KHÔNG THÊM BẤT KỲ VĂN BẢN NÀO KHÁC:
        {
          "id": <id_quán_ăn>,
          "reason": "<một câu ngắn gọn, thân thiện giải thích tại sao lại chọn quán này cho người dùng>"
        }
      `;

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(promptText);
      const responseText = result.response.text();

      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiResult = JSON.parse(cleanJson);

      alert(`✨ Trợ lý AI: ${aiResult.reason}`);
      navigate(`/restaurant/${aiResult.id}`);

    } catch (error) {
      console.error("Chi tiết lỗi AI:", error);
      alert("Hệ thống AI đang bảo trì. Vui lòng thử lại sau!");
    } finally {
      setIsAiLoading(false);
    }
  };

  const categories = [
    {
      name: "Đồ ngọt",
      icon: "bx-cake",
      desc: "Cảm giác ngọt ngào của bánh làm tan chảy mọi lo âu.",
      link: "/category/sweet",
      class: "ngot",
    },
    {
      name: "Đồ mặn",
      icon: "bxs-pizza",
      desc: "Các loại đồ mặn từ khắp nơi trên thế giới đều có một chuyện kể về hương vị.",
      link: "/category/salty",
      class: "man",
    },
    {
      name: "Món ăn chay",
      icon: "bxs-cheese",
      desc: "Hành trình khám phá hương vị thuần khiết.",
      link: "/category/vegan",
      class: "chay",
    },
    {
      name: "Món hải sản",
      icon: "bx-fork",
      desc: "Ăn xong có cảm giác chúng ta đang ở biển vậy.",
      link: "/category/seafood",
      class: "seafood",
    },
  ];

  const posts = [
    {
      title: "Tora Tora",
      img: "/img/tora.png",
      addr: "21 Hàng Hòm, Hoàn Kiếm",
      time: "18:30 - 23:00 (T2 - T5) | 18:30 - 24:00 (T6 - CN)",
      price: "300.000đ - 500.000đ/người",
      class: "fp",
    },
    {
      title: "Izakaya Matsuki",
      img: "/img/izakaya.png",
      addr: "26 Linh lang, Ba Đình",
      time: "17:00 - 1:00",
      price: "300.000đ - 400.000đ",
      class: "sp",
    },
    {
      title: "Toast",
      img: "/img/toast2.png",
      addr: "340 Thái Hà, Đống Đa",
      time: "8:00 - 23:00",
      price: "50.000đ - 65.000đ",
      link: "/post/toast",
      class: "tp",
    },
  ];

  return (
    <>
      <div className="main">
        <video autoPlay loop muted playsInline className="video-background">
          <source
            src="/cooking.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay"></div>
        <Header />

        <div className="d2">
          <div>
            <label className="c1">
              {" "}
              QUÁN ĂN <br /> NGON{" "}
            </label>{" "}
            <br />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%", maxWidth: "600px", marginTop: "30px", zIndex: 10 }}>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="VD: Gợi ý quán nhiều protein để ăn sau khi tập tạ..."
                style={{
                  flex: 1, padding: "15px 25px", borderRadius: "30px", border: "none",
                  outline: "none", fontSize: "1rem", boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              />
              <button
                onClick={handleAiSearch}
                disabled={isAiLoading}
                style={{
                  background: "var(--primary-gold)", color: "white", border: "none",
                  padding: "0 30px", borderRadius: "30px", cursor: "pointer",
                  fontWeight: "bold", fontSize: "1rem", transition: "0.3s",
                  boxShadow: "0 4px 15px rgba(195, 162, 92, 0.4)"
                }}
              >
                {isAiLoading ? "Đang xử lý..." : "Hôm nay ăn gì?"}
              </button>
            </div>
          </div>

          {aiResponse && (
            <div style={{
              marginTop: "20px", background: "rgba(255, 255, 255, 0.95)", padding: "20px",
              borderRadius: "15px", maxWidth: "600px", color: "#333", zIndex: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              display: "flex", flexDirection: "column", gap: "15px", textAlign: "left"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--primary-gold)", fontWeight: "bold", fontSize: "1.2rem" }}>
                ✨ Trợ lý AI Hanoi Bites
              </div>
              <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: "1.5" }}>{aiResponse.reason}</p>
              <button
                onClick={() => navigate(`/restaurant/${aiResponse.id}`)}
                style={{
                  background: "var(--dark-bg)", color: "white", border: "none", padding: "10px 20px",
                  borderRadius: "20px", cursor: "pointer", alignSelf: "flex-end", fontWeight: "600"
                }}
              >
                Xem quán này ➔
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
            <button className="morein4" style={{ cursor: "pointer", marginTop: 0 }}>
              THÊM THÔNG TIN
            </button>
          </div>
          <div className="dk">
            <div className="dk2"><hr className="duongke2" /></div>
            <div className="dk3"><hr className="duongke3" /></div>
            <div className="dk4"><hr className="duongke4" /></div>
          </div>
        </div>

        <div className="d3">
          <label className="c2"> vietvana17@gmail.com </label>
          <label className="c3"> +84 917 26 515 </label>
        </div>
      </div>

      <div className="sub-main">
        <div className="d4">
          <label className="tenmuc"> Bài đăng mới nhất </label>
        </div>
        <div className="d5">
          <p> Khám phá các quán ăn và chia sẻ quan điểm thông qua các bài viết </p>
        </div>

        <div className="d6">
          {posts.map((post, index) => (
            <div className={post.class} key={index}>
              {post.link ? (
                <Link to={post.link} style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={post.img} alt={post.title} /> <br />
                  <label> {post.title} </label>
                  <p>
                    [ {post.addr} ] <br />⏰ {post.time} <br />
                    💵 {post.price}
                  </p>
                </Link>
              ) : (
                <>
                  <img src={post.img} alt={post.title} /> <br />
                  <label> {post.title} </label>
                  <p>
                    [ {post.addr} ] <br />⏰ {post.time} <br />
                    💵 {post.price}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="more">
        <label> Xem thêm </label>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map((category, index) => (
          <div className={category.class} key={index} style={{ width: "50%" }}>
            <Link to={category.link} style={{ textDecoration: "none" }}>
              <i
                className={`bx ${category.icon}`}
                style={{ fontSize: "30px", marginTop: "50px", marginLeft: "60px", color: "white" }}
              />{" "}
              <br />
              <label style={{ fontSize: "22px", marginLeft: "60px", color: "white", cursor: "pointer" }}>
                {" "}
                {category.name}{" "}
              </label>{" "}
              <br />
              <p style={{ fontFamily: "Lucida Sans", fontSize: "14px", marginLeft: "60px", color: "white" }}>
                {category.desc}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Home;