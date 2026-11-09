/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
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
    const siteTitle = lang === 'VI' ? 'Trăng Soi Dặm Trường' : 'Moonstride';
    document.title = `Glitchtopia | ${siteTitle}`;
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

  // Preload Memory Terminal assets in background for instant switching
  useEffect(() => {
    const urls = [
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

              {/* Center Chibi Character (Animated WebP) */}
              <AssetImg
                remoteSrc={ASSETS.chibiIdle.remote}
                rawRemoteSrc={ASSETS.chibiIdle.rawRemote}
                localSrc={ASSETS.chibiIdle.local}
                alt="Xavier Chibi"
                className="glitchtopia-chibi"
              />
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
