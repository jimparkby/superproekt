import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface ProfileStats {
  user_id: string;
  topics_done: number;
  tasks_total: number;
  tasks_correct: number;
  correct_pct: number;
  by_subject: Record<string, number>;
}

export async function apiMarkTopicDone(userId: string, subjectId: string, topicId: string) {
  await supabase
    .from('topic_done')
    .upsert(
      { user_id: userId, subject_id: subjectId, topic_id: topicId },
      { onConflict: 'user_id,subject_id,topic_id', ignoreDuplicates: true },
    );
}

export async function apiRecordTaskResult(
  userId: string, subjectId: string, topicId: string, taskId: string, correct: boolean,
) {
  await supabase.from('task_result').insert({
    user_id: userId, subject_id: subjectId, topic_id: topicId, task_id: taskId, correct,
  });
}

export async function apiFetchTopicsDone(userId: string): Promise<Record<string, Set<string>>> {
  const { data, error } = await supabase
    .from('topic_done')
    .select('subject_id, topic_id')
    .eq('user_id', userId);

  if (error || !data) return {};

  const progress: Record<string, Set<string>> = {};
  for (const row of data) {
    if (!progress[row.subject_id]) progress[row.subject_id] = new Set();
    progress[row.subject_id].add(row.topic_id);
  }
  return progress;
}

export async function apiFetchProfile(userId: string): Promise<ProfileStats | null> {
  const [topicsRes, tasksRes] = await Promise.all([
    supabase.from('topic_done').select('subject_id').eq('user_id', userId),
    supabase.from('task_result').select('correct').eq('user_id', userId),
  ]);

  if (topicsRes.error || tasksRes.error) return null;

  const topics = topicsRes.data ?? [];
  const tasks  = tasksRes.data  ?? [];

  const topicsDone   = topics.length;
  const tasksTotal   = tasks.length;
  const tasksCorrect = tasks.filter((t) => t.correct).length;
  const correctPct   = tasksTotal > 0 ? Math.round(tasksCorrect / tasksTotal * 100) : 0;

  const bySubject: Record<string, number> = {};
  for (const t of topics) {
    bySubject[t.subject_id] = (bySubject[t.subject_id] || 0) + 1;
  }

  return { user_id: userId, topics_done: topicsDone, tasks_total: tasksTotal, tasks_correct: tasksCorrect, correct_pct: correctPct, by_subject: bySubject };
}
