export type TaskBase = {
  id: string;
  prompt: string;
  hint: string;
  solution: string[];
};

export type SingleTask = TaskBase & {
  type: 'single';
  options: string[];
  answer: number;
};

export type MultipleTask = TaskBase & {
  type: 'multiple';
  options: string[];
  answer: number[];
};

export type NumberTask = TaskBase & {
  type: 'number';
  answer: number;
  tol?: number;
  unit?: string;
};

export type Task = SingleTask | MultipleTask | NumberTask;

export interface Topic {
  id: string;
  name: string;
  blurb: string;
  tasks?: Task[];
  locked?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  glyph: string;
  tint: string;
  blurb: string;
  topics: Topic[];
}

const MATH_PROGRESSIONS: Task[] = [
  {
    id: 'm1',
    type: 'single',
    prompt: 'Арифметическая прогрессия задана первым членом a₁ = 5 и разностью d = 3. Чему равен восьмой член a₈?',
    options: ['23', '26', '29', '24'],
    answer: 1,
    hint: 'aₙ = a₁ + (n − 1)·d',
    solution: [
      'Формула n-го члена: aₙ = a₁ + (n − 1)·d.',
      'Подставляем: a₈ = 5 + (8 − 1)·3 = 5 + 21 = 26.',
    ],
  },
  {
    id: 'm2',
    type: 'number',
    prompt: 'Найдите сумму первых 12 членов арифметической прогрессии, если a₁ = 4, d = 2.',
    answer: 180,
    tol: 0,
    hint: 'Sₙ = (2a₁ + (n − 1)d) · n / 2',
    solution: [
      'Сумма первых n членов: Sₙ = (2a₁ + (n − 1)d)·n / 2.',
      'S₁₂ = (2·4 + 11·2)·12 / 2 = (8 + 22)·6 = 30·6 = 180.',
    ],
  },
  {
    id: 'm3',
    type: 'single',
    prompt: 'Геометрическая прогрессия задана b₁ = 3 и знаменателем q = 2. Найдите шестой член b₆.',
    options: ['48', '96', '64', '192'],
    answer: 1,
    hint: 'bₙ = b₁ · q^(n−1)',
    solution: [
      'Формула n-го члена: bₙ = b₁ · q^(n−1).',
      'b₆ = 3 · 2⁵ = 3 · 32 = 96.',
    ],
  },
  {
    id: 'm4',
    type: 'number',
    prompt: 'Найдите сумму бесконечно убывающей геометрической прогрессии с b₁ = 12 и q = 1/3.',
    answer: 18,
    tol: 0,
    hint: 'S = b₁ / (1 − q), при |q| < 1',
    solution: [
      'Сумма бесконечной прогрессии: S = b₁ / (1 − q).',
      'S = 12 / (1 − 1/3) = 12 / (2/3) = 12 · 3/2 = 18.',
    ],
  },
  {
    id: 'm5',
    type: 'multiple',
    prompt: 'Какие из последовательностей являются арифметической прогрессией?',
    options: ['2; 5; 8; 11; …', '3; 6; 12; 24; …', '10; 7; 4; 1; …', '1; 4; 9; 16; …'],
    answer: [0, 2],
    hint: 'У арифметической прогрессии разность соседних членов постоянна.',
    solution: [
      'Проверяем постоянство разности aₙ₊₁ − aₙ.',
      '2;5;8;11 — разность +3 (да). 10;7;4;1 — разность −3 (да).',
      '3;6;12;24 — это геометрическая (×2). 1;4;9;16 — квадраты, разности 3,5,7 (нет).',
    ],
  },
  {
    id: 'm6',
    type: 'number',
    prompt: 'В арифметической прогрессии a₃ = 10, a₇ = 22. Найдите разность d.',
    answer: 3,
    tol: 0,
    hint: 'aₙ = aₖ + (n − k)·d',
    solution: [
      'a₇ − a₃ = (7 − 3)·d = 4d.',
      '22 − 10 = 4d → 12 = 4d → d = 3.',
    ],
  },
];

