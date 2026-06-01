import os
from contextlib import contextmanager

import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATABASE_URL = os.environ["DATABASE_URL"]


@contextmanager
def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


app = FastAPI(title="решай API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- модели ----------

class TopicDoneRequest(BaseModel):
    user_id: str
    subject_id: str
    topic_id: str


class TaskResultRequest(BaseModel):
    user_id: str
    subject_id: str
    topic_id: str
    task_id: str
    correct: bool


# ---------- эндпоинты ----------

@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/api/progress/topic")
def mark_topic_done(body: TopicDoneRequest):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO topic_done (user_id, subject_id, topic_id)
                VALUES (%s, %s, %s)
                ON CONFLICT (user_id, subject_id, topic_id) DO NOTHING
                """,
                (body.user_id, body.subject_id, body.topic_id),
            )
    return {"ok": True}


@app.post("/api/progress/task")
def record_task_result(body: TaskResultRequest):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO task_result (user_id, subject_id, topic_id, task_id, correct)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (body.user_id, body.subject_id, body.topic_id, body.task_id, body.correct),
            )
    return {"ok": True}


@app.get("/api/profile/{user_id}")
def get_profile(user_id: str):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT subject_id, topic_id FROM topic_done WHERE user_id = %s",
                (user_id,),
            )
            topics = cur.fetchall()

            cur.execute(
                "SELECT correct FROM task_result WHERE user_id = %s",
                (user_id,),
            )
            tasks = cur.fetchall()

    topics_done = len(topics)
    tasks_total = len(tasks)
    tasks_correct = sum(1 for r in tasks if r["correct"])
    correct_pct = round(tasks_correct / tasks_total * 100) if tasks_total > 0 else 0

    by_subject: dict[str, int] = {}
    for row in topics:
        sid = row["subject_id"]
        by_subject[sid] = by_subject.get(sid, 0) + 1

    return {
        "user_id": user_id,
        "topics_done": topics_done,
        "tasks_total": tasks_total,
        "tasks_correct": tasks_correct,
        "correct_pct": correct_pct,
        "by_subject": by_subject,
    }
