import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportedShops = () => {
  const [activeTab, setActiveTab] = useState('shops');
  const [reportedShops, setReportedShops] = useState([]);
  const [reportedProducts, setReportedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url_host = import.meta.env.VITE_API_BASEURL;
  useEffect(() => {
    const getReportedShops = async () => {
      const accountId = sessionStorage.getItem('id_account') || 1;
      try {
        const response = await axios.get(
          `${url_host}/api/v1/reports/${accountId}`,
        );
        setReportedShops(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu báo cáo cửa hàng:', error);
      }
    };
    getReportedShops();
  }, []);

  useEffect(() => {
    const getReportedProducts = async () => {
      const accountId = sessionStorage.getItem('id_account') || 1;
      try {
        const response = await axios.get(
          `${url_host}/api/v1/reports/product/${accountId}`,
        );
        setReportedProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu báo cáo sản phẩm:', error);
      }
    };
    getReportedProducts();
  }, []);

  const filteredItems =
    activeTab === 'shops'
      ? reportedShops.filter(
          (item) =>
            (item.shop?.shopName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              item.content?.toLowerCase().includes(searchTerm.toLowerCase())) ??
            false,
        )
      : reportedProducts.filter(
          (item) =>
            (item.product?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              item.content?.toLowerCase().includes(searchTerm.toLowerCase())) ??
            false,
        );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Báo cáo
      </h1>
      <hr className="mb-6" />

      {/* Thanh tìm kiếm và tabs */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('shops')}
            className={`px-6 py-2 font-medium rounded-lg transition ${
              activeTab === 'shops'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Cửa hàng
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 font-medium rounded-lg transition ${
              activeTab === 'products'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Sản phẩm
          </button>
        </div>
        <input
          type="text"
          placeholder={`Tìm kiếm theo ${
            activeTab === 'shops'
              ? 'cửa hàng hoặc nội dung'
              : 'sản phẩm hoặc nội dung'
          }`}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-gray-500 text-center">
          Chưa có báo cáo {activeTab === 'shops' ? 'cửa hàng' : 'sản phẩm'}.
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {activeTab === 'shops'
                      ? item.shop?.shopName || 'Tên cửa hàng không có'
                      : `Sản phẩm: ${
                          item.product?.name || 'Tên sản phẩm không có'
                        }`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ngày gửi:{' '}
                    {new Date(item.createAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}{' '}
                    {new Date(item.createAt).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </p>
                </div>
                <div className="text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-medium ${
                      item.status ? 'bg-green-500' : 'bg-red-500 animate-pulse'
                    }`}
                  >
                    {item.status ? 'Đã giải quyết' : 'Đang chờ'}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium text-gray-700 mb-1">
                  Tiêu đề: {item.title}
                </h4>
                <p className="text-gray-700 italic">Nội dung: {item.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportedShops;
