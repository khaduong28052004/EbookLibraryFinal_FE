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
  const handleChangePage = () => {
    if (endLength + 4 <= totalPages) {
      onChange(endLength + 4);
    } else if (endLength + 4 > totalPages) {
      onChange(totalPages);
    }
  }
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <DataIteration datas={products?.datas} startLength={0} endLength={endLength}>
              {({ datas }) => (
                <div data-aos="fade-up" key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button className="sm:text-1xl text-xl font-600 text-qblacktext leading-none" onClick={handleChangePage}>Xem thêm</button>
        </div>
      </ViewMoreTitle>

    </div>
  );
}
