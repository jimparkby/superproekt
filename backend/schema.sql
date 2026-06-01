-- Запусти этот SQL в Supabase: Dashboard → SQL Editor → New query

CREATE TABLE IF NOT EXISTS topic_done (
    user_id     TEXT NOT NULL,
    subject_id  TEXT NOT NULL,
    topic_id    TEXT NOT NULL,
    done_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, subject_id, topic_id)
);

CREATE TABLE IF NOT EXISTS task_result (
    id          BIGSERIAL PRIMARY KEY,
    user_id     TEXT NOT NULL,
    subject_id  TEXT NOT NULL,
    topic_id    TEXT NOT NULL,
    task_id     TEXT NOT NULL,
    correct     BOOLEAN NOT NULL,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_task_result_user ON task_result(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_done_user  ON topic_done(user_id);
