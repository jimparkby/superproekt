import React from 'react';
import type { Tokens } from '../theme';
import { tint } from '../theme';
import { Icon } from '../icons';

export type OptState = 'idle' | 'selected' | 'correct' | 'wrong' | 'muted';

export function OptionRow({ T, label, kind, state, onClick, disabled }: {
  T: Tokens; label: string; kind: 'radio' | 'check'; state: OptState;
  onClick: () => void; disabled: boolean;
}) {
  const border = { idle: T.line, selected: T.accent, correct: T.good, wrong: T.bad, muted: T.line }[state];
  const bg = { idle: '#fff', selected: tint(T.accent, 0.05), correct: T.goodBg, wrong: T.badBg, muted: '#fff' }[state];
  const markColor = ({ selected: T.accent, correct: T.good, wrong: T.bad } as Record<string, string>)[state] || T.line;
  const filled = state === 'selected' || state === 'correct' || state === 'wrong';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', textAlign: 'left', cursor: disabled ? 'default' : 'pointer',
      background: bg, border: `1.6px solid ${border}`, borderRadius: 14,
      padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 13,
      transition: 'border-color .15s, background .15s', opacity: state === 'muted' ? 0.55 : 1,
    }}>
      <div style={{
        width: 23, height: 23, flexShrink: 0,
        borderRadius: kind === 'check' ? 7 : 999,
        border: `2px solid ${filled ? markColor : '#cfd3da'}`,
        background: filled ? markColor : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {filled && (kind === 'check' ? (
          <Icon.Check s={15} />
        ) : state === 'wrong' ? (
          <Icon.Cross s={13} />
        ) : state === 'selected' ? (
          <div style={{ width: 9, height: 9, borderRadius: 999, background: '#fff' }} />
        ) : (
          <Icon.Check s={15} />
        ))}
      </div>
      <span style={{ fontSize: 16, color: T.ink, fontWeight: 500, lineHeight: 1.35, flex: 1 }}>{label}</span>
    </button>
  );
}

export function ResultBanner({ T, ok }: { T: Tokens; ok: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', borderRadius: 14,
      background: ok ? T.goodBg : T.badBg, marginTop: 14,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 999, flexShrink: 0,
        background: ok ? T.good : T.bad, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {ok ? <Icon.Check s={16} /> : <Icon.Cross s={16} />}
      </div>
      <span style={{ fontSize: 15, fontWeight: 700, color: ok ? '#1f7d53' : '#bd3a32' }}>
        {ok ? 'Верно!' : 'Не верно'}
      </span>
    </div>
  );
}

export function NumPad({ T, onKey }: { T: Tokens; onKey: (k: string) => void }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {keys.map((k) => (
        <button key={k} onClick={() => onKey(k)} style={{
          height: 48, borderRadius: 12, border: 'none', cursor: 'pointer',
          background: '#fff', boxShadow: '0 1px 2px rgba(15,18,28,0.06)',
          fontSize: 22, fontWeight: 600, color: T.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {k === 'del' ? (
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <path d="M9 2h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-7-8 7-8Z" stroke={T.sub} strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M12 7l6 6M18 7l-6 6" stroke={T.sub} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : k}
        </button>
      ))}
    </div>
  );
}

export function CompletionView({ T, correct, total, onAgain, onTopics }: {
  T: Tokens; correct: number; total: number; onAgain: () => void; onTopics: () => void;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, borderRadius: 999, background: T.goodBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: T.good, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Check s={36} />
        </div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>Тема пройдена!</div>
      <div style={{ fontSize: 16, color: T.sub, marginTop: 8 }}>
        Верно решено <b style={{ color: T.ink }}>{correct}</b> из {total}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 999, background: i < correct ? T.good : '#e2e5ea' }} />
        ))}
      </div>
      <button onClick={onAgain} style={{
        marginTop: 30, width: '100%', height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
        background: T.accent, color: '#fff', fontSize: 17, fontWeight: 700,
      }}>Пройти заново</button>
      <button onClick={onTopics} style={{
        marginTop: 10, width: '100%', height: 50, borderRadius: 14, cursor: 'pointer',
        background: 'none', border: 'none', color: T.accent, fontSize: 16, fontWeight: 600,
      }}>К темам</button>
    </div>
  );
}
