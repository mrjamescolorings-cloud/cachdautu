// Blog data and utilities
export interface Category {
    slug: string;
    name: string;
    description: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readingTime: string;
    tags: string[];
    featured?: boolean;
    image?: string;
}

export const categories: Category[] = [
    { slug: "chung-khoan", name: "Chứng khoán", description: "Cổ phiếu, ETF, phân tích kỹ thuật & cơ bản" },
    { slug: "crypto", name: "Crypto", description: "Bitcoin, Ethereum, DeFi, staking" },
    { slug: "bat-dong-san", name: "Bất động sản", description: "Mua để cho thuê, REITs, đầu tư đất" },
    { slug: "vang", name: "Vàng", description: "Vàng vật chất, vàng tài khoản, bạc" },
    { slug: "forex", name: "Forex", description: "Giao dịch cặp tiền tệ, phân tích thị trường" },
    { slug: "trai-phieu", name: "Trái phiếu", description: "Trái phiếu chính phủ & doanh nghiệp" },
    { slug: "quy-dau-tu", name: "Quỹ đầu tư", description: "Quỹ mở, quỹ ETF, quỹ hưu trí" },
    { slug: "khoi-nghiep", name: "Khởi nghiệp", description: "Angel investing, crowdfunding, ESOP" },
    { slug: "dau-tu-thay-the", name: "Đầu tư thay thế", description: "Nghệ thuật, NFT, collectibles, rượu vang" },
    { slug: "tai-chinh-ca-nhan", name: "Tài chính cá nhân", description: "Tiết kiệm, ngân sách, quỹ khẩn cấp" },
];

