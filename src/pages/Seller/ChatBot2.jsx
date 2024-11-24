import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

const ChatBubbleApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [partialResponse, setPartialResponse] = useState('');
    const messagesEndRef = useRef(null);

    const apiKey = 'AIzaSyBiB27GmYXtY1YfgNRwKyCzTODOC_vpRAk'; // Thay API Key của bạn vào đây
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/tunedModels/aibyphucphuctest-e2sowo3wj7v0:generateContent?key=${apiKey}`;

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


        // Kiểm tra và lấy phần text trả về
        if (response?.data?.candidates?.length > 0) {
            const aiResponse = response.data.candidates[0].content.parts[0].text
            return aiResponse;
        } else {
            return "Không có câu trả lời từ AI.";
        }
        } catch (error) {
            console.error('Error generating AI response:', error);
            return 'AI không thể trả lời lúc này.';
        }
    };

    const typeResponse = (responseText) => {
        let index = 0;
        setPartialResponse(''); // Reset response
        const interval = setInterval(() => {
            if (index < responseText.length) {
                setPartialResponse((prev) => prev + responseText[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Gõ 50ms/ký tự
    };

    const handleSend = useCallback(async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: 'user' },
            ]);
            setInput('');
            setIsLoading(true);

            const aiResponse = await generateAIResponse(input);
            setIsLoading(false);
            typeResponse(aiResponse);

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiResponse, sender: 'ai' },
            ]);
        }
    }, [input]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        // Tự động cuộn xuống cuối mỗi khi tin nhắn thêm mới
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div>
            {/* Chat bubble */}
            <div
                className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-96 h-[500px] scale-100' : 'w-16 h-16 scale-75'
                    } bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 transform ${isOpen ? 'translate-y-0' : 'translate-y-4'
                    } cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen && (
                    <span className="text-white font-bold text-2xl">💬</span>
                )}
            </div>

            {/* Chat window */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col">
                    {/* Chat header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="text-lg font-semibold">EBookAI</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition text-xl"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-xs px-4 py-2 rounded-xl shadow ${msg.sender === 'user'
                                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                                        : 'bg-white border border-gray-200 text-gray-800'
                                        }`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="text-sm text-gray-500 mb-1">🤖 AI:</div>
                                    )}
                                    {msg.sender === 'ai' && isLoading
                                        ? partialResponse
                                        : msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-gray-500 text-sm text-center">
                                AI đang trả lời...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat input */}
                    <div className="p-4 border-t border-gray-200 flex items-center space-x-3 bg-white">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className={`flex-1 px-4 py-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ${input.length > 0 ? 'w-[80%]' : 'w-[60%]'
                                }`}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button
                            onClick={handleSend}
                            className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow flex items-center justify-center transition ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-700'
                                }`}
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
                                'Gửi'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBubbleApp;
