import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../service/authService";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({}); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Handle input changes 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        // Validate input
        validateInput(name, value);
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

    const handleRegister = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = formData;
        // Ensure all fields are valid
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (Object.values(error).some((field) => field.error)) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await AuthService.register({ username, email, password });
            if (response.status === 200) {
                toast.success("Registration successful");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error("Registration failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during registration");
        }
    };

    const generatePassword = () => {
        const length = 16; // Adjusted length for the password
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "@";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        return password;
    };
    useEffect(() => {
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
    
            // Validate input
            validateInput(name, value);
        };
    }, [formData.password, formData.confirmPassword]); 

    const handleSelectChange = () => {
         let selectedPassword = generatePassword(); 
        console.log("Selected Password:", selectedPassword);
        setFormData((prevFormData) => ({
            ...prevFormData,
            password: selectedPassword,
            confirmPassword: selectedPassword,
        }));
        validateInput({ name: "password", value: selectedPassword });
        validateInput({ name: "confirmPassword", value: selectedPassword });
 
    };
    
    // Example usage
    // const newPassword = generatePassword();
    // console.log("Mật khẩu ngẫu nhiên: ", newPassword);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <ToastContainer />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                </Link>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Đăng Ký
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleRegister}>
                    {/* Username field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Tài Khoản:
                            {error.username?.error && <span className="text-red-500 size-1.5">{error.username.message}</span>}
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                autoComplete="username"
                                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error.username?.error ? 'bg-red-100 ring-red-500' : ''}`}
                            />
                        </div>
                    </div>

                    {/* Email field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email:
                            {error.email?.error && <span className="text-red-500 size-1.5">{error.email.message}</span>}
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete="email"
                                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error.email?.error ? 'bg-red-100 ring-red-500' : ''}`}
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div>
                        <label htmlFor="password" className="flex justify-start block text-sm font-medium leading-6 text-gray-900">
                            Mật Khẩu:
                            {error.password?.message && <span className={`ml-2 ${error.password.strength === "weak" ? "text-red-500" : error.password.strength === "medium" ? "text-yellow-500" : error.password.strength === "strong" ? "text-green-500" : ""}`}>{error.password.message}</span>}
                            {(error.password?.strength === "weak" || error.password?.strength === "medium") && (
                                <> 
                                <button className="mr-0 p-[2px] bg-blue-200 text-white rounded" type="button" onClick={handleSelectChange} > gợi ý</button>
                                </>
                            )}
                        </label>

                        <div className="relative mt-2">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} // Toggle visibility based on state
                                value={formData.password}
                                onChange={handleInputChange} // Use the handleInputChange function
                                required
                                autoComplete="password"
                                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error.password?.strength === "weak" ? "bg-red-100 ring-red-500" :
                                    error.password?.strength === "medium" ? "bg-yellow-100" :
                                        error.password?.strength === "strong" ? "bg-green-100" :
                                            ""
                                    }`}
                            />
                            <input
                                id="showPassword"
                                name="showPassword"
                                type="checkbox"
                                onChange={() => setShowPassword((prev) => !prev)} // Toggle the state when the checkbox is checked
                                className="absolute right-2 top-[10px] h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                    </div>

                    {/* Confirm Password field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Xác Nhận Mật Khẩu:
                            {error.confirmPassword?.error && <span className="text-red-500 size-1.5">{error.confirmPassword.message}</span>}
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleInputChange} // Use the handleInputChange function
                                required
                                autoComplete="confirm-password"
                                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6 ${error.confirmPassword?.error ? 'bg-red-100 ring-red-500' : ''}`}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đăng Ký
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Bạn đã có tài khoản?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Đăng Nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
