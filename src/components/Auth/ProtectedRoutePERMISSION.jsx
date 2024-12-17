import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ErrorThumb from '../../components/FourZeroFour'
import ErrorThumb from '../../components/FourZeroFour';

const ProtectedRoutePermission = ({  requiredPermission,element }) => {
  // Fetch and parse permissions from sessionStorage
  const permissions = JSON.parse(sessionStorage.getItem("permission")) || [];
  console.log(permissions);
  // Check if the required permission exists
  const hasPermission = permissions.some(
    (permission) => permission.cotSlug === requiredPermission
  );
  console.log(hasPermission);
  if (!hasPermission) {
    // Notify the user and redirect if permission is denied
    toast.error("BẠN KHÔNG CÓ QUYỀN");
    return <Navigate to="/login" />;
    // return <><div></div></>;
    // return <ErrorThumb></ErrorThumb>;
  }
  // Render the protected element if permission is granted
  return element;
};

export default ProtectedRoutePermission;
