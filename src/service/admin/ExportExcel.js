import { utils, writeFile } from 'xlsx'; // Thư viện để xuất Excel

export const ExportExcel = (filename, sheetNames, dataSheets) => {
    const workbook = utils.book_new(); // Tạo workbook mới
    // Kiểm tra xem số lượng tên sheet và dữ liệu có khớp không
    if (dataSheets.length !== sheetNames.length) {
        throw new Error("Số lượng tên sheet phải bằng số lượng dữ liệu.");
    }

    dataSheets.forEach((data, index) => {
        if (Array.isArray(data) && data.length > 0) {
            const worksheet = utils.json_to_sheet(data); // Chuyển dữ liệu sang định dạng Excel
            utils.book_append_sheet(workbook, worksheet, sheetNames[index]); // Thêm sheet với tên do người dùng đặt
        }
    });
    writeFile(workbook, filename); // Xuất file Excel
};