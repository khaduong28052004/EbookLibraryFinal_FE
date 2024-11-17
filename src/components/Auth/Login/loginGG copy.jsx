import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import AuthService from '../../../service/authService';

const LoginGG = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
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
             if(response == 200){
                console.log("oke");
                setIsLoggedIn(true); // Set login state after success
                console.log(response);
             }
        } catch (error) {
            setIsLoggedIn(false);
            console.log("lỗi");
            // Set login state after success
            console.log(error)
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
