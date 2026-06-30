import React from 'react';
import type { Tokens } from '../theme';
import { Icon } from '../icons';

const HAND = "'Caveat', 'Marck Script', cursive";
const INK = '#1a2e52';
const RED = '#c0392b';
const BLUE = '#1a5eb8';
const GREEN = '#1a7a45';
const FAINT = '#8899bb';

const PAPER: React.CSSProperties = {
  backgroundColor: '#f0f4ff',
  backgroundImage: `
    linear-gradient(rgba(120,160,230,0.45) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120,160,230,0.45) 1px, transparent 1px),
    linear-gradient(rgba(120,160,230,0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120,160,230,0.14) 1px, transparent 1px)
  `,
  backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
  backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
};

// ─── Мини-SVG диаграммы ────────────────────────────────────────────────────

function DiagramVT() {
  return (
    <svg width={130} height={85} viewBox="0 0 130 85">
      <line x1={18} y1={75} x2={18} y2={8} stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <line x1={12} y1={70} x2={118} y2={70} stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <polygon points="18,6 14,14 22,14" fill={INK} />
      <polygon points="120,70 112,66 112,74" fill={INK} />
      <text x={4} y={10} fontSize={11} fill={FAINT} fontFamily={HAND}>v</text>
      <text x={122} y={74} fontSize={11} fill={FAINT} fontFamily={HAND}>t</text>
      <line x1={18} y1={65} x2={105} y2={18} stroke={BLUE} strokeWidth={2} strokeLinecap="round" />
      <line x1={18} y1={50} x2={18} y2={70} stroke={RED} strokeWidth={1} strokeDasharray="3,2" />
      <line x1={18} y1={33} x2={18} y2={70} stroke={RED} strokeWidth={1} strokeDasharray="3,2" />
      <text x={22} y={52} fontSize={9} fill={RED} fontFamily={HAND}>v₀</text>
      <text x={22} y={36} fontSize={9} fill={RED} fontFamily={HAND}>v</text>
      <text x={55} y={80} fontSize={9} fill={FAINT} fontFamily={HAND}>a = tg α = const</text>
    </svg>
  );
}

function DiagramCollision() {
  return (
    <svg width={170} height={90} viewBox="0 0 170 90">
      <text x={5} y={14} fontSize={9} fill={FAINT} fontFamily={HAND}>до:</text>
      <circle cx={28} cy={28} r={14} fill="none" stroke={BLUE} strokeWidth={1.4} />
      <text x={22} y={32} fontSize={9} fill={INK} fontFamily={HAND}>m₁</text>
      <line x1={42} y1={28} x2={64} y2={28} stroke={BLUE} strokeWidth={1.4} strokeLinecap="round" />
      <polygon points="66,28 58,24 58,32" fill={BLUE} />

      <circle cx={115} cy={28} r={14} fill="none" stroke={RED} strokeWidth={1.4} />
      <text x={109} y={32} fontSize={9} fill={INK} fontFamily={HAND}>m₂</text>
      <line x1={101} y1={28} x2={80} y2={28} stroke={RED} strokeWidth={1.4} strokeLinecap="round" />
      <polygon points="78,28 86,24 86,32" fill={RED} />

      <text x={5} y={65} fontSize={9} fill={FAINT} fontFamily={HAND}>после:</text>
      <ellipse cx={75} cy={75} rx={24} ry={12} fill="none" stroke={GREEN} strokeWidth={1.4} strokeDasharray="4,2" />
      <text x={58} y={79} fontSize={9} fill={INK} fontFamily={HAND}>m₁+m₂</text>
      <line x1={99} y1={75} x2={135} y2={75} stroke={GREEN} strokeWidth={1.4} strokeLinecap="round" />
      <polygon points="137,75 129,71 129,79" fill={GREEN} />
      <text x={140} y={79} fontSize={9} fill={GREEN} fontFamily={HAND}>u</text>
    </svg>
  );
}

