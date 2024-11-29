import React, { useEffect, useState } from "react";
import PasswordSvg from "./PasswordSvg";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../../service/authService";
import { toast, ToastContainer } from "react-toastify";
export default function PasswordTab() {
  // const [error, setError] = useState(false)
  const [error, setError] = useState({}); // State for error messages
  const [oldPass, setOldPass] = useState("hide-password");
  const [newPass, setNewPass] = useState("hide-password");
  const [confirmPass, setConfirmPass] = useState("hide-password");
  const navigate = useNavigate(); // Hook for navigation
  const showPassword = (value) => {
    const password = document.getElementById(`${value}`);
    if (value && value === "old_password") {
      if (password.type === "password") {
        password.type = "text";
        setOldPass("show-password");
      } else {
        password.type = "password";
        setOldPass("hide-password");
      }
    }
    if (value && value === "new_password") {
      if (password.type === "password") {
        password.type = "text";
        setNewPass("show-password");
      } else {
        password.type = "password";
        setNewPass("hide-password");
      }
    }
    if (value && value === "confirm_password") {
      if (password.type === "password") {
        password.type = "text";
        setConfirmPass("show-password");
      } else {
        password.type = "password";
        setConfirmPass("hide-password");
      }
    }
  };
  const [data, setData] = useState({
    old_password: '',
    confirm_password: '',
    new_password: '',
    id: sessionStorage.getItem('id_account') || ''
  });

  const handleData = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    validateInput(name, value);
    console.log(data);
  };

  // useEffect to monitor changes to data and log them
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);
  const getPasswordStrengthClass = (strength) => {
    switch (strength) {
      case "weak":
        return "bg-red-100 ring-red-500";
      case "medium":
        return "bg-yellow-100";
      case "strong":
        return "bg-green-100";
      default:
        return "";
    }
  };

  const handleClick = async () => {
    // if (data.id="") {
    //   toast.warn("Vui lòng đăng nhập để cập nhật mật khẩu!");
    //   return;
    // }
    if (checkForm(data)) {
      try {
        const response = await AuthService.UpdatePass(data.id, data.new_password, data.old_password);
        if (response.status === 200) {
          toast.success("Cập nhật mật khẩu thành công!");
          setError(true);
          setTimeout(() => {
            navigate('/profile#dashboard');
          }, 2000);
        } else {
          setError(false);
          toast.warning("Cập nhật mật khẩu thất bại!");
        }
      } catch (error) {
        console.error(error);
        setError(false);
        toast.error(error.response.data || "lỗi! ");
      }
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
            error: !isLongEnough, // true if password is less than 8 characters
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


  const checkForm = (data) => {
    if (!data.old_password) {
      toast.warn("Mật khẩu không được để trống!");
      setError(false);
      return false;
    }
    if (!data.new_password) {
      setError(false);
      toast.warn("Mật khẩu không được để trống!");
      return false;
    }
    if (data.confirm_password !== data.new_password) {
      setError(false);
      toast.warn("Xác nhận mật khẩu không khớp!");
      return false;
    }
    setError(true);
    return true;
  };


  return (
    <div className="changePasswordTab w-full">
      <ToastContainer></ToastContainer>
      <div className="w-full flex xl:flex-row flex-col-reverse space-x-5 xl:items-center">
        <div className="w-[397px] mb-10">
          <div className="input-field mb-6">
            <label
              className="input-label text-qgray text-sm block mb-2.5"
              htmlFor="old_password"
            >
              Old Password*
            </label>
            <div className="">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300" // Error state
                  // : errorFrom.usernameF === 2
                  //   ? "border-green-500 bg-red-400" // Success state
                  //   : ""
                  }`} type="password"
                id="old_password"
                name="old_password"
                onChange={handleData}
              />
              <div
                className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                onClick={() => showPassword("old_password")}
              >
                {oldPass === "show-password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                      fill="#797979"
                    />
                    <path
                      d="M4.44163 4.65918C4.91528 5.13573 5.3773 5.6021 5.84222 6.06703C6.36962 6.59442 6.89703 7.12327 7.42733 7.64776C7.49853 7.7175 7.51015 7.7669 7.4622 7.85989C5.81462 11.0228 7.40118 14.873 10.801 15.9336C12.2829 16.3956 13.7271 16.2576 15.1161 15.5573C15.1626 15.534 15.2076 15.5093 15.2468 15.489C16.0735 16.3186 16.893 17.1424 17.724 17.9778C17.6862 17.9952 17.6383 18.0199 17.5874 18.0403C15.5069 18.8844 13.3493 19.1909 11.1162 18.9657C6.18511 18.4674 1.87 15.2275 0.02773 10.6364C0.000124928 10.5666 -0.0114982 10.4693 0.0146539 10.4039C0.941602 8.12286 2.38433 6.23411 4.33557 4.73328C4.36317 4.71003 4.39514 4.69114 4.44163 4.65918Z"
                      fill="#797979"
                    />
                    <path
                      d="M2.04297 1.0577C2.36406 0.732254 2.72292 0.370486 3.09051 0C9.71717 6.64695 16.3482 13.2968 22.9749 19.9438C22.645 20.2721 22.2833 20.631 21.9128 21C15.2905 14.3531 8.66237 7.70174 2.04297 1.0577Z"
                      fill="#797979"
                    />
                    <path
                      d="M13.5471 13.7324C12.655 14.071 11.1164 14.0158 10.0093 12.8433C9.16664 11.9512 8.80197 10.3283 9.27125 9.46387C10.698 10.8877 12.116 12.3028 13.5471 13.7324Z"
                      fill="#797979"
                    />
                    <path
                      d="M11.519 7.24656C12.3123 6.80779 13.9425 7.17247 14.8389 8.01369C16.0172 9.11933 16.071 10.6638 15.7528 11.4933C14.342 10.0797 12.9269 8.66022 11.519 7.24656Z"
                      fill="#797979"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="input-field mb-6">
            <label
              className="input-label text-qgray text-sm block mb-2.5"
              htmlFor="old_password"
            >
              Password*
            </label>
            <div className="">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300"
                  // errorFrom.usernameF === 1
                  // ? "border-red-500 bg-red-400" // Error state
                  // : errorFrom.usernameF === 2
                  //   ? "border-green-500 bg-red-400" // Success state
                  //   : ""
                  }`} type="password"
                id="new_password"
                name="new_password"
                onChange={handleData}
              />
              <div
                className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                onClick={() => showPassword("new_password")}
              >
                {newPass === "show-password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                      fill="#797979"
                    />
                    <path
                      d="M4.44163 4.65918C4.91528 5.13573 5.3773 5.6021 5.84222 6.06703C6.36962 6.59442 6.89703 7.12327 7.42733 7.64776C7.49853 7.7175 7.51015 7.7669 7.4622 7.85989C5.81462 11.0228 7.40118 14.873 10.801 15.9336C12.2829 16.3956 13.7271 16.2576 15.1161 15.5573C15.1626 15.534 15.2076 15.5093 15.2468 15.489C16.0735 16.3186 16.893 17.1424 17.724 17.9778C17.6862 17.9952 17.6383 18.0199 17.5874 18.0403C15.5069 18.8844 13.3493 19.1909 11.1162 18.9657C6.18511 18.4674 1.87 15.2275 0.02773 10.6364C0.000124928 10.5666 -0.0114982 10.4693 0.0146539 10.4039C0.941602 8.12286 2.38433 6.23411 4.33557 4.73328C4.36317 4.71003 4.39514 4.69114 4.44163 4.65918Z"
                      fill="#797979"
                    />
                    <path
                      d="M2.04297 1.0577C2.36406 0.732254 2.72292 0.370486 3.09051 0C9.71717 6.64695 16.3482 13.2968 22.9749 19.9438C22.645 20.2721 22.2833 20.631 21.9128 21C15.2905 14.3531 8.66237 7.70174 2.04297 1.0577Z"
                      fill="#797979"
                    />
                    <path
                      d="M13.5471 13.7324C12.655 14.071 11.1164 14.0158 10.0093 12.8433C9.16664 11.9512 8.80197 10.3283 9.27125 9.46387C10.698 10.8877 12.116 12.3028 13.5471 13.7324Z"
                      fill="#797979"
                    />
                    <path
                      d="M11.519 7.24656C12.3123 6.80779 13.9425 7.17247 14.8389 8.01369C16.0172 9.11933 16.071 10.6638 15.7528 11.4933C14.342 10.0797 12.9269 8.66022 11.519 7.24656Z"
                      fill="#797979"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="input-field mb-6">
            <label
              className="input-label text-qgray text-sm block mb-2.5"
              htmlFor="old_password"
            >
              Re-enter Password*
            </label>
            <div className="">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error ? "border-green-300 bg-green-300" : "border-red-300 bg-red-300"
                  // errorFrom.usernameF === 1
                  // ? "border-red-500 bg-red-400" // Error state
                  // : errorFrom.usernameF === 2
                  //   ? "border-green-500 bg-red-400" // Success state
                  //   : ""
                  }`} type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={handleData}
              />
              <div
                className="absolute right-6 bottom-[17px] z-10 cursor-pointer"
                onClick={() => showPassword("confirm_password")}
              >
                {confirmPass === "show-password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5483 16.3524C20.156 15.9557 19.7696 15.5605 19.3802 15.1683C18.7802 14.5653 18.1787 13.9638 17.5728 13.3667C17.4972 13.2911 17.4871 13.2388 17.5379 13.1415C19.3482 9.66037 17.2125 5.46008 13.3332 4.87747C12.1143 4.69441 10.9534 4.89636 9.85791 5.46299C9.78672 5.49931 9.73587 5.53563 9.65596 5.45572C8.88157 4.67262 8.10136 3.89678 7.32261 3.11803C7.30082 3.09624 7.28338 3.07154 7.24561 3.0265C7.5667 2.90591 7.8689 2.78387 8.17837 2.67926C10.0758 2.03563 12.0242 1.83513 14.0132 2.05161C18.879 2.58337 23.1752 5.85381 24.9768 10.3926C25 10.4522 25.0073 10.5379 24.9826 10.596C24.0484 12.8916 22.5955 14.792 20.6282 16.2986C20.6137 16.3117 20.5963 16.3219 20.5483 16.3524Z"
                      fill="#797979"
                    />
                    <path
                      d="M4.44163 4.65918C4.91528 5.13573 5.3773 5.6021 5.84222 6.06703C6.36962 6.59442 6.89703 7.12327 7.42733 7.64776C7.49853 7.7175 7.51015 7.7669 7.4622 7.85989C5.81462 11.0228 7.40118 14.873 10.801 15.9336C12.2829 16.3956 13.7271 16.2576 15.1161 15.5573C15.1626 15.534 15.2076 15.5093 15.2468 15.489C16.0735 16.3186 16.893 17.1424 17.724 17.9778C17.6862 17.9952 17.6383 18.0199 17.5874 18.0403C15.5069 18.8844 13.3493 19.1909 11.1162 18.9657C6.18511 18.4674 1.87 15.2275 0.02773 10.6364C0.000124928 10.5666 -0.0114982 10.4693 0.0146539 10.4039C0.941602 8.12286 2.38433 6.23411 4.33557 4.73328C4.36317 4.71003 4.39514 4.69114 4.44163 4.65918Z"
                      fill="#797979"
                    />
                    <path
                      d="M2.04297 1.0577C2.36406 0.732254 2.72292 0.370486 3.09051 0C9.71717 6.64695 16.3482 13.2968 22.9749 19.9438C22.645 20.2721 22.2833 20.631 21.9128 21C15.2905 14.3531 8.66237 7.70174 2.04297 1.0577Z"
                      fill="#797979"
                    />
                    <path
                      d="M13.5471 13.7324C12.655 14.071 11.1164 14.0158 10.0093 12.8433C9.16664 11.9512 8.80197 10.3283 9.27125 9.46387C10.698 10.8877 12.116 12.3028 13.5471 13.7324Z"
                      fill="#797979"
                    />
                    <path
                      d="M11.519 7.24656C12.3123 6.80779 13.9425 7.17247 14.8389 8.01369C16.0172 9.11933 16.071 10.6638 15.7528 11.4933C14.342 10.0797 12.9269 8.66022 11.519 7.24656Z"
                      fill="#797979"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-[30px] flex justify-start">
            <div className="sm:flex sm:space-x-[30px] items-center">
              <div className="w-[180px] h-[50px]">
                <button type="button" onClick={handleClick} className="flex items-center justify-center h-full w-full bg-[#003EA1] text-[13px] font-semibold text-[#1d1d1d] leading-none">
                  <div className="w-full text-sm font-semibold">
                    Upldate Password
                  </div>
                </button>
              </div>
              <button type="button">
                <div className="w-full text-sm font-semibold text-qblack mb-5 sm:mb-0">
                  Cancel
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 sm:flex hidden justify-end">
          <PasswordSvg />
        </div>
      </div>
    </div>
  );
}
