import React from 'react';
import type { Tokens } from '../theme';
import { tint } from '../theme';
import { SUBJECTS } from '../data';
import type { Subject, Topic } from '../data';
import { Icon } from '../icons';
import { StreakChip } from './Chrome';

type Progress = Record<string, Set<string>>;

export function SubjectsScreen({ T, streak, progress, onPick }: {
  T: Tokens; streak: number; progress: Progress; onPick: (s: Subject) => void;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '18px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>Тренировка</div>
          <div style={{ fontSize: 14, color: T.sub, marginTop: 3 }}>Подготовка к ЦТ / ЦЭ</div>
        </div>
        <div style={{ marginTop: 4 }}><StreakChip days={streak} /></div>
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.faint, textTransform: 'uppercase', letterSpacing: 0.4, margin: '4px 4px 10px', flexShrink: 0 }}>
        Выбери предмет
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        {SUBJECTS.map((sub) => {
          const total = sub.topics.filter((t) => !t.locked).length;
          const done = progress[sub.id]?.size || 0;
          return (
            <button key={sub.id} onClick={() => onPick(sub)} style={{
              flex: 1, textAlign: 'left', background: T.card, border: 'none', cursor: 'pointer',
              borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: '0 1px 2px rgba(15,18,28,0.04), 0 6px 18px rgba(15,18,28,0.04)',
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 16, flexShrink: 0,
                background: tint(sub.tint, 0.12), color: sub.tint,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, fontWeight: 700,
              }}>{sub.glyph}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.ink }}>{sub.name}</div>
                <div style={{ fontSize: 13.5, color: T.sub, marginTop: 2 }}>{sub.blurb}</div>
                <div style={{ fontSize: 12.5, color: T.faint, marginTop: 7 }}>
                  {total} {total === 1 ? 'тема' : 'темы'} · пройдено {done}
                </div>
              </div>
              <Icon.Chevron />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TopicsScreen({ T, subject, progress, onBack, onPick }: {
  T: Tokens; subject: Subject; progress: Progress; onBack: () => void; onPick: (t: Topic) => void;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '6px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px 12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, padding: 6 }}>
          <Icon.Back c={T.accent} /><span style={{ color: T.accent, fontSize: 16 }}>Предметы</span>
        </button>
      </div>

      <div style={{ padding: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: tint(subject.tint, 0.12), color: subject.tint,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700,
        }}>{subject.glyph}</div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>{subject.name}</div>
          <div style={{ fontSize: 13.5, color: T.sub }}>{subject.blurb}</div>
        </div>
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.faint, textTransform: 'uppercase', letterSpacing: 0.4, margin: '4px 20px 8px', flexShrink: 0 }}>
        Темы
      </div>

      <div style={{ flex: 1, background: T.card, borderRadius: 18, margin: '0 16px 16px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(15,18,28,0.04)', display: 'flex', flexDirection: 'column' }}>
        {subject.topics.map((tp, i) => {
          const locked = !!tp.locked;
          const done = progress[subject.id]?.has(tp.id);
          return (
            <button key={tp.id} disabled={locked} onClick={() => onPick(tp)} style={{
              flex: 1, width: '100%', textAlign: 'left', background: 'none', border: 'none',
              cursor: locked ? 'default' : 'pointer', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderTop: i ? `0.5px solid ${T.line}` : 'none', opacity: locked ? 0.6 : 1,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: locked ? '#f0f1f4' : tint(subject.tint, 0.12),
                color: subject.tint, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {locked ? <Icon.Lock /> : done ? (
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: T.good, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.Check s={15} />
                  </div>
                ) : (
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{tp.tasks?.length || ''}</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: T.ink }}>{tp.name}</div>
                <div style={{ fontSize: 13, color: T.sub, marginTop: 1 }}>
                  {locked ? 'Скоро' : `${tp.blurb} · ${tp.tasks!.length} задач`}
                </div>
              </div>
              {!locked && <Icon.Chevron />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function HomeworkScreen({ T }: { T: Tokens }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center', background: T.page }}>
      <div style={{ width: 76, height: 76, borderRadius: 22, background: tint(T.accent, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <Icon.Book s={38} c={T.accent} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: T.ink }}>Домашка скоро</div>
      <div style={{ fontSize: 15, color: T.sub, marginTop: 8, lineHeight: 1.5 }}>
        Здесь будут персональные подборки задач на каждый день. А пока — заглядывай в Тренировку.
      </div>
    </div>
  );
}
