import { AppLang, ROBOT_TOUCH_I18N } from '../data/robotTouchI18n';

// ============================================================================
// Singleton Image Cache (loaded once across the entire session)
// ============================================================================
const BG_IMAGE_URL = '/assets/robot-touch/bg.jpg';
const ROBOT_IMAGE_URL = '/assets/robot-touch/robot-cutout.png';
const ROBOT2_IMAGE_URL =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794543006/robot-2.webp';
const ROBOT3_IMAGE_URL =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794544723/robot-3.webp';
const ROBOT_X3_IMAGE_URL =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794545764/robot-x3.webp';
const ROBOT_GOLD_IMAGE_URL =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794546027/robot-gold.webp';

let cachedRobotImg: HTMLImageElement | null = null;
let cachedRobot2Img: HTMLImageElement | null = null;
let cachedRobot3Img: HTMLImageElement | null = null;
let cachedRobotX3Img: HTMLImageElement | null = null;
let cachedRobotGoldImg: HTMLImageElement | null = null;
let cachedBgImg: HTMLImageElement | null = null;
let preloadPromise: Promise<void> | null = null;

export function preloadRobotTouchAssets(): Promise<void> {
  if (preloadPromise) return preloadPromise;

  preloadPromise = new Promise((resolve) => {
    let remaining = 6;
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
    };

    const bg = new Image();
    bg.decoding = 'async';
    bg.onload = bg.onerror = done;
    bg.src = BG_IMAGE_URL;
    cachedBgImg = bg;

    const robot = new Image();
    robot.decoding = 'async';
    robot.onload = robot.onerror = done;
    robot.src = ROBOT_IMAGE_URL;
    cachedRobotImg = robot;

    const robot2 = new Image();
    robot2.decoding = 'async';
    robot2.onload = robot2.onerror = done;
    robot2.src = ROBOT2_IMAGE_URL;
    cachedRobot2Img = robot2;

    const robot3 = new Image();
    robot3.decoding = 'async';
    robot3.onload = robot3.onerror = done;
    robot3.src = ROBOT3_IMAGE_URL;
    cachedRobot3Img = robot3;

    const robotX3 = new Image();
    robotX3.decoding = 'async';
    robotX3.onload = robotX3.onerror = done;
    robotX3.src = ROBOT_X3_IMAGE_URL;
    cachedRobotX3Img = robotX3;

    const robotGold = new Image();
    robotGold.decoding = 'async';
    robotGold.onload = robotGold.onerror = done;
    robotGold.src = ROBOT_GOLD_IMAGE_URL;
    cachedRobotGoldImg = robotGold;
  });

  return preloadPromise;
}

function getRobotImage(): HTMLImageElement {
  if (!cachedRobotImg) {
    const img = new Image();
    img.decoding = 'async';
    img.src = ROBOT_IMAGE_URL;
    cachedRobotImg = img;
  }
  return cachedRobotImg;
}

function getRobot2Image(): HTMLImageElement {
  if (!cachedRobot2Img) {
    const img = new Image();
    img.decoding = 'async';
    img.src = ROBOT2_IMAGE_URL;
    cachedRobot2Img = img;
  }
  return cachedRobot2Img;
}

function getRobot3Image(): HTMLImageElement {
  if (!cachedRobot3Img) {
    const img = new Image();
    img.decoding = 'async';
    img.src = ROBOT3_IMAGE_URL;
    cachedRobot3Img = img;
  }
  return cachedRobot3Img;
}

function getRobotX3Image(): HTMLImageElement {
  if (!cachedRobotX3Img) {
    const img = new Image();
    img.decoding = 'async';
    img.src = ROBOT_X3_IMAGE_URL;
    cachedRobotX3Img = img;
  }
  return cachedRobotX3Img;
}

function getRobotGoldImage(): HTMLImageElement {
  if (!cachedRobotGoldImg) {
    const img = new Image();
    img.decoding = 'async';
    img.src = ROBOT_GOLD_IMAGE_URL;
    cachedRobotGoldImg = img;
  }
  return cachedRobotGoldImg;
}

// ============================================================================
// Constants & $P Point-Cloud Recognizer Templates (1:1 from index.html)
// ============================================================================
const W = 1000;
const H = 1439;
const WIN = { x0: 166, x1: 833, y0: 40, y1: 880 };
const PAD = { x: 170, y: 930, w: 650, h: 470 };
const PAUSE = 2;
export const STAR = 35000;
const OVERLOAD_PTS = 4300;
const OVERLOAD_DURATION = 10;
export const SKILL_COOLDOWN = 15;
export const AOE_SLOW_DURATION = 6;
const AOE_SLOW_SPEED_MULT = 0.32;
const OVERLOAD_GLYPHS: readonly GlyphKey[] = ['I', 'U', '♡'];
const ROBOT_STD_W = 184;
const ROBOT_STD_W_PHONE = 136;
const ROBOT_X3_W = 372;
const ROBOT_X3_W_PHONE = 216;
const RUSH_COL_STEP = 148;
const RUSH_COL_STEP_PHONE = 110;
const RUSH_SPEED = 160;
const ROBOT_LANES = [490, 630, 770] as const;
const LANE_REENTRY_X = WIN.x0 + 110;
const X3_SCREEN_POS: ReadonlyArray<readonly [number, number]> = [
  [0.409, 0.374], // top-center visor
  [0.180, 0.717], // bottom-left visor
  [0.709, 0.648], // bottom-right visor
];
const N = 32;

type Point2D = [number, number];
type GlyphKey = 'I' | '/' | '\\' | 'U' | 'O' | 'Z' | 'P' | '→' | '♡' | '~' | '🐰';

interface CloudPoint {
  x: number;
  y: number;
  id: number;
}

const circ: Point2D[] = [];
for (let i = 0; i <= 24; i++) {
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
  circ.push([50 + 42 * Math.cos(a), 50 + 42 * Math.sin(a)]);
}

const G: Record<GlyphKey, Point2D[][]> = {
  I: [
    [
      [50, 5],
      [50, 95],
    ],
  ],
  '/': [
    [
      [85, 5],
      [15, 95],
    ],
  ],
  '\\': [
    [
      [15, 5],
      [85, 95],
    ],
  ],
  U: [
    [
      [15, 10],
      [15, 70],
      [30, 92],
      [70, 92],
      [85, 70],
      [85, 10],
    ],
  ],
  O: [circ],
  Z: [
    [
      [15, 10],
      [85, 10],
      [15, 90],
      [85, 90],
    ],
  ],
  P: [
    [
      [31, 100],
      [31, 0],
      [70, 21],
      [48, 41],
    ],
  ],
  '→': [
    [
      [0, 49],
      [98, 44],
    ],
    [
      [52, 12],
      [99, 44],
      [57, 88],
    ],
  ],
  '♡': [
    [
      [37.5, 86.7],
      [4.9, 52.4],
      [0.5, 28.3],
      [7.4, 13.6],
      [18.4, 8],
      [34.3, 10],
      [48.3, 19],
      [66.2, 8.7],
      [80.4, 7.5],
      [93.9, 16.1],
      [99.8, 28.3],
      [94.4, 54.1],
      [68.6, 82.3],
      [56.9, 92],
    ],
  ],
  '~': [
    [
      [0, 49.5],
      [30.7, 48.5],
      [43.2, 26],
      [64.4, 74],
      [76.6, 49.9],
      [100, 48.9],
    ],
  ],
  '🐰': [
    [
      [21, 31],
      [17, 16],
      [21, 4],
      [33, 4],
      [45, 13],
      [58, 1],
      [65, 0],
      [72, 4],
      [72, 35],
      [88, 45],
      [97, 58],
      [98, 75],
      [94, 82],
      [82, 92],
      [64, 98],
      [43, 100],
      [21, 96],
      [6, 85],
      [2, 77],
      [2, 62],
      [7, 53],
    ],
  ],
};

const TIERS: GlyphKey[][] = [
  ['I', '/', '\\', 'U', 'O', 'Z'],
  ['P', '→'],
  ['~', '♡'],
  ['🐰'],
];

function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function resample(pts: CloudPoint[], n: number): CloudPoint[] {
  let L = 0;
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].id === pts[i - 1].id) L += dist(pts[i - 1], pts[i]);
  }
  const I = L / (n - 1);
  let D = 0;
  const out: CloudPoint[] = [pts[0]];
  pts = pts.slice();
  for (let i = 1; i < pts.length; i++) {
    if (pts[i].id === pts[i - 1].id) {
      const d = dist(pts[i - 1], pts[i]);
      if (D + d >= I && d > 0) {
        const t = (I - D) / d;
        const q: CloudPoint = {
          x: pts[i - 1].x + t * (pts[i].x - pts[i - 1].x),
          y: pts[i - 1].y + t * (pts[i].y - pts[i - 1].y),
          id: pts[i].id,
        };
        out.push(q);
        pts.splice(i, 0, q);
        D = 0;
      } else {
        D += d;
      }
    }
  }
  while (out.length < n) out.push(pts[pts.length - 1]);
  return out.slice(0, n);
}

function norm(pts: CloudPoint[]): CloudPoint[] {
  pts = resample(pts, N);
  let x0 = 1e9;
  let y0 = 1e9;
  let x1 = -1e9;
  let y1 = -1e9;
  pts.forEach((p) => {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  });
  const s = Math.max(x1 - x0, y1 - y0, 1e-6);
  pts = pts.map((p) => ({ x: (p.x - x0) / s, y: (p.y - y0) / s, id: p.id }));
  const cx = pts.reduce((a, p) => a + p.x, 0) / N;
  const cy = pts.reduce((a, p) => a + p.y, 0) / N;
  return pts.map((p) => ({ x: p.x - cx, y: p.y - cy, id: p.id }));
}

