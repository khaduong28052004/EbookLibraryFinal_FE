import { useState } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../service/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // if (email.length < 0) {
            //     toast.warn("vui vòng điện email!");
            //     return;
            // }

            const response = await AuthService.Otp({ email });
            if (response.status) {
                toast.success('Gửi mail thành công vui lòng kiểm tra email để cập nhật mật khẩu!');
                setError(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(false);
                toast.error('Lỗi!.');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Thông báo lỗi vui lòng kiểm tra email !.');
        }

        setLoading(false);
    };

    return (
        <>
            {/* <ToastContainer
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
            /> */}
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-[#E0E0E0]">
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-qblack">Quên mật khẩu</h1>
                        <div className="mt-2 mb-4">
                            <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727" stroke="#FFBB38" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm text-black mb-1">Nhập email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email"
                                // className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${
                                    // errorFrom.usernameF === 1
                                    // ? "border-red-500 bg-red-400" // Error state
                                    // : errorFrom.usernameF === 2
                                    //   ? "border-green-500 bg-red-400" // Success state
                                    //   : ""
                                    error ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300"}`}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full h-[50px] font-semibold bg-black text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-purple'}`}
                            disabled={loading}
                        >
                            {loading ? 'đang Gửi...' : 'Gửi'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <span className="text-base text-qyellow">Bạn nhớ mật khẩu chưa Gửi? <Link to="/login" className="text-blue-500">Đăng nhập</Link></span>
                    </div>
                </div>
            </div>
        </>
    );
}
