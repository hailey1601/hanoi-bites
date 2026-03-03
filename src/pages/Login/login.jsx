import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./login.css";

const Login = () => {
    return (
        <>
            <Header />

            <div className="main2">
                <div className="auth-box">
                    <form>
                        <h1> Đăng nhập </h1>

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
                                <input type="checkbox" /> Ghi nhớ tôi
                            </label>
                            <Link to="/forgot-password"> Quên mật khẩu? </Link>
                        </div>

                        <button type="submit" className="btn">
                            Đăng nhập
                        </button>

                        <div className="register-link">
                            <p>
                                Chưa có tài khoản? <Link to="/signup"> Đăng ký </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;