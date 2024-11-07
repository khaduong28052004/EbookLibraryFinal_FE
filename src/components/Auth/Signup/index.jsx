import { useState, useEffect } from "react";
import InputCom from "../../Helpers/InputCom";
import {useNavigate,Link} from 'react-router-dom';
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import AuthService from "../../../service/authService";
import { toast, ToastContainer } from "react-toastify";
export default function Signup() {
  const [checked, setValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({});
  const navigate = useNavigate(); // Hook for navigation
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Validate input
    validateInput(name, value);
  };

  const rememberMe = () => {
    setValue(!checked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (!fullName || !username || !email || !phone || !password || !confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Xác nhận mật khẩu không khớp!");
      return;
    }

    if(!checked){
      toast.warn("Điều khoản tài khoản!");
      return
    }

    try {
      const response = await AuthService.register({ username, email, password });
      if (response.status === 200) {
        toast.success("Đăng ký thành công");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error("đăng ký thất bại,",response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data ||"An error occurred during registration");
    }
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "username":
        setError((prev) => ({
          ...prev,
          username: {
            error: value.length < 3,
            message: value.length < 3 ? "Tên tài khoản quá ngắn!" : "",
          },
        }));
        break;
        case "phoe":
          setError((prev) => ({
            ...prev,
            username: {
              error: value.length < 3,
              message: value.length < 3 ? "Tên tài khoản quá ngắn!" : "",
            },
          }));
          break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError((prev) => ({
          ...prev,
          email: {
            error: !emailPattern.test(value),
            message: !emailPattern.test(value) ? "Email không hợp lệ!" : "",
          },
        }));
        break;
      case "password":
        let strength = "";
        let passwordMessage = "";
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const isLongEnough = value.length >= 8;

        if (!isLongEnough) {
          strength = "weak";
          passwordMessage = "Mật khẩu cần ít nhất 8 ký tự!";
        } else {
          if (hasNumber && hasSpecialChar && hasUpperCase) {
            strength = "strong";
            passwordMessage = "Mật khẩu mạnh!";
          } else if (hasNumber || hasSpecialChar || hasUpperCase) {
            strength = "medium";
            passwordMessage = "Mật khẩu trung bình!";
          } else {
            strength = "weak";
            passwordMessage = "Mật khẩu yếu!";
          }
        }

        setError((prev) => ({
          ...prev,
          password: {
            error: !isLongEnough,
            strength: strength,
            message: passwordMessage,
          },
        }));
        break;

      case "confirmPassword":
        setError((prev) => ({
          ...prev,
          confirmPassword: {
            error: value !== formData.password,
            message: value !== formData.password ? "Mật khẩu không khớp!" : "",
          },
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    validateInput("password", formData.password);
    validateInput("confirmPassword", formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  return (
    <Layout childrenClasses="pt-0 pb-0">
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
        style={{ zIndex: 9999 }} // Ensure the toast container has the highest z-index
      />
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
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
                  <form onSubmit={handleLogin}>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <InputCom
                        placeholder="Họ và tên"
                        label="Họ và tên :"
                        name="fullName"
                        type="text"
                        id="fullName"
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      />
                      <InputCom
                        placeholder="Demo@gmail.com"
                        label="Email :"
                        name="email"
                        type="email"
                        id="email"
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <InputCom
                        placeholder="Tài khoản..."
                        label="Tài khoản :"
                        name="username"
                        type="text"
                        id="username"
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      />
                      <InputCom
                        placeholder="09039 *********"
                        label="Số điện thoại :"
                        name="phone"
                        type="text"
                        id="phone"
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <InputCom
                        placeholder="Mật khẩu"
                        label="Mật khẩu :"
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      >
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </InputCom>
                      <InputCom
                        placeholder="Xác nhận mật khẩu"
                        label="Xác nhận mật khẩu :"
                        name="confirmPassword"
                        id="confirmPassword"
                        type={showRePassword ? "text" : "password"}
                        inputClasses="h-[50px]"
                        inputHandler={handleInputChange}
                      >
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          {showRePassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </InputCom>
                    </div>
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
                          type="submit"
                          className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Đăng ký</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Đã có tài khoản?
                      <a href="/login" className="ml-2 text-qblack">
                        Đăng nhập
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
    </Layout>
  );
}
