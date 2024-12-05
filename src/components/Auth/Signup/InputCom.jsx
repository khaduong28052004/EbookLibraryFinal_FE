import React from 'react';

const InputCom = ({ placeholder, label, name, type, inputHandler, value, children }) => {
    return (
        <div className="input-com w-full h-full">
            <label htmlFor={name} className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
                {label}
            </label>
            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                <input
                    placeholder={placeholder}
                    name={name}
                    type={type}
                    onChange={inputHandler}
                    value={value}
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                />
                {children}
            </div>
        </div>
    );
};

export default InputCom;

