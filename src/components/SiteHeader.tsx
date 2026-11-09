import React from 'react';
import { sound } from '../utils/sound';

export interface SubTabItem {
  id: string;
  label: string;
}

interface SiteHeaderProps {
  lang: 'VI' | 'EN';
  currentEventTitle: string;
  onToggleLang: () => void;
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
  onToggleLang,
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

            <span aria-current="page" className="site-crumb-current truncate">
              {currentEventTitle}
            </span>
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
