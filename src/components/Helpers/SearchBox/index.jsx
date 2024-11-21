import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ className, type }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchText(event.target.value); // Cập nhật giá trị của input vào state
  };

  const handleSubmitSearch = () => {
    navigate(`/search?text=${searchText}`); // Điều hướng đến trang tìm kiếm với tham số query là searchText
  };
  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${className || ""
          }`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form action="#" className="h-full">
            <input
              onChange={(event) => handleChange(event)}
              id="search"
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm..."
            />
          </form>
        </div>
        <div className="w-[1px] h-[22px] bg-qgray-border"></div>

        <button
          className={` w-[93px] h-full text-sm font-600 text-gray-700`}
          type="button" onClick={() => handleSubmitSearch()}
        >
          Tìm Kiếm
        </button>

      </div>

    </>
  );
}
