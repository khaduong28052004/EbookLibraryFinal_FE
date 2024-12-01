import axios from 'axios';
import { validateContent } from './moderationService'; // Hàm kiểm tra ngưỡng

// Ngưỡng thiết lập
const thresholds = {
    toxic: 0.5,
    obscene: 0.5,
    insult: 0.3,
    identity_hate: 0.5,
    threat: 0.3,
    severe_toxic: 0.3,
};

// API Key (PAT) và văn bản kiểm tra
const PAT = 'c9bcfa03a89c476b91936cab785c8b0d';

// Hàm gọi API Clarifai để kiểm tra nội dung văn bản
export const predictTextModeration = async (RAW_TEXT) => {
    try {
        const response = await axios.post(
            `https://api.clarifai.com/v2/users/gnwcvstmaqvo/apps/my-first-application-b21dep/models/moderation-multilingual-text-classification/versions/79c2248564b0465bb96265e0c239352b/outputs`,
            {
                inputs: [
                    {
                        data: {
                            text: {
                                text: RAW_TEXT, // Sửa lại đúng thuộc tính 'text'
                            },
                        },
                    },
                ],
            },
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Key ${PAT}`,
                },
            }
        );

        // Xử lý kết quả trả về từ API
        const predictions = response.data.outputs[0].data.concepts.reduce((acc, concept) => {
            acc[concept.name] = concept.value;
            return acc;
        }, {});

        // Kiểm tra nội dung có vượt ngưỡng không
        const isContentValid = validateContent(predictions, thresholds);

        return isContentValid; // Trả về true nếu nội dung hợp lệ, false nếu không
    } catch (error) {
        console.error('Error calling Clarifai API:', error.message);
        return false; // Trả về false nếu xảy ra lỗi
    }
};
