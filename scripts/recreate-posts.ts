// Script to delete old posts and recreate with correct format
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

// 50 posts - 5 per category, plain content without icons
const postsData = [
    // CHỨNG KHOÁN (5 bài)
    { cat: "chung-khoan", slug: "huong-dan-doc-bao-cao-tai-chinh", title: "Hướng dẫn đọc báo cáo tài chính cho người mới", excerpt: "Học cách phân tích báo cáo tài chính để đánh giá sức khỏe doanh nghiệp.", content: "Báo cáo tài chính là tài liệu quan trọng giúp nhà đầu tư hiểu về tình hình hoạt động của doanh nghiệp. Bài viết này sẽ hướng dẫn bạn cách đọc và phân tích các chỉ số quan trọng trong báo cáo tài chính, từ đó đưa ra quyết định đầu tư thông minh hơn.", reading_time: "8 phút" },
    { cat: "chung-khoan", slug: "phan-tich-ky-thuat-bieu-do-nen", title: "Phân tích kỹ thuật: Đọc hiểu biểu đồ nến Nhật", excerpt: "Tìm hiểu cách đọc biểu đồ nến Nhật để dự đoán xu hướng giá.", content: "Biểu đồ nến Nhật là công cụ phân tích kỹ thuật phổ biến nhất trong giao dịch chứng khoán. Bài viết này giới thiệu các mẫu nến cơ bản và cách sử dụng chúng để nhận diện điểm vào lệnh tối ưu.", reading_time: "10 phút" },
    { cat: "chung-khoan", slug: "top-co-phieu-blue-chip-2026", title: "Top cổ phiếu Blue-chip đáng đầu tư năm 2026", excerpt: "Danh sách các cổ phiếu vốn hóa lớn, ổn định trong năm 2026.", content: "Cổ phiếu blue-chip là những cổ phiếu của các công ty lớn, có lịch sử kinh doanh ổn định và chia cổ tức đều đặn. Đây là lựa chọn an toàn cho nhà đầu tư dài hạn.", reading_time: "12 phút" },
    { cat: "chung-khoan", slug: "huong-dan-mo-tai-khoan-chung-khoan", title: "Hướng dẫn mở tài khoản chứng khoán A-Z", excerpt: "Các bước chi tiết để mở tài khoản và bắt đầu giao dịch.", content: "Mở tài khoản chứng khoán là bước đầu tiên để tham gia thị trường. Bài viết hướng dẫn chi tiết từ chọn công ty chứng khoán, chuẩn bị giấy tờ đến thực hiện giao dịch đầu tiên.", reading_time: "7 phút" },
    { cat: "chung-khoan", slug: "chien-luoc-dca-giam-rui-ro", title: "Chiến lược DCA: Đầu tư đều đặn giảm rủi ro", excerpt: "Phương pháp Dollar Cost Averaging cho đầu tư cổ phiếu.", content: "DCA (Dollar Cost Averaging) là chiến lược đầu tư định kỳ với số tiền cố định, giúp giảm rủi ro biến động giá và xây dựng danh mục đầu tư ổn định theo thời gian.", reading_time: "8 phút" },

    // CRYPTO (5 bài)
    { cat: "crypto", slug: "bitcoin-la-gi-huong-dan-nguoi-moi", title: "Bitcoin là gì? Hướng dẫn toàn diện cho người mới", excerpt: "Tìm hiểu về Bitcoin, blockchain và cách đầu tư an toàn.", content: "Bitcoin là đồng tiền số đầu tiên và lớn nhất thế giới, hoạt động trên công nghệ blockchain. Bài viết giới thiệu cách hoạt động của Bitcoin và hướng dẫn mua bán an toàn.", reading_time: "12 phút" },
    { cat: "crypto", slug: "ethereum-smart-contract-defi", title: "Ethereum và Smart Contract trong DeFi", excerpt: "Hiểu về Ethereum và hệ sinh thái tài chính phi tập trung.", content: "Ethereum là nền tảng cho phép tạo các ứng dụng phi tập trung (dApps) thông qua smart contract. DeFi (tài chính phi tập trung) đang cách mạng hóa ngành tài chính.", reading_time: "10 phút" },
    { cat: "crypto", slug: "bao-mat-vi-crypto-tranh-hack", title: "Cách bảo mật ví crypto tránh bị hack", excerpt: "Các biện pháp bảo mật quan trọng để bảo vệ tài sản số.", content: "Bảo mật là yếu tố quan trọng nhất khi sở hữu crypto. Bài viết hướng dẫn cách sử dụng ví lạnh, bảo vệ private key và nhận biết các hình thức lừa đảo phổ biến.", reading_time: "8 phút" },
    { cat: "crypto", slug: "staking-thu-nhap-thu-dong", title: "Staking crypto: Kiếm thu nhập thụ động", excerpt: "Hướng dẫn stake crypto để nhận lãi suất hàng năm.", content: "Staking là quá trình khóa crypto để hỗ trợ mạng blockchain và nhận phần thưởng. Đây là cách kiếm thu nhập thụ động phổ biến trong crypto.", reading_time: "9 phút" },
    { cat: "crypto", slug: "altcoin-tiem-nang-nam-2026", title: "Altcoin tiềm năng nhất năm 2026", excerpt: "Phân tích các đồng altcoin có tiềm năng tăng trưởng.", content: "Ngoài Bitcoin và Ethereum, thị trường có hàng ngàn altcoin với tiềm năng khác nhau. Bài viết phân tích các dự án có nền tảng công nghệ tốt và triển vọng phát triển.", reading_time: "11 phút" },

    // BẤT ĐỘNG SẢN (5 bài)
    { cat: "bat-dong-san", slug: "5-cach-dau-tu-bat-dong-san", title: "5 cách đầu tư bất động sản hiệu quả", excerpt: "Các phương thức đầu tư BĐS phù hợp với mọi mức vốn.", content: "Đầu tư bất động sản không nhất thiết cần số vốn lớn. Từ mua đất nền, căn hộ cho thuê đến REITs, có nhiều cách tiếp cận thị trường này.", reading_time: "10 phút" },
    { cat: "bat-dong-san", slug: "mua-nha-cho-thue-huong-dan", title: "Mua nhà cho thuê: Hướng dẫn từ A-Z", excerpt: "Các bước cần thiết để đầu tư BĐS cho thuê sinh lời.", content: "Đầu tư nhà cho thuê là cách tạo thu nhập thụ động bền vững. Bài viết hướng dẫn từ chọn vị trí, tính toán lợi nhuận đến quản lý cho thuê.", reading_time: "12 phút" },
    { cat: "bat-dong-san", slug: "phan-tich-thi-truong-bds-2026", title: "Phân tích thị trường BĐS Việt Nam 2026", excerpt: "Nhận định xu hướng và cơ hội đầu tư trong năm mới.", content: "Thị trường bất động sản Việt Nam đang có nhiều chuyển biến. Bài viết phân tích các phân khúc tiềm năng và dự báo xu hướng giá.", reading_time: "9 phút" },
    { cat: "bat-dong-san", slug: "reits-dau-tu-bds-von-nho", title: "REITs: Đầu tư BĐS với vốn nhỏ", excerpt: "Tìm hiểu về quỹ tín thác bất động sản REITs.", content: "REITs (Quỹ tín thác bất động sản) cho phép đầu tư vào BĐS chỉ với vài triệu đồng. Đây là cách đa dạng hóa danh mục mà không cần sở hữu tài sản trực tiếp.", reading_time: "8 phút" },
    { cat: "bat-dong-san", slug: "sai-lam-dau-tu-bds-can-tranh", title: "Sai lầm phổ biến khi đầu tư BĐS", excerpt: "Những lỗi thường gặp mà nhà đầu tư BĐS mới cần tránh.", content: "Đầu tư bất động sản có thể mang lại lợi nhuận lớn nhưng cũng tiềm ẩn rủi ro. Bài viết chỉ ra các sai lầm phổ biến và cách phòng tránh.", reading_time: "7 phút" },

    // VÀNG (5 bài)
    { cat: "vang", slug: "gia-vang-yeu-to-tac-dong", title: "Giá vàng và các yếu tố tác động", excerpt: "Hiểu các yếu tố kinh tế vĩ mô ảnh hưởng đến giá vàng.", content: "Giá vàng chịu ảnh hưởng của nhiều yếu tố như lạm phát, lãi suất, đồng USD và tình hình địa chính trị. Hiểu các yếu tố này giúp đưa ra quyết định đầu tư tốt hơn.", reading_time: "7 phút" },
    { cat: "vang", slug: "vang-vat-chat-vs-tai-khoan", title: "Vàng vật chất vs Vàng tài khoản", excerpt: "So sánh các hình thức đầu tư vàng phổ biến.", content: "Có nhiều cách đầu tư vàng: mua vàng miếng, vàng nhẫn, vàng tài khoản hay ETF vàng. Mỗi hình thức có ưu nhược điểm riêng phù hợp với từng mục tiêu đầu tư.", reading_time: "8 phút" },
    { cat: "vang", slug: "cach-mua-vang-sjc-tiet-kiem", title: "Cách mua vàng SJC tiết kiệm nhất", excerpt: "Hướng dẫn mua vàng SJC với giá tốt.", content: "Vàng SJC là thương hiệu vàng uy tín nhất Việt Nam. Bài viết hướng dẫn cách mua vàng chính hãng, tránh mua nhầm hàng giả và lựa chọn thời điểm mua tối ưu.", reading_time: "6 phút" },
    { cat: "vang", slug: "vang-trong-danh-muc-dau-tu", title: "Vai trò của vàng trong danh mục đầu tư", excerpt: "Tại sao vàng là tài sản phòng hộ quan trọng.", content: "Vàng là tài sản trú ẩn an toàn trong thời kỳ bất ổn kinh tế. Phân bổ một phần danh mục vào vàng giúp giảm rủi ro tổng thể.", reading_time: "7 phút" },
    { cat: "vang", slug: "du-bao-gia-vang-2026", title: "Dự báo giá vàng năm 2026", excerpt: "Phân tích xu hướng và dự báo giá vàng.", content: "Dựa trên các yếu tố kinh tế vĩ mô, chính sách tiền tệ và tình hình thế giới, bài viết đưa ra các kịch bản về giá vàng trong năm 2026.", reading_time: "9 phút" },

    // FOREX (5 bài)
    { cat: "forex", slug: "forex-co-ban-cap-tien-te", title: "Forex cơ bản: Hiểu về cặp tiền tệ", excerpt: "Kiến thức nền tảng về giao dịch ngoại hối.", content: "Forex là thị trường giao dịch tiền tệ lớn nhất thế giới. Bài viết giới thiệu các cặp tiền tệ chính, cách đọc tỷ giá và cơ chế giao dịch.", reading_time: "9 phút" },
    { cat: "forex", slug: "phan-tich-ky-thuat-forex", title: "Phân tích kỹ thuật Forex: Các indicator quan trọng", excerpt: "Các chỉ báo kỹ thuật phổ biến trong giao dịch forex.", content: "Các indicator như RSI, MACD, Bollinger Bands giúp trader nhận diện xu hướng và điểm vào lệnh. Bài viết hướng dẫn cách sử dụng từng công cụ.", reading_time: "10 phút" },
    { cat: "forex", slug: "quan-ly-rui-ro-forex", title: "Quản lý rủi ro trong giao dịch Forex", excerpt: "Phương pháp quản lý vốn và rủi ro hiệu quả.", content: "Quản lý rủi ro là yếu tố quyết định thành bại trong forex. Bài viết hướng dẫn đặt stop loss, xác định position size và quy tắc 1-2%.", reading_time: "8 phút" },
    { cat: "forex", slug: "chon-san-forex-uy-tin", title: "Cách chọn sàn Forex uy tín an toàn", excerpt: "Tiêu chí đánh giá và lựa chọn sàn forex.", content: "Chọn sàn forex được cấp phép, có spread thấp và hỗ trợ tốt là quan trọng để giao dịch an toàn. Bài viết liệt kê các tiêu chí đánh giá sàn.", reading_time: "7 phút" },
    { cat: "forex", slug: "chien-luoc-scalping-forex", title: "Chiến lược Scalping Forex cho người mới", excerpt: "Hướng dẫn giao dịch ngắn hạn scalping.", content: "Scalping là chiến lược giao dịch lấy lợi nhuận nhỏ từ nhiều giao dịch trong ngày. Bài viết hướng dẫn kỹ thuật và tâm lý cần thiết.", reading_time: "11 phút" },

    // TRÁI PHIẾU (5 bài)
    { cat: "trai-phieu", slug: "trai-phieu-la-gi-huong-dan", title: "Trái phiếu là gì? Hướng dẫn cho người mới", excerpt: "Tìm hiểu về trái phiếu và cách đầu tư.", content: "Trái phiếu là công cụ nợ cho phép nhà đầu tư cho vay tiền và nhận lãi định kỳ. Đây là kênh đầu tư an toàn hơn cổ phiếu.", reading_time: "8 phút" },
    { cat: "trai-phieu", slug: "trai-phieu-chinh-phu-vs-doanh-nghiep", title: "Trái phiếu chính phủ vs doanh nghiệp", excerpt: "So sánh rủi ro và lợi suất hai loại trái phiếu.", content: "Trái phiếu chính phủ có độ an toàn cao nhất, trong khi trái phiếu doanh nghiệp có lợi suất cao hơn kèm rủi ro. Bài viết so sánh chi tiết.", reading_time: "9 phút" },
    { cat: "trai-phieu", slug: "cach-tinh-loi-suat-trai-phieu", title: "Cách tính lợi suất trái phiếu và YTM", excerpt: "Hướng dẫn tính toán lợi suất đầu tư trái phiếu.", content: "YTM (Yield to Maturity) là lợi suất thực tế nếu giữ trái phiếu đến ngày đáo hạn. Bài viết hướng dẫn công thức và cách tính.", reading_time: "7 phút" },
    { cat: "trai-phieu", slug: "rui-ro-dau-tu-trai-phieu", title: "Các rủi ro khi đầu tư trái phiếu", excerpt: "Những rủi ro tiềm ẩn trong đầu tư trái phiếu.", content: "Đầu tư trái phiếu không phải không có rủi ro. Rủi ro lãi suất, rủi ro tín dụng và rủi ro thanh khoản cần được hiểu rõ.", reading_time: "6 phút" },
    { cat: "trai-phieu", slug: "trai-phieu-trong-danh-muc", title: "Vai trò trái phiếu trong danh mục đầu tư", excerpt: "Tại sao cần trái phiếu trong chiến lược dài hạn.", content: "Trái phiếu giúp cân bằng danh mục, giảm biến động và tạo thu nhập ổn định. Tỷ lệ phân bổ phụ thuộc vào tuổi và khẩu vị rủi ro.", reading_time: "8 phút" },

    // QUỸ ĐẦU TƯ (5 bài)
    { cat: "quy-dau-tu", slug: "quy-mo-la-gi-huong-dan", title: "Quỹ mở là gì? Hướng dẫn đầu tư quỹ mở", excerpt: "Tìm hiểu về quỹ mở và cách đầu tư.", content: "Quỹ mở thu tiền từ nhiều nhà đầu tư và được quản lý chuyên nghiệp. Đây là lựa chọn tốt cho người không có thời gian tự đầu tư.", reading_time: "9 phút" },
    { cat: "quy-dau-tu", slug: "so-sanh-quy-etf-viet-nam", title: "So sánh các quỹ ETF tại Việt Nam", excerpt: "Đánh giá các quỹ ETF phổ biến trên sàn.", content: "ETF (Exchange Traded Fund) là quỹ được giao dịch trên sàn chứng khoán. Bài viết so sánh các quỹ ETF có ở Việt Nam.", reading_time: "10 phút" },
    { cat: "quy-dau-tu", slug: "quy-huu-tri-tu-nguyen", title: "Quỹ hưu trí tự nguyện: Chuẩn bị cho tương lai", excerpt: "Hướng dẫn tham gia quỹ hưu trí tự nguyện.", content: "Quỹ hưu trí tự nguyện giúp chuẩn bị tài chính cho tuổi già với ưu đãi thuế. Bài viết hướng dẫn cách tham gia và lựa chọn quỹ.", reading_time: "8 phút" },
    { cat: "quy-dau-tu", slug: "chon-quy-dau-tu-phu-hop", title: "Cách chọn quỹ đầu tư phù hợp", excerpt: "Tiêu chí lựa chọn quỹ đầu tư phù hợp mục tiêu.", content: "Mỗi quỹ có chiến lược và mức độ rủi ro khác nhau. Bài viết hướng dẫn cách chọn quỹ phù hợp với mục tiêu và khẩu vị rủi ro.", reading_time: "7 phút" },
    { cat: "quy-dau-tu", slug: "phi-quan-ly-quy-can-biet", title: "Phí quản lý quỹ: Những điều cần biết", excerpt: "Hiểu về các loại phí khi đầu tư quỹ.", content: "Phí quản lý, phí mua bán ảnh hưởng đến lợi nhuận dài hạn. Bài viết giải thích các loại phí và cách tối ưu chi phí đầu tư quỹ.", reading_time: "6 phút" },

    // KHỞI NGHIỆP (5 bài)
    { cat: "khoi-nghiep", slug: "angel-investing-la-gi", title: "Angel Investing: Đầu tư vào startup giai đoạn sớm", excerpt: "Tìm hiểu về đầu tư thiên thần và cơ hội.", content: "Angel investor là những người đầu tư vốn vào startup ở giai đoạn sớm. Bài viết giới thiệu cách tiếp cận và đánh giá cơ hội đầu tư startup.", reading_time: "10 phút" },
    { cat: "khoi-nghiep", slug: "crowdfunding-goi-von-cong-dong", title: "Crowdfunding: Gọi vốn cộng đồng", excerpt: "Các nền tảng crowdfunding và cơ hội đầu tư.", content: "Crowdfunding cho phép nhiều người đầu tư số tiền nhỏ vào dự án hoặc startup. Bài viết giới thiệu các nền tảng và cách đánh giá dự án.", reading_time: "8 phút" },
    { cat: "khoi-nghiep", slug: "esop-co-phieu-nhan-vien", title: "ESOP: Cổ phiếu ưu đãi cho nhân viên", excerpt: "Hiểu về Employee Stock Option Plan.", content: "ESOP là chương trình cho nhân viên mua cổ phiếu công ty với giá ưu đãi. Đây là cơ hội làm giàu nếu công ty phát triển tốt.", reading_time: "7 phút" },
    { cat: "khoi-nghiep", slug: "danh-gia-startup-truoc-dau-tu", title: "Cách đánh giá startup trước khi đầu tư", excerpt: "Các tiêu chí đánh giá tiềm năng startup.", content: "Đầu tư startup rủi ro cao nhưng có thể sinh lời lớn. Bài viết hướng dẫn đánh giá team, sản phẩm, thị trường và mô hình kinh doanh.", reading_time: "9 phút" },
    { cat: "khoi-nghiep", slug: "rui-ro-dau-tu-startup", title: "Rủi ro khi đầu tư vào startup", excerpt: "Những rủi ro thường gặp và cách giảm thiểu.", content: "Hầu hết startup thất bại, nên đầu tư startup cần đa dạng hóa và chấp nhận mất vốn. Bài viết phân tích các rủi ro chính.", reading_time: "8 phút" },

    // ĐẦU TƯ THAY THẾ (5 bài)
    { cat: "dau-tu-thay-the", slug: "nft-la-gi-co-nen-dau-tu", title: "NFT là gì? Có nên đầu tư không?", excerpt: "Tìm hiểu về Non-Fungible Token và tiềm năng.", content: "NFT là chứng chỉ sở hữu duy nhất trên blockchain cho tài sản số như tranh, nhạc, game. Bài viết phân tích tiềm năng và rủi ro.", reading_time: "9 phút" },
    { cat: "dau-tu-thay-the", slug: "dau-tu-nghe-thuat-huong-dan", title: "Đầu tư nghệ thuật: Hướng dẫn cho người mới", excerpt: "Cách bắt đầu sưu tầm và đầu tư nghệ thuật.", content: "Nghệ thuật là loại tài sản có thể tăng giá theo thời gian. Bài viết hướng dẫn cách bắt đầu sưu tầm và đánh giá giá trị tác phẩm.", reading_time: "8 phút" },
    { cat: "dau-tu-thay-the", slug: "collectibles-do-co-dau-tu", title: "Collectibles và đồ cổ như tài sản đầu tư", excerpt: "Khám phá thị trường đồ sưu tầm và đồ cổ.", content: "Đồng hồ, tem, tiền cổ, đồ chơi vintage có thể là khoản đầu tư sinh lời. Bài viết giới thiệu thị trường và cách định giá.", reading_time: "7 phút" },
    { cat: "dau-tu-thay-the", slug: "dau-tu-ruou-vang-cao-cap", title: "Đầu tư rượu vang cao cấp", excerpt: "Hướng dẫn đầu tư vào fine wine.", content: "Rượu vang từ các vùng nổi tiếng có thể tăng giá theo thời gian. Bài viết giới thiệu cách đầu tư và bảo quản rượu vang.", reading_time: "8 phút" },
    { cat: "dau-tu-thay-the", slug: "da-dang-hoa-tai-san-thay-the", title: "Đa dạng hóa với tài sản thay thế", excerpt: "Tại sao nên phân bổ vào tài sản thay thế.", content: "Tài sản thay thế không tương quan với thị trường truyền thống, giúp đa dạng hóa danh mục và giảm rủi ro tổng thể.", reading_time: "6 phút" },

    // TÀI CHÍNH CÁ NHÂN (5 bài)
    { cat: "tai-chinh-ca-nhan", slug: "lap-quy-khan-cap-3-thang", title: "Cách lập quỹ khẩn cấp trong 3 tháng", excerpt: "Hướng dẫn xây dựng quỹ dự phòng tài chính.", content: "Quỹ khẩn cấp là khoản tiền dự phòng cho các tình huống bất ngờ. Bài viết hướng dẫn cách tiết kiệm 3-6 tháng chi tiêu.", reading_time: "6 phút" },
    { cat: "tai-chinh-ca-nhan", slug: "quy-tac-50-30-20", title: "Quy tắc 50/30/20: Quản lý chi tiêu hiệu quả", excerpt: "Áp dụng quy tắc phân bổ thu nhập đơn giản.", content: "Quy tắc 50/30/20 chia thu nhập thành: 50% nhu cầu thiết yếu, 30% mong muốn, 20% tiết kiệm. Đây là cách đơn giản để quản lý tiền.", reading_time: "5 phút" },
    { cat: "tai-chinh-ca-nhan", slug: "tra-no-nhanh-snowball-avalanche", title: "Phương pháp trả nợ nhanh: Snowball vs Avalanche", excerpt: "So sánh hai phương pháp trả nợ phổ biến.", content: "Snowball ưu tiên trả nợ nhỏ trước, Avalanche ưu tiên nợ lãi suất cao. Mỗi phương pháp phù hợp với tâm lý khác nhau.", reading_time: "7 phút" },
    { cat: "tai-chinh-ca-nhan", slug: "lap-ke-hoach-tai-chinh", title: "Lập kế hoạch tài chính cá nhân chi tiết", excerpt: "Các bước lập kế hoạch tài chính dài hạn.", content: "Kế hoạch tài chính giúp đạt được các mục tiêu như mua nhà, nghỉ hưu, học phí con cái. Bài viết hướng dẫn các bước cụ thể.", reading_time: "10 phút" },
    { cat: "tai-chinh-ca-nhan", slug: "thoi-quen-tai-chinh-tot", title: "Thói quen tài chính tốt cần rèn luyện", excerpt: "Những thói quen giúp cải thiện sức khỏe tài chính.", content: "Theo dõi chi tiêu, tự động hóa tiết kiệm, tránh nợ xấu là những thói quen quan trọng giúp xây dựng nền tảng tài chính vững chắc.", reading_time: "8 phút" },
];

