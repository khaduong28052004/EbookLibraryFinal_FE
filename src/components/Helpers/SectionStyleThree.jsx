import LazyLoad from "react-lazyload";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products,
  endLength,
  totalPages,
  onChange
}) {
  // const handleChangePage = () => {
  //   if (endLength + 4 <= totalPages) {
  //     onChange(endLength + 4);
  //   } else if (endLength + 4 > totalPages) {
  //     onChange(totalPages);
  //   }
  // }
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <DataIteration datas={products} startLength={0} endLength={products?.length}>
              {({ datas }) => (
                <div data-aos="fade-up" key={datas.id} className="item">
                  <LazyLoad
                    // once={true}
                    key={datas?.id}
                    height={100}
                    offset={[-100, 100]}
                    // placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    //   <div class="animate-pulse flex space-x-4">
                    //     <div class="flex-1 space-y-3 py-1">
                    //       <div class="rounded-none bg-slate-700 h-[165px] w-full"></div>
                    //       <div class="h-5 bg-slate-700 rounded"></div>
                    //       <div class="h-5 bg-slate-700 rounded"></div>
                    //       <div class="space-y-3">
                    //         <div class="grid grid-cols-4 gap-4">
                    //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                    //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                    //         </div>
                    //         {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>}
                    placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-3 py-1">
                          <div class="rounded-none bg-slate-700 h-[165px] w-full"></div>
                          <div class="h-5 bg-slate-700 rounded"></div>
                          <div class="h-5 bg-slate-700 rounded"></div>
                          <div class="space-y-3">
                            <div class="grid grid-cols-4 gap-4">
                              <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                              <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                            </div>
                            {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                          </div>
                        </div>
                      </div>
                    </div>}
                  >
                    <div>
                      <ProductCardStyleOne datas={datas} />
                    </div>
                  </LazyLoad>
                </div>
              )}
            </DataIteration>
          </div>
        </div>
        {/* <div className="flex justify-center mt-5">
          <button className="sm:text-1xl text-xl font-600 text-qblacktext leading-none" onClick={handleChangePage}>Xem thêm</button>
        </div> */}
      </ViewMoreTitle>

    </div>
  );
}
