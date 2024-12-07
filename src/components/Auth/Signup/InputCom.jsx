import React from 'react';

const InputCom = ({ placeholder, label, name, type, inputHandler, value, children,inputClasses }) => {
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
                    className={inputClasses}
                />
                {children}
            </div>
        </div>
    );
};

// block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6
// const InputCom = ({ label, name, type, placeholder, value, onChange, error, children }) => (
//     <div className="relative mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           id={name}
//           name={name}
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           className={`w-full px-3 py-2 border ${
//             error ? 'border-red-500' : 'border-gray-300'
//           } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
//         />
//         {children}
//       </div>
//       {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
//     </div>
//   );

export default InputCom;

