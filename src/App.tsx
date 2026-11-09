/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { sound } from './utils/sound';

const CLOUDINARY_OPT = 'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto';
const CLOUDINARY_RAW = 'https://res.cloudinary.com/trangsoidamtruong/image/upload';

const ASSETS = {
  wall: {
    remote: `${CLOUDINARY_OPT}/v1794205543/Glitchtopia-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205543/Glitchtopia-wall.webp`,
    local: '/assets/aistudio/Glitchtopia-wall.webp',
  },
  logo: {
    remote: `${CLOUDINARY_OPT}/v1794206661/Glitchtopia_logo.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794206661/Glitchtopia_logo.png`,
    local: '/assets/aistudio/Glitchtopia_logo.png',
  },
  memoryTerminal: {
    remote: `${CLOUDINARY_OPT}/v1794206700/MemoryTerminal-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794206700/MemoryTerminal-button.png`,
    local: '/assets/aistudio/MemoryTerminal-button.png',
  },
  defenseIntercept: {
    remote: `${CLOUDINARY_OPT}/v1794205545/DefenseIntercept-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205545/DefenseIntercept-button.png`,
    local: '/assets/aistudio/DefenseIntercept-button.png',
  },
  careLog: {
    remote: `${CLOUDINARY_OPT}/v1794205545/CareLog-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205545/CareLog-button.png`,
    local: '/assets/aistudio/CareLog-button.png',
  },
  restoreClinic: {
    remote: `${CLOUDINARY_OPT}/v1794205547/RestoreClinic-button.png`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205547/RestoreClinic-button.png`,
    local: '/assets/aistudio/RestoreClinic-button.png',
  },
  memoryWall: {
    remote: `${CLOUDINARY_OPT}/v1794205542/MemoryTerminal-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794205542/MemoryTerminal-wall.webp`,
    local: '/assets/aistudio/MemoryTerminal-wall.webp',
  },
  chibiIdle: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794214486/chibi-idle.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794214486/chibi-idle.webp',
    local: '/assets/aistudio/chibi-idle.webp',
  },
  chibiHappy: {
    // Keep animated WebP original URL untouched so all animation frames play smoothly
    remote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794227454/chibi-happy.webp',
    rawRemote: 'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794227454/chibi-happy.webp',
    local: '/assets/aistudio/chibi-happy.webp',
  },
  computer0: {
    remote: `${CLOUDINARY_OPT}/v1794222624/computer-0.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794222624/computer-0.webp`,
    local: '/assets/aistudio/computer-0.webp',
  },
};

export interface ChapterAssetItem {
  chapter: number;
  label: string;
  normalRemote: string;
  normalRawRemote: string;
  normalLocal: string;
  selectRemote: string;
  selectRawRemote: string;
  selectLocal: string;
}

// Ordered from 5 down to 0 for visual clarity; z-index is controlled via data-chapter in CSS
const MEMORY_CHAPTERS: ChapterAssetItem[] = [
  {
    chapter: 5,
    label: '05 Chapter 5',
    normalRemote: `${CLOUDINARY_OPT}/v1794208497/5.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208497/5.webp`,
    normalLocal: '/assets/aistudio/5.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208495/5-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208495/5-select.webp`,
    selectLocal: '/assets/aistudio/5-select.webp',
  },
  {
    chapter: 4,
    label: '04 Chapter 4',
    normalRemote: `${CLOUDINARY_OPT}/v1794208491/4.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208491/4.webp`,
    normalLocal: '/assets/aistudio/4.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208493/4-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208493/4-select.webp`,
    selectLocal: '/assets/aistudio/4-select.webp',
  },
  {
    chapter: 3,
    label: '03 Chapter 3',
    normalRemote: `${CLOUDINARY_OPT}/v1794208385/3.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208385/3.webp`,
    normalLocal: '/assets/aistudio/3.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208383/3-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208383/3-select.webp`,
    selectLocal: '/assets/aistudio/3-select.webp',
  },
  {
    chapter: 2,
    label: '02 Chapter 2',
    normalRemote: `${CLOUDINARY_OPT}/v1794208378/2.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208378/2.webp`,
    normalLocal: '/assets/aistudio/2.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208380/2-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208380/2-select.webp`,
    selectLocal: '/assets/aistudio/2-select.webp',
  },
  {
    chapter: 1,
    label: '01 Chapter 1',
    normalRemote: `${CLOUDINARY_OPT}/v1794208377/1.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208377/1.webp`,
    normalLocal: '/assets/aistudio/1.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208373/1-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208373/1-select.webp`,
    selectLocal: '/assets/aistudio/1-select.webp',
  },
  {
    chapter: 0,
    label: '00 Prologue',
    normalRemote: `${CLOUDINARY_OPT}/v1794208374/0.webp`,
    normalRawRemote: `${CLOUDINARY_RAW}/v1794208374/0.webp`,
    normalLocal: '/assets/aistudio/0.webp',
    selectRemote: `${CLOUDINARY_OPT}/v1794208374/0-select.webp`,
    selectRawRemote: `${CLOUDINARY_RAW}/v1794208374/0-select.webp`,
    selectLocal: '/assets/aistudio/0-select.webp',
  },
];

