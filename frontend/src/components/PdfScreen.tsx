import React from 'react';
import type { Tokens } from '../theme';
import { tint } from '../theme';
import type { Topic } from '../data';
import { Icon } from '../icons';
import { getWebApp } from '../telegram';

export function PdfScreen({ T, topic, onBack }: { T: Tokens; topic: Topic; onBack: () => void }) {
  const handleOpen = () => {
    const url = window.location.origin + topic.pdfUrl;
    const wa = getWebApp();
    if (wa?.openLink) {
      wa.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 8px 12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, padding: 6 }}>
          <Icon.Back c={T.accent} /><span style={{ color: T.accent, fontSize: 16 }}>Назад</span>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px 60px' }}>
        <div style={{
          width: 84, height: 84, borderRadius: 24, flexShrink: 0,
          background: tint(T.accent, 0.1),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
        }}>
          <Icon.Pdf s={42} c={T.accent} />
        </div>

        <div style={{ fontSize: 22, fontWeight: 800, color: T.ink, textAlign: 'center', marginBottom: 8 }}>
          {topic.name}
        </div>
        <div style={{ fontSize: 15, color: T.sub, textAlign: 'center', lineHeight: 1.5, marginBottom: 36 }}>
          {topic.blurb}
        </div>

        <button onClick={handleOpen} style={{
          width: '100%', maxWidth: 320,
          padding: '16px 24px',
          background: T.accent, color: '#fff',
          border: 'none', borderRadius: 16, cursor: 'pointer',
          fontSize: 17, fontWeight: 700,
          boxShadow: `0 4px 16px ${tint(T.accent, 0.35)}`,
        }}>
          Открыть PDF
        </button>

        <div style={{ fontSize: 13, color: T.faint, textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
          Откроется в браузере устройства
        </div>
      </div>
    </div>
  );
}
