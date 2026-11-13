export type AppLang = 'VI' | 'EN';

export interface RobotTouchI18nStrings {
  // Breadcrumb & Navigation
  crumbGallery: string;
  crumbFangame: string;
  crumbRobotTouch: string;
  backToFangame: string;
  backToGlitchtopia: string;

  // Fangame Gallery (#gallery/fangame)
  galleryBadge: string;
  galleryTitle: string;
  galleryDesc: string;
  cardTag: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDesc: string;
  cardMetaTime: string;
  cardMetaScore: string;
  cardPlayCta: string;
  glitchtopiaCardTag: string;
  glitchtopiaCardTitle: string;
  glitchtopiaCardDesc: string;
  glitchtopiaCardCta: string;

  // Page Frame Header (#gallery/fangame/robot-touch)
  pageTitle: string;
  pageSubtitle: string;

  // In-Canvas Strings (passed into robotTouch.ts)
  canvasTitle: string;
  canvasRuleLine1: string;
  canvasRuleLine2: string;
  canvasTapToStart: string;
  canvasTimeUp: string;
  canvasHudScorePrefix: string;
  canvasPointsLabel: string;
  canvasOverScorePrefix: string;
  canvasBestPrefix: string;
  canvasTapToRetry: string;

  // 0-Star Retreat (Lose) Overlay
  retreatTitle: string;
  retreatDebugCode: string;
  retreatPointsLabel: string;
  retreatStarRatingLabel: string;
  retreatChibiLine: string;
  retreatExitBtn: string;
  retreatPlayAgainBtn: string;

  // >=1-Star All Clear (Win) Overlay
  allClearTitle: string;
  allClearChibiLine: string;

  // Tactical Skill Buttons
  skillAoeSlow: string;
  skillFullSweep: string;
}

