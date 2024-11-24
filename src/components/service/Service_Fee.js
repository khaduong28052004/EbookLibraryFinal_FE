import axios from "axios";


async function Service_Fee(weight, quantity, fromAddress, addressTo) {
    console.log("district from" + fromAddress.district);
    console.log("wardCode from" + fromAddress.wardCode);
    console.log("district To " + addressTo.district);
    console.log("wardCode to " + addressTo.wardCode);
    console.log("id" + fromAddress.id)
    try {
        // Gửi yêu cầu POST với dữ liệu trong phần 'data'
        const result = await axios.post("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee", {
            "service_id": 53321,
            "from_district_id": 1823,
            "from_ward_code": "640706",
            "to_district_id": 1452,
            "to_ward_code": "21010",
            "weight": weight,
            "insurance_value": 0,
            "coupon": null,
            "items": [
                {
                    "name": "TEST1",
                    "quantity": quantity

                }
            ]
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
