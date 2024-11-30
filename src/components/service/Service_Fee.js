import axios from "axios";



export const service = async (fromAddress, addressTo) => {
    // console.log("district from" + fromAddress.district);
    // console.log("wardCode from" + fromAddress.wardCode);
    // console.log("district To " + addressTo.district);
    // console.log("wardCode to " + addressTo.wardCode);
    try {
        const result = await axios.get(
            "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
            {
                params: {
                    "shop_id": 885,
                    "from_district": fromAddress.district,
                    "to_district": addressTo.district
                },
                headers: {
                    'Content-Type': 'application/json',
                    'token': "87b48598-2325-11ef-a951-76299e96dead", // Token
                },
            }
        );

        // Lấy `service_id` từ kết quả
        const { service_id } = result?.data?.data[0];
        // if (!service_id) {
        //     throw new Error("Service ID not found in response.");
        // }
        return { service_id };
    } catch (error) {
        console.error("Error fetching service:", error.response ? error.response.data : error.message);
        throw error; // Quăng lỗi để xử lý phía trên (nếu cần)
    }
};


async function Service_Fee(serviceId, weight, quantity, fromAddress, addressTo) {
    // console.log("district from" + fromAddress.district);
    // console.log("wardCode from" + fromAddress.wardCode);
    // console.log("district To " + addressTo.district);
    console.log("quantity " + quantity);
    console.log("weight" + weight);
    try {
        // Gửi yêu cầu POST với dữ liệu trong phần 'data'
        const result = await axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", {
            "service_id": serviceId,
            "from_district_id": fromAddress.district,
            "from_ward_code": fromAddress.wardCode,
            "to_district_id": addressTo.district,
            "to_ward_code": addressTo.wardCode,
            "weight": weight * quantity,
            "insurance_value": 0,
            "coupon": null,
            // "quantity":2000,
            // "items": [
            //     {
            //         "name": "TEST1",
            //         "quantity": 2000,
            //         "weight":4100

            //     }
            // ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'token': "87b48598-2325-11ef-a951-76299e96dead"  // Token
            }
        });

        // Kiểm tra xem dữ liệu trả về có hợp lệ không
        if (result?.data?.data) {
            const { service_fee } = result.data.data;
            return { service_fee };
        } else {
            throw new Error("Invalid response structure.");
        }
    } catch (error) {
        // Log lỗi chi tiết và trả về thông báo lỗi
        console.error("Error in fetching service fee:", error.response ? error.response.data : error.message);
        return Promise.reject(error.response ? error.response.data : error.message);
    }
};

export default Service_Fee;
