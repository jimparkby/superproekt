import React, { useEffect, useMemo, useState } from 'react';
import { tokens, ACCENT_DEFAULT, HAND_DEFAULT } from './theme';
import type { Subject, Topic } from './data';
import { initTelegram, getWebApp, getTelegramUser, getTelegramUserId } from './telegram';
import { BottomNav } from './components/Chrome';
import type { Tab } from './components/Chrome';
import { SubjectsScreen, TopicsScreen, HomeworkScreen, ProfileScreen } from './components/Screens';
import { TaskScreen } from './components/TaskScreen';
import { NotebookScreen } from './components/NotebookScreen';
import { apiMarkTopicDone, apiRecordTaskResult } from './api';

type Screen = 'subjects' | 'topics' | 'task' | 'notebook';
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
  const [taskStats, setTaskStats] = useState({ total: 0, correct: 0 });

  const userId = useMemo(() => getTelegramUserId(), []);
  const tgUser = useMemo(() => getTelegramUser(), []);

  const isHome = tab === 'train' && screen === 'subjects';

  useEffect(() => {
    const wa = getWebApp();
    if (!wa?.BackButton) return;
    if (isHome || tab === 'homework' || tab === 'profile') {
      wa.BackButton.hide();
    } else {
      wa.BackButton.show();
      const handler = () => {
        if (screen === 'task' || screen === 'notebook') setScreen('topics');
        else if (screen === 'topics') setScreen('subjects');
      };
      wa.BackButton.onClick(handler);
      return () => { wa.BackButton?.offClick(handler); };
    }
  }, [isHome, tab, screen]);

  const markDone = () => {
    if (!subject || !topic) return;
    setProgress((p) => {
      const next = { ...p };
      const set = new Set(next[subject.id] || []);
      set.add(topic.id);
      next[subject.id] = set;
      return next;
    });
    apiMarkTopicDone(userId, subject.id, topic.id);
  };

  const handleTaskAnswer = (taskId: string, correct: boolean) => {
    if (!subject || !topic) return;
    setTaskStats((s) => ({ total: s.total + 1, correct: s.correct + (correct ? 1 : 0) }));
    apiRecordTaskResult(userId, subject.id, topic.id, taskId, correct);
  };

  const localBySubject: Record<string, number> = {};
  for (const [subId, set] of Object.entries(progress)) {
    localBySubject[subId] = set.size;
  }
  const localTopicsDone = Object.values(progress).reduce((acc, s) => acc + s.size, 0);

  let body: React.ReactNode;

  if (tab === 'homework') {
    body = <HomeworkScreen T={T} />;
  } else if (tab === 'profile') {
    body = (
      <ProfileScreen
        T={T} userId={userId} user={tgUser}
        localTopicsDone={localTopicsDone}
        localBySubject={localBySubject}
        localTasksTotal={taskStats.total}
        localTasksCorrect={taskStats.correct}
      />
    );
  } else if (screen === 'notebook') {
    body = <NotebookScreen T={T} onBack={() => setScreen('topics')} />;
  } else if (screen === 'task' && subject && topic) {
    body = (
      <TaskScreen
        T={T} subject={subject} topic={topic}
        onExit={() => setScreen('topics')}
        onComplete={markDone}
        onTaskAnswer={handleTaskAnswer}
      />
    );
  } else if (screen === 'topics' && subject) {
    body = (
      <TopicsScreen T={T} subject={subject} progress={progress}
        onBack={() => setScreen('subjects')}
        onPick={(tp) => {
          setTopic(tp);
          if (tp.notebook) setScreen('notebook');
          else setScreen('task');
        }} />
    );
  } else {
    body = (
      <SubjectsScreen T={T} streak={streak} progress={progress}
        onPick={(sub) => { setSubject(sub); setScreen('topics'); }} />
    );
  }

  const showNav = !(tab === 'train' && (screen === 'task' || screen === 'notebook'));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: T.font, background: T.page, paddingTop: 'var(--tg-safe-top, 0px)', paddingBottom: 'var(--tg-safe-bottom, 0px)' }}>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: T.page }}>
        {body}
      </div>
      {showNav && (
        <BottomNav T={T} tab={tab} onTab={(id) => { setTab(id); if (id === 'train') setScreen('subjects'); }} />
      )}
    </div>
  );
}