function DiagramPV() {
  return (
    <svg width={130} height={95} viewBox="0 0 130 95">
      <line x1={18} y1={85} x2={18} y2={8} stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <line x1={12} y1={80} x2={118} y2={80} stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <polygon points="18,6 14,14 22,14" fill={INK} />
      <polygon points="120,80 112,76 112,84" fill={INK} />
      <text x={4} y={11} fontSize={11} fill={FAINT} fontFamily={HAND}>p</text>
      <text x={122} y={84} fontSize={11} fill={FAINT} fontFamily={HAND}>V</text>
      {/* Изотерма — гипербола */}
      <path d="M 22 72 C 28 30 55 18 108 14" stroke={BLUE} strokeWidth={1.5} fill="none" />
      <text x={95} y={13} fontSize={8} fill={BLUE} fontFamily={HAND}>T=const</text>
      {/* Изохора — вертикаль */}
      <line x1={52} y1={22} x2={52} y2={80} stroke={RED} strokeWidth={1.3} strokeDasharray="4,2" />
      <text x={55} y={20} fontSize={8} fill={RED} fontFamily={HAND}>V=const</text>
      {/* Изобара — горизонталь */}
      <line x1={18} y1={50} x2={108} y2={50} stroke={GREEN} strokeWidth={1.3} strokeDasharray="4,2" />
      <text x={60} y={47} fontSize={8} fill={GREEN} fontFamily={HAND}>p=const</text>
    </svg>
  );
}

function DiagramCircuit() {
  return (
    <svg width={140} height={95} viewBox="0 0 140 95">
      {/* Контур */}
      <rect x={20} y={18} width={100} height={58} rx={4} fill="none" stroke={INK} strokeWidth={1.3} />
      {/* Батарея (слева) */}
      <line x1={14} y1={38} x2={26} y2={38} stroke={INK} strokeWidth={2.2} />
      <line x1={16} y1={45} x2={24} y2={45} stroke={INK} strokeWidth={1.2} />
      <line x1={14} y1={52} x2={26} y2={52} stroke={INK} strokeWidth={2.2} />
      <text x={28} y={49} fontSize={9} fill={RED} fontFamily={HAND}>ε</text>
      {/* Резистор (сверху, зигзаг) */}
      <polyline
        points="45,18 49,11 54,25 59,11 64,25 69,11 75,18"
        stroke={BLUE} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <text x={51} y={9} fontSize={9} fill={BLUE} fontFamily={HAND}>R</text>
      {/* Стрелки тока */}
      <polygon points="108,18 100,14 100,22" fill={GREEN} />
      <text x={108} y={15} fontSize={9} fill={GREEN} fontFamily={HAND}>I</text>
      <polygon points="20,72 24,64 24,80" fill={GREEN} />
      <text x={27} y={88} fontSize={9} fill={GREEN} fontFamily={HAND}>I = U/R</text>
    </svg>
  );
}

function DiagramMagneticFlux() {
  return (
    <svg width={140} height={90} viewBox="0 0 140 90">
      {/* Поверхность S */}
      <polygon
        points="30,65 80,42 110,55 60,78"
        fill="rgba(26,94,184,0.12)" stroke={BLUE} strokeWidth={1.4}
      />
      <text x={57} y={66} fontSize={9} fill={BLUE} fontFamily={HAND}>S</text>
      {/* Стрелки поля B */}
      {[[10,25,40,45],[37,15,67,35],[65,12,95,32],[90,22,120,42]].map(([x1,y1,x2,y2],i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth={1} />
          <polygon
            points={`${x2},${y2} ${x2-7},${y2-4} ${x2-5},${y2+4}`}
            fill="#555"
          />
        </g>
      ))}
      <text x={2} y={18} fontSize={11} fill={INK} fontFamily={HAND}>B</text>
      <text x={95} y={40} fontSize={9} fill={FAINT} fontFamily={HAND}>α</text>
      <text x={20} y={85} fontSize={9} fill={RED} fontFamily={HAND}>Φ = B·S·cos α</text>
    </svg>
  );
}

