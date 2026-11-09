export type MinigameId =
  | 'tiptap-hop'
  | 'starlight-bakery'
  | 'midnight-claw'
  | 'philos-cipher'
  | 'lightblade-defense';

export interface EventRewardItem {
  id: string;
  nameVI: string;
  nameEN: string;
  rarity: '5-Star' | '4-Star' | 'Item' | 'Outfit' | 'Badge';
  amount?: string;
}

export interface XavierEventItem {
  id: string;
  yearGroup: '2024' | '2025' | '2026';
  date: string;
  typeVI: string;
  typeEN: string;
  categoryKey: 'wish' | 'welfare' | 'collab' | 'story' | 'special';
  titleVI: string;
  titleEN: string;
  summaryVI: string;
  summaryEN: string;
  bannerImg: string;
  fallbackGradient: string;
  pairedMinigameId: MinigameId;
  pairedMinigameNoteVI: string;
  featuredMemory?: string;
  rewards: EventRewardItem[];
  mainFanwebPath: string;
}

export interface YearArchiveSection {
  year: '2024' | '2025' | '2026';
  codenameVI: string;
  codenameEN: string;
  subtitleVI: string;
  subtitleEN: string;
  descVI: string;
  descEN: string;
  coverImg: string;
}

export interface MinigameMetadata {
  id: MinigameId;
  indexNumber: string;
  titleVI: string;
  titleEN: string;
  pairedEventId: string;
  pairedEventTitleVI: string;
  pairedEventDate: string;
  genreVI: string;
  difficultyLabel: string;
  rewardDiamonds: number;
  keepsakeId: string;
  keepsakeNameVI: string;
  shortDescVI: string;
  rulesVI: string[];
  bannerImg: string;
}

export const GENERATED_IMAGES = {
  heroObservatory: '/src/assets/images/hero_moonstride_observatory_1794202839105.jpg',
  touringInLove: '/src/assets/images/event_touring_in_love_1794202841688.jpg',
  throneOfEros: '/src/assets/images/event_throne_of_eros_1794202842344.jpg',
  lingeringLight: '/src/assets/images/event_lingering_light_1794202843283.jpg',
  loveIsRealCyber: '/src/assets/images/event_love_is_real_cyber_1794202844916.jpg',
};

export const MINIGAMES_LIST: MinigameMetadata[] = [
  {
    id: 'tiptap-hop',
    indexNumber: '01',
    titleVI: 'Bước Nhảy Tí Tách',
    titleEN: 'Tiptap Hop · Starlight Stepping',
    pairedEventId: '2026-10',
    pairedEventTitleVI: 'Bước Nhảy Tí Tách (Tiptap Hop)',
    pairedEventDate: '21/04/2026 - 29/04/2026',
    genreVI: 'Nhịp điệu · Bậc thềm ánh sao',
    difficultyLabel: 'Cấp độ 1 · Thư giãn',
    rewardDiamonds: 300,
    keepsakeId: 'badge-good-meowning',
    keepsakeNameVI: 'Huy hiệu [Good Meowning] & Bản vẽ Nội thất',
    shortDescVI:
      'Dẫn lối Xavier Chibi và Bunbun nhảy qua 7 tầng bậc thềm tinh cầu phát sáng, thu thập Kim Cương Đỏ và tránh các mảnh thiên thạch sụp đổ.',
    rulesVI: [
      'Mỗi hàng ngang có các ô Tinh Cầu An Toàn (phát sáng tím/vàng) và ô Nhiễu Sóng Không Gian (đỏ sẫm).',
      'Chọn ô an toàn ở hàng tiếp theo hoặc dùng phím số 1–5 để bước tiến lên đài quan sát.',
      'Thu thập ô Tinh Cầu Hoàng Kim để nhận nhân đôi điểm thưởng và chuỗi Combo liên hoàn.',
    ],
    bannerImg: GENERATED_IMAGES.lingeringLight,
  },
  {
    id: 'starlight-bakery',
    indexNumber: '02',
    titleVI: 'Tiệm Bánh Thỏ Trắng',
    titleEN: 'Starlight Bakery & Chamomile Tea',
    pairedEventId: '2025-1',
    pairedEventTitleVI: 'Hành Trình Yêu Thương (Touring In Love)',
    pairedEventDate: '31/12/2024 - 19/01/2025',
    genreVI: 'Mô phỏng · Canh lửa lò nướng',
    difficultyLabel: 'Cấp độ 2 · Khéo léo',
    rewardDiamonds: 350,
    keepsakeId: 'recipe-starlight-tart',
    keepsakeNameVI: 'Ký ức 4 Sao [Love Syndrome] & Hộp Bánh Thỏ Trắng',
    shortDescVI:
      'Cùng Xavier trông coi tiệm bánh lúc nửa đêm, canh chuẩn nhiệt độ 3 lò nướng để bánh không bị cháy khét và phục vụ trà hoa cúc ấm.',
    rulesVI: [
      'Quan sát phiếu gọi món của khách và nhấn chọn loại bánh tương ứng để đưa vào lò nướng trống.',
      'Khi thanh nhiệt độ chạm vùng Hoàng Kim (70% – 92%), nhấn "Lấy bánh ra lò" ngay trước khi lò quá nhiệt (100%).',
      'Hoàn thành đúng món trong phiếu để tăng điểm thân mật và nhận thưởng Kim Cương Đỏ.',
    ],
    bannerImg: GENERATED_IMAGES.touringInLove,
  },
  {
    id: 'midnight-claw',
    indexNumber: '03',
    titleVI: 'Gắp Thú Lúc Nửa Đêm',
    titleEN: 'Midnight Arcade Claw',
    pairedEventId: '2024-10',
    pairedEventTitleVI: 'Nhịp Điệu Thường Ngày (Heartwork Routine)',
    pairedEventDate: '26/04/2024 - 10/05/2024',
    genreVI: 'Arcade · Căn góc gắp thú bông',
    difficultyLabel: 'Cấp độ 2 · Chuẩn xác',
    rewardDiamonds: 300,
    keepsakeId: 'plushie-galaxy-bunbun',
    keepsakeNameVI: 'Thú Bông Bunbun Phi Hành Gia Phiên Bản Giới Hạn',
    shortDescVI:
      'Điều khiển càng gắp Evol Ánh Sáng tại khu trò chơi Thành phố Linkon, căn chuẩn quỹ đạo băng chuyền để rinh trọn bộ thú bông hiếm.',
    rulesVI: [
      'Dùng nút dịch chuyển Trái / Phải (hoặc phím mũi tên A / D) để đưa càng gắp đến vị trí thú bông đang di chuyển.',
      'Nhấn "Hạ Càng Gắp" (hoặc phím Space) và bật "Cộng Hưởng Ánh Sáng" để tăng tỷ lệ giữ chặt thú bông.',
      'Gắp trúng các mẫu thú bông Đặc Biệt (Bunbun Sao Băng, Cáo Tuyết Philos) để mở khóa tủ trưng bày.',
    ],
    bannerImg: GENERATED_IMAGES.heroObservatory,
  },
  {
    id: 'philos-cipher',
    indexNumber: '04',
    titleVI: 'Mật Mã Tinh Hà Philos',
    titleEN: 'Philos Constellation Decryption',
    pairedEventId: '2026-3',
    pairedEventTitleVI: 'Ảo Cảnh Giao Thoa (Illusia Locus)',
    pairedEventDate: '31/12/2025 - 21/01/2026',
    genreVI: 'Giải đố · Đồng bộ ký ức ánh sao',
    difficultyLabel: 'Cấp độ 2 · Trí nhớ',
    rewardDiamonds: 350,
    keepsakeId: 'record-signal-214',
    keepsakeNameVI: 'Băng Ghi Âm Tần Số 214 MHz & Ấn Ký Ngai Thần',
    shortDescVI:
      'Giải mã 12 mảnh tinh đồ bị phong ấn trong không gian ảo ảnh bằng cách ghép nối các cặp ấn ký ký ức của Xavier với số lượt ít nhất.',
    rulesVI: [
      'Lật mở từng cặp thẻ Tinh Đồ để tìm 2 mảnh ký ức có cùng tần số ánh sáng.',
      'Mỗi cặp ghép đúng sẽ khôi phục 1 chòm sao trên La Bàn Chiêm Tinh và phát tín hiệu âm thanh.',
      'Hoàn thành giải mã toàn bộ 6 cặp chòm sao trong giới hạn lượt để mở khóa hồ sơ mật Backtrackers.',
    ],
    bannerImg: GENERATED_IMAGES.throneOfEros,
  },
  {
    id: 'lightblade-defense',
    indexNumber: '05',
    titleVI: 'Lưỡi Kiếm Ánh Sáng · Tần Số 2049',
    titleEN: 'Lightblade Protocol · Sector Defense',
    pairedEventId: '2026-18',
    pairedEventTitleVI: 'Tình Là Thật (Love Is Real · Cyberpunk)',
    pairedEventDate: '19/10/2026 - 05/11/2026',
    genreVI: 'Chiến thuật · Phòng tuyến Evol',
    difficultyLabel: 'Cấp độ 3 · Phản xạ',
    rewardDiamonds: 400,
    keepsakeId: 'blade-neon-2049',
    keepsakeNameVI: 'Huy Chương Chiến Thuật [Love Is Real · 2049]',
    shortDescVI:
      'Sát cánh cùng Xavier bảo vệ Trạm Tiếp Sóng Linkon trước các đợt lõi dị biến tiến vào 4 làn không gian bằng Lưỡi Kiếm Ánh Sáng.',
    rulesVI: [
      'Theo dõi 4 làn không gian nơi các lõi Dị Biến (Wanderer Cores) đang tiến về phía Trạm Tiếp Sóng.',
      'Nhấn vào làn tương ứng (hoặc phím 1–4) để tung Trảm Kích Ánh Sáng tiêu diệt mục tiêu gần nhất.',
      'Khi thanh Cộng Hưởng đầy 100%, kích hoạt "Bão Sao Băng Toàn Khu" để thanh tẩy toàn bộ 4 làn cùng lúc.',
    ],
    bannerImg: GENERATED_IMAGES.loveIsRealCyber,
  },
];

