import { Question } from '../types';

export const QUESTIONS: Question[] = [
    // Nhóm 1: Tổng quan & Cốt lõi
    {
        id: 'purpose',
        promptLabel: 'Project Purpose',
        label: 'Mục đích chính của dự án là gì?',
        description: 'Mô tả ngắn gọn về mục tiêu và giá trị cốt lõi mà phần mềm của bạn mang lại.',
    },
    {
        id: 'targetAudience',
        promptLabel: 'Target Audience',
        label: 'Đối tượng người dùng mục tiêu là ai?',
        description: 'Phác thảo chân dung người dùng điển hình sẽ sử dụng sản phẩm của bạn (ví dụ: tuổi, nghề nghiệp, nhu cầu).',
    },
    {
        id: 'mainFeatures',
        promptLabel: 'Main Features',
        label: 'Các tính năng chính cần có là gì?',
        description: 'Liệt kê các chức năng quan trọng nhất mà ứng dụng phải có để giải quyết vấn đề cho người dùng.',
    },
    // Nhóm 2: Thiết kế & Công nghệ
    {
        id: 'uiComplexity',
        promptLabel: 'UI/UX Complexity',
        label: 'Giao diện người dùng (UI/UX) nên đơn giản hay phức tạp?',
        description: 'Mô tả phong cách thiết kế bạn mong muốn (ví dụ: tối giản, hiện đại, nhiều hiệu ứng, tập trung vào dữ liệu...).',
    },
    {
        id: 'techStack',
        promptLabel: 'Preferred Tech Stack',
        label: 'Có ưu tiên công nghệ hay framework nào không? (Không bắt buộc)',
        description: 'Nếu bạn có kiến thức, hãy liệt kê các công nghệ bạn muốn sử dụng (ví dụ: React, Python, AWS...).',
    },
    // Nhóm 3: Dữ liệu & Tích hợp
    {
        id: 'dataStorage',
        promptLabel: 'Data Storage',
        label: 'Ứng dụng có cần lưu trữ dữ liệu không?',
        description: 'Mô tả các loại dữ liệu cần lưu (ví dụ: thông tin người dùng, bài viết, sản phẩm, hình ảnh...).',
    },
    {
        id: 'integrations',
        promptLabel: 'Third-Party Integrations',
        label: 'Có cần tích hợp với dịch vụ bên thứ ba nào không?',
        description: 'Ví dụ: Cổng thanh toán (Stripe), bản đồ (Google Maps), gửi SMS (Twilio)...',
    },
    // Nhóm 4: Yêu cầu Phi chức năng
    {
        id: 'scalability',
        promptLabel: 'Scalability Requirements',
        label: 'Yêu cầu về khả năng mở rộng như thế nào?',
        description: 'Dự kiến số lượng người dùng khi ra mắt và trong tương lai (ví dụ: 1,000 người, sau đó là 100,000 người).',
    },
    {
        id: 'security',
        promptLabel: 'Security Requirements',
        label: 'Yêu cầu về bảo mật có quan trọng không?',
        description: 'Mô tả các yêu cầu bảo mật chính (ví dụ: đăng nhập, mã hóa dữ liệu, phân quyền người dùng...).',
    },
    {
        id: 'performance',
        promptLabel: 'Performance Expectations',
        label: 'Kỳ vọng về hiệu năng của ứng dụng?',
        description: 'Ví dụ: Tải trang nhanh, phản hồi mượt mà, không bị giật lag...',
    },
    // Nhóm 5: Vận hành & Quản lý
    {
        id: 'testing',
        promptLabel: 'Testing Strategy',
        label: 'Chiến lược kiểm thử mong muốn là gì?',
        description: 'Mô tả mức độ quan trọng của việc kiểm thử để đảm bảo phần mềm không có lỗi.',
    },
    {
        id: 'deployment',
        promptLabel: 'Deployment Environment',
        label: 'Môi trường triển khai ưu tiên là gì?',
        description: 'Bạn muốn ứng dụng chạy ở đâu (ví dụ: trên web, trên di động, máy chủ riêng...).',
    },
    {
        id: 'analytics',
        promptLabel: 'Analytics Requirements',
        label: 'Có cần theo dõi và phân tích dữ liệu người dùng không?',
        description: 'Liệt kê các chỉ số bạn muốn theo dõi (ví dụ: số người đăng ký, số lượt truy cập...).',
    },
    {
        id: 'compliance',
        promptLabel: 'Regulatory Compliance',
        label: 'Có yêu cầu tuân thủ các quy định pháp lý nào không?',
        description: 'Ví dụ: GDPR (bảo vệ dữ liệu châu Âu), HIPAA (bảo mật y tế)...',
    },
     // Nhóm 6: Bối cảnh Kinh doanh
    {
        id: 'targetMarket',
        promptLabel: 'Target Market',
        label: 'Thị trường mục tiêu là ở đâu?',
        description: 'Phạm vi địa lý của người dùng (ví dụ: Việt Nam, toàn cầu, châu Á...).',
    },
    {
        id: 'budget',
        promptLabel: 'Estimated Budget',
        label: 'Ngân sách dự kiến cho dự án là bao nhiêu? (Không bắt buộc)',
        description: 'Cung cấp một khoảng ngân sách ước tính để AI có thể đề xuất giải pháp phù hợp.',
    },
    {
        id: 'timeline',
        promptLabel: 'Project Timeline',
        label: 'Tiến độ dự án mong muốn? (Không bắt buộc)',
        description: 'Thời gian dự kiến để hoàn thành phiên bản đầu tiên (MVP) và phiên bản đầy đủ.',
    },
    {
        id: 'teamSize',
        promptLabel: 'Development Team Size',
        label: 'Quy mô đội ngũ phát triển dự kiến? (Không bắt buộc)',
        description: 'Số lượng người sẽ tham gia vào việc phát triển phần mềm.',
    },
];

export const QUESTION_GROUPS: { title: string; from: number; to: number }[] = [
    { title: 'Tổng quan & Cốt lõi', from: 0, to: 3 },
    { title: 'Thiết kế & Công nghệ', from: 3, to: 5 },
    { title: 'Dữ liệu & Tích hợp', from: 5, to: 7 },
    { title: 'Yêu cầu Phi chức năng', from: 7, to: 10 },
    { title: 'Vận hành & Quản lý', from: 10, to: 14 },
    { title: 'Bối cảnh Kinh doanh', from: 14, to: 18 },
];