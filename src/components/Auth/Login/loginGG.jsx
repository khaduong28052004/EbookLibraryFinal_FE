import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/authService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginGG = () => {
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [erro, setError] = useState("");
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log(decodedToken);
        setToken(credentialResponse.credential);
        try {
            const data = {
                token: credentialResponse.credential,
            };
            const response = await AuthService.GoogleLogin(data);
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken); // Use response.data
                setError(null); // Clear any previous errors
                toast.success("Đăng nhập thành công!");
                setTimeout(() => {
                    return navigate('/');
                }, 3000);
         
            } else if (response.status === 401) {
                setError(response.data.message || "Unauthorized access."); // Display API-provided error message
            } else if (response.status === 302) {
         
                setError("Redirecting to sign-up page...");
                return navigate('/' + redirectUrl);
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (error) {
            const redirectUrl = error.response.headers?.location || "signup";
            if (error.response.status = 302) {
                // thoong bao khi chon toast
                toast.warn("tài khoản này chưa được tạo!");
                setTimeout(() => {
                    return navigate('/' + redirectUrl);
                }, 3000);   
            }
            console.error("Error during login:", error?.response?.data || error.message);
            setError("An error occurred. Please try again.");
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            {/* <button
                type="button"
                onClick={() => {}}
                className="flex w-1/2 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm ring-1 ring-inset ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-slate-50"
            >
            </button> */}
        </>
    );
};

export default LoginGG;   