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
  careLogWall: {
    remote: `${CLOUDINARY_OPT}/v1794358870/carelog-wall.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794358870/carelog-wall.webp`,
    local: '/assets/aistudio/carelog-wall.webp',
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
  computer1: {
    remote: `${CLOUDINARY_OPT}/v1794223983/computer-1.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794223983/computer-1.webp`,
    local: '/assets/aistudio/computer-1.webp',
  },
  computer2: {
    remote: `${CLOUDINARY_OPT}/v1794223985/computer-2.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794223985/computer-2.webp`,
    local: '/assets/aistudio/computer-2.webp',
  },
  plant: {
    remote: `${CLOUDINARY_OPT}/v1794353564/plant.webp`,
    rawRemote: `${CLOUDINARY_RAW}/v1794353564/plant.webp`,
    local: '/assets/aistudio/plant.webp',
  },
};

const COMPUTER_SKINS = [ASSETS.computer0, ASSETS.computer1, ASSETS.computer2];

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

type GlitchtopiaPage = 'hub' | 'memory-terminal' | 'care-log';
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

  // Robot Plant Pot 3-expression cycle (0: vertical pixel eyes, 1: horizontal sleeping bars, 2: hollow circles + arcs)
  const [plantFaceIndex, setPlantFaceIndex] = useState<number>(0);

  // Hologram Computer 3-skin cycle (0: computer-0, 1: computer-1, 2: computer-2)
  const [computerSkinIndex, setComputerSkinIndex] = useState<number>(0);

  // Care Log interactive log boxes (Log - 1 .. Log - 6)
  const [hoveredCareLog, setHoveredCareLog] = useState<number | null>(null);
  const [selectedCareLog, setSelectedCareLog] = useState<number | null>(null);

  // Chibi happy interaction & speech bubble state
  // - happyBlobRef: cached in-memory Blob of chibi-happy.webp so each click creates a fresh
  //   ObjectURL that starts WebP playback strictly from Frame 0 (0ms) with zero network latency
  const happyBlobRef = useRef<Blob | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);
  const isHappyPlayingRef = useRef<boolean>(false);
  const [happyPlaySrc, setHappyPlaySrc] = useState<string | null>(null);
  const [happyPlayKey, setHappyPlayKey] = useState<number>(0);
  const [isIdleMasked, setIsIdleMasked] = useState<boolean>(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(false);
  const [speechSource, setSpeechSource] = useState<'chibi' | 'plant'>('chibi');

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
      isHappyPlayingRef.current = false;
      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }
    };
  }, [clearChibiTimers]);

  const triggerChibiHappy = useCallback(
    (source: 'chibi' | 'plant') => {
      setSpeechSource(source);

      // If the happy pose is already running, let it continue playing all the way to the end
      if (isHappyPlayingRef.current) {
        return;
      }

      isHappyPlayingRef.current = true;
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

  const handleChibiClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSuccess();
      triggerChibiHappy('chibi');
    },
    [triggerChibiHappy]
  );

  const handlePlantClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSelect();
      setPlantFaceIndex((prev) => (prev + 1) % 3);
      triggerChibiHappy('plant');
    },
    [triggerChibiHappy]
  );

  const handleComputerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSelect();
    setComputerSkinIndex((prev) => (prev + 1) % 3);
  }, []);

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
      isHappyPlayingRef.current = false;
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

  // Preload sub-page assets during idle time AFTER main hub is ready so hub assets get 100% initial bandwidth
  useEffect(() => {
    if (!isWallReady) return;
    const timer = window.setTimeout(() => {
      const urls = [
        ASSETS.computer1.remote,
        ASSETS.computer2.remote,
        ASSETS.careLogWall.remote,
        ASSETS.memoryWall.remote,
        ...MEMORY_CHAPTERS.flatMap((c) => [c.normalRemote, c.selectRemote]),
      ];
      urls.forEach((u) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = u;
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [isWallReady]);

  // Sync browser Back button / mobile edge-swipe with sub-page state (keeping /glitchtopia slug)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const statePage = event.state?.glitchtopiaPage;
      const targetPage: GlitchtopiaPage =
        statePage === 'memory-terminal' || statePage === 'care-log' ? statePage : 'hub';
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

  const openCareLog = useCallback(() => {
    sound.playSelect();
    setHoveredChapter(null);
    setTappedChapter(null);
    setChosenChapter(null);
    setCurrentPage('care-log');

    try {
      const targetUrl =
        GLITCHTOPIA_SLUG + window.location.search + window.location.hash;
      window.history.pushState(
        { eventSlug: 'glitchtopia', glitchtopiaPage: 'care-log' },
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
      const statePage = window.history.state?.glitchtopiaPage;
      if (statePage === 'memory-terminal' || statePage === 'care-log') {
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

        {/* Keep Hub stage mounted in memory so returning from Care Log / Memory Terminal is 0ms instant */}
        <div
          className={`glitchtopia-stage ${isWallReady ? 'is-ready' : 'is-loading'} ${
            currentPage !== 'hub' ? 'is-background-stage' : ''
          }`}
          aria-hidden={currentPage !== 'hub'}
        >
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

              {/* Left Sofa Interactive Robot Plant Pot (Cycles 3 Screen Expressions: 0 -> 1 -> 2 -> 0) */}
              <button
                type="button"
                aria-label="Touch Robot Plant Pot"
                onClick={handlePlantClick}
                className="glitchtopia-plant-btn"
              >
                <AssetImg
                  remoteSrc={ASSETS.plant.remote}
                  rawRemoteSrc={ASSETS.plant.rawRemote}
                  localSrc={ASSETS.plant.local}
                  alt="Robot Plant Pot"
                  className="glitchtopia-plant-img"
                />

                {/* Screen Face Overlay locked to the dark monitor region (835,1338 765x562 on 2048x2048) */}
                <svg
                  key={plantFaceIndex}
                  viewBox="0 0 200 146"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="glitchtopia-plant-face"
                  aria-hidden="true"
                >
                  <defs>
                    <filter
                      id="plantEyeGlow"
                      x="-25%"
                      y="-25%"
                      width="150%"
                      height="150%"
                      colorInterpolationFilters="sRGB"
                    >
                      <feGaussianBlur stdDeviation="2.0" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <clipPath id="leftBatteryClip">
                      <rect x="47" y="45" width="28" height="52" rx="6" />
                    </clipPath>
                    <clipPath id="rightBatteryClip">
                      <rect x="131" y="39" width="25" height="50" rx="5.5" />
                    </clipPath>
                  </defs>

                  {plantFaceIndex === 0 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Top-left subtle magenta glitch line matching Hình 1 */}
                      <rect
                        x="18"
                        y="22"
                        width="44"
                        height="3.2"
                        rx="1.6"
                        transform="rotate(-2 18 22)"
                        fill="#d946ef"
                        fillOpacity="0.88"
                      />

                      {/* Left Vertical Pixel Eye (3 stacked color bars + glowing cyan rim) */}
                      <g clipPath="url(#leftBatteryClip)">
                        <rect x="45" y="44" width="32" height="19" fill="#0d566e" />
                        <rect x="45" y="62" width="32" height="18" fill="#2799bd" />
                        <rect x="45" y="79" width="32" height="20" fill="#63e6fc" />
                      </g>
                      <rect
                        x="47"
                        y="45"
                        width="28"
                        height="52"
                        rx="6.5"
                        stroke="#a6f9ff"
                        strokeWidth="4.4"
                      />

                      {/* Right Vertical Pixel Eye (slightly higher & narrower in 3/4 perspective) */}
                      <g clipPath="url(#rightBatteryClip)">
                        <rect x="129" y="38" width="29" height="18" fill="#0d566e" />
                        <rect x="129" y="55" width="29" height="17" fill="#2799bd" />
                        <rect x="129" y="71" width="29" height="20" fill="#63e6fc" />
                      </g>
                      <rect
                        x="131"
                        y="39"
                        width="25"
                        height="50"
                        rx="6"
                        stroke="#a6f9ff"
                        strokeWidth="4.4"
                      />
                    </g>
                  )}

                  {plantFaceIndex === 1 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Left Horizontal Blinking Bar Eye matching Hình 2 */}
                      <rect
                        x="22"
                        y="69"
                        width="56"
                        height="13.5"
                        rx="6.75"
                        transform="rotate(-4.2 50 75)"
                        fill="#72f5ff"
                        stroke="#bdfbff"
                        strokeWidth="1.2"
                      />

                      {/* Right Horizontal Blinking Bar Eye matching Hình 2 */}
                      <rect
                        x="116"
                        y="61"
                        width="50"
                        height="13"
                        rx="6.5"
                        transform="rotate(-4.2 141 67)"
                        fill="#72f5ff"
                        stroke="#bdfbff"
                        strokeWidth="1.2"
                      />

                      {/* Bottom-right subtle mint-green glitch line matching Hình 2 */}
                      <rect
                        x="140"
                        y="117"
                        width="44"
                        height="3.4"
                        rx="1.7"
                        transform="rotate(-3 140 117)"
                        fill="#a7f3d0"
                        fillOpacity="0.92"
                      />
                    </g>
                  )}

                  {plantFaceIndex === 2 && (
                    <g filter="url(#plantEyeGlow)">
                      {/* Left Hollow Circle Eye matching Hình 3 */}
                      <ellipse
                        cx="56"
                        cy="74"
                        rx="23.5"
                        ry="24.5"
                        stroke="#6aefff"
                        strokeWidth="6.2"
                      />

                      {/* Bottom-left cute curved arc (◡) below left eye */}
                      <path
                        d="M 32 113 Q 42 124 52 112"
                        stroke="#6aefff"
                        strokeWidth="5.8"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Right Hollow Circle Eye matching Hình 3 */}
                      <ellipse
                        cx="151"
                        cy="68"
                        rx="20.5"
                        ry="23.5"
                        stroke="#6aefff"
                        strokeWidth="6"
                      />

                      {/* Top-right cute curved arc (◡) above right eye */}
                      <path
                        d="M 134 24 Q 144 35 154 23"
                        stroke="#6aefff"
                        strokeWidth="5.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  )}
                </svg>
              </button>

              {/* Right Shelf Interactive Hologram Computer Monitor (Cycles Skin 0 -> Skin 1 -> Skin 2 -> Skin 0) */}
              <div className="glitchtopia-computer-wrap">
                {COMPUTER_SKINS.map((skin, idx) => (
                  <AssetImg
                    key={skin.local}
                    remoteSrc={skin.remote}
                    rawRemoteSrc={skin.rawRemote}
                    localSrc={skin.local}
                    alt={`Hologram Computer Terminal Skin ${idx}`}
                    className={`glitchtopia-computer-img ${computerSkinIndex === idx ? 'is-active' : 'is-inactive'}`}
                  />
                ))}
                <button
                  type="button"
                  aria-label="Switch Hologram Computer Skin"
                  onClick={handleComputerClick}
                  className="glitchtopia-computer-click-area"
                />
              </div>

              {/* Center Interactive Chibi Character (Dual-layer Idle / Happy Animated WebP for Frame-0 zero-glitch playback) */}
              <div className="glitchtopia-chibi-hitbox">
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
                {/* Tight Silhouette Hitbox hugging only the Chibi's actual head, hair, torso, and boots */}
                <button
                  type="button"
                  aria-label="Touch Xavier Chibi"
                  onClick={handleChibiClick}
                  className="glitchtopia-chibi-click-area"
                />
              </div>

              {/* In-Game Speech Bubble matching reference screenshot */}
              {showSpeechBubble && (
                <div
                  className={`chibi-speech-bubble ${speechSource === 'plant' ? 'is-plant-quote' : ''}`}
                  role="status"
                  aria-live="polite"
                >
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
                    {speechSource === 'plant' ? (
                      <>
                        <span>It&apos;ll never struggle to find</span>
                        <span>two matching leaves.</span>
                      </>
                    ) : (
                      <>
                        <span>Your warm hand just</span>
                        <span>saved the world again.</span>
                      </>
                    )}
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
                onClick={openCareLog}
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

        {currentPage === 'care-log' && (
          <div className="glitchtopia-stage is-ready">
            {/* Coordinate-locked 1640x2360 Care Log Scene Canvas */}
            <div className="glitchtopia-scene-canvas is-care-log-canvas">
              <AssetImg
                remoteSrc={ASSETS.careLogWall.remote}
                rawRemoteSrc={ASSETS.careLogWall.rawRemote}
                localSrc={ASSETS.careLogWall.local}
                alt="Care Log Background"
                className="glitchtopia-scene-wall"
              />

              {/* Pixel-locked 1640x2360 Care Log Board Text & Cyber HUD Overlay (No Lock Icons) */}
              <svg
                className="care-log-board-svg"
                viewBox="0 0 1640 2360"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Care Log — Xavier Maintenance Status"
              >
                <defs>
                  <linearGradient id="careLogUnderlineGrad" x1="348" y1="609" x2="685" y2="609" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8fe8ff" stopOpacity="0.65" />
                    <stop offset="55%" stopColor="#ff4d7d" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#8fe8ff" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="careBoxBotGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4de4ff" stopOpacity="0" />
                    <stop offset="58%" stopColor="#4de4ff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#72f2ff" stopOpacity="0.42" />
                  </linearGradient>
                  <linearGradient id="careBoxBotGlowActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6cecff" stopOpacity="0.06" />
                    <stop offset="50%" stopColor="#6cecff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#9cf8ff" stopOpacity="0.62" />
                  </linearGradient>
                  <filter
                    id="careCyanGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur stdDeviation="2.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <clipPath id="careLogTopHalf">
                    <rect x="590" y="540" width="115" height="47" />
                  </clipPath>
                  <clipPath id="careLogBottomHalf">
                    <rect x="590" y="587" width="115" height="35" />
                  </clipPath>
                  {/* 8-tooth cog mask with center hole + diagonal wrench handle separation gap */}
                  <mask id="careGearMask">
                    <rect x="-40" y="-40" width="80" height="80" fill="black" />
                    <g transform="rotate(-12)">
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(45)" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(90)" fill="white" />
                      <rect x="-4.4" y="-25.5" width="8.8" height="51" rx="2" transform="rotate(135)" fill="white" />
                      <circle cx="0" cy="0" r="19.5" fill="white" />
                    </g>
                    {/* Inner hole of gear */}
                    <circle cx="0" cy="0" r="12.2" fill="black" />
                    {/* Separation gap around the bottom-left wrench shaft */}
                    <g transform="rotate(-45)">
                      <rect x="-27" y="-5.8" width="24" height="11.6" rx="4" fill="black" />
                    </g>
                  </mask>
                  {/* Wrench head jaw cutout mask */}
                  <mask id="careWrenchMask">
                    <rect x="-40" y="-40" width="80" height="80" fill="white" />
                    <rect x="3.5" y="-3.5" width="14" height="7" rx="1.4" fill="black" />
                  </mask>
                </defs>

                {/* Top red-pink cyber accent line above "Care Log" */}
                <line
                  x1="396"
                  y1="528"
                  x2="668"
                  y2="528"
                  stroke="#ff4b7d"
                  strokeOpacity="0.42"
                  strokeWidth="1.8"
                />
                <rect
                  x="668"
                  y="525.5"
                  width="36"
                  height="5"
                  rx="1.5"
                  fill="#ff4b7d"
                  fillOpacity="0.9"
                />

                {/* Top-Left Corner Bracket ┌ */}
                <path
                  d="M 404 530 H 385 V 596"
                  stroke="#c8f6ff"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                />

                {/* "Care" Title */}
                <text
                  x="404"
                  y="601"
                  fill="#f4f9ff"
                  fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                  fontSize="80"
                  fontWeight="700"
                  letterSpacing="0.01em"
                >
                  Care
                </text>

                {/* "Log" Title with authentic horizontal cyber glitch slice */}
                <g clipPath="url(#careLogTopHalf)">
                  <text
                    x="599"
                    y="601"
                    fill="#f4f9ff"
                    fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                    fontSize="50"
                    fontWeight="700"
                    letterSpacing="0.01em"
                  >
                    Log
                  </text>
                </g>
                <g clipPath="url(#careLogBottomHalf)">
                  <text
                    x="602.5"
                    y="601"
                    fill="#eaf6ff"
                    fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
                    fontSize="50"
                    fontWeight="700"
                    letterSpacing="0.01em"
                  >
                    Log
                  </text>
                </g>
                {/* Subtle cyan glitch scanline across "Log" */}
                <rect
                  x="598"
                  y="586.2"
                  width="88"
                  height="1.6"
                  fill="#7ceeff"
                  fillOpacity="0.75"
                />

                {/* Bottom-Right Corner Bracket ┘ */}
                <path
                  d="M 706 566 V 615 H 688"
                  stroke="#d8f6ff"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                />

                {/* Bottom horizontal underline below Care Log */}
                <line
                  x1="348"
                  y1="609"
                  x2="682"
                  y2="609"
                  stroke="url(#careLogUnderlineGrad)"
                  strokeWidth="1.8"
                />

                {/* Status Line 1: Extraterrestrial elements detected! */}
                <text
                  x="684"
                  y="783"
                  fill="#d9e7f5"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="24.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Extraterrestrial elements detected!
                </text>

                {/* Micro-label ANDROID at top edge of cyan bar */}
                <text
                  x="842"
                  y="823"
                  fill="#567694"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.06em"
                >
                  ANDROID
                </text>

                {/* Character Name: Xavier */}
                <text
                  x="705"
                  y="863"
                  fill="#eff7ff"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="37"
                  fontWeight="500"
                  letterSpacing="0.06em"
                >
                  Xavier
                </text>

                {/* Left Column: Maintenance Date + REPAIR DATE */}
                <text
                  x="684"
                  y="924"
                  fill="#d2e2f2"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Maintenance Date
                </text>
                <text
                  x="685"
                  y="944"
                  fill="#4c6885"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="12"
                  fontWeight="500"
                  letterSpacing="0.14em"
                >
                  REPAIR DATE
                </text>

                {/* Right Column: Maintenance system running... */}
                <text
                  x="900"
                  y="919"
                  fill="#2ec2de"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Maintenance system
                </text>
                <text
                  x="900"
                  y="946"
                  fill="#2ec2de"
                  fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                  fontSize="21.5"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  running...
                </text>

                {/* 6 Interactive Care Log Boxes (Log - 1 .. Log - 6) */}
                {[
                  { id: 1, label: 'Log - 1', x: 436, y: 1092 },
                  { id: 2, label: 'Log - 2', x: 844, y: 1092 },
                  { id: 3, label: 'Log - 3', x: 436, y: 1264 },
                  { id: 4, label: 'Log - 4', x: 844, y: 1264 },
                  { id: 5, label: 'Log - 5', x: 436, y: 1436 },
                  { id: 6, label: 'Log - 6', x: 844, y: 1436 },
                ].map((box) => {
                  const isActive = hoveredCareLog === box.id || selectedCareLog === box.id;
                  return (
                    <g
                      key={box.id}
                      transform={`translate(${box.x}, ${box.y})`}
                      className={`care-log-box-item ${isActive ? 'is-active' : ''}`}
                      role="button"
                      tabIndex={0}
                      aria-label={box.label}
                      onMouseEnter={() => {
                        sound.playHover();
                        setHoveredCareLog(box.id);
                      }}
                      onMouseLeave={() => {
                        if (hoveredCareLog === box.id) {
                          setHoveredCareLog(null);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playSelect();
                        setSelectedCareLog(box.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          sound.playSelect();
                          setSelectedCareLog(box.id);
                        }
                      }}
                    >
                      {/* Full Box Click Hit Area */}
                      <path
                        d="M 0 0 H 359 V 134 H 14 L 0 120 Z"
                        fill="transparent"
                      />

                      {/* Bottom Upward Cyan Inner Glow matching unlocked Care Log box */}
                      <path
                        d="M 1 82 H 358 V 133 H 14.5 L 1 119.5 Z"
                        fill={isActive ? 'url(#careBoxBotGlowActive)' : 'url(#careBoxBotGlow)'}
                      />

                      {/* Glowing Cyan Bottom + Chamfer Border Line */}
                      <path
                        d="M 1 119.5 L 14.5 133 H 358"
                        stroke={isActive ? '#d6fcff' : '#95f3ff'}
                        strokeWidth={isActive ? '3.4' : '2.6'}
                        filter="url(#careCyanGlow)"
                      />

                      {/* Bottom-left cyber glitch bar + pixel block */}
                      <rect
                        x="22"
                        y="122"
                        width="54"
                        height="2.6"
                        rx="1.3"
                        fill="#bef8ff"
                        fillOpacity="0.88"
                      />
                      <rect
                        x="28"
                        y="117.5"
                        width="12"
                        height="3.2"
                        fill="#7ceeff"
                        fillOpacity="0.55"
                      />

                      {/* Top-right cyber glitch bars matching reference screenshot */}
                      <rect
                        x="306"
                        y="-1"
                        width="50"
                        height="2.8"
                        rx="1.4"
                        fill="#cbfaff"
                        fillOpacity="0.92"
                      />
                      <rect
                        x="294"
                        y="8.5"
                        width="44"
                        height="2.5"
                        rx="1.2"
                        fill="#8ff0ff"
                        fillOpacity="0.9"
                      />
                      <rect
                        x="326"
                        y="8.5"
                        width="38"
                        height="2.2"
                        rx="1.1"
                        fill="#a78bfa"
                        fillOpacity="0.78"
                      />
                      <rect
                        x="284"
                        y="14.5"
                        width="7"
                        height="2.2"
                        fill="#7ceeff"
                        fillOpacity="0.75"
                      />

                      {/* Left Gear + Wrench Icon (centered at x=87, y=68) */}
                      <g transform="translate(87, 68)">
                        {/* Outer faint blue-cyan HUD ring + segmented arc highlights */}
                        <circle
                          cx="0"
                          cy="0"
                          r="34"
                          stroke="#387da8"
                          strokeOpacity="0.55"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M -24 -24 A 34 34 0 0 1 24 -24"
                          stroke="#66d4ff"
                          strokeOpacity="0.62"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 25 23 A 34 34 0 0 1 -14 31"
                          stroke="#66d4ff"
                          strokeOpacity="0.48"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        {/* 8-tooth Cyan Gear + Diagonal Wrench */}
                        <g filter="url(#careCyanGlow)">
                          <rect
                            x="-30"
                            y="-30"
                            width="60"
                            height="60"
                            fill={isActive ? '#d8fbff' : '#b2f0ff'}
                            mask="url(#careGearMask)"
                          />
                          {/* Diagonal Open-End Wrench (-45deg) */}
                          <g transform="rotate(-45)" mask="url(#careWrenchMask)">
                            <rect
                              x="-24"
                              y="-3.3"
                              width="28"
                              height="6.6"
                              rx="3.3"
                              fill={isActive ? '#e0fcff' : '#bcf4ff'}
                            />
                            <circle
                              cx="6.2"
                              cy="0"
                              r="7.8"
                              fill={isActive ? '#e0fcff' : '#bcf4ff'}
                            />
                          </g>
                        </g>
                      </g>

                      {/* "Log - N" Label */}
                      <text
                        x="138"
                        y="78"
                        fill="#eef7ff"
                        fontFamily="'Be Vietnam Pro', 'Segoe UI', sans-serif"
                        fontSize="31"
                        fontWeight="600"
                        letterSpacing="0.02em"
                      >
                        {box.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive HUD Layer with Top-Left Back Button */}
            <div className="glitchtopia-hud-layer">
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
            </div>
          </div>
        )}

        {currentPage === 'memory-terminal' && (
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
                        window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches
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
