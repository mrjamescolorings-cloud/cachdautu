// Update all posts with rich content (600+ words, headings, tables, no icons)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

// Rich content templates for each category
const contentTemplates: Record<string, (title: string) => string> = {
    'chung-khoan': (title) => `
## Giới thiệu về ${title}

Thị trường chứng khoán Việt Nam đang ngày càng phát triển và thu hút nhiều nhà đầu tư tham gia. Việc hiểu rõ các nguyên tắc cơ bản và chiến lược đầu tư là điều cần thiết để đạt được thành công trong lĩnh vực này. Bài viết này sẽ cung cấp cho bạn những kiến thức quan trọng nhất.

### Tại sao nên đầu tư chứng khoán?

Đầu tư chứng khoán mang lại nhiều lợi ích đáng kể cho nhà đầu tư cá nhân. Thứ nhất, tiềm năng sinh lời cao hơn so với gửi tiết kiệm ngân hàng. Thứ hai, bạn có thể sở hữu một phần của các doanh nghiệp lớn và hưởng lợi từ sự tăng trưởng của họ. Thứ ba, tính thanh khoản cao cho phép bạn mua bán linh hoạt.

## Các bước bắt đầu đầu tư

Để bắt đầu hành trình đầu tư chứng khoán, bạn cần thực hiện các bước sau đây một cách có hệ thống và khoa học.

### Bước 1: Mở tài khoản chứng khoán

Đầu tiên, bạn cần chọn một công ty chứng khoán uy tín để mở tài khoản. Các tiêu chí cần xem xét bao gồm phí giao dịch, nền tảng giao dịch, và dịch vụ hỗ trợ khách hàng.

### Bước 2: Học phân tích cổ phiếu

Có hai phương pháp phân tích chính là phân tích cơ bản và phân tích kỹ thuật. Phân tích cơ bản tập trung vào đánh giá giá trị thực của doanh nghiệp, trong khi phân tích kỹ thuật sử dụng biểu đồ giá để dự đoán xu hướng.

## Bảng so sánh các loại lệnh giao dịch

| Loại lệnh | Đặc điểm | Phù hợp với |
|-----------|----------|-------------|
| Lệnh thị trường (MP) | Khớp ngay với giá tốt nhất | Nhà đầu tư cần giao dịch nhanh |
| Lệnh giới hạn (LO) | Đặt giá mua/bán cụ thể | Nhà đầu tư muốn kiểm soát giá |
| Lệnh ATO | Khớp tại phiên mở cửa | Giao dịch đầu phiên |
| Lệnh ATC | Khớp tại phiên đóng cửa | Giao dịch cuối phiên |

### Chiến lược quản lý vốn

Quản lý vốn là yếu tố then chốt quyết định thành công trong đầu tư. Nguyên tắc cơ bản là không bao giờ đặt quá 10% vốn vào một cổ phiếu duy nhất. Đa dạng hóa danh mục giúp giảm thiểu rủi ro.

## Các sai lầm cần tránh

Nhiều nhà đầu tư mới thường mắc phải những sai lầm phổ biến. Sai lầm lớn nhất là đầu tư theo đám đông mà không có nghiên cứu kỹ lưỡng. Ngoài ra, việc không đặt điểm cắt lỗ cũng khiến nhiều người chịu tổn thất lớn.

### Tâm lý trong đầu tư

Kiểm soát cảm xúc là kỹ năng quan trọng không kém phân tích. Sự tham lam và sợ hãi là hai kẻ thù lớn nhất của nhà đầu tư. Hãy luôn giữ tâm lý bình tĩnh và tuân thủ kế hoạch đã đề ra.

## Kết luận

Đầu tư chứng khoán đòi hỏi sự kiên nhẫn, học hỏi liên tục và kỷ luật. Bằng việc áp dụng những kiến thức trong bài viết này, bạn sẽ có nền tảng vững chắc để bắt đầu hành trình đầu tư thành công.
`,

    'crypto': (title) => `
## Tổng quan về ${title}

Thị trường tiền mã hóa đã trải qua những biến động lớn trong những năm gần đây, thu hút sự quan tâm của hàng triệu nhà đầu tư trên toàn thế giới. Bài viết này sẽ giúp bạn hiểu rõ hơn về lĩnh vực đầy tiềm năng nhưng cũng nhiều rủi ro này.

### Blockchain và công nghệ nền tảng

Blockchain là công nghệ sổ cái phân tán làm nền tảng cho hầu hết các loại tiền mã hóa. Mỗi giao dịch được ghi lại trên một khối và liên kết với các khối trước đó, tạo thành một chuỗi không thể thay đổi. Điều này đảm bảo tính minh bạch và an toàn cho hệ thống.

## Các loại tiền mã hóa phổ biến

Hiện nay có hàng nghìn loại tiền mã hóa với các đặc điểm và mục đích sử dụng khác nhau. Dưới đây là bảng so sánh một số đồng coin hàng đầu.

| Tên | Ký hiệu | Đặc điểm nổi bật | Vốn hóa |
|-----|---------|------------------|---------|
| Bitcoin | BTC | Đồng tiền đầu tiên, store of value | Cao nhất |
| Ethereum | ETH | Smart contracts, DeFi | Thứ hai |
| BNB | BNB | Token của Binance | Top 5 |
| Solana | SOL | Tốc độ giao dịch nhanh | Top 10 |

### Cách mua và lưu trữ crypto

Để mua crypto, bạn cần đăng ký tài khoản tại một sàn giao dịch uy tín như Binance, Coinbase hoặc Kraken. Sau khi xác minh danh tính, bạn có thể nạp tiền và bắt đầu mua các loại token.

## Bảo mật tài sản số

Bảo mật là yếu tố quan trọng nhất khi đầu tư crypto. Có hai loại ví chính là ví nóng (hot wallet) và ví lạnh (cold wallet). Ví lạnh như Ledger hoặc Trezor cung cấp mức độ bảo mật cao nhất vì không kết nối internet.

### Các hình thức lừa đảo phổ biến

Thị trường crypto tồn tại nhiều hình thức lừa đảo như rug pull, phishing, và scam coin. Hãy luôn nghiên cứu kỹ dự án trước khi đầu tư và không bao giờ chia sẻ private key với bất kỳ ai.

## Chiến lược đầu tư crypto

Có nhiều chiến lược đầu tư crypto khác nhau phù hợp với từng mức độ chấp nhận rủi ro. Chiến lược HODL phù hợp với người tin vào giá trị dài hạn. DCA (Dollar Cost Averaging) giúp giảm rủi ro biến động giá bằng cách mua định kỳ.

### Phân tích kỹ thuật trong crypto

Các chỉ báo như RSI, MACD, và Bollinger Bands được sử dụng rộng rãi trong phân tích thị trường crypto. Tuy nhiên, do tính biến động cao, các chỉ báo này cần được kết hợp với phân tích cơ bản.

## Kết luận

Đầu tư crypto đòi hỏi kiến thức, sự thận trọng và khả năng chấp nhận rủi ro cao. Hãy chỉ đầu tư số tiền bạn có thể chấp nhận mất và luôn cập nhật thông tin thị trường thường xuyên.
`,

    'bat-dong-san': (title) => `
## Tổng quan về ${title}

Bất động sản từ lâu đã được coi là một trong những kênh đầu tư an toàn và sinh lời bền vững nhất. Với sự phát triển kinh tế và đô thị hóa nhanh chóng, thị trường bất động sản Việt Nam vẫn còn nhiều tiềm năng tăng trưởng.

### Các hình thức đầu tư bất động sản

Có nhiều cách để tham gia thị trường bất động sản, từ mua nhà cho thuê đến đầu tư đất nền hay REITs. Mỗi hình thức có ưu nhược điểm riêng phù hợp với từng mức vốn và khẩu vị rủi ro.

## So sánh các hình thức đầu tư

| Hình thức | Vốn tối thiểu | Rủi ro | Thanh khoản | Lợi nhuận kỳ vọng |
|-----------|---------------|--------|-------------|-------------------|
| Đất nền | Cao | Trung bình | Thấp | 10-20%/năm |
| Căn hộ cho thuê | Trung bình | Thấp | Trung bình | 5-8%/năm |
| REITs | Thấp | Thấp | Cao | 8-12%/năm |
| Homestay/Airbnb | Trung bình | Cao | Trung bình | 10-15%/năm |

### Phân tích vị trí đầu tư

Vị trí là yếu tố quan trọng nhất quyết định giá trị bất động sản. Các yếu tố cần xem xét bao gồm hạ tầng giao thông, tiện ích xung quanh, quy hoạch phát triển, và mật độ dân cư.

## Quy trình mua bất động sản

Để mua bất động sản an toàn, bạn cần thực hiện các bước sau một cách cẩn thận và có sự tư vấn của chuyên gia pháp lý.

### Bước 1: Nghiên cứu thị trường

Tìm hiểu giá thị trường trong khu vực, so sánh với các dự án tương tự, và đánh giá tiềm năng tăng giá trong tương lai. Các nguồn thông tin uy tín bao gồm các trang bất động sản lớn và báo cáo thị trường.

### Bước 2: Kiểm tra pháp lý

Xác minh giấy tờ sở hữu, quy hoạch đất, và các vấn đề tranh chấp có thể có. Nên thuê luật sư hoặc công ty tư vấn pháp lý để đảm bảo giao dịch an toàn.

## Tài chính và đòn bẩy

Sử dụng vốn vay ngân hàng là cách phổ biến để tăng khả năng đầu tư. Tuy nhiên, cần tính toán kỹ khả năng trả nợ và chuẩn bị cho các tình huống xấu như lãi suất tăng hoặc thu nhập giảm.

### Quản lý bất động sản cho thuê

Nếu mua để cho thuê, việc quản lý hiệu quả là chìa khóa thành công. Bạn có thể tự quản lý hoặc thuê công ty quản lý chuyên nghiệp với mức phí thường từ 5-10% doanh thu.

## Kết luận

Đầu tư bất động sản đòi hỏi vốn lớn và tầm nhìn dài hạn. Bằng việc nghiên cứu kỹ lưỡng và có chiến lược rõ ràng, bạn có thể xây dựng một danh mục bất động sản sinh lời ổn định.
`,

    'vang': (title) => `
## Giới thiệu về ${title}

Vàng từ hàng nghìn năm nay đã được coi là tài sản trú ẩn an toàn và công cụ bảo toàn giá trị. Trong bối cảnh kinh tế biến động, nhiều nhà đầu tư tìm đến vàng như một phần quan trọng trong danh mục đầu tư của mình.

### Tại sao vàng có giá trị?

Vàng có các đặc tính vật lý độc đáo như không bị oxy hóa, dễ chia nhỏ, và có nguồn cung hạn chế. Những đặc điểm này khiến vàng trở thành phương tiện trao đổi và lưu trữ giá trị lý tưởng từ thời cổ đại.

## Các hình thức đầu tư vàng

| Hình thức | Ưu điểm | Nhược điểm | Phù hợp với |
|-----------|---------|------------|-------------|
| Vàng miếng SJC | Dễ mua bán, giá sát thế giới | Cần bảo quản | Đầu tư trung dài hạn |
| Vàng nhẫn | Có thể làm trang sức | Mất phí gia công | Tích lũy nhỏ lẻ |
| Vàng tài khoản | Không cần lưu trữ | Phụ thuộc ngân hàng | Giao dịch linh hoạt |
| ETF vàng | Thanh khoản cao | Cần tài khoản chứng khoán | Đầu tư chuyên nghiệp |

### Chi phí và thuế

Khi mua bán vàng vật chất, bạn cần lưu ý chênh lệch giá mua-bán (spread) thường từ 400.000-800.000 đồng/lượng. Hiện tại Việt Nam chưa đánh thuế lãi vốn đối với giao dịch vàng cá nhân.

## Yếu tố ảnh hưởng giá vàng

Nhiều yếu tố kinh tế vĩ mô tác động đến giá vàng. Hiểu rõ những yếu tố này giúp bạn đưa ra quyết định đầu tư tốt hơn.

### Lạm phát và lãi suất

Vàng thường được coi là công cụ chống lạm phát hiệu quả. Khi lạm phát tăng cao, giá vàng có xu hướng tăng. Ngược lại, khi lãi suất thực tăng, vàng trở nên kém hấp dẫn hơn do không tạo ra thu nhập.

### Đồng USD và địa chính trị

Giá vàng thường có mối quan hệ nghịch với đồng USD. Khi USD mạnh lên, giá vàng có xu hướng giảm và ngược lại. Ngoài ra, căng thẳng địa chính trị thường đẩy giá vàng tăng do tâm lý trú ẩn an toàn.

## Chiến lược đầu tư vàng

Có nhiều cách tiếp cận khi đầu tư vàng. Chiến lược phổ biến nhất là phân bổ 5-10% danh mục vào vàng như một công cụ đa dạng hóa và phòng ngừa rủi ro.

### Thời điểm mua vàng

Không ai có thể dự đoán chính xác thời điểm tốt nhất để mua vàng. Chiến lược DCA (mua định kỳ) giúp giảm rủi ro mua ở đỉnh giá.

## Kết luận

Vàng là tài sản quan trọng trong danh mục đầu tư đa dạng. Mặc dù không tạo ra thu nhập thụ động, vàng giúp bảo vệ tài sản trong những thời kỳ kinh tế bất ổn.
`,

    'forex': (title) => `
## Tổng quan về ${title}

Thị trường ngoại hối (Forex) là thị trường tài chính lớn nhất thế giới với khối lượng giao dịch hàng ngày lên đến hàng nghìn tỷ USD. Bài viết này sẽ cung cấp những kiến thức cơ bản để bạn bắt đầu tìm hiểu về lĩnh vực này.

### Forex hoạt động như thế nào?

Forex là thị trường phi tập trung, hoạt động 24/5 thông qua mạng lưới ngân hàng và các tổ chức tài chính toàn cầu. Giao dịch diễn ra theo cặp tiền tệ, ví dụ EUR/USD có nghĩa là bạn mua Euro và bán USD.

## Các cặp tiền tệ phổ biến

| Cặp tiền | Tên gọi | Đặc điểm | Volatility |
|----------|---------|----------|------------|
| EUR/USD | Euro Dollar | Thanh khoản cao nhất | Thấp-Trung bình |
| GBP/USD | Cable | Biến động mạnh | Cao |
| USD/JPY | Gopher | Ảnh hưởng bởi BoJ | Trung bình |
| USD/CHF | Swissy | Tài sản trú ẩn | Thấp |

### Pip và Lot là gì?

Pip là đơn vị đo lường nhỏ nhất của biến động giá, thường là chữ số thập phân thứ 4 (0.0001). Lot là đơn vị khối lượng giao dịch, với 1 lot tiêu chuẩn = 100.000 đơn vị tiền tệ cơ sở.

## Phân tích thị trường Forex

Có hai phương pháp phân tích chính được sử dụng trong giao dịch Forex là phân tích cơ bản và phân tích kỹ thuật.

### Phân tích cơ bản

Phân tích cơ bản tập trung vào các yếu tố kinh tế vĩ mô như lãi suất, GDP, tỷ lệ thất nghiệp, và chính sách tiền tệ của các ngân hàng trung ương. Các tin tức và sự kiện kinh tế có thể gây biến động mạnh cho thị trường.

### Phân tích kỹ thuật

Phân tích kỹ thuật sử dụng biểu đồ giá và các chỉ báo để xác định xu hướng và điểm vào lệnh. Các công cụ phổ biến bao gồm Moving Average, RSI, MACD, và Fibonacci.

## Quản lý rủi ro

Quản lý rủi ro là yếu tố quan trọng nhất quyết định thành bại trong Forex. Không bao giờ mạo hiểm quá 1-2% vốn cho một giao dịch.

### Stop Loss và Take Profit

Luôn đặt stop loss để hạn chế tổn thất khi thị trường đi ngược hướng. Take profit giúp chốt lời tự động khi đạt mục tiêu lợi nhuận.

## Kết luận

Forex là thị trường có tiềm năng lợi nhuận cao nhưng cũng rủi ro lớn. Hãy học hỏi kỹ lưỡng và thực hành trên tài khoản demo trước khi giao dịch thật.
`,

    'trai-phieu': (title) => `
## Giới thiệu về ${title}

Trái phiếu là công cụ đầu tư phổ biến cho những nhà đầu tư tìm kiếm thu nhập ổn định và rủi ro thấp hơn cổ phiếu. Bài viết này sẽ giúp bạn hiểu rõ hơn về loại tài sản quan trọng này.

### Trái phiếu hoạt động như thế nào?

Khi bạn mua trái phiếu, bạn đang cho tổ chức phát hành (chính phủ hoặc doanh nghiệp) vay tiền. Đổi lại, bạn nhận được lãi suất định kỳ (coupon) và hoàn gốc khi đáo hạn.

## So sánh các loại trái phiếu

| Loại trái phiếu | Nhà phát hành | Rủi ro | Lợi suất | Thuế |
|-----------------|---------------|--------|----------|------|
| TPCP | Chính phủ | Rất thấp | 5-7%/năm | Miễn |
| TP Doanh nghiệp | Công ty | Trung bình-Cao | 8-12%/năm | 5% |
| TP Ngân hàng | Ngân hàng | Thấp | 6-8%/năm | 5% |
| TP Địa phương | UBND | Thấp | 5-6%/năm | Miễn |

### Các thuật ngữ quan trọng

Coupon rate là lãi suất danh nghĩa được in trên trái phiếu. YTM (Yield to Maturity) là lợi suất thực tế nếu giữ đến ngày đáo hạn. Duration đo lường độ nhạy cảm của giá trái phiếu với lãi suất.

## Rủi ro khi đầu tư trái phiếu

Mặc dù được coi là an toàn hơn cổ phiếu, trái phiếu vẫn có những rủi ro riêng mà nhà đầu tư cần lưu ý.

### Rủi ro lãi suất

Khi lãi suất thị trường tăng, giá trái phiếu hiện có giảm. Đây là rủi ro quan trọng nhất đối với nhà đầu tư trái phiếu, đặc biệt với các trái phiếu kỳ hạn dài.

### Rủi ro tín dụng

Rủi ro tổ chức phát hành không thể trả lãi hoặc hoàn gốc. Trái phiếu chính phủ có rủi ro tín dụng thấp nhất, trong khi trái phiếu doanh nghiệp có thể có rủi ro cao hơn.

## Chiến lược đầu tư trái phiếu

Có nhiều chiến lược đầu tư trái phiếu phù hợp với các mục tiêu khác nhau.

### Chiến lược bậc thang (Ladder)

Mua các trái phiếu với kỳ hạn khác nhau để phân tán rủi ro lãi suất và đảm bảo dòng tiền đều đặn khi các trái phiếu lần lượt đáo hạn.

## Kết luận

Trái phiếu là phần quan trọng trong danh mục đầu tư cân bằng. Phân bổ hợp lý giữa cổ phiếu và trái phiếu giúp giảm rủi ro tổng thể và đảm bảo thu nhập ổn định.
`,

    'quy-dau-tu': (title) => `
## Tổng quan về ${title}

Quỹ đầu tư là công cụ giúp nhà đầu tư cá nhân tiếp cận thị trường tài chính một cách chuyên nghiệp mà không cần tự quản lý. Bài viết này sẽ giúp bạn hiểu rõ về các loại quỹ và cách lựa chọn phù hợp.

### Quỹ đầu tư hoạt động như thế nào?

Quỹ đầu tư gom tiền từ nhiều nhà đầu tư và được quản lý bởi các chuyên gia. Người quản lý quỹ sử dụng số tiền này để mua các loại tài sản theo chiến lược của quỹ và phân chia lợi nhuận cho các nhà đầu tư.

## So sánh các loại quỹ

| Loại quỹ | Đặc điểm | Phí quản lý | Thanh khoản | Phù hợp với |
|----------|----------|-------------|-------------|-------------|
| Quỹ mở | Mua bán linh hoạt | 1-2%/năm | Cao | Đa số nhà đầu tư |
| Quỹ đóng | Niêm yết sàn | 1-1.5%/năm | Trung bình | Nhà đầu tư dài hạn |
| ETF | Giao dịch như cổ phiếu | 0.2-0.5%/năm | Cao | Đầu tư thụ động |
| Quỹ hưu trí | Ưu đãi thuế | 1-2%/năm | Thấp | Chuẩn bị nghỉ hưu |

### Chi phí đầu tư quỹ

Các loại phí bao gồm phí quản lý hàng năm, phí mua (front-end load), và phí bán (back-end load). Tổng chi phí ảnh hưởng đáng kể đến lợi nhuận dài hạn nên cần xem xét kỹ.

## Tiêu chí chọn quỹ đầu tư

Lựa chọn quỹ phù hợp đòi hỏi đánh giá nhiều yếu tố quan trọng.

### Hiệu suất lịch sử

Xem xét hiệu suất quỹ trong các khoảng thời gian khác nhau (1 năm, 3 năm, 5 năm) và so sánh với benchmark. Tuy nhiên, hiệu suất quá khứ không đảm bảo kết quả tương lai.

### Đội ngũ quản lý

Kinh nghiệm và thành tích của người quản lý quỹ là yếu tố quan trọng. Tìm hiểu về chiến lược đầu tư và phong cách quản lý của họ.

## Quỹ ETF tại Việt Nam

ETF ngày càng phổ biến tại Việt Nam với các quỹ như E1VFVN30, FUEVFVND, và SSIAM VN30. Ưu điểm lớn nhất là chi phí thấp và có thể giao dịch linh hoạt như cổ phiếu.

### Cách mua ETF

Để mua ETF, bạn cần có tài khoản chứng khoán và đặt lệnh mua như với cổ phiếu thông thường. Giá ETF được cập nhật liên tục trong phiên giao dịch.

## Kết luận

Quỹ đầu tư là lựa chọn tốt cho nhà đầu tư không có thời gian hoặc kiến thức để tự quản lý danh mục. Hãy chọn quỹ phù hợp với mục tiêu và khẩu vị rủi ro của bạn.
`,

    'khoi-nghiep': (title) => `
## Giới thiệu về ${title}

Đầu tư vào khởi nghiệp là hình thức đầu tư có rủi ro cao nhưng tiềm năng sinh lời lớn. Bài viết này sẽ giúp bạn hiểu rõ hơn về cách tiếp cận thị trường này một cách thông minh.

### Tại sao đầu tư startup?

Startup có tiềm năng tăng trưởng gấp nhiều lần trong thời gian ngắn. Nhiều nhà đầu tư đã tạo ra lợi nhuận khổng lồ từ việc đầu tư sớm vào các công ty như Grab, VNG, hay Tiki.

## Các giai đoạn đầu tư startup

| Giai đoạn | Đặc điểm | Vốn đầu tư | Rủi ro | Lợi nhuận tiềm năng |
|-----------|----------|------------|--------|---------------------|
| Pre-seed | Ý tưởng | 10-50K USD | Rất cao | 50-100x |
| Seed | Có MVP | 50-500K USD | Cao | 20-50x |
| Series A | Có doanh thu | 1-5M USD | Trung bình-Cao | 10-20x |
| Series B+ | Expansion | 5M+ USD | Trung bình | 3-10x |

### Angel Investor vs Venture Capital

Angel investor là cá nhân đầu tư tiền cá nhân vào giai đoạn sớm. Venture Capital (VC) là quỹ đầu tư chuyên nghiệp, thường tham gia từ giai đoạn Seed hoặc Series A với số vốn lớn hơn.

## Đánh giá startup trước khi đầu tư

Việc đánh giá kỹ lưỡng giúp giảm thiểu rủi ro và tăng khả năng thành công của khoản đầu tư.

### Đội ngũ sáng lập

Đội ngũ là yếu tố quan trọng nhất. Tìm kiếm những founder có kinh nghiệm trong ngành, khả năng thực thi, và tinh thần kiên định. Startup có thể thay đổi sản phẩm nhưng khó thay đổi founder.

### Thị trường và mô hình kinh doanh

Đánh giá quy mô thị trường (TAM, SAM, SOM), tốc độ tăng trưởng, và khả năng thu tiền của mô hình kinh doanh. Startup cần giải quyết vấn đề thực sự và có khả năng mở rộng.

## ESOP và quyền lợi nhân viên

ESOP (Employee Stock Ownership Plan) là cách startup thu hút và giữ chân nhân tài. Nhân viên nhận cổ phần ưu đãi có thể tạo ra lợi nhuận lớn nếu công ty thành công.

### Vesting schedule

Thông thường, ESOP có vesting 4 năm với 1 năm cliff. Điều này có nghĩa bạn cần làm việc ít nhất 1 năm để được nhận phần đầu tiên, sau đó nhận dần hàng tháng.

## Kết luận

Đầu tư startup đòi hỏi kiên nhẫn, kiến thức sâu, và khả năng chấp nhận mất vốn. Đa dạng hóa bằng cách đầu tư vào nhiều startup khác nhau để tăng khả năng thành công.
`,

    'dau-tu-thay-the': (title) => `
## Tổng quan về ${title}

Đầu tư thay thế (alternative investments) bao gồm các loại tài sản ngoài cổ phiếu, trái phiếu, và tiền mặt truyền thống. Những tài sản này giúp đa dạng hóa danh mục và thường có tương quan thấp với thị trường chứng khoán.

### Tại sao cần đầu tư thay thế?

Tài sản thay thế giúp giảm biến động danh mục đầu tư khi thị trường truyền thống sụt giảm. Nhiều nhà đầu tư tổ chức phân bổ 10-30% danh mục vào các loại tài sản này.

## Các loại tài sản thay thế

| Loại tài sản | Vốn tối thiểu | Thanh khoản | Rủi ro | Lợi nhuận kỳ vọng |
|--------------|---------------|-------------|--------|-------------------|
| Nghệ thuật | Cao | Rất thấp | Trung bình | 5-15%/năm |
| Rượu vang | Trung bình | Thấp | Trung bình | 8-12%/năm |
| Đồng hồ cao cấp | Cao | Trung bình | Trung bình | 5-10%/năm |
| NFT/Crypto Art | Thấp-Cao | Trung bình | Rất cao | -50% đến +500% |

### Đầu tư nghệ thuật

Thị trường nghệ thuật có lịch sử lâu đời và nhiều tác phẩm đã tăng giá hàng chục lần. Tuy nhiên, cần kiến thức chuyên sâu để đánh giá giá trị và xác thực tác phẩm thật.

## NFT và tài sản số

NFT (Non-Fungible Token) là chứng chỉ sở hữu duy nhất trên blockchain cho các tài sản số như tranh kỹ thuật số, nhạc, và vật phẩm game.

### Rủi ro với NFT

Thị trường NFT biến động mạnh và nhiều dự án đã mất gần hết giá trị. Cần nghiên cứu kỹ về nghệ sĩ, dự án, và cộng đồng trước khi đầu tư.

### Collectibles và đồ sưu tầm

Tem, tiền cổ, đồ chơi vintage, và thẻ bóng chày đều có thể là khoản đầu tư sinh lời. Thị trường này đòi hỏi kiến thức chuyên sâu và khả năng đánh giá tình trạng vật phẩm.

## Đầu tư rượu vang cao cấp

Rượu vang từ các vùng nổi tiếng như Bordeaux, Burgundy có thể tăng giá theo thời gian. Điều kiện bảo quản nghiêm ngặt (nhiệt độ, độ ẩm, ánh sáng) là yếu tố quan trọng.

### Chi phí lưu trữ

Nếu đầu tư số lượng lớn, bạn cần thuê kho chuyên dụng với chi phí hàng năm. Một số nền tảng như Vinovest cho phép đầu tư mà không cần lưu trữ vật lý.

## Kết luận

Tài sản thay thế là phần bổ sung hữu ích cho danh mục đầu tư. Tuy nhiên, chỉ nên phân bổ một phần nhỏ vào các loại tài sản này và cần có kiến thức chuyên sâu trước khi tham gia.
`,

    'tai-chinh-ca-nhan': (title) => `
## Giới thiệu về ${title}

Quản lý tài chính cá nhân hiệu quả là nền tảng để đạt được các mục tiêu tài chính như mua nhà, nghỉ hưu sớm, hay có cuộc sống thoải mái. Bài viết này sẽ cung cấp những nguyên tắc và phương pháp thiết thực.

### Tầm quan trọng của tài chính cá nhân

Không quan trọng bạn kiếm được bao nhiêu tiền, mà quan trọng là bạn giữ được và làm tăng số tiền đó như thế nào. Nhiều người thu nhập cao vẫn gặp khó khăn tài chính do thiếu kỹ năng quản lý.

## Các quy tắc ngân sách phổ biến

| Quy tắc | Phân bổ | Đặc điểm | Phù hợp với |
|---------|---------|----------|-------------|
| 50/30/20 | Thiết yếu 50%, Mong muốn 30%, Tiết kiệm 20% | Đơn giản, dễ áp dụng | Hầu hết mọi người |
| 70/20/10 | Chi tiêu 70%, Tiết kiệm 20%, Từ thiện 10% | Có yếu tố cho đi | Người có tâm hướng thiện |
| Pay yourself first | Tiết kiệm trước, chi tiêu sau | Ưu tiên tích lũy | Người muốn tích lũy nhanh |
| Zero-based | Phân bổ mỗi đồng | Kiểm soát chi tiết | Người cần kỷ luật cao |

### Xây dựng quỹ khẩn cấp

Quỹ khẩn cấp là khoản tiền dự phòng cho các tình huống bất ngờ như mất việc, ốm đau. Mục tiêu thường là 3-6 tháng chi phí sinh hoạt, để trong tài khoản tiết kiệm dễ rút.

## Quản lý nợ hiệu quả

Nợ không phải lúc nào cũng xấu, nhưng cần được quản lý cẩn thận để không trở thành gánh nặng tài chính.

### Phân biệt nợ tốt và nợ xấu

Nợ tốt là nợ để đầu tư vào tài sản sinh lời như nhà ở, giáo dục. Nợ xấu là nợ tiêu dùng lãi suất cao như thẻ tín dụng, vay tiêu dùng. Ưu tiên trả nợ xấu trước.

### Phương pháp trả nợ

Snowball: Trả nợ nhỏ nhất trước để tạo động lực. Avalanche: Trả nợ lãi suất cao nhất trước để tiết kiệm lãi. Cả hai đều hiệu quả, chọn phương pháp phù hợp với tâm lý của bạn.

## Lập kế hoạch tài chính dài hạn

Kế hoạch tài chính giúp bạn biết cần tích lũy bao nhiêu để đạt các mục tiêu như mua nhà trong 5 năm hay nghỉ hưu lúc 55 tuổi.

### Tính toán mục tiêu nghỉ hưu

Sử dụng quy tắc 4%: Số tiền nghỉ hưu = Chi tiêu hàng năm x 25. Ví dụ, nếu cần 500 triệu/năm chi tiêu, bạn cần tích lũy 12.5 tỷ đồng.

## Kết luận

Tài chính cá nhân là hành trình marathon, không phải sprint. Bắt đầu sớm, kiên nhẫn, và kỷ luật là chìa khóa để đạt được sự tự do tài chính.
`,
};

async function updatePosts() {
    console.log('=== Cập nhật nội dung bài viết ===\n');

    // Get all posts with their category
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, slug, categories(slug)')
        .order('created_at');

    console.log(`Tìm thấy ${posts?.length || 0} bài viết\n`);

    if (!posts) return;

    let updated = 0;
    for (const post of posts) {
        const catSlug = (post.categories as any)?.slug || 'chung-khoan';
        const template = contentTemplates[catSlug] || contentTemplates['chung-khoan'];
        const content = template(post.title);

        const { error } = await supabase
            .from('posts')
            .update({ content })
            .eq('id', post.id);

        if (error) {
            console.log(`❌ ${post.title.substring(0, 40)}...: ${error.message}`);
        } else {
            console.log(`✅ ${post.title.substring(0, 50)}...`);
            updated++;
        }
    }

    console.log(`\n🎉 Đã cập nhật ${updated}/${posts.length} bài viết!`);
}

updatePosts().catch(console.error);
