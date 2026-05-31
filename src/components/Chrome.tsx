import React from 'react';
import type { Tokens } from '../theme';
import { Icon } from '../icons';

export function TGHeader({ T, subtitle = 'мини-приложение', onClose }: {
  T: Tokens; subtitle?: string; onClose?: () => void;
}) {
  return (
    <div style={{
      flexShrink: 0, height: 52, display: 'flex', alignItems: 'center',
      padding: '0 8px 0 12px', background: '#fff',
      borderBottom: `0.5px solid ${T.line}`, position: 'relative', zIndex: 5,
    }}>
      <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex' }}>
        <Icon.Close />
      </button>
      <div style={{ flex: 1, textAlign: 'center', lineHeight: 1.1 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: 0.2 }}>
          реша<span style={{ color: T.accent }}>й</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginTop: 1 }}>{subtitle}</div>
      </div>
      <button style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex' }}>
        <Icon.Dots />
      </button>
    </div>
  );
}

export type Tab = 'train' | 'homework';

export function BottomNav({ T, tab, onTab }: { T: Tokens; tab: Tab; onTab: (t: Tab) => void }) {
  const item = (id: Tab, label: string, IconCmp: (p: { c?: string }) => React.ReactElement) => {
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