function DiagramRefraction() {
  return (
    <svg width={130} height={105} viewBox="0 0 130 105">
      {/* Граница раздела */}
      <line x1={5} y1={52} x2={125} y2={52} stroke="#999" strokeWidth={1} strokeDasharray="6,3" />
      {/* Нормаль */}
      <line x1={65} y1={5} x2={65} y2={100} stroke="#bbb" strokeWidth={0.8} strokeDasharray="3,3" />
      {/* Падающий луч */}
      <line x1={22} y1={10} x2={65} y2={52} stroke="#e67e22" strokeWidth={1.6} strokeLinecap="round" />
      <polygon points="65,52 56,44 62,55" fill="#e67e22" />
      {/* Преломлённый луч */}
      <line x1={65} y1={52} x2={100} y2={97} stroke={BLUE} strokeWidth={1.6} strokeLinecap="round" />
      <polygon points="100,97 91,90 97,90" fill={BLUE} />
      {/* Подписи */}
      <text x={48} y={40} fontSize={10} fill="#e67e22" fontFamily={HAND}>α</text>
      <text x={70} y={72} fontSize={10} fill={BLUE} fontFamily={HAND}>β</text>
      <text x={2} y={38} fontSize={8} fill={FAINT} fontFamily={HAND}>воздух</text>
      <text x={2} y={68} fontSize={8} fill={FAINT} fontFamily={HAND}>стекло</text>
      <text x={15} y={99} fontSize={9} fill={RED} fontFamily={HAND}>n = sin α/sin β</text>
    </svg>
  );
}

function DiagramDecay() {
  return (
    <svg width={160} height={75} viewBox="0 0 160 75">
      {/* Родительское ядро */}
      <circle cx={26} cy={35} r={20} fill="rgba(26,94,184,0.12)" stroke={BLUE} strokeWidth={1.4} />
      <text x={18} y={31} fontSize={9} fill={INK} fontFamily={HAND}>A</text>
      <text x={14} y={42} fontSize={9} fill={INK} fontFamily={HAND}>Z X</text>
      {/* Стрелка */}
      <line x1={46} y1={35} x2={78} y2={35} stroke={INK} strokeWidth={1.3} />
      <polygon points="80,35 72,31 72,39" fill={INK} />
      {/* Дочернее ядро */}
      <circle cx={100} cy={35} r={16} fill="rgba(26,122,69,0.12)" stroke={GREEN} strokeWidth={1.4} />
      <text x={93} y={31} fontSize={9} fill={INK} fontFamily={HAND}>A'</text>
      <text x={89} y={42} fontSize={9} fill={INK} fontFamily={HAND}>Z' Y</text>
      {/* Частица */}
      <text x={121} y={28} fontSize={11} fill={RED} fontFamily={HAND}>+</text>
      <circle cx={140} cy={35} r={12} fill="rgba(192,57,43,0.12)" stroke={RED} strokeWidth={1.3} />
      <text x={134} y={39} fontSize={9} fill={RED} fontFamily={HAND}>α/β</text>
      {/* α/β подписи */}
      <text x={5} y={68} fontSize={8} fill={FAINT} fontFamily={HAND}>α: A−4, Z−2 · β⁻: A, Z+1</text>
    </svg>
  );
}

// ─── Вспомогательные компоненты ────────────────────────────────────────────

function SectionTitle({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ marginTop: 26, marginBottom: 6 }}>
      <div style={{
        fontFamily: HAND, fontSize: 22, fontWeight: 700, color,
        borderBottom: `2px solid ${color}`, paddingBottom: 2,
        display: 'inline-block',
      }}>{label}</div>
    </div>
  );
}

function Formula({ children, color = RED }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: HAND, fontSize: 17, color,
      margin: '4px 0 4px 16px', lineHeight: 1.5,
    }}>{children}</div>
  );
}

function Note({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: HAND, fontSize: 15, color: INK,
      margin: '2px 0 2px 16px', lineHeight: 1.6,
      ...style,
    }}>{children}</div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: HAND, fontSize: 17, color: BLUE, fontWeight: 600,
      marginTop: 12, marginBottom: 2,
    }}>{children}</div>
  );
}

function Row({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginTop: 6 }}>
      <div style={{ flex: 1 }}>{left}</div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// ─── Главный компонент ──────────────────────────────────────────────────────

