// タロットカードコンポーネント
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─────────────────────────────────────────────────────────────────────
// カード単体（裏／表両面、3D反転）
// ─────────────────────────────────────────────────────────────────────
const TarotCard = ({ card, reversed, flipped, selected, dim, onClick, size = "md", glow = false, hint = false }) => {
  const dims = {
    sm: { w: 56, h: 92, fs: 9 },
    md: { w: 120, h: 192, fs: 13 },
    lg: { w: 200, h: 320, fs: 18 },
  }[size];

  return (
    <button
      className={`tarot-card-wrap ${selected ? "is-selected" : ""} ${dim ? "is-dim" : ""} ${glow ? "is-glow" : ""} ${hint ? "is-hint" : ""}`}
      onClick={onClick}
      style={{ "--cw": `${dims.w}px`, "--ch": `${dims.h}px`, "--fs": `${dims.fs}px` }}
      aria-label={card ? `${card.name}` : "カード"}
    >
      <div className={`tarot-card ${flipped ? "is-flipped" : ""}`}>
        {/* 裏面 */}
        <div className="tarot-face tarot-back">
          <svg viewBox="0 0 120 192" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`bg-${size}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2d1b5e" />
                <stop offset="100%" stopColor="#0f0420" />
              </linearGradient>
              <radialGradient id={`star-${size}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor="#f4d160" stopOpacity="1" />
                <stop offset="100%" stopColor="#f4d160" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="120" height="192" fill={`url(#bg-${size})`} />
            <rect x="4" y="4" width="112" height="184" rx="2" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
            <rect x="7" y="7" width="106" height="178" rx="1" fill="none" stroke="#d4af37" strokeWidth="0.3" opacity="0.4" />
            {/* 中央エンブレム */}
            <g transform="translate(60 96)">
              <circle r="32" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity="0.7" />
              <circle r="22" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.5" />
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return <path key={i} d={`M${Math.cos(a) * 12} ${Math.sin(a) * 12} L${Math.cos(a) * 32} ${Math.sin(a) * 32}`} stroke="#d4af37" strokeWidth="0.4" opacity="0.5" />;
              })}
              <circle r="6" fill="#d4af37" opacity="0.9" />
              <circle r="12" fill="none" stroke="#d4af37" strokeWidth="0.4" />
            </g>
            {/* 角の星 */}
            {[[18, 18], [102, 18], [18, 174], [102, 174]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="1.5" fill="#d4af37" opacity="0.8" />
                <circle r="4" fill="none" stroke="#d4af37" strokeWidth="0.3" opacity="0.4" />
              </g>
            ))}
            {/* 散らばる星 */}
            {[[30, 50], [90, 60], [25, 130], [95, 140], [60, 35], [60, 158]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={0.6 + (i % 2) * 0.4} fill="#f4d160" opacity={0.4 + (i % 3) * 0.15} />
            ))}
          </svg>
        </div>

        {/* 表面 */}
        <div className="tarot-face tarot-front" style={{ transform: reversed ? "rotateY(180deg) rotateZ(180deg)" : "rotateY(180deg)" }}>
          {card && (
            <svg viewBox="0 0 200 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`fb-${card.n}-${size}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f0f3d" />
                  <stop offset="50%" stopColor="#2a1656" />
                  <stop offset="100%" stopColor="#16082e" />
                </linearGradient>
              </defs>
              <rect width="200" height="320" fill={`url(#fb-${card.n}-${size})`} />
              <rect x="6" y="6" width="188" height="308" rx="3" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.7" />
              <rect x="10" y="10" width="180" height="300" rx="2" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.4" />

              {/* 上部：ローマ数字 */}
              <text x="100" y="38" textAnchor="middle" fill="#e8c563" fontSize="14" fontFamily="'Cormorant Garamond', serif" letterSpacing="3">
                {toRoman(card.n)}
              </text>
              <line x1="40" y1="48" x2="160" y2="48" stroke="#d4af37" strokeWidth="0.4" opacity="0.5" />

              {/* 中央：シンボル */}
              <g transform="translate(0 0)">
                <Glyph name={card.glyph} color="#e8c563" />
              </g>

              {/* 下部：名前 */}
              <line x1="40" y1="245" x2="160" y2="245" stroke="#d4af37" strokeWidth="0.4" opacity="0.5" />
              <text x="100" y="268" textAnchor="middle" fill="#f0d57a" fontSize="15" fontFamily="'Cormorant Garamond', serif" fontWeight="500" letterSpacing="2">
                {card.name}
              </text>
              <text x="100" y="288" textAnchor="middle" fill="#9b7eb5" fontSize="9" fontFamily="'Cormorant Garamond', serif" letterSpacing="3" fontStyle="italic">
                {card.en.toUpperCase()}
              </text>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

function toRoman(n) {
  if (n === 0) return "0";
  const map = [["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
  let r = "", v = n;
  for (const [s, k] of map) { while (v >= k) { r += s; v -= k; } }
  return r;
}

window.TarotCard = TarotCard;