async function recreatePosts() {
    console.log('🗑️  Xóa bài viết cũ (trừ bài user tạo thủ công)...\n');

    // Get slugs of posts we created
    const slugsToDelete = postsData.map(p => p.slug);

    const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .in('slug', slugsToDelete);

    if (deleteError) {
        console.log('Lỗi xóa:', deleteError.message);
    } else {
        console.log('✅ Đã xóa bài cũ\n');
    }

    // Get category IDs
    console.log('📋 Lấy danh mục...');
    const { data: categories } = await supabase.from('categories').select('id, slug');
    const catMap = new Map(categories?.map(c => [c.slug, c.id]) || []);
    console.log(`  Tìm thấy ${catMap.size} danh mục\n`);

    // Create new posts
    console.log('📝 Tạo bài viết mới...\n');
    let count = 0;

    for (const post of postsData) {
        const categoryId = catMap.get(post.cat);
        if (!categoryId) {
            console.log(`  ⚠️ Không tìm thấy category: ${post.cat}`);
            continue;
        }

        const { error } = await supabase.from('posts').insert({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category_id: categoryId,
            reading_time: post.reading_time,
            is_published: true,
            featured_image: null,
        });

        if (error) {
            console.log(`  ❌ ${post.title}: ${error.message}`);
        } else {
            console.log(`  ✅ ${post.title}`);
            count++;
        }
    }

    console.log(`\n🎉 Hoàn tất! Đã tạo ${count}/50 bài viết.`);
    console.log('👉 Refresh trang /blog để xem kết quả!');
}

recreatePosts().catch(console.error);