export function NotebookScreen({ T, onBack }: { T: Tokens; onBack: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Шапка */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center',
        padding: '8px 8px 10px', background: '#fff',
        borderBottom: `0.5px solid ${T.line}`,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 2, padding: 6,
        }}>
          <Icon.Back c={T.accent} />
          <span style={{ color: T.accent, fontSize: 16 }}>Темы</span>
        </button>
        <div style={{
          flex: 1, textAlign: 'center', fontFamily: HAND,
          fontSize: 20, fontWeight: 700, color: INK, marginRight: 40,
        }}>Конспект по физике</div>
      </div>

      {/* Страница тетради */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', ...PAPER }}>
        {/* Красная полоса */}
        <div style={{
          position: 'absolute', top: 0, left: 48, bottom: 0,
          width: 2, background: 'rgba(220,50,50,0.35)', pointerEvents: 'none',
        }} />

        <div style={{ padding: '20px 16px 32px 60px' }}>

          {/* Заголовок */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontFamily: HAND, fontSize: 30, fontWeight: 700, color: BLUE }}>⚛ Физика</div>
            <div style={{ fontFamily: HAND, fontSize: 16, color: FAINT }}>Шпаргалка для ЦТ / ЦЭ</div>
          </div>

          {/* ═══ МЕХАНИКА ══════════════════════════════════════════════════ */}
          <SectionTitle label="I. МЕХАНИКА" color="#c0392b" />

          <SubTitle>Кинематика</SubTitle>
          <Row
            left={<>
              <Formula>s = v₀t + at²/2</Formula>
              <Formula>v = v₀ + at</Formula>
              <Formula>v² = v₀² + 2as</Formula>
              <Note>a = const → равноускор. движение</Note>
              <Note>Горизонтальный бросок:</Note>
              <Formula color={BLUE}>t = √(2h/g)  L = v₀·t</Formula>
            </>}
            right={<DiagramVT />}
          />

          <SubTitle>Динамика</SubTitle>
          <Formula>F = ma  <span style={{ color: FAINT }}>(II закон Ньютона)</span></Formula>
          <Formula>F<sub>тр</sub> = μN  <span style={{ color: FAINT }}>(сила трения)</span></Formula>
          <Formula>F<sub>g</sub> = mg,  g = 10 м/с²</Formula>

          <SubTitle>Законы сохранения</SubTitle>
          <Row
            left={<>
              <Formula>p = mv  <span style={{ color: FAINT }}>[кг·м/с]</span></Formula>
              <Note>Замкнутая система: Σp = const</Note>
              <Formula color={GREEN}>m₁v₁ + m₂v₂ = (m₁+m₂)u</Formula>
              <Note style={{ marginTop: 6 }}>Механическая энергия:</Note>
              <Formula>E<sub>к</sub> = mv²/2</Formula>
              <Formula>E<sub>п</sub> = mgh</Formula>
              <Note>Без трения: E<sub>к</sub> + E<sub>п</sub> = const</Note>
            </>}
            right={<DiagramCollision />}
          />

          {/* ═══ МКТ И ТЕРМОДИНАМИКА ═══════════════════════════════════════ */}
          <SectionTitle label="II. МКТ И ТЕРМОДИНАМИКА" color="#1a7a45" />

          <Row
            left={<>
              <Formula color={RED}>T(К) = t(°C) + 273</Formula>
              <Note>Идеальный газ: pV = νRT, R = 8,31 Дж/(моль·К)</Note>

              <SubTitle>Газовые законы</SubTitle>
              <Note>Изохора (V=const):   </Note>
              <Formula>p / T = const</Formula>
              <Note>Изобара (p=const):   </Note>
              <Formula>V / T = const</Formula>
              <Note>Изотерма (T=const):  </Note>
              <Formula>pV = const</Formula>
              <Note>Общий случай:  p₁V₁/T₁ = p₂V₂/T₂</Note>
            </>}
            right={<DiagramPV />}
          />

          {/* ═══ ЭЛЕКТРОДИНАМИКА ════════════════════════════════════════════ */}
          <SectionTitle label="III. ЭЛЕКТРОДИНАМИКА" color="#1a5eb8" />

          <Row
            left={<>
              <SubTitle>Электростатика</SubTitle>
              <Formula>F = k·q₁q₂/r²  <span style={{ color: FAINT }}>k = 9·10⁹</span></Formula>

              <SubTitle>Постоянный ток</SubTitle>
              <Formula color={RED}>I = U / R  <span style={{ color: FAINT }}>(закон Ома)</span></Formula>
              <Formula>Последовательно: R = R₁ + R₂</Formula>
              <Formula>Параллельно: 1/R = 1/R₁ + 1/R₂</Formula>

              <SubTitle>Мощность и тепло</SubTitle>
              <Formula>P = UI = I²R</Formula>
              <Formula color={RED}>Q = I²Rt  <span style={{ color: FAINT }}>(Джоуль–Ленц)</span></Formula>
            </>}
            right={<DiagramCircuit />}
          />

          {/* ═══ МАГНЕТИЗМ ══════════════════════════════════════════════════ */}
          <SectionTitle label="IV. МАГНЕТИЗМ" color="#7b2d8b" />

          <Row
            left={<>
              <Formula color="#7b2d8b">Φ = B·S·cos α  <span style={{ color: FAINT }}>[Вб = Тл·м²]</span></Formula>
              <Note>α — угол между <b>B</b> и нормалью к S</Note>
              <Note>При B ⊥ S: α = 0°, Φ = B·S (макс.)</Note>
              <Formula>F = BIL sin α  <span style={{ color: FAINT }}>(сила Ампера)</span></Formula>
              <Formula>F = qvB sin α  <span style={{ color: FAINT }}>(сила Лоренца)</span></Formula>
            </>}
            right={<DiagramMagneticFlux />}
          />

          {/* ═══ ОПТИКА ════════════════════════════════════════════════════ */}
          <SectionTitle label="V. ОПТИКА" color="#e67e22" />

          <Row
            left={<>
              <Formula color="#e67e22">n = sin α / sin β</Formula>
              <Note>n &gt; 1 — среда оптически плотнее воздуха</Note>
              <Note>При переходе в более плотную: β &lt; α</Note>
              <SubTitle>Дифракционная решётка</SubTitle>
              <Formula>d · sin θ = mλ  <span style={{ color: FAINT }}>(m = 0, ±1, ±2...)</span></Formula>
              <Note>ν — частота; λ = c/ν; c = 3·10⁸ м/с</Note>
            </>}
            right={<DiagramRefraction />}
          />

          {/* ═══ ЯДЕРНАЯ ФИЗИКА ════════════════════════════════════════════ */}
          <SectionTitle label="VI. ЯДЕРНАЯ ФИЗИКА" color="#555" />

          <Row
            left={<>
              <Note>Состав ядра: <b>A</b> = Z + N</Note>
              <Note>Z — протоны; N — нейтроны; A — массовое число</Note>
              <SubTitle>Виды распада</SubTitle>
              <Formula color={RED}>α-распад: Z−2, A−4</Formula>
              <Note style={{ marginLeft: 24, fontSize: 13, color: FAINT }}>ᴬ<sub>Z</sub>X → ᴬ⁻⁴<sub>Z−2</sub>Y + ⁴<sub>2</sub>He</Note>
              <Formula color={BLUE}>β⁻-распад: Z+1, A без изменений</Formula>
              <Note style={{ marginLeft: 24, fontSize: 13, color: FAINT }}>ᴬ<sub>Z</sub>X → ᴬ<sub>Z+1</sub>Y + e⁻</Note>
            </>}
            right={<DiagramDecay />}
          />

          {/* ═══ ЧАСТОТЫ И КОНСТАНТЫ ═══════════════════════════════════════ */}
          <SectionTitle label="VII. НУЖНЫЕ КОНСТАНТЫ" color={FAINT} />
          <div style={{
            background: 'rgba(255,255,255,0.6)', borderRadius: 10,
            padding: '10px 14px', marginTop: 6,
            border: '1px solid rgba(120,160,230,0.4)',
          }}>
            {[
              ['g', '= 10 м/с²', 'ускорение свободного падения'],
              ['k', '= 9·10⁹ Н·м²/Кл²', 'постоянная Кулона'],
              ['R', '= 8,31 Дж/(моль·К)', 'газовая постоянная'],
              ['c', '= 3·10⁸ м/с', 'скорость света'],
              ['e', '= 1,6·10⁻¹⁹ Кл', 'заряд электрона'],
            ].map(([sym, val, hint]) => (
              <div key={sym} style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 3 }}>
                <span style={{ fontFamily: HAND, fontSize: 15, color: RED, minWidth: 16 }}>{sym}</span>
                <span style={{ fontFamily: HAND, fontSize: 15, color: BLUE, minWidth: 130 }}>{val}</span>
                <span style={{ fontFamily: HAND, fontSize: 13, color: FAINT }}>{hint}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>
    </div>
  );
}
