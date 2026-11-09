import React, { useState, useEffect, useCallback } from 'react';
import {
  MINIGAMES_LIST,
  MinigameId,
  MinigameMetadata,
} from '../data/eventsData';
import { sound } from '../utils/sound';
import {
  Play,
  RotateCcw,
  Trophy,
  Sparkles,
  Flame,
  Shield,
  Zap,
  ArrowLeft,
  ArrowRight,
  Compass,
  Award,
} from 'lucide-react';

type GameState = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

export interface SingleMinigamePanelProps {
  lang: 'VI' | 'EN';
  activeMinigameId: MinigameId;
  onSelectMinigame: (id: MinigameId) => void;
  onCompleteMinigame: (
    minigameId: MinigameId,
    score: number,
    diamondsEarned: number,
    keepsakeId: string
  ) => void;
  unlockedKeepsakes: string[];
  highScores: Record<string, number>;
}

// ============================================================================
// 1. MINIGAME: BƯỚC NHẢY TÍ TÁCH (TIPTAP HOP - EVENT 2026-10)
// ============================================================================
interface TileCell {
  col: number;
  type: 'safe' | 'gold' | 'hazard';
}

const TiptapHopGame: React.FC<{
  lang: 'VI' | 'EN';
  meta: MinigameMetadata;
  onFinish: (score: number, victory: boolean) => void;
}> = ({ lang, meta, onFinish }) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [rows, setRows] = useState<TileCell[][]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [playerCol, setPlayerCol] = useState<number>(2);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [shields, setShields] = useState<number>(3);
  const [feedback, setFeedback] = useState<string>('');

  const TOTAL_ROWS = 10;

  const generateBoard = useCallback(() => {
    const newRows: TileCell[][] = [];
    for (let r = 0; r < TOTAL_ROWS; r++) {
      const safeCol1 = Math.floor(Math.random() * 5);
      let goldCol = Math.floor(Math.random() * 5);
      if (goldCol === safeCol1) goldCol = (safeCol1 + 2) % 5;
      const safeCol2 = (safeCol1 + 1) % 5;

      const rowCells: TileCell[] = [];
      for (let c = 0; c < 5; c++) {
        if (c === goldCol) {
          rowCells.push({ col: c, type: 'gold' });
        } else if (c === safeCol1 || c === safeCol2) {
          rowCells.push({ col: c, type: 'safe' });
        } else {
          rowCells.push({ col: c, type: 'hazard' });
        }
      }
      newRows.push(rowCells);
    }
    return newRows;
  }, []);

  const startGame = () => {
    sound.playSelect();
    setRows(generateBoard());
    setCurrentRow(0);
    setPlayerCol(2);
    setScore(0);
    setCombo(0);
    setShields(3);
    setFeedback(
      lang === 'VI'
        ? 'Nhấn vào bậc thềm An Toàn hoặc Hoàng Kim ở tầng tiếp theo (Phím 1–5)'
        : 'Select a Safe or Golden Starlight tile in the current row (Keys 1–5)'
    );
    setGameState('PLAYING');
  };

  const handleStep = useCallback(
    (colIndex: number) => {
      if (gameState !== 'PLAYING') return;
      const activeRowCells = rows[currentRow];
      if (!activeRowCells) return;

      const chosen = activeRowCells[colIndex];
      setPlayerCol(colIndex);

      if (chosen.type === 'gold') {
        const nextCombo = combo + 1;
        const gained = 120 + nextCombo * 25;
        const nextScore = score + gained;
        sound.playStep(1.25);
        setScore(nextScore);
        setCombo(nextCombo);
        setFeedback(
          lang === 'VI'
            ? `Bước nhảy Hoàng Kim! +${gained} điểm · Chuỗi x${nextCombo}`
            : `Golden Step! +${gained} pts · Combo x${nextCombo}`
        );
        if (currentRow + 1 >= TOTAL_ROWS) {
          sound.playVictory();
          setGameState('GAME_OVER');
          onFinish(nextScore + shields * 100, true);
        } else {
          setCurrentRow((r) => r + 1);
        }
      } else if (chosen.type === 'safe') {
        const nextCombo = combo + 1;
        const gained = 75 + nextCombo * 15;
        const nextScore = score + gained;
        sound.playStep(1.0);
        setScore(nextScore);
        setCombo(nextCombo);
        setFeedback(
          lang === 'VI'
            ? `Bước nhảy chuẩn xác! +${gained} điểm · Chuỗi x${nextCombo}`
            : `Safe Step! +${gained} pts · Combo x${nextCombo}`
        );
        if (currentRow + 1 >= TOTAL_ROWS) {
          sound.playVictory();
          setGameState('GAME_OVER');
          onFinish(nextScore + shields * 100, true);
        } else {
          setCurrentRow((r) => r + 1);
        }
      } else {
        sound.playError();
        const nextShields = shields - 1;
        setShields(nextShields);
        setCombo(0);
        setFeedback(
          lang === 'VI'
            ? 'Chạm phải Nhiễu Sóng Không Gian! Mất 1 Khiên Ánh Sao.'
            : 'Hit a Spatial Rift! Lost 1 Starlight Shield.'
        );
        if (nextShields <= 0) {
          setGameState('GAME_OVER');
          onFinish(score, false);
        } else if (currentRow + 1 >= TOTAL_ROWS) {
          sound.playVictory();
          setGameState('GAME_OVER');
          onFinish(score, true);
        } else {
          setCurrentRow((r) => r + 1);
        }
      }
    },
    [gameState, rows, currentRow, combo, score, shields, lang, onFinish]
  );

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        handleStep(parseInt(e.key, 10) - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, handleStep]);

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'MINIGAME ĐI KÈM SỰ KIỆN' : 'COMPANION EVENT MINIGAME'} · {meta.genreVI}
          </p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
            {lang === 'VI' ? meta.titleVI : meta.titleEN}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fc7]">{meta.shortDescVI}</p>
          <div className="mt-4 space-y-1.5 border-t border-[#3a2f6b] pt-3.5 text-xs text-[#a79fc7]">
            {meta.rulesVI.map((rule, idx) => (
              <p key={idx}>
                {idx + 1}. {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a2f6b] pt-4">
          <div className="text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'Thưởng hoàn thành:' : 'Completion Reward:'}{' '}
            <span className="font-mono-tabular font-semibold">+{meta.rewardDiamonds} 💎</span> · {meta.keepsakeNameVI}
          </div>
          <button
            type="button"
            onClick={startGame}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <Play className="h-4 w-4" />
            <span>{lang === 'VI' ? 'Bắt đầu chơi' : 'Start Game'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    const victory = shields > 0;
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <Trophy className="h-9 w-9 text-[#cfb1f1]" />
        <h3 className="mt-3 font-display text-xl font-bold text-[#e6e2f5]">
          {victory
            ? lang === 'VI'
              ? 'Hoàn Thành Hành Trình Ánh Sao!'
              : 'Starlight Journey Complete!'
            : lang === 'VI'
            ? 'Hành Trình Tạm Dừng'
            : 'Journey Interrupted'}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#a79fc7]">
          {victory
            ? `Đã mở khóa kỷ vật: ${meta.keepsakeNameVI}.`
            : 'Khiên Ánh Sao đã cạn. Hãy thử lại để chinh phục trọn vẹn 10 bậc thềm!'}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border border-[#3a2f6b] bg-[#07060f] px-5 py-2.5 font-mono-tabular text-xs sm:text-sm">
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Tầng: <strong>{currentRow + 1}/{TOTAL_ROWS}</strong></span>
          <span>·</span>
          <span>Thưởng: <strong className="text-[#a964f7]">+{victory ? meta.rewardDiamonds : Math.floor(meta.rewardDiamonds / 3)} 💎</strong></span>
        </div>
        <button
          type="button"
          onClick={startGame}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{lang === 'VI' ? 'Chơi lại' : 'Play Again'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] pb-2.5 font-mono-tabular text-xs">
        <div className="flex items-center gap-3 text-[#e6e2f5]">
          <span>Tầng: <strong>{String(currentRow + 1).padStart(2, '0')}/{TOTAL_ROWS}</strong></span>
          <span>·</span>
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Combo: <strong>x{combo}</strong></span>
        </div>
        <div className="text-[#cfb1f1]">
          Khiên: <strong>{shields}/3 · {shields > 1 ? 'ỔN ĐỊNH' : 'CẢNH BÁO'}</strong>
        </div>
      </div>

      <p className="text-xs text-[#a79fc7]">{feedback}</p>

      <div className="space-y-2.5">
        {rows.slice(currentRow, currentRow + 2).map((rowCells, sliceIdx) => {
          const isCurrent = sliceIdx === 0;
          const actualRowNumber = currentRow + sliceIdx + 1;
          return (
            <div
              key={actualRowNumber}
              className={`border p-3 ${
                isCurrent
                  ? 'border-[#a964f7] bg-[#151029]'
                  : 'border-[#3a2f6b]/60 bg-[#07060f]/60 opacity-65'
              }`}
            >
              <div className="mb-2 flex items-center justify-between font-mono-tabular text-[11px] text-[#a79fc7]">
                <span>
                  {isCurrent ? `Bậc thềm hiện tại · Tầng ${actualRowNumber}` : `Tầng kế tiếp · Tầng ${actualRowNumber}`}
                </span>
                <span>{isCurrent ? 'Nhấn chọn 1 ô (Phím 1–5)' : 'Dự báo quỹ đạo'}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {rowCells.map((cell) => {
                  const isGold = cell.type === 'gold';
                  const isSafe = cell.type === 'safe';
                  return (
                    <button
                      key={cell.col}
                      type="button"
                      disabled={!isCurrent}
                      onClick={() => handleStep(cell.col)}
                      className={`flex min-h-[56px] flex-col items-center justify-center border p-1.5 text-center transition-transform ${
                        isCurrent ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default'
                      } ${
                        isGold
                          ? 'border-amber-400/80 bg-amber-500/15 text-amber-200'
                          : isSafe
                          ? 'border-[#a964f7]/80 bg-[#a964f7]/15 text-[#e6e2f5]'
                          : 'border-rose-500/40 bg-rose-950/25 text-rose-300/75'
                      }`}
                    >
                      <span className="font-mono-tabular text-[10px] opacity-75">[{cell.col + 1}]</span>
                      <span className="mt-0.5 text-[11px] font-semibold whitespace-nowrap">
                        {isGold ? '★ Hoàng Kim' : isSafe ? '✦ An Toàn' : '✕ Nhiễu Sóng'}
                      </span>
                      {isCurrent && playerCol === cell.col && currentRow > 0 && (
                        <span className="text-[10px] text-[#cfb1f1]">Bunbun</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 2. MINIGAME: TIỆM BÁNH THỎ TRẮNG (STARLIGHT BAKERY)
// ============================================================================
interface PastryRecipe {
  id: string;
  nameVI: string;
  points: number;
  speed: number;
}

const PASTRY_MENU: PastryRecipe[] = [
  { id: 'tart', nameVI: 'Tart Trứng Ánh Sao', points: 120, speed: 3.4 },
  { id: 'bun', nameVI: 'Bánh Ngọt Thỏ Trắng', points: 140, speed: 4.1 },
  { id: 'cookie', nameVI: 'Bánh Quy Tinh Cầu', points: 110, speed: 3.0 },
  { id: 'tea', nameVI: 'Trà Hoa Cúc Mật Ong', points: 130, speed: 3.7 },
];

interface OvenSlot {
  slotId: number;
  recipe: PastryRecipe | null;
  progress: number;
  status: 'idle' | 'baking' | 'burnt';
}

const StarlightBakeryGame: React.FC<{
  lang: 'VI' | 'EN';
  meta: MinigameMetadata;
  onFinish: (score: number, victory: boolean) => void;
}> = ({ lang, meta, onFinish }) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [ovens, setOvens] = useState<OvenSlot[]>([
    { slotId: 1, recipe: null, progress: 0, status: 'idle' },
    { slotId: 2, recipe: null, progress: 0, status: 'idle' },
    { slotId: 3, recipe: null, progress: 0, status: 'idle' },
  ]);
  const [targetOrder, setTargetOrder] = useState<PastryRecipe>(PASTRY_MENU[0]);
  const [servedCount, setServedCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [logMsg, setLogMsg] = useState<string>('Chọn món bánh khách yêu cầu để đưa vào lò nướng.');

  const TARGET_SERVES = 6;

  const startBakery = () => {
    sound.playSelect();
    setOvens([
      { slotId: 1, recipe: null, progress: 0, status: 'idle' },
      { slotId: 2, recipe: null, progress: 0, status: 'idle' },
      { slotId: 3, recipe: null, progress: 0, status: 'idle' },
    ]);
    setTargetOrder(PASTRY_MENU[Math.floor(Math.random() * PASTRY_MENU.length)]);
    setServedCount(0);
    setScore(0);
    setLogMsg('Canh nhiệt độ vùng Hoàng Kim (70% – 92%) để lấy bánh ra lò!');
    setGameState('PLAYING');
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const timer = window.setInterval(() => {
      setOvens((prev) =>
        prev.map((oven) => {
          if (oven.status !== 'baking' || !oven.recipe) return oven;
          const nextProg = oven.progress + oven.recipe.speed;
          if (nextProg >= 100) {
            sound.playError();
            return { ...oven, progress: 100, status: 'burnt' };
          }
          return { ...oven, progress: nextProg };
        })
      );
    }, 120);
    return () => window.clearInterval(timer);
  }, [gameState]);

  const startOvenWithRecipe = (recipe: PastryRecipe) => {
    if (gameState !== 'PLAYING') return;
    const emptyIdx = ovens.findIndex((o) => o.status === 'idle');
    if (emptyIdx === -1) {
      setLogMsg('Cả 3 lò đang bận! Hãy lấy bánh ra hoặc dọn lò bị quá nhiệt trước.');
      return;
    }
    sound.playSelect();
    setOvens((prev) =>
      prev.map((o, idx) =>
        idx === emptyIdx ? { ...o, recipe, progress: 5, status: 'baking' } : o
      )
    );
    setLogMsg(`Đã đưa [${recipe.nameVI}] vào Lò Nướng 0${emptyIdx + 1}.`);
  };

  const harvestOven = (slotId: number) => {
    const oven = ovens.find((o) => o.slotId === slotId);
    if (!oven || oven.status === 'idle') return;

    if (oven.status === 'burnt') {
      sound.playSelect();
      setOvens((prev) =>
        prev.map((o) => (o.slotId === slotId ? { slotId, recipe: null, progress: 0, status: 'idle' } : o))
      );
      setLogMsg(`Đã dọn sạch Lò 0${slotId}.`);
      return;
    }

    if (oven.progress < 65) {
      sound.playError();
      setLogMsg(`Bánh trong Lò 0${slotId} mới đạt ${Math.round(oven.progress)}%, chưa chín tới!`);
      return;
    }

    const isGolden = oven.progress >= 70 && oven.progress <= 94;
    const matchesOrder = oven.recipe?.id === targetOrder.id;
    const basePts = oven.recipe?.points || 100;
    const earned = (isGolden ? basePts + 60 : basePts) + (matchesOrder ? 80 : 0);

    sound.playSuccess();
    const nextScore = score + earned;
    const nextServed = servedCount + 1;
    setScore(nextScore);
    setServedCount(nextServed);

    setOvens((prev) =>
      prev.map((o) => (o.slotId === slotId ? { slotId, recipe: null, progress: 0, status: 'idle' } : o))
    );

    if (nextServed >= TARGET_SERVES) {
      sound.playVictory();
      setGameState('GAME_OVER');
      onFinish(nextScore, true);
    } else {
      const nextRecipe = PASTRY_MENU[Math.floor(Math.random() * PASTRY_MENU.length)];
      setTargetOrder(nextRecipe);
      setLogMsg(
        `Ra lò ${isGolden ? 'Hoàn Hảo' : 'Thành Công'}: +${earned} điểm! Đơn mới: [${nextRecipe.nameVI}].`
      );
    }
  };

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'MINIGAME ĐI KÈM SỰ KIỆN' : 'COMPANION EVENT MINIGAME'} · {meta.genreVI}
          </p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
            {lang === 'VI' ? meta.titleVI : meta.titleEN}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fc7]">{meta.shortDescVI}</p>
          <div className="mt-4 space-y-1.5 border-t border-[#3a2f6b] pt-3.5 text-xs text-[#a79fc7]">
            {meta.rulesVI.map((rule, idx) => (
              <p key={idx}>
                {idx + 1}. {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a2f6b] pt-4">
          <div className="text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'Thưởng hoàn thành:' : 'Completion Reward:'}{' '}
            <span className="font-mono-tabular font-semibold">+{meta.rewardDiamonds} 💎</span> · {meta.keepsakeNameVI}
          </div>
          <button
            type="button"
            onClick={startBakery}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <Play className="h-4 w-4" />
            <span>{lang === 'VI' ? 'Mở Cửa Tiệm Bánh' : 'Start Baking'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <Flame className="h-9 w-9 text-[#cfb1f1]" />
        <h3 className="mt-3 font-display text-xl font-bold text-[#e6e2f5]">
          Hoàn Tất Ca Đêm Tiệm Bánh Thỏ Trắng!
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#a79fc7]">
          Bạn và Xavier đã phục vụ trọn vẹn {TARGET_SERVES} mẻ bánh thơm lừng!
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border border-[#3a2f6b] bg-[#07060f] px-5 py-2.5 font-mono-tabular text-xs sm:text-sm">
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Đơn: <strong>{servedCount}/{TARGET_SERVES}</strong></span>
          <span>·</span>
          <span>Thưởng: <strong className="text-[#a964f7]">+{meta.rewardDiamonds} 💎</strong></span>
        </div>
        <button
          type="button"
          onClick={startBakery}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{lang === 'VI' ? 'Chơi lại' : 'Play Again'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] pb-2.5 font-mono-tabular text-xs">
        <div className="flex items-center gap-3 text-[#e6e2f5]">
          <span>Đơn đã giao: <strong>{servedCount}/{TARGET_SERVES}</strong></span>
          <span>·</span>
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
        </div>
        <div className="text-[#cfb1f1]">
          Khách gọi: <strong className="text-amber-300">{targetOrder.nameVI} (+80đ)</strong>
        </div>
      </div>

      <p className="text-xs text-[#a79fc7]">{logMsg}</p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PASTRY_MENU.map((item) => {
          const isRequested = item.id === targetOrder.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => startOvenWithRecipe(item)}
              className={`flex min-h-[50px] cursor-pointer flex-col items-start justify-between border p-2 text-left transition-colors ${
                isRequested
                  ? 'border-amber-400 bg-amber-500/15 text-[#e6e2f5]'
                  : 'border-[#3a2f6b] bg-[#07060f] text-[#a79fc7] hover:border-[#a964f7]'
              }`}
            >
              <span className="text-xs font-semibold text-[#e6e2f5]">{item.nameVI}</span>
              <span className="font-mono-tabular text-[10px] text-[#cfb1f1]">
                +{item.points}đ {isRequested ? '· ĐANG GỌI' : ''}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {ovens.map((oven) => {
          const pct = Math.round(oven.progress);
          const isGolden = oven.status === 'baking' && pct >= 70 && pct <= 94;
          const isBurnt = oven.status === 'burnt';
          return (
            <div
              key={oven.slotId}
              className={`flex flex-col justify-between border p-3 ${
                isBurnt
                  ? 'border-rose-500/70 bg-rose-950/20'
                  : isGolden
                  ? 'border-amber-400 bg-amber-500/10'
                  : 'border-[#3a2f6b] bg-[#07060f]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono-tabular text-xs">
                  <span className="text-[#cfb1f1]">Lò 0{oven.slotId}</span>
                  <span>
                    {oven.status === 'idle'
                      ? 'TRỐNG'
                      : isBurnt
                      ? '100% · QUÁ NHIỆT'
                      : isGolden
                      ? `${pct}% · HOÀNG KIM`
                      : `${pct}%`}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-[#e6e2f5] truncate">
                  {oven.recipe ? oven.recipe.nameVI : 'Chưa có bánh'}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden bg-[#1a1233]">
                  <div
                    className={`h-full transition-all duration-100 ${
                      isBurnt ? 'bg-rose-500' : isGolden ? 'bg-amber-400' : 'bg-[#a964f7]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={oven.status === 'idle'}
                onClick={() => harvestOven(oven.slotId)}
                className={`mt-2.5 w-full py-1.5 text-xs font-semibold transition-opacity whitespace-nowrap ${
                  oven.status === 'idle'
                    ? 'cursor-not-allowed border border-[#3a2f6b]/50 text-[#786f99]'
                    : isBurnt
                    ? 'cursor-pointer bg-rose-600 text-white hover:opacity-90'
                    : isGolden
                    ? 'cursor-pointer bg-amber-400 text-[#07060f] hover:opacity-90'
                    : 'cursor-pointer border border-[#a964f7] text-[#cfb1f1] hover:bg-[#a964f7]/20'
                }`}
              >
                {oven.status === 'idle'
                  ? 'Chọn món ở trên'
                  : isBurnt
                  ? 'Dọn Lò Quá Nhiệt'
                  : isGolden
                  ? 'Lấy Bánh Ra Lò!'
                  : 'Chờ 70%–92%'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 3. MINIGAME: GẮP THÚ LÚC NỬA ĐÊM (MIDNIGHT CLAW)
// ============================================================================
interface PlushieTarget {
  id: string;
  nameVI: string;
  x: number;
  speed: number;
  dir: 1 | -1;
  points: number;
  caught: boolean;
}

const MidnightClawGame: React.FC<{
  lang: 'VI' | 'EN';
  meta: MinigameMetadata;
  onFinish: (score: number, victory: boolean) => void;
}> = ({ lang, meta, onFinish }) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [clawX, setClawX] = useState<number>(50);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [evolBoost, setEvolBoost] = useState<boolean>(true);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(6);
  const [score, setScore] = useState<number>(0);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [plushies, setPlushies] = useState<PlushieTarget[]>([]);

  const initClaw = () => {
    sound.playSelect();
    setPlushies([
      { id: 'p1', nameVI: 'Bunbun Phi Hành Gia', x: 20, speed: 1.8, dir: 1, points: 180, caught: false },
      { id: 'p2', nameVI: 'Cáo Tuyết Ánh Sao', x: 45, speed: 2.3, dir: -1, points: 220, caught: false },
      { id: 'p3', nameVI: 'Thỏ Trắng Ngủ Gật', x: 70, speed: 1.5, dir: 1, points: 160, caught: false },
      { id: 'p4', nameVI: 'Tinh Cầu Phát Sáng', x: 32, speed: 2.6, dir: 1, points: 250, caught: false },
      { id: 'p5', nameVI: 'Mèo Good Meowning', x: 82, speed: 2.0, dir: -1, points: 200, caught: false },
    ]);
    setClawX(50);
    setAttemptsLeft(6);
    setScore(0);
    setEvolBoost(true);
    setIsDropping(false);
    setStatusMsg('Căn góc càng gắp trùng với tọa độ thú bông bên dưới (sai số ±10%)!');
    setGameState('PLAYING');
  };

  useEffect(() => {
    if (gameState !== 'PLAYING' || isDropping) return;
    const interval = window.setInterval(() => {
      setPlushies((prev) =>
        prev.map((p) => {
          if (p.caught) return p;
          let nextX = p.x + p.speed * p.dir;
          let nextDir = p.dir;
          if (nextX >= 88) {
            nextX = 88;
            nextDir = -1;
          } else if (nextX <= 12) {
            nextX = 12;
            nextDir = 1;
          }
          return { ...p, x: nextX, dir: nextDir };
        })
      );
    }, 60);
    return () => window.clearInterval(interval);
  }, [gameState, isDropping]);

  const dropClaw = () => {
    if (gameState !== 'PLAYING' || isDropping || attemptsLeft <= 0) return;
    setIsDropping(true);
    sound.playSelect();

    window.setTimeout(() => {
      const tolerance = evolBoost ? 11 : 7;
      const hitTarget = plushies.find(
        (p) => !p.caught && Math.abs(p.x - clawX) <= tolerance
      );

      const nextAttempts = attemptsLeft - 1;
      setAttemptsLeft(nextAttempts);

      if (hitTarget) {
        sound.playSuccess();
        const gained = hitTarget.points + (evolBoost ? 50 : 0);
        const nextScore = score + gained;
        setScore(nextScore);
        const updated = plushies.map((p) =>
          p.id === hitTarget.id ? { ...p, caught: true } : p
        );
        setPlushies(updated);
        setStatusMsg(`Gắp trúng [${hitTarget.nameVI}]! +${gained} điểm.`);

        const allCaught = updated.every((p) => p.caught);
        if (allCaught || nextAttempts <= 0) {
          sound.playVictory();
          setIsDropping(false);
          setGameState('GAME_OVER');
          onFinish(nextScore, true);
          return;
        }
      } else {
        sound.playError();
        setStatusMsg('Càng gắp trượt qua khoảng không! Hãy căn chuẩn tọa độ % của thú bông.');
        if (nextAttempts <= 0) {
          setIsDropping(false);
          setGameState('GAME_OVER');
          onFinish(score, score > 0);
          return;
        }
      }
      setIsDropping(false);
    }, 360);
  };

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'MINIGAME ĐI KÈM SỰ KIỆN' : 'COMPANION EVENT MINIGAME'} · {meta.genreVI}
          </p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
            {lang === 'VI' ? meta.titleVI : meta.titleEN}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fc7]">{meta.shortDescVI}</p>
          <div className="mt-4 space-y-1.5 border-t border-[#3a2f6b] pt-3.5 text-xs text-[#a79fc7]">
            {meta.rulesVI.map((rule, idx) => (
              <p key={idx}>
                {idx + 1}. {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a2f6b] pt-4">
          <div className="text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'Thưởng hoàn thành:' : 'Completion Reward:'}{' '}
            <span className="font-mono-tabular font-semibold">+{meta.rewardDiamonds} 💎</span> · {meta.keepsakeNameVI}
          </div>
          <button
            type="button"
            onClick={initClaw}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <Play className="h-4 w-4" />
            <span>{lang === 'VI' ? 'Bỏ Xu Gắp Thú' : 'Insert Coin'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    const caughtCount = plushies.filter((p) => p.caught).length;
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <Award className="h-9 w-9 text-[#cfb1f1]" />
        <h3 className="mt-3 font-display text-xl font-bold text-[#e6e2f5]">
          Kết Quả Tủ Gắp Thú Đêm Khuya
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#a79fc7]">
          Đã rinh về {caughtCount}/{plushies.length} mẫu thú bông giới hạn!
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border border-[#3a2f6b] bg-[#07060f] px-5 py-2.5 font-mono-tabular text-xs sm:text-sm">
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Thú bông: <strong>{caughtCount}/{plushies.length}</strong></span>
          <span>·</span>
          <span>Thưởng: <strong className="text-[#a964f7]">+{meta.rewardDiamonds} 💎</strong></span>
        </div>
        <button
          type="button"
          onClick={initClaw}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{lang === 'VI' ? 'Chơi lại' : 'Play Again'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] pb-2.5 font-mono-tabular text-xs">
        <div className="flex items-center gap-3 text-[#e6e2f5]">
          <span>Lượt còn: <strong>{attemptsLeft}/6</strong></span>
          <span>·</span>
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Tọa độ: <strong>{clawX}%</strong></span>
        </div>
        <button
          type="button"
          onClick={() => setEvolBoost((b) => !b)}
          className={`cursor-pointer border px-2 py-0.5 text-[11px] font-medium transition-colors whitespace-nowrap ${
            evolBoost
              ? 'border-amber-400 bg-amber-500/15 text-amber-200'
              : 'border-[#3a2f6b] text-[#a79fc7]'
          }`}
        >
          Evol Ánh Sáng: {evolBoost ? 'BẬT' : 'TẮT'}
        </button>
      </div>

      <p className="text-xs text-[#a79fc7]">{statusMsg}</p>

      <div className="relative h-48 w-full overflow-hidden border border-[#3a2f6b] bg-[#07060f] p-3">
        <div className="relative h-10 w-full border-b border-dashed border-[#3a2f6b]/70">
          <div
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center transition-all duration-100"
            style={{ left: `${clawX}%` }}
          >
            <div className={`w-0.5 bg-[#a964f7] transition-all duration-200 ${isDropping ? 'h-20' : 'h-3'}`} />
            <div className="border border-[#cfb1f1] bg-[#1a1233] px-1.5 py-0.5 font-mono-tabular text-[10px] text-[#e6e2f5]">
              ▼ {clawX}%
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {plushies.map((p) => (
            <div key={p.id} className="relative h-6 w-full bg-[#151029]/60">
              {!p.caught ? (
                <div
                  className="absolute top-0.5 flex -translate-x-1/2 items-center gap-1 border border-[#a964f7]/70 bg-[#1a1233] px-2 py-0.5 text-[11px] text-[#e6e2f5] whitespace-nowrap"
                  style={{ left: `${p.x}%` }}
                >
                  <span>✦ {p.nameVI}</span>
                  <span className="font-mono-tabular text-[10px] text-[#cfb1f1]">({Math.round(p.x)}%)</span>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center font-mono-tabular text-[10px] text-emerald-300">
                  ✓ Đã gắp: {p.nameVI}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setClawX((x) => Math.max(10, x - 8))}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1 border border-[#3a2f6b] bg-[#07060f] px-3.5 py-1.5 text-xs font-medium text-[#e6e2f5] hover:border-[#a964f7] whitespace-nowrap"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Trái (-8%)</span>
          </button>
          <button
            type="button"
            onClick={() => setClawX((x) => Math.min(90, x + 8))}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1 border border-[#3a2f6b] bg-[#07060f] px-3.5 py-1.5 text-xs font-medium text-[#e6e2f5] hover:border-[#a964f7] whitespace-nowrap"
          >
            <span>Phải (+8%)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          disabled={isDropping}
          onClick={dropClaw}
          className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-1.5 text-xs font-semibold text-[#07060f] hover:opacity-90 whitespace-nowrap"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{isDropping ? 'Đang Gắp...' : 'Hạ Càng Gắp'}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MINIGAME: MẬT MÃ TINH HÀ PHILOS (PHILOS CIPHER)
// ============================================================================
interface CipherCard {
  uid: number;
  pairId: string;
  title: string;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

const CONSTELLATION_PAIRS = [
  { pairId: 'c1', title: 'Heartstring Symphony', symbol: '✦ Cầm Tinh' },
  { pairId: 'c2', title: 'Precious Moment', symbol: '◈ Nguyệt Quang' },
  { pairId: 'c3', title: 'Throne of Eros', symbol: '❖ Vương Miện' },
  { pairId: 'c4', title: 'Lingering Light', symbol: '✧ Sao Băng' },
  { pairId: 'c5', title: 'Firelit Embrace', symbol: '❂ Ánh Lửa' },
  { pairId: 'c6', title: 'Love Is Real 2049', symbol: '✵ Tần Số 214' },
];

const PhilosCipherGame: React.FC<{
  lang: 'VI' | 'EN';
  meta: MinigameMetadata;
  onFinish: (score: number, victory: boolean) => void;
}> = ({ lang, meta, onFinish }) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [deck, setDeck] = useState<CipherCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [movesLeft, setMovesLeft] = useState<number>(16);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const startCipher = () => {
    sound.playSelect();
    const doubled = [...CONSTELLATION_PAIRS, ...CONSTELLATION_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        uid: idx,
        pairId: item.pairId,
        title: item.title,
        symbol: item.symbol,
        flipped: false,
        matched: false,
      }));
    setDeck(doubled);
    setSelectedIndices([]);
    setMovesLeft(16);
    setMatchedPairs(0);
    setScore(0);
    setGameState('PLAYING');
  };

  const handleFlip = (index: number) => {
    if (gameState !== 'PLAYING') return;
    if (selectedIndices.length >= 2) return;
    const card = deck[index];
    if (!card || card.flipped || card.matched) return;

    sound.playStep(1.1);
    const nextDeck = deck.map((c, idx) => (idx === index ? { ...c, flipped: true } : c));
    setDeck(nextDeck);
    const nextSel = [...selectedIndices, index];
    setSelectedIndices(nextSel);

    if (nextSel.length === 2) {
      const [firstIdx, secondIdx] = nextSel;
      const firstCard = nextDeck[firstIdx];
      const secondCard = nextDeck[secondIdx];
      const nextMoves = movesLeft - 1;
      setMovesLeft(nextMoves);

      if (firstCard.pairId === secondCard.pairId) {
        sound.playSuccess();
        const nextMatched = matchedPairs + 1;
        const nextScore = score + 160 + nextMoves * 10;
        setMatchedPairs(nextMatched);
        setScore(nextScore);
        setDeck((prev) =>
          prev.map((c, idx) =>
            idx === firstIdx || idx === secondIdx ? { ...c, matched: true } : c
          )
        );
        setSelectedIndices([]);

        if (nextMatched >= CONSTELLATION_PAIRS.length) {
          sound.playVictory();
          setGameState('GAME_OVER');
          onFinish(nextScore, true);
        }
      } else {
        window.setTimeout(() => {
          setDeck((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...c, flipped: false } : c
            )
          );
          setSelectedIndices([]);
          if (nextMoves <= 0) {
            sound.playError();
            setGameState('GAME_OVER');
            onFinish(score, false);
          }
        }, 550);
      }
    }
  };

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'MINIGAME ĐI KÈM SỰ KIỆN' : 'COMPANION EVENT MINIGAME'} · {meta.genreVI}
          </p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
            {lang === 'VI' ? meta.titleVI : meta.titleEN}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fc7]">{meta.shortDescVI}</p>
          <div className="mt-4 space-y-1.5 border-t border-[#3a2f6b] pt-3.5 text-xs text-[#a79fc7]">
            {meta.rulesVI.map((rule, idx) => (
              <p key={idx}>
                {idx + 1}. {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a2f6b] pt-4">
          <div className="text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'Thưởng hoàn thành:' : 'Completion Reward:'}{' '}
            <span className="font-mono-tabular font-semibold">+{meta.rewardDiamonds} 💎</span> · {meta.keepsakeNameVI}
          </div>
          <button
            type="button"
            onClick={startCipher}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <Compass className="h-4 w-4" />
            <span>{lang === 'VI' ? 'Giải Mã Tinh Đồ' : 'Start Decryption'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    const victory = matchedPairs >= CONSTELLATION_PAIRS.length;
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <Compass className="h-9 w-9 text-[#cfb1f1]" />
        <h3 className="mt-3 font-display text-xl font-bold text-[#e6e2f5]">
          {victory ? 'Giải Mã Thành Công Tín Hiệu 214 MHz!' : 'Tín Hiệu Bị Nhiễu Sóng'}
        </h3>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border border-[#3a2f6b] bg-[#07060f] px-5 py-2.5 font-mono-tabular text-xs sm:text-sm">
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Chòm sao: <strong>{matchedPairs}/6</strong></span>
          <span>·</span>
          <span>Thưởng: <strong className="text-[#a964f7]">+{victory ? meta.rewardDiamonds : 100} 💎</strong></span>
        </div>
        <button
          type="button"
          onClick={startCipher}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{lang === 'VI' ? 'Chơi lại' : 'Play Again'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] pb-2.5 font-mono-tabular text-xs">
        <div className="flex items-center gap-3 text-[#e6e2f5]">
          <span>Chòm sao: <strong>{matchedPairs}/6</strong></span>
          <span>·</span>
          <span>Lượt còn: <strong>{movesLeft}</strong></span>
        </div>
        <div className="text-[#cfb1f1]">
          Điểm: <strong>{score}</strong>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {deck.map((card, idx) => {
          const isRevealed = card.flipped || card.matched;
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleFlip(idx)}
              className={`flex min-h-[72px] cursor-pointer flex-col items-center justify-center border p-2 text-center transition-transform ${
                card.matched
                  ? 'border-emerald-400/70 bg-emerald-950/25 text-emerald-200'
                  : isRevealed
                  ? 'border-[#a964f7] bg-[#1a1233] text-[#e6e2f5]'
                  : 'border-[#3a2f6b] bg-[#07060f] text-[#a79fc7] hover:-translate-y-0.5 hover:border-[#cfb1f1]'
              }`}
            >
              {isRevealed ? (
                <>
                  <span className="font-mono-tabular text-xs font-semibold text-[#cfb1f1]">
                    {card.symbol}
                  </span>
                  <span className="mt-0.5 text-[11px] font-medium line-clamp-1">{card.title}</span>
                </>
              ) : (
                <>
                  <span className="font-mono-tabular text-[11px] text-[#786f99]">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="mt-0.5 text-[11px] text-[#a79fc7]">Giải mã</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 5. MINIGAME: LƯỠI KIẾM ÁNH SÁNG · TẦN SỐ 2049 (LIGHTBLADE DEFENSE)
// ============================================================================
interface LaneThreat {
  laneId: number;
  nameVI: string;
  distance: number;
  hp: number;
}

const LightbladeDefenseGame: React.FC<{
  lang: 'VI' | 'EN';
  meta: MinigameMetadata;
  onFinish: (score: number, victory: boolean) => void;
}> = ({ lang, meta, onFinish }) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [lanes, setLanes] = useState<LaneThreat[]>([]);
  const [relayHp, setRelayHp] = useState<number>(100);
  const [resonance, setResonance] = useState<number>(40);
  const [clearedCount, setClearedCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const TARGET_CLEARS = 12;

  const startDefense = () => {
    sound.playSelect();
    setLanes([
      { laneId: 1, nameVI: 'Lõi Dị Biến Alpha', distance: 85, hp: 2 },
      { laneId: 2, nameVI: 'Lõi Dị Biến Beta', distance: 70, hp: 1 },
      { laneId: 3, nameVI: 'Lõi Dị Biến Gamma', distance: 90, hp: 2 },
      { laneId: 4, nameVI: 'Lõi Dị Biến Delta', distance: 65, hp: 1 },
    ]);
    setRelayHp(100);
    setResonance(40);
    setClearedCount(0);
    setScore(0);
    setGameState('PLAYING');
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const timer = window.setInterval(() => {
      setLanes((prev) =>
        prev.map((lane) => {
          const nextDist = lane.distance - 4;
          if (nextDist <= 0) {
            sound.playError();
            setRelayHp((hp) => {
              const nextHp = Math.max(0, hp - 20);
              if (nextHp <= 0) {
                setGameState('GAME_OVER');
                onFinish(score, false);
              }
              return nextHp;
            });
            return {
              ...lane,
              distance: 92,
              hp: Math.random() > 0.5 ? 2 : 1,
            };
          }
          return { ...lane, distance: nextDist };
        })
      );
    }, 260);
    return () => window.clearInterval(timer);
  }, [gameState, score, onFinish]);

  const slashLane = useCallback(
    (laneId: number) => {
      if (gameState !== 'PLAYING') return;
      sound.playStep(1.3);
      setLanes((prev) =>
        prev.map((lane) => {
          if (lane.laneId !== laneId) return lane;
          const nextHp = lane.hp - 1;
          if (nextHp <= 0) {
            sound.playSuccess();
            const nextScore = score + 140;
            const nextCleared = clearedCount + 1;
            setScore(nextScore);
            setClearedCount(nextCleared);
            setResonance((r) => Math.min(100, r + 20));
            if (nextCleared >= TARGET_CLEARS) {
              sound.playVictory();
              setGameState('GAME_OVER');
              onFinish(nextScore + relayHp * 3, true);
            }
            return {
              ...lane,
              distance: 95,
              hp: Math.random() > 0.45 ? 2 : 1,
            };
          }
          return { ...lane, hp: nextHp, distance: Math.min(95, lane.distance + 8) };
        })
      );
    },
    [gameState, score, clearedCount, relayHp, onFinish]
  );

  const triggerStarfallUltimate = () => {
    if (gameState !== 'PLAYING' || resonance < 100) return;
    sound.playVictory();
    setResonance(0);
    const nextCleared = clearedCount + 4;
    const nextScore = score + 560;
    setClearedCount(nextCleared);
    setScore(nextScore);
    setLanes((prev) =>
      prev.map((l) => ({
        ...l,
        distance: 96,
        hp: 2,
      }))
    );
    if (nextCleared >= TARGET_CLEARS) {
      setGameState('GAME_OVER');
      onFinish(nextScore + relayHp * 3, true);
    }
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const onKey = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        slashLane(parseInt(e.key, 10));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, slashLane]);

  if (gameState === 'TITLE_MENU') {
    return (
      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <p className="font-mono-tabular text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'MINIGAME ĐI KÈM SỰ KIỆN' : 'COMPANION EVENT MINIGAME'} · {meta.genreVI}
          </p>
          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#e6e2f5]">
            {lang === 'VI' ? meta.titleVI : meta.titleEN}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#a79fc7]">{meta.shortDescVI}</p>
          <div className="mt-4 space-y-1.5 border-t border-[#3a2f6b] pt-3.5 text-xs text-[#a79fc7]">
            {meta.rulesVI.map((rule, idx) => (
              <p key={idx}>
                {idx + 1}. {rule}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a2f6b] pt-4">
          <div className="text-xs text-[#cfb1f1]">
            {lang === 'VI' ? 'Thưởng hoàn thành:' : 'Completion Reward:'}{' '}
            <span className="font-mono-tabular font-semibold">+{meta.rewardDiamonds} 💎</span> · {meta.keepsakeNameVI}
          </div>
          <button
            type="button"
            onClick={startDefense}
            className="inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          >
            <Shield className="h-4 w-4" />
            <span>{lang === 'VI' ? 'Bắt Đầu Phòng Tuyến' : 'Start Defense'}</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    const victory = relayHp > 0 && clearedCount >= TARGET_CLEARS;
    return (
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <Zap className="h-9 w-9 text-[#cfb1f1]" />
        <h3 className="mt-3 font-display text-xl font-bold text-[#e6e2f5]">
          {victory ? 'Trạm Tiếp Sóng Linkon Được Bảo Vệ Tuyệt Đối!' : 'Phòng Tuyến Bị Xâm Nhập'}
        </h3>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border border-[#3a2f6b] bg-[#07060f] px-5 py-2.5 font-mono-tabular text-xs sm:text-sm">
          <span>Điểm: <strong className="text-[#cfb1f1]">{score}</strong></span>
          <span>·</span>
          <span>Thanh tẩy: <strong>{clearedCount}/{TARGET_CLEARS}</strong></span>
          <span>·</span>
          <span>Thưởng: <strong className="text-[#a964f7]">+{victory ? meta.rewardDiamonds : 120} 💎</strong></span>
        </div>
        <button
          type="button"
          onClick={startDefense}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#a964f7] px-5 py-2.5 text-xs font-semibold text-[#07060f] transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{lang === 'VI' ? 'Chơi lại' : 'Play Again'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3a2f6b] pb-2.5 font-mono-tabular text-xs">
        <div className="flex items-center gap-3 text-[#e6e2f5]">
          <span>Thanh tẩy: <strong>{clearedCount}/{TARGET_CLEARS}</strong></span>
          <span>·</span>
          <span>Trạm: <strong className={relayHp > 40 ? 'text-emerald-300' : 'text-rose-400'}>HP {relayHp}/100</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>Evol: <strong className="text-amber-300">{resonance}%</strong></span>
          <button
            type="button"
            disabled={resonance < 100}
            onClick={triggerStarfallUltimate}
            className={`px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap ${
              resonance >= 100
                ? 'cursor-pointer bg-amber-400 text-[#07060f]'
                : 'cursor-not-allowed border border-[#3a2f6b] text-[#786f99]'
            }`}
          >
            Bão Sao Băng (100%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {lanes.map((lane) => {
          const danger = lane.distance < 35;
          return (
            <button
              key={lane.laneId}
              type="button"
              onClick={() => slashLane(lane.laneId)}
              className={`flex min-h-[72px] cursor-pointer flex-col justify-between border p-3 text-left transition-colors ${
                danger
                  ? 'border-rose-500 bg-rose-950/25'
                  : 'border-[#3a2f6b] bg-[#07060f] hover:border-[#a964f7]'
              }`}
            >
              <div className="flex w-full items-center justify-between font-mono-tabular text-xs">
                <span className="text-[#cfb1f1]">
                  [Phím {lane.laneId}] {lane.nameVI}
                </span>
                <span className={danger ? 'text-rose-300 font-bold' : 'text-[#a79fc7]'}>
                  {lane.distance}m · Giáp {lane.hp}
                </span>
              </div>
              <div className="my-1.5 h-2 w-full bg-[#1a1233]">
                <div
                  className={`h-full transition-all duration-150 ${
                    danger ? 'bg-rose-500' : 'bg-[#a964f7]'
                  }`}
                  style={{ width: `${100 - lane.distance}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-[#e6e2f5]">
                ⚡ Nhấn tung Trảm Kích Ánh Sáng
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// EMBEDDED EVENT MINIGAME PANEL
// ============================================================================
export const MinigameArcade: React.FC<SingleMinigamePanelProps> = ({
  lang,
  activeMinigameId,
  onSelectMinigame,
  onCompleteMinigame,
  unlockedKeepsakes,
  highScores,
}) => {
  const currentMeta =
    MINIGAMES_LIST.find((m) => m.id === activeMinigameId) || MINIGAMES_LIST[0];

  const handleFinish = (score: number, victory: boolean) => {
    const diamonds = victory
      ? currentMeta.rewardDiamonds
      : Math.floor(currentMeta.rewardDiamonds / 3);
    onCompleteMinigame(currentMeta.id, score, diamonds, victory ? currentMeta.keepsakeId : '');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Compact Minigame Switcher Bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {MINIGAMES_LIST.map((game) => {
          const isActive = game.id === activeMinigameId;
          const isUnlocked = unlockedKeepsakes.includes(game.keepsakeId);
          return (
            <button
              key={game.id}
              type="button"
              onMouseEnter={() => sound.playHover()}
              onClick={() => {
                sound.playSelect();
                onSelectMinigame(game.id);
              }}
              className={`relay-card relay-card-interactive flex cursor-pointer flex-col justify-between p-2.5 text-left ${
                isActive ? 'border-[#a964f7] bg-[#1a1233]' : 'bg-[#0e0b1c]'
              }`}
            >
              <div className="flex items-center justify-between font-mono-tabular text-[10px] text-[#cfb1f1]">
                <span>GAME {game.indexNumber}</span>
                <span>{isUnlocked ? '✓ ĐÃ MỞ' : `+${game.rewardDiamonds}💎`}</span>
              </div>
              <p className="mt-1 font-display text-xs font-bold text-[#e6e2f5] truncate">
                {lang === 'VI' ? game.titleVI : game.titleEN}
              </p>
              <p className="mt-0.5 font-mono-tabular text-[10px] text-[#a79fc7]">
                {lang === 'VI' ? 'Kỷ lục' : 'Best'}: {highScores[game.id] || 0}
              </p>
            </button>
          );
        })}
      </div>

      {/* Playable Game Box */}
      <div className="relay-card bg-[#0e0b1c]">
        {activeMinigameId === 'tiptap-hop' && (
          <TiptapHopGame lang={lang} meta={currentMeta} onFinish={handleFinish} />
        )}
        {activeMinigameId === 'starlight-bakery' && (
          <StarlightBakeryGame lang={lang} meta={currentMeta} onFinish={handleFinish} />
        )}
        {activeMinigameId === 'midnight-claw' && (
          <MidnightClawGame lang={lang} meta={currentMeta} onFinish={handleFinish} />
        )}
        {activeMinigameId === 'philos-cipher' && (
          <PhilosCipherGame lang={lang} meta={currentMeta} onFinish={handleFinish} />
        )}
        {activeMinigameId === 'lightblade-defense' && (
          <LightbladeDefenseGame lang={lang} meta={currentMeta} onFinish={handleFinish} />
        )}
      </div>
    </div>
  );
};
