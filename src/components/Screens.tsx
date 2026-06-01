import React, { useEffect, useState } from 'react';
import type { Tokens } from '../theme';
import { tint } from '../theme';
import { SUBJECTS } from '../data';
import type { Subject, Topic } from '../data';
import { Icon } from '../icons';
import { StreakChip } from './Chrome';
import { apiFetchProfile } from '../api';
import type { ProfileStats } from '../api';
import type { TGUser } from '../telegram';

type Progress = Record<string, Set<string>>;

export function SubjectsScreen({ T, progress, onPick }: {
  T: Tokens; progress: Progress; onPick: (s: Subject) => void;
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '18px 16px 0' }}>
      <div style={{ marginBottom: 18, flexShrink: 0 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: T.ink, letterSpacing: -0.3 }}>Тренировка</div>
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
  // Group topics by section
  const groups: { section: string; topics: Topic[] }[] = [];
  for (const tp of subject.topics) {
    const label = tp.section || '';
    const last = groups[groups.length - 1];
    if (last && last.section === label) last.topics.push(tp);
    else groups.push({ section: label, topics: [tp] });
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '6px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px 12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, padding: 6 }}>
          <Icon.Back c={T.accent} /><span style={{ color: T.accent, fontSize: 16 }}>Предметы</span>
        </button>
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
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

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {groups.map((group) => (
          <div key={group.section || '__default'}>
            {group.section && (
              <div style={{
                fontSize: 12, fontWeight: 600, color: T.faint,
                textTransform: 'uppercase', letterSpacing: 0.5,
                margin: '10px 4px 6px',
              }}>{group.section}</div>
            )}
            <div style={{
              background: T.card, borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 1px 2px rgba(15,18,28,0.04)',
              display: 'flex', flexDirection: 'column', marginBottom: 4,
            }}>
              {group.topics.map((tp, i) => {
                const locked = !!tp.locked;
                const done = progress[subject.id]?.has(tp.id);
                const isNotebook = !!tp.notebook;

                return (
                  <button key={tp.id} disabled={locked} onClick={() => onPick(tp)} style={{
                    width: '100%', textAlign: 'left', background: 'none', border: 'none',
                    cursor: locked ? 'default' : 'pointer', padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    borderTop: i ? `0.5px solid ${T.line}` : 'none', opacity: locked ? 0.6 : 1,
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      background: locked ? '#f0f1f4' : tint(subject.tint, 0.12),
                      color: subject.tint, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {locked ? <Icon.Lock /> : isNotebook ? (
                        <Icon.Book s={20} c={subject.tint} />
                      ) : done ? (
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
                        {locked ? 'Скоро' : isNotebook ? tp.blurb : tp.blurb}
                      </div>
                    </div>
                    {!locked && <Icon.Chevron />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
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

// ─── ProfileScreen ────────────────────────────────────────────────────────────

const TOTAL_TOPICS = SUBJECTS.reduce((acc, s) => acc + s.topics.filter((t) => !t.locked).length, 0);

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div style={{
      flex: 1, background: '#fff', borderRadius: 18, padding: '16px 14px',
      boxShadow: '0 1px 2px rgba(15,18,28,0.04), 0 4px 12px rgba(15,18,28,0.04)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: accent || '#0b0c0f', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#a4a9b0', fontWeight: 500 }}>{sub}</div>}
      <div style={{ fontSize: 12.5, color: '#838890', marginTop: 2, textAlign: 'center' }}>{label}</div>
    </div>
  );
}

function SubjectRow({ T, name, glyph, tintColor, done, total }: {
  T: Tokens; name: string; glyph: string; tintColor: string; done: number; total: number;
}) {
  const pct = total > 0 ? done / total : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
        background: tint(tintColor, 0.12), color: tintColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700,
      }}>{glyph}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: T.ink }}>{name}</span>
          <span style={{ fontSize: 13, color: T.faint }}>{done}/{total}</span>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: T.line, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${pct * 100}%`, background: pct === 1 ? T.good : tintColor,
            transition: 'width 0.4s',
          }} />
        </div>
      </div>
    </div>
  );
}

export function ProfileScreen({ T, userId, user, localTopicsDone, localBySubject, localTasksTotal, localTasksCorrect }: {
  T: Tokens;
  userId: string;
  user: TGUser | null;
  localTopicsDone: number;
  localBySubject: Record<string, number>;
  localTasksTotal: number;
  localTasksCorrect: number;
}) {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetchProfile(userId).then((s) => {
      setStats(s);
      setLoading(false);
    });
  }, [userId]);

  const topicsDone = stats?.topics_done ?? localTopicsDone;
  const tasksTotal = stats?.tasks_total ?? localTasksTotal;
  const tasksCorrect = stats?.tasks_correct ?? localTasksCorrect;
  const correctPct = tasksTotal > 0 ? Math.round(tasksCorrect / tasksTotal * 100) : 0;

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ')
    : 'Гость';
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 16px', background: T.page }}>
      {/* Аватар + имя */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 999, background: tint(T.accent, 0.15),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 800, color: T.accent, marginBottom: 10,
        }}>{initials || <Icon.Person s={34} c={T.accent} />}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.ink }}>{displayName}</div>
        {user?.username && (
          <div style={{ fontSize: 13.5, color: T.faint, marginTop: 2 }}>@{user.username}</div>
        )}
        {loading && (
          <div style={{ fontSize: 12, color: T.faint, marginTop: 6 }}>синхронизация…</div>
        )}
      </div>

      {/* Главные карточки */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <StatCard
          label="Тем пройдено"
          value={String(topicsDone)}
          sub={`из ${TOTAL_TOPICS}`}
          accent={T.accent}
        />
        <StatCard
          label="Верных ответов"
          value={tasksTotal > 0 ? `${correctPct}%` : '—'}
          sub={tasksTotal > 0 ? `${tasksCorrect} из ${tasksTotal}` : 'нет данных'}
          accent={tasksTotal === 0 ? undefined : correctPct >= 70 ? T.good : T.bad}
        />
      </div>

      {/* По предметам */}
      <div style={{ background: '#fff', borderRadius: 18, padding: '4px 16px 4px', boxShadow: '0 1px 2px rgba(15,18,28,0.04)' }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: T.faint, textTransform: 'uppercase', letterSpacing: 0.4, padding: '12px 0 4px' }}>
          По предметам
        </div>
        {SUBJECTS.map((sub, i) => {
          const total = sub.topics.filter((t) => !t.locked).length;
          const done = stats
            ? (stats.by_subject[sub.id] || 0)
            : (localBySubject[sub.id] || 0);
          return (
            <div key={sub.id}>
              {i > 0 && <div style={{ height: 0.5, background: T.line }} />}
              <SubjectRow T={T} name={sub.name} glyph={sub.glyph} tintColor={sub.tint} done={done} total={total} />
            </div>
          );
        })}
      </div>

      {/* Задачи итого */}
      {tasksTotal > 0 && (
        <div style={{
          marginTop: 12, background: '#fff', borderRadius: 18, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 1px 2px rgba(15,18,28,0.04)',
        }}>
          <Icon.Trophy s={22} c='#e07a2e' />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>Решено {tasksTotal} задач</div>
            <div style={{ fontSize: 13, color: T.sub, marginTop: 1 }}>
              {tasksCorrect} правильно · {tasksTotal - tasksCorrect} с ошибкой
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