export const YEAR_SECTIONS: YearArchiveSection[] = [
  {
    year: '2024',
    codenameVI: 'KHỞI NGUYÊN ÁNH SAO',
    codenameEN: 'STARLIGHT GENESIS',
    subtitleVI: 'Từ Cuộc Gặp Gỡ Đầu Tiên Tại Thành Phố Linkon',
    subtitleEN: 'From Our First Encounter in Linkon City',
    descVI: 'Nơi cuộc gặp gỡ định mệnh bắt đầu và mở ra những rung động đầu tiên bên Thẩm Tinh Hồi.',
    descEN: 'Where our destined encounter began and awakened the very first heartbeats with Xavier.',
    coverImg: GENERATED_IMAGES.heroObservatory,
  },
  {
    year: '2025',
    codenameVI: 'VỌNG ÂM VƯỢT THỜI GIAN',
    codenameEN: 'CHRONO RESONANCE',
    subtitleVI: 'Kỷ Nguyên Giao Thoa Giữa Mộng Và Thực',
    subtitleEN: 'Convergence of Dreams and Reality',
    descVI: 'Hành trình lật mở những mảnh ghép quá khứ và đắm chìm vào lễ hội kỷ niệm ngọt ngào.',
    descEN: 'A journey uncovering fragments of the past and immersing in anniversary festivities.',
    coverImg: GENERATED_IMAGES.touringInLove,
  },
  {
    year: '2026',
    codenameVI: 'CHÂN TRỜI VĨNH CỬU',
    codenameEN: 'ETERNAL HORIZON',
    subtitleVI: 'Tương Lai Đang Tiếp Diễn Cùng Ánh Trăng',
    subtitleEN: 'Unfolding Future Beneath the Moon',
    descVI: 'Xuyên qua các chiều không gian để viết tiếp chuyện tình vượt mọi thời không.',
    descEN: 'Crossing dimensions to continue writing a love story beyond all time and space.',
    coverImg: GENERATED_IMAGES.throneOfEros,
  },
];