export const ROBOT_TOUCH_I18N: Record<AppLang, RobotTouchI18nStrings> = {
  VI: {
    crumbGallery: 'TRIỂN LÃM',
    crumbFangame: 'FANGAME',
    crumbRobotTouch: 'ROBOT TOUCH',
    backToFangame: 'Về danh sách Fangame',
    backToGlitchtopia: 'Về sảnh Glitchtopia',

    galleryBadge: 'TRIỂN LÃM // NHÁNH FANGAME',
    galleryTitle: 'Góc Trò Chơi & Minigame Sự Kiện',
    galleryDesc:
      ' Tuyển tập minigame tương tác lấy cảm hứng từ các sự kiện của Thẩm Tinh Hồi (Xavier). Tối ưu cho thao tác cảm ứng trên điện thoại.',
    cardTag: 'FANGAME · CẢM ỨNG NÉT VẼ',
    cardTitle: 'Robot Touch',
    cardSubtitle: 'Phòng Tuyến Đường Phố · Khắc Ký Tự Ánh Sáng',
    cardDesc:
      'Vẽ nhanh ký tự xuất hiện trên thân robot vào khung DRAW AREA trong 01:30. Ưu tiên tiêu diệt robot mang huy hiệu +5s để kéo dài thời gian và chinh phục mốc 3 sao (105,000 điểm).',
    cardMetaTime: 'Thời lượng: 01:30 (+5s)',
    cardMetaScore: 'Mốc 3★: 105,000 điểm',
    cardPlayCta: 'Vào chơi Robot Touch',
    glitchtopiaCardTag: 'SỰ KIỆN TƯƠNG TÁC',
    glitchtopiaCardTitle: 'Glitchtopia — Sảnh Sự Kiện & Restore Clinic',
    glitchtopiaCardDesc:
      'Khám phá căn phòng Glitchtopia, bảng nhật ký bảo trì Care Log, phòng hồi phục Restore Clinic và Memory Terminal.',
    glitchtopiaCardCta: 'Mở sảnh Glitchtopia',

    pageTitle: 'ROBOT TOUCH',
    pageSubtitle: 'Vẽ ký tự neon trong khung DRAW AREA · Ưu tiên robot +5s',

    canvasTitle: 'ROBOT TOUCH',
    canvasRuleLine1: 'Vẽ ký tự trên robot vào bảng lưới',
    canvasRuleLine2: 'Mỗi robot 200 điểm · robot +5s thêm giờ',
    canvasTapToStart: 'Chạm để bắt đầu',
    canvasTimeUp: 'HẾT GIỜ!',
    canvasHudScorePrefix: 'ĐIỂM ',
    canvasPointsLabel: 'Điểm',
    canvasOverScorePrefix: 'Điểm ',
    canvasBestPrefix: 'Cao nhất ',
    canvasTapToRetry: 'Chạm để chơi lại',

    retreatTitle: 'Retreat',
    retreatDebugCode: 'Debug Code ∞',
    retreatPointsLabel: 'Điểm',
    retreatStarRatingLabel: 'Sao',
    retreatChibiLine: 'Thôi được rồi, đi lấy dung dịch ổn định nào.',
    retreatExitBtn: 'Exit',
    retreatPlayAgainBtn: 'Play Again',

    allClearTitle: 'All Clear',
    allClearChibiLine: 'Chúng bị hai ta bao vây rồi.',

    skillAoeSlow: 'AoE Slow',
    skillFullSweep: 'Full Sweep',
  },
  EN: {
    crumbGallery: 'GALLERY',
    crumbFangame: 'FANGAME',
    crumbRobotTouch: 'ROBOT TOUCH',
    backToFangame: 'Back to Fangames',
    backToGlitchtopia: 'Back to Glitchtopia Hub',

    galleryBadge: 'GALLERY // FANGAME BRANCH',
    galleryTitle: 'Fangame & Event Arcade Exhibition',
    galleryDesc:
      'Interactive fan-made minigames inspired by Xavier’s events. Designed mobile-first for responsive touch drawing.',
    cardTag: 'FANGAME · TOUCH GESTURE',
    cardTitle: 'Robot Touch',
    cardSubtitle: 'Cyber Street Intercept · Neon Glyph Drawing',
    cardDesc:
      'Draw the neon glyph shown on each flying robot inside the DRAW AREA within 01:30. Prioritize +5s bonus robots to extend your timer and reach 3 stars (105,000 pts).',
    cardMetaTime: 'Timer: 01:30 (+5s)',
    cardMetaScore: '3★ Goal: 105,000 pts',
    cardPlayCta: 'Play Robot Touch',
    glitchtopiaCardTag: 'INTERACTIVE EVENT',
    glitchtopiaCardTitle: 'Glitchtopia — Event Hub & Restore Clinic',
    glitchtopiaCardDesc:
      'Explore the Glitchtopia room, Care Log maintenance records, Restore Clinic diagnostics, and Memory Terminal.',
    glitchtopiaCardCta: 'Open Glitchtopia Hub',

    pageTitle: 'ROBOT TOUCH',
    pageSubtitle: 'Draw neon glyphs in the DRAW AREA · Target +5s robots first',

    canvasTitle: 'ROBOT TOUCH',
    canvasRuleLine1: 'Draw the robot glyph inside the grid pad',
    canvasRuleLine2: '200 pts per robot · +5s robots add time',
    canvasTapToStart: 'Tap to start',
    canvasTimeUp: 'TIME UP!',
    canvasHudScorePrefix: 'SCORE ',
    canvasPointsLabel: 'Points',
    canvasOverScorePrefix: 'Score ',
    canvasBestPrefix: 'Best ',
    canvasTapToRetry: 'Tap to play again',

    retreatTitle: 'Retreat',
    retreatDebugCode: 'Debug Code ∞',
    retreatPointsLabel: 'Points',
    retreatStarRatingLabel: 'Star Rating',
    retreatChibiLine: "Well then, let's get a stabilizer.",
    retreatExitBtn: 'Exit',
    retreatPlayAgainBtn: 'Play Again',

    allClearTitle: 'All Clear',
    allClearChibiLine: "They're surrounded by the two of us.",

    skillAoeSlow: 'AoE Slow',
    skillFullSweep: 'Full Sweep',
  },
};
