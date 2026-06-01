import React from 'react';

type IconProps = { s?: number; c?: string };

export const Icon = {
  Close: ({ s = 24, c = '#8b9098' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Dots: ({ s = 22, c = '#8b9098' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  ),
  Back: ({ s = 24, c = '#3390EC' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Chevron: ({ s = 18, c = '#c4c8cd' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Bulb: ({ s = 26, c = '#fff' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 18h6M10 21h4" stroke={c} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8.9.9 1.5l.1.7h5.2l.1-.7c.1-.6.4-1.1.9-1.5A6 6 0 0 0 12 3Z"
        stroke={c} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M12 8.5v3.5M12 12l-1.6-1.4M12 12l1.6-1.4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Flame: ({ s = 18, c = '#FF8A3D' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2c.5 3-1.8 4.2-2.8 5.6C8 9.3 7.5 10.7 7.5 12a4.5 4.5 0 0 0 9 0c0-1.8-.9-3.2-1.8-4.4-.3.9-.9 1.5-1.6 1.7.6-2.4-.3-5.2-1.6-7.3Z" />
    </svg>
  ),
  Check: ({ s = 20, c = '#fff' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Cross: ({ s = 16, c = '#fff' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7 7l10 10M17 7L7 17" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  Lock: ({ s = 18, c = '#c4c8cd' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" fill={c} />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke={c} strokeWidth="2" />
    </svg>
  ),
  Dumbbell: ({ s = 26, c = '#8b9098' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  ),
  Book: ({ s = 26, c = '#8b9098' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2 2 0 0 1 6 4h5v15H6a2 2 0 0 0-2 1.2V5.5ZM20 5.5A2 2 0 0 0 18 4h-5v15h5a2 2 0 0 1 2 1.2V5.5Z" />
    </svg>
  ),
  ArrowRight: ({ s = 20, c = '#fff' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Person: ({ s = 26, c = '#8b9098' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.866 3.582-7 8-7s8 3.134 8 7" />
    </svg>
  ),
  Trophy: ({ s = 22, c = '#e07a2e' }: IconProps) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4H4a1 1 0 0 0-1 1v3a4 4 0 0 0 4 4h1M17 4h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4h-1" />
      <path d="M7 4h10v9a5 5 0 0 1-10 0V4Z" />
    </svg>
  ),
};
