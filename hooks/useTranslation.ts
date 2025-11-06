import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Simple translation store. In a real app, this would be in separate JSON files.
const translations = {
  en: {
    question_purpose_label: 'What is the main purpose of your project?',
    question_purpose_placeholder: 'e.g., To build an e-learning platform for kids...',
    question_targetAudience_label: 'Who is the target audience?',
    question_targetAudience_placeholder: 'e.g., Children aged 8-12, professional developers...',
    question_mainFeatures_label: 'What are the main features?',
    question_mainFeatures_placeholder: 'List the key functionalities, e.g., user authentication, course creation, video streaming...',
    question_uiComplexity_label: 'Describe the desired UI/UX complexity.',
    question_uiComplexity_placeholder: 'e.g., Minimalistic and simple, highly interactive with animations, data-heavy dashboard...',
    question_techStack_label: 'Any preferred technologies or frameworks?',
    question_techStack_placeholder: 'e.g., React, Vue, Python, Node.js, AWS, Firebase... (optional)',
    question_dataStorage_label: 'What are the data storage requirements?',
    question_dataStorage_placeholder: 'e.g., Relational database (PostgreSQL), NoSQL (MongoDB), file storage (S3)...',
    question_integrations_label: 'Any third-party integrations needed?',
    question_integrations_placeholder: 'e.g., Stripe for payments, Google Maps API, Twilio for SMS...',
    question_scalability_label: 'What are the scalability requirements?',
    question_scalability_placeholder: 'e.g., Expecting 100 concurrent users at launch, scaling to 10,000 within a year...',
    question_security_label: 'What are the key security requirements?',
    question_security_placeholder: 'e.g., User authentication, data encryption, compliance with GDPR/HIPAA...',
    question_performance_label: 'What are the performance expectations?',
    question_performance_placeholder: 'e.g., Page load times under 2 seconds, API response time under 200ms...',
    question_testing_label: 'What is the desired testing strategy?',
    question_testing_placeholder: 'e.g., High unit test coverage, end-to-end testing with Cypress...',
    question_deployment_label: 'What is the preferred deployment environment?',
    question_deployment_placeholder: 'e.g., Vercel, Netlify, AWS, Google Cloud, a private server...',
    question_analytics_label: 'What analytics need to be tracked?',
    question_analytics_placeholder: 'e.g., User engagement metrics, conversion funnels, performance monitoring...',
    question_compliance_label: 'Are there any regulatory compliance needs?',
    question_compliance_placeholder: 'e.g., GDPR, HIPAA, PCI DSS...',
    question_targetMarket_label: 'What is the target market?',
    question_targetMarket_placeholder: 'e.g., Global, specific countries (USA, Vietnam), specific industries...',
    question_budget_label: 'What is the estimated budget?',
    question_budget_placeholder: 'e.g., <$10k, $10k-$50k, >$50k...',
    question_timeline_label: 'What is the desired project timeline?',
    question_timeline_placeholder: 'e.g., 3 months for MVP, 6-12 months for full launch...',
    question_teamSize_label: 'What is the size of the development team?',
    question_teamSize_placeholder: 'e.g., Solo developer, 2-5 people, 10+ people...',
    error_generic: 'An unexpected error occurred. Please try again.',
  },
  vi: {
    question_purpose_label: 'Mục đích chính của dự án là gì?',
    question_purpose_placeholder: 'Ví dụ: Xây dựng nền tảng e-learning cho trẻ em...',
    question_targetAudience_label: 'Đối tượng mục tiêu là ai?',
    question_targetAudience_placeholder: 'Ví dụ: Trẻ em 8-12 tuổi, lập trình viên chuyên nghiệp...',
    question_mainFeatures_label: 'Các tính năng chính là gì?',
    question_mainFeatures_placeholder: 'Liệt kê các chức năng chính, ví dụ: xác thực người dùng, tạo khóa học, streaming video...',
    question_uiComplexity_label: 'Mô tả độ phức tạp UI/UX mong muốn.',
    question_uiComplexity_placeholder: 'Ví dụ: Tối giản và đơn giản, tương tác cao với hiệu ứng, dashboard nhiều dữ liệu...',
    question_techStack_label: 'Có ưu tiên công nghệ hay framework nào không?',
    question_techStack_placeholder: 'Ví dụ: React, Vue, Python, Node.js, AWS, Firebase... (không bắt buộc)',
    question_dataStorage_label: 'Yêu cầu về lưu trữ dữ liệu là gì?',
    question_dataStorage_placeholder: 'Ví dụ: Cơ sở dữ liệu quan hệ (PostgreSQL), NoSQL (MongoDB), lưu trữ file (S3)...',
    question_integrations_label: 'Có cần tích hợp bên thứ ba nào không?',
    question_integrations_placeholder: 'Ví dụ: Stripe cho thanh toán, Google Maps API, Twilio cho SMS...',
    question_scalability_label: 'Yêu cầu về khả năng mở rộng là gì?',
    question_scalability_placeholder: 'Ví dụ: Dự kiến 100 người dùng đồng thời khi ra mắt, mở rộng lên 10,000 trong một năm...',
    question_security_label: 'Các yêu cầu bảo mật chính là gì?',
    question_security_placeholder: 'Ví dụ: Xác thực người dùng, mã hóa dữ liệu, tuân thủ GDPR/HIPAA...',
    question_performance_label: 'Kỳ vọng về hiệu suất như thế nào?',
    question_performance_placeholder: 'Ví dụ: Thời gian tải trang dưới 2 giây, thời gian phản hồi API dưới 200ms...',
    question_testing_label: 'Chiến lược kiểm thử mong muốn là gì?',
    question_testing_placeholder: 'Ví dụ: Độ bao phủ unit test cao, kiểm thử end-to-end với Cypress...',
    question_deployment_label: 'Môi trường triển khai ưu tiên là gì?',
    question_deployment_placeholder: 'Ví dụ: Vercel, Netlify, AWS, Google Cloud, máy chủ riêng...',
    question_analytics_label: 'Cần theo dõi các chỉ số phân tích nào?',
    question_analytics_placeholder: 'Ví dụ: Chỉ số tương tác người dùng, phễu chuyển đổi, giám sát hiệu suất...',
    question_compliance_label: 'Có yêu cầu tuân thủ quy định nào không?',
    question_compliance_placeholder: 'Ví dụ: GDPR, HIPAA, PCI DSS...',
    question_targetMarket_label: 'Thị trường mục tiêu là gì?',
    question_targetMarket_placeholder: 'Ví dụ: Toàn cầu, quốc gia cụ thể (Mỹ, Việt Nam), ngành cụ thể...',
    question_budget_label: 'Ngân sách dự kiến là bao nhiêu?',
    question_budget_placeholder: 'Ví dụ: <$10k, $10k-$50k, >$50k...',
    question_timeline_label: 'Tiến độ dự án mong muốn là gì?',
    question_timeline_placeholder: 'Ví dụ: 3 tháng cho MVP, 6-12 tháng cho phiên bản đầy đủ...',
    question_teamSize_label: 'Quy mô đội ngũ phát triển là bao nhiêu?',
    question_teamSize_placeholder: 'Ví dụ: Một lập trình viên, 2-5 người, 10+ người...',
    error_generic: 'Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại.',
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string): string => {
      const langDict = translations[language] || translations.en;
      return (langDict as Record<string, string>)[key] || key;
    },
    [language]
  );

  return { t };
};
