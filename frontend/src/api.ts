const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ProfileStats {
  user_id: string;
  topics_done: number;
  tasks_total: number;
  tasks_correct: number;
  correct_pct: number;
  by_subject: Record<string, number>;
}

export async function apiMarkTopicDone(userId: string, subjectId: string, topicId: string) {
  await fetch(`${API_URL}/api/progress/topic`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, subject_id: subjectId, topic_id: topicId }),
  });
}

export async function apiRecordTaskResult(
  userId: string, subjectId: string, topicId: string, taskId: string, correct: boolean,
) {
  await fetch(`${API_URL}/api/progress/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, subject_id: subjectId, topic_id: topicId, task_id: taskId, correct }),
  });
}

export async function apiFetchTopicsDone(userId: string): Promise<Record<string, Set<string>>> {
  try {
    const res = await fetch(`${API_URL}/api/topics/${userId}`);
    if (!res.ok) return {};
    const data: Record<string, string[]> = await res.json();

    // Конвертируем массивы в Set
    const progress: Record<string, Set<string>> = {};
    for (const [subjectId, topicIds] of Object.entries(data)) {
      progress[subjectId] = new Set(topicIds);
    }
    return progress;
  } catch {
    return {};
  }
}

export async function apiFetchProfile(userId: string): Promise<ProfileStats | null> {
  try {
    const res = await fetch(`${API_URL}/api/profile/${userId}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data as ProfileStats;
  } catch {
    return null;
  }
}
