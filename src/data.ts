import { ContestRule, ContestPrize, EvaluationCriteria, SectionConfig, LandingPageContent } from './types';

export const CONTEST_RULES: ContestRule[] = [
  {
    icon: 'Target',
    title: 'Yêu cầu về Tầm nhìn & Sứ mệnh (Vision & Mission)',
    description: 'Thể hiện tầm nhìn đột phá & sứ mệnh kiến tạo; hình ảnh cần truyền tải tinh thần đầu tư mạo hiểm với tính quyết liệt, tiên phong và liên tục đổi mới. Bộ nhận diện phải thể hiện sự cam kết đồng hành của Quỹ cùng các dự án tiềm năng, các doanh nghiệp khởi nghiệp công nghệ, đổi mới sáng tạo, góp phần tạo động lực tăng trưởng bứt phá cho kinh tế Thành phố.'
  },
  {
    icon: 'Lightbulb',
    title: 'Yêu cầu về Thuộc tính thương hiệu (Brand Attributes)',
    description: 'Thể hiện rõ nét các thuộc tính cốt lõi bao gồm: Mạo hiểm (Sự táo bạo), Công nghệ (Sự tiên phong), Uy tín (Sự minh bạch của định chế tài chính) và Bản sắc địa phương (Sự năng động, nghĩa tình, tiên phong của TP.HCM). Dù mang tinh thần tiên phong, tổng thể thiết kế vẫn phải toát lên phong thái chuyên nghiệp, uy tín và vững chắc của một định chế tài chính.'
  },
  {
    icon: 'MessageSquare',
    title: 'Yêu cầu về Khẩu hiệu thương hiệu (Slogan/Tagline)',
    description: 'Ý tưởng câu khẩu hiệu đi kèm phải ngắn gọn, súc tích, dễ nhớ, mang tính truyền cảm hứng mạnh mẽ và khát vọng vươn ra toàn cầu của cộng đồng khởi nghiệp.'
  },
  {
    icon: 'Layers',
    title: 'Ngôn ngữ thị giác tinh giản & Thích ứng linh hoạt (Responsive)',
    description: 'Ưu tiên phong cách thiết kế hiện đại, lược bỏ các chi tiết rườm rà. BI phải sở hữu tính "thích ứng" cao, duy trì độ nhận diện hoàn hảo và tính thẩm mỹ đồng nhất khi triển khai trên đa điểm chạm (màn hình trình chiếu hội nghị, standee, báo cáo thường niên, mạng xã hội...)'
  },
  {
    icon: 'Monitor',
    title: 'Có thể sử dụng trên nhiều nền tảng khác nhau',
    description: 'BI phải đảm bảo hiển thị tốt trên các nền tảng số (website, mạng xã hội, ứng dụng di động), trên các ấn phẩm in ấn (banner, poster, brochure, tài liệu hướng dẫn), trên sản phẩm quảng bá (áo thun, cốc, huy hiệu) và trên các thiết bị trình chiếu (màn hình LED, bảng điện tử).'
  },
  {
    icon: 'Palette',
    title: 'Màu sắc và hình ảnh phù hợp',
    description: 'BI nên sử dụng màu sắc hài hòa, phù hợp với tinh thần "đầu tư mạo hiểm" – quyết liệt, đi đầu xu hướng và không ngừng đổi mới. Cung cấp mã màu kỹ thuật chính xác: CMYK (cho in ấn hệ offset), RGB & HEX (cho hiển thị kỹ thuật số), và mã Pantone tương ứng.'
  },
  {
    icon: 'CheckCircle',
    title: 'Phải đảm bảo các yêu cầu quy định',
    description: 'Theo Thể lệ cuộc thi do Ban Tổ chức ban hành và không vi phạm thuần phong mỹ tục văn hóa dân tộc, pháp luật Việt Nam.'
  }
];

export const CONTEST_PRIZES: ContestPrize[] = [
  {
    title: 'Giải Nhất',
    amount: '15.000.000 VND',
    desc: 'Giải thưởng tiền mặt 15 triệu đồng, chứng chỉ công nhận.',
    icon: 'CheckCircle2',
    isFirst: true
  },
  {
    title: 'Giải Nhì',
    amount: '10.000.000 VND',
    desc: 'Giải thưởng tiền mặt 10 triệu đồng, chứng chỉ công nhận.',
    icon: 'Star'
  },
  {
    title: 'Giải Ba',
    amount: '5.000.000 VND',
    desc: 'Giải thưởng tiền mặt 5 triệu đồng, chứng chỉ công nhận.',
    icon: 'Star'
  }
];