const PHYSICS_CONSERVATION: Task[] = [
  {
    id: 'p1',
    type: 'number',
    prompt: 'Тело массой 3 кг движется со скоростью 4 м/с. Найдите импульс тела.',
    answer: 12,
    tol: 0,
    unit: 'кг·м/с',
    hint: 'p = m · v',
    solution: ['Импульс: p = m · v.', 'p = 3 кг · 4 м/с = 12 кг·м/с.'],
  },
  {
    id: 'p2',
    type: 'single',
    prompt: 'Кинетическая энергия тела массой 2 кг, движущегося со скоростью 6 м/с, равна:',
    options: ['12 Дж', '18 Дж', '36 Дж', '72 Дж'],
    answer: 2,
    hint: 'Eₖ = m·v² / 2',
    solution: ['Кинетическая энергия: Eₖ = m·v² / 2.', 'Eₖ = 2 · 6² / 2 = 2 · 36 / 2 = 36 Дж.'],
  },
  {
    id: 'p3',
    type: 'number',
    prompt: 'Груз массой 5 кг поднят на высоту 4 м. Найдите его потенциальную энергию (g = 10 м/с²).',
    answer: 200,
    tol: 0,
    unit: 'Дж',
    hint: 'Eₚ = m · g · h',
    solution: ['Потенциальная энергия: Eₚ = m · g · h.', 'Eₚ = 5 · 10 · 4 = 200 Дж.'],
  },
  {
    id: 'p4',
    type: 'number',
    prompt: 'С какой скоростью тело упадёт на землю, падая без начальной скорости с высоты 5 м? (g = 10 м/с², сопротивление не учитывать)',
    answer: 10,
    tol: 0,
    unit: 'м/с',
    hint: 'По закону сохранения энергии: mgh = mv²/2',
    solution: [
      'Закон сохранения энергии: m·g·h = m·v² / 2.',
      'v = √(2gh) = √(2 · 10 · 5) = √100 = 10 м/с.',
    ],
  },
  {
    id: 'p5',
    type: 'single',
    prompt: 'Два пластилиновых шара массами 1 кг и 2 кг летят навстречу друг другу со скоростями 6 м/с и 3 м/с и слипаются. Какова скорость шаров после столкновения?',
    options: ['0 м/с', '1,5 м/с', '3 м/с', '4,5 м/с'],
    answer: 0,
    hint: 'Закон сохранения импульса: m₁v₁ + m₂v₂ = (m₁ + m₂)·u',
    solution: [
      'Импульс — векторная величина, скорости направлены навстречу (знаки разные).',
      'm₁v₁ − m₂v₂ = (m₁ + m₂)·u.',
      'u = (1·6 − 2·3) / (1 + 2) = (6 − 6) / 3 = 0 м/с.',
    ],
  },
  {
    id: 'p6',
    type: 'multiple',
    prompt: 'Какие утверждения о замкнутой системе тел верны?',
    options: [
      'Полный импульс системы сохраняется',
      'Кинетическая энергия сохраняется при неупругом ударе',
      'Полная механическая энергия сохраняется при отсутствии трения',
      'Полная энергия системы сохраняется всегда',
    ],
    answer: [0, 2, 3],
    hint: 'Импульс сохраняется всегда; механическая энергия — только без трения.',
    solution: [
      'Полный импульс замкнутой системы сохраняется всегда — верно.',
      'При неупругом ударе часть кинетической энергии переходит в тепло — неверно.',
      'Механическая энергия сохраняется, если нет трения — верно.',
      'Полная энергия (с учётом тепла) сохраняется всегда — верно.',
    ],
  },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Математика',
    glyph: '∑',
    tint: '#3390EC',
    blurb: 'Алгебра и начала анализа',
    topics: [
      { id: 'progressions', name: 'Прогрессии', blurb: 'Арифметическая и геометрическая', tasks: MATH_PROGRESSIONS },
      { id: 'm-derivative', name: 'Производная', blurb: 'Скоро', locked: true },
      { id: 'm-trig', name: 'Тригонометрия', blurb: 'Скоро', locked: true },
    ],
  },
  {
    id: 'physics',
    name: 'Физика',
    glyph: '⚛',
    tint: '#E8804B',
    blurb: 'Механика, МКТ, электричество',
    topics: [
      { id: 'conservation', name: 'Законы сохранения', blurb: 'Импульс и энергия', tasks: PHYSICS_CONSERVATION },
      { id: 'p-kinematics', name: 'Кинематика', blurb: 'Скоро', locked: true },
      { id: 'p-thermo', name: 'Молекулярная физика', blurb: 'Скоро', locked: true },
    ],
  },
];

export function answerText(task: Task): string {
  if (task.type === 'single') return task.options[task.answer];
  if (task.type === 'multiple') return task.answer.map((i) => String.fromCharCode(1040 + i)).join(', ');
  return String(task.answer) + (task.unit ? ' ' + task.unit : '');
}
