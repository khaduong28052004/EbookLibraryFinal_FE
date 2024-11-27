import Empty from "./Empty";

export default function EmptyWishlistError() {
  return (
    <div className="wishlist-card-wrapper w-full">
      <div className="flex justify-center items-center w-full">
        <div>
          <div className="sm:mb-10 mb-0 transform sm:scale-100 scale-50">
            <Empty />
          </div>
          <div data-aos="fade-up" className="wishlist-content w-full">
            <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
              Empty! You don’t Wishlist any Products
            </h1>
            <a href="/">
              <div className="flex justify-center w-full ">
                <div className="w-[180px] h-[50px] ">
                  <span type="button" className="flex items-center justify-center h-full w-full bg-sky-500 text-[13px] font-semibold text-[#1d1d1d] leading-none">
                    Back to Shop
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
