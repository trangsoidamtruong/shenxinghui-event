import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppLang, ROBOT_TOUCH_I18N } from '../data/robotTouchI18n';
import {
  AOE_SLOW_DURATION,
  mountRobotTouchGame,
  preloadRobotTouchAssets,
  RobotTouchGameOverResult,
  RobotTouchInstance,
  RobotTouchSkillState,
  SKILL_COOLDOWN,
} from '../games/robotTouch';
import { sound } from '../utils/sound';
import '../games/robotTouch.css';

const CHIBI_IDLE_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452626/chibi-gameidle.webp';
const CHIBI_IDLE_LOCAL =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452626/chibi-gameidle.webp';

const CHIBI_HIT_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794535337/chibi-gamehit_error.webp';
const CHIBI_HIT_LOCAL = '/assets/robot-touch/chibi-gamehit_error.webp';

const CITY_LOSE_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto/v1794537626/city-lose.png';
const CHIBI_LOSE_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452613/chibi_sitting_transparent.webp';

const CITY_WIN_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto/v1794539468/city-win.png';
const CHIBI_WIN_REMOTE =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/v1794452612/chibi_stage_transparent.webp';

const AOE_SLOW_ICON =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto/v1794547767/aoeslow.webp';
const FULL_SWEEP_ICON =
  'https://res.cloudinary.com/trangsoidamtruong/image/upload/f_auto,q_auto/v1794547983/fullsweep.webp';
const SKILL_CD_CIRC = 157.08;
const SKILL_ACTIVE_RING_CIRC = 289.03; // 2 * pi * 46

// Exact 1-cycle duration of chibi-gamehit_error.webp (14 frames = 462ms)
const CHIBI_HIT_REVEAL_IDLE_MS = 440;
const CHIBI_HIT_HIDE_MS = 465;

interface RobotTouchSectionProps {
  lang: AppLang;
  isBootReady: boolean;
  onNavigateGlitchtopiaHub: () => void;
}

