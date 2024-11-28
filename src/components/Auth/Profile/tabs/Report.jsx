
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ReportedShops = () => {
//   const [reportedShops, setReportedShops] = useState([]);

//   useEffect(() => {
//     const getReportedShops = async () => {
//       const accountId = sessionStorage.getItem("id_account") || 1;
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/v1/reports/${accountId}`
//         );
//         setReportedShops(response.data);
//       } catch (error) {
//         console.error("Error fetching reported shops:", error);
//       }
//     };

//     getReportedShops();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Tiêu đề chính */}
//       <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
//         Báo cáo của bạn
//       </h1>

//       {/* Phần mô tả */}
//       <p className="text-gray-600 text-center mb-6">
//         Đây là danh sách các cửa hàng mà bạn đã gửi báo cáo. Vui lòng kiểm tra
//         trạng thái xử lý để biết thêm thông tin.
//       </p>

//       {/* Nội dung chính */}
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
//         Danh sách các cửa hàng bị báo cáo
//       </h2>
//       {reportedShops.length === 0 ? (
//         <p className="text-gray-500 text-center">
//           Chưa có cửa hàng nào được báo cáo.
//         </p>
//       ) : (
//         <ul className="space-y-6">
//           {reportedShops.map((item) => (
//             <li
//               key={item.id}
//               className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-300"
//             >
//               {/* Tiêu đề của mỗi mục */}
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {item.shop.shopName}
//                   </h3>
//                 </div>
//                 <div className="text-sm">
//                   <span
//                     className={`px-3 py-1 rounded-full text-white font-medium ${
//                       item.status
//                         ? "bg-green-500"
//                         : "bg-red-500 animate-pulse"
//                     }`}
//                   >
//                     {item.status ? "Đã giải quyết" : "Đang chờ"}
//                   </span>
//                 </div>
//               </div>

//               {/* Ngày gửi báo cáo */}
//               <p className="text-sm text-gray-600 mt-2">
//                 Ngày gửi: {new Date(item.createAt).toLocaleDateString("vi-VN")}
//               </p>

//               {/* Nội dung báo cáo */}
//               <div className="mt-3">
//                 <h4 className="font-medium text-gray-700 mb-1">Nội dung: {item.title}</h4>
//                 <p className="text-gray-700 italic">{item.content}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ReportedShops;
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedShops = () => {
  const [reportedShops, setReportedShops] = useState([]);

  useEffect(() => {
    const getReportedShops = async () => {
      const accountId = sessionStorage.getItem("id_account") || 1;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/reports/${accountId}`
        );
        setReportedShops(response.data);
      } catch (error) {
        console.error("Error fetching reported shops:", error);
      }
    };

    getReportedShops();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Tiêu đề chính */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Báo cáo của bạn
      </h1>

      {/* Phần mô tả */}
      <p className="text-gray-600 text-center mb-6">
        Đây là danh sách các cửa hàng mà bạn đã gửi báo cáo. Vui lòng kiểm tra
        trạng thái xử lý để biết thêm thông tin.
      </p>

      {/* Nội dung chính */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
        Danh sách các cửa hàng bị báo cáo
      </h2>
      {reportedShops.length === 0 ? (
        <p className="text-gray-500 text-center">
          Chưa có cửa hàng nào được báo cáo.
        </p>
      ) : (
        <ul className="space-y-6">
          {reportedShops.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              {/* Tiêu đề của mỗi mục */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.shop.shopName}
                  </h3>
                </div>
                <div className="text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-medium ${
                      item.status
                        ? "bg-green-500"
                        : "bg-red-500 animate-pulse"
                    }`}
                  >
                    {item.status ? "Đã giải quyết" : "Đang chờ"}
                  </span>
                </div>
              </div>

              {/* Ngày gửi báo cáo */}
              <p className="text-sm text-gray-600 mt-2">
                Ngày gửi báo cáo:{" "}
                {new Date(item.createAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                {new Date(item.createAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>

              {/* Nội dung báo cáo */}
              <div className="mt-3">
                <h4 className="font-medium text-gray-700 mb-1">Nội dung: {item.title}</h4>
                <p className="text-gray-700 italic">{item.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportedShops;
