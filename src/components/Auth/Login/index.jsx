import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import AuthService from "../../../service/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginGG from "./loginGG";
import FaceBookSingIn from "./FaceBookSingIn";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/24/outline";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const rememberMe = () => setChecked(!checked);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login({
        username,
        password,
      });
      if (response.status) {
        setTimeout(() => {
          if (response.data.roles === "USER") {
            navigate('/');
          } else if (response.data.roles === "SELLER") {
            navigate('/seller');
          } else {
            navigate('/admin');
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
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">Log In</h1>
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
                      inputClasses="h-[50px]"
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
                      inputClasses="h-[50px]"
                      value={password}
                      inputHandler={(e) => setPassword(e.target.value)}
                    >
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
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
                      <span onClick={rememberMe} className="text-base text-black">Remember Me</span>
                    </div>
                    <Link to="/forgot-password" className="text-base text-qyellow">Forgot Password</Link>
                  </div>
                  <button type="submit" className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
                    Log In
                  </button>
                </form>
                <div className="social-login-buttons flex space-x-4 mt-6">
                  <button className=" w-full flex justify-center items-center bg-[#FAFAFA] text-black font-medium rounded-md">
                    <GoogleOAuthProvider clientId="802515130057-2djim3amjrd5pinc6rmspgid56l1rkdl.apps.googleusercontent.com">
                      <LoginGG />
                    </GoogleOAuthProvider>
                  </button>
                  <h1>||</h1>
                  <button className=" w-full flex justify-center items-center text-bg-[#3b5998] font-medium rounded-md">
                    <FaceBookSingIn />
                  </button>
                </div>
                <div className="social-login-buttons flex space-x-4 mt-6">

                  <Link to="/signup" className="text-base text-qyellow">signup</Link>
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
