// telegram.ts — инициализация Telegram WebApp (по образцу Gilda)

type TGTheme = { button_color?: string; bg_color?: string; text_color?: string };
type TGBackButton = {
  show: () => void;
  hide: () => void;
  onClick: (cb: () => void) => void;
  offClick: (cb: () => void) => void;
};
export type TGUser = { id: number; first_name: string; last_name?: string; username?: string };
type TGWebApp = {
  initDataUnsafe?: { user?: TGUser };
  ready: () => void;
  expand: () => void;
  requestFullscreen?: () => void;
  themeParams?: TGTheme;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  isFullscreen?: boolean;
  safeAreaInset?: { top: number; bottom: number; left: number; right: number };
  contentSafeAreaInset?: { top: number; bottom: number; left: number; right: number };
  onEvent?: (event: string, cb: () => void) => void;
  offEvent?: (event: string, cb: () => void) => void;
  CloudStorage?: unknown;
  close?: () => void;
  openLink?: (url: string) => void;
  BackButton?: TGBackButton;
};

export function getWebApp(): TGWebApp | null {
  const w = window as unknown as { Telegram?: { WebApp?: TGWebApp } };
  return w.Telegram?.WebApp ?? null;
}

export function getTelegramUser(): TGUser | null {
  return getWebApp()?.initDataUnsafe?.user ?? null;
}

export function getTelegramUserId(): string {
  const user = getTelegramUser();
  return user ? String(user.id) : 'dev_user';
}

function applySafeArea(wa: TGWebApp) {
  const contentTop = wa.contentSafeAreaInset?.top ?? 0;
  const deviceTop  = wa.safeAreaInset?.top ?? 0;
  const isFullscreen = wa.isFullscreen ?? false;

  // contentSafeAreaInset = высота шапки Telegram (только в fullscreen).
  // Если ещё не заполнено но fullscreen активен — берём max(deviceTop, 52px).
  const safeTop = contentTop > 0
    ? contentTop
    : isFullscreen
      ? Math.max(deviceTop, 52)
      : deviceTop;

  const bottom = wa.safeAreaInset?.bottom ?? 0;
  document.documentElement.style.setProperty('--tg-safe-top',    `${safeTop}px`);
  document.documentElement.style.setProperty('--tg-safe-bottom', `${bottom}px`);
}

export function initTelegram(): { accent: string } {
  const wa = getWebApp();
  if (!wa) {
    document.documentElement.style.setProperty('--tg-safe-top',    '0px');
    document.documentElement.style.setProperty('--tg-safe-bottom', '0px');
    return { accent: '' };
  }

  try {
    wa.ready();
    wa.expand();
    if (typeof wa.requestFullscreen === 'function') {
      wa.requestFullscreen();
    }
    wa.setBackgroundColor?.('#eef0f4');

    // Применяем сразу и повторяем — значения заполняются с задержкой после fullscreen
    applySafeArea(wa);
    setTimeout(() => applySafeArea(wa), 150);
    setTimeout(() => applySafeArea(wa), 400);
    setTimeout(() => applySafeArea(wa), 800);

    wa.onEvent?.('safeAreaChanged',        () => applySafeArea(wa));
    wa.onEvent?.('contentSafeAreaChanged', () => applySafeArea(wa));
    wa.onEvent?.('fullscreenChanged',      () => applySafeArea(wa));
  } catch {
    /* noop */
  }

  const accent = wa.themeParams?.button_color || '';
  return { accent };
}
