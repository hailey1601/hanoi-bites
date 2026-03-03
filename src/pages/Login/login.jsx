import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import "./login.css";

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

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        try {
            const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`);
            const existingUsers = await checkUser.json();

            if (existingUsers.length > 0) {
                setErrorMsg("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
                setIsLoading(false);
                return;
            }

            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    wishlist: []
                }),
            });

            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi kết nối máy chủ.");
            }

            const newUser = await response.json();

            localStorage.setItem("currentUser", JSON.stringify(newUser));

            alert("Đăng ký tài khoản thành công! Chào mừng bạn đến với Hanoi Bites.");

            navigate("/");

        } catch (error) {
            console.error("Lỗi Đăng Ký:", error);
            setErrorMsg("Đã xảy ra sự cố mạng. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

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
}
    export default Login;