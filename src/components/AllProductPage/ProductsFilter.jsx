import axios from "axios";
import { useEffect, useState } from "react";
import { Range } from "react-range";

export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
  categories,
  handleSelected,
  setPage
}) {
  const [selected, setSelected] = useState();
  useEffect(() => {
    // const selectedFilter = categories?.reduce((acc, category) => {
    //   acc[category.id] = false;
    //   return acc;
    // }, {});
    var selectedFilter = {};
    categories?.forEach(category => {
      selectedFilter[category?.id] = false;
    })
    setSelected(selectedFilter);
  }, []);
  const changeSelected = (event) => {
    selected[event.target.value] = event.target.checked;
    handleSelected(selected);
    for (let item in selected) {
      console.log("length " + Object.keys(selected).length);
    }
    setPage(0);
  }


  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""
          }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Thể loại
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {categories?.map(category => (
                <li className="item flex justify-between items-center mb-5">
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <input onChange={(event) => changeSelected(event)} value={category.id} type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 border-gray-300 flex items-center" />
                    </div>
                    <div>
                      <label
                        htmlFor="mobileLaptop"
                        className="text-xs font-black font-400 capitalize"
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                </li>
              ))}

            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Giá</h1>
          </div>
          <div className="price-range mb-5">
            <Range
              draggableTrack
              step={1}
              max={1000000}
              min={0}
              values={volume}
              onChange={volumeHandler}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full bg-qgray-border rounded-md"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="h-4 w-4 bg-qyellow rounded-full" />
              )}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Giá: {(volume[0]) }<sup>đ</sup> - {(volume[1])}<sup>đ</sup>
          </p>
        </div>

        <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
