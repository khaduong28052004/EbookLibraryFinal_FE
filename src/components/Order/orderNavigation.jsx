import React from "react";
import { NavItems } from "../Auth/Profile/tabs/OrderTab";


export default function OrderNavigation({ activeMenu, setActiveMenu }) {
  return (

    <nav className="p-1 bg-gray-100 shadow md:items-center md:flex md:justify-center rounded-full"> {NavItems.map((status) => (

      <ul key={status.name} className="" >
        <li className={` my-1 py-1 px-4 flex justify-center text-[10px] font-semibold duration-600 ${activeMenu === status.tabName ? "text-gray-950 bg-white rounded-full shadow hover:cursor-pointer " : "bg-transparent text-gray-500   hover:cursor-pointer  hover:text-gray-950"}`}>
          <a onClick={() => setActiveMenu(status.tabName)} className="">
            {status.name}
          </a>
        </li>
      </ul>
    ))}
    </nav>
  );
};
