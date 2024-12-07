import { useState, useEffect } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import InputCom from "../../Helpers/InputCom";
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


    const [showRePassword, setShowRePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Extract OTP token from the URL query parameter
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const otp = queryParams.get('otp');
        setOtpToken(otp);
    }, [location]);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(otpToken==""){
            toast.error("Địa chỉ from không tồn tại!");
            setLoading(false);
            setError(false);
        }
        if (!email || !password || !confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            setLoading(false);
            setError(false);
            return;
        }

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
            toast.error(error?.response?.data?.message || "Lỗi đặt lại mật khẩu không thành công vui lòng kiểm tra lại!.");
        }

        setLoading(false);
    };

    return (
        <Layout childrenClasses=" pt-0 pb-0">
            <div className="update-password-page-wrapper w-full py-10">
                <div className="container-x mx-auto flex justify-center">

                    <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] rounded-md shadow-md">
                        <div className="text-center mb-7">
                            <h1 className="text-2xl font-bold text-qblack">Cập nhật mật khẩu mới</h1>
                            <div className="mt-2 mb-4">
                                <svg width="472" height="40" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727" stroke="#FFBB38" />
                                </svg>
                                
                            </div>
                            
                        </div>
                        <form onSubmit={handleUpdatePassword}>
                            <div className="input-item mb-5">
                                {/* <label htmlFor="email" className="text-sm text-black">Email:</label> */}
                                <InputCom
                                    label="Email:"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    inputHandler={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email"
                                    inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error
                                        ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                />
                            </div>
                            <div className="input-item mb-5">
                                {/* <label htmlFor="password" className="text-sm text-black">Nhập mật khẩu mới:</label> */}
                                <InputCom
                                    label="Xác nhận mật khẩu :"
                                    id="password"
                                    name="password"
                                    value={password}
                                    inputHandler={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới"
                                    // className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                    type={showRePassword ? "text" : "password"}
                                    inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error
                                        ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                >
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowRePassword(!showRePassword)}
                                    >
                                        {showRePassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        }
                                    </button>
                                </InputCom>
                            </div>
                            <div className="input-item mb-5">
                                {/* <label htmlFor="confirmPassword" className="text-sm text-black">Xác nhận mật khẩu:</label> */}
                                <InputCom
                                    type={showPassword ? "text" : "password"}
                                    label="Xác nhận mật khẩu :"

                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    inputHandler={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Xác nhận mật khẩu"
                                    // className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                    inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error
                                        ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                                        // : errorFrom.usernameF === 2
                                        //   ? "border-green-500 bg-red-400" // Success state
                                        //   : ""
                                        }`}
                                    required
                                >  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                        {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        }
                                    </button>
                                </InputCom>
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
