import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Turnstile from "react-turnstile";

import AuthService from "../../../service/authService";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import FaceBookSingIn from "./FaceBookSingIn";
import LoginGG from "./loginGG";
import Thumbnail from "./Thumbnail";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorFrom, seterrorFrom] = useState({
    usernameF: 0,
    passwordF: 0,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const navigate = useNavigate();
  const turnstileRef = useRef(null);
  const rememberMe = () => setChecked(!checked);



  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.trim() === "") {
      seterrorFrom((prev) => ({ ...prev, usernameF: 1 }));
      toast.error("Vui lòng kiểm tra tên đăng nhập!");
      return;
    }else{
      seterrorFrom((prev) => ({ ...prev, usernameF: 0 }));
    }
    
    if (password.trim() === "") {
      seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
      toast.error("Vui lòng kiểm tra tên đăng nhập!");
      return;
    } else{
      seterrorFrom((prev) => ({ ...prev, passwordF: 0 }));
    }
    

    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    try {
      const response = await AuthService.login({
        username,
        password,
        captchaToken,
      });
      seterrorFrom((prev) => ({ ...prev, passwordF: 2,usernameF:2 }));
      if (response.status) {
        setTimeout(() => {
          if (response.data.roles === "USER") {
            navigate('/');
          } else if (response.data.roles === "SELLER") {
            navigate('/seller/home');
          } else {
            navigate('/admin/home');
          }
        }, 2000);
        toast.success("Đăng nhập thành công!");
      } else {
        toast.error("Đăng nhập thất bại vui lòng kiểm tra lại!");
      }
      AuthService.setItem(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
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
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">Đăng nhập</h1>
                  <div className="shape -mt-6">
                    <svg width="172" height="29" viewBox="0 0 172 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727" stroke="#FFBB38" />
                    </svg>
                  </div>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Username"
                      label="Username*"
                      name="username"
                      type="text"
                      inputClasses={
                        errorFrom.usernameF === 1
                          ? "border-red-500 bg-red-400" // Error state
                          : errorFrom.usernameF === 2
                            ? "border-green-500 bg-red-400" // Success state
                            : "" // Default state
                      }
                      value={username}
                      inputHandler={(e) => setUsername(e.target.value)}
                    />

                  </div>
                  <div className="input-item mb-5 relative">
                    <InputCom
                      placeholder="Password"
                      label="Password*"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      inputClasses={
                        errorFrom.passwordF === 1
                          ? "border-red-500 bg-red-400" // Error state
                          : errorFrom.passwordF === 2
                            ? "border-green-500 bg-red-400" // Success state
                            : "" // Default state
                      }
                      value={password}
                      inputHandler={(e) => setPassword(e.target.value)}
                    >
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        )}
                      </button>
                    </InputCom>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm mb-5">
                      {error}
                    </div>
                  )}
                  <div className="forgot-password-area flex justify-between items-center mb-7">
                    <div className="remember-checkbox flex items-center space-x-2.5">
                      <button onClick={rememberMe} type="button" className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray">
                        {checked && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <span onClick={rememberMe} className="text-base text-black">Nhớ mật khẩu!</span>
                    </div>
                    <Link to="/forgot-password" className="text-base text-qyellow">Quên mật khẩu!</Link>
                  </div>
                  <div className="mb-5">
                    <Turnstile
                      sitekey={import.meta.env.VITE_SITEKEY_CLOUDFLARE} // private
                      onVerify={(token) => setCaptchaToken(token)}
                      onError={() => {
                        console.error("Turnstile error occurred");
                        // Handle the error, e.g., show an error message to the user
                      }}
                      ref={turnstileRef}
                    />
                  </div>
                  <button type="submit" className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
                    Đăng nhập
                  </button>
                </form>
                <div className="social-login-buttons flex space-x-4 mt-6">
                  <button className="w-full flex justify-center items-center bg-[#FAFAFA] text-black font-medium rounded-md">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID_GG}>
                      <LoginGG />
                    </GoogleOAuthProvider>
                  </button>
                  <h1>||</h1>
                  <button className="w-full flex justify-center items-center text-bg-[#3b5998] font-medium rounded-md">
                    <FaceBookSingIn />
                  </button>
                </div>
                <div className="social-login-buttons flex space-x-4 mt-6">
                  <Link to="/signup" className="text-base text-qyellow">Đăng ký tài khoản!</Link>
                </div>
              </div>
            </div>
            <Thumbnail />
          </div>
        </div>
      </div>
    </Layout>
  );
}