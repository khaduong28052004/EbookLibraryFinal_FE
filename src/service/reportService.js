import axios from "axios";

// Hàm gọi API lấy báo cáo từ tài khoản
export const fetchReportsByAccountId = async (accountId) => {
    try {
        const response = await axios.get(`/api/v1/reports/${accountId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reports:", error);
        return [];
    }
};
