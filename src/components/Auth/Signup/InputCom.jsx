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
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6"
                />
                {children}
            </div>
        </div>
    );
};

export default InputCom;

