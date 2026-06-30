# Деплой приложения "решай"

## Архитектура

- **Фронтенд**: Vercel (React + Vite + TypeScript)
- **Бекенд**: Railway (FastAPI + Python)
- **База данных**: Supabase (PostgreSQL)

## Шаг 1: Настройка базы данных (Supabase)

1. Создайте проект на [Supabase](https://supabase.com)
2. Перейдите в **SQL Editor** и выполните SQL из файла `backend/schema.sql`:

```sql
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
```

3. Скопируйте **Connection String** из раздела **Settings → Database**:
   - Формат: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-REF].supabase.co:5432/postgres`

## Шаг 2: Деплой бекенда (Railway)

1. Зарегистрируйтесь на [Railway](https://railway.app)
2. Создайте новый проект: **New Project → Deploy from GitHub repo**
3. Выберите репозиторий `superproekt`
4. Добавьте переменную окружения:
   - `DATABASE_URL` = Connection String из Supabase
5. Railway автоматически обнаружит `railway.json` и задеплоит приложение
6. Скопируйте публичный URL (например: `https://superproekt-production.up.railway.app`)

## Шаг 3: Деплой фронтенда (Vercel)

1. Зарегистрируйтесь на [Vercel](https://vercel.com)
2. Импортируйте репозиторий GitHub
3. Настройки проекта:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Добавьте переменную окружения:
   - `VITE_API_URL` = URL из Railway (например: `https://superproekt-production.up.railway.app`)
5. Нажмите **Deploy**

## Шаг 4: Проверка

1. Откройте приложение на Vercel
2. Проверьте что:
   - Предметы отображаются
   - Можно решать задачи
   - Прогресс сохраняется в профиле

## Локальная разработка

### Backend

```bash
cd backend
pip install -r requirements.txt
export DATABASE_URL="postgresql://..."
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

## Переменные окружения

### Backend (Railway)
- `DATABASE_URL` - Connection String из Supabase
- `PORT` - порт (автоматически устанавливается Railway)

### Frontend (Vercel)
- `VITE_API_URL` - URL бекенда на Railway

## Troubleshooting

### Ошибка подключения к БД
Проверьте что DATABASE_URL правильный и содержит пароль.

### CORS ошибки
Убедитесь что в `backend/main.py` включен CORS для вашего Vercel домена:
```python
allow_origins=["*"]  # или конкретный домен
```

### Прогресс не сохраняется
1. Проверьте что API запросы доходят до бекенда (DevTools → Network)
2. Проверьте что `VITE_API_URL` установлен правильно
3. Проверьте логи на Railway
