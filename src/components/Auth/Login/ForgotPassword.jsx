import { useState } from 'react';
import Layout from '../../Partials/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../service/authService';
import { useNavigate,Link } from 'react-router-dom';

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
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
            } else {
                toast.error('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        }

        setLoading(false);
    };

    return (
        <Layout>
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
                                placeholder="Enter your email"
                                className="w-full h-[50px] p-3 border border-[#E0E0E0] rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full h-[50px] font-semibold bg-black text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-purple'}`}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <span className="text-base text-qyellow">Remembered your password? <Link to="/login" className="text-blue-500">Login</Link></span>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
