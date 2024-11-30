import axios from 'axios';
import { validateContent } from './moderationService';

// Ngưỡng thiết lập
const thresholds = {
    toxic: 0.1,
    obscene: 0.1,
    insult: 0.05,
    identity_hate: 0.05,
    threat: 0.05,
    severe_toxic: 0.05,
};

// API Details
const PAT = 'c9bcfa03a89c476b91936cab785c8b0d';
const USER_ID = 'gnwcvstmaqvo';
const APP_ID = 'my-first-application-b21dep';
const MODEL_ID = 'moderation-multilingual-text-classification';
const MODEL_VERSION_ID = '79c2248564b0465bb96265e0c239352b';
const RAW_TEXT = 'I love your product very much';

export const predictTextModeration = async () => {
    try {
        const response = await axios.post(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
            {
                user_app_id: {
                    user_id: USER_ID,
                    app_id: APP_ID,
                },
                inputs: [
                    {
                        data: {
                            text: {
                                raw: RAW_TEXT,
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

        // Xử lý kết quả trả về
        const predictions = response.data.outputs[0].data.concepts.reduce((acc, concept) => {
            acc[concept.name] = concept.value;
            return acc;
        }, {});

        // Kiểm tra tính hợp lệ
        const isContentValid = validateContent(predictions, thresholds);

        return isContentValid; // Trả về true hoặc false
    } catch (error) {
        console.error('Error:', error);
        return false; // Lỗi trong quá trình xử lý
    }
};
