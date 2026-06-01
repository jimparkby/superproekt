import React from 'react';
import type { Tokens } from '../theme';
import { Icon } from '../icons';

export function TGHeader({ T, subtitle = 'тренажёр ЦТ/ЦЭ' }: {
  T: Tokens; subtitle?: string;
}) {
  return (
    <div style={{
      flexShrink: 0,
      height: 'calc(52px + env(safe-area-inset-top))',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '0 16px 8px',
      paddingTop: 'env(safe-area-inset-top)',
      background: '#fff',
      borderBottom: `0.5px solid ${T.line}`,
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: 0.2 }}>
          реша<span style={{ color: T.accent }}>й</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginTop: 1 }}>{subtitle}</div>
      </div>
    </div>
  );
}

export type Tab = 'train' | 'homework' | 'profile';

export function BottomNav({ T, tab, onTab }: { T: Tokens; tab: Tab; onTab: (t: Tab) => void }) {
  const item = (id: Tab, label: string, IconCmp: (p: { s?: number; c?: string }) => React.ReactElement) => {
    const on = tab === id;
    const c = on ? T.accent : '#9aa0a8';
    return (
      <button key={id} onClick={() => onTab(id)} style={{
        flex: 1, background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 0 4px',
      }}>
        <IconCmp c={c} />
        <span style={{ fontSize: 11, color: c, fontWeight: on ? 600 : 500 }}>{label}</span>
      </button>
    );
  };
  return (
    <div style={{
      flexShrink: 0, display: 'flex', background: '#fff',
      borderTop: `0.5px solid ${T.line}`,
      paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
    }}>
      {item('train', 'Тренировка', Icon.Dumbbell)}
      {item('homework', 'Домашка', Icon.Book)}
      {item('profile', 'Профиль', Icon.Person)}
    </div>
  );
}

export function StreakChip({ days }: { days: number }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: '#fff3ea', border: '1px solid #ffe2cc',
      borderRadius: 999, padding: '6px 11px 6px 9px',
    }}>
      <Icon.Flame s={17} />
      <span style={{ fontSize: 14, fontWeight: 700, color: '#e07a2e' }}>{days}</span>
      <span style={{ fontSize: 13, color: '#c98a5e' }}>дней</span>
    </div>
  );
}