export const blogPosts: BlogPost[] = [
    // ==================== CHỨNG KHOÁN (5 bài) ====================
    {
        slug: "huong-dan-doc-bao-cao-tai-chinh",
        title: "Hướng dẫn đọc báo cáo tài chính cho người mới bắt đầu",
        excerpt: "Học cách phân tích báo cáo tài chính để đánh giá sức khỏe doanh nghiệp trước khi đầu tư vào cổ phiếu.",
        category: "chung-khoan",
        date: "2026-02-01",
        readingTime: "8 phút",
        tags: ["phân tích cơ bản", "người mới"],
        featured: true,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    },
    {
        slug: "phan-tich-ky-thuat-co-ban",
        title: "Phân tích kỹ thuật cơ bản: Đọc hiểu biểu đồ nến Nhật",
        excerpt: "Tìm hiểu cách đọc và phân tích biểu đồ nến Nhật để dự đoán xu hướng giá cổ phiếu.",
        category: "chung-khoan",
        date: "2026-01-28",
        readingTime: "10 phút",
        tags: ["phân tích kỹ thuật", "biểu đồ"],
    },
    {
        slug: "top-10-co-phieu-blue-chip-2026",
        title: "Top 10 cổ phiếu Blue-chip đáng đầu tư năm 2026",
        excerpt: "Danh sách các cổ phiếu vốn hóa lớn, ổn định và tiềm năng tăng trưởng trong năm 2026.",
        category: "chung-khoan",
        date: "2026-01-25",
        readingTime: "12 phút",
        tags: ["blue-chip", "danh mục"],
    },
    {
        slug: "cach-mo-tai-khoan-chung-khoan",
        title: "Hướng dẫn mở tài khoản chứng khoán từ A-Z",
        excerpt: "Các bước chi tiết để mở tài khoản chứng khoán và bắt đầu giao dịch cổ phiếu.",
        category: "chung-khoan",
        date: "2026-01-20",
        readingTime: "7 phút",
        tags: ["người mới", "hướng dẫn"],
    },
    {
        slug: "chien-luoc-dca-co-phieu",
        title: "Chiến lược DCA: Đầu tư đều đặn để giảm rủi ro",
        excerpt: "Tìm hiểu phương pháp Dollar Cost Averaging và cách áp dụng vào đầu tư cổ phiếu.",
        category: "chung-khoan",
        date: "2026-01-15",
        readingTime: "8 phút",
        tags: ["chiến lược", "DCA"],
    },

    // ==================== CRYPTO (5 bài) ====================
    {
        slug: "bitcoin-la-gi-huong-dan-cho-nguoi-moi",
        title: "Bitcoin là gì? Hướng dẫn toàn diện cho người mới bắt đầu",
        excerpt: "Tìm hiểu về Bitcoin, công nghệ blockchain và cách bắt đầu đầu tư crypto một cách an toàn.",
        category: "crypto",
        date: "2026-01-28",
        readingTime: "12 phút",
        tags: ["bitcoin", "người mới", "blockchain"],
        featured: true,
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    },
    {
        slug: "ethereum-va-smart-contract",
        title: "Ethereum và Smart Contract: Tương lai của DeFi",
        excerpt: "Hiểu về Ethereum, smart contract và hệ sinh thái DeFi đang phát triển mạnh mẽ.",
        category: "crypto",
        date: "2026-01-25",
        readingTime: "10 phút",
        tags: ["ethereum", "defi", "smart contract"],
    },
    {
        slug: "cach-bao-mat-vi-crypto",
        title: "Cách bảo mật ví crypto và tránh bị hack",
        excerpt: "Các biện pháp bảo mật quan trọng để bảo vệ tài sản crypto của bạn khỏi hacker.",
        category: "crypto",
        date: "2026-01-22",
        readingTime: "8 phút",
        tags: ["bảo mật", "ví crypto"],
    },
    {
        slug: "staking-crypto-huong-dan",
        title: "Staking crypto: Kiếm thu nhập thụ động từ tiền số",
        excerpt: "Hướng dẫn chi tiết cách stake crypto để nhận lãi suất hàng năm.",
        category: "crypto",
        date: "2026-01-18",
        readingTime: "9 phút",
        tags: ["staking", "passive income"],
    },
    {
        slug: "altcoin-tiem-nang-2026",
        title: "5 Altcoin tiềm năng nhất năm 2026",
        excerpt: "Phân tích các đồng altcoin có tiềm năng tăng trưởng mạnh trong năm tới.",
        category: "crypto",
        date: "2026-01-15",
        readingTime: "11 phút",
        tags: ["altcoin", "phân tích"],
    },

    // ==================== BẤT ĐỘNG SẢN (5 bài) ====================
    {
        slug: "5-cach-dau-tu-bat-dong-san-2026",
        title: "5 cách đầu tư bất động sản hiệu quả năm 2026",
        excerpt: "Khám phá các phương thức đầu tư bất động sản phù hợp với mọi mức vốn từ vài triệu đến vài tỷ.",
        category: "bat-dong-san",
        date: "2026-01-25",
        readingTime: "10 phút",
        tags: ["bất động sản", "chiến lược"],
        featured: true,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
    {
        slug: "mua-nha-cho-thue-huong-dan",
        title: "Mua nhà cho thuê: Hướng dẫn từ A-Z cho người mới",
        excerpt: "Các bước cần thiết để mua và cho thuê bất động sản sinh lời ổn định.",
        category: "bat-dong-san",
        date: "2026-01-22",
        readingTime: "12 phút",
        tags: ["cho thuê", "hướng dẫn"],
    },
    {
        slug: "phan-tich-thi-truong-bds-2026",
        title: "Phân tích thị trường bất động sản Việt Nam 2026",
        excerpt: "Nhận định xu hướng và cơ hội đầu tư bất động sản trong năm mới.",
        category: "bat-dong-san",
        date: "2026-01-18",
        readingTime: "9 phút",
        tags: ["thị trường", "phân tích"],
    },
    {
        slug: "reits-la-gi-cach-dau-tu",
        title: "REITs là gì? Cách đầu tư bất động sản với vốn nhỏ",
        excerpt: "Tìm hiểu về quỹ tín thác bất động sản và cách đầu tư chỉ với vài triệu đồng.",
        category: "bat-dong-san",
        date: "2026-01-15",
        readingTime: "8 phút",
        tags: ["REITs", "vốn nhỏ"],
    },
    {
        slug: "sai-lam-dau-tu-bds-can-tranh",
        title: "7 sai lầm phổ biến khi đầu tư bất động sản",
        excerpt: "Những lỗi thường gặp mà nhà đầu tư bất động sản mới cần tránh.",
        category: "bat-dong-san",
        date: "2026-01-10",
        readingTime: "7 phút",
        tags: ["sai lầm", "kinh nghiệm"],
    },

    // ==================== VÀNG (5 bài) ====================
    {
        slug: "gia-vang-va-yeu-to-tac-dong",
        title: "Giá vàng và những yếu tố tác động: Phân tích chi tiết",
        excerpt: "Hiểu các yếu tố kinh tế vĩ mô ảnh hưởng đến giá vàng để đưa ra quyết định đầu tư thông minh.",
        category: "vang",
        date: "2026-01-22",
        readingTime: "7 phút",
        tags: ["vàng", "phân tích"],
    },
    {
        slug: "vang-vat-chat-vs-vang-tai-khoan",
        title: "Vàng vật chất vs Vàng tài khoản: Nên chọn loại nào?",
        excerpt: "So sánh ưu nhược điểm của các hình thức đầu tư vàng phổ biến hiện nay.",
        category: "vang",
        date: "2026-01-18",
        readingTime: "8 phút",
        tags: ["so sánh", "hình thức đầu tư"],
    },
    {
        slug: "cach-mua-vang-sjc-tiet-kiem",
        title: "Cách mua vàng SJC tiết kiệm nhất 2026",
        excerpt: "Hướng dẫn mua vàng SJC với giá tốt và những điều cần lưu ý.",
        category: "vang",
        date: "2026-01-15",
        readingTime: "6 phút",
        tags: ["SJC", "hướng dẫn"],
    },
    {
        slug: "vang-trong-danh-muc-dau-tu",
        title: "Vai trò của vàng trong danh mục đầu tư đa dạng",
        excerpt: "Tại sao vàng là tài sản phòng hộ quan trọng trong mọi danh mục đầu tư.",
        category: "vang",
        date: "2026-01-12",
        readingTime: "7 phút",
        tags: ["danh mục", "phòng hộ"],
    },
    {
        slug: "du-bao-gia-vang-2026",
        title: "Dự báo giá vàng 2026: Tăng hay giảm?",
        excerpt: "Phân tích xu hướng và dự báo giá vàng trong năm mới dựa trên các yếu tố kinh tế.",
        category: "vang",
        date: "2026-01-08",
        readingTime: "9 phút",
        tags: ["dự báo", "2026"],
    },

    // ==================== FOREX (5 bài) ====================
    {
        slug: "forex-co-ban-cap-tien-te",
        title: "Forex cơ bản: Hiểu về cặp tiền tệ và cách giao dịch",
        excerpt: "Bắt đầu hành trình giao dịch forex với những kiến thức nền tảng về cặp tiền tệ chính.",
        category: "forex",
        date: "2026-01-20",
        readingTime: "9 phút",
        tags: ["forex", "người mới"],
    },
    {
        slug: "phan-tich-ky-thuat-forex",
        title: "Phân tích kỹ thuật Forex: Các indicator quan trọng",
        excerpt: "Tìm hiểu các chỉ báo kỹ thuật phổ biến trong giao dịch forex.",
        category: "forex",
        date: "2026-01-17",
        readingTime: "10 phút",
        tags: ["indicator", "phân tích"],
    },
    {
        slug: "quan-ly-rui-ro-forex",
        title: "Quản lý rủi ro trong giao dịch Forex",
        excerpt: "Các phương pháp quản lý vốn và rủi ro để bảo vệ tài khoản forex của bạn.",
        category: "forex",
        date: "2026-01-14",
        readingTime: "8 phút",
        tags: ["rủi ro", "quản lý vốn"],
    },
    {
        slug: "chon-san-forex-uy-tin",
        title: "Cách chọn sàn Forex uy tín và an toàn",
        excerpt: "Tiêu chí đánh giá và danh sách các sàn forex được cấp phép đáng tin cậy.",
        category: "forex",
        date: "2026-01-11",
        readingTime: "7 phút",
        tags: ["sàn forex", "lựa chọn"],
    },
    {
        slug: "chien-luoc-scalping-forex",
        title: "Chiến lược Scalping Forex cho người mới",
        excerpt: "Hướng dẫn chiến lược giao dịch ngắn hạn scalping với các mẹo thực tế.",
        category: "forex",
        date: "2026-01-08",
        readingTime: "11 phút",
        tags: ["scalping", "chiến lược"],
    },

    // ==================== TRÁI PHIẾU (5 bài) ====================
    {
        slug: "trai-phieu-la-gi-huong-dan",
        title: "Trái phiếu là gì? Hướng dẫn đầu tư trái phiếu cho người mới",
        excerpt: "Tìm hiểu về trái phiếu, cách hoạt động và lợi ích của việc đầu tư trái phiếu.",
        category: "trai-phieu",
        date: "2026-01-20",
        readingTime: "8 phút",
        tags: ["trái phiếu", "người mới"],
    },
    {
        slug: "trai-phieu-chinh-phu-vs-doanh-nghiep",
        title: "Trái phiếu chính phủ vs Trái phiếu doanh nghiệp",
        excerpt: "So sánh rủi ro và lợi suất giữa trái phiếu chính phủ và doanh nghiệp.",
        category: "trai-phieu",
        date: "2026-01-17",
        readingTime: "9 phút",
        tags: ["so sánh", "rủi ro"],
    },
    {
        slug: "cach-tinh-loi-suat-trai-phieu",
        title: "Cách tính lợi suất trái phiếu và YTM",
        excerpt: "Hướng dẫn tính toán lợi suất và yield to maturity của trái phiếu.",
        category: "trai-phieu",
        date: "2026-01-14",
        readingTime: "7 phút",
        tags: ["lợi suất", "tính toán"],
    },
    {
        slug: "rui-ro-dau-tu-trai-phieu",
        title: "Các rủi ro khi đầu tư trái phiếu cần biết",
        excerpt: "Những rủi ro tiềm ẩn trong đầu tư trái phiếu và cách phòng tránh.",
        category: "trai-phieu",
        date: "2026-01-11",
        readingTime: "6 phút",
        tags: ["rủi ro", "cảnh báo"],
    },
    {
        slug: "trai-phieu-trong-danh-muc",
        title: "Vai trò trái phiếu trong danh mục đầu tư cân bằng",
        excerpt: "Tại sao trái phiếu là thành phần quan trọng trong chiến lược đầu tư dài hạn.",
        category: "trai-phieu",
        date: "2026-01-08",
        readingTime: "8 phút",
        tags: ["danh mục", "chiến lược"],
    },

    // ==================== QUỸ ĐẦU TƯ (5 bài) ====================
    {
        slug: "quy-mo-la-gi-huong-dan",
        title: "Quỹ mở là gì? Hướng dẫn đầu tư quỹ mở từ A-Z",
        excerpt: "Tìm hiểu về quỹ mở, cách hoạt động và lợi ích cho nhà đầu tư cá nhân.",
        category: "quy-dau-tu",
        date: "2026-01-20",
        readingTime: "9 phút",
        tags: ["quỹ mở", "người mới"],
    },
    {
        slug: "so-sanh-cac-quy-etf-viet-nam",
        title: "So sánh các quỹ ETF tại Việt Nam 2026",
        excerpt: "Đánh giá và so sánh các quỹ ETF phổ biến trên sàn chứng khoán Việt Nam.",
        category: "quy-dau-tu",
        date: "2026-01-17",
        readingTime: "10 phút",
        tags: ["ETF", "so sánh"],
    },
    {
        slug: "quy-huu-tri-tu-nguyen",
        title: "Quỹ hưu trí tự nguyện: Chuẩn bị cho tương lai",
        excerpt: "Hướng dẫn tham gia quỹ hưu trí tự nguyện và lợi ích thuế.",
        category: "quy-dau-tu",
        date: "2026-01-14",
        readingTime: "8 phút",
        tags: ["hưu trí", "lập kế hoạch"],
    },
    {
        slug: "cach-chon-quy-dau-tu-phu-hop",
        title: "Cách chọn quỹ đầu tư phù hợp với mục tiêu tài chính",
        excerpt: "Tiêu chí đánh giá và lựa chọn quỹ đầu tư theo profil rủi ro của bạn.",
        category: "quy-dau-tu",
        date: "2026-01-11",
        readingTime: "7 phút",
        tags: ["lựa chọn", "mục tiêu"],
    },
    {
        slug: "phi-quan-ly-quy-can-biet",
        title: "Phí quản lý quỹ: Những điều nhà đầu tư cần biết",
        excerpt: "Hiểu về các loại phí và tác động đến lợi nhuận đầu tư dài hạn.",
        category: "quy-dau-tu",
        date: "2026-01-08",
        readingTime: "6 phút",
        tags: ["phí", "chi phí"],
    },

    // ==================== KHỞI NGHIỆP (5 bài) ====================
    {
        slug: "angel-investing-la-gi",
        title: "Angel Investing là gì? Cách đầu tư vào startup",
        excerpt: "Tìm hiểu về đầu tư thiên thần và cách tham gia vào các vòng gọi vốn sớm.",
        category: "khoi-nghiep",
        date: "2026-01-20",
        readingTime: "10 phút",
        tags: ["angel investing", "startup"],
    },
    {
        slug: "crowdfunding-goi-von-cong-dong",
        title: "Crowdfunding: Gọi vốn cộng đồng và cơ hội đầu tư",
        excerpt: "Các nền tảng crowdfunding và cách đánh giá cơ hội đầu tư.",
        category: "khoi-nghiep",
        date: "2026-01-17",
        readingTime: "8 phút",
        tags: ["crowdfunding", "cộng đồng"],
    },
    {
        slug: "esop-co-phieu-nhan-vien",
        title: "ESOP là gì? Cổ phiếu ưu đãi cho nhân viên startup",
        excerpt: "Hiểu về Employee Stock Option Plan và cách tận dụng cơ hội này.",
        category: "khoi-nghiep",
        date: "2026-01-14",
        readingTime: "7 phút",
        tags: ["ESOP", "cổ phiếu"],
    },
    {
        slug: "danh-gia-startup-truoc-dau-tu",
        title: "Cách đánh giá startup trước khi đầu tư",
        excerpt: "Các tiêu chí quan trọng để đánh giá tiềm năng của một startup.",
        category: "khoi-nghiep",
        date: "2026-01-11",
        readingTime: "9 phút",
        tags: ["đánh giá", "due diligence"],
    },
    {
        slug: "rui-ro-dau-tu-startup",
        title: "Rủi ro khi đầu tư vào startup và cách giảm thiểu",
        excerpt: "Những rủi ro thường gặp và chiến lược đa dạng hóa danh mục startup.",
        category: "khoi-nghiep",
        date: "2026-01-08",
        readingTime: "8 phút",
        tags: ["rủi ro", "chiến lược"],
    },

    // ==================== ĐẦU TƯ THAY THẾ (5 bài) ====================
    {
        slug: "nft-la-gi-co-nen-dau-tu",
        title: "NFT là gì? Có nên đầu tư vào NFT không?",
        excerpt: "Tìm hiểu về Non-Fungible Token và tiềm năng cũng như rủi ro của loại tài sản này.",
        category: "dau-tu-thay-the",
        date: "2026-01-20",
        readingTime: "9 phút",
        tags: ["NFT", "digital art"],
    },
    {
        slug: "dau-tu-nghe-thuat-huong-dan",
        title: "Đầu tư nghệ thuật: Hướng dẫn cho người mới",
        excerpt: "Cách bắt đầu sưu tầm và đầu tư vào các tác phẩm nghệ thuật.",
        category: "dau-tu-thay-the",
        date: "2026-01-17",
        readingTime: "8 phút",
        tags: ["nghệ thuật", "sưu tầm"],
    },
    {
        slug: "collectibles-va-do-co",
        title: "Collectibles và đồ cổ: Tài sản đầu tư tiềm ẩn",
        excerpt: "Khám phá thị trường đồ sưu tầm và cách định giá các món đồ cổ.",
        category: "dau-tu-thay-the",
        date: "2026-01-14",
        readingTime: "7 phút",
        tags: ["collectibles", "đồ cổ"],
    },
    {
        slug: "dau-tu-ruou-vang-cao-cap",
        title: "Đầu tư rượu vang cao cấp: Thú vui sinh lời",
        excerpt: "Hướng dẫn đầu tư vào rượu vang fine wine và cách bảo quản đúng cách.",
        category: "dau-tu-thay-the",
        date: "2026-01-11",
        readingTime: "8 phút",
        tags: ["rượu vang", "fine wine"],
    },
    {
        slug: "da-dang-hoa-voi-tai-san-thay-the",
        title: "Đa dạng hóa danh mục với tài sản thay thế",
        excerpt: "Tại sao nên phân bổ một phần vốn vào các tài sản đầu tư thay thế.",
        category: "dau-tu-thay-the",
        date: "2026-01-08",
        readingTime: "6 phút",
        tags: ["đa dạng hóa", "danh mục"],
    },

    // ==================== TÀI CHÍNH CÁ NHÂN (5 bài) ====================
    {
        slug: "lap-quy-khan-cap-trong-3-thang",
        title: "Cách lập quỹ khẩn cấp trong 3 tháng",
        excerpt: "Hướng dẫn từng bước xây dựng quỹ dự phòng 3-6 tháng chi tiêu để bảo vệ tài chính gia đình.",
        category: "tai-chinh-ca-nhan",
        date: "2026-01-18",
        readingTime: "6 phút",
        tags: ["tiết kiệm", "người mới"],
    },
    {
        slug: "quy-tac-50-30-20",
        title: "Quy tắc 50/30/20: Cách quản lý chi tiêu hiệu quả",
        excerpt: "Áp dụng quy tắc phân bổ thu nhập đơn giản để cân bằng chi tiêu và tiết kiệm.",
        category: "tai-chinh-ca-nhan",
        date: "2026-01-15",
        readingTime: "5 phút",
        tags: ["ngân sách", "quy tắc"],
    },
    {
        slug: "tra-no-nhanh-phuong-phap",
        title: "Phương pháp trả nợ nhanh: Snowball vs Avalanche",
        excerpt: "So sánh hai phương pháp trả nợ phổ biến và chọn cách phù hợp với bạn.",
        category: "tai-chinh-ca-nhan",
        date: "2026-01-12",
        readingTime: "7 phút",
        tags: ["trả nợ", "chiến lược"],
    },
    {
        slug: "lap-ke-hoach-tai-chinh-ca-nhan",
        title: "Lập kế hoạch tài chính cá nhân: Hướng dẫn chi tiết",
        excerpt: "Các bước lập kế hoạch tài chính dài hạn để đạt được mục tiêu tài chính.",
        category: "tai-chinh-ca-nhan",
        date: "2026-01-09",
        readingTime: "10 phút",
        tags: ["kế hoạch", "mục tiêu"],
    },
    {
        slug: "thoi-quen-tai-chinh-tot",
        title: "10 thói quen tài chính tốt cần rèn luyện",
        excerpt: "Những thói quen đơn giản giúp cải thiện sức khỏe tài chính mỗi ngày.",
        category: "tai-chinh-ca-nhan",
        date: "2026-01-05",
        readingTime: "8 phút",
        tags: ["thói quen", "lifestyle"],
    },
];

export function getPostsByCategory(categorySlug: string): BlogPost[] {
    return blogPosts.filter(post => post.category === categorySlug);
}

export function getFeaturedPosts(): BlogPost[] {
    return blogPosts.filter(post => post.featured);
}

export function getPostBySlug(categorySlug: string, postSlug: string): BlogPost | undefined {
    return blogPosts.find(post => post.category === categorySlug && post.slug === postSlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(cat => cat.slug === slug);
}

export function searchPosts(query: string): BlogPost[] {
    const lowerQuery = query.toLowerCase();
    return blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}
