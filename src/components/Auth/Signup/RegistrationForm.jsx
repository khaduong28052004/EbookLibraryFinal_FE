import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputCom from "./InputCom";
import Thumbnail from "./Thumbnail";
import OTPInput from './OTPInput';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../../service/authService";
const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        fullname: ''
    });
    const [otpMethod, setOtpMethod] = useState('email');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateStep1 = () => {
        let isValid = true;
        let errors = {};

        if (!formData.fullname.trim()) {
            errors.fullname = 'Full name is required';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10,}$/.test(formData.phone)) {
            errors.phone = 'Invalid phone number';
            isValid = false;
        }

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleProceed = async () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2) {
            // try {//localhost:8080/login
            //     const response = await fetch('/api/v1/user/send-otpe', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             username: formData.username,
            //             email: formData.email,
            //             method: otpMethod
            //         }),
            //     });
            //     const data = await response.json();
            //     if (data.message.includes("OTP đã được gửi")) {
            //         setStep(3);
            //     } else {
            //         setError({ otpSend: data.message || 'Failed to send OTP' });
            //     }
            // } catch (error) {
            //     setError({ otpSend: 'Failed to send OTP' });
            // }
            const response = await AuthService.login({
                username,
                password,
                captchaToken,
              });
            console.log(response);
            toast.success("Gửi otp thành công!");
        }
    };

    const handleRegister = async () => {


        const token = import.meta.env.VITE_TOKEN_HUNTER;
        const response = await axios(`https://api.hunter.io/v2/email-verifier?email=${formData.email}&api_key=${token}`);
        console.log(response);
        if (response?.data?.data?.status === "valid") {
          try {
            const response = await AuthService.registerV2(formData, otpToken, formData.email);
            if (response.status === 200) {
              toast.success("Đăng ký thành công");
              setTimeout(() => {
                navigate('/login');
              }, 2000);
            } else {
              toast.error("đăng ký thất bại,", response.data);
            }
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data || " Lỗi!");
          }
          console.log("oke");
        } else {
          toast.error("(" + formData.email + ")" + " Email Không tồn tại!");
          console.log("ko oke");
    
        }
        // try {
        //     const response = await fetch('/api/v2/user/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             ...formData,
        //             otp
        //         }),
        //     });
        //     const data = await response.json();
        //     if (data.code === 200) {
        //         alert('Registration successful!');
        //         // Redirect or do something else after successful registration
        //     } else {
        //         setError({ registration: data.message || 'Registration failed' });
        //     }
        // } catch (error) {
        //     setError({ registration: 'Registration failed' });
        // }
    };

    return (
        <div className="login-page-wrapper w-full py-10">
            <div className="container-x mx-auto">
                <div className="lg:flex items-center relative">
                    {step === 1 && (
                        <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                            <div className="w-full">
                                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                                        Đăng ký
                                    </h1>
                                    <div className="shape -mt-6">
                                        <svg
                                            width="354"
                                            height="30"
                                            viewBox="0 0 354 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                                                stroke="#FFBB38"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                                            <InputCom
                                                placeholder="Họ và tên"
                                                label="Họ và tên :"
                                                name="fullname"
                                                type="text"
                                                inputHandler={handleInputChange}
                                                value={formData.fullname}
                                            />
                                            <InputCom
                                                placeholder="09039 *********"
                                                label="Số điện thoại :"
                                                name="phone"
                                                type="text"
                                                inputHandler={handleInputChange}
                                                value={formData.phone}
                                            />
                                        </div>
                                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                                            <InputCom
                                                placeholder="Tài khoản..."
                                                label="Tài khoản :"
                                                name="username"
                                                type="text"
                                                inputHandler={handleInputChange}
                                                value={formData.username}
                                            />
                                            <InputCom
                                                placeholder="Demo@gmail.com"
                                                label="Email :"
                                                name="email"
                                                type="email"
                                                inputHandler={handleInputChange}
                                                value={formData.email}
                                            />
                                        </div>
                                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                                            <InputCom
                                                placeholder="Mật khẩu"
                                                label="Mật khẩu :"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                inputHandler={handleInputChange}
                                                value={formData.password}
                                            >
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </InputCom>
                                            <InputCom
                                                placeholder="Xác nhận mật khẩu"
                                                label="Xác nhận mật khẩu :"
                                                name="confirmPassword"
                                                type={showRePassword ? "text" : "password"}
                                                inputHandler={handleInputChange}
                                                value={formData.confirmPassword}
                                            >
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                    onClick={() => setShowRePassword(!showRePassword)}
                                                >
                                                    {showRePassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </InputCom>
                                        </div>
                                        {Object.keys(error).length > 0 && (
                                            <div className="error-messages text-red-500 mb-4">
                                                {Object.values(error).map((err, index) => (
                                                    <p key={index}>{err}</p>
                                                ))}
                                            </div>
                                        )}
                                        <div className="signin-area mb-3">
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={handleProceed}
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                >
                                                    Tiếp tục
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="signup-area flex justify-center">
                                        <p className="text-base text-qgraytwo font-normal">
                                            Đã có tài khoản?
                                            <Link to="/login" className="ml-2 text-qblack">
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Chọn phương thức gửi OTP</h2>
                            <div className="space-y-4">
                                <button
                                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                                        otpMethod === "email"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-700 border border-gray-300"
                                    }`}
                                    onClick={() => setOtpMethod("email")}
                                >
                                    Gửi qua Email
                                </button>
                                <button
                                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                                        otpMethod === "phone"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-700 border border-gray-300"
                                    }`}
                                    onClick={() => setOtpMethod("phone")}
                                >
                                    Gửi qua Số điện thoại
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleProceed}
                                className="mt-6 w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all"
                            >
                                Gửi OTP
                            </button>
                            {error.otpSend && <p className="text-red-500 mt-2 text-center">{error.otpSend}</p>}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] rounded-2xl shadow-lg">
                            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                                    Nhập OTP và Hoàn tất Đăng ký
                                </h2>
                                <div className="flex flex-row text-center text-sm font-medium text-gray-400 mb-4">
                                    <p>Chúng tôi đã gửi mã OTP đến {otpMethod === 'email' ? formData.email : formData.phone}</p>
                                </div>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                                            <OTPInput length={6} onComplete={setOtp} />
                                        </div>
                                        <button
                                            onClick={handleRegister}
                                            className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            Hoàn tất Đăng ký
                                        </button>
                                    </div>
                                </form>
                                {error.registration && <p className="text-red-500 mt-2 text-center">{error.registration}</p>}
                            </div>
                        </div>
                    )}

                    <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
                        <div
                            className="absolute xl:-right-20 -right-[138px]"
                            style={{ top: "calc(50% - 258px)" }}
                        >
                            <Thumbnail />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;