function cloud(a: CloudPoint[], b: CloudPoint[], st: number): number {
  const m = new Array<boolean>(N).fill(false);
  let sum = 0;
  let i = st;
  do {
    let mn = 1e9;
    let k = -1;
    for (let j = 0; j < N; j++) {
      if (!m[j]) {
        const d = dist(a[i], b[j]);
        if (d < mn) {
          mn = d;
          k = j;
        }
      }
    }
    m[k] = true;
    const w = 1 - (((i - st + N) % N) / N);
    sum += w * mn;
    i = (i + 1) % N;
  } while (i !== st);
  return sum;
}

function cloudDist(a: CloudPoint[], b: CloudPoint[]): number {
  const e = 0.5;
  const s = Math.floor(Math.pow(N, 1 - e));
  let mn = 1e9;
  for (let i = 0; i < N; i += s) {
    mn = Math.min(mn, cloud(a, b, i), cloud(b, a, i));
  }
  return mn;
}

const TPL: Record<GlyphKey, CloudPoint[]> = {} as Record<GlyphKey, CloudPoint[]>;
(Object.keys(G) as GlyphKey[]).forEach((k) => {
  const pts: CloudPoint[] = [];
  G[k].forEach((s, i) => {
    for (let j = 0; j < s.length; j++) {
      pts.push({ x: s[j][0], y: s[j][1], id: i });
    }
  });
  TPL[k] = norm(pts);
});

function recognize(
  strokes: Array<Array<{ x: number; y: number }>>,
  allowed: GlyphKey[]
): { k: GlyphKey | null; d: number } | null {
  const pts: CloudPoint[] = [];
  strokes.forEach((s, i) => s.forEach((p) => pts.push({ x: p.x, y: p.y, id: i })));
  if (pts.length < 3) return null;
  const c = norm(pts);
  let best: GlyphKey | null = null;
  let bd = 1e9;
  allowed.forEach((k) => {
    const d = cloudDist(c, TPL[k]);
    if (d < bd) {
      bd = d;
      best = k;
    }
  });
  return { k: best, d: bd };
}

// ============================================================================
// Encapsulated Game Instance Factory
// ============================================================================
interface RobotEntity {
  x: number;
  y: number;
  k: GlyphKey;
  v: number;
  stopX: number;
  s: 0 | 1 | 2;
  pt: number;
  bonus: boolean;
  kind: 1 | 2 | 3 | 4 | 5;
  hp: number;
  pts: number;
  kb: number;
  kbV: number;
  hitT: number;
  screens?: Array<GlyphKey | null>;
  gone?: number;
}

interface ParticleEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  l: number;
  c?: string;
}

interface BonusFloatText {
  x: number;
  y: number;
  l: number;
  text?: string;
  color?: string;
}

export interface RobotTouchGameOverResult {
  score: number;
  points: number;
  stars: number;
  bestPoints: number;
}

export interface RobotTouchSkillState {
  aoeSlowCd: number;
  fullSweepCd: number;
  aoeSlowActive: number;
}

export interface RobotTouchInstance {
  setLang: (lang: AppLang) => void;
  restart: () => void;
  retreat: () => RobotTouchGameOverResult;
  triggerAoeSlow: () => boolean;
  triggerFullSweep: () => boolean;
  destroy: () => void;
}

const BEST_STORAGE_KEY = 'tsdt_robot_touch_best_count';
const BEST_POINTS_STORAGE_KEY = 'tsdt_robot_touch_best_points';