export const RobotTouchSection: React.FC<RobotTouchSectionProps> = ({
  lang,
  isBootReady,
  onNavigateGlitchtopiaHub,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameInstanceRef = useRef<RobotTouchInstance | null>(null);
  const [isTransitionDone, setIsTransitionDone] = useState<boolean>(false);
  const [endResult, setEndResult] = useState<RobotTouchGameOverResult | null>(
    null
  );
  const [skillPhase, setSkillPhase] = useState<{
    aoeSlow: 'ready' | 'active' | 'cooldown';
    fullSweep: 'ready' | 'cooldown';
  }>({
    aoeSlow: 'ready',
    fullSweep: 'ready',
  });
  const skillStateRef = useRef<RobotTouchSkillState>({
    aoeSlowCd: 0,
    fullSweepCd: 0,
    aoeSlowActive: 0,
  });
  const aoeActiveCircleRef = useRef<SVGCircleElement | null>(null);
  const aoeCdCircleRef = useRef<SVGCircleElement | null>(null);
  const fullSweepCdCircleRef = useRef<SVGCircleElement | null>(null);

  const handleSkillStateChange = useCallback((next: RobotTouchSkillState) => {
    skillStateRef.current = next;

    if (next.aoeSlowActive > 0 && aoeActiveCircleRef.current) {
      const dash = Math.min(
        SKILL_ACTIVE_RING_CIRC,
        Math.max(
          0,
          (next.aoeSlowActive / AOE_SLOW_DURATION) * SKILL_ACTIVE_RING_CIRC
        )
      ).toFixed(2);
      aoeActiveCircleRef.current.setAttribute(
        'stroke-dasharray',
        `${dash} ${SKILL_ACTIVE_RING_CIRC}`
      );
    } else if (next.aoeSlowCd > 0 && aoeCdCircleRef.current) {
      const dash = Math.min(
        SKILL_CD_CIRC,
        Math.max(0, (next.aoeSlowCd / SKILL_COOLDOWN) * SKILL_CD_CIRC)
      ).toFixed(2);
      aoeCdCircleRef.current.setAttribute(
        'stroke-dasharray',
        `${dash} ${SKILL_CD_CIRC}`
      );
    }

    if (next.fullSweepCd > 0 && fullSweepCdCircleRef.current) {
      const dash = Math.min(
        SKILL_CD_CIRC,
        Math.max(0, (next.fullSweepCd / SKILL_COOLDOWN) * SKILL_CD_CIRC)
      ).toFixed(2);
      fullSweepCdCircleRef.current.setAttribute(
        'stroke-dasharray',
        `${dash} ${SKILL_CD_CIRC}`
      );
    }

    const nextAoePhase: 'ready' | 'active' | 'cooldown' =
      next.aoeSlowActive > 0
        ? 'active'
        : next.aoeSlowCd > 0
          ? 'cooldown'
          : 'ready';
    const nextSweepPhase: 'ready' | 'cooldown' =
      next.fullSweepCd > 0 ? 'cooldown' : 'ready';

    setSkillPhase((prev) =>
      prev.aoeSlow === nextAoePhase && prev.fullSweep === nextSweepPhase
        ? prev
        : { aoeSlow: nextAoePhase, fullSweep: nextSweepPhase }
    );
  }, []);

  // Single-shot (non-looping) hit animation state & RAM Blob cache
  const [hitPlaySrc, setHitPlaySrc] = useState<string | null>(null);
  const [isIdleMasked, setIsIdleMasked] = useState<boolean>(false);
  const hitBlobRef = useRef<Blob | null>(null);
  const activeHitObjectUrlRef = useRef<string | null>(null);
  const revealIdleTimerRef = useRef<number | null>(null);
  const hideHitTimerRef = useRef<number | null>(null);

  const clearHitTimers = useCallback(() => {
    if (revealIdleTimerRef.current !== null) {
      window.clearTimeout(revealIdleTimerRef.current);
      revealIdleTimerRef.current = null;
    }
    if (hideHitTimerRef.current !== null) {
      window.clearTimeout(hideHitTimerRef.current);
      hideHitTimerRef.current = null;
    }
  }, []);

  // Play chibi-gamehit_error.webp strictly once (no loop) whenever player draws a correct symbol
  const triggerHitAnimation = useCallback(() => {
    clearHitTimers();

    let nextSrc: string;
    if (hitBlobRef.current) {
      const nextUrl = URL.createObjectURL(hitBlobRef.current);
      if (activeHitObjectUrlRef.current) {
        const oldUrl = activeHitObjectUrlRef.current;
        window.setTimeout(() => URL.revokeObjectURL(oldUrl), 80);
      }
      activeHitObjectUrlRef.current = nextUrl;
      nextSrc = nextUrl;
    } else {
      nextSrc = `${CHIBI_HIT_REMOTE}?t=${Date.now()}`;
    }

    setHitPlaySrc(nextSrc);
  }, [clearHitTimers]);

  const handleHitFrameZeroReady = useCallback(() => {
    clearHitTimers();
    setIsIdleMasked(true);

    // Reveal idle right as frame 14 finishes, then unmount hit cleanly so it never loops
    revealIdleTimerRef.current = window.setTimeout(() => {
      setIsIdleMasked(false);
      revealIdleTimerRef.current = null;
    }, CHIBI_HIT_REVEAL_IDLE_MS);

    hideHitTimerRef.current = window.setTimeout(() => {
      setHitPlaySrc(null);
      hideHitTimerRef.current = null;
    }, CHIBI_HIT_HIDE_MS);
  }, [clearHitTimers]);

  const handleGameOver = useCallback((result: RobotTouchGameOverResult) => {
    setEndResult(result);
  }, []);

  const handlePlayAgain = useCallback(() => {
    sound.playSelect();
    setEndResult(null);
    skillStateRef.current = { aoeSlowCd: 0, fullSweepCd: 0, aoeSlowActive: 0 };
    setSkillPhase({ aoeSlow: 'ready', fullSweep: 'ready' });
    gameInstanceRef.current?.restart();
  }, []);

  const handleAoeSlowClick = useCallback(() => {
    if (endResult || skillPhase.aoeSlow !== 'ready') {
      return;
    }
    if (gameInstanceRef.current?.triggerAoeSlow()) {
      sound.playSelect();
    }
  }, [endResult, skillPhase.aoeSlow]);

  const handleFullSweepClick = useCallback(() => {
    if (endResult || skillPhase.fullSweep !== 'ready') return;
    if (gameInstanceRef.current?.triggerFullSweep()) {
      sound.playSelect();
    }
  }, [endResult, skillPhase.fullSweep]);

  const handleExit = useCallback(() => {
    sound.playSelect();
    onNavigateGlitchtopiaHub();
  }, [onNavigateGlitchtopiaHub]);

  const handleBackClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      sound.playSelect();
      if (endResult) {
        onNavigateGlitchtopiaHub();
        return;
      }
      const result = gameInstanceRef.current?.retreat();
      if (!result) {
        onNavigateGlitchtopiaHub();
      }
    },
    [endResult, onNavigateGlitchtopiaHub]
  );

  // Preload game textures + fetch chibi-gamehit_error.webp Blob into RAM, and defer end-screen art
  useEffect(() => {
    preloadRobotTouchAssets();

    for (const url of [AOE_SLOW_ICON, FULL_SWEEP_ICON]) {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
    }

    const endScreenTimer = window.setTimeout(() => {
      for (const url of [
        CITY_LOSE_REMOTE,
        CHIBI_LOSE_REMOTE,
        CITY_WIN_REMOTE,
        CHIBI_WIN_REMOTE,
      ]) {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      }
    }, 1200);

    let cancelled = false;
    if (!hitBlobRef.current) {
      (async () => {
        for (const url of [CHIBI_HIT_REMOTE, CHIBI_HIT_LOCAL]) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const buf = await res.arrayBuffer();
              if (!cancelled && !hitBlobRef.current) {
                hitBlobRef.current = new Blob([buf], { type: 'image/webp' });
              }
              return;
            }
          } catch {
            // Try next candidate
          }
        }
      })();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(endScreenTimer);
    };
  }, []);

  // Fallback timer in case CSS animation is skipped (prefers-reduced-motion or background tab)
  useEffect(() => {
    if (!isBootReady) return;
    const timer = window.setTimeout(() => {
      setIsTransitionDone(true);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [isBootReady]);

  // Initialize game strictly after boot sequence + page entry transition finish, and clean up on unmount
  useEffect(() => {
    if (!isBootReady || !isTransitionDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    preloadRobotTouchAssets().then(() => {
      if (cancelled || !canvasRef.current) return;
      gameInstanceRef.current = mountRobotTouchGame(
        canvasRef.current,
        lang,
        triggerHitAnimation,
        handleGameOver,
        handleSkillStateChange
      );
    });

    return () => {
      cancelled = true;
      clearHitTimers();
      setHitPlaySrc(null);
      setIsIdleMasked(false);
      setEndResult(null);
      skillStateRef.current = { aoeSlowCd: 0, fullSweepCd: 0, aoeSlowActive: 0 };
      setSkillPhase({ aoeSlow: 'ready', fullSweep: 'ready' });
      if (activeHitObjectUrlRef.current) {
        URL.revokeObjectURL(activeHitObjectUrlRef.current);
        activeHitObjectUrlRef.current = null;
      }
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy();
        gameInstanceRef.current = null;
      }
    };
    // Only mount/unmount when route readiness changes; language updates via setLang below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBootReady, isTransitionDone]);

  // Live language update without resetting active gameplay
  useEffect(() => {
    if (gameInstanceRef.current) {
      gameInstanceRef.current.setLang(lang);
    }
  }, [lang]);

  const tStrings = ROBOT_TOUCH_I18N[lang];
  const isWin = (endResult?.stars ?? 0) >= 1;

  return (
    <section
      className={`rt-page-section ${isBootReady ? 'is-entering' : 'opacity-0'}`}
      aria-label="Defense Intercept"
      onAnimationEnd={(e) => {
        if (e.currentTarget === e.target) {
          setIsTransitionDone(true);
        }
      }}
    >
      <div className="rt-stage-outer">
        <div className="rt-wrap">
          {/* Idle Chibi (loops continuously on sidewalk) */}
          <img
            src={CHIBI_IDLE_REMOTE}
            alt="Xavier Chibi"
            decoding="async"
            loading="eager"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallbackApplied) {
                img.dataset.fallbackApplied = '1';
                img.src = CHIBI_IDLE_LOCAL;
              }
            }}
            className={`rt-chibi-idle ${isIdleMasked ? 'is-masked' : ''}`}
          />

          {/* Single-shot Hit Chibi (plays 1 cycle = 462ms on correct glyph draw, never loops) */}
          {hitPlaySrc && (
            <img
              key={hitPlaySrc}
              src={hitPlaySrc}
              alt=""
              aria-hidden="true"
              decoding="sync"
              onLoad={handleHitFrameZeroReady}
              className="rt-chibi-hit"
            />
          )}

          <canvas ref={canvasRef} className="rt-canvas" />

          {/* Tactical Skill Buttons inside top-left DRAW AREA (clickable, 15s cooldown) */}
          {!endResult && (
            <div
              className="rt-skills-dock"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="rt-skill-item">
                <button
                  type="button"
                  onMouseEnter={() => {
                    if (skillPhase.aoeSlow === 'ready') {
                      sound.playHover();
                    }
                  }}
                  onClick={handleAoeSlowClick}
                  disabled={skillPhase.aoeSlow !== 'ready'}
                  aria-label={tStrings.skillAoeSlow}
                  className={`rt-skill-btn ${
                    skillPhase.aoeSlow === 'active'
                      ? 'is-active'
                      : skillPhase.aoeSlow === 'cooldown'
                        ? 'is-cooldown'
                        : ''
                  }`}
                >
                  <img
                    src={AOE_SLOW_ICON}
                    alt={tStrings.skillAoeSlow}
                    draggable={false}
                    className="rt-skill-icon"
                  />
                  {skillPhase.aoeSlow === 'active' ? (
                    <svg
                      viewBox="0 0 100 100"
                      className="rt-skill-active-svg"
                      aria-hidden="true"
                    >
                      <circle
                        ref={aoeActiveCircleRef}
                        cx="50"
                        cy="50"
                        r="46"
                        fill="rgba(22, 118, 178, 0.24)"
                        stroke="rgba(104, 244, 255, 0.96)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${SKILL_ACTIVE_RING_CIRC} ${SKILL_ACTIVE_RING_CIRC}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  ) : (
                    skillPhase.aoeSlow === 'cooldown' && (
                      <svg
                        viewBox="0 0 100 100"
                        className="rt-skill-cd-svg"
                        aria-hidden="true"
                      >
                        <circle
                          ref={aoeCdCircleRef}
                          cx="50"
                          cy="50"
                          r="25"
                          fill="none"
                          stroke="rgba(5, 11, 22, 0.72)"
                          strokeWidth="50"
                          strokeDasharray={`${SKILL_CD_CIRC} ${SKILL_CD_CIRC}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    )
                  )}
                </button>
                <span className="rt-skill-label">{tStrings.skillAoeSlow}</span>
              </div>

              <div className="rt-skill-item">
                <button
                  type="button"
                  onMouseEnter={() => {
                    if (skillPhase.fullSweep === 'ready') sound.playHover();
                  }}
                  onClick={handleFullSweepClick}
                  disabled={skillPhase.fullSweep !== 'ready'}
                  aria-label={tStrings.skillFullSweep}
                  className={`rt-skill-btn ${
                    skillPhase.fullSweep === 'cooldown' ? 'is-cooldown' : ''
                  }`}
                >
                  <img
                    src={FULL_SWEEP_ICON}
                    alt={tStrings.skillFullSweep}
                    draggable={false}
                    className="rt-skill-icon"
                  />
                  {skillPhase.fullSweep === 'cooldown' && (
                    <svg
                      viewBox="0 0 100 100"
                      className="rt-skill-cd-svg"
                      aria-hidden="true"
                    >
                      <circle
                        ref={fullSweepCdCircleRef}
                        cx="50"
                        cy="50"
                        r="25"
                        fill="none"
                        stroke="rgba(5, 11, 22, 0.72)"
                        strokeWidth="50"
                        strokeDasharray={`${SKILL_CD_CIRC} ${SKILL_CD_CIRC}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  )}
                </button>
                <span className="rt-skill-label">
                  {tStrings.skillFullSweep}
                </span>
              </div>
            </div>
          )}

          {/* End-of-Round Result Overlay (0-star Retreat / >=1-star All Clear) */}
          {endResult && (
            <div
              className={`rt-lose-overlay ${isWin ? 'is-win' : 'is-lose'}`}
              role="dialog"
              aria-modal="true"
            >
              <div className="rt-lose-inner">
                {/* Top Hero: City Artwork + Retreat / All Clear Title + Debug Code */}
                <div className="rt-lose-hero">
                  <img
                    src={isWin ? CITY_WIN_REMOTE : CITY_LOSE_REMOTE}
                    alt=""
                    aria-hidden="true"
                    className={`rt-lose-city ${isWin ? 'is-win' : ''}`}
                  />
                  <div className={`rt-lose-title-wrap ${isWin ? 'is-win' : ''}`}>
                    <h2
                      className={`rt-lose-title ${isWin ? 'is-win' : ''}`}
                      data-text={isWin ? tStrings.allClearTitle : tStrings.retreatTitle}
                    >
                      {isWin ? tStrings.allClearTitle : tStrings.retreatTitle}
                    </h2>
                  </div>
                  <div className="rt-lose-debug-badge">
                    <span>{tStrings.retreatDebugCode}</span>
                  </div>
                </div>

                {/* Middle Stats: Points & 3 Stars (earned stars glow golden yellow) */}
                <div className="rt-lose-stats">
                  <div className="rt-lose-stat-row">
                    <span className="rt-lose-stat-label">
                      {tStrings.retreatPointsLabel}
                    </span>
                    <span className="rt-lose-stat-value">{endResult.points}</span>
                  </div>

                  <div className="rt-lose-stat-row">
                    <span className="rt-lose-stat-label">
                      {tStrings.retreatStarRatingLabel}
                    </span>
                    <div
                      className="rt-lose-stars"
                      aria-label={`${endResult.stars} out of 3 stars`}
                    >
                      {[0, 1, 2].map((idx) => {
                        const earned = idx < endResult.stars;
                        return (
                          <svg
                            key={idx}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`rt-lose-star-icon ${earned ? 'is-earned' : ''}`}
                          >
                            {earned && (
                              <defs>
                                <linearGradient
                                  id={`rtWinStarGrad-${idx}`}
                                  x1="16"
                                  y1="3"
                                  x2="16"
                                  y2="26"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0%" stopColor="#fff8c4" />
                                  <stop offset="55%" stopColor="#ffe168" />
                                  <stop offset="100%" stopColor="#f5be3b" />
                                </linearGradient>
                              </defs>
                            )}
                            <path
                              d="M16 3.5L19.45 10.95L27.6 11.9L21.55 17.5L23.15 25.55L16 21.5L8.85 25.55L10.45 17.5L4.4 11.9L12.55 10.95L16 3.5Z"
                              stroke={earned ? '#fff09c' : '#4fd0f5'}
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                              fill={
                                earned
                                  ? `url(#rtWinStarGrad-${idx})`
                                  : 'rgba(22, 58, 86, 0.25)'
                              }
                            />
                          </svg>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Chibi + Speech Bubble */}
                <div className="rt-lose-chibi-block">
                  <div className="rt-lose-speech-wrap">
                    <div className="rt-lose-speech-bubble">
                      <span>
                        {isWin ? tStrings.allClearChibiLine : tStrings.retreatChibiLine}
                      </span>
                    </div>
                  </div>
                  <div className="rt-lose-chibi-stage">
                    {isWin && (
                      <div className="rt-win-spotlights" aria-hidden="true" />
                    )}
                    <div
                      className={`rt-lose-holo-pad ${isWin ? 'is-win' : ''}`}
                      aria-hidden="true"
                    />
                    <img
                      src={isWin ? CHIBI_WIN_REMOTE : CHIBI_LOSE_REMOTE}
                      alt="Xavier"
                      className="rt-lose-chibi-img"
                    />
                  </div>
                </div>

                {/* Bottom Action Buttons (Exit & Play Again — no Share button) */}
                <div className="rt-lose-actions">
                  <button
                    type="button"
                    onMouseEnter={() => sound.playHover()}
                    onClick={handleExit}
                    className="rt-lose-btn rt-lose-btn-exit"
                  >
                    <span>{tStrings.retreatExitBtn}</span>
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => sound.playHover()}
                    onClick={handlePlayAgain}
                    className="rt-lose-btn rt-lose-btn-retry"
                  >
                    <span>{tStrings.retreatPlayAgainBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Top-Left Frameless Back Button (left of countdown timer; opens Retreat/All Clear) */}
          <button
            type="button"
            aria-label={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
            title={lang === 'VI' ? 'Quay lại Glitchtopia' : 'Back to Glitchtopia'}
            onMouseEnter={() => sound.playHover()}
            onClick={handleBackClick}
            className="memory-terminal-back-btn rt-scene-back-btn"
          >
            <svg
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
    </section>
  );
};
