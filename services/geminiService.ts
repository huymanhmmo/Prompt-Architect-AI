import { GoogleGenAI, Type } from "@google/genai";
import { Answers, AdvancedConfig, Question } from '../types';
import { QUESTIONS } from '../utils/questions';

function buildPrompt(answers: Answers): string {
    let prompt = `
Hãy đóng vai một Kỹ sư Giải pháp (Solutions Architect) chuyên nghiệp. Dựa trên các thông tin yêu cầu về dự án phần mềm dưới đây, hãy tạo ra một "Technical Prompt" chi tiết và toàn diện. Prompt này sẽ được sử dụng để một mô hình AI khác (như Claude 3, GPT-4) có thể tạo ra một bản kế hoạch phát triển phần mềm (software development plan) hoàn chỉnh.

**Yêu cầu về "Technical Prompt" đầu ra:**
*   **Ngôn ngữ:** Tiếng Việt.
*   **Định dạng:** Markdown, có cấu trúc rõ ràng với các đề mục và danh sách.
*   **Nội dung:** Phải bao gồm, phân tích và mở rộng các điểm sau đây dựa trên thông tin được cung cấp. Phải suy luận và thêm vào các chi tiết kỹ thuật cần thiết mà một lập trình viên hoặc product manager sẽ cần.
    *   **Project Overview:** Tóm tắt dự án, mục tiêu, và đối tượng người dùng.
    *   **Core Functionalities:** Liệt kê và mô tả chi tiết các tính năng chính, bao gồm cả luồng người dùng (user flows) nếu có thể.
    *   **Non-Functional Requirements:** Phân tích chi tiết các yêu cầu về hiệu năng, bảo mật, khả năng mở rộng.
    *   **Suggested Tech Stack:** Đề xuất một stack công nghệ (frontend, backend, database, deployment) phù hợp nhất với các yêu cầu và giải thích lý do lựa chọn.
    *   **Architecture Design:** Đề xuất một kiến trúc hệ thống cấp cao (ví dụ: Monolithic, Microservices, Serverless) và giải thích sự phù hợp.
    *   **Data Model:** Đề xuất một sơ đồ dữ liệu cơ bản cho các thực thể chính.
    *   **API Endpoints (if applicable):** Liệt kê các API endpoint chính cần có.
    *   **Testing Strategy:** Đề xuất chiến lược kiểm thử (unit, integration, e2e).
    *   **Deployment & DevOps:** Đề xuất quy trình CI/CD và môi trường triển khai.
*   **Giọng văn:** Chuyên nghiệp, kỹ thuật, rõ ràng và súc tích.

---

**Thông tin chi tiết về dự án do người dùng cung cấp:**
`;

    QUESTIONS.forEach(question => {
        const answer = answers[question.id];
        if (typeof answer === 'string' && answer.trim() !== '') {
            prompt += `\n**${question.promptLabel}:**\n${answer}\n`;
        }
    });

    return prompt;
}

export const generateTechnicalPrompt = async (
    answers: Answers,
    config: AdvancedConfig
): Promise<string> => {
    if (!config.apiKey) {
        throw new Error("API Key không được cung cấp.");
    }
    
    const ai = new GoogleGenAI({ apiKey: config.apiKey });
    
    const prompt = buildPrompt(answers);

    try {
        const response = await ai.models.generateContent({
            model: config.model,
            contents: prompt,
            config: {
                temperature: config.temperature,
                topP: config.topP,
                topK: config.topK,
            },
        });
        
        return response.text;
    } catch (error: any) {
        console.error("Error generating content from Gemini API:", error);
        if (error.message.includes('API key not valid')) {
             throw new Error("API Key không hợp lệ. Vui lòng kiểm tra lại.");
        }
        throw new Error("Không thể tạo prompt. Đã có lỗi xảy ra từ API.");
    }
};

export const generateSuggestionsForQuestionGroup = async (
    initialAnswers: Pick<Answers, 'purpose' | 'targetAudience' | 'mainFeatures'>,
    questionsToSuggest: Question[],
    config: AdvancedConfig
): Promise<Answers> => {
    if (!config.apiKey) {
        throw new Error("API Key không được cung cấp để tạo gợi ý.");
    }
    if (questionsToSuggest.length === 0) {
        return {};
    }

    const ai = new GoogleGenAI({ apiKey: config.apiKey });
    
    const questionIdsToSuggest = questionsToSuggest.map(q => q.id);

    const prompt = `
Hãy đóng vai một Kỹ sư Giải pháp (Solutions Architect) hiệu quả. Dựa trên ý tưởng cốt lõi của một dự án phần mềm, hãy đưa ra các gợi ý súc tích cho các hạng mục sau.

**Ý tưởng cốt lõi của dự án:**
*   **Mục đích chính:** ${initialAnswers.purpose || 'Chưa rõ'}
*   **Đối tượng người dùng:** ${initialAnswers.targetAudience || 'Chưa rõ'}
*   **Tính năng chính:** ${initialAnswers.mainFeatures || 'Chưa rõ'}

**Yêu cầu:**
*   Đưa ra câu trả lời cho các hạng mục được yêu cầu dưới dạng một đối tượng JSON.
*   Các câu trả lời phải ngắn gọn, đi thẳng vào vấn đề và phù hợp với ý tưởng cốt lõi.
*   **TUYỆT ĐỐI CHỈ TRẢ VỀ MỘT ĐỐI TƯỢNG JSON HỢP LỆ, KHÔNG CÓ BẤT KỲ GIẢI THÍCH HAY KÝ TỰ NÀO KHÁC BÊN NGOÀI.**

Các key trong JSON phải là: ${questionIdsToSuggest.join(', ')}.
`;
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: questionIdsToSuggest.reduce((acc, qId) => {
            acc[qId] = { type: Type.STRING };
            return acc;
        }, {} as Record<string, { type: Type }>)
    };

    try {
        const response = await ai.models.generateContent({
            model: config.model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0, // Explicitly set for deterministic JSON output
            },
        });

        const jsonString = response.text;
        const suggestedAnswers = JSON.parse(jsonString);

        return suggestedAnswers as Answers;
        
    } catch (error: any) {
        console.error("Error generating suggestions for group from Gemini API:", error);
         if (error.message.includes('API key not valid')) {
             throw new Error("API Key không hợp lệ. Vui lòng kiểm tra lại.");
        }
        throw new Error("Không thể tạo gợi ý. Đã có lỗi xảy ra từ API.");
    }
};