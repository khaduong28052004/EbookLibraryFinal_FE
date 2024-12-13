import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from '@heroicons/react/24/solid';
import SearchService from '../../service/user/search';
const ChatBubbleApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstInteraction, setIsFirstInteraction] = useState(true); // Track first interaction
    const messagesEndRef = useRef(null);
    const fileInputRef = React.useRef(null);
    const suggestions = [
        "Hướng dẫn mua hàng?",
        "Giới thiệu về trang web?",
        "Làm sao để trở thành người bán?"
    ];
    const navigate = useNavigate();
    const apiKey = 'AIzaSyBiB27GmYXtY1YfgNRwKyCzTODOC_vpRAk';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/tunedModels/usertoel-dyv3k2hd8uzd:generateContent?key=${apiKey}`;

    const generateAIResponse = async (inputText) => {
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text: inputText,
                        },
                    ],
                },
            ],
        };
        try {
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response?.data?.candidates?.length > 0) {
                let aiResponse = response.data.candidates[0].content.parts[0].text;

                const userName = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")).fullname : "bạn";
                if (aiResponse.includes("{user_name}")) {
                    aiResponse = aiResponse.replace("{user_name}", userName);
                }
                return aiResponse;
            } else {
                return "Không có câu trả lời từ AI.";
            }
        } catch (error) {
            console.error('Error generating AI response:', error);
            return 'AI không thể trả lời lúc này.';
        }
    };

    const handleSuggestionClick = (suggestion) => {
        handleSend(suggestion);
    };

    const handleSend = useCallback(async (input) => {
        const normalizedInput = input.trim().toLowerCase();
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' },
        ]);
        if (!normalizedInput.includes("tìm")) {
            if (normalizedInput) {
                setInput('');
                setIsLoading(true);
                try {
                    const aiResponse = await generateAIResponse(input);
                    const categoryResponse = await SearchService.searchCategory(input);
                    let productsInfo;
                    if (categoryResponse?.data?.result?.products?.length > 0) {
                        productsInfo = categoryResponse?.data?.result?.products;
                    }
                    console.log("Product", productsInfo);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: aiResponse, product: productsInfo, sender: 'ai' },
                    ]);
                } catch (error) {
                    console.error("Lỗi khi gọi AI response:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        } else {
            setInput('');
            setIsLoading(true);
            try {
                if (!normalizedInput.includes("đơn hàng")) {
                    const response = await checkService.apiChatBot(input);
                    if (response?.data?.result?.length > 0) {
                        const productName = response.data.result[0].name;
                        const linkProduct = `/productdetail?idProduct=${response.data.result[0].id}`;
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                text: productName,
                                sender: 'ai',
                                isLink: true,
                                link: linkProduct,
                                status: 'product'

                            },
                        ]);
                    } else {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { text: "Không tìm thấy sản phẩm nào phù hợp.", sender: 'ai' },
                        ]);
                    }
                } else {
                    const response = await checkService.apiChatBotBill(input);
                    if (response?.data?.result?.length > 0) {
                        const billId = response.data.result[0].id;
                        const statusBill = response.data.result[0].orderStatus.name;
                        const price = response.data.result[0].totalPrice;
                        const linkProduct = `/profile#order`;
                        sessionStorage.setItem("billId", billId);
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                text: billId,
                                statusBill: statusBill,
                                sender: 'ai',
                                isLink: true,
                                link: linkProduct,
                                price: price,
                                status: 'bill',

                            },
                        ]);
                    } else {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { text: "Không tìm thấy đơn hàng nào", sender: 'ai', status: 'gemini' },
                        ]);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Đã xảy ra lỗi khi tìm kiếm sản phẩm.", sender: 'ai', status: 'gemini' },
                ]);
            } finally {
                setIsLoading(false);
            }
        }

        if (isFirstInteraction) {
            setIsFirstInteraction(false);
        }
    }, [isFirstInteraction]);



    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         handleSend();
    //     }
    // };


    const handleFileUpload = async (file) => {
        const data = new FormData();
        data.append("file", file);
        setInput('');
        setIsLoading(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { file: file, sender: 'user' },
        ]);
        try {
            const response = await SearchService.searchImage(data);
            console.log("Image: ", response);
            const responseProduct = await SearchService.searchByIds(response.data.similar_product_ids, 0);
            console.log("Product: ", responseProduct);
            setIsLoading(false);
            if (Array.isArray(responseProduct.data.result.content) && responseProduct.data.result.content.length > 0) {
                const productName = responseProduct.data.result.content[0].name;
                const linkProduct = `/productdetail?idProduct=${responseProduct.data.result.content[0].id}`;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: productName,
                        sender: 'ai',
                        isLink: true,
                        link: linkProduct,
                        status: 'product'
                    },
                ]);
            } else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Không tìm thấy sản phẩm nào phù hợp.", sender: 'ai' },
                ]);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        if (isFirstInteraction) {
            setIsFirstInteraction(false);
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div>
            {/* Floating Button */}
            <div
                className={`fixed bottom-4 right-4 z-50 ${isOpen ? "w-96 h-[500px] scale-100" : "w-16 h-16 scale-75"
                    } bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 transform ${isOpen ? "translate-y-0" : "translate-y-4"
                    } cursor-pointer hover:scale-100`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen && <span className="text-white font-bold text-2xl">💬</span>}
            </div>

            {/* Chat Box */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-99999 w-115 h-[500px] bg-white rounded-lg shadow-lg flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Chatbot</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition text-xl"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-xs text-sm px-4 py-2 rounded-xl shadow ${msg.sender === "user"
                                        ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                                        : "bg-white border border-gray-200 text-gray-800"
                                        } ${msg.file ? "from-white to-white" : ""}`}
                                >
                                    {msg.sender === "ai" && (
                                        <div className="text-sm text-gray-500 mb-1">🤖 Phucsy:</div>
                                    )}
                                    {msg.status == 'product' ? (
                                        // Dùng sự kiện onClick để điều hướng
                                        <>
                                            <span>Sản phẩm: </span>
                                            <span
                                                onClick={() => navigate(msg.link)}
                                                style={{
                                                    color: "blue",
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {msg.text}
                                            </span>
                                        </>
                                    ) : msg.status === 'bill' ? (
                                        <>
                                            <span>Đơn hàng: {msg.text}</span>
                                            <span>, tổng tiền: {msg.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                                            <span>, trạng thái: {msg.statusBill} </span>
                                            <span
                                                onClick={() => navigate(msg.link)}
                                                style={{
                                                    color: "blue",
                                                    textDecoration: "underline",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Xem đơn hàng
                                            </span>
                                        </>) : (
                                        <span>
                                            {msg.file ? (<img src={URL.createObjectURL(msg.file)} alt="" className='w-40 h-60' />
                                            ) : (<div className="text-sm text-justify ">{msg.text}
                                                {
                                                    msg.product?.length > 0 ?
                                                        (
                                                            <>
                                                                <p> - Mình gợi ý cho bạn những sản phẩm này nhé: </p>
                                                                {
                                                                    msg.product?.map((entity) => (

                                                                        <p className='pl-4'>+ {entity.name} <Link className="" to={`/productdetail?idProduct=${entity.id}`}>Xem sản phẩm</Link></p>
                                                                    ))}
                                                            </>
                                                        )
                                                        :
                                                        (<>
                                                        </>)
                                                }
                                            </div>)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center space-x-2">
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                <span className="block w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestion Buttons */}
                    {!isLoading && isFirstInteraction && (
                        <div className="p-4 text-center space-y-2 bg-gray-50">
                            <div className="">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="px-4 my-2 py-2 w-full bg-blue-500  text-white rounded-full hover:bg-blue-600"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 flex items-center space-x-3 bg-white">
                        <div className="relative w-full">
                            {/* Input văn bản */}
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend(input)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 pr-12"
                                placeholder="Nhập tin nhắn..."
                            />

                            {/* Button chọn ảnh */}
                            <button
                                // Kích hoạt input file
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-2 flex items-center justify-center"
                            >
                                <PhotoIcon
                                    onClick={() => { if (isLoading == false) { fileInputRef.current?.click() } }}
                                    className="h-5 w-5 text-blue-500" />
                            </button>

                            {/* Input file ẩn */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileUpload(e.target.files[0])} // Hàm xử lý file
                            />
                        </div>

                        {/* Button gửi */}
                        <button
                            onClick={() => handleSend(input)}
                            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow flex items-center justify-center transition ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>


                    <div className="text-sm text-center text-gray-500 py-2">
                        Powered by <a href="https://google.com" className="text-blue-500">Google AI</a>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ChatBubbleApp;