interface FallbackImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  remoteSrc: string;
  rawRemoteSrc?: string;
  localSrc: string;
  onAssetReady?: () => void;
}

const AssetImg: React.FC<FallbackImgProps> = ({
  remoteSrc,
  rawRemoteSrc,
  localSrc,
  alt,
  onAssetReady,
  ...rest
}) => {
  const [src, setSrc] = useState<string>(remoteSrc);

  useEffect(() => {
    setSrc(remoteSrc);
  }, [remoteSrc]);

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      draggable={false}
      onLoad={() => {
        onAssetReady?.();
      }}
      onError={() => {
        if (rawRemoteSrc && src === remoteSrc) {
          setSrc(rawRemoteSrc);
        } else if (src !== localSrc) {
          setSrc(localSrc);
        } else {
          onAssetReady?.();
        }
      }}
      {...rest}
    />
  );
};

type GlitchtopiaPage = 'hub' | 'memory-terminal';
const GLITCHTOPIA_SLUG = '/glitchtopia';

function getInitialLang(): 'VI' | 'EN' {
  if (typeof window === 'undefined') return 'VI';
  try {
    const params = new URLSearchParams(window.location.search);
    const qLang = params.get('lang')?.toUpperCase();
    if (qLang === 'EN' || qLang === 'VI') return qLang;

    const saved = window.localStorage.getItem('tsdt_lang')?.toUpperCase();
    if (saved === 'EN' || saved === 'VI') return saved;
  } catch {
    // Ignore storage access errors in restricted iframes
  }
  return 'VI';
}

