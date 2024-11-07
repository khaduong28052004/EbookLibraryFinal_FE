import { useState } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../service/authService';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await AuthService.Otp({ email });
            if (response.status) {
                toast.success('Link to reset your password has been sent!');
                navigate('/login');
            } else {
                toast.error('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
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
            <div className="forgot-password-page-wrapper w-full py-10">
                <div className="container-x mx-auto justify-center">
                    <div className="lg:flex items-center relative">
                        <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                            <div className="w-full ">
                                {/* <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">Quên mật khẩu</h1>
                  <div className="shape -mt-6">
                    <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727" stroke="#FFBB38" />
                    </svg>
                  </div>
                </div> */}

                                <form onSubmit={handleForgotPassword}>
                                    <div className="input-item mb-5">
                                        <label htmlFor="email" className="text-sm text-black">Nhập email : </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </form>
                                <div className="social-login-buttons flex justify-center mt-6">
                                    <span className="text-base text-qyellow">Remembered your password? <a href="/login" className="text-blue-500">Login</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
