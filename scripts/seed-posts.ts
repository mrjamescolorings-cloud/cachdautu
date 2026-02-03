// Script to seed sample blog posts into Supabase
// Run with: npx tsx scripts/seed-posts.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njchsjhdkcfaouqwyutc.supabase.co';
const supabaseKey = 'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF';

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample posts for each category (5 posts each)
const posts = [
    // CHỨNG KHOÁN
    { category: "chung-khoan", slug: "huong-dan-doc-bao-cao-tai-chinh", title: "Hướng dẫn đọc báo cáo tài chính cho người mới bắt đầu", excerpt: "Học cách phân tích báo cáo tài chính để đánh giá sức khỏe doanh nghiệp trước khi đầu tư vào cổ phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "chung-khoan", slug: "phan-tich-ky-thuat-co-ban", title: "Phân tích kỹ thuật cơ bản: Đọc hiểu biểu đồ nến Nhật", excerpt: "Tìm hiểu cách đọc và phân tích biểu đồ nến Nhật để dự đoán xu hướng giá cổ phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "chung-khoan", slug: "top-10-co-phieu-blue-chip-2026", title: "Top 10 cổ phiếu Blue-chip đáng đầu tư năm 2026", excerpt: "Danh sách các cổ phiếu vốn hóa lớn, ổn định và tiềm năng tăng trưởng trong năm 2026.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "12 phút" },
    { category: "chung-khoan", slug: "cach-mo-tai-khoan-chung-khoan", title: "Hướng dẫn mở tài khoản chứng khoán từ A-Z", excerpt: "Các bước chi tiết để mở tài khoản chứng khoán và bắt đầu giao dịch cổ phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "chung-khoan", slug: "chien-luoc-dca-co-phieu", title: "Chiến lược DCA: Đầu tư đều đặn để giảm rủi ro", excerpt: "Tìm hiểu phương pháp Dollar Cost Averaging và cách áp dụng vào đầu tư cổ phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },

    // CRYPTO
    { category: "crypto", slug: "bitcoin-la-gi-huong-dan", title: "Bitcoin là gì? Hướng dẫn toàn diện cho người mới", excerpt: "Tìm hiểu về Bitcoin, công nghệ blockchain và cách bắt đầu đầu tư crypto một cách an toàn.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "12 phút" },
    { category: "crypto", slug: "ethereum-va-smart-contract", title: "Ethereum và Smart Contract: Tương lai của DeFi", excerpt: "Hiểu về Ethereum, smart contract và hệ sinh thái DeFi đang phát triển mạnh mẽ.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "crypto", slug: "cach-bao-mat-vi-crypto", title: "Cách bảo mật ví crypto và tránh bị hack", excerpt: "Các biện pháp bảo mật quan trọng để bảo vệ tài sản crypto của bạn khỏi hacker.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "crypto", slug: "staking-crypto-huong-dan", title: "Staking crypto: Kiếm thu nhập thụ động từ tiền số", excerpt: "Hướng dẫn chi tiết cách stake crypto để nhận lãi suất hàng năm.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "crypto", slug: "altcoin-tiem-nang-2026", title: "5 Altcoin tiềm năng nhất năm 2026", excerpt: "Phân tích các đồng altcoin có tiềm năng tăng trưởng mạnh trong năm tới.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "11 phút" },

    // BẤT ĐỘNG SẢN
    { category: "bat-dong-san", slug: "5-cach-dau-tu-bds-2026", title: "5 cách đầu tư bất động sản hiệu quả năm 2026", excerpt: "Khám phá các phương thức đầu tư bất động sản phù hợp với mọi mức vốn.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "bat-dong-san", slug: "mua-nha-cho-thue", title: "Mua nhà cho thuê: Hướng dẫn từ A-Z cho người mới", excerpt: "Các bước cần thiết để mua và cho thuê bất động sản sinh lời ổn định.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "12 phút" },
    { category: "bat-dong-san", slug: "phan-tich-thi-truong-bds", title: "Phân tích thị trường bất động sản Việt Nam 2026", excerpt: "Nhận định xu hướng và cơ hội đầu tư bất động sản trong năm mới.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "bat-dong-san", slug: "reits-la-gi", title: "REITs là gì? Cách đầu tư BĐS với vốn nhỏ", excerpt: "Tìm hiểu về quỹ tín thác bất động sản và cách đầu tư chỉ với vài triệu đồng.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "bat-dong-san", slug: "sai-lam-dau-tu-bds", title: "7 sai lầm phổ biến khi đầu tư bất động sản", excerpt: "Những lỗi thường gặp mà nhà đầu tư bất động sản mới cần tránh.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },

    // VÀNG
    { category: "vang", slug: "gia-vang-yeu-to-tac-dong", title: "Giá vàng và những yếu tố tác động", excerpt: "Hiểu các yếu tố kinh tế vĩ mô ảnh hưởng đến giá vàng để đưa ra quyết định đầu tư thông minh.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "vang", slug: "vang-vat-chat-vs-tai-khoan", title: "Vàng vật chất vs Vàng tài khoản", excerpt: "So sánh ưu nhược điểm của các hình thức đầu tư vàng phổ biến hiện nay.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "vang", slug: "cach-mua-vang-sjc", title: "Cách mua vàng SJC tiết kiệm nhất 2026", excerpt: "Hướng dẫn mua vàng SJC với giá tốt và những điều cần lưu ý.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "6 phút" },
    { category: "vang", slug: "vang-trong-danh-muc", title: "Vai trò của vàng trong danh mục đầu tư", excerpt: "Tại sao vàng là tài sản phòng hộ quan trọng trong mọi danh mục đầu tư.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "vang", slug: "du-bao-gia-vang-2026", title: "Dự báo giá vàng 2026: Tăng hay giảm?", excerpt: "Phân tích xu hướng và dự báo giá vàng trong năm mới.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },

    // FOREX
    { category: "forex", slug: "forex-co-ban", title: "Forex cơ bản: Hiểu về cặp tiền tệ", excerpt: "Bắt đầu hành trình giao dịch forex với những kiến thức nền tảng.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "forex", slug: "phan-tich-ky-thuat-forex", title: "Phân tích kỹ thuật Forex: Các indicator quan trọng", excerpt: "Tìm hiểu các chỉ báo kỹ thuật phổ biến trong giao dịch forex.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "forex", slug: "quan-ly-rui-ro-forex", title: "Quản lý rủi ro trong giao dịch Forex", excerpt: "Các phương pháp quản lý vốn và rủi ro để bảo vệ tài khoản forex.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "forex", slug: "chon-san-forex-uy-tin", title: "Cách chọn sàn Forex uy tín và an toàn", excerpt: "Tiêu chí đánh giá và danh sách các sàn forex được cấp phép đáng tin cậy.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "forex", slug: "chien-luoc-scalping", title: "Chiến lược Scalping Forex cho người mới", excerpt: "Hướng dẫn chiến lược giao dịch ngắn hạn scalping với các mẹo thực tế.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "11 phút" },

    // TRÁI PHIẾU
    { category: "trai-phieu", slug: "trai-phieu-la-gi", title: "Trái phiếu là gì? Hướng dẫn cho người mới", excerpt: "Tìm hiểu về trái phiếu, cách hoạt động và lợi ích của việc đầu tư trái phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "trai-phieu", slug: "trai-phieu-cp-vs-dn", title: "Trái phiếu chính phủ vs Trái phiếu doanh nghiệp", excerpt: "So sánh rủi ro và lợi suất giữa trái phiếu chính phủ và doanh nghiệp.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "trai-phieu", slug: "cach-tinh-loi-suat", title: "Cách tính lợi suất trái phiếu và YTM", excerpt: "Hướng dẫn tính toán lợi suất và yield to maturity của trái phiếu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "trai-phieu", slug: "rui-ro-trai-phieu", title: "Các rủi ro khi đầu tư trái phiếu cần biết", excerpt: "Những rủi ro tiềm ẩn trong đầu tư trái phiếu và cách phòng tránh.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "6 phút" },
    { category: "trai-phieu", slug: "trai-phieu-trong-danh-muc", title: "Vai trò trái phiếu trong danh mục đầu tư", excerpt: "Tại sao trái phiếu là thành phần quan trọng trong chiến lược dài hạn.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },

    // QUỸ ĐẦU TƯ
    { category: "quy-dau-tu", slug: "quy-mo-la-gi", title: "Quỹ mở là gì? Hướng dẫn đầu tư quỹ mở", excerpt: "Tìm hiểu về quỹ mở, cách hoạt động và lợi ích cho nhà đầu tư cá nhân.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "quy-dau-tu", slug: "so-sanh-etf-viet-nam", title: "So sánh các quỹ ETF tại Việt Nam 2026", excerpt: "Đánh giá và so sánh các quỹ ETF phổ biến trên sàn chứng khoán.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "quy-dau-tu", slug: "quy-huu-tri-tu-nguyen", title: "Quỹ hưu trí tự nguyện: Chuẩn bị cho tương lai", excerpt: "Hướng dẫn tham gia quỹ hưu trí tự nguyện và lợi ích thuế.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "quy-dau-tu", slug: "chon-quy-dau-tu", title: "Cách chọn quỹ đầu tư phù hợp", excerpt: "Tiêu chí đánh giá và lựa chọn quỹ đầu tư theo profil rủi ro của bạn.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "quy-dau-tu", slug: "phi-quan-ly-quy", title: "Phí quản lý quỹ: Những điều cần biết", excerpt: "Hiểu về các loại phí và tác động đến lợi nhuận đầu tư dài hạn.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "6 phút" },

    // KHỞI NGHIỆP
    { category: "khoi-nghiep", slug: "angel-investing", title: "Angel Investing là gì? Cách đầu tư vào startup", excerpt: "Tìm hiểu về đầu tư thiên thần và cách tham gia vào các vòng gọi vốn sớm.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "khoi-nghiep", slug: "crowdfunding", title: "Crowdfunding: Gọi vốn cộng đồng và cơ hội đầu tư", excerpt: "Các nền tảng crowdfunding và cách đánh giá cơ hội đầu tư.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "khoi-nghiep", slug: "esop-la-gi", title: "ESOP là gì? Cổ phiếu ưu đãi cho nhân viên", excerpt: "Hiểu về Employee Stock Option Plan và cách tận dụng cơ hội này.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "khoi-nghiep", slug: "danh-gia-startup", title: "Cách đánh giá startup trước khi đầu tư", excerpt: "Các tiêu chí quan trọng để đánh giá tiềm năng của một startup.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "khoi-nghiep", slug: "rui-ro-startup", title: "Rủi ro khi đầu tư vào startup", excerpt: "Những rủi ro thường gặp và chiến lược đa dạng hóa danh mục startup.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },

    // ĐẦU TƯ THAY THẾ
    { category: "dau-tu-thay-the", slug: "nft-la-gi", title: "NFT là gì? Có nên đầu tư vào NFT không?", excerpt: "Tìm hiểu về Non-Fungible Token và tiềm năng cũng như rủi ro.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "9 phút" },
    { category: "dau-tu-thay-the", slug: "dau-tu-nghe-thuat", title: "Đầu tư nghệ thuật: Hướng dẫn cho người mới", excerpt: "Cách bắt đầu sưu tầm và đầu tư vào các tác phẩm nghệ thuật.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "dau-tu-thay-the", slug: "collectibles-do-co", title: "Collectibles và đồ cổ: Tài sản đầu tư tiềm ẩn", excerpt: "Khám phá thị trường đồ sưu tầm và cách định giá các món đồ cổ.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "dau-tu-thay-the", slug: "dau-tu-ruou-vang", title: "Đầu tư rượu vang cao cấp: Thú vui sinh lời", excerpt: "Hướng dẫn đầu tư vào rượu vang fine wine và cách bảo quản.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
    { category: "dau-tu-thay-the", slug: "da-dang-hoa-tai-san", title: "Đa dạng hóa với tài sản thay thế", excerpt: "Tại sao nên phân bổ một phần vốn vào các tài sản đầu tư thay thế.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "6 phút" },

    // TÀI CHÍNH CÁ NHÂN
    { category: "tai-chinh-ca-nhan", slug: "lap-quy-khan-cap", title: "Cách lập quỹ khẩn cấp trong 3 tháng", excerpt: "Hướng dẫn từng bước xây dựng quỹ dự phòng 3-6 tháng chi tiêu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "6 phút" },
    { category: "tai-chinh-ca-nhan", slug: "quy-tac-50-30-20", title: "Quy tắc 50/30/20: Cách quản lý chi tiêu hiệu quả", excerpt: "Áp dụng quy tắc phân bổ thu nhập đơn giản để cân bằng chi tiêu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "5 phút" },
    { category: "tai-chinh-ca-nhan", slug: "tra-no-nhanh", title: "Phương pháp trả nợ nhanh: Snowball vs Avalanche", excerpt: "So sánh hai phương pháp trả nợ phổ biến và chọn cách phù hợp.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "7 phút" },
    { category: "tai-chinh-ca-nhan", slug: "lap-ke-hoach-tai-chinh", title: "Lập kế hoạch tài chính cá nhân chi tiết", excerpt: "Các bước lập kế hoạch tài chính dài hạn để đạt được mục tiêu.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "10 phút" },
    { category: "tai-chinh-ca-nhan", slug: "thoi-quen-tai-chinh", title: "10 thói quen tài chính tốt cần rèn luyện", excerpt: "Những thói quen đơn giản giúp cải thiện sức khỏe tài chính mỗi ngày.", content: "Nội dung bài viết sẽ được cập nhật sau...", reading_time: "8 phút" },
];

async function seed() {
    console.log('🚀 Bắt đầu seed dữ liệu...\n');

    // 1. Get category IDs
    console.log('📋 Lấy ID danh mục...');
    const { data: categoryData } = await supabase
        .from('categories')
        .select('id, slug');

    const categoryMap = new Map(categoryData?.map(c => [c.slug, c.id]) || []);
    console.log(`  Tìm thấy ${categoryMap.size} danh mục\n`);

    // 2. Seed posts (without is_featured column)
    console.log('📝 Tạo bài viết...');
    let created = 0;
    for (const post of posts) {
        const categoryId = categoryMap.get(post.category);
        if (!categoryId) {
            console.log(`  ⚠️ Không tìm thấy category: ${post.category}`);
            continue;
        }

        const { error } = await supabase
            .from('posts')
            .upsert({
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category_id: categoryId,
                reading_time: post.reading_time,
                is_published: true,
                featured_image: null, // User will add later via admin
            }, { onConflict: 'slug' });

        if (error) {
            console.log(`  ❌ ${post.title}:`, error.message);
        } else {
            console.log(`  ✅ ${post.title}`);
            created++;
        }
    }

    console.log(`\n🎉 Hoàn tất! Đã tạo ${created} bài viết.`);
    console.log('👉 Vào http://localhost:3004/admin để chỉnh sửa và gắn ảnh!');
}

seed().catch(console.error);
