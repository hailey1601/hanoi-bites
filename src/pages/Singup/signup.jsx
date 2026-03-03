import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./signup.css";

const Register = () => {
    return (
        <>
            <Header />

            <div className="main2">
                <div className="auth-box">
                    <form>
                        <h1> Đăng ký </h1>

                        <div className="input-box">
                            <input type="email" placeholder="Nhập gmail/số điện thoại" required />
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div className="input-box">
                            <input type="text" placeholder="Tên đăng nhập" required />
                            <i className="bx bxs-user"></i>
                        </div>

                        <div className="input-box">
                            <input type="password" placeholder="Mật khẩu" required />
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" required /> Tôi đồng ý với các điều khoản
                            </label>
                        </div>

                        <button type="submit" className="btn">
                            Đăng ký
                        </button>

                        <div className="register-link">
                            <p>
                                Đã có tài khoản? <Link to="/login"> Đăng nhập </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;