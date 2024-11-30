// moderationService.js

/**
 * Kiểm tra tính hợp lệ của nội dung dựa trên ngưỡng
 * @param {Object} predictions - Dữ liệu dự đoán với các nhãn và giá trị xác suất
 * @param {Object} thresholds - Ngưỡng giới hạn cho từng nhãn
 * @returns {Boolean} - Trả về true nếu dữ liệu hợp lệ, false nếu không
 */
export const validateContent = (predictions, thresholds) => {
    for (let key in predictions) {
      if (predictions[key] > thresholds[key]) {
        return false; // Nội dung không hợp lệ
      }
    }
    return true; // Nội dung hợp lệ
  };
  