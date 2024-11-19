import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../service/authService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginGG = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log(credentialResponse.credential);
        setToken(credentialResponse.credential);
        console.log(decodedToken);
        try {
            const data = {
                token: credentialResponse.credential,
            }
            const response = await AuthService.GoogleLogin(data);
            AuthService.setItem(response.data);
          
             if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("accessToken", data.accessToken);
                // setError(null); // Xóa thông báo lỗi
                return navigate ('/');
            } else if (response.status === 401) {
                const message = await response.text();
                setError(message);
            } else if (response.status === 302) {
                const redirectUrl = response.headers.get("Location");
                // setError("Redirecting to sign-up page...");
                return navigate ('/'+redirectUrl);
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
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
            <GoogleLogin onSuccess={handleSuccess}  onError={handleError} />
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
