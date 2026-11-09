import React, { useState } from 'react';
import {
  MINIGAMES_LIST,
  XAVIER_EVENTS_ARCHIVE,
  MinigameId,
} from '../data/eventsData';
import { sound } from '../utils/sound';
import {
  CheckCircle2,
  Lock,
  Sparkles,
  RotateCcw,
  Gamepad2,
} from 'lucide-react';

interface RewardsCabinetSectionProps {
  totalDiamonds: number;
  unlockedKeepsakes: string[];
  collectedRewards: string[];
  highScores: Record<string, number>;
  dailyCheckedIn: boolean;
  onClaimDailyCheckIn: () => void;
  onLaunchMinigame: (id: MinigameId) => void;
  onResetProgress: () => void;
}

export const RewardsCabinetSection: React.FC<RewardsCabinetSectionProps> = ({
  totalDiamonds,
  unlockedKeepsakes,
  collectedRewards,
  highScores,
  dailyCheckedIn,
  onClaimDailyCheckIn,
  onLaunchMinigame,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const allEventRewardsCount = XAVIER_EVENTS_ARCHIVE.reduce(
    (sum, ev) => sum + ev.rewards.length,
    0
  );

  return (
    <section id="rewards" className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#3a2f6b] pb-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            Phòng Trưng Bày Kỷ Vật · Lưu Trữ Trên Trình Duyệt Của Bạn
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#e6e2f5] sm:text-3xl">
            03. Tủ Kỷ Vật Minigame &amp; Sổ Tay Thợ Săn
          </h2>
        </div>

        {/* Daily Starlight Check-in Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={dailyCheckedIn}
            onClick={() => {
              sound.playSuccess();
              onClaimDailyCheckIn();
            }}
            className={`inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-opacity whitespace-nowrap shrink-0 ${
              dailyCheckedIn
                ? 'cursor-default border border-emerald-400/50 bg-emerald-950/20 text-emerald-300'
                : 'bg-[#a964f7] text-[#07060f] hover:opacity-90'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>
              {dailyCheckedIn
                ? 'Đã Điểm Danh Hôm Nay (+150 Kim Cương Đỏ)'
                : 'Điểm Danh Ánh Sao (+150 Kim Cương Đỏ)'}
            </span>
          </button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relay-card p-5 bg-[#0e0b1c]">
          <p className="text-xs text-[#a79fc7]">Kim Cương Đỏ Tích Lũy Từ Minigame</p>
          <p className="mt-2 font-display text-3xl font-bold text-[#cfb1f1] font-mono-tabular">
            {totalDiamonds.toLocaleString('vi-VN')} 💎
          </p>
          <p className="mt-1 text-xs text-[#a79fc7]">
            Nhận thêm bằng cách hoàn thành 5 minigame sự kiện hoặc điểm danh mỗi ngày.
          </p>
        </div>

        <div className="relay-card p-5 bg-[#0e0b1c]">
          <p className="text-xs text-[#a79fc7]">Kỷ Vật Minigame Đã Mở Khóa</p>
          <p className="mt-2 font-display text-3xl font-bold text-[#e6e2f5] font-mono-tabular">
            {unlockedKeepsakes.length} / {MINIGAMES_LIST.length}
          </p>
          <p className="mt-1 text-xs text-[#a79fc7]">
            Chiến thắng từng minigame để thu thập trọn bộ 5 kỷ vật đặc biệt của Xavier.
          </p>
        </div>

        <div className="relay-card p-5 bg-[#0e0b1c]">
          <p className="text-xs text-[#a79fc7]">Phần Thưởng Sự Kiện Đã Đánh Dấu</p>
          <p className="mt-2 font-display text-3xl font-bold text-[#e6e2f5] font-mono-tabular">
            {collectedRewards.length} / {allEventRewardsCount}
          </p>
          <p className="mt-1 text-xs text-[#a79fc7]">
            Mở hồ sơ chi tiết của từng sự kiện ở mục 02 để đánh dấu các thẻ ký ức bạn đã sở hữu.
          </p>
        </div>
      </div>

      {/* 5 Minigame Keepsake Showcase Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {MINIGAMES_LIST.map((game) => {
          const unlocked = unlockedKeepsakes.includes(game.keepsakeId);
          const best = highScores[game.id] || 0;
          return (
            <div
              key={game.keepsakeId}
              className={`relay-card flex flex-col justify-between p-4 ${
                unlocked ? 'border-[#a964f7] bg-[#151029]' : 'bg-[#0e0b1c]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono-tabular text-xs">
                  <span className="text-[#cfb1f1]">KỶ VẬT {game.indexNumber}</span>
                  {unlocked ? (
                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Đã mở
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#786f99]">
                      <Lock className="h-3.5 w-3.5" /> Đang khóa
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-display text-sm font-bold text-[#e6e2f5]">
                  {game.keepsakeNameVI}
                </h3>
                <p className="mt-1 text-xs text-[#a79fc7]">
                  Thuộc sự kiện: {game.pairedEventTitleVI}
                </p>
              </div>

              <div className="mt-4 border-t border-[#3a2f6b]/60 pt-3">
                <p className="font-mono-tabular text-[11px] text-[#a79fc7]">
                  Điểm cao nhất: <strong className="text-[#e6e2f5]">{best}</strong>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    sound.playSelect();
                    onLaunchMinigame(game.id);
                  }}
                  className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 border border-[#3a2f6b] bg-[#07060f] px-3 py-1.5 text-xs font-medium text-[#cfb1f1] hover:border-[#a964f7] hover:text-white whitespace-nowrap"
                >
                  <Gamepad2 className="h-3.5 w-3.5" />
                  <span>{unlocked ? 'Chơi nâng kỷ lục' : 'Chơi để mở khóa'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset utility */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#3a2f6b]/60 pt-4 text-xs text-[#a79fc7]">
        <span>
          Dữ liệu tiến độ minigame và danh sách thẻ ký ức đã sưu tầm được lưu tự động trên thiết bị của bạn.
        </span>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-[#a79fc7] hover:text-rose-300 whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Đặt lại tiến độ lưu trữ</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-rose-300">Xác nhận xóa tiến độ?</span>
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="cursor-pointer bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white"
            >
              Xác nhận
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="cursor-pointer border border-[#3a2f6b] px-2.5 py-1 text-xs text-[#e6e2f5]"
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