export function mountRobotTouchGame(
  cv: HTMLCanvasElement,
  initialLang: AppLang,
  onCorrectHit?: () => void,
  onGameOver?: (result: RobotTouchGameOverResult) => void,
  onSkillStateChange?: (state: RobotTouchSkillState) => void
): RobotTouchInstance {
  const ctx = cv.getContext('2d')!;
  const robotImg = getRobotImage();
  const robot2Img = getRobot2Image();
  const robot3Img = getRobot3Image();
  const robotX3Img = getRobotX3Image();
  const robotGoldImg = getRobotGoldImage();
  let currentLang: AppLang = initialLang;
  let scaleX = 1;
  let scaleY = 1;
  let isoX = 1;
  let isoY = 1;

  // Game state variables (starts directly in 'play' when entering Defense Intercept)
  let st: 'play' | 'over' = 'play';
  let robots: RobotEntity[] = [];
  let parts: ParticleEntity[] = [];
  let strokes: Array<Array<{ x: number; y: number }>> = [];
  let cur: Array<{ x: number; y: number }> | null = null;
  let activePointerId: number | null = null;
  let timer: number | null = null;
  let score = 0;
  let points = 0;
  let best = 0;
  let bestPoints = 0;
  try {
    const savedBest = window.localStorage.getItem(BEST_STORAGE_KEY);
    if (savedBest) {
      const parsed = parseInt(savedBest, 10);
      if (!Number.isNaN(parsed) && parsed > 0) best = parsed;
    }
    const savedBestPoints = window.localStorage.getItem(BEST_POINTS_STORAGE_KEY);
    if (savedBestPoints) {
      const parsedPts = parseInt(savedBestPoints, 10);
      if (!Number.isNaN(parsedPts) && parsedPts > 0) bestPoints = parsedPts;
    }
    bestPoints = Math.max(bestPoints, best * 200);
  } catch {
    // Ignore storage read errors
  }

  let tl = 90;
  let bn: BonusFloatText[] = [];
  let tp = 0;
  let ns = 0;
  let sp = 0;
  let batteryCharge = 0;
  let batteryRatio = 0;
  let isOverloadRush = false;
  let overloadTimer = 0;
  let overloadAnim = 0;
  let lastRushGlyph: GlyphKey | null = null;
  let spawnT = 0;
  let aoeSlowCd = 0;
  let fullSweepCd = 0;
  let aoeSlowTimer = 0;
  let aoeSlowWave = 0;
  let fullSweepFx = 0;
  let lastSkillEmitAt = 0;
  let hadActiveSkillTimers = false;
  let flash: { t: number; c: string } | null = null;
  let hitBubble: { k: GlyphKey; t: number; maxT: number } | null = null;
  let missScribble: { t: number; maxT: number } | null = null;
  let prevFrameTime = 0;
  let rafId: number | null = null;
  let destroyed = false;
  let isPhoneView = window.innerWidth < 640;

  const getStdRobotW = () => (isPhoneView ? ROBOT_STD_W_PHONE : ROBOT_STD_W);
  const getX3RobotW = () => (isPhoneView ? ROBOT_X3_W_PHONE : ROBOT_X3_W);
  const getRushColStep = () =>
    isPhoneView ? RUSH_COL_STEP_PHONE : RUSH_COL_STEP;

  function fit() {
    if (destroyed) return;
    isPhoneView = window.innerWidth < 640;
    const r = cv.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const d = window.devicePixelRatio || 1;
    cv.width = Math.round(r.width * d);
    cv.height = Math.round(r.height * d);
    scaleX = cv.width / W;
    scaleY = cv.height / H;
    const minScale = Math.min(scaleX, scaleY);
    isoX = minScale / scaleX;
    isoY = minScale / scaleY;
  }

  const allowedNow = (): GlyphKey[] => TIERS.slice(0, 1 + Math.floor(score / 4)).flat();

  function spawn(): boolean {
    // Only allow a lane to spawn a new robot when every existing robot in that lane
    // has already reached near the left edge, preventing same-lane overlap.
    const openLanes = ROBOT_LANES.filter(
      (ly) =>
        !robots.some(
          (r) => Math.abs(r.y - ly) < 20 && r.x > LANE_REENTRY_X
        )
    );
    if (openLanes.length === 0) return false;

    const al = allowedNow();
    const k = al[Math.floor(Math.random() * al.length)];
    const roll = Math.random();
    const kind: 1 | 2 | 3 | 4 | 5 =
      score >= 3 && roll < 0.14
        ? 4
        : score >= 2 && roll < 0.3
          ? 3
          : score >= 1 && roll < 0.52
            ? 2
            : score >= 1 && roll < 0.72
              ? 5
              : 1;
    const hp = kind === 4 || kind === 3 ? 3 : kind === 2 ? 2 : 1;
    const pts =
      kind === 4 || kind === 3
        ? 600
        : kind === 2
          ? 400
          : kind === 5
            ? 300
            : 200;

    let screens: Array<GlyphKey | null> | undefined;
    if (kind === 4) {
      const shuffled = [...al].sort(() => Math.random() - 0.5);
      while (shuffled.length < 3) {
        shuffled.push(al[shuffled.length % al.length]);
      }
      screens = [shuffled[0], shuffled[1], shuffled[2]];
    }

    const y = openLanes[Math.floor(Math.random() * openLanes.length)];

    robots.push({
      x:
        kind === 4
          ? WIN.x1 + getX3RobotW() * 0.5
          : WIN.x1 + getStdRobotW() * 0.55,
      y,
      k: screens ? (screens[0] as GlyphKey) : k,
      v: 70 + Math.min(score * 3.2, 140) + Math.random() * 25,
      stopX:
        Math.random() < 0.8
          ? WIN.x0 + 130 + Math.random() * (WIN.x1 - WIN.x0 - 280)
          : 0,
      s: 0,
      pt: 0,
      bonus: Math.random() < 0.22,
      kind,
      hp,
      pts,
      kb: 0,
      kbV: 0,
      hitT: 0,
      screens,
    });
    return true;
  }

  function spawnOverloadCluster() {
    const candidates = OVERLOAD_GLYPHS.filter((g) => g !== lastRushGlyph);
    const pool = candidates.length > 0 ? candidates : OVERLOAD_GLYPHS;
    const k = pool[Math.floor(Math.random() * pool.length)];
    lastRushGlyph = k;

    const colStep = getRushColStep();
    const rightMost = robots.reduce((mx, r) => Math.max(mx, r.x), WIN.x1 - 60);
    const baseX = Math.max(
      WIN.x1 + Math.ceil(getStdRobotW() * 0.55),
      rightMost + colStep
    );

    for (let row = 0; row < ROBOT_LANES.length; row++) {
      for (let col = 0; col < 3; col++) {
        robots.push({
          x: baseX + col * colStep,
          y: ROBOT_LANES[row],
          k,
          v: RUSH_SPEED,
          stopX: 0,
          s: 0,
          pt: 0,
          bonus: false,
          kind: 5,
          hp: 1,
          pts: 300,
          kb: 0,
          kbV: 0,
          hitT: 0,
        });
      }
    }
  }

  function grantKillProgress(killedPts: number) {
    if (isOverloadRush || killedPts <= 0) return;
    batteryCharge = Math.min(OVERLOAD_PTS, batteryCharge + killedPts);
    if (batteryCharge >= OVERLOAD_PTS) {
      isOverloadRush = true;
      overloadTimer = OVERLOAD_DURATION;
      batteryRatio = 1;
      lastRushGlyph = null;
      spawnT = 0;

      // Clear all active non-gold robots from the street when Overload Rush begins
      robots.forEach((other) => {
        if (other.kind !== 5) {
          boom(other, 20, '#ffd976');
        }
      });
      robots = robots.filter((other) => other.kind === 5);
    }
  }

  function emitSkillState(nowMs = performance.now(), force = false) {
    if (!onSkillStateChange) return;
    const anyActive = aoeSlowCd > 0 || fullSweepCd > 0 || aoeSlowTimer > 0;
    if (!force) {
      if (!anyActive && !hadActiveSkillTimers) return;
      if (anyActive && nowMs - lastSkillEmitAt < 75) return;
    }
    lastSkillEmitAt = nowMs;
    hadActiveSkillTimers = anyActive;
    onSkillStateChange({
      aoeSlowCd,
      fullSweepCd,
      aoeSlowActive: aoeSlowTimer,
    });
  }

  function activateAoeSlow(): boolean {
    if (st !== 'play' || aoeSlowTimer > 0 || aoeSlowCd > 0) return false;
    aoeSlowTimer = AOE_SLOW_DURATION;
    aoeSlowCd = 0;
    aoeSlowWave = 0.55;
    emitSkillState(performance.now(), true);
    return true;
  }

  function activateFullSweep(): boolean {
    if (st !== 'play' || fullSweepCd > 0) return false;
    fullSweepCd = SKILL_COOLDOWN;
    fullSweepFx = 0.42;

    const onScreen = robots.filter((r) => {
      const halfW = (r.kind === 4 ? getX3RobotW() : getStdRobotW()) * 0.5;
      return r.x - halfW < WIN.x1;
    });

    if (onScreen.length > 0) {
      const killedSet = new Set(onScreen);
      let batchKilledPts = 0;
      onScreen.forEach((t) => {
        boom(
          t,
          28,
          t.kind === 3
            ? '#ff9ef5'
            : t.kind === 2 || t.kind === 5
              ? '#ffe082'
              : '#5cf0ff'
        );
        if (t.bonus) {
          tl += 5;
          tp = 1;
          bn.push({ x: t.x, y: t.y, l: 1.2 });
        }
        bn.push({
          x: t.x,
          y: t.y - (t.bonus ? 42 : 0),
          l: 1.0,
          text: `+${t.pts}`,
          color: '#ffe36e',
        });
        score++;
        points += t.pts;
        batchKilledPts += t.pts;
      });
      robots = robots.filter((r) => !killedSet.has(r));
      if (batchKilledPts > 0) grantKillProgress(batchKilledPts);
      flash = { t: 0.45, c: '#5cf0ff' };
      missScribble = null;
      onCorrectHit?.();
    } else {
      flash = { t: 0.3, c: '#5cf0ff' };
    }

    emitSkillState(performance.now(), true);
    return true;
  }

  function resetToPlay() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    robots = [];
    parts = [];
    strokes = [];
    cur = null;
    activePointerId = null;
    score = 0;
    points = 0;
    tl = 90;
    bn = [];
    tp = 0;
    ns = 0;
    sp = 0;
    batteryCharge = 0;
    batteryRatio = 0;
    isOverloadRush = false;
    overloadTimer = 0;
    overloadAnim = 0;
    lastRushGlyph = null;
    spawnT = 0;
    aoeSlowCd = 0;
    fullSweepCd = 0;
    aoeSlowTimer = 0;
    aoeSlowWave = 0;
    fullSweepFx = 0;
    flash = null;
    hitBubble = null;
    missScribble = null;
    st = 'play';
    emitSkillState(performance.now(), true);
  }

  function resetClean() {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    robots = [];
    parts = [];
    strokes = [];
    cur = null;
    activePointerId = null;
    score = 0;
    points = 0;
    tl = 90;
    bn = [];
    tp = 0;
    ns = 0;
    sp = 0;
    batteryCharge = 0;
    batteryRatio = 0;
    isOverloadRush = false;
    overloadTimer = 0;
    overloadAnim = 0;
    lastRushGlyph = null;
    spawnT = 0;
    aoeSlowCd = 0;
    fullSweepCd = 0;
    aoeSlowTimer = 0;
    aoeSlowWave = 0;
    fullSweepFx = 0;
    flash = null;
    hitBubble = null;
    missScribble = null;
    st = 'play';
    prevFrameTime = 0;
    emitSkillState(performance.now(), true);
  }

  function finishRun(): RobotTouchGameOverResult {
    const finalPoints = points;
    const stars = Math.min(3, Math.floor(finalPoints / STAR));
    if (st === 'play') {
      st = 'over';
      if (score > best) {
        best = score;
        try {
          window.localStorage.setItem(BEST_STORAGE_KEY, String(best));
        } catch {
          // Ignore storage write errors
        }
      }
      if (finalPoints > bestPoints) {
        bestPoints = finalPoints;
        try {
          window.localStorage.setItem(BEST_POINTS_STORAGE_KEY, String(bestPoints));
        } catch {
          // Ignore storage write errors
        }
      }
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      cur = null;
      activePointerId = null;
      strokes = [];
      hitBubble = null;
      missScribble = null;
    }
    const result: RobotTouchGameOverResult = {
      score,
      points: finalPoints,
      stars,
      bestPoints,
    };
    onGameOver?.(result);
    return result;
  }

  function boomAt(x: number, y: number, count = 26, color?: string) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * 6.28;
      const s = 60 + Math.random() * 260;
      parts.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        l: 1,
        c: color,
      });
    }
  }

  function boom(r: RobotEntity, count = 26, color?: string) {
    boomAt(r.x, r.y, count, color);
  }

  function getRobotGlyphs(r: RobotEntity): GlyphKey[] {
    return r.screens
      ? r.screens.filter((g): g is GlyphKey => g !== null)
      : [r.k];
  }

  function robotHasGlyph(r: RobotEntity, g: GlyphKey): boolean {
    return r.screens ? r.screens.includes(g) : r.k === g;
  }

  function ptr(e: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / Math.max(r.width, 1)) * W,
      y: ((e.clientY - r.top) / Math.max(r.height, 1)) * H,
    };
  }

  function inPad(p: { x: number; y: number }): boolean {
    return (
      p.x > PAD.x &&
      p.x < PAD.x + PAD.w &&
      p.y > PAD.y &&
      p.y < PAD.y + PAD.h
    );
  }

  function judge() {
    timer = null;
    const al = [...new Set(robots.flatMap(getRobotGlyphs))];
    const s = strokes;
    strokes = [];
    if (!al.length || !s.length) return;
    const r = recognize(s, al);
    if (!r || !r.k || r.d > 3.4) {
      flash = { t: 0.5, c: '#ff4d6d' };
      hitBubble = null;
      missScribble = { t: 0.6, maxT: 0.6 };
      return;
    }
    const matchedK = r.k;
    const targets = robots
      .filter((x) => robotHasGlyph(x, matchedK))
      .sort((a, b) => (b.bonus ? 1 : 0) - (a.bonus ? 1 : 0) || a.x - b.x);
    if (targets.length > 0) {
      let killedAny = false;
      let hitKind3Only = false;
      let hitKind4Only = false;
      let batchKilledPts = 0;
      for (const t of targets) {
        if (t.kind === 4 && t.screens) {
          const w = getX3RobotW();
          const h = (w * 1442) / 1965;
          t.screens = t.screens.map((g, idx) => {
            if (g === matchedK) {
              const [sxRatio, syRatio] = X3_SCREEN_POS[idx];
              const px = t.x + (-w / 2 + w * sxRatio) * isoX;
              const py = t.y + (-h / 2 + h * syRatio) * isoY;
              boomAt(px, py, 12, '#7df5ff');
              return null;
            }
            return g;
          });
          const remaining = t.screens.filter((g) => g !== null).length;
          t.hp = remaining;
          if (remaining > 0) {
            t.kb = 0.28;
            t.kbV = 560;
            t.hitT = 0.34;
            if (t.s === 1) t.s = 2;
            hitKind4Only = true;
            continue;
          }
          // All 3 screens cleared -> destroy robot-x3
          killedAny = true;
          boom(t, 30, '#7df5ff');
          if (t.bonus) {
            tl += 5;
            tp = 1;
            bn.push({ x: t.x, y: t.y, l: 1.2 });
          }
          bn.push({
            x: t.x,
            y: t.y - (t.bonus ? 42 : 0),
            l: 1.0,
            text: `+${t.pts}`,
            color: '#ffe36e',
          });
          const idx = robots.indexOf(t);
          if (idx !== -1) robots.splice(idx, 1);
          score++;
          points += t.pts;
          batchKilledPts += t.pts;
        } else if (t.hp > 1) {
          t.hp -= 1;
          t.kb = 0.28;
          t.kbV = 560;
          t.hitT = 0.34;
          if (t.s === 1) t.s = 2;

          const pool = allowedNow().filter((g) => g !== t.k);
          const fallbackPool = (['I', '/', '\\', 'U', 'O'] as GlyphKey[]).filter(
            (g) => g !== t.k
          );
          const candidates = pool.length > 0 ? pool : fallbackPool;
          t.k = candidates[Math.floor(Math.random() * candidates.length)];

          boom(t, 16, t.kind === 3 ? '#ffa6f6' : '#ffd976');
          if (t.kind === 3) hitKind3Only = true;
        } else {
          killedAny = true;
          boom(
            t,
            26,
            t.kind === 3
              ? '#ff9ef5'
              : t.kind === 2 || t.kind === 5
                ? '#ffe082'
                : '#5cf0ff'
          );
          if (t.bonus) {
            tl += 5;
            tp = 1;
            bn.push({ x: t.x, y: t.y, l: 1.2 });
          }
          bn.push({
            x: t.x,
            y: t.y - (t.bonus ? 42 : 0),
            l: 1.0,
            text: `+${t.pts}`,
            color: '#ffe36e',
          });
          const idx = robots.indexOf(t);
          if (idx !== -1) robots.splice(idx, 1);
          score++;
          points += t.pts;
          batchKilledPts += t.pts;
        }
      }
      if (batchKilledPts > 0) grantKillProgress(batchKilledPts);
      flash = {
        t: 0.5,
        c: killedAny
          ? '#5cf0ff'
          : hitKind3Only
            ? '#ffa6f6'
            : hitKind4Only
              ? '#7df5ff'
              : '#ffd976',
      };
      missScribble = null;
      hitBubble = { k: matchedK, t: 0.48, maxT: 0.48 };
      onCorrectHit?.();
    } else {
      flash = { t: 0.5, c: '#ff4d6d' };
      hitBubble = null;
      missScribble = { t: 0.6, maxT: 0.6 };
    }
  }

  const onPointerDown = (e: PointerEvent) => {
    const p = ptr(e);
    if (st !== 'play') return;
    if (cur !== null || activePointerId !== null) return;
    if (!inPad(p)) return;
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
    activePointerId = e.pointerId;
    cur = [p];
    strokes = [cur];
    hitBubble = null;
    missScribble = null;
    try {
      cv.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors on synthetic events
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!cur || (activePointerId !== null && e.pointerId !== activePointerId)) {
      return;
    }
    const p = ptr(e);
    p.x = Math.max(PAD.x, Math.min(PAD.x + PAD.w, p.x));
    p.y = Math.max(PAD.y, Math.min(PAD.y + PAD.h, p.y));
    cur.push(p);
  };

  const onPointerUp = (e: PointerEvent) => {
    if (!cur || (activePointerId !== null && e.pointerId !== activePointerId)) {
      return;
    }
    try {
      if (cv.hasPointerCapture?.(e.pointerId)) {
        cv.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore pointer capture release errors on synthetic events
    }
    cur = null;
    activePointerId = null;
    strokes = strokes.slice(-1);
    judge();
  };

  // Prevent mobile page scroll while drawing inside DRAW AREA
  const onTouchMove = (e: TouchEvent) => {
    if (cur || e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch) {
        const p = ptr(touch);
        if (cur || inPad(p)) {
          e.preventDefault();
        }
      }
    }
  };

  // ---- Drawing helpers (1:1 from index.html) ----
  function glyph(k: GlyphKey, cx: number, cy: number, sz: number) {
    const sm = (['O', 'U', '♡', '🐰'] as GlyphKey[]).includes(k);
    const f = (p: Point2D): [number, number] => [
      cx + ((p[0] - 50) / 100) * sz,
      cy + ((p[1] - 50) / 100) * sz,
    ];
    ctx.save();
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.shadowColor = '#2fd8ff';
    ctx.shadowBlur = sz * 0.22;
    (
      [
        ['#3fd0f5', sz * 0.15],
        ['#effdff', sz * 0.065],
      ] as Array<[string, number]>
    ).forEach(([c, w], j) => {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      if (j) ctx.shadowBlur = 0;
      G[k].forEach((s) => {
        const P = s.map(f);
        ctx.beginPath();
        ctx.moveTo(P[0][0], P[0][1]);
        if (sm && P.length > 2) {
          for (let i = 1; i < P.length - 1; i++) {
            ctx.quadraticCurveTo(
              P[i][0],
              P[i][1],
              (P[i][0] + P[i + 1][0]) / 2,
              (P[i][1] + P[i + 1][1]) / 2
            );
          }
          ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]);
        } else {
          P.slice(1).forEach((q) => ctx.lineTo(q[0], q[1]));
        }
        ctx.stroke();
      });
    });
    ctx.restore();
  }

  function badge(x: number, y: number) {
    ctx.save();
    const g = ctx.createLinearGradient(x, 0, x + 130, 0);
    g.addColorStop(0, 'rgba(70,12,36,.92)');
    g.addColorStop(0.35, 'rgba(22,34,52,.85)');
    g.addColorStop(1, 'rgba(22,34,52,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y - 19, 130, 38);
    ctx.fillStyle = '#7a1634';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + 19, y, 15, 0, 6.283);
    ctx.fill();
    ctx.stroke();
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + 19, y - 8);
    ctx.lineTo(x + 19, y);
    ctx.lineTo(x + 26, y + 3);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = '300 36px system-ui';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('+5s', x + 40, y + 2);
    ctx.restore();
  }

  function hourglass(x: number, y: number, R: number, f: number) {
    const w = R * 0.55;
    const h = R * 0.62;
    const hw = (yy: number) =>
      w * (1 - ((yy - (y - h)) / h) * 0.88) * (yy < y ? 1 : 0) +
      (yy >= y ? w * (0.12 + ((yy - y) / h) * 0.88) : 0);
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(50,8,28,.92)';
    ctx.strokeStyle = '#ff5d7a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, R, 0, 6.283);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    const a = y - h * f;
    const b = y + h - h * (1 - f);
    if (f > 0.02) {
      ctx.beginPath();
      ctx.moveTo(x - hw(a), a);
      ctx.lineTo(x + hw(a), a);
      ctx.lineTo(x + w * 0.12, y);
      ctx.lineTo(x - w * 0.12, y);
      ctx.fill();
    }
    if (f < 0.98) {
      ctx.beginPath();
      ctx.moveTo(x - hw(b), b);
      ctx.lineTo(x + hw(b), b);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x - w, y + h);
      ctx.fill();
    }
    if (f > 0.02 && f < 0.98) {
      ctx.fillRect(x - 1, y, 2, h * (1 - f) + 2);
    }
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x - w, y - h);
    ctx.lineTo(x + w, y - h);
    ctx.lineTo(x + w * 0.12, y);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x - w, y + h);
    ctx.lineTo(x - w * 0.12, y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function star(x: number, y: number, r: number, on: boolean, pu: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1 + pu * 0.45, 1 + pu * 0.45);
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? r * 0.45 : r;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.lineJoin = 'round';
    if (on) {
      ctx.shadowColor = '#5cf0ff';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#e9fdff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.strokeStyle = '#4fd0f5';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawChibiSpeechBubble(
    popScale: number,
    fadeAlpha: number,
    renderContent: (centerX: number, centerY: number) => void
  ) {
    const chibiWidthRatio = scaleX > 0 ? scaleY / scaleX : 1;
    const anchorX = 266 + 102 * chibiWidthRatio;
    const anchorY = 174;
    const bx = 14;
    const bw = 112;
    const by = -30;
    const bot = 30;
    const r = 30;
    const tailStartAngle = Math.PI * 0.72;
    const tailEndAngle = Math.PI * 0.86;
    const tailEndX = bx + r + r * Math.cos(tailEndAngle);
    const tailEndY = r * Math.sin(tailEndAngle);

    ctx.save();
    ctx.translate(anchorX, anchorY);
    ctx.scale(isoX * popScale, isoY * popScale);
    ctx.globalAlpha = fadeAlpha;
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.lineTo(bx + bw - r, by);
    ctx.arc(bx + bw - r, 0, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(bx + r, bot);
    ctx.arc(bx + r, 0, r, Math.PI / 2, tailStartAngle);
    ctx.lineTo(-2, 25);
    ctx.lineTo(tailEndX, tailEndY);
    ctx.arc(bx + r, 0, r, tailEndAngle, Math.PI * 1.5);
    ctx.closePath();

    const fillGrad = ctx.createLinearGradient(0, by, bx + bw, bot);
    fillGrad.addColorStop(0, 'rgba(164, 108, 255, 0.62)');
    fillGrad.addColorStop(0.55, 'rgba(116, 142, 250, 0.5)');
    fillGrad.addColorStop(1, 'rgba(84, 212, 255, 0.45)');
    ctx.fillStyle = fillGrad;
    ctx.shadowColor = 'rgba(130, 145, 255, 0.72)';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    const borderGrad = ctx.createLinearGradient(bx, by, bx + bw, bot);
    borderGrad.addColorStop(0, '#e5b3ff');
    borderGrad.addColorStop(0.45, '#98b8ff');
    borderGrad.addColorStop(1, '#7df5ff');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Subtle cyberpunk glitch scanlines on outer edges
    ctx.fillStyle = 'rgba(92, 240, 255, 0.78)';
    ctx.fillRect(bx + bw - 18, -14, 25, 2);
    ctx.fillRect(bx - 5, 22, 17, 1.8);
    ctx.fillStyle = 'rgba(218, 132, 255, 0.72)';
    ctx.fillRect(bx + bw - 8, 12, 19, 2);
    ctx.fillRect(bx + 12, -32, 22, 1.5);

    renderContent(bx + bw / 2, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    if (destroyed) return;
    const dt = Math.min((now - (prevFrameTime || now)) / 1000, 0.05);
    prevFrameTime = now;

    ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
    ctx.clearRect(0, 0, W, H);

    if (st === 'play') {
      robots = robots.filter((r) => !r.gone);
      tl -= dt;
      if (tl <= 0) {
        tl = 0;
        finishRun();
      }
      if (aoeSlowTimer > 0) {
        const nextActive = aoeSlowTimer - dt;
        if (nextActive > 0) {
          aoeSlowTimer = nextActive;
        } else {
          aoeSlowTimer = 0;
          aoeSlowCd = Math.max(0, SKILL_COOLDOWN + nextActive);
        }
      } else if (aoeSlowCd > 0) {
        aoeSlowCd = Math.max(0, aoeSlowCd - dt);
      }
      if (fullSweepCd > 0) fullSweepCd = Math.max(0, fullSweepCd - dt);
      if (aoeSlowWave > 0) aoeSlowWave = Math.max(0, aoeSlowWave - dt);
      if (fullSweepFx > 0) fullSweepFx = Math.max(0, fullSweepFx - dt);
      emitSkillState(now);

      const moveScale = aoeSlowTimer > 0 ? AOE_SLOW_SPEED_MULT : 1;
      spawnT -= dt * (isOverloadRush ? moveScale : 1);
      if (spawnT <= 0) {
        if (isOverloadRush) {
          spawnOverloadCluster();
          const tightCluster = Math.random() < 0.45;
          const extraGap = tightCluster
            ? isPhoneView
              ? 18
              : 22
            : (isPhoneView ? 76 : 95) + Math.random() * (isPhoneView ? 60 : 75);
          spawnT = (3 * getRushColStep() + extraGap) / RUSH_SPEED;
        } else if (spawn()) {
          spawnT = Math.max(0.9, 2.6 - score * 0.07) + Math.random() * 0.6;
        } else {
          spawnT = 0.2;
        }
      }
      robots.forEach((r) => {
        if (r.hitT > 0) r.hitT = Math.max(0, r.hitT - dt);
        if (r.kb > 0) {
          const progress = r.kb / 0.28;
          const maxKbX =
            WIN.x1 +
            (r.kind === 4 ? getX3RobotW() * 0.45 : getStdRobotW() * 0.4);
          r.x = Math.max(r.x, Math.min(maxKbX, r.x + r.kbV * progress * dt));
          r.kb = Math.max(0, r.kb - dt);
        } else if (r.s === 1) {
          r.pt += dt;
          if (r.pt >= PAUSE) r.s = 2;
        } else {
          r.x -= r.v * moveScale * dt;
          if (r.s === 0 && r.stopX && r.x <= r.stopX) {
            r.s = 1;
            r.pt = 0;
          }
        }
        if (r.x < (r.kind === 4 ? WIN.x0 - 30 : WIN.x0 + 40)) r.gone = 1;
      });
    }

    // Robots (clipped to street window, counter-scaled with isoX/isoY so sprite & glyph stay 1:1 unstretched)
    ctx.save();
    ctx.beginPath();
    ctx.rect(WIN.x0, 0, WIN.x1 - WIN.x0, WIN.y1 + 40);
    ctx.clip();

    // AoE Slow: subtle vertical cyber stasis field behind robots
    const slowStrength =
      aoeSlowTimer > 0 && st === 'play'
        ? Math.min(
            Math.min((AOE_SLOW_DURATION - aoeSlowTimer) / 0.25, 1),
            Math.min(aoeSlowTimer / 0.45, 1)
          )
        : 0;
    if (slowStrength > 0.01) {
      const vw = WIN.x1 - WIN.x0;
      ctx.save();
      // Gentle cool-cyan street wash
      ctx.fillStyle = `rgba(48, 178, 255, ${0.08 * slowStrength})`;
      ctx.fillRect(WIN.x0, 0, vw, WIN.y1 + 40);

      // Faint vertical cyber column guides
      for (let col = 0; col < 7; col++) {
        const cx = WIN.x0 + ((col + 0.5) / 7) * vw;
        const pulse = 0.55 + 0.45 * Math.sin(now * 0.004 + col * 1.1);
        ctx.fillStyle = `rgba(116, 232, 255, ${0.045 * slowStrength * pulse})`;
        ctx.fillRect(cx - 8, 260, 16, 650);
      }

      // Subtle vertical cyber rain / data streaks drifting softly
      for (let i = 0; i < 18; i++) {
        const sx = WIN.x0 + 18 + ((i * 37.3 + (i % 3) * 11) % (vw - 36));
        const speed = 110 + (i % 5) * 32;
        const len = 54 + (i % 4) * 28;
        const travelH = WIN.y1 + 80;
        const sy = ((now * 0.001 * speed + i * 97) % travelH) - len;
        const alpha = (0.14 + (i % 3) * 0.06) * slowStrength;
        const grad = ctx.createLinearGradient(0, sy, 0, sy + len);
        grad.addColorStop(0, 'rgba(112, 238, 255, 0)');
        grad.addColorStop(0.55, `rgba(112, 238, 255, ${alpha})`);
        grad.addColorStop(0.92, `rgba(225, 252, 255, ${alpha * 1.25})`);
        grad.addColorStop(1, 'rgba(225, 252, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = i % 2 === 0 ? 1.8 : 1.2;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx, sy + len);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (aoeSlowWave > 0 && st === 'play') {
      const p = 1 - aoeSlowWave / 0.55;
      const waveAlpha = Math.max(0, 1 - p) * 0.45;
      ctx.save();
      ctx.strokeStyle = `rgba(128, 240, 255, ${waveAlpha})`;
      ctx.lineWidth = 3 * (1 - p * 0.6);
      ctx.beginPath();
      ctx.arc((WIN.x0 + WIN.x1) / 2, 620, 40 + p * 420, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    robots.forEach((r) => {
      const hasRobotX3 =
        r.kind === 4 && robotX3Img.complete && robotX3Img.naturalWidth > 0;
      const hasRobotGold =
        r.kind === 5 && robotGoldImg.complete && robotGoldImg.naturalWidth > 0;
      const hasRobot3 =
        r.kind === 3 && robot3Img.complete && robot3Img.naturalWidth > 0;
      const hasRobot2 =
        r.kind === 2 && robot2Img.complete && robot2Img.naturalWidth > 0;
      const sprite = hasRobotX3
        ? robotX3Img
        : hasRobotGold
          ? robotGoldImg
          : hasRobot3
            ? robot3Img
            : hasRobot2
              ? robot2Img
              : robotImg;
      const natW = sprite.naturalWidth || 300;
      const natH = sprite.naturalHeight || 360;
      // robot-2.webp:    2048x2048 trimmed 977x1064  at (+582, +480)
      // robot-3.webp:    2048x2048 trimmed 954x1021  at (+599, +491)
      // robot-gold.webp: 2048x2048 trimmed 1138x1212 at (+457, +490)
      // robot-x3.webp:   2048x2048 trimmed 1965x1442 at (+78, +211)
      const srcX = hasRobotX3
        ? (78 / 2048) * natW
        : hasRobotGold
          ? (457 / 2048) * natW
          : hasRobot3
            ? (599 / 2048) * natW
            : hasRobot2
              ? (582 / 2048) * natW
              : 0;
      const srcY = hasRobotX3
        ? (211 / 2048) * natH
        : hasRobotGold
          ? (490 / 2048) * natH
          : hasRobot3
            ? (491 / 2048) * natH
            : hasRobot2
              ? (480 / 2048) * natH
              : 0;
      const srcW = hasRobotX3
        ? (1965 / 2048) * natW
        : hasRobotGold
          ? (1138 / 2048) * natW
          : hasRobot3
            ? (954 / 2048) * natW
            : hasRobot2
              ? (977 / 2048) * natW
              : natW;
      const srcH = hasRobotX3
        ? (1442 / 2048) * natH
        : hasRobotGold
          ? (1212 / 2048) * natH
          : hasRobot3
            ? (1021 / 2048) * natH
            : hasRobot2
              ? (1064 / 2048) * natH
              : natH;
      const hitArc = r.hitT > 0 ? Math.sin((r.hitT / 0.34) * Math.PI) : 0;
      const y = r.y - hitArc * 12;
      const w = r.kind === 4 ? getX3RobotW() : getStdRobotW();
      const h = (w * srcH) / srcW;
      ctx.save();
      ctx.translate(r.x, y);
      ctx.scale(isoX, isoY);
      if (r.hitT > 0) ctx.rotate((r.hitT / 0.34) * 0.14);
      if (sprite.complete && sprite.naturalWidth > 0) {
        ctx.drawImage(sprite, srcX, srcY, srcW, srcH, -w / 2, -h / 2, w, h);
      }
      if (r.kind === 4 && r.screens) {
        r.screens.forEach((screenGlyph, idx) => {
          if (!screenGlyph) return;
          const [sxRatio, syRatio] = X3_SCREEN_POS[idx];
          glyph(
            screenGlyph,
            -w / 2 + w * sxRatio,
            -h / 2 + h * syRatio,
            w * 0.165
          );
        });
        if (r.s === 1) hourglass(w * 0.44, h * 0.34, 20, 1 - r.pt / PAUSE);
        if (r.bonus) badge(-w / 2 - 14, -h / 2 + 8);
      } else {
        glyph(
          r.k,
          -w / 2 +
            w * (hasRobotGold ? 0.371 : hasRobot3 ? 0.401 : hasRobot2 ? 0.415 : 0.43),
          -h / 2 + h * (hasRobotGold ? 0.386 : hasRobot3 || hasRobot2 ? 0.505 : 0.5),
          w * 0.3
        );
        if (r.s === 1) hourglass(w * 0.42, h * 0.37, 20, 1 - r.pt / PAUSE);
        if (r.bonus) badge(-w / 2 - 28, -h / 2 + 8);
      }
      ctx.restore();
    });

    parts.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.l -= dt * 3.6;
      ctx.globalAlpha = Math.max(p.l, 0);
      ctx.fillStyle = p.c || '#5cf0ff';
      ctx.fillRect(p.x - 3 * isoX, p.y - 3 * isoY, 6 * isoX, 6 * isoY);
    });
    parts = parts.filter((p) => p.l > 0);

    // Subtle foreground vertical cyber shimmer while AoE Slow is active
    if (slowStrength > 0.01) {
      const vw = WIN.x1 - WIN.x0;
      for (let i = 0; i < 6; i++) {
        const sx = WIN.x0 + 42 + ((i * 103 + 29) % (vw - 84));
        const speed = 155 + (i % 3) * 40;
        const len = 76 + (i % 2) * 34;
        const travelH = WIN.y1 + 80;
        const sy = ((now * 0.001 * speed + i * 163) % travelH) - len;
        const alpha = 0.11 * slowStrength;
        const grad = ctx.createLinearGradient(0, sy, 0, sy + len);
        grad.addColorStop(0, 'rgba(130, 244, 255, 0)');
        grad.addColorStop(0.6, `rgba(130, 244, 255, ${alpha})`);
        grad.addColorStop(1, 'rgba(230, 254, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx, sy + len);
        ctx.stroke();
      }
    }

    // Full Sweep cyber slash wave across the street
    if (fullSweepFx > 0 && st === 'play') {
      const p = 1 - fullSweepFx / 0.42;
      const sweepX = WIN.x0 + (WIN.x1 - WIN.x0 + 120) * p - 60;
      const sweepAlpha = Math.max(0, 1 - p);
      const beamGrad = ctx.createLinearGradient(sweepX - 110, 0, sweepX + 14, 0);
      beamGrad.addColorStop(0, 'rgba(92, 240, 255, 0)');
      beamGrad.addColorStop(0.75, `rgba(110, 238, 255, ${0.38 * sweepAlpha})`);
      beamGrad.addColorStop(0.95, `rgba(235, 253, 255, ${0.85 * sweepAlpha})`);
      beamGrad.addColorStop(1, 'rgba(235, 253, 255, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(WIN.x0, 280, WIN.x1 - WIN.x0, 620);
    }

    ctx.restore();
    ctx.globalAlpha = 1;

    bn.forEach((b) => {
      b.l -= dt;
      b.y -= 40 * dt;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.scale(isoX, isoY);
      ctx.globalAlpha = Math.max(Math.min(b.l, 1), 0);
      ctx.fillStyle = b.color || '#fff';
      ctx.shadowColor = b.color || '#5cf0ff';
      ctx.shadowBlur = 12;
      ctx.font = b.text ? '600 38px "Chakra Petch", system-ui' : '300 44px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(b.text || '+5s', 0, 0);
      ctx.restore();
    });
    bn = bn.filter((b) => b.l > 0);
    ctx.globalAlpha = 1;

    // Strokes inside DRAW AREA
    const all = cur && !strokes.includes(cur) ? [...strokes, cur] : strokes;
    ctx.save();
    ctx.strokeStyle = '#bff8ff';
    ctx.lineWidth = 12;
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.shadowColor = '#2fd8ff';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.rect(PAD.x, PAD.y, PAD.w, PAD.h);
    ctx.clip();
    (
      [
        ['#3fd0f5', 17],
        ['#eafcff', 7],
      ] as Array<[string, number]>
    ).forEach(([c, w]) => {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      all.forEach((s) => {
        ctx.beginPath();
        s.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.stroke();
      });
    });
    ctx.restore();

    if (flash) {
      flash.t -= dt;
      ctx.globalAlpha = Math.max(flash.t, 0) * 0.6;
      ctx.strokeStyle = flash.c;
      ctx.lineWidth = 6;
      ctx.strokeRect(PAD.x, PAD.y, PAD.w, PAD.h);
      ctx.globalAlpha = 1;
      if (flash.t <= 0) flash = null;
    }

    // Chibi floating "..." indicator while player is actively drawing (no bubble frame, matching missScribble glow style)
    if (cur && st === 'play') {
      const chibiWidthRatio = scaleX > 0 ? scaleY / scaleX : 1;
      const dotsX = 266 + 142 * chibiWidthRatio;
      const dotsY = 174;

      ctx.save();
      ctx.translate(dotsX, dotsY);
      ctx.scale(isoX, isoY);
      for (let i = -1; i <= 1; i++) {
        const wave = Math.sin(now / 150 - (i + 1) * 0.9);
        const dy = -4 * Math.max(0, wave);
        const dotAlpha = 0.65 + 0.35 * ((wave + 1) * 0.5);
        const x = i * 22;

        ctx.save();
        ctx.globalAlpha = dotAlpha;
        ctx.shadowColor = '#5cf0ff';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#6ce6ff';
        ctx.beginPath();
        ctx.arc(x, dy, 6.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, dy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // Chibi speech bubble with matched glyph (synced with chibi-gamehit animation)
    if (hitBubble && st === 'play') {
      hitBubble.t -= dt;
      if (hitBubble.t <= 0) {
        hitBubble = null;
      } else {
        const elapsed = hitBubble.maxT - hitBubble.t;
        const popScale =
          elapsed < 0.08
            ? 0.8 + (elapsed / 0.08) * 0.24
            : elapsed < 0.14
              ? 1.04 - ((elapsed - 0.08) / 0.06) * 0.04
              : 1;
        const fadeAlpha =
          hitBubble.t < 0.09 ? Math.max(hitBubble.t / 0.09, 0) : 1;

        drawChibiSpeechBubble(popScale, fadeAlpha, (cx, cy) => {
          glyph(hitBubble!.k, cx, cy, 38);
        });
      }
    }

    // Chibi tangled frustration scribble when player draws wrong / unrecognized symbol
    if (missScribble && st === 'play') {
      missScribble.t -= dt;
      if (missScribble.t <= 0) {
        missScribble = null;
      } else {
        const elapsed = missScribble.maxT - missScribble.t;
        const lifeRatio = elapsed / missScribble.maxT;
        const popScale =
          elapsed < 0.08
            ? 0.68 + (elapsed / 0.08) * 0.4
            : elapsed < 0.15
              ? 1.08 - ((elapsed - 0.08) / 0.07) * 0.08
              : 1;
        const damp = 1 - lifeRatio * 0.45;
        const wobbleAngle = Math.sin(elapsed * 34) * 0.14 * damp;
        const squash = Math.sin(elapsed * 28) * 0.065 * damp;
        const shakeX = Math.sin(elapsed * 46) * 2.4 * damp;
        const shakeY = Math.cos(elapsed * 40) * 1.9 * damp;
        const fadeAlpha =
          missScribble.t < 0.12 ? Math.max(missScribble.t / 0.12, 0) : 1;

        const chibiWidthRatio = scaleX > 0 ? scaleY / scaleX : 1;
        const scribbleX = 266 + 148 * chibiWidthRatio;
        const scribbleY = 172;
        const basePts: Array<[number, number]> = [
          [-24, -18],
          [-6, -30],
          [18, -24],
          [28, -4],
          [12, 18],
          [-16, 22],
          [-30, 4],
          [-18, -20],
          [8, -16],
          [24, 6],
          [4, 28],
          [-22, 16],
          [-14, -8],
          [14, -28],
          [32, -8],
          [22, 22],
          [-4, 14],
          [-28, -4],
          [-8, -24],
          [20, -10],
          [10, 26],
          [-18, 28],
          [-26, 12],
          [4, -6],
          [28, 12],
          [16, 30],
        ];
        const pts: Array<[number, number]> = basePts.map(([px, py], i) => [
          px + Math.sin(elapsed * 24 + i * 1.7) * 3.6,
          py + Math.cos(elapsed * 21 + i * 2.1) * 3.6,
        ]);

        ctx.save();
        ctx.translate(scribbleX + shakeX * isoX, scribbleY + shakeY * isoY);
        ctx.scale(isoX * popScale * (1 + squash), isoY * popScale * (1 - squash));
        ctx.rotate(wobbleAngle);
        ctx.globalAlpha = fadeAlpha;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const drawScribblePath = () => {
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length - 1; i++) {
            ctx.quadraticCurveTo(
              pts[i][0],
              pts[i][1],
              (pts[i][0] + pts[i + 1][0]) / 2,
              (pts[i][1] + pts[i + 1][1]) / 2
            );
          }
          ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
        };

        ctx.shadowColor = '#5cf0ff';
        ctx.shadowBlur = 16;
        ctx.strokeStyle = '#6ce6ff';
        ctx.lineWidth = 6.2;
        drawScribblePath();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.2;
        drawScribblePath();
        ctx.stroke();

        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }

    const tStrings = ROBOT_TOUCH_I18N[currentLang];
    const pts = points;
    if (st === 'play') {
      if (isOverloadRush) {
        overloadTimer = Math.max(0, overloadTimer - dt);
        batteryRatio = overloadTimer / OVERLOAD_DURATION;
        if (overloadTimer <= 0) {
          isOverloadRush = false;
          batteryCharge = 0;
          batteryRatio = 0;
          spawnT = Math.max(spawnT, 1.7);
        }
      } else {
        const targetBattery = Math.min(batteryCharge / OVERLOAD_PTS, 1);
        batteryRatio += (targetBattery - batteryRatio) * Math.min(dt * 8, 1);
      }
    }
    overloadAnim += ((isOverloadRush ? 1 : 0) - overloadAnim) * Math.min(dt * 6, 1);

    // Overload Rush perimeter golden viewport aura (visible on both Phone & Tablet)
    if (overloadAnim > 0.01 && st === 'play') {
      const pulse = 0.86 + 0.14 * Math.sin(now * 0.0055);
      const auraAlpha = overloadAnim * pulse;
      const vw = WIN.x1 - WIN.x0;
      ctx.save();
      ctx.beginPath();
      ctx.rect(WIN.x0, 0, vw, H);
      ctx.clip();

      const topG = ctx.createLinearGradient(0, 0, 0, 74);
      topG.addColorStop(0, `rgba(255, 206, 86, ${0.44 * auraAlpha})`);
      topG.addColorStop(0.5, `rgba(255, 186, 62, ${0.16 * auraAlpha})`);
      topG.addColorStop(1, 'rgba(255, 186, 62, 0)');
      ctx.fillStyle = topG;
      ctx.fillRect(WIN.x0, 0, vw, 74);

      const botG = ctx.createLinearGradient(0, H, 0, H - 82);
      botG.addColorStop(0, `rgba(255, 206, 86, ${0.44 * auraAlpha})`);
      botG.addColorStop(0.5, `rgba(255, 186, 62, ${0.16 * auraAlpha})`);
      botG.addColorStop(1, 'rgba(255, 186, 62, 0)');
      ctx.fillStyle = botG;
      ctx.fillRect(WIN.x0, H - 82, vw, 82);

      const leftG = ctx.createLinearGradient(WIN.x0, 0, WIN.x0 + 46, 0);
      leftG.addColorStop(0, `rgba(255, 208, 88, ${0.48 * auraAlpha})`);
      leftG.addColorStop(0.45, `rgba(255, 186, 60, ${0.18 * auraAlpha})`);
      leftG.addColorStop(1, 'rgba(255, 186, 60, 0)');
      ctx.fillStyle = leftG;
      ctx.fillRect(WIN.x0, 0, 46, H);

      const rightG = ctx.createLinearGradient(WIN.x1, 0, WIN.x1 - 46, 0);
      rightG.addColorStop(0, `rgba(255, 208, 88, ${0.48 * auraAlpha})`);
      rightG.addColorStop(0.45, `rgba(255, 186, 60, ${0.18 * auraAlpha})`);
      rightG.addColorStop(1, 'rgba(255, 186, 60, 0)');
      ctx.fillStyle = rightG;
      ctx.fillRect(WIN.x1 - 46, 0, 46, H);

      // Subtle rising golden edge sparks
      ctx.fillStyle = `rgba(255, 232, 148, ${0.72 * auraAlpha})`;
      for (let i = 0; i < 10; i++) {
        const sideRight = i % 2 === 1;
        const sx = sideRight
          ? WIN.x1 - 6 - ((i * 7) % 16)
          : WIN.x0 + 6 + ((i * 7) % 16);
        const sy = ((i * 173 + now * 0.045) % (H - 80)) + 40;
        const r = 1.4 + (i % 3) * 0.65;
        ctx.beginPath();
        ctx.arc(sx, H - sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(255, 224, 128, ${0.45 * auraAlpha})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(WIN.x0 + 1, 1, vw - 2, H - 2);
      ctx.restore();
    }

    // HUD: Top-Left Timer (raised cleanly to align with top bar, counter-scaled 1:1)
    {
      const s = Math.ceil(tl);
      const tx =
        String(Math.floor(s / 60)).padStart(2, '0') +
        ':' +
        String(s % 60).padStart(2, '0');
      tp = Math.max(0, tp - dt * 1.2);
      const px = WIN.x0 + 66;
      const py = WIN.y0 - 18;
      const pw = 178;
      const ph = 44;
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(isoX, isoY);
      ctx.save();
      ctx.fillStyle = 'rgba(8,14,22,.72)';
      ctx.beginPath();
      ctx.roundRect(0, 0, pw, ph, 7);
      ctx.fill();
      ctx.strokeStyle = '#ffb3c1';
      ctx.lineWidth = 2.8;
      ctx.lineJoin = 'round';
      const ix = 25;
      const iy = 22;
      ctx.beginPath();
      ctx.moveTo(ix - 9, iy - 13);
      ctx.lineTo(ix + 9, iy - 13);
      ctx.lineTo(ix + 2, iy);
      ctx.lineTo(ix + 9, iy + 13);
      ctx.lineTo(ix - 9, iy + 13);
      ctx.lineTo(ix - 2, iy);
      ctx.closePath();
      ctx.stroke();
      ctx.translate(46, 23);
      ctx.scale(1 + tp * 0.25, 1 + tp * 0.25);
      ctx.fillStyle = tl <= 10 ? '#ff6b81' : tp > 0 ? '#9dffb8' : '#fff';
      ctx.font = '600 32px "Chakra Petch", system-ui';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(tx, 0, 0);
      ctx.restore();
      if (tp > 0) {
        ctx.save();
        ctx.globalAlpha = Math.min(tp * 1.5, 1);
        ctx.fillStyle = '#9dffb8';
        ctx.font = '600 28px "Chakra Petch", system-ui';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('+5s', pw + 10, 22 - (1 - tp) * 14);
        ctx.restore();
      }
      ctx.restore();
    }

    // HUD: Top-Right Star Rating Track + Angled Score Card + Battery Progress / Overload Rush
    {
      const curStars = Math.min(3, Math.floor(pts / STAR));
      if (curStars > ns) {
        ns = curStars;
        sp = 1;
      }
      sp = Math.max(0, sp - dt * 1.5);

      const cardW = 148;
      const topH = 42;
      const botH = 24;
      const cardL = -cardW;
      const railR = cardL - 10;
      const railL = railR - 204;
      const railY = 14;
      const starY = 44;
      const ratio = Math.min(pts / (STAR * 3), 1);
      const fw = (railR - railL) * ratio;

      ctx.save();
      ctx.translate(WIN.x1 - 12, WIN.y0 - 20);
      ctx.scale(isoX, isoY);

      // 1) Subtle "STAR RATING" micro-label above right side of rail
      ctx.fillStyle = 'rgba(205, 240, 255, 0.72)';
      ctx.font = '600 9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('STAR RATING', railR - 2, railY - 4);

      // 2) Horizontal star progress track (fills right-to-left)
      ctx.fillStyle = 'rgba(12, 26, 40, 0.65)';
      ctx.fillRect(railL, railY - 1.5, railR - railL, 3);
      ctx.fillStyle = 'rgba(79, 208, 245, 0.45)';
      ctx.fillRect(railL, railY - 0.5, railR - railL, 1.5);

      if (fw > 0) {
        const barGrad = ctx.createLinearGradient(railR, 0, railL, 0);
        barGrad.addColorStop(0, '#ff748c');
        barGrad.addColorStop(0.35, '#5cf0ff');
        barGrad.addColorStop(1, '#bff8ff');
        ctx.fillStyle = barGrad;
        ctx.shadowColor = '#5cf0ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(railR - fw, railY - 2, fw, 4);
        ctx.shadowBlur = 0;
      } else {
        // Subtle pink anchor tick at the start of the rail on the right (matching reference HUD)
        ctx.fillStyle = '#ff748c';
        ctx.fillRect(railR - 46, railY - 1, 46, 2);
      }

      // 3) 3 vertical drop stems & hanging cyan 5-point stars (rightmost star = Star 1)
      for (let k = 1; k <= 3; k++) {
        const sx = railR - ((railR - railL) * (k - 0.5)) / 3;
        ctx.strokeStyle = k <= curStars ? '#8ff4ff' : 'rgba(79, 208, 245, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx, railY + 1);
        ctx.lineTo(sx, starY - 16);
        ctx.stroke();

        star(sx, starY, 17, k <= curStars, k === curStars ? sp : 0);
      }

      // 4) Score Card: Top white-ice chamfered plate (warm gold tint during Overload Rush)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cardL + 8, 2);
      ctx.lineTo(-4, 2);
      ctx.lineTo(0, 6);
      ctx.lineTo(0, topH);
      ctx.lineTo(cardL + 6, topH);
      ctx.lineTo(cardL, topH - 6);
      ctx.lineTo(cardL, 10);
      ctx.closePath();
      const plateGrad = ctx.createLinearGradient(cardL, 0, 0, topH);
      if (isOverloadRush) {
        plateGrad.addColorStop(0, '#fff4cf');
        plateGrad.addColorStop(1, '#e8cb88');
        ctx.shadowColor = 'rgba(255, 204, 82, 0.55)';
        ctx.shadowBlur = 14;
      } else {
        plateGrad.addColorStop(0, '#f7fbff');
        plateGrad.addColorStop(1, '#dce7f3');
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 10;
      }
      ctx.fillStyle = plateGrad;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Top chamfer teal/slate (or gold) tech accent bar
      ctx.fillStyle = isOverloadRush ? '#8a601b' : '#1e3a5f';
      ctx.fillRect(cardL + 14, 2, 24, 3);
      ctx.fillStyle = isOverloadRush ? '#ffd86b' : '#4fd0f5';
      ctx.fillRect(cardL + 40, 2, 12, 3);

      // Vertical faint "SCORE" label on left inner edge
      ctx.save();
      ctx.translate(cardL + 9, topH / 2 + 1);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = isOverloadRush
        ? 'rgba(110, 74, 16, 0.55)'
        : 'rgba(30, 58, 95, 0.45)';
      ctx.font = '700 7.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCORE', 0, 0);
      ctx.restore();

      // Score value inside plate
      ctx.fillStyle = isOverloadRush ? '#fffdf3' : '#09111e';
      if (isOverloadRush) {
        ctx.shadowColor = 'rgba(168, 106, 12, 0.72)';
        ctx.shadowBlur = 6;
      }
      ctx.font = '700 30px "Chakra Petch", system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        String(pts).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        cardL + cardW / 2 + 4,
        topH / 2 + 2
      );
      ctx.restore();

      // 5) Score Card: Bottom dark translucent "Points" strip
      ctx.fillStyle = isOverloadRush ? 'rgba(42, 28, 12, 0.78)' : 'rgba(6, 13, 24, 0.82)';
      ctx.fillRect(cardL + 6, topH, cardW - 6, botH);
      ctx.fillStyle = isOverloadRush ? '#ffd76e' : '#4fd0f5';
      ctx.shadowColor = isOverloadRush ? '#ffd76e' : '#4fd0f5';
      ctx.shadowBlur = 6;
      ctx.fillRect(cardL + 16, topH + botH - 1.5, cardW - 26, 1.5);
      ctx.shadowBlur = 0;

      ctx.fillStyle = isOverloadRush ? '#fff3cf' : '#e6f8ff';
      ctx.font = '500 17px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        tStrings.canvasPointsLabel,
        cardL + cardW / 2 + 3,
        topH + botH / 2
      );

      // 6) Battery Progress Widget directly below Score Card (fills 0 -> 4300 pts, then Overload Rush)
      {
        const batCx = cardL + cardW / 2 + 2;
        const batW = 30;
        const batH = 44;
        const batX = batCx - batW / 2;
        const batY = topH + botH + 22; // y = 88
        const overloadPulse = 0.85 + 0.15 * Math.sin(now * 0.007);

        // 6a) Overload Rush glowing amber banner extending left from the battery
        if (overloadAnim > 0.01) {
          const banR = batX - 4;
          const banL = banR - 208 * overloadAnim;
          const banTop = batY + 10;
          const banH = 24;

          ctx.save();
          ctx.globalAlpha = overloadAnim;

          const banBg = ctx.createLinearGradient(banL, 0, banR, 0);
          banBg.addColorStop(0, 'rgba(180, 92, 18, 0)');
          banBg.addColorStop(0.28, 'rgba(205, 112, 24, 0.56)');
          banBg.addColorStop(0.75, 'rgba(232, 142, 34, 0.82)');
          banBg.addColorStop(1, 'rgba(255, 198, 72, 0.9)');
          ctx.fillStyle = banBg;
          ctx.fillRect(banL, banTop, banR - banL, banH);

          // Crisp horizontal gold accent lines on top and bottom of banner
          const lineGrad = ctx.createLinearGradient(banL, 0, banR, 0);
          lineGrad.addColorStop(0, 'rgba(255, 224, 128, 0)');
          lineGrad.addColorStop(0.35, `rgba(255, 218, 118, ${0.88 * overloadPulse})`);
          lineGrad.addColorStop(1, `rgba(255, 238, 165, ${0.98 * overloadPulse})`);
          ctx.fillStyle = lineGrad;
          ctx.fillRect(banL, banTop, banR - banL, 1.4);
          ctx.fillRect(banL, banTop + banH - 1.4, banR - banL, 1.4);

          // Tiny golden sparkles near battery junction
          ctx.fillStyle = 'rgba(255, 240, 175, 0.85)';
          for (let sIdx = 0; sIdx < 5; sIdx++) {
            const spX = banR - 6 - ((sIdx * 29 + now * 0.025) % 90);
            const spY = banTop + 4 + ((sIdx * 11) % (banH - 8));
            ctx.fillRect(spX, spY, 1.8, 1.8);
          }

          // Banner title
          ctx.fillStyle = '#fffef4';
          ctx.shadowColor = 'rgba(120, 60, 0, 0.85)';
          ctx.shadowBlur = 6;
          ctx.font = '600 15.5px "Chakra Petch", system-ui';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText('Overload Rush', banR - 14, banTop + banH / 2 + 0.5);
          ctx.restore();
        }

        // 6b) Subtle elliptical holo ring under battery base
        ctx.save();
        ctx.translate(batCx, batY + batH + 2);
        ctx.scale(1, 0.28);
        const ringGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 34);
        if (isOverloadRush) {
          ringGrad.addColorStop(0, 'rgba(255, 215, 95, 0.35)');
          ringGrad.addColorStop(0.65, `rgba(255, 168, 52, ${0.72 * overloadPulse})`);
          ringGrad.addColorStop(1, 'rgba(255, 140, 30, 0)');
        } else {
          ringGrad.addColorStop(0, 'rgba(79, 208, 245, 0.14)');
          ringGrad.addColorStop(0.65, 'rgba(255, 132, 168, 0.36)');
          ringGrad.addColorStop(1, 'rgba(79, 208, 245, 0)');
        }
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 34, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 6c) Battery terminal nub
        ctx.save();
        const capW = 14;
        const capH = 4.5;
        ctx.fillStyle = isOverloadRush
          ? '#ffe58f'
          : 'rgba(170, 224, 245, 0.82)';
        if (isOverloadRush) {
          ctx.shadowColor = '#ffd04d';
          ctx.shadowBlur = 10;
        }
        ctx.beginPath();
        ctx.roundRect(batCx - capW / 2, batY - capH - 1, capW, capH, [2.5, 2.5, 0, 0]);
        ctx.fill();
        ctx.restore();

        // 6d) Battery outer shell + dark cavity
        ctx.save();
        ctx.fillStyle = isOverloadRush
          ? 'rgba(32, 20, 6, 0.82)'
          : 'rgba(10, 20, 34, 0.78)';
        ctx.beginPath();
        ctx.roundRect(batX, batY, batW, batH, 5);
        ctx.fill();

        // Liquid fill clipped inside battery cavity (bottom-up)
        const pad = 3;
        const innerX = batX + pad;
        const innerY = batY + pad;
        const innerW = batW - pad * 2;
        const innerH = batH - pad * 2;
        const fillH = innerH * Math.max(0, Math.min(1, batteryRatio));

        if (fillH > 0.5) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(innerX, innerY, innerW, innerH, 3);
          ctx.clip();

          const fillTop = innerY + innerH - fillH;
          const liqGrad = ctx.createLinearGradient(0, innerY + innerH, 0, innerY);
          if (isOverloadRush) {
            liqGrad.addColorStop(0, '#ff8e1c');
            liqGrad.addColorStop(0.45, '#ffd44d');
            liqGrad.addColorStop(1, '#fff5bd');
          } else {
            liqGrad.addColorStop(0, '#28b8e5');
            liqGrad.addColorStop(0.55, '#68e8ff');
            liqGrad.addColorStop(1, '#ffd976');
          }
          ctx.fillStyle = liqGrad;
          ctx.fillRect(innerX, fillTop, innerW, fillH);

          // Crisp glowing top surface line while partially filled
          if (batteryRatio < 0.995) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(innerX, fillTop, innerW, 1.5);
          }

          // Subtle segmented cell lines
          ctx.fillStyle = 'rgba(10, 18, 28, 0.24)';
          for (let seg = 1; seg <= 3; seg++) {
            const sy = innerY + (innerH * seg) / 4;
            ctx.fillRect(innerX, sy, innerW, 1);
          }
          ctx.restore();
        }

        // Outer metallic border stroke
        ctx.strokeStyle = isOverloadRush
          ? `rgba(255, 224, 130, ${0.96 * overloadPulse})`
          : 'rgba(175, 228, 248, 0.85)';
        ctx.lineWidth = isOverloadRush ? 2.2 : 1.8;
        if (isOverloadRush) {
          ctx.shadowColor = '#ffc83b';
          ctx.shadowBlur = 14 * overloadPulse;
        }
        ctx.beginPath();
        ctx.roundRect(batX, batY, batW, batH, 5);
        ctx.stroke();
        ctx.restore();

        // 6e) Centered Lightning Bolt vector icon inside battery
        ctx.save();
        ctx.translate(batCx, batY + batH / 2 + 0.5);
        ctx.beginPath();
        ctx.moveTo(2.5, -11);
        ctx.lineTo(-6.5, 1.2);
        ctx.lineTo(-0.5, 1.2);
        ctx.lineTo(-3, 11);
        ctx.lineTo(6.5, -1.5);
        ctx.lineTo(0.5, -1.5);
        ctx.closePath();
        if (isOverloadRush) {
          ctx.fillStyle = '#fffef2';
          ctx.shadowColor = '#ffe066';
          ctx.shadowBlur = 12;
          ctx.fill();
        } else {
          ctx.fillStyle =
            batteryRatio > 0.35
              ? 'rgba(255, 255, 255, 0.72)'
              : 'rgba(210, 240, 255, 0.34)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(210, 242, 255, 0.65)';
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
        ctx.restore();

        // 6f) "Progress" label framed by corner tech brackets underneath battery
        const lblY = batY + batH + 16;
        const brHalfW = 42;
        const brTop = lblY - 12;
        const brBot = lblY + 10;
        const brSize = 5;

        ctx.save();
        ctx.fillStyle = isOverloadRush
          ? 'rgba(30, 18, 6, 0.58)'
          : 'rgba(8, 16, 28, 0.52)';
        ctx.fillRect(batCx - brHalfW + 1, brTop + 1, brHalfW * 2 - 2, brBot - brTop - 2);

        ctx.strokeStyle = isOverloadRush
          ? 'rgba(255, 226, 150, 0.9)'
          : 'rgba(205, 240, 255, 0.85)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        // Top-left corner
        ctx.moveTo(batCx - brHalfW, brTop + brSize);
        ctx.lineTo(batCx - brHalfW, brTop);
        ctx.lineTo(batCx - brHalfW + brSize, brTop);
        // Bottom-left corner
        ctx.moveTo(batCx - brHalfW, brBot - brSize);
        ctx.lineTo(batCx - brHalfW, brBot);
        ctx.lineTo(batCx - brHalfW + brSize, brBot);
        // Top-right corner
        ctx.moveTo(batCx + brHalfW - brSize, brTop);
        ctx.lineTo(batCx + brHalfW, brTop);
        ctx.lineTo(batCx + brHalfW, brTop + brSize);
        // Bottom-right corner
        ctx.moveTo(batCx + brHalfW - brSize, brBot);
        ctx.lineTo(batCx + brHalfW, brBot);
        ctx.lineTo(batCx + brHalfW, brBot - brSize);
        ctx.stroke();

        ctx.fillStyle = isOverloadRush ? '#fff6db' : '#eef9ff';
        ctx.font = '500 15px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Progress', batCx, lblY);
        ctx.restore();
      }

      ctx.restore();
    }

    rafId = window.requestAnimationFrame(frame);
  }

  function startLoop() {
    if (destroyed || rafId !== null) return;
    prevFrameTime = 0;
    rafId = window.requestAnimationFrame(frame);
  }

  function stopLoop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  }

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      stopLoop();
      resetClean();
    } else if (!destroyed) {
      fit();
      resetClean();
      startLoop();
    }
  };

  const onOrientationChange = () => {
    window.setTimeout(fit, 60);
  };

  // Attach listeners & observer
  cv.addEventListener('pointerdown', onPointerDown);
  cv.addEventListener('pointermove', onPointerMove);
  cv.addEventListener('pointerup', onPointerUp);
  cv.addEventListener('pointercancel', onPointerUp);
  cv.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', onOrientationChange);
  document.addEventListener('visibilitychange', onVisibilityChange);

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => fit());
    resizeObserver.observe(cv);
  }

  fit();
  startLoop();

  return {
    setLang(nextLang: AppLang) {
      currentLang = nextLang;
    },
    restart() {
      resetToPlay();
    },
    retreat() {
      return finishRun();
    },
    triggerAoeSlow() {
      return activateAoeSlow();
    },
    triggerFullSweep() {
      return activateFullSweep();
    },
    destroy() {
      destroyed = true;
      stopLoop();
      resetClean();
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerUp);
      cv.removeEventListener('pointercancel', onPointerUp);
      cv.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', onOrientationChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    },
  };
}
