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
  const [showRequirements, setShowRequirements] = useState(false); // Quản lý trạng thái hiển thị
  const [errorFrom, seterrorFrom] = useState({
    passwordF: 0,
    confirmPasswordNewF: 0,
    confirmPasswordF: 0,
  });
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
          // toast.success("Cập nhật mật khẩu thành công!");
          toast.success("Cập nhật mật khẩu thành công hay đăng nhập lại!");

          setError(true);
          seterrorFrom((prev) => ({ ...prev, passwordF: 2, confirmPasswordNewF: 2, confirmPasswordF: 2, }));
          setTimeout(() => {
            // navigate('/profile#dashboard');
            AuthService.logout;
            navigate('/login');
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

  //   const [errorFrom, seterrorFrom] = useState({
  //     passwordF: 0,
  //     confirmPasswordNewF: 0,
  //     confirmPasswordF: 0,
  // });

  const checkForm = (data) => {
    let isValid = true;
    let errors = {};
    if (!data.old_password) {
      errors.old_password = 'Mật khẩu không được để trống!';
      // toast.warn("Mật khẩu không được để trống!");
      seterrorFrom((prev) => ({ ...prev, passwordF: 1 }));
      setError(false);
      isValid = false;
    } else {
      seterrorFrom((prev) => ({ ...prev, passwordF: 0 }));
      // isvail = true;
    }

    if (!data.new_password) {
      setError(false);
      // toast.warn("Mật khẩu không được để trống!");
      errors.new_password = 'Mật khẩu mới không được để trống!';
      seterrorFrom((prev) => ({ ...prev, confirmPasswordNewF: 1 }));
      isValid = false;
    } else if (data.new_password.length < 8) {
      errors.password = 'Mật khẩu phải >= 8 ký tự!';
      // toast.error("Mật khẩu phải >= 8 ký tự!");
      isValid = false;
      seterrorFrom((prev) => ({ ...prev, confirmPasswordNewF: 1 }));
      // return;
    } else if (!/[A-Z]/.test(data.new_password)) {
      errors.password = 'Mật khẩu phải có ít nhất một kí tự viết Hoa!';
      isValid = false;
      seterrorFrom((prev) => ({ ...prev, confirmPasswordNewF: 1 }));
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.new_password)) {
      errors.password = 'Mật khẩu phải có ít nhất một kí tự đặt biệt!!';
      isValid = false;
      seterrorFrom((prev) => ({ ...prev, confirmPasswordNewF: 1 }));
    } else {
      seterrorFrom((prev) => ({ ...prev, confirmPasswordNewF: 0 }));
    }


    //
    if (data.confirm_password !== data.new_password) {
      setError(false);
      seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 1 }));
      // toast.warn("Xác nhận mật khẩu không khớp!");
      errors.new_password = 'Xác nhận mật khẩu không khớp!';
      isValid = false;
    } else {
      seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 0 }));
      // isvail = true;

    }
    if (!data.confirm_password) {
      setError(false);
      seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 1 }));
      // toast.warn("Xác nhận mật khẩu không được để trống!");
      errors.confirm_password = 'Xác nhận không được để trống!';
      isValid = false;
    } else {
      seterrorFrom((prev) => ({ ...prev, confirmPasswordF: 0 }));
      // isvail = true;

    }

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
    setError(errors);
    // setError(true);
    return isValid;
  };

  const generatePassword = () => {
    const length = 16; // Adjusted length for the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let Password = "@";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      Password += charset[randomIndex];
    }
    // const [data, setData] = useState({
    //   old_password: '',
    //   confirm_password: '',
    //   new_password: '',
    //   id: sessionStorage.getItem('id_account') || ''
    // });
    setData((prev) => ({ ...prev, confirm_password: Password, new_password: Password, }));
    return Password;
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
              Mật khẩu cũ
            </label>
            <div className="relative">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.passwordF === 1
                  ? "ring-red-500 bg-red-100" // Lỗi
                  : errorFrom.passwordF === 2
                    ? "ring-green-500 bg-green-100" // Thành công
                    : "" // Mặc định
                  }`}
                type="password"
                id="old_password"
                name="old_password"
                onChange={handleData}
              />
              <div
                className="absolute right-6 top-2 z-10 cursor-pointer"
                onClick={() => showPassword("old_password")}
              >
                {oldPass === "show-password" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.confirmPasswordNewF === 1
                  ? "ring-red-500 bg-red-100" // Lỗi
                  : errorFrom.confirmPasswordNewF === 2
                    ? "ring-green-500 bg-green-100" // Thành công
                    : "" // Mặc định
                  }`}
                type="password"
                id="new_password"
                name="new_password"
                value={data.new_password}
                onChange={handleData}
              />
              <div
                className="absolute right-6 top-2 z-10 cursor-pointer"
                onClick={() => showPassword("new_password")}
              >
                {newPass === "show-password" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
              Xác nhận mật khẩu
            </label>
            <div className="relative flex align-middle">
              <input
                placeholder="● ● ● ● ● ●"
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${errorFrom.confirmPasswordF === 1
                  ? "ring-red-500 bg-red-100" // Lỗi
                  : errorFrom.confirmPasswordF === 2
                    ? "ring-green-500 bg-green-100" // Thành công
                    : "" // Mặc định
                  }`}
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={data.confirm_password}
                onChange={handleData}
              />
              <div
                className="absolute right-6 top-2 z-10 cursor-pointer"
                onClick={() => showPassword("confirm_password")}
              >
                {confirmPass === "show-password" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/* /// */}
          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
            <div className='w-[50%] flex justify-start' onMouseEnter={() => setShowRequirements(true)} onMouseLeave={() => setShowRequirements(false)}>
              <span className='text-gray-400 text-start'>
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
          {/* /// */}
          <div className="w-full mt-[30px] flex justify-end">
            <div className=" sm:space-x-[30px] items-end">
              <div className="w-full h-[40px]">
                <button type="button" onClick={handleClick} className="flex items-center justify-center w-full] h-full rounded text-white text-[15px]  
                px-2 py-0 border bg-[#003EA1] transition-all duration-500 ease-in-out hover:opacity-90 ">
                  <div className="w-full text-sm font-semibold">
                    Cập nhật
                  </div>
                </button>
              </div>
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
