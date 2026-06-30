import React from 'react';
import type { Tokens } from '../theme';
import { tint } from '../theme';
import { answerText } from '../data';
import type { Task } from '../data';
import { Icon } from '../icons';

export function SolutionPanel({ T, task }: { T: Tokens; task: Task }) {
  const ink = '#1b3a9c';
  const red = '#d23b3b';
  const hand = T.hand || 'Marck Script';
  const cell = 21;
  const handFamily = `'${hand}', cursive`;

  return (
    <div style={{
      marginTop: 14, borderRadius: 14, position: 'relative', overflow: 'hidden',
      border: '1px solid #e1e6ef',
      boxShadow: '0 1px 2px rgba(15,18,28,0.05), 0 8px 22px rgba(15,18,28,0.06)',
      backgroundColor: '#fcfdff',
      backgroundImage: 'linear-gradient(#dbe7f7 1px, transparent 1px), linear-gradient(90deg, #dbe7f7 1px, transparent 1px)',
      backgroundSize: `${cell}px ${cell}px`,
    }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 34, width: 1.5, background: 'rgba(210,60,60,0.5)' }} />
      <div style={{ padding: '14px 18px 18px 46px', fontFamily: handFamily }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Icon.Bulb s={20} c={ink} />
          <span style={{ fontFamily: handFamily, fontSize: 27, color: ink, lineHeight: 1, borderBottom: `2px solid ${tint('#1b3a9c', 0.5)}`, paddingBottom: 2 }}>
            Решение
          </span>
        </div>

        {task.hint && (
          <div style={{ fontFamily: handFamily, fontSize: 19, color: 'rgba(27,58,156,0.6)', lineHeight: 1.3, margin: '8px 0 4px' }}>
            {task.hint}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
          {task.solution.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: red, fontSize: 22, lineHeight: 1.35, flexShrink: 0 }}>→</span>
              <span style={{ fontFamily: handFamily, fontSize: 23, color: ink, lineHeight: 1.4, flex: 1, letterSpacing: 0.2 }}>{line}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
          <span style={{ fontFamily: handFamily, fontSize: 26, color: ink }}>Ответ:</span>
          <span style={{
            fontFamily: handFamily, fontSize: 26, color: red, fontWeight: 700,
            borderBottom: `2px solid ${tint('#d23b3b', 0.4)}`, paddingBottom: 1,
          }}>{answerText(task)}</span>
        </div>
      </div>
    </div>
  );
}
