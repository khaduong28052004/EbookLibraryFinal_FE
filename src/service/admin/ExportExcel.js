import { utils, writeFile } from 'xlsx'; // Thư viện để xuất Excel


const removeEmptyColumns = (data) => {
    if (!Array.isArray(data) || data.length === 0) return data;

    // Lấy danh sách các cột (keys) từ hàng đầu tiên
    const columns = Object.keys(data[0]);

    // Xác định các cột không rỗng
    const nonEmptyColumns = columns.filter((col) =>
        data.some((row) => row[col] !== null && row[col] !== undefined && row[col] !== "")
    );

    // Tạo dữ liệu mới chỉ chứa các cột không rỗng
    return data.map((row) =>
        nonEmptyColumns.reduce((acc, col) => {
            acc[col] = row[col];
            return acc;
        }, {})
    );
};

export const ExportExcel = (filename, sheetNames, dataSheets) => {
    const workbook = utils.book_new(); 

    if (dataSheets.length !== sheetNames.length) {
        throw new Error("Số lượng tên sheet phải bằng số lượng dữ liệu.");
    }

    dataSheets.forEach((data, index) => {
        if (Array.isArray(data) && data.length > 0) {
            // Lọc bỏ các cột rỗng trước khi xuất
            const filteredData = removeEmptyColumns(data);

            // Chuyển dữ liệu đã lọc sang worksheet
            const worksheet = utils.json_to_sheet(filteredData);

            // Thêm sheet với tên tương ứng
            utils.book_append_sheet(workbook, worksheet, sheetNames[index]);
        }
    });

    // Xuất file Excel
    writeFile(workbook, filename);
};
