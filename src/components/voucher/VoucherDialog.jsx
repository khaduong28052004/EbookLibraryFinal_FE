import React, { useEffect, useState } from 'react';

const VoucherDialog = ({ open, onClose, sellers, onSelectVoucher, selected, sellerId, totalOrderSeller, datas }) => {
  const [selectedVoucher, setSelectedVoucher] = useState({});
  // const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   if (open) {
  //     const filteredSellers = sellers.filter(seller => seller.id == sellerId);
  //     setDatas(filteredSellers);
  //     const selectedVouchers = selected.filter(seller => seller.id == sellerId);
  //     setSelectedVoucher(selectedVouchers[0]);

  //   }
  // }, [open, selected, totalOrderSeller]);

  useEffect(() => {
    setSelectedVoucher(selected);
  }, [datas])
  const handleVoucherClick = (voucher) => {
    if (totalOrderSeller > voucher?.minOrder) {
      const updatedVoucher = {
        "sellerId": sellerId,
        voucher: voucher
      };
      setSelectedVoucher(voucher);
      onSelectVoucher(updatedVoucher);
    }
  };


  const date = (date) => {
    const endDate = new Date(date);
    if (isNaN(endDate)) {
      return "Ngày không hợp lệ.";
    }
    const now = new Date();
    const timeDifference = endDate - now;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 24);
    if (day > 0) {
      return day + " ngày."
    } else if (hours > 0) {
      return hours + " giờ."
    } else if (minutes > 0) {
      return minutes + " phút"
    } else {
      return seconds + " giây";
    }
  }
  return (
    <div>

      {open && (
        <div className="fixed z-[1000] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img src="https://cdn-www.vinid.net/5ab07290-artboard-1-copy@3x-2-1.png" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Chọn Voucher
                    </h3>
                    <div className="mt-2">
                      <ul className="divide-y divide-gray-200">
                        {
                          datas.length ? (
                            datas.map((voucher, index) => (<li key={index} className="py-3 list-none">
                              <button
                                className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium border-2 text-gray-700 ${selectedVoucher?.id === voucher.id ? '' : 'hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${selectedVoucher?.id === voucher.id ? 'bg-indigo-500 text-white' : ''}`}
                                onClick={() => handleVoucherClick(voucher)}
                              >
                                <div className="flex">
                                  <div className="mr-3">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/5816/5816793.png"
                                      alt={voucher.title}
                                      className="h-auto w-20 border-r-2 pr-2"
                                    />
                                  </div>
                                  <span className="flex flex-col text-left">
                                    <span className="font-bold text-base">
                                      Giảm {voucher.sale}<sup>%</sup>, {voucher.name}
                                    </span>
                                    <span className="font-bold text-sm">
                                      Đơn giá tối thiểu {voucher.minOrder / 1000}k
                                    </span>
                                    <span className="font-normal text-xs">
                                      Còn lại {voucher.quantity}, còn {date(voucher.dateEnd)}
                                    </span>
                                  </span>
                                </div>
                              </button>
                            </li>))
                          ) : (
                            <div>Không có voucher nào.</div>
                          )
                        }

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
                <button type="button" className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherDialog;