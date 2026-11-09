import React, { useState, useMemo, useEffect } from 'react';
import {
  XAVIER_EVENTS_ARCHIVE,
  YEAR_SECTIONS,
  MINIGAMES_LIST,
  XavierEventItem,
  MinigameId,
} from '../data/eventsData';
import { ResilientBanner } from './ResilientBanner';
import { sound } from '../utils/sound';
import {
  Search,
  Gamepad2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  CheckSquare,
  Square,
} from 'lucide-react';

interface EventsArchiveSectionProps {
  selectedEventId: string | null;
  onSelectEventId: (id: string | null) => void;
  onLaunchMinigame: (minigameId: MinigameId) => void;
  collectedRewards: string[];
  onToggleReward: (rewardId: string) => void;
}

export const EventsArchiveSection: React.FC<EventsArchiveSectionProps> = ({
  selectedEventId,
  onSelectEventId,
  onLaunchMinigame,
  collectedRewards,
  onToggleReward,
}) => {
  const [yearFilter, setYearFilter] = useState<'ALL' | '2024' | '2025' | '2026'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<
    'ALL' | 'wish' | 'welfare' | 'collab' | 'story' | 'special'
  >('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return XAVIER_EVENTS_ARCHIVE.filter((ev) => {
      if (yearFilter !== 'ALL' && ev.yearGroup !== yearFilter) return false;
      if (categoryFilter !== 'ALL' && ev.categoryKey !== categoryFilter) return false;
      if (q) {
        const haystack = `${ev.titleVI} ${ev.titleEN} ${ev.summaryVI} ${ev.typeVI} ${ev.date} ${ev.featuredMemory || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [yearFilter, categoryFilter, searchQuery]);

  const activeEvent = useMemo(
    () => XAVIER_EVENTS_ARCHIVE.find((e) => e.id === selectedEventId) || null,
    [selectedEventId]
  );

  const activeEventIndexInFiltered = useMemo(() => {
    if (!activeEvent) return -1;
    return filteredEvents.findIndex((e) => e.id === activeEvent.id);
  }, [activeEvent, filteredEvents]);

  const navigateModal = (dir: -1 | 1) => {
    if (filteredEvents.length === 0 || !activeEvent) return;
    sound.playSelect();
    const currentIdx =
      activeEventIndexInFiltered >= 0
        ? activeEventIndexInFiltered
        : XAVIER_EVENTS_ARCHIVE.findIndex((e) => e.id === activeEvent.id);
    const list = activeEventIndexInFiltered >= 0 ? filteredEvents : XAVIER_EVENTS_ARCHIVE;
    const nextIdx = (currentIdx + dir + list.length) % list.length;
    onSelectEventId(list[nextIdx].id);
  };

  useEffect(() => {
    if (!activeEvent) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelectEventId(null);
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const getMinigameTitle = (id: MinigameId) => {
    return MINIGAMES_LIST.find((m) => m.id === id)?.titleVI || 'Minigame Ánh Sao';
  };

  return (
    <section id="events" className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#3a2f6b] pb-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            Biên Niên Sử Sự Kiện · Đồng Bộ Cùng Trăng Soi Dặm Trường
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#e6e2f5] sm:text-3xl">
            02. Kho Lưu Trữ Sự Kiện &amp; Ký Ức (2023 – 2026)
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#a79fc7]">
          Tra cứu toàn bộ 28 cột mốc sự kiện của Thẩm Tinh Hồi, đánh dấu các phần thưởng đã sưu tầm và truy cập nhanh minigame đi kèm từng sự kiện.
        </p>
      </div>

      {/* 3 Year Chapter Overview Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {YEAR_SECTIONS.map((yr, idx) => {
          const count = XAVIER_EVENTS_ARCHIVE.filter((e) => e.yearGroup === yr.year).length;
          const isSelected = yearFilter === yr.year;
          return (
            <button
              key={yr.year}
              type="button"
              onMouseEnter={() => sound.playHover()}
              onClick={() => {
                sound.playSelect();
                setYearFilter(isSelected ? 'ALL' : yr.year);
              }}
              className={`relay-card relay-card-interactive flex cursor-pointer flex-col justify-between p-5 text-left ${
                isSelected ? 'border-[#a964f7] bg-[#1a1233]' : 'bg-[#0e0b1c]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono-tabular text-xs text-[#cfb1f1]">
                  <span>0{idx + 1}. KỶ NGUYÊN {yr.year}</span>
                  <span>{String(count).padStart(2, '0')} SỰ KIỆN</span>
                </div>
                <p className="mt-2 font-display text-3xl font-bold text-[#e6e2f5] font-mono-tabular">
                  {yr.year}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#cfb1f1]">
                  {yr.codenameVI} · {yr.codenameEN}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#a79fc7]">{yr.descVI}</p>
              </div>
              <div className="mt-4 border-t border-[#3a2f6b]/60 pt-2.5 font-mono-tabular text-xs font-semibold text-[#cfb1f1]">
                {isSelected ? 'Đang lọc năm ' + yr.year + ' (Nhấn để xem tất cả)' : 'Lọc sự kiện năm ' + yr.year + ' →'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Filter Toolbar */}
      <div className="mt-6 flex flex-col gap-3 border border-[#3a2f6b] bg-[#0e0b1c] p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Year & Category Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'ALL', label: 'Tất cả năm' },
              { id: '2024', label: '2023–2024' },
              { id: '2025', label: '2025' },
              { id: '2026', label: '2026' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playSelect();
                setYearFilter(tab.id);
              }}
              className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                yearFilter === tab.id
                  ? 'bg-[#a964f7] text-[#07060f] font-semibold'
                  : 'bg-[#07060f] text-[#a79fc7] hover:text-[#e6e2f5]'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <span className="mx-1 text-[#3a2f6b]" aria-hidden="true">|</span>

          {(
            [
              { id: 'ALL', label: 'Mọi phân loại' },
              { id: 'wish', label: 'Ước Nguyện (Wish)' },
              { id: 'welfare', label: 'Phúc Lợi (Miễn phí)' },
              { id: 'special', label: 'Lễ Hội & Sinh Nhật' },
              { id: 'collab', label: 'Hợp Tác (Collab)' },
              { id: 'story', label: 'Cốt Truyện' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playSelect();
                setCategoryFilter(cat.id);
              }}
              className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === cat.id
                  ? 'border border-[#cfb1f1] bg-[#1a1233] text-[#e6e2f5]'
                  : 'bg-[#07060f] text-[#a79fc7] hover:text-[#e6e2f5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center lg:w-72">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#a79fc7]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên sự kiện, ký ức, ngày..."
            aria-label="Tìm kiếm sự kiện"
            className="w-full border border-[#3a2f6b] bg-[#07060f] py-1.5 pl-9 pr-7 text-xs text-[#e6e2f5] placeholder-[#786f99] focus:border-[#a964f7] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Xóa từ khóa"
              className="absolute right-2 cursor-pointer text-xs text-[#a79fc7] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 flex items-center justify-between font-mono-tabular text-xs text-[#a79fc7]">
        <span>
          Hiển thị <strong>{filteredEvents.length}</strong> / {XAVIER_EVENTS_ARCHIVE.length} sự kiện lưu trữ
        </span>
        {(yearFilter !== 'ALL' || categoryFilter !== 'ALL' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setYearFilter('ALL');
              setCategoryFilter('ALL');
              setSearchQuery('');
            }}
            className="cursor-pointer text-[#cfb1f1] underline hover:text-white"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="mt-6 border border-[#3a2f6b] bg-[#0e0b1c] p-12 text-center">
          <p className="font-display text-lg font-semibold text-[#e6e2f5]">
            Không tìm thấy sự kiện phù hợp với bộ lọc hiện tại
          </p>
          <p className="mt-1 text-xs text-[#a79fc7]">
            Hãy thử từ khóa khác (ví dụ: &ldquo;Lingering Light&rdquo;, &ldquo;Tiptap Hop&rdquo;, &ldquo;2049&rdquo;) hoặc đặt lại bộ lọc.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((ev: XavierEventItem) => {
            const collectedCount = ev.rewards.filter((r) => collectedRewards.includes(r.id)).length;
            return (
              <article
                key={ev.id}
                className="relay-card relay-card-interactive flex flex-col justify-between bg-[#0e0b1c]"
              >
                <div>
                  {/* Banner */}
                  <div
                    onClick={() => {
                      sound.playSelect();
                      onSelectEventId(ev.id);
                    }}
                    className="cursor-pointer"
                  >
                    <ResilientBanner
                      src={ev.bannerImg}
                      alt={`${ev.titleVI} (${ev.titleEN})`}
                      fallbackGradient={ev.fallbackGradient}
                      subtitle={ev.date}
                      className="aspect-[16/9] w-full border-b border-[#3a2f6b]"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Clean unboxed metadata (Zero-Pill Rule) */}
                    <div className="flex flex-wrap items-center gap-1.5 font-mono-tabular text-xs text-[#cfb1f1]">
                      <span>{ev.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ev.typeVI}</span>
                      <span aria-hidden="true">·</span>
                      <span>Năm {ev.yearGroup}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-[#e6e2f5]">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playSelect();
                          onSelectEventId(ev.id);
                        }}
                        className="cursor-pointer text-left hover:text-[#cfb1f1] transition-colors"
                      >
                        {ev.titleVI}
                      </button>
                    </h3>
                    <p className="text-xs font-medium text-[#a79fc7]">{ev.titleEN}</p>

                    <p className="mt-2.5 text-xs leading-relaxed text-[#a79fc7] line-clamp-3">
                      {ev.summaryVI}
                    </p>

                    {ev.featuredMemory && (
                      <p className="mt-3 border-t border-[#3a2f6b]/60 pt-2.5 text-xs text-[#e6e2f5]">
                        Tâm điểm: <span className="text-[#cfb1f1]">{ev.featuredMemory}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="border-t border-[#3a2f6b] bg-[#07060f]/60 p-4">
                  <div className="mb-3 flex items-center justify-between text-xs text-[#a79fc7]">
                    <span className="truncate">
                      Minigame: <strong className="text-[#e6e2f5]">{getMinigameTitle(ev.pairedMinigameId)}</strong>
                    </span>
                    <span className="font-mono-tabular shrink-0 text-[#cfb1f1]">
                      Quà: {collectedCount}/{ev.rewards.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playSelect();
                        onLaunchMinigame(ev.pairedMinigameId);
                      }}
                      className="inline-flex cursor-pointer items-center justify-center gap-1.5 bg-[#a964f7] px-3 py-2 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap"
                    >
                      <Gamepad2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Chơi Minigame</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playSelect();
                        onSelectEventId(ev.id);
                      }}
                      className="inline-flex cursor-pointer items-center justify-center border border-[#3a2f6b] bg-[#0e0b1c] px-3 py-2 text-xs font-medium text-[#e6e2f5] transition-colors hover:border-[#a964f7] whitespace-nowrap"
                    >
                      <span>Hồ Sơ &amp; Quà</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Event Dossier Modal (matching shenxinghui.vercel.app dossier view) */}
      {activeEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeEvent.titleVI}
          onClick={() => onSelectEventId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07060f]/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relay-card flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden bg-[#0e0b1c]"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] bg-[#07060f] px-4 py-3 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 font-mono-tabular text-xs text-[#cfb1f1]">
                <span>{activeEvent.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeEvent.typeVI}</span>
                <span aria-hidden="true">·</span>
                <span>Mã hồ sơ: {activeEvent.id}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigateModal(-1)}
                  title="Sự kiện trước"
                  aria-label="Sự kiện trước"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#3a2f6b] bg-[#0e0b1c] text-[#a79fc7] hover:border-[#a964f7] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateModal(1)}
                  title="Sự kiện tiếp theo"
                  aria-label="Sự kiện tiếp theo"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border border-[#3a2f6b] bg-[#0e0b1c] text-[#a79fc7] hover:border-[#a964f7] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectEventId(null)}
                  title="Đóng hồ sơ (ESC)"
                  aria-label="Đóng hồ sơ"
                  className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center border border-[#3a2f6b] bg-[#0e0b1c] text-[#e6e2f5] hover:border-[#a964f7]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <ResilientBanner
                src={activeEvent.bannerImg}
                alt={activeEvent.titleVI}
                fallbackGradient={activeEvent.fallbackGradient}
                subtitle={activeEvent.date}
                className="aspect-[16/9] w-full border border-[#3a2f6b]"
                imgClassName="h-full w-full object-contain bg-[#07060f]"
              />

              <div className="border-b border-[#3a2f6b] pb-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
                  {activeEvent.titleVI} · <span className="text-[#cfb1f1]">{activeEvent.titleEN}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#e6e2f5]">
                  {activeEvent.summaryVI}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#a79fc7]">
                  {activeEvent.summaryEN}
                </p>
              </div>

              {/* Event Rewards Checklist */}
              <div>
                <h4 className="font-mono-tabular text-xs font-semibold text-[#cfb1f1]">
                  Danh Mục Phần Thưởng &amp; Kỷ Vật Sự Kiện (Nhấn để đánh dấu đã sưu tầm)
                </h4>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeEvent.rewards.map((rw) => {
                    const isChecked = collectedRewards.includes(rw.id);
                    return (
                      <button
                        key={rw.id}
                        type="button"
                        onClick={() => {
                          sound.playSelect();
                          onToggleReward(rw.id);
                        }}
                        className={`flex cursor-pointer items-center justify-between border p-3 text-left transition-colors ${
                          isChecked
                            ? 'border-emerald-400/70 bg-emerald-950/20 text-[#e6e2f5]'
                            : 'border-[#3a2f6b] bg-[#07060f] text-[#a79fc7] hover:border-[#a964f7]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 shrink-0 text-emerald-400" />
                          ) : (
                            <Square className="h-4 w-4 shrink-0 text-[#786f99]" />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-[#e6e2f5]">{rw.nameVI}</p>
                            <p className="font-mono-tabular text-[11px] text-[#cfb1f1]">
                              {rw.rarity} {rw.amount ? `· ${rw.amount}` : ''}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paired Minigame & Main Fanweb Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#3a2f6b] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const mg = activeEvent.pairedMinigameId;
                    onSelectEventId(null);
                    onLaunchMinigame(mg);
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] hover:opacity-90 whitespace-nowrap"
                >
                  <Gamepad2 className="h-4 w-4" />
                  <span>Chơi Minigame: {getMinigameTitle(activeEvent.pairedMinigameId)}</span>
                </button>

                <a
                  href={activeEvent.mainFanwebPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSelect()}
                  className="inline-flex items-center gap-2 border border-[#3a2f6b] bg-[#07060f] px-4 py-2.5 text-xs font-medium text-[#cfb1f1] hover:border-[#a964f7] hover:text-white whitespace-nowrap"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Mở Trên Fanweb Chính (shenxinghui.vercel.app)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
