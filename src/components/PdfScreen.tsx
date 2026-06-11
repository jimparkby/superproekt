import React from 'react';
import type { Tokens } from '../theme';
import type { Topic } from '../data';
import { Icon } from '../icons';

export function PdfScreen({ T, topic, onBack }: { T: Tokens; topic: Topic; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px 8px', flexShrink: 0, borderBottom: `0.5px solid ${T.line}` }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, padding: 6 }}>
          <Icon.Back c={T.accent} /><span style={{ color: T.accent, fontSize: 16 }}>Назад</span>
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700, color: T.ink, paddingRight: 48 }}>{topic.name}</div>
      </div>
      <iframe
        src={topic.pdfUrl}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title={topic.name}
      />
    </div>
  );
}
