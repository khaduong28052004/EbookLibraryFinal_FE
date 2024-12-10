import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import InputCom from "./InputCom";
import Thumbnail from "./Thumbnail";
import OTPInput from './OTPInput';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpService from "../../../service/optService";
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
// import { toast } from "react-toastify";

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
    const [countdown, setCountdown] = useState(180); // 180 seconds = 3 minutes
    const [checked, setValue] = useState(false);
    const navigate = useNavigate();
    // const [megessa, setmegessa] = useState
    // const [megessa, setmegessa] = useState("");

    // const showErrorMessages = () => {
    //     if (megessa.length > 0) {
    //         const errorMessages = megessa.map((msg, index) => (
    //             <div key={index} className="text-sm text-red-500">{msg}</div>
    //         ));
    //         toast.error(
    //             <div>
    //                 {errorMessages}
    //             </div>
    //         );
    //     }
    // };

    const [errorFrom, seterrorFrom] = useState({
        usernameF: 0,
        passwordF: 0,
        fullnameF: 0,
        emailF: 0,
        phoneF: 0,
        confirmPasswordF: 0,
    });

    useEffect(() => {
        // validateStep1();
        let strength = "";
        let passwordMessage = "";
        const hasNumber = /[0-9]/.test(formData?.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData?.password);
        const hasUpperCase = /[A-Z]/.test(formData?.password);
        const isLongEnough = formData?.password.length >= 8;

        if (!isLongEnough) {
            strength = "weak";
            passwordMessage = "Mật khẩu cần ít nhất 8 ký tự!";
            setError((prev) => ({ message: passwordMessage, }));
        } else {
            if (hasNumber && hasSpecialChar && hasUpperCase) {
                strength = "strong";
                passwordMessage = "Mật khẩu mạnh!";
                setError((prev) => ({ message: passwordMessage, }));
            } else if (hasNumber || hasSpecialChar || hasUpperCase) {
                strength = "medium";
                passwordMessage = "Mật khẩu trung bình!";
                setError((prev) => ({ message: passwordMessage, }));
            } else {
                strength = "weak";
                passwordMessage = "Mật khẩu yếu!";
                setError((prev) => ({ message: passwordMessage, }));
            }
        }
        // if (formData.confirmPassword !== formData.password) {
        //     // setError((prev) => ({ message: "Mật khẩu không khớp!",}));
        // }
    }, [formData.password, formData.confirmPassword]);

    // Countdown logic
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    // Format countdown time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateInput(name, value);
    };

    const validateInput = (name, value) => {//check loi
        switch (name) {
            case "username":
                if (!formData.username.trim()) {
                    errors.username = 'Username is required';
                    seterrorFrom((prev) => ({ ...prev, usernameF: 1 }));
                    // toast.error("Vui lòng điền tên tài khoản!");
                    isValid = false;
                    return;
                } else {
                    seterrorFrom((prev) => ({ ...prev, usernameF: 0 }));
                }
                break;
            case "fullname":
                if (!formData.fullname.trim()) {
                    errors.fullname = 'Full name is required';
                    seterrorFrom((prev) => ({ ...prev, fullnameF: 1 }));
                    isValid = false;
                } else {
                    seterrorFrom((prev) => ({ ...prev, fullnameF: 0 }));
                    // seterrorFrom((prev) => ({ ...prev, fullnameF: 0, fullnameF: 0 }));
                }
                break;
            case "phone":

            case "email":

                break;
            case "password":
                // let strength = "";
                // let passwordMessage = "";
                // const hasNumber = /[0-9]/.test(value);
                // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                // const hasUpperCase = /[A-Z]/.test(value);
                // const isLongEnough = value.length >= 8;

                // if (!isLongEnough) {
                //   strength = "weak";
                //   passwordMessage = "Mật khẩu cần ít nhất 8 ký tự!";
                // } else {
                //   if (hasNumber && hasSpecialChar && hasUpperCase) {
                //     strength = "strong";
                //     passwordMessage = "Mật khẩu mạnh!";
                //   } else if (hasNumber || hasSpecialChar || hasUpperCase) {
                //     strength = "medium";
                //     passwordMessage = "Mật khẩu trung bình!";
                //   } else {
                //     strength = "weak";
                //     passwordMessage = "Mật khẩu yếu!";
                //   }
                // }

                // setError((prev) => ({
                //   ...prev,
                //   password: {
                //     error: !isLongEnough, // true if password is less than 8 characters
                //     strength: strength,
                //     message: passwordMessage,
                //   },
                // }));
                break;

            case "confirmPassword":
                // setError((prev) => ({
                //   ...prev,
                //   confirmPassword: {
                //     error: value !== formData.password,
                //     message: value !== formData.password ? "Mật khẩu không khớp!" : "",
                //   },


                // }));
                break;
            default:
                break;
        }
    };

    const validateStep1 = () => {
        let isValid = true;
        let errors = {};

        if (!formData.fullname.trim()) {
            errors.fullname = 'Vui lòng điền họ và tên!';
            // toast.error("Vui lòng điền họ và tên!");
            seterrorFrom((prev) => ({ ...prev, fullnameF: 1 }));
            isValid = false;
            // return;
        } else {
            seterrorFrom((prev) => ({ ...prev, fullnameF: 0 }));
            // seterrorFrom((prev) => ({ ...prev, fullnameF: 0, fullnameF: 0 }));
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Vui lòng điền số điện thoại!';
            // toast.error("Vui lòng điền số điện thoại!");
            seterrorFrom((prev) => ({ ...prev, phoneF: 1 }));

            isValid = false;
            // return;
        } else if (!/^\d{10,}$/.test(formData.phone)) {
            errors.phone = 'Số điện thoại không đúng định dạng!';
            // toast.error("Số điện thoại không đúng định dạng!");
            isValid = false;
            seterrorFrom((prev) => ({ ...prev, phoneF: 1 }));
            // return;
        } else {
            seterrorFrom((prev) => ({ ...prev, phoneF: 0 }));
        }

        if (!formData.username.trim()) {
            errors.username = 'Vui lòng điền tên tài khoản!';
            // toast.error("Vui lòng điền tên tài khoản!");
            seterrorFrom((prev) => ({ ...prev, usernameF: 1 }));
            isValid = false;
            // return;
        } else {
            seterrorFrom((prev) => ({ ...prev, usernameF: 0 }));
        }

        if (!formData.email.trim()) {
            errors.email = 'Vui lòng điền email!';
            seterrorFrom((prev) => ({ ...prev, emailF: 1 }));// toast.error("Vui lòng điền email!");
            isValid = false;
            // return;
            //    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email không đúng định dạng!';
            seterrorFrom((prev) => ({ ...prev, emailF: 1 }));
            // toast.error("Email không đúng định dạng!");
            isValid = false;
            // return;
        } else {
            seterrorFrom((prev) => ({ ...prev, emailF: 0 }));
        }

        if (!formData.password) {
            errors.password = 'Vui lòng điền mật khẩu!';
            // toast.error("Vui lòng điền mật khẩu!");
            isValid = false;
            seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
            // return;
        } else if (formData.password.length < 8) {
            errors.password = 'Mật khẩu phải >= 8 ký tự!';
            // toast.error("Mật khẩu phải >= 8 ký tự!");
            isValid = false;
            seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
            // return;
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password = 'Mật khẩu phải có ít nhất một kí tự viết Hoa!';
            isValid = false;
            seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            errors.password = 'Mật khẩu phải có ít nhất một kí tự đặt biệt!!';
            isValid = false;
            seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
        }
        else {
            seterrorFrom((prev) => ({ ...prev, passwordF: 0 }));
        }


        if (!formData.password.trim()) {
            errors.confirmPassword = 'Xác nhận mật khẩu sai!';
            seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 1 }));
            isValid = false;
            // return;
        } else if (formData.password !== formData.confirmPassword) {
            seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 1 }));
        } else {
            seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 0 }));
        }

        setError(errors);
        // Hiển thị lỗi qua toast
        if (!isValid) {
            const errorMessages = Object.values(errors).join("\n"); // Tạo chuỗi lỗi
            toast.error(
                <div>
                    {errorMessages.split("\n").map((msg, index) => (
                        <div key={index} className="text-sm text-red-500">{msg}</div>
                    ))}
                </div>
            );
        }
        return isValid;
    };

    const rememberMe = () => {
        setValue(!checked);
    };

    const [showRequirements, setShowRequirements] = useState(false); // Quản lý trạng thái hiển thị

    const apiCheckEmail = async () => {// không dùng được
        const token = import.meta.env.VITE_TOKEN_HUNTER;
        const response = await axios(`https://api.hunter.io/v2/email-verifier?email=${formData.email}&api_key=${token}`);
        console.log(response);
        if (response?.data?.data?.status === "valid") {
            return true;
        } else {
            toast.error("(" + formData.email + ")" + " Email Không tồn tại!");
            return false;
        }
    }

    const handleProceed = async () => {
        if (step === 1 && validateStep1()) {
            const token = import.meta.env.VITE_TOKEN_HUNTER;
            const response = await axios(`https://api.hunter.io/v2/email-verifier?email=${formData.email}&api_key=${token}`);
            console.log(response);
            if (response?.data?.data?.status === "valid") {

                seterrorFrom((prev) => ({ ...prev, usernameF: 2, fullnameF: 2, phoneF: 2, passwordF: 2, confirmPasswordF: 2, emailF: 2, }));
                console.log("data đăng ký:", formData);
                toast.success("Hoàn thành điền thông tin......tiếp tục!");
                setStep(2);

            } else {
                toast.error("(" + formData.email + ")" + " Email Không tồn tại!");
                setStep(1);
                return false;
            }

        } else if (step === 2) {
            console.log("data methor:", formData);
            console.log("methor:", otpMethod);
            const requestData = {
                method: otpMethod,
                phone: formData.phone,
                email: formData.email,
                fullname: formData.fullname,
                username: formData.username,
                password: formData.password
            };

            try {
                const response = await OtpService.otpV2(requestData);
                console.log(response);
                if (response.status == 200) {
                    setStep(3);
                    toast.success("Gửi Opt thành công!");
                }
                setStep(3);
            } catch (error) {
                if (error?.response?.status == 409) {
                    toast.error(error?.response?.data?.message || "lỗi1!");
                }
            }

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
            // const response = await AuthService.login({
            //     username,
            //     password,
            //     captchaToken,
            //   });
            // console.log(response);
            // toast.success("Gửi otp thành công!");
        }
    };

    const handleRegister = async () => {
        try {
            console.log("otp: ", otp);
            const response = await OtpService.registerV2(formData, otp);
            if (response.status === 200) {
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error("đăng ký thất bại,", response.data);
            }
            // setStep(3);
        } catch (error) {
            toast.error(error?.response?.data?.message || "đăng ký thất bại!");
            console.log("lỗi đăng ký!");
            // if (error?.response?.status == 409) {
            //     toast.error(error?.response?.data?.message || "lỗi2!");
            // }
        }
        // const token = import.meta.env.VITE_TOKEN_HUNTER;
        // const response = await axios(`https://api.hunter.io/v2/email-verifier?email=${formData.email}&api_key=${token}`);
        // console.log(response);
        // if (response?.data?.data?.status === "valid") {
        // try {
        //     const response = await AuthService.registerV2(formData, otpToken, formData.email);
        //     if (response.status === 200) {
        //         toast.success("Đăng ký thành công");
        //         setTimeout(() => {
        //             navigate('/login');
        //         }, 2000);
        //     } else {
        //         toast.error("đăng ký thất bại,", response.data);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     toast.error(error?.response?.data || " Lỗi!");
        // }
        // console.log("oke");
        // } else {
        //     toast.error("(" + formData.email + ")" + " Email Không tồn tại!");
        //     console.log("ko oke");

        // }
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

    const generatePassword = () => {
        const length = 16; // Adjusted length for the password
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let Password = "@";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            Password += charset[randomIndex];
        }
        setFormData((prev) => ({ ...prev, password: Password, confirmPassword: Password, }));
        return Password;
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
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.fullnameF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.fullnameF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
                                            />
                                            <InputCom
                                                placeholder="09039 *********"
                                                label="Số điện thoại :"
                                                name="phone"
                                                type="text"
                                                inputHandler={handleInputChange}
                                                value={formData.phone}
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.phoneF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.phoneF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
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
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.usernameF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.usernameF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
                                            />
                                            <InputCom
                                                placeholder="Demo@gmail.com"
                                                label="Email :"
                                                name="email"
                                                type="email"
                                                inputHandler={handleInputChange}
                                                value={formData.email}
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.emailF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.emailF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
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
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.passwordF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.passwordF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
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
                                                inputClasses={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.confirmPasswordF === 1
                                                    ? "ring-red-500 bg-red-100" // Lỗi
                                                    : errorFrom.confirmPasswordF === 2
                                                        ? "ring-green-500 bg-green-100" // Thành công
                                                        : "" // Mặc định
                                                    }`}
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
                                        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                                            <div className='w-[50%] flex justify-start' onMouseEnter={() => setShowRequirements(true)} onMouseLeave={() => setShowRequirements(false)}>
                                                <span className='text-black-400 text-start'>
                                                    {error ? (
                                                        <>{error?.message}</>
                                                    ) : (
                                                        <>yêu cầu!</>
                                                    )}
                                                </span>
                                                {showRequirements && (
                                                    <div className="top-full rounded-md shadow-md">
                                                        <ul className="absolute bg-white p-4 border border-gray-300">
                                                            <li>Mật khẩu phải dài ít nhất 8 ký tự</li>
                                                            <li>Phải chứa ít nhất một chữ hoa và một chữ thường</li>
                                                            <li>Phải có ít nhất một ký tự đặc biệt (@, #, $, v.v.)</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            <div className='w-[50%] flex justify-end'>
                                                <button className='bg-blue-400 text-white shadow-sm' onClick={generatePassword}>
                                                    Gợi ý!
                                                </button>   
                                            </div>
                                        </div>
                                        {/* {Object.keys(error).length > 0 && (
                                            <div className="error-messages text-red-500 mb-4">
                                                {Object.values(error).map((err, index) => (
                                                    <p key={index}>{err}</p>
                                                ))}
                                            </div>
                                        )} */}
                                        <div className="forgot-password-area mb-7">
                                            <div className="remember-checkbox flex items-center space-x-2.5">
                                                <button
                                                    onClick={rememberMe}
                                                    type="button"
                                                    className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                                                >
                                                    {checked && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                                <span
                                                    onClick={rememberMe}
                                                    className="text-base text-black"
                                                >
                                                    Tôi đồng ý với
                                                    <span className="text-qblack"> báo động và điều khoản </span>
                                                    ToelShop.
                                                </span>
                                            </div>
                                        </div>
                                        <div className="signin-area mb-3">
                                            <div className="flex justify-center">




                                                <button
                                                    type="button"
                                                    onClick={handleProceed}
                                                    className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
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
                                    className={`w-[100%] h-[40px] font-medium  rounded-lg  ${otpMethod === "email"
                                        ? "bg-blue-300 text-white"
                                        : "bg-gray-100 stext-gray-700 border border-gray-300"
                                        }`}
                                    onClick={() => setOtpMethod("email")}
                                >
                                    Gửi qua Email
                                </button>
                                {/* py-3 px-6 rounded-lg font-medium transition-all */}
                                <button
                                    className={`w-[100%] h-[40px] font-medium  rounded-lg ${otpMethod === "phone"
                                        ? "bg-blue-300 text-white"
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
                                className="black-btn text-white w-full h-[50px] mt-4 font-semibold flex justify-center bg-purple items-center "
                            >
                                Gửi OTP
                            </button>

                            <h1 onClick={() => setStep(1)}>quay lại ...</h1>
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
                                    <p>Chúng tôi đã gửi mã OTP đến {otpMethod === "email" ? formData.email : formData.phone}</p>
                                </div>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                                            <OTPInput length={6} onComplete={setOtp} />
                                        </div>
                                        <p className="text-center text-sm text-gray-500">
                                            Thời gian còn lại: <span className="font-bold">{formatTime(countdown)}</span>
                                        </p>
                                        <button
                                            onClick={handleRegister}
                                            className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                                        >
                                            Hoàn tất Đăng ký
                                        </button>
                                    </div>
                                </form>
                                {error.registration && <p className="text-red-500 mt-2 text-center">{error.registration}</p>}
                            </div>
                        </div>
                        // <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] rounded-2xl shadow-lg">
                        //     <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                        //         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        //             Nhập OTP và Hoàn tất Đăng ký
                        //         </h2>
                        //         <div className="flex flex-row text-center text-sm font-medium text-gray-400 mb-4">
                        //             <p>Chúng tôi đã gửi mã OTP đến {otpMethod === 'email' ? formData.email : formData.phone}</p>
                        //         </div>
                        //         <form onSubmit={(e) => e.preventDefault()}>
                        //             <div className="flex flex-col space-y-4">
                        //                 <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                        //                     <OTPInput length={6} onComplete={setOtp} />
                        //                 </div>
                        //                 <button
                        //                     onClick={handleRegister}
                        //                     className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
                        //                 >
                        //                     Hoàn tất Đăng ký
                        //                 </button>
                        //             </div>
                        //         </form>
                        //         {error.registration && <p className="text-red-500 mt-2 text-center">{error.registration}</p>}
                        //     </div>
                        // </div>
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

