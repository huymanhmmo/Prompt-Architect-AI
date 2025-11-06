// FIX: Import React to use React.FC type.
import React from 'react';
import { Template } from '../types';
import {
    WebAppIcon,
    MobileAppIcon,
    ApiIcon,
    DesktopAppIcon,
    GameIcon,
    AiIcon,
    DataIcon,
    EcommerceIcon,
    SaasIcon,
    MarketplaceIcon,
} from '../components/icons';

export const TEMPLATES: (Template & { Icon: React.FC })[] = [
    {
        id: 'saas',
        name: 'Ứng dụng SaaS',
        description: 'Một dịch vụ phần mềm dựa trên thuê bao.',
        Icon: SaasIcon,
        answers: {
            purpose: 'Xây dựng một nền tảng SaaS B2B giúp doanh nghiệp quản lý quan hệ khách hàng (CRM).',
            mainFeatures: 'Xác thực người dùng, dashboard, quản lý liên hệ, báo cáo, thanh toán thuê bao định kỳ.',
            techStack: 'React, Node.js, PostgreSQL, Stripe cho thanh toán, AWS để lưu trữ.',
            security: 'OAuth 2.0 để xác thực, mã hóa dữ liệu, phân quyền dựa trên vai trò.',
            scalability: 'Bắt đầu với 1.000 người dùng, kế hoạch mở rộng theo chiều ngang bằng containerization (Docker, Kubernetes).',
        },
    },
    {
        id: 'ecommerce',
        name: 'Nền tảng Thương mại điện tử',
        description: 'Một cửa hàng trực tuyến để bán sản phẩm.',
        Icon: EcommerceIcon,
        answers: {
            purpose: 'Tạo một sàn thương mại điện tử cho các sản phẩm thủ công mỹ nghệ.',
            mainFeatures: 'Danh mục sản phẩm, giỏ hàng, quy trình thanh toán, quản lý đơn hàng, đánh giá của người dùng.',
            integrations: 'Tích hợp Stripe cho thanh toán, Giao Hàng Nhanh cho logistics, Google Analytics để theo dõi.',
            dataStorage: 'MongoDB để lưu trữ dữ liệu sản phẩm và người dùng, AWS S3 cho hình ảnh sản phẩm.',
            performance: 'Thời gian tải trang dưới 1.5 giây, xử lý 500 người dùng đồng thời vào giờ cao điểm.',
        },
    },
    {
        id: 'mobile-app',
        name: 'Ứng dụng Di động',
        description: 'Một ứng dụng di động native hoặc đa nền tảng.',
        Icon: MobileAppIcon,
        answers: {
            purpose: 'Một ứng dụng mạng xã hội cho chủ sở hữu thú cưng để kết nối và chia sẻ ảnh.',
            mainFeatures: 'Hồ sơ người dùng, bảng tin ảnh, nhắn tin trực tiếp, thông báo đẩy, tìm kiếm dựa trên vị trí.',
            techStack: 'React Native để phát triển đa nền tảng, Firebase cho backend (Auth, Firestore, Storage).',
            deployment: 'Triển khai lên Apple App Store và Google Play Store.',
            analytics: 'Theo dõi sự tương tác của người dùng, người dùng hoạt động hàng ngày, tỷ lệ sử dụng tính năng.',
        },
    },
    {
        id: 'ai-app',
        name: 'Công cụ tích hợp AI',
        description: 'Một ứng dụng với các tính năng học máy.',
        Icon: AiIcon,
        answers: {
            purpose: 'Một công cụ AI giúp tạo nội dung marketing dựa trên đầu vào của người dùng.',
            mainFeatures: 'Nhập văn bản cho prompt, tạo nội dung bằng AI, lịch sử nội dung, tùy chọn xuất file.',
            techStack: 'Python với Flask/FastAPI cho backend, Next.js cho frontend, sử dụng API của một mô hình ngôn ngữ lớn.',
            scalability: 'Giới hạn tỷ lệ truy cập API, caching các yêu cầu phổ biến, suy luận mô hình hiệu quả.',
            uiComplexity: 'Giao diện đơn giản, trực quan tập trung vào chức năng tạo văn bản cốt lõi.',
        },
    },
    {
        id: 'web-app',
        name: 'Ứng dụng Web',
        description: 'Một trang web hoặc ứng dụng web tương tác.',
        Icon: WebAppIcon,
        answers: {
            purpose: 'Xây dựng một blog cá nhân và portfolio để trưng bày các dự án.',
            mainFeatures: 'Hệ thống quản lý nội dung (CMS), danh sách bài viết, trang chi tiết dự án, biểu mẫu liên hệ.',
            uiComplexity: 'Thiết kế sạch sẽ, tối giản, tập trung vào khả năng đọc và trình bày nội dung.',
        },
    },
    {
        id: 'api',
        name: 'API Backend',
        description: 'Một dịch vụ backend cung cấp dữ liệu.',
        Icon: ApiIcon,
        answers: {
            purpose: 'Cung cấp một API RESTful cho ứng dụng thời tiết.',
            mainFeatures: 'Các endpoint để lấy dự báo theo thành phố, dữ liệu lịch sử, xác thực khóa API.',
            dataStorage: 'Redis để caching, PostgreSQL để lưu trữ dữ liệu người dùng và khóa API.',
        },
    },
    {
        id: 'desktop-app',
        name: 'Ứng dụng Desktop',
        description: 'Phần mềm chạy trên Windows, macOS, hoặc Linux.',
        Icon: DesktopAppIcon,
        answers: {
            purpose: 'Một trình chỉnh sửa markdown đa nền tảng với bản xem trước trực tiếp.',
            techStack: 'Electron, React, Node.js.',
            mainFeatures: 'Chỉnh sửa văn bản, xem trước markdown, đồng bộ hóa tệp, các chủ đề có thể tùy chỉnh.',
        },
    },
    {
        id: 'game',
        name: 'Trò chơi',
        description: 'Một trò chơi 2D hoặc 3D đơn giản.',
        Icon: GameIcon,
        answers: {
            purpose: 'Một trò chơi giải đố 2D cho di động.',
            mainFeatures: 'Lối chơi dựa trên cấp độ, bảng xếp hạng, mua hàng trong ứng dụng (in-app purchases).',
            techStack: 'Unity hoặc Godot.',
        },
    },
    {
        id: 'data-analysis',
        name: 'Công cụ Phân tích Dữ liệu',
        description: 'Một dashboard để trực quan hóa dữ liệu.',
        Icon: DataIcon,
        answers: {
            purpose: 'Một dashboard để trực quan hóa dữ liệu bán hàng từ nhiều nguồn khác nhau.',
            mainFeatures: 'Kết nối với các nguồn dữ liệu (SQL, CSV), các loại biểu đồ có thể tùy chỉnh, bộ lọc động.',
            techStack: 'Python (Pandas, Plotly Dash), React cho frontend.',
        },
    },
    {
        id: 'marketplace',
        name: 'Sàn giao dịch',
        description: 'Nền tảng kết nối người mua và người bán.',
        Icon: MarketplaceIcon,
        answers: {
            purpose: 'Một nền tảng cho các freelancer để tìm kiếm các dự án ngắn hạn.',
            mainFeatures: 'Hồ sơ freelancer, đăng tin dự án, hệ thống đấu thầu, nhắn tin, hệ thống thanh toán ký quỹ (escrow).',
            integrations: 'Tích hợp thanh toán an toàn, xác minh danh tính người dùng.',
        },
    },
];