export interface Tokens {
  accent: string;
  page: string;
  card: string;
  ink: string;
  sub: string;
  faint: string;
  line: string;
  good: string;
  goodBg: string;
  bad: string;
  badBg: string;
  font: string;
  hand: string;
}

export const ACCENT_DEFAULT = '#3390EC';
export const HAND_DEFAULT = 'Marck Script';

export function tokens(accent: string = ACCENT_DEFAULT, hand: string = HAND_DEFAULT): Tokens {
  return {
    accent,
    page: '#eef0f4',
    card: '#ffffff',
    ink: '#0b0c0f',
    sub: '#838890',
    faint: '#a4a9b0',
    line: '#e7e9ee',
    good: '#34b277',
    goodBg: '#eaf7f0',
    bad: '#e8554c',
    badBg: '#fdecea',
    font: "-apple-system, 'SF Pro Text', 'Segoe UI', Roboto, system-ui, sans-serif",
    hand,
  };
}

export function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '');
  const full = m.length === 3 ? m.split('').map((x) => x + x).join('') : m;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function tint(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export const arrEq = (a: number[], b: number[]): boolean =>
  a.length === b.length &&
  [...a].sort((x, y) => x - y).every((v, i) => v === [...b].sort((x, y) => x - y)[i]);
