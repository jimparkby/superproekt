import React, { useRef, useState } from 'react';
import type { Tokens } from '../theme';
import { tint, arrEq } from '../theme';
import type { Subject, Topic, Task } from '../data';
import { Icon } from '../icons';
import { OptionRow, ResultBanner, NumPad, CompletionView } from './TaskBits';
import type { OptState } from './TaskBits';
import { SolutionPanel } from './SolutionPanel';

type Choice = number | number[] | string | null;

export function TaskScreen({ T, subject, topic, onExit, onComplete, onTaskAnswer }: {
  T: Tokens; subject: Subject; topic: Topic;
  onExit: () => void; onComplete: () => void;
  onTaskAnswer?: (taskId: string, correct: boolean) => void;
}) {
  const tasks = topic.tasks!;
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<Choice>(tasks[0].type === 'multiple' ? [] : null);
  const [submitted, setSubmitted] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const task: Task = tasks[idx];

  const reset = (i: number) => {
    setIdx(i);
    setChoice(tasks[i].type === 'multiple' ? [] : null);
    setSubmitted(false);
    setShowSol(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const hasAnswer =
    task.type === 'multiple' ? Array.isArray(choice) && choice.length > 0
    : task.type === 'number' ? typeof choice === 'string' && choice.length > 0
    : choice !== null;

  const checkCorrect = (): boolean => {
    if (task.type === 'single') return choice === task.answer;
    if (task.type === 'multiple') return Array.isArray(choice) && arrEq(choice, task.answer);
    const v = parseFloat(String(choice).replace(',', '.'));
    return Math.abs(v - task.answer) <= (task.tol || 0);
  };

  const submit = () => {
    if (submitted || !hasAnswer) return;
    const ok = checkCorrect();
    setSubmitted(true);
    if (!ok) setShowSol(true);
    setResults((r) => [...r, ok]);
    onTaskAnswer?.(task.id, ok);
  };

  const next = () => {
    if (idx + 1 >= tasks.length) { setFinished(true); onComplete(); }
    else reset(idx + 1);
  };

  const numKey = (k: string) => {
    if (submitted) return;
    setChoice((prev) => {
      const cur = typeof prev === 'string' ? prev : '';
      if (k === 'del') return cur.slice(0, -1);
      if (k === ',') return cur.includes(',') || cur === '' ? cur : cur + ',';
      if (cur.replace(/[^0-9]/g, '').length >= 7) return cur;
      return cur + k;
    });
  };

  const toggleMulti = (i: number) => {
    if (submitted) return;
    setChoice((prev) => {
      const sel = Array.isArray(prev) ? prev : [];
      return sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i];
    });
  };

  const optState = (i: number): OptState => {
    if (task.type === 'single') {
      if (!submitted) return choice === i ? 'selected' : 'idle';
      if (i === task.answer) return 'correct';
      if (i === choice) return 'wrong';
      return 'muted';
    }
    const sel = Array.isArray(choice) ? choice : [];
    if (!submitted) return sel.includes(i) ? 'selected' : 'idle';
    if ((task as { answer: number[] }).answer.includes(i)) return 'correct';
    if (sel.includes(i)) return 'wrong';
    return 'muted';
  };

  if (finished) {
    const correct = results.filter(Boolean).length;
    return (
      <CompletionView T={T} correct={correct} total={tasks.length}
        onAgain={() => { setResults([]); setFinished(false); reset(0); }}
        onTopics={onExit} />
    );
  }

  const ok = submitted && checkCorrect();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: T.page }}>
      {/* тема + прогресс */}
      <div style={{ flexShrink: 0, padding: '10px 12px', background: '#fff', borderBottom: `0.5px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onExit} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, padding: 4, marginLeft: -4 }}>
            <Icon.Back c={T.accent} /><span style={{ color: T.accent, fontSize: 15.5 }}>Темы</span>
          </button>
          <div style={{ fontSize: 13.5, color: T.sub, fontWeight: 600 }}>Задача {idx + 1} из {tasks.length}</div>
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 9, padding: '0 2px' }}>
          {tasks.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i < idx ? T.good : i === idx ? T.accent : '#e4e7ec' }} />
          ))}
        </div>
      </div>

      {/* контент */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: subject.tint, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
          {subject.name} · {topic.name}
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px 17px', boxShadow: '0 1px 2px rgba(15,18,28,0.04)', marginBottom: 16 }}>
          <div style={{ fontSize: 18, lineHeight: 1.5, color: T.ink, fontWeight: 500 }}>{task.prompt}</div>
          {task.type === 'multiple' && (
            <div style={{ fontSize: 12.5, color: T.faint, marginTop: 8 }}>Выбери все верные варианты</div>
          )}
        </div>

        {task.type === 'single' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {task.options.map((o, i) => (
              <OptionRow key={i} T={T} label={o} kind="radio" state={optState(i)} disabled={submitted}
                onClick={() => !submitted && setChoice(i)} />
            ))}
          </div>
        )}

        {task.type === 'multiple' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {task.options.map((o, i) => (
              <OptionRow key={i} T={T} label={o} kind="check" state={optState(i)} disabled={submitted}
                onClick={() => toggleMulti(i)} />
            ))}
          </div>
        )}

        {task.type === 'number' && (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#fff', borderRadius: 14, padding: '16px 18px', marginBottom: 12,
              border: `1.6px solid ${submitted ? (ok ? T.good : T.bad) : tint(T.accent, 0.35)}`,
            }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: choice ? T.ink : '#c4c8cd', minHeight: 36 }}>
                {(choice as string) || '0'}
              </span>
              {!submitted && <span style={{ width: 2, height: 28, background: T.accent, borderRadius: 2, animation: 'blink 1s steps(1) infinite' }} />}
              {task.unit && <span style={{ fontSize: 17, color: T.sub, marginLeft: 2, alignSelf: 'flex-end', marginBottom: 4 }}>{task.unit}</span>}
            </div>
            {!submitted && <NumPad T={T} onKey={numKey} />}
          </div>
        )}

        {submitted && <ResultBanner T={T} ok={ok} />}
        {showSol && <SolutionPanel T={T} task={task} />}
        <div style={{ height: 8 }} />
      </div>

      {/* действия */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 11,
        padding: '10px 16px', paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        background: '#fff', borderTop: `0.5px solid ${T.line}`,
      }}>
        <button onClick={() => setShowSol((s) => !s)} title="Пояснить" style={{
          width: 54, height: 54, borderRadius: 16, flexShrink: 0, cursor: 'pointer',
          border: 'none', background: showSol ? T.accent : tint(T.accent, 0.12),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: showSol ? 'none' : `inset 0 0 0 1.5px ${tint(T.accent, 0.25)}`,
        }}>
          <Icon.Bulb s={26} c={showSol ? '#fff' : T.accent} />
        </button>
        {!submitted ? (
          <button onClick={submit} disabled={!hasAnswer} style={{
            flex: 1, height: 54, borderRadius: 16, border: 'none',
            cursor: hasAnswer ? 'pointer' : 'default',
            background: hasAnswer ? T.accent : '#e4e7ec',
            color: hasAnswer ? '#fff' : '#aeb3ba', fontSize: 17.5, fontWeight: 700,
            transition: 'background .15s',
          }}>Ответить</button>
        ) : (
          <button onClick={next} style={{
            flex: 1, height: 54, borderRadius: 16, border: 'none', cursor: 'pointer',
            background: T.accent, color: '#fff', fontSize: 17.5, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {idx + 1 >= tasks.length ? 'Завершить тему' : 'Следующая'}
            <Icon.ArrowRight s={20} />
          </button>
        )}
      </div>
    </div>
  );
}
