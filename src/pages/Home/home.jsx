import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./home.css";
import dbData from "../../../db.json";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MySwal = withReactContent(Swal);

const Home = () => {
  const navigate = useNavigate();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSearch = async () => {
    if (!aiPrompt.trim()) {
      MySwal.fire({
        title: 'Lưu ý!',
        text: 'Bạn hãy nhập yêu cầu để AI gợi ý nhé!',
        icon: 'warning',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#8B4513'
      });
      return;
    }

    setIsAiLoading(true);
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

      MySwal.fire({
        title: '✨ Trợ lý AI:',
        text: aiResult.reason,
        icon: 'info',
        confirmButtonText: 'Tuyệt vời',
        confirmButtonColor: '#8B4513',
        timer: 3500
      }).then(() => {
        navigate(`/restaurant/${aiResult.id}`);
      });

    } catch (error) {
      console.error("Chi tiết lỗi AI:", error);
      MySwal.fire({
        title: 'Rất tiếc!',
        text: 'Hệ thống AI đang bảo trì. Vui lòng thử lại sau!',
        icon: 'error',
        confirmButtonText: 'Đóng',
        confirmButtonColor: '#8B4513'
      });
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
          <div className="ai-search">
            <div className="ai-search__row">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="VD: Gợi ý quán nhiều protein để ăn sau khi tập tạ..."
                className="ai-search__input"
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              />
              <button
                onClick={handleAiSearch}
                disabled={isAiLoading}
                className="ai-search__button"
              >
                {isAiLoading ? "Đang xử lý..." : "Hôm nay ăn gì?"}
              </button>
            </div>
          </div>

          <div className="home-moreinfo">
            <button className="morein4 home-moreinfo__button">
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
          {posts.map((post, index) => {
            const targetLink = post.link || (index === 0 ? "/restaurant/1" : index === 1 ? "/restaurant/16" : "/restaurants");
            return (
              <div className={post.class} key={index}>
                <Link to={targetLink} className="home-postlink">
                  <img src={post.img} alt={post.title} /> <br />
                  <label className="home-postlink__title"> {post.title} </label>
                  <p>
                    [ {post.addr} ] <br />⏰ {post.time} <br />
                    💵 {post.price}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/restaurants" className="more home-morelink">
        <label className="home-morelink__label"> Xem thêm </label>
      </Link>

      <div className="home-categories">
        {categories.map((category, index) => (
          <div className={`${category.class} home-categories__item`} key={index}>
            <Link to={category.link} className="home-categories__link">
              <i
                className={`bx ${category.icon} home-categories__icon`}
              />{" "}
              <br />
              <label className="home-categories__label">
                {" "}
                {category.name}{" "}
              </label>{" "}
              <br />
              <p className="home-categories__desc">
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