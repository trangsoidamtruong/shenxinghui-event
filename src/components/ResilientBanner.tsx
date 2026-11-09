import React, { useState } from 'react';

interface ResilientBannerProps {
  src: string;
  alt: string;
  fallbackGradient?: string;
  subtitle?: string;
  className?: string;
  imgClassName?: string;
}

export const ResilientBanner: React.FC<ResilientBannerProps> = ({
  src,
  alt,
  fallbackGradient = 'from-[#281b4a] via-[#130d26] to-[#07060f]',
  subtitle,
  className = '',
  imgClassName = 'h-full w-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${fallbackGradient} ${className}`}>
      {/* Subtle Astrolabe SVG Fallback / Backdrop */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
          className="h-32 w-32 text-[#cfb1f1]/20"
        >
          <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="1" />
          <path d="M100 10 L100 190 M10 100 L190 100" stroke="currentColor" strokeWidth="0.75" />
          <polygon points="100,68 108,92 132,100 108,108 100,132 92,108 68,100 92,92" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {hasError && (
          <div className="mt-2 max-w-xs">
            <p className="font-display text-sm font-semibold text-[#e6e2f5] line-clamp-1">{alt}</p>
            {subtitle && <p className="mt-0.5 text-xs text-[#a79fc7]">{subtitle}</p>}
          </div>
        )}
      </div>

      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className={`relative z-10 transition-transform duration-200 ${imgClassName}`}
        />
      )}
    </div>
  );
};
