import React from 'react';
import { sound } from '../utils/sound';

export interface SubTabItem {
  id: string;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface SiteHeaderProps {
  lang: 'VI' | 'EN';
  currentEventTitle: string;
  currentEventSlug?: string;
  onClickCurrentEvent?: () => void;
  onToggleLang: () => void;
  breadcrumbs?: BreadcrumbItem[];
  subTabs?: SubTabItem[];
  activeSubTabId?: string;
  onSelectSubTab?: (id: string) => void;
}

function navigateSameTab(url: string) {
  try {
    if (window.top && window.top !== window) {
      window.top.location.href = url;
      return;
    }
  } catch {
    // Fallback to current window if cross-origin frame blocks window.top
  }
  window.location.href = url;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  lang,
  currentEventTitle,
  currentEventSlug = '/glitchtopia',
  onClickCurrentEvent,
  onToggleLang,
  breadcrumbs,
  subTabs,
  activeSubTabId,
  onSelectSubTab,
}) => {
  const rootLabel = lang === 'VI' ? 'TSDT' : 'MOONSTRIDE';
  const rootTitle = lang === 'VI' ? 'Quay về trang chủ Trăng Soi Dặm Trường' : 'Back to Moonstride Home';
  const eventsLabel = lang === 'VI' ? 'SỰ KIỆN' : 'EVENTS';
  const eventsTitle = lang === 'VI' ? 'Quay lại trang Sự kiện' : 'Back to Events';

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <nav aria-label="Breadcrumb" className="site-crumb">
            <a
              href="https://shenxinghui.vercel.app/"
              target="_top"
              title={rootTitle}
              onMouseEnter={() => sound.playHover()}
              onClick={(e) => {
                e.preventDefault();
                sound.playSelect();
                navigateSameTab('https://shenxinghui.vercel.app/');
              }}
              className="site-crumb-link site-crumb-root"
            >
              {rootLabel}
            </a>

            {breadcrumbs && breadcrumbs.length > 0 ? (
              breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={`${crumb.label}-${idx}`}>
                    <span className="site-crumb-sep" aria-hidden="true">
                      &gt;
                    </span>
                    <a
                      href={crumb.href}
                      aria-current={isLast ? 'page' : undefined}
                      onMouseEnter={() => {
                        if (!isLast) sound.playHover();
                      }}
                      onClick={(e) => {
                        if (crumb.onClick || isLast) {
                          e.preventDefault();
                          if (!isLast) sound.playSelect();
                          crumb.onClick?.();
                        }
                      }}
                      className={
                        isLast
                          ? 'site-crumb-current truncate no-underline font-bold'
                          : 'site-crumb-link truncate no-underline'
                      }
                    >
                      {crumb.label}
                    </a>
                  </React.Fragment>
                );
              })
            ) : (
              <>
                <span className="site-crumb-sep" aria-hidden="true">
                  &gt;
                </span>

                <a
                  href="https://shenxinghui.vercel.app/events"
                  target="_top"
                  title={eventsTitle}
                  onMouseEnter={() => sound.playHover()}
                  onClick={(e) => {
                    e.preventDefault();
                    sound.playSelect();
                    navigateSameTab('https://shenxinghui.vercel.app/events');
                  }}
                  className="site-crumb-link"
                >
                  {eventsLabel}
                </a>

                <span className="site-crumb-sep" aria-hidden="true">
                  &gt;
                </span>

                <a
                  href={currentEventSlug}
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault();
                    onClickCurrentEvent?.();
                  }}
                  className="site-crumb-current truncate no-underline"
                >
                  {currentEventTitle}
                </a>
              </>
            )}
          </nav>

          <button
            type="button"
            title={lang === 'VI' ? 'Chuyển sang Tiếng Anh (EN)' : 'Switch to Vietnamese (VI)'}
            aria-label={lang === 'VI' ? 'Chuyển đổi ngôn ngữ VI/EN' : 'Toggle language VI/EN'}
            onMouseEnter={() => sound.playHover()}
            onClick={() => {
              sound.playSelect();
              onToggleLang();
            }}
            className="site-lang-btn"
          >
            {lang}
          </button>
        </div>
      </header>

      {subTabs && subTabs.length > 0 && (
        <div className="site-subtabs">
          <div className="wrap h-full">
            <nav aria-label="Điều hướng sự kiện" className="site-subtabs-nav">
              {subTabs.map((tab) => {
                const isActive = tab.id === activeSubTabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onMouseEnter={() => {
                      if (!isActive) sound.playHover();
                    }}
                    onClick={() => {
                      sound.playSelect();
                      onSelectSubTab?.(tab.id);
                    }}
                    className={`site-subtab-btn ${isActive ? 'is-active' : ''}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
