const BASE = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:8000';

export interface ProfileStats {
  user_id: string;
  topics_done: number;
  tasks_total: number;
  tasks_correct: number;
  correct_pct: number;
  by_subject: Record<string, number>;
}

export async function apiMarkTopicDone(userId: string, subjectId: string, topicId: string) {
  fetch(`${BASE}/api/progress/topic`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, subject_id: subjectId, topic_id: topicId }),
  }).catch(() => {});
}

export async function apiRecordTaskResult(
  userId: string, subjectId: string, topicId: string, taskId: string, correct: boolean,
) {
  fetch(`${BASE}/api/progress/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, subject_id: subjectId, topic_id: topicId, task_id: taskId, correct }),
  }).catch(() => {});
}

export async function apiFetchProfile(userId: string): Promise<ProfileStats | null> {
  try {
    const res = await fetch(`${BASE}/api/profile/${userId}`);
    if (!res.ok) return null;
    return res.json() as Promise<ProfileStats>;
  } catch {
    return null;
  }
}