export default function App() {
  const [lang, setLang] = useState<'VI' | 'EN'>(getInitialLang);
  const [currentPage, setCurrentPage] = useState<GlitchtopiaPage>('hub');
  const [isWallReady, setIsWallReady] = useState<boolean>(false);

  // For Memory Terminal chapter cards:
  // - hoveredChapter: active on PC/Laptop hover
  // - tappedChapter: active on 1st tap/click on Phone/Tablet
  // - chosenChapter: triggered on 2nd tap/click (Phone/Tablet) or click while hovered (PC)
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [tappedChapter, setTappedChapter] = useState<number | null>(null);
  const [chosenChapter, setChosenChapter] = useState<number | null>(null);

  // Chibi happy interaction & speech bubble state
  // - happyBlobRef: cached in-memory Blob of chibi-happy.webp so each click creates a fresh
  //   ObjectURL that starts WebP playback strictly from Frame 0 (0ms) with zero network latency
  const happyBlobRef = useRef<Blob | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);
  const [happyPlaySrc, setHappyPlaySrc] = useState<string | null>(null);
  const [happyPlayKey, setHappyPlayKey] = useState<number>(0);
  const [isIdleMasked, setIsIdleMasked] = useState<boolean>(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(false);

  const revealIdleTimerRef = useRef<number | null>(null);
  const hideHappyTimerRef = useRef<number | null>(null);

  const clearChibiTimers = useCallback(() => {
    if (revealIdleTimerRef.current !== null) {
      window.clearTimeout(revealIdleTimerRef.current);
      revealIdleTimerRef.current = null;
    }
    if (hideHappyTimerRef.current !== null) {
      window.clearTimeout(hideHappyTimerRef.current);
      hideHappyTimerRef.current = null;
    }
  }, []);

  // Pre-fetch chibi-happy.webp binary into RAM once so every click plays from Frame 0 instantaneously
  useEffect(() => {
    let cancelled = false;
    async function loadHappyBlob() {
      const candidates = [ASSETS.chibiHappy.remote, ASSETS.chibiHappy.local];
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const buf = await res.arrayBuffer();
            if (!cancelled) {
              happyBlobRef.current = new Blob([buf], { type: 'image/webp' });
            }
            return;
          }
        } catch {
          // Try next fallback candidate
        }
      }
    }
    loadHappyBlob();
    return () => {
      cancelled = true;
      clearChibiTimers();
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
    };
  }, [clearChibiTimers]);

  const handleChibiClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSuccess();
      clearChibiTimers();

      // Create a fresh in-memory ObjectURL so the browser starts WebP animation at Frame 0
      let nextSrc: string;
      if (happyBlobRef.current) {
        if (activeObjectUrlRef.current) {
          URL.revokeObjectURL(activeObjectUrlRef.current);
        }
        nextSrc = URL.createObjectURL(happyBlobRef.current);
        activeObjectUrlRef.current = nextSrc;
      } else {
        nextSrc = `${ASSETS.chibiHappy.local}?t=${Date.now()}`;
      }

      setHappyPlayKey((k) => k + 1);
      setHappyPlaySrc(nextSrc);
    },
    [clearChibiTimers]
  );

  // Fired the instant Frame 0 of the fresh chibi-happy ObjectURL is decoded & painted
  const handleHappyFrameZeroReady = useCallback(() => {
    setIsIdleMasked(true);
    setShowSpeechBubble(true);

    if (revealIdleTimerRef.current !== null) {
      window.clearTimeout(revealIdleTimerRef.current);
    }
    if (hideHappyTimerRef.current !== null) {
      window.clearTimeout(hideHappyTimerRef.current);
    }

    // 1 full happy cycle is 30 frames * 65ms = 1950ms (Frame 0 -> raises hand & smiles -> lowers hand at Frame 29).
    // Step 1 (at 1885ms): restore idle chibi opacity to 1 underneath BEFORE removing happy layer
    revealIdleTimerRef.current = window.setTimeout(() => {
      setIsIdleMasked(false);
      revealIdleTimerRef.current = null;
    }, 1885);

    // Step 2 (at 1940ms, when happy pose ends): unmount happy layer and hide speech bubble simultaneously
    hideHappyTimerRef.current = window.setTimeout(() => {
      setHappyPlaySrc(null);
      setShowSpeechBubble(false);
      hideHappyTimerRef.current = null;
    }, 1940);
  }, []);

  // Ensure URL bar always has the /glitchtopia slug for this event
  useEffect(() => {
    try {
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      if (!currentPath || currentPath === '' || currentPath === '/events/glitchtopia') {
        const targetUrl =
          GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
        window.history.replaceState(
          { eventSlug: 'glitchtopia', glitchtopiaPage: 'hub' },
          '',
          targetUrl
        );
      }
    } catch {
      // Ignore history replaceState errors in restricted environments
    }
  }, []);

  // Sync document title, <html lang>, and localStorage when language changes
  useEffect(() => {
    document.title = lang === 'VI' ? 'Trăng Soi Dặm Trường - SK' : 'Moonstride - Events';
    document.documentElement.lang = lang === 'VI' ? 'vi' : 'en';
    try {
      window.localStorage.setItem('tsdt_lang', lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  // Safety fallback timer so the stage never stays hidden if network is slow
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsWallReady(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  // Preload Memory Terminal and Chibi Happy assets in background for instant switching
  useEffect(() => {
    const urls = [
      ASSETS.chibiHappy.remote,
      ASSETS.memoryWall.remote,
      ...MEMORY_CHAPTERS.flatMap((c) => [c.normalRemote, c.selectRemote]),
    ];
    urls.forEach((u) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = u;
    });
  }, []);

  // Sync browser Back button / mobile edge-swipe with sub-page state (keeping /glitchtopia slug)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetPage: GlitchtopiaPage =
        event.state?.glitchtopiaPage === 'memory-terminal' ? 'memory-terminal' : 'hub';
      setHoveredChapter(null);
      setTappedChapter(null);
      setChosenChapter(null);
      setCurrentPage(targetPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openMemoryTerminal = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('memory-terminal');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'memory-terminal' },
        '',
        targetUrl
      );
    } catch {
      // Ignore history pushState errors in sandboxed environments
    }
  }, []);

  const backToHub = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);

    try {
      if (window.history.state?.glitchtopiaPage === 'memory-terminal') {
        window.history.back();
        return;
      }
    } catch {
      // Fallback to direct state update
    }
    setCurrentPage('hub');
  }, []);

  const handleChapterClick = (chapterNum: number) => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;

    if (isDesktop) {
      sound.playSuccess();
      setTappedChapter(chapterNum);
      setChosenChapter(chapterNum);
      return;
    }

    // On Phone / Tablet: 1st tap shifts card right & shows "-select.webp"; 2nd tap selects it
    if (tappedChapter !== chapterNum) {
      sound.playSelect();
      setTappedChapter(chapterNum);
      setChosenChapter(null);
    } else {
      sound.playSuccess();
      setChosenChapter(chapterNum);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#07060f] text-[#e6e2f5] flex flex-col select-none">
      {/* Breadcrumb Navigation Bar: TSDT > SỰ KIỆN > GLITCHTOPIA */}
      <SiteHeader
        lang={lang}
        currentEventTitle="GLITCHTOPIA"
        currentEventSlug={GLITCHTOPIA_SLUG}
        onClickCurrentEvent={() => {
          if (currentPage !== 'hub') {
            backToHub();
          }
        }}
        onToggleLang={() => setLang((l) => (l === 'VI' ? 'EN' : 'VI'))}
      />

      {/* Glitchtopia Event Viewport */}
      <main className="glitchtopia-viewport">
        {/* Fast Cyberpunk Boot Loader while main background decodes */}
        {!isWallReady && (
          <div className="cyber-boot-overlay" aria-hidden="true">
            <div className="cyber-boot-indicator">
              <span className="cyber-boot-dot" />
              <span className="font-mono-tabular text-[11px] tracking-[0.22em] text-[#a79fc7] uppercase">
                GLITCHTOPIA // SYNCING
              </span>
            </div>
          </div>
        )}

        {currentPage === 'hub' ? (
          <div className={`glitchtopia-stage ${isWallReady ? 'is-ready' : 'is-loading'}`}>
            {/* 1640x2360 Room Scene Canvas (locks room furniture, computer & chibi to background coordinates) */}
            <div className="glitchtopia-scene-canvas">
              {/* Hub Background Image */}
              <AssetImg
                remoteSrc={ASSETS.wall.remote}
                rawRemoteSrc={ASSETS.wall.rawRemote}
                localSrc={ASSETS.wall.local}
                alt="Glitchtopia Event Background"
                fetchPriority="high"
                onAssetReady={() => setIsWallReady(true)}
                className="glitchtopia-scene-wall"
              />

              {/* Right Shelf Hologram Computer Monitor */}
              <AssetImg
                remoteSrc={ASSETS.computer0.remote}
                rawRemoteSrc={ASSETS.computer0.rawRemote}
                localSrc={ASSETS.computer0.local}
                alt="Hologram Computer Terminal"
                className="glitchtopia-computer"
              />

              {/* Center Interactive Chibi Character (Dual-layer Idle / Happy Animated WebP for Frame-0 zero-glitch playback) */}
              <button
                type="button"
                aria-label="Touch Xavier Chibi"
                onClick={handleChibiClick}
                className="glitchtopia-chibi-hitbox"
              >
                <AssetImg
                  remoteSrc={ASSETS.chibiIdle.remote}
                  rawRemoteSrc={ASSETS.chibiIdle.rawRemote}
                  localSrc={ASSETS.chibiIdle.local}
                  alt="Xavier Chibi"
                  className={`glitchtopia-chibi-img is-idle ${!isIdleMasked ? 'is-visible' : 'is-hidden'}`}
                />
                {happyPlaySrc && (
                  <img
                    key={happyPlayKey}
                    src={happyPlaySrc}
                    alt="Xavier Chibi Happy"
                    draggable={false}
                    onLoad={handleHappyFrameZeroReady}
                    className="glitchtopia-chibi-img is-happy is-visible"
                  />
                )}
              </button>

              {/* In-Game Speech Bubble matching reference screenshot */}
              {showSpeechBubble && (
                <div className="chibi-speech-bubble" role="status" aria-live="polite">
                  <svg
                    className="chibi-speech-svg"
                    viewBox="0 0 380 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="speechFillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#121e2e" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#0c1522" stopOpacity="0.97" />
                      </linearGradient>
                      <linearGradient id="speechOuterStroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef6ff" stopOpacity="0.95" />
                        <stop offset="45%" stopColor="#9ab6d1" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#e2effc" stopOpacity="0.92" />
                      </linearGradient>
                      <pattern
                        id="speechScanlines"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="4"
                          y2="0"
                          stroke="#5899c4"
                          strokeOpacity="0.1"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    {/* Main Capsule + Bottom-Left Tail Outer Metallic Shape */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#speechFillGrad)"
                      stroke="url(#speechOuterStroke)"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    {/* Subtle Scanline Overlay Inside Capsule */}
                    <path
                      d="M 46 6 H 334 A 40 40 0 0 1 374 46 V 50 A 40 40 0 0 1 334 90 H 54 L 30 102 L 37 87 A 40 40 0 0 1 6 50 V 46 A 40 40 0 0 1 46 6 Z"
                      fill="url(#speechScanlines)"
                    />

                    {/* Inner Subtle Rim Line matching Love and Deepspace bubble frame */}
                    <path
                      d="M 46 9.5 H 334 A 36.5 36.5 0 0 1 370.5 46 V 50 A 36.5 36.5 0 0 1 334 86.5 H 52.5 L 35.5 95.5 L 40.5 84.5 A 36.5 36.5 0 0 1 9.5 50 V 46 A 36.5 36.5 0 0 1 46 9.5 Z"
                      fill="none"
                      stroke="#5b7a99"
                      strokeOpacity="0.45"
                      strokeWidth="1.1"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="chibi-speech-text">
                    <span>Your warm hand just</span>
                    <span>saved the world again.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Event HUD Overlay */}
            <div className="glitchtopia-hud-layer">
              {/* Top-Left Game Title Logo with Cyberpunk / Sci-Fi Hologram Effects */}
              <div className="glitchtopia-logo-wrap" aria-hidden="false">
                {/* Vertical left cyber signal line */}
                <span className="cyber-signal-line" aria-hidden="true" />

                {/* Floating cyber pixel particles */}
                <span className="cyber-pixel cyber-pixel-1" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-2" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-3" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-4" aria-hidden="true" />
                <span className="cyber-pixel cyber-pixel-5" aria-hidden="true" />
                <span className="cyber-streak cyber-streak-1" aria-hidden="true" />
                <span className="cyber-streak cyber-streak-2" aria-hidden="true" />

                {/* Chromatic aberration / glitch slice ghost layers */}
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt=""
                  aria-hidden="true"
                  className="glitchtopia-logo-ghost glitchtopia-logo-ghost-cyan"
                />
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt=""
                  aria-hidden="true"
                  className="glitchtopia-logo-ghost glitchtopia-logo-ghost-magenta"
                />

                {/* Main Crisp Logo */}
                <AssetImg
                  remoteSrc={ASSETS.logo.remote}
                  rawRemoteSrc={ASSETS.logo.rawRemote}
                  localSrc={ASSETS.logo.local}
                  alt="Glitchtopia — Malfunction"
                  className="glitchtopia-logo-img"
                />

                {/* Bottom angled sci-fi neon data bar */}
                <span className="cyber-underline-bar" aria-hidden="true" />
              </div>

              {/* Right: Memory Terminal Button */}
              <button
                type="button"
                aria-label="Memory Terminal"
                onMouseEnter={() => sound.playHover()}
                onClick={openMemoryTerminal}
                className="glitchtopia-btn glitchtopia-btn-memory"
              >
                <AssetImg
                  remoteSrc={ASSETS.memoryTerminal.remote}
                  rawRemoteSrc={ASSETS.memoryTerminal.rawRemote}
                  localSrc={ASSETS.memoryTerminal.local}
                  alt="Memory Terminal"
                />
              </button>

              {/* Bottom-Left: Care Log Button */}
              <button
                type="button"
                aria-label="Care Log"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSelect()}
                className="glitchtopia-btn glitchtopia-btn-care"
              >
                <AssetImg
                  remoteSrc={ASSETS.careLog.remote}
                  rawRemoteSrc={ASSETS.careLog.rawRemote}
                  localSrc={ASSETS.careLog.local}
                  alt="Care Log"
                />
              </button>

              {/* Bottom Center-Left: Restore Clinic Button */}
              <button
                type="button"
                aria-label="Restore Clinic"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSelect()}
                className="glitchtopia-btn glitchtopia-btn-restore"
              >
                <AssetImg
                  remoteSrc={ASSETS.restoreClinic.remote}
                  rawRemoteSrc={ASSETS.restoreClinic.rawRemote}
                  localSrc={ASSETS.restoreClinic.local}
                  alt="Restore Clinic"
                />
              </button>

              {/* Bottom-Right: Defense Intercept Button */}
              <button
                type="button"
                aria-label="Defense Intercept"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playSelect()}
                className="glitchtopia-btn glitchtopia-btn-defense"
              >
                <AssetImg
                  remoteSrc={ASSETS.defenseIntercept.remote}
                  rawRemoteSrc={ASSETS.defenseIntercept.rawRemote}
                  localSrc={ASSETS.defenseIntercept.local}
                  alt="Defense Intercept"
                />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="glitchtopia-stage is-ready"
            onClick={() => {
              // Clicking empty background resets tapped/chosen chapter state
              if (tappedChapter !== null || chosenChapter !== null) {
                setTappedChapter(null);
                setChosenChapter(null);
              }
            }}
          >
            {/* Memory Terminal Background Image */}
            <AssetImg
              remoteSrc={ASSETS.memoryWall.remote}
              rawRemoteSrc={ASSETS.memoryWall.rawRemote}
              localSrc={ASSETS.memoryWall.local}
              alt="Memory Terminal Background"
              className="glitchtopia-wall-img"
            />

            {/* Interactive Chapter Cards Layer */}
            <div className="glitchtopia-hud-layer" data-chosen-chapter={chosenChapter ?? ''}>
              {/* Back Button to return to Glitchtopia main hub (frameless) */}
              <button
                type="button"
                aria-label={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                title={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
                onMouseEnter={() => sound.playHover()}
                onClick={(e) => {
                  e.stopPropagation();
                  backToHub();
                }}
                className="memory-terminal-back-btn"
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                >
                  <path
                    d="M18.5 5L14.2 9.3M11.6 11.9L9.5 14L18.5 23"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* 6 Diagonal Chapter Cards (05 down to 00) */}
              {MEMORY_CHAPTERS.map((item) => {
                const isChosen = chosenChapter === item.chapter;
                const isShifted =
                  isChosen ||
                  hoveredChapter === item.chapter ||
                  tappedChapter === item.chapter;
                const activeRemote = isShifted ? item.selectRemote : item.normalRemote;
                const activeRawRemote = isShifted ? item.selectRawRemote : item.normalRawRemote;
                const activeLocal = isShifted ? item.selectLocal : item.normalLocal;

                return (
                  <button
                    key={item.chapter}
                    type="button"
                    data-chapter={item.chapter}
                    aria-label={item.label}
                    onMouseEnter={() => {
                      if (
                        typeof window !== 'undefined' &&
                        window.matchMedia('(min-width: 1024px) and (hover: hover)').matches
                      ) {
                        sound.playHover();
                        setHoveredChapter(item.chapter);
                      }
                    }}
                    onMouseLeave={() => {
                      if (hoveredChapter === item.chapter) {
                        setHoveredChapter(null);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChapterClick(item.chapter);
                    }}
                    className={`memory-chapter-card ${isShifted ? 'is-shifted' : ''} ${
                      isChosen ? 'is-chosen' : ''
                    }`}
                  >
                    <AssetImg
                      remoteSrc={activeRemote}
                      rawRemoteSrc={activeRawRemote}
                      localSrc={activeLocal}
                      alt={item.label}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