export const XAVIER_EVENTS_ARCHIVE: XavierEventItem[] = [
  // ================= 2023 - 2024 =================
  {
    id: '2023-0',
    yearGroup: '2024',
    date: '02/11/2023',
    typeVI: 'Sự kiện khởi động',
    typeEN: 'Pre-Order Event',
    categoryKey: 'special',
    titleVI: 'Mở Đặt Trước Toàn Cầu',
    titleEN: 'Global Pre-Order Launch',
    summaryVI:
      'Chính thức mở cổng đăng ký trước toàn cầu cho Love and Deepspace. Thợ Săn Không Gian Sâu tại Thành phố Linkon có thể ghi danh sớm để mở khóa các phần thưởng cột mốc đặc biệt khi trò chơi ra mắt.',
    summaryEN:
      'Global pre-registration for Love and Deepspace officially opens. Deepspace Hunters across Linkon City can sign up early to unlock exclusive milestone rewards at launch.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2023-0_bf6464f9.webp',
    fallbackGradient: 'from-[#1f1638] via-[#130d26] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Giải mã tín hiệu khởi hành Linkon',
    rewards: [
      { id: 'rw-2023-0-1', nameVI: 'Danh hiệu Thợ Săn Tiên Phong', nameEN: 'Pioneer Hunter Title', rarity: 'Badge' },
      { id: 'rw-2023-0-2', nameVI: 'Kim Cương Đỏ Khởi Hành', nameEN: 'Departure Red Diamonds', rarity: 'Item', amount: 'x500' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2023-1',
    yearGroup: '2024',
    date: '15/12/2023',
    typeVI: 'Thử nghiệm CBT',
    typeEN: 'Closed Beta Test',
    categoryKey: 'special',
    titleVI: 'Thử Nghiệm Giới Hạn',
    titleEN: 'Closed Beta Test',
    summaryVI:
      'Đợt thử nghiệm giới hạn Closed Beta chính thức khởi động, hé lộ những chương cốt truyện đầu tiên tại Thành phố Linkon và cuộc chạm trán định mệnh cùng Xavier.',
    summaryEN:
      'The limited Closed Beta Test officially begins, unveiling the opening chapters in Linkon City and the destined first encounter with Xavier.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2023-1_3e7ad1aa.webp',
    fallbackGradient: 'from-[#1a2238] via-[#111528] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Thực hành chiến thuật Lưỡi Kiếm Ánh Sáng',
    rewards: [
      { id: 'rw-2023-1-1', nameVI: 'Huy Hiệu Thử Nghiệm Linkon', nameEN: 'Linkon Beta Emblem', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2023-2',
    yearGroup: '2024',
    date: '29/12/2023',
    typeVI: 'Cột mốc toàn cầu',
    typeEN: 'Milestone Event',
    categoryKey: 'welfare',
    titleVI: 'Đạt Mốc 10 Triệu Đăng Ký',
    titleEN: '10,000,000 Pre-Registrations',
    summaryVI:
      'Cột mốc 10.000.000 Thợ Săn đăng ký trước trên toàn cầu đã hoàn thành, mở khóa toàn bộ phần thưởng khởi hành, vé Ước Nguyện và thẻ ký ức kỷ niệm.',
    summaryEN:
      'The milestone of 10,000,000 global pre-registrations is achieved, unlocking all departure rewards, Wish tickets, and commemorative Memory rewards.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2023-2_36069f06.webp',
    fallbackGradient: 'from-[#281840] via-[#140d24] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Thu thập mốc thưởng Ánh Sao',
    rewards: [
      { id: 'rw-2023-2-1', nameVI: 'Vé Ước Nguyện Không Gian Sâu', nameEN: 'Empyrean Wishes', rarity: 'Item', amount: 'x10' },
      { id: 'rw-2023-2-2', nameVI: 'Ký ức 4 Sao Khởi Hành', nameEN: 'Commemorative 4-Star Memory', rarity: '4-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-1',
    yearGroup: '2024',
    date: '18/01/2024',
    typeVI: 'Ra mắt chính thức',
    typeEN: 'Official Release',
    categoryKey: 'special',
    titleVI: 'Chính Thức Ra Mắt Toàn Cầu',
    titleEN: 'Global Official Release',
    summaryVI:
      'Love and Deepspace chính thức phát hành toàn cầu vào ngày 18/01/2024. Mở màn hành trình Deepspace Hunter và sát cánh chiến đấu cùng Xavier bằng Evol Ánh Sáng.',
    summaryEN:
      'Love and Deepspace officially launches worldwide on January 18, 2024. Embark on your journey as a Deepspace Hunter and fight alongside Xavier wielding his Light Evol.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-1_a14d6c79.webp',
    fallbackGradient: 'from-[#2a1b4e] via-[#150e2a] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Chiến dịch tuần tra đầu tiên cùng Xavier',
    featuredMemory: 'Xavier: Lightseeking Shadowrend',
    rewards: [
      { id: 'rw-2024-1-1', nameVI: 'Bộ Trang Phục Thợ Săn Linkon', nameEN: 'Linkon Hunter Uniform', rarity: 'Outfit' },
      { id: 'rw-2024-1-2', nameVI: 'Vé Ước Nguyện Vàng', nameEN: 'Deepspace Wish', rarity: 'Item', amount: 'x20' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-2',
    yearGroup: '2024',
    date: '18/01/2024 - 04/02/2024',
    typeVI: 'Ước Nguyện Đơn (SOLO)',
    typeEN: 'Solo Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Rung Động Đầu Tiên',
    titleEN: 'Heartbeat Ripples',
    summaryVI:
      'Sự kiện giới hạn mở màn kỷ niệm ra mắt chính thức với ký ức 5 sao đầu tiên của Xavier: Heartstring Symphony — giai điệu violon ngân vang trong đêm tuyết rơi.',
    summaryEN:
      'Launch celebration limited event featuring Xavier’s debut limited 5-Star Memory: Heartstring Symphony — a tender violin melody echoing through a snowy night.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-2_ace68036.webp',
    fallbackGradient: 'from-[#1f2942] via-[#121629] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Bước nhảy theo giai điệu violon đêm tuyết',
    featuredMemory: 'Xavier 5★: Heartstring Symphony',
    rewards: [
      { id: 'rw-2024-2-1', nameVI: 'Ký ức 5★ Xavier: Heartstring Symphony', nameEN: '5-Star Memory: Heartstring Symphony', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-3',
    yearGroup: '2024',
    date: '05/02/2024 - 19/02/2024',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Multi Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Lời Trao Thầm Kín',
    titleEN: 'Veiled Whispers',
    summaryVI:
      'Hồ Ước Nguyện Giới Hạn mùa Lễ Tình Nhân ra mắt ký ức 5 sao Xavier: Tender Night — khoảnh khắc ngọt ngào, ấm áp và lãng mạn trong đêm hội.',
    summaryEN:
      'Valentine’s season Limited Wish Pool featuring the 5-Star Memory Xavier: Tender Night — an intimate, romantic evening shared together.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-3_55836304.webp',
    fallbackGradient: 'from-[#331838] via-[#1a0e24] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Pha trà và chuẩn bị bánh ngọt đêm Lễ Tình Nhân',
    featuredMemory: 'Xavier 5★: Tender Night',
    rewards: [
      { id: 'rw-2024-3-1', nameVI: 'Ký ức 5★ Xavier: Tender Night', nameEN: '5-Star Memory: Tender Night', rarity: '5-Star' },
      { id: 'rw-2024-3-2', nameVI: 'Trang Phục Dự Tiệc Đêm Hội', nameEN: 'Festival Evening Attire', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-4',
    yearGroup: '2024',
    date: '21/02/2024 - 10/03/2024',
    typeVI: 'Sự kiện Chiêm Tinh',
    typeEN: 'Oracle Event',
    categoryKey: 'special',
    titleVI: 'La Bàn Chiêm Tinh',
    titleEN: 'Oracle of Stars',
    summaryVI:
      'Sự kiện La Bàn Chiêm Tinh giới hạn xuyên qua Không Gian Sâu, mang đến ký ức 4 sao đặc biệt cùng phụ kiện và vật phẩm nâng cấp quý hiếm.',
    summaryEN:
      'Limited Oracle of Stars event traversing Deepspace, offering exclusive 4-Star Memories, special accessories, and rare enhancement materials.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-4_fd0c88ab.webp',
    fallbackGradient: 'from-[#282046] via-[#141028] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Giải mã tinh đồ trên La Bàn Chiêm Tinh',
    rewards: [
      { id: 'rw-2024-4-1', nameVI: 'Ký ức 4★ Xavier Giới Hạn Chiêm Tinh', nameEN: 'Oracle 4-Star Xavier Memory', rarity: '4-Star' },
      { id: 'rw-2024-4-2', nameVI: 'Phụ Kiện Tóc Ánh Sao', nameEN: 'Starlight Hair Accessory', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-5',
    yearGroup: '2024',
    date: '11/03/2024 - 23/03/2024',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Multi Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Ánh Nhìn Vấn Vương',
    titleEN: 'Lingering Gaze',
    summaryVI:
      'Sự kiện Ước Nguyện Giới Hạn ra mắt loạt ký ức 5 sao lưu giữ những ánh nhìn dịu dàng và khoảnh khắc gần gũi khó quên bên người thương.',
    summaryEN:
      'Limited Wish Pool debuting 5-Star Memories that capture gentle gazes and unforgettable moments of closeness.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-5_536e6c22.webp',
    fallbackGradient: 'from-[#1e2640] via-[#101426] to-[#07060f]',
    pairedMinigameId: 'midnight-claw',
    pairedMinigameNoteVI: 'Sưu tầm kỷ vật hẹn hò cuối tuần',
    featuredMemory: 'Xavier 5★: Fragment of Time',
    rewards: [
      { id: 'rw-2024-5-1', nameVI: 'Ký ức 5★ Sự Kiện Lingering Gaze', nameEN: '5-Star Memory: Lingering Gaze', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-6',
    yearGroup: '2024',
    date: '17/03/2024 - 14/05/2024',
    typeVI: 'Khế Ước Bí Mật',
    typeEN: 'Secret Promise',
    categoryKey: 'welfare',
    titleVI: 'Đốn Ngã',
    titleEN: 'Succumb',
    summaryVI:
      'Mùa Khế Ước Bí Mật (Secret Promise) hoàn thành nhiệm vụ định kỳ để mở khóa ký ức 4 sao giới hạn của Xavier cùng vé Ước Nguyện Vàng và tài nguyên giá trị.',
    summaryEN:
      'Secret Promise season where completing periodic tasks unlocks an exclusive 4-Star Xavier Memory, Deepspace Wishes, and abundant progression resources.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-6_c7f6c7a0.webp',
    fallbackGradient: 'from-[#2e1a3a] via-[#170e22] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Hoàn thành nhiệm vụ tuần tra Khế Ước',
    featuredMemory: 'Xavier 4★: Succumb',
    rewards: [
      { id: 'rw-2024-6-1', nameVI: 'Ký ức 4★ Xavier: Succumb', nameEN: '4-Star Memory: Succumb', rarity: '4-Star' },
      { id: 'rw-2024-6-2', nameVI: 'Vé Ước Nguyện Giới Hạn', nameEN: 'Deepspace Wish: Limited', rarity: 'Item', amount: 'x12' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-7',
    yearGroup: '2024',
    date: '20/03/2024 - 03/04/2024',
    typeVI: 'Quà Tặng Chân Thành',
    typeEN: 'Heartfelt Gift',
    categoryKey: 'welfare',
    titleVI: 'Dư Vị Đặc Biệt',
    titleEN: 'Unique Aftertaste',
    summaryVI:
      'Sự kiện Quà Tặng Chân Thành (Heartfelt Gift) đăng nhập tích lũy nhận hoàn toàn miễn phí ký ức 5 sao Xavier: Unique Aftertaste cùng lượng lớn Kim Cương Đỏ.',
    summaryEN:
      'Heartfelt Gift check-in welfare event granting the 5-Star Memory Xavier: Unique Aftertaste and generous Diamonds completely for free.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-7_17dbb66c.webp',
    fallbackGradient: 'from-[#2c223e] via-[#161124] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Vào bếp cùng Xavier thử công thức mới',
    featuredMemory: 'Xavier 5★: Unique Aftertaste (Miễn phí)',
    rewards: [
      { id: 'rw-2024-7-1', nameVI: 'Ký ức 5★ Xavier: Unique Aftertaste', nameEN: '5-Star Memory: Unique Aftertaste', rarity: '5-Star' },
      { id: 'rw-2024-7-2', nameVI: 'Kim Cương Đỏ Phúc Lợi', nameEN: 'Welfare Red Diamonds', rarity: 'Item', amount: 'x2.000' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-8',
    yearGroup: '2024',
    date: '08/04/2024',
    typeVI: 'Cốt truyện chính & Ngầm',
    typeEN: 'Story Update',
    categoryKey: 'story',
    titleVI: 'Thế Giới Ngầm · Biên Niên Sử Philos',
    titleEN: 'World Underneath',
    summaryVI:
      'Cập nhật chương Biên Niên Sử Ngầm (World Underneath), lật mở những hồ sơ mật về hành tinh Philos, phi đội Backtrackers và lời thề thầm lặng xuyên thế kỷ của Xavier.',
    summaryEN:
      'World Underneath lore update uncovering classified records about planet Philos, the Backtrackers, and Xavier’s silent centuries-long vigil.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-8_dfe7485c.webp',
    fallbackGradient: 'from-[#18223d] via-[#0e1326] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Giải mã hồ sơ mật phi đội Backtrackers',
    rewards: [
      { id: 'rw-2024-8-1', nameVI: 'Hồ Sơ Mật Hành Tinh Philos', nameEN: 'Classified Philos Dossier', rarity: 'Item' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-9',
    yearGroup: '2024',
    date: '19/04/2024 - 29/04/2024',
    typeVI: 'Ước Nguyện Đơn (SOLO)',
    typeEN: 'Solo Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Xúc Cảm Mơ Hồ',
    titleEN: 'Faint Sensation',
    summaryVI:
      'Hồ Ước Nguyện Giới Hạn độc quyền của Xavier với ký ức 5 sao Faint Sensation, khắc họa những rung cảm tinh tế, gần gũi và sâu lắng.',
    summaryEN:
      'Xavier’s solo Limited Wish Pool featuring the 5-Star Memory Faint Sensation, portraying delicate and heartfelt close encounters.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-9_ff88a4b0.webp',
    fallbackGradient: 'from-[#2e1c3f] via-[#170e25] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Đồng điệu nhịp tim qua từng bước nhảy ánh sao',
    featuredMemory: 'Xavier 5★: Faint Sensation',
    rewards: [
      { id: 'rw-2024-9-1', nameVI: 'Ký ức 5★ Xavier: Faint Sensation', nameEN: '5-Star Memory: Faint Sensation', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },
  {
    id: '2024-10',
    yearGroup: '2024',
    date: '26/04/2024 - 10/05/2024',
    typeVI: 'Sự kiện Phúc Lợi',
    typeEN: 'Welfare Event',
    categoryKey: 'welfare',
    titleVI: 'Nhịp Điệu Thường Ngày',
    titleEN: 'Heartwork Routine',
    summaryVI:
      'Sự kiện phúc lợi hoàn thành nhiệm vụ hàng ngày để nhận miễn phí ký ức 4 sao của Xavier, phụ kiện Photo Studio và nhiều vật phẩm bồi dưỡng.',
    summaryEN:
      'Welfare event where completing daily tasks rewards a free 4-Star Xavier Memory, Photo Studio props, and generous upgrade supplies.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2024-10_7072fee6.webp',
    fallbackGradient: 'from-[#26213d] via-[#131022] to-[#07060f]',
    pairedMinigameId: 'midnight-claw',
    pairedMinigameNoteVI: 'Chơi Gắp Thú Lúc Nửa Đêm nhận phụ kiện kỷ niệm',
    featuredMemory: 'Xavier 4★: Heartwork Routine',
    rewards: [
      { id: 'rw-2024-10-1', nameVI: 'Ký ức 4★ Xavier Phúc Lợi', nameEN: 'Welfare 4-Star Xavier Memory', rarity: '4-Star' },
      { id: 'rw-2024-10-2', nameVI: 'Đạo Cụ Chụp Ảnh Photo Studio', nameEN: 'Photo Studio Sticker & Prop Set', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2024',
  },

  // ================= 2025 =================
  {
    id: '2025-0',
    yearGroup: '2025',
    date: '31/12/2024 - 19/01/2025',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Anniversary Multi Wish',
    categoryKey: 'wish',
    titleVI: 'Điểm Hẹn Đêm Khuya',
    titleEN: 'Nightly Rendezvous',
    summaryVI:
      'Đại sự kiện Ước Nguyện Giới Hạn mở màn kỷ niệm 1 năm ra mắt với chuỗi ký ức 5 sao nồng nhiệt và quyến rũ, bao gồm ký ức giới hạn Xavier: Misty Silhouette.',
    summaryEN:
      '1st Anniversary Limited Wish Pool showcasing passionate 5-Star Memories, featuring the limited Memory Xavier: Misty Silhouette.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2025-0_059a465e.webp',
    fallbackGradient: 'from-[#361944] via-[#1b0d26] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Khôi phục tần số ký ức kỷ niệm 1 năm',
    featuredMemory: 'Xavier 5★: Misty Silhouette',
    rewards: [
      { id: 'rw-2025-0-1', nameVI: 'Ký ức 5★ Xavier: Misty Silhouette', nameEN: '5-Star Memory: Misty Silhouette', rarity: '5-Star' },
      { id: 'rw-2025-0-2', nameVI: 'Trang Phục Kỷ Niệm Misty Silhouette', nameEN: 'Special Outfit: Misty Silhouette', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2025',
  },
  {
    id: '2025-1',
    yearGroup: '2025',
    date: '31/12/2024 - 19/01/2025',
    typeVI: 'Sự Kiện Kỷ Niệm',
    typeEN: 'Anniversary Festival',
    categoryKey: 'special',
    titleVI: 'Hành Trình Yêu Thương',
    titleEN: 'Touring In Love',
    summaryVI:
      'Sự kiện lễ hội kỷ niệm đặc biệt Touring In Love với hành trình du ngoạn Chibi, cốt truyện kỷ niệm ngọt ngào và cửa hàng phúc lợi đổi miễn phí ký ức 4 sao cùng nhiều vật phẩm giới hạn.',
    summaryEN:
      'Special Anniversary festival event Touring In Love featuring Chibi travel adventures, commemorative stories, and an event shop with free 4-Star Memories and limited rewards.',
    bannerImg: GENERATED_IMAGES.touringInLove,
    fallbackGradient: 'from-[#321f46] via-[#181029] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Trông coi Tiệm Bánh Thỏ Trắng mùa lễ hội kỷ niệm',
    rewards: [
      { id: 'rw-2025-1-1', nameVI: 'Vé Ước Nguyện Giới Hạn Kỷ Niệm', nameEN: 'Anniversary Limited Wishes', rarity: 'Item', amount: 'x20' },
      { id: 'rw-2025-1-2', nameVI: 'Khung Hồ Sơ & Huy Hiệu Touring In Love', nameEN: 'Touring In Love Frame & Badge', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2025',
  },
  {
    id: '2025-2',
    yearGroup: '2025',
    date: '31/12/2024 - 19/01/2025',
    typeVI: 'Phúc Lợi Kỷ Niệm',
    typeEN: 'Anniversary Welfare',
    categoryKey: 'welfare',
    titleVI: 'Hội Chứng Tương Tư',
    titleEN: 'Love Syndrome',
    summaryVI:
      'Ký ức 4 sao phúc lợi Xavier: Love Syndrome nhận miễn phí trong sự kiện kỷ niệm Touring In Love — khoảnh khắc bình yên khi cùng anh tựa đầu chìm vào giấc ngủ ấm áp.',
    summaryEN:
      'Free welfare 4-Star Memory Xavier: Love Syndrome obtainable during the Touring In Love event — a tender, cozy moment dozing off together side by side.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2025-2_df0a0e0f.webp',
    fallbackGradient: 'from-[#1f2944] via-[#111628] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Pha trà hoa cúc ấm áp cho giấc ngủ trưa bình yên',
    featuredMemory: 'Xavier 4★: Love Syndrome (Miễn phí)',
    rewards: [
      { id: 'rw-2025-2-1', nameVI: 'Ký ức 4★ Xavier: Love Syndrome', nameEN: '4-Star Memory: Love Syndrome', rarity: '4-Star' },
      { id: 'rw-2025-2-2', nameVI: 'Kim Cương Đỏ Lễ Hội', nameEN: 'Festival Red Diamonds', rarity: 'Item', amount: 'x1.500' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2025',
  },

  // ================= 2026 =================
  {
    id: '2026-0',
    yearGroup: '2026',
    date: '18/12/2025 - 02/01/2026',
    typeVI: 'Quà Tặng Chân Thành',
    typeEN: 'Heartfelt Gift',
    categoryKey: 'welfare',
    titleVI: 'Khoảnh Khắc Trân Quý',
    titleEN: 'Precious Moment',
    summaryVI:
      'Sự kiện phúc lợi Quà Tặng Chân Thành (Heartfelt Gift) mở đầu mùa lễ hội cuối năm, đăng nhập nhận miễn phí ký ức 5 sao Xavier: Precious Moment cùng nhiều phần thưởng kỷ niệm.',
    summaryEN:
      'Year-end Heartfelt Gift welfare event where logging in grants the free 5-Star Memory Xavier: Precious Moment alongside festive rewards.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-0_2827aa15.webp',
    fallbackGradient: 'from-[#2f2342] via-[#171124] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Chuẩn bị bàn tiệc ấm cúng mùa cuối năm',
    featuredMemory: 'Xavier 5★: Precious Moment (Miễn phí)',
    rewards: [
      { id: 'rw-2026-0-1', nameVI: 'Ký ức 5★ Xavier: Precious Moment', nameEN: '5-Star Memory: Precious Moment', rarity: '5-Star' },
      { id: 'rw-2026-0-2', nameVI: 'Kim Cương Đỏ Điểm Danh', nameEN: 'Check-in Red Diamonds', rarity: 'Item', amount: 'x2.000' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-1',
    yearGroup: '2026',
    date: '31/12/2025 - 21/01/2026',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Anniversary Multi Wish',
    categoryKey: 'wish',
    titleVI: 'Ngai Thần Tình Ái',
    titleEN: 'Throne of Eros',
    summaryVI:
      'Đại sự kiện Ước Nguyện Giới Hạn kỷ niệm mở màn năm mới với chuỗi ký ức 5 sao chủ đề thần thoại hoàng gia đầy quyến rũ và tráng lệ.',
    summaryEN:
      'Grand New Year Anniversary Limited Wish Pool featuring majestic 5-Star Memories inspired by royal mythology and timeless devotion.',
    bannerImg: GENERATED_IMAGES.throneOfEros,
    fallbackGradient: 'from-[#281b4a] via-[#150e2b] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Giải mã ấn ký Thần Thoại Tinh Hà',
    featuredMemory: 'Xavier 5★: Throne of Eros',
    rewards: [
      { id: 'rw-2026-1-1', nameVI: 'Ký ức 5★ Xavier: Throne of Eros', nameEN: '5-Star Memory: Throne of Eros', rarity: '5-Star' },
      { id: 'rw-2026-1-2', nameVI: 'Lễ Phục Hoàng Gia Philos', nameEN: 'Royal Philos Regalia', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-2',
    yearGroup: '2026',
    date: '31/12/2025 - 21/01/2026',
    typeVI: 'Hợp Tác Văn Hóa',
    typeEN: 'Heritage Collaboration',
    categoryKey: 'collab',
    titleVI: 'Hình Tượng Thi Ca',
    titleEN: 'Poetic Figures',
    summaryVI:
      'Sự kiện hợp tác di sản văn hóa phi vật thể, khắc họa hình ảnh Xavier và bạn qua những tác phẩm nghệ thuật cắt giấy thủ công tinh xảo.',
    summaryEN:
      'Intangible cultural heritage collaboration celebrating traditional papercutting artistry, immortalizing tender moments with Xavier.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-2_546c08f6.webp',
    fallbackGradient: 'from-[#341a3a] via-[#190d22] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Ghép đôi họa tiết cắt giấy truyền thống',
    rewards: [
      { id: 'rw-2026-2-1', nameVI: 'Tranh Cắt Giấy Kỷ Niệm Xavier', nameEN: 'Xavier Papercut Keepsake', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-3',
    yearGroup: '2026',
    date: '31/12/2025 - 21/01/2026',
    typeVI: 'Sự Kiện & Minigame',
    typeEN: 'Exploration & Minigame Event',
    categoryKey: 'special',
    titleVI: 'Ảo Cảnh Giao Thoa',
    titleEN: 'Illusia Locus',
    summaryVI:
      'Sự kiện khám phá không gian ảo ảnh đặc biệt đi kèm chuỗi minigame tương tác, cốt truyện lễ hội và cửa hàng quy đổi vật phẩm giới hạn.',
    summaryEN:
      'Special illusion-realm exploration event featuring festive storylines, interactive minigames, and a limited-time exchange shop.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-3_8e530349.webp',
    fallbackGradient: 'from-[#291e48] via-[#150f29] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Minigame chính thức: Mật Mã Tinh Hà Philos',
    rewards: [
      { id: 'rw-2026-3-1', nameVI: 'Kim Cương Đỏ Ảo Cảnh', nameEN: 'Illusia Red Diamonds', rarity: 'Item', amount: 'x1.200' },
      { id: 'rw-2026-3-2', nameVI: 'Huy Hiệu Ảo Cảnh Giao Thoa', nameEN: 'Illusia Locus Emblem', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-4',
    yearGroup: '2026',
    date: '31/12/2025 - 27/02/2026',
    typeVI: 'Khế Ước Bí Mật',
    typeEN: 'Secret Promise',
    categoryKey: 'welfare',
    titleVI: 'Vòng Tay Ánh Lửa',
    titleEN: 'Firelit Embrace',
    summaryVI:
      'Mùa Khế Ước Bí Mật (Secret Promise) đầu năm 2026 với ký ức 4 sao giới hạn Xavier: Firelit Embrace — hơi ấm dịu dàng sưởi ấm đêm đông.',
    summaryEN:
      'Early 2026 Secret Promise season featuring the exclusive 4-Star Memory Xavier: Firelit Embrace — a cozy, firelit winter embrace.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-4_6f8aaeac.webp',
    fallbackGradient: 'from-[#301e38] via-[#170f22] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Giữ lửa lò sưởi và thưởng thức bánh nướng đêm đông',
    featuredMemory: 'Xavier 4★: Firelit Embrace',
    rewards: [
      { id: 'rw-2026-4-1', nameVI: 'Ký ức 4★ Xavier: Firelit Embrace', nameEN: '4-Star Memory: Firelit Embrace', rarity: '4-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-5',
    yearGroup: '2026',
    date: '02/01/2026',
    typeVI: 'Cốt Truyện Chính',
    typeEN: 'Main Story Update',
    categoryKey: 'story',
    titleVI: 'Gửi Ngày Hôm Qua Của Chúng Ta',
    titleEN: 'To Our Yesterday',
    summaryVI:
      'Cập nhật chương cốt truyện chính mới đầy kịch tính, hé lộ những nút thắt quan trọng nối liền quá khứ xa xôi và thực tại tại Thành phố Linkon.',
    summaryEN:
      'Major Main Story update unveiling pivotal revelations that bridge forgotten yesterdays with the unfolding present in Linkon City.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-5_10de9061.webp',
    fallbackGradient: 'from-[#221a42] via-[#120d26] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Bảo vệ trạm trung chuyển Linkon trong chương mới',
    rewards: [
      { id: 'rw-2026-5-1', nameVI: 'Ký ức Cốt Truyện Chính Chương Mới', nameEN: 'Main Story Chapter Archive', rarity: 'Item' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-6',
    yearGroup: '2026',
    date: '10/02/2026 - 27/02/2026',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Multi Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Sự Dịu Dàng Nơi Trần Thế',
    titleEN: "Mortality's Tenderness",
    summaryVI:
      'Sự kiện Ước Nguyện Giới Hạn mùa Lễ Tình Nhân và Tết Nguyên Đán, tôn vinh những rung động dịu dàng và sợi dây gắn kết vượt qua năm tháng.',
    summaryEN:
      'Valentine and Lunar New Year Limited Wish Pool celebrating tender mortal warmth and bonds that transcend eternity.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-6_5a9eaaf3.webp',
    fallbackGradient: 'from-[#361d3e] via-[#1a0e24] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Làm bánh ngọt đầu xuân trao gửi người thương',
    featuredMemory: "Xavier 5★: Mortality's Tenderness",
    rewards: [
      { id: 'rw-2026-6-1', nameVI: "Ký ức 5★ Xavier: Mortality's Tenderness", nameEN: "5-Star Memory: Mortality's Tenderness", rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-7',
    yearGroup: '2026',
    date: '10/02/2026 - 27/02/2026',
    typeVI: 'Sự Kiện Phúc Lợi',
    typeEN: 'Spring Welfare Event',
    categoryKey: 'welfare',
    titleVI: 'Lộc Xuân Tràn Đầy',
    titleEN: 'Wealth Overflow',
    summaryVI:
      'Sự kiện phúc lợi đầu xuân với tạo hình Chibi đáng yêu, tặng Kim Cương Đỏ, trang phục lễ hội và phụ kiện trang trí đặc sắc.',
    summaryEN:
      'Festive spring welfare event with adorable Chibi adventures, rewarding generous Diamonds, holiday outfits, and decorative keepsakes.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-7_cf4d624c.webp',
    fallbackGradient: 'from-[#33223a] via-[#181022] to-[#07060f]',
    pairedMinigameId: 'midnight-claw',
    pairedMinigameNoteVI: 'Gắp thú bông Chibi đón lộc đầu xuân',
    rewards: [
      { id: 'rw-2026-7-1', nameVI: 'Kim Cương Đỏ Mừng Xuân', nameEN: 'Lunar New Year Red Diamonds', rarity: 'Item', amount: 'x1.500' },
      { id: 'rw-2026-7-2', nameVI: 'Trang Phục Lễ Hội Đầu Xuân', nameEN: 'Spring Festival Outfit', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-8',
    yearGroup: '2026',
    date: '09/03/2026 - 18/03/2026',
    typeVI: 'Ước Nguyện Đơn (SOLO)',
    typeEN: 'Solo Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Phút Giây Bình Yên',
    titleEN: 'Tranquil Moments',
    summaryVI:
      'Hồ Ước Nguyện Giới Hạn độc quyền của Xavier mang đến ký ức 5 sao Tranquil Moments — khoảng lặng bình yên và ngọt ngào giữa đời thường.',
    summaryEN:
      'Xavier’s solo Limited Wish Pool debuting the 5-Star Memory Tranquil Moments — a serene, heartwarming slice of everyday bliss.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-8_cb087df8.webp',
    fallbackGradient: 'from-[#282146] via-[#141028] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Thưởng trà chiều bình yên cùng Xavier',
    featuredMemory: 'Xavier 5★: Tranquil Moments',
    rewards: [
      { id: 'rw-2026-8-1', nameVI: 'Ký ức 5★ Xavier: Tranquil Moments', nameEN: '5-Star Memory: Tranquil Moments', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-9',
    yearGroup: '2026',
    date: '09/03/2026 - 18/03/2026',
    typeVI: 'Sự Kiện Lễ Hội',
    typeEN: 'Ceremony Event',
    categoryKey: 'special',
    titleVI: 'Sưởi Ấm Tâm Hồn',
    titleEN: 'Warming Solace Ceremony',
    summaryVI:
      'Sự kiện lễ hội lâu đài cổ tích rực rỡ pháo hoa cùng Bunbun và Xavier Chibi, mở khóa nhiều phần thưởng kỷ niệm và nội thất dễ thương.',
    summaryEN:
      'Fairytale castle ceremony under sparkling fireworks with Chibi Xavier and Bunbun, unlocking commemorative rewards and cozy decor.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-9_b3292cd3.webp',
    fallbackGradient: 'from-[#2d2044] via-[#161026] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Cùng Bunbun & Xavier Chibi dạo bước lâu đài pháo hoa',
    rewards: [
      { id: 'rw-2026-9-1', nameVI: 'Bộ Nội Thất Lâu Đài Ánh Sao', nameEN: 'Starlight Castle Decor Set', rarity: 'Item' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-10',
    yearGroup: '2026',
    date: '21/04/2026 - 29/04/2026',
    typeVI: 'Sự Kiện Minigame',
    typeEN: 'Minigame Welfare Event',
    categoryKey: 'welfare',
    titleVI: 'Bước Nhảy Tí Tách',
    titleEN: 'Tiptap Hop',
    summaryVI:
      'Sự kiện phúc lợi minigame vui nhộn tặng 1.000 Kim Cương Đỏ, thiết kế nội thất [Good Meowning] và bộ sưu tập huy hiệu Chibi đáng yêu.',
    summaryEN:
      'Playful welfare minigame event rewarding 1,000 Diamonds, the [Good Meowning] furniture design, and collectible Chibi badges.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-10_8b88cb28.webp',
    fallbackGradient: 'from-[#1f2948] via-[#11162b] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Minigame chính thức: Bước Nhảy Tí Tách (Tiptap Hop)',
    rewards: [
      { id: 'rw-2026-10-1', nameVI: 'Kim Cương Đỏ Sự Kiện', nameEN: 'Event Red Diamonds', rarity: 'Item', amount: 'x1.000' },
      { id: 'rw-2026-10-2', nameVI: 'Thiết Kế Nội Thất [Good Meowning]', nameEN: '[Good Meowning] Furniture Blueprint', rarity: 'Item' },
      { id: 'rw-2026-10-3', nameVI: 'Bộ Huy Hiệu Chibi Tiptap Hop', nameEN: 'Tiptap Hop Chibi Badge Set', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-11',
    yearGroup: '2026',
    date: '20/04/2026',
    typeVI: 'Biên Niên Sử Ngầm',
    typeEN: 'World Underneath',
    categoryKey: 'story',
    titleVI: 'Thế Giới Ngầm (Chương 25–30)',
    titleEN: 'World Underneath Chapters 25–30',
    summaryVI:
      'Cập nhật các chương Biên Niên Sử Ngầm (World Underneath) mới từ Chương 25 đến 30: Light into Dust, Good Night Frostmere, và Fairnight’s Edge.',
    summaryEN:
      'New World Underneath lore chapters (25–30) including Light into Dust, Good Night Frostmere, and Fairnight’s Edge.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-11_c7e46c0d.webp',
    fallbackGradient: 'from-[#231b42] via-[#120e25] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Giải mã hồ sơ Light into Dust & Fairnight’s Edge',
    rewards: [
      { id: 'rw-2026-11-1', nameVI: 'Chương Biên Niên Sử 25–30', nameEN: 'Lore Chapters 25–30 Archive', rarity: 'Item' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-12',
    yearGroup: '2026',
    date: '30/04/2026 - 15/05/2026',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Multi Limited Wish',
    categoryKey: 'wish',
    titleVI: 'Khát Khao Vương Vấn',
    titleEN: 'Lingering Lust',
    summaryVI:
      'Sự kiện Ước Nguyện Giới Hạn quy tụ loạt ký ức 5 sao với bầu không khí lãng mạn, nồng nhiệt và đầy cuốn hút.',
    summaryEN:
      'Limited Wish Pool event showcasing captivating 5-Star Memories steeped in passionate, unforgettable romance.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-12_b1d866b0.webp',
    fallbackGradient: 'from-[#341a40] via-[#190d24] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Đồng bộ ấn ký cảm xúc đêm hội',
    featuredMemory: 'Xavier 5★: Lingering Lust',
    rewards: [
      { id: 'rw-2026-12-1', nameVI: 'Ký ức 5★ Giới Hạn Mùa Hè', nameEN: 'Limited 5-Star Memory', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-13',
    yearGroup: '2026',
    date: '31/05/2026 - 18/06/2026',
    typeVI: '10 Ngày Bên Nhau',
    typeEN: '10 Days With You',
    categoryKey: 'welfare',
    titleVI: 'Trau Chuốt Tháng Năm',
    titleEN: 'Moments Refined',
    summaryVI:
      'Sự kiện điểm danh 10 Days With You nhận miễn phí ký ức 4 sao của Xavier: Moments Refined — buổi chiều nắng ấm cùng anh tỉ mỉ sửa chữa chiếc loa cổ điển.',
    summaryEN:
      '10 Days With You check-in event granting the free 4-Star Memory Xavier: Moments Refined — a sunlit afternoon tinkering with a vintage speaker together.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-13_127448c1.webp',
    fallbackGradient: 'from-[#2c223c] via-[#161122] to-[#07060f]',
    pairedMinigameId: 'midnight-claw',
    pairedMinigameNoteVI: 'Sưu tầm kỷ vật buổi chiều nắng ấm',
    featuredMemory: 'Xavier 4★: Moments Refined (Miễn phí)',
    rewards: [
      { id: 'rw-2026-13-1', nameVI: 'Ký ức 4★ Xavier: Moments Refined', nameEN: '4-Star Memory: Moments Refined', rarity: '4-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-14',
    yearGroup: '2026',
    date: '17/06/2026 - 02/07/2026',
    typeVI: 'Liên Hoan Điện Ảnh (MULTI)',
    typeEN: 'Film Festival Multi Wish',
    categoryKey: 'wish',
    titleVI: 'Thuở Ấy Qua Từng Khung Hình',
    titleEN: 'Once Upon A Frame',
    summaryVI:
      'Sự kiện Ước Nguyện Giới Hạn chủ đề điện ảnh cổ điển (Deepspace First Film Festival), nơi Xavier hóa thân trong bộ phim lãng mạn "Runaway Hearts".',
    summaryEN:
      'Cinematic Limited Wish Pool (Deepspace First Film Festival) where Xavier stars in the classic romantic feature "Runaway Hearts".',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-14_94413d6b.webp',
    fallbackGradient: 'from-[#301e44] via-[#170f26] to-[#07060f]',
    pairedMinigameId: 'tiptap-hop',
    pairedMinigameNoteVI: 'Bước qua từng thước phim cổ điển Runaway Hearts',
    featuredMemory: 'Xavier 5★: Runaway Hearts',
    rewards: [
      { id: 'rw-2026-14-1', nameVI: 'Ký ức 5★ Xavier: Runaway Hearts', nameEN: '5-Star Memory: Runaway Hearts', rarity: '5-Star' },
      { id: 'rw-2026-14-2', nameVI: 'Cuộn Phim Kỷ Niệm Liên Hoan', nameEN: 'Festival Commemorative Reel', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-15',
    yearGroup: '2026',
    date: '17/09/2026 - 01/10/2026',
    typeVI: 'Hợp Tác Văn Hóa',
    typeEN: 'Craft Collaboration',
    categoryKey: 'collab',
    titleVI: 'Túi Gấm Đơm Hương',
    titleEN: 'A Scented Sachet',
    summaryVI:
      'Sự kiện hợp tác văn hóa truyền thống chế tác túi thơm thêu tay, gửi gắm lời chúc bình an và tình cảm gắn bó dài lâu bên Xavier.',
    summaryEN:
      'Traditional cultural craft collaboration centered on hand-embroidered scented sachets, carrying timeless blessings and enduring affection.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-15_0e1c69bf.webp',
    fallbackGradient: 'from-[#1e2a42] via-[#101626] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Ướp hương hoa cúc và thảo mộc truyền thống',
    rewards: [
      { id: 'rw-2026-15-1', nameVI: 'Vật Phẩm Túi Gấm Thêu Tay Ánh Sao', nameEN: 'Embroidered Starlight Sachet', rarity: 'Badge' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-16',
    yearGroup: '2026',
    date: '22/09/2026 - 10/10/2026',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Autumn Multi Wish',
    categoryKey: 'wish',
    titleVI: 'Đêm Bất Tận',
    titleEN: 'A Night That Never Ends',
    summaryVI:
      'Sự kiện Ước Nguyện Giới Hạn mùa thu với những ký ức 5 sao huyền ảo trong màn đêm bất tận giữa ánh trăng và tinh tú.',
    summaryEN:
      'Autumn Limited Wish Pool featuring enchanting 5-Star Memories set within a starlit, never-ending night.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-16_1338705f.webp',
    fallbackGradient: 'from-[#2a1f48] via-[#151029] to-[#07060f]',
    pairedMinigameId: 'philos-cipher',
    pairedMinigameNoteVI: 'Kết nối chòm sao trong màn đêm bất tận',
    featuredMemory: 'Xavier 5★: A Night That Never Ends',
    rewards: [
      { id: 'rw-2026-16-1', nameVI: 'Ký ức 5★ Mùa Thu Giới Hạn', nameEN: 'Autumn Limited 5-Star Memory', rarity: '5-Star' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-17',
    yearGroup: '2026',
    date: '11/10/2026 - 18/10/2026',
    typeVI: 'Sinh Nhật Xavier (16/10)',
    typeEN: 'Xavier Birthday Event',
    categoryKey: 'special',
    titleVI: 'Vệt Sáng Vấn Vương',
    titleEN: 'Lingering Light',
    summaryVI:
      'Sự kiện đặc biệt mừng sinh nhật Xavier (16/10) với ký ức 5 sao giới hạn Lingering Light, cốt truyện hẹn hò sinh nhật và không gian trang trí ngập tràn ánh sao.',
    summaryEN:
      'Xavier’s special Birthday Celebration event (October 16) featuring the limited 5-Star Memory Lingering Light, birthday date storyline, and starlight festivities.',
    bannerImg: GENERATED_IMAGES.lingeringLight,
    fallbackGradient: 'from-[#33224c] via-[#19112b] to-[#07060f]',
    pairedMinigameId: 'starlight-bakery',
    pairedMinigameNoteVI: 'Nướng bánh kem sinh nhật 16/10 tặng Xavier',
    featuredMemory: 'Xavier 5★: Lingering Light (Birthday)',
    rewards: [
      { id: 'rw-2026-17-1', nameVI: 'Ký ức 5★ Sinh Nhật: Lingering Light', nameEN: 'Birthday 5-Star: Lingering Light', rarity: '5-Star' },
      { id: 'rw-2026-17-2', nameVI: 'Trang Phục Sinh Nhật 16/10 & Danh Hiệu', nameEN: 'Birthday Outfit & Exclusive Title', rarity: 'Outfit' },
      { id: 'rw-2026-17-3', nameVI: 'Vé Ước Nguyện Giới Hạn Mừng Sinh Nhật', nameEN: 'Birthday Deepspace Wishes', rarity: 'Item', amount: 'x20' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
  {
    id: '2026-18',
    yearGroup: '2026',
    date: '19/10/2026 - 05/11/2026',
    typeVI: 'Hợp Tác Đặc Biệt',
    typeEN: 'Special Crossover Collaboration',
    categoryKey: 'collab',
    titleVI: 'Tình Là Thật · Blade Runner 2049',
    titleEN: 'Love Is Real',
    summaryVI:
      'Sự kiện hợp tác bom tấn giữa Love and Deepspace và tuyệt tác Cyberpunk Blade Runner 2049 với thông điệp "Love is real. All for you." giữa ánh đèn neon tím rực rỡ.',
    summaryEN:
      'Blockbuster crossover collaboration between Love and Deepspace and the sci-fi masterpiece Blade Runner 2049 — "Love is real. All for you." bathed in neon cyberpunk light.',
    bannerImg: GENERATED_IMAGES.loveIsRealCyber,
    fallbackGradient: 'from-[#1e2b4d] via-[#12162c] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Minigame tâm điểm: Lưỡi Kiếm Ánh Sáng · Tần Số 2049',
    featuredMemory: 'Xavier: Love Is Real · 2049',
    rewards: [
      { id: 'rw-2026-18-1', nameVI: 'Ấn Phẩm Kỷ Niệm [Love Is Real · 2049]', nameEN: '[Love Is Real] Crossover Keepsake', rarity: 'Badge' },
      { id: 'rw-2026-18-2', nameVI: 'Khung Hình Cyberpunk 2049', nameEN: 'Cyberpunk 2049 Photo Frame', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026/2026-18',
  },
  {
    id: '2026-20',
    yearGroup: '2026',
    date: '11/2026',
    typeVI: 'Ước Nguyện Đa (MULTI)',
    typeEN: 'Cyberpunk Multi Wish',
    categoryKey: 'wish',
    titleVI: 'Tái Sinh Ước Mộng',
    titleEN: 'Rebooting Dreams',
    summaryVI:
      'Đại sự kiện Ước Nguyện Giới Hạn chủ đề Cyberpunk viễn tưởng, nơi Xavier xuất hiện trong tạo hình chiến thuật tương lai sắc lạnh giữa thế giới công nghệ tái sinh.',
    summaryEN:
      'Futuristic Cyberpunk Limited Wish Pool featuring Xavier in a sleek cyber-tactical persona amidst a world of rebooted dreams.',
    bannerImg: 'https://shenxinghui.vercel.app/assets/aistudio/2026-20_df313ead.webp',
    fallbackGradient: 'from-[#321a4a] via-[#170d28] to-[#07060f]',
    pairedMinigameId: 'lightblade-defense',
    pairedMinigameNoteVI: 'Chiến dịch phòng tuyến Cyberpunk Rebooting Dreams',
    featuredMemory: 'Xavier 5★: Rebooting Dreams',
    rewards: [
      { id: 'rw-2026-20-1', nameVI: 'Ký ức 5★ Xavier: Rebooting Dreams', nameEN: '5-Star Memory: Rebooting Dreams', rarity: '5-Star' },
      { id: 'rw-2026-20-2', nameVI: 'Giáp Chiến Thuật Cyber-Light', nameEN: 'Cyber-Light Tactical Suit', rarity: 'Outfit' },
    ],
    mainFanwebPath: 'https://shenxinghui.vercel.app/#events/2026',
  },
];
