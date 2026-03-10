import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./login.css";

const MySwal = withReactContent(Swal);

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        try {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

            const user = storedUsers.find(
                u => (u.username === formData.username || u.email === formData.username) &&
                    u.password === formData.password
            );

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));

                MySwal.fire({
                    title: 'Thành công!',
                    text: 'Đăng nhập thành công!',
                    icon: 'success',
                    confirmButtonText: 'Tuyệt vời',
                    confirmButtonColor: '#8B4513',
                    timer: 2000
                }).then(() => {
                    navigate("/");
                });
            } else {
                setErrorMsg("Sai tên đăng nhập hoặc mật khẩu.");
            }
        } catch (error) {
            console.error("Lỗi Đăng nhập:", error);
            setErrorMsg("Đã xảy ra sự cố. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="main2">
                <div className="auth-box">
                    <form onSubmit={handleLoginSubmit}>
                        <h1> Đăng nhập </h1>

                        {errorMsg && (
                            <div style={{ color: "#ff4d4d", marginBottom: "15px", textAlign: "center", fontSize: "14px" }}>
                                {errorMsg}
                            </div>
                        )}

                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập hoặc Email"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-user"></i>
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> Ghi nhớ tôi
                            </label>
                            <Link to="/forgot-password"> Quên mật khẩu? </Link>
                        </div>

                        <button type="submit" className="btn" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
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