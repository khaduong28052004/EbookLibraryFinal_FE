import { useState, useEffect } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../service/authService';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function UpdatePassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [otpToken, setOtpToken] = useState("");

    // Extract OTP token from the URL query parameter
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const otp = queryParams.get('otp');
        setOtpToken(otp);
    }, [location]);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp!");
            setLoading(false);
            setError(false);
            return;
        }

        try {
            if (!email || !otpToken) {
                toast.error("Email và OTP không được để trống!");
                setLoading(false);
                setError(false);
                return;
            }
            const data = {
                email: email,
                otp: otpToken,
                newpass: password,
            };
            const response = await AuthService.verifyOTP(data);
            if (response.status) {
                toast.success("Đổi mật khẩu thành công!");
                setError(true);
                setTimeout(() => {
                    navigate('/login');
                }, 4000);
            } else {
                setError(false);
                toast.error("Đổi mật khẩu không thành công!");
            }
        } catch (error) {
            setError(false);
            console.log(error);
            toast.error(error?.response?.data?.message || "Lỗi đặt lại mật khẩu không thành công!.");
        }

        setLoading(false);
    };

    return (
        <Layout childrenClasses=" pt-0 pb-0">
            <div className="update-password-page-wrapper w-full py-10">
                <div className="container-x mx-auto flex justify-center">
                    <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] rounded-md shadow-md">
                        <form onSubmit={handleUpdatePassword}>
                            <div className="input-item mb-5">
                                <label htmlFor="email" className="text-sm text-black">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email"
                                    className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error
                                            ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                />
                            </div>
                            <div className="input-item mb-5">
                                <label htmlFor="password" className="text-sm text-black">Nhập mật khẩu mới:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới"
                                    // className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                    className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error
                                            ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                />
                            </div>
                            <div className="input-item mb-5">
                                <label htmlFor="confirmPassword" className="text-sm text-black">Xác nhận mật khẩu:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Xác nhận mật khẩu"
                                    // className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                    className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${
                                        error
                                        ?  "border-green-300 bg-green-300":"border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center rounded-md"
                                disabled={loading}
                            >
                                {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                            </button>
                        </form>
                        <div className="text-center mt-6">
                            <span className="text-base text-qyellow">Nhớ mật khẩu? <Link to="/login" className="text-blue-500">Đăng nhập</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
