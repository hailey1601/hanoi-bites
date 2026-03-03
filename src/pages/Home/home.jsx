import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./home.css";

const Home = () => {
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
      img: "./img/tora.png",
      addr: "21 Hàng Hòm, Hoàn Kiếm",
      time: "18:30 - 23:00 (T2 - T5) | 18:30 - 24:00 (T6 - CN)",
      price: "300.000đ - 500.000đ/người",
      class: "fp",
    },
    {
      title: "Izakaya Matsuki",
      img: "./img/izakaya.png",
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
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
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
          <button style={{ cursor: "pointer" }} className="morein4">
            THÊM THÔNG TIN
          </button>
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