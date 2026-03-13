import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./signup.css";

const MySwal = withReactContent(Swal);

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
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

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        try {
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

            const existingUser = storedUsers.find(user => user.email === formData.email);

            if (existingUser) {
                setErrorMsg("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
                setIsLoading(false);
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                email: formData.email,
                username: formData.username,
                password: formData.password,
                wishlist: []
            };

            storedUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(storedUsers));

            localStorage.setItem("currentUser", JSON.stringify(newUser));

            MySwal.fire({
                title: 'Chào mừng!',
                text: 'Đăng ký tài khoản thành công! Chào mừng bạn đến với Hanoi Bites.',
                icon: 'success',
                confirmButtonText: 'Tuyệt vời',
                confirmButtonColor: '#8B4513',
                timer: 2000
            }).then(() => {
                navigate("/");
            });

        } catch (error) {
            console.error("Lỗi Đăng Ký:", error);
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
                    <form onSubmit={handleRegisterSubmit}>
                        <h1> Đăng ký </h1>

                        {errorMsg && (
                            <div className="auth-error">
                                {errorMsg}
                            </div>
                        )}

                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
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
                                <input type="checkbox" required /> Tôi đồng ý với các điều khoản
                            </label>
                        </div>

                        <button type="submit" className="btn" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng ký"}
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