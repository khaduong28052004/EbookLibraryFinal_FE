import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const permission = ({ element, ...rest }) => {
  const token = sessionStorage.getItem("token");


  // function isTokenValid(token) {
  //   if (!token) return false;
  //   const [, payloadBase64] = token.split(".");
  //   const payload = JSON.parse(atob(payloadBase64));
  //   const expirationTime = payload.exp * 1000;
  //   return expirationTime > Date.now();
  // }

  // // Handle not logged in
  // if (!token) {
  //   toast.info("Vui lòng đăng nhập!.");
  //   return <Navigate to="/login" />;
  // }

  // // Handle session expiration
  // if (!isTokenValid(token)) {
  //   toast.warn("Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại!");
  //   sessionStorage.removeItem("token"); // Clear expired token
  //   return <Navigate to="/login" />;
  // }
      

  const permission = sessionStorage.getItem("permission");

  // If valid token, allow access
  return element;
};


export default permission;