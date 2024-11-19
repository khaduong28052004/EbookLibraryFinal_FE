import { useState, useEffect } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../service/authService';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function UpdatePassword() {
    const [email, setEmail] = useState("");
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
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            if (!email || !otpToken) {
                toast.error("Email or OTP token is missing.");
                setLoading(false);
                return;
            }

            const data = {
                email: email,
                otp: otpToken,
                newpass: password,
            };
            const response = await AuthService.verifyOTP(data);
            if (response.status) {
                toast.success("Password updated successfully!");
                navigate('/login');
            } else {
                toast.error("Failed to update password. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }

        setLoading(false);
    };

    return (
        <Layout childrenClasses=" pt-0 pb-0">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 9999 }}
            />
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
                                    className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
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
                                    className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
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
                                    className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
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
