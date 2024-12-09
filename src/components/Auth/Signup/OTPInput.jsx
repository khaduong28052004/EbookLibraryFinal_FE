import React, { useRef, useState } from 'react';

const OTPInput = ({ length = 4, onComplete }) => {
    const inputRef = useRef(Array(length).fill(null));
    const [OTP, setOTP] = useState(Array(length).fill(''));

    const handleTextChange = (input, index) => {
        // Only allow numeric input
        if (!/^\d*$/.test(input)) return; // Ignore non-numeric input

        const newPin = [...OTP];
        newPin[index] = input;
        setOTP(newPin);

        // Automatically focus on the next input field if a digit is entered
        if (input.length === 1 && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        // Automatically focus on the previous input field if the digit is deleted
        if (input.length === 0 && index > 0) {
            inputRef.current[index - 1]?.focus();
        }

        // If all digits are entered, call the onComplete function
        if (newPin.every((digit) => digit !== '')) {
            onComplete(newPin.join(''));
        }
    };

    return (
        <div className="flex justify-center space-x-3">
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={OTP[index]}
                    onChange={(e) => handleTextChange(e.target.value, index)}
                    ref={(ref) => (inputRef.current[index] = ref)}
                    className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                    style={{ marginRight: index === length - 1 ? '0' : '10px' }}
                    inputMode="numeric" // Ensure only numeric keypad is shown on mobile
                />
            ))}
        </div>
    );
};

export default OTPInput;
