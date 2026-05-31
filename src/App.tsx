import React, { useMemo, useState } from 'react';
import { tokens, ACCENT_DEFAULT, HAND_DEFAULT } from './theme';
import type { Subject, Topic } from './data';
import { initTelegram, getWebApp } from './telegram';
import { TGHeader, BottomNav } from './components/Chrome';
import type { Tab } from './components/Chrome';
import { SubjectsScreen, TopicsScreen, HomeworkScreen } from './components/Screens';
import { TaskScreen } from './components/TaskScreen';

type Screen = 'subjects' | 'topics' | 'task';
type Progress = Record<string, Set<string>>;

export default function App() {
  const [accent] = useState(() => initTelegram().accent || ACCENT_DEFAULT);
  const T = useMemo(() => tokens(accent, HAND_DEFAULT), [accent]);

  const [tab, setTab] = useState<Tab>('train');
  const [screen, setScreen] = useState<Screen>('subjects');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [streak] = useState<number>(() => {
    const v = localStorage.getItem('reshai_streak');
    return v ? Number(v) : 5;
  });

  const markDone = () => {
    if (!subject || !topic) return;
    setProgress((p) => {
      const next = { ...p };
      const set = new Set(next[subject.id] || []);
      set.add(topic.id);
      next[subject.id] = set;
      return next;
    });
  };

  let body: React.ReactNode;
  if (tab === 'homework') {
    body = <HomeworkScreen T={T} />;
  } else if (screen === 'task' && subject && topic) {
    body = <TaskScreen T={T} subject={subject} topic={topic} onExit={() => setScreen('topics')} onComplete={markDone} />;
  } else if (screen === 'topics' && subject) {
    body = (
      <TopicsScreen T={T} subject={subject} progress={progress}
        onBack={() => setScreen('subjects')}
        onPick={(tp) => { setTopic(tp); setScreen('task'); }} />
    );
  } else {
    body = (
      <SubjectsScreen T={T} streak={streak} progress={progress}
        onPick={(sub) => { setSubject(sub); setScreen('topics'); }} />
    );
  }

  const showNav = !(tab === 'train' && screen === 'task');
  const scrollable = !(tab === 'homework' || screen === 'task');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: T.font, background: T.page }}>
      <TGHeader T={T} onClose={() => getWebApp()?.close?.()} />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflowY: scrollable ? 'auto' : 'hidden', background: T.page }}>
        {body}
      </div>
      {showNav && (
        <BottomNav T={T} tab={tab} onTab={(id) => { setTab(id); if (id === 'train') setScreen('subjects'); }} />
      )}
    </div>
  );
}
