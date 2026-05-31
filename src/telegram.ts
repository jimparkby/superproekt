// telegram.ts — безопасная инициализация Telegram WebApp
// Работает и вне Telegram (для локальной разработки в обычном браузере).

type TGTheme = { button_color?: string; bg_color?: string; text_color?: string };
type TGBackButton = {
  show: () => void;
  hide: () => void;
  onClick: (cb: () => void) => void;
  offClick: (cb: () => void) => void;
};
type TGWebApp = {
  ready: () => void;
  expand: () => void;
  requestFullscreen?: () => void;
  themeParams?: TGTheme;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  CloudStorage?: unknown;
  close?: () => void;
  BackButton?: TGBackButton;
};

export function getWebApp(): TGWebApp | null {
  const w = window as unknown as { Telegram?: { WebApp?: TGWebApp } };
  return w.Telegram?.WebApp ?? null;
}

export function initTelegram(): { accent: string } {
  const wa = getWebApp();
  if (!wa) return { accent: '' };
  try {
    wa.ready();
    wa.expand();
    wa.setBackgroundColor?.('#eef0f4');
  } catch {
    /* noop */
  }
  const accent = wa.themeParams?.button_color || '';
  return { accent };
}