export const EVALUATION_CRITERIA: EvaluationCriteria[] = [
  {
    title: 'Tính sáng tạo (30 điểm)',
    desc: 'Ý tưởng mới lạ, độc đáo, khác biệt.'
  },
  {
    title: 'Khả năng nhận diện (25 điểm)',
    desc: 'BI dễ nhớ, dễ nhận diện.'
  },
  {
    title: 'Tính thẩm mỹ (20 điểm)',
    desc: 'Sự hài hòa về màu sắc, hình ảnh, bố cục.'
  },
  {
    title: 'Ý nghĩa thể hiện (15 điểm)',
    desc: 'BI truyền tải được sự đột phá, sứ mệnh kiến tạo, sự tin cậy và linh hoạt.'
  }
];

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'hero', name: 'Màn hình chính (Hero)', visible: true },
  { id: 'about', name: 'Giới thiệu cuộc thi', visible: true },
  { id: 'rules', name: 'Quy định & Thể lệ', visible: true },
  { id: 'prizes', name: 'Giải thưởng', visible: true },
  { id: 'criteria', name: 'Tiêu chí đánh giá', visible: true },
  { id: 'submission', name: 'Hình thức nộp bài', visible: true }
];

export const DEFAULT_CONTENT: LandingPageContent = {
  hero: {
    badge: 'Cuộc Thi Toàn Quốc',
    title: 'Phát Động Cuộc Thi Sáng Tác',
    titleHighlight: 'Bộ Nhận Diện Thương Hiệu',
    desc: 'Cơ hội để các nhà thiết kế thể hiện tài năng và góp phần xây dựng hình ảnh của Quỹ đầu tư mạo hiểm TP.HCM',
    ctaBtn: 'Đăng ký tham gia ngay',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1920&q=80'
  },
  about: {
    title: 'Phát Động Cuộc Thi Sáng Tác',
    titleHighlight: 'Bộ Nhận Diện Thương Hiệu (Brand Identity)',
    desc: 'Ngày phát động: 06/06/2026\n\nNhằm xây dựng bộ nhận diện thương hiệu chính thức, đồng thời lan tỏa hình ảnh và sứ mệnh của Công ty đến cộng đồng, Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh (HCM VIF JSC) chính thức phát động Cuộc thi sáng tác Bộ nhận diện thương hiệu (Brand Identity) dành cho các cá nhân, tổ chức trong và ngoài nước.\n\nCuộc thi là sân chơi sáng tạo dành cho các nhà thiết kế, chuyên gia thương hiệu, sinh viên và những người yêu thích lĩnh vực sáng tạo, với mong muốn tìm kiếm những ý tưởng độc đáo, thể hiện tinh thần tiên phong, đổi mới và khát vọng phát triển của HCM VIF JSC trong lĩnh vực đầu tư mạo hiểm và đổi mới sáng tạo.\n\nBộ nhận diện thương hiệu dự thi cần thể hiện tầm nhìn đột phá, sứ mệnh kiến tạo, tinh thần đầu tư mạo hiểm, đổi mới sáng tạo và cam kết đồng hành cùng các doanh nghiệp khởi nghiệp công nghệ, các dự án tiềm năng, góp phần tạo động lực tăng trưởng cho Thành phố Hồ Chí Minh. Đồng thời, thiết kế cần truyền tải các giá trị cốt lõi gồm: sự táo bạo, tiên phong công nghệ, uy tín của một định chế tài chính và bản sắc năng động của TP.HCM.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
  },
  info: {
    title: 'Yêu Cầu Đối Với',
    titleHighlight: 'Tác Phẩm Dự Thi',
    subtitle: 'Chi tiết các quy định, định hướng sáng tạo và tiêu chuẩn kỹ thuật bắt buộc',
    items: [...CONTEST_RULES]
  },
  prizes: {
    title: 'Giải Thưởng',
    titleHighlight: 'Hấp Dẫn',
    subtitle: 'Giải thưởng chính thức được công bố',
    items: [...CONTEST_PRIZES]
  },
  criteria: {
    title: 'Tiêu Chí Chấm Điểm',
    titleHighlight: '(thang điểm 100)',
    desc: 'Ban giám khảo sẽ đánh giá các bài thi dựa trên những tiêu chí cụ thể và khách quan, đảm bảo công bằng, minh bạch trong quá trình lựa chọn tác phẩm xuất sắc nhất.',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80',
    items: [...EVALUATION_CRITERIA]
  },
  submission: {
    title: 'Hình Thức',
    titleHighlight: 'Nộp Bài Dự Thi',
    organizerLabel: 'Ban Tổ chức Cuộc thi sáng tác bộ nhận diện (BI):',
    organizerContent: 'Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh, địa chỉ: 123 Trương Định, phường Xuân Hòa, Thành phố Hồ Chí Minh.',
    methodLabel: 'Hình thức nhận bài thi:',
    emailLabel: '01 bản điện tử qua thư điện tử (email):',
    emailContent: 'hdtrung@hcmc.vc',
    physicalLabel: '01 bản gốc:',
    physicalContent: 'Bản giấy có chữ ký nếu là cá nhân/nhóm tác giả hoặc chữ ký và đóng dấu nếu là tổ chức, gửi trực tiếp về Ban Tổ chức - Công ty Cổ phần Quỹ đầu tư mạo hiểm Thành phố Hồ Chí Minh, địa chỉ nêu trên.'
  }
};
