// 大アルカナ22枚のミニマル幾何学的シンボル
// 各カードは 200x320 viewBox の SVG 内容を返す

const Glyph = ({ name, color = "#e8c563", accent = "#b88f3d" }) => {
  const stroke = { stroke: color, strokeWidth: 1.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const fillG = { fill: color };
  const cx = 100, cy = 160;

  const glyphs = {
    fool: (
      <g>
        <circle cx={cx} cy={cy} r="50" {...stroke} />
        <circle cx={cx} cy={cy} r="50" {...stroke} strokeDasharray="3 6" opacity="0.5" />
        <circle cx={cx} cy={cy} r="3" {...fillG} />
        <path d={`M${cx-30} ${cy+30} L${cx+30} ${cy-30}`} {...stroke} />
      </g>
    ),
    magician: (
      <g>
        <path d={`M${cx} ${cy-55} L${cx} ${cy+55}`} {...stroke} />
        <path d={`M${cx-55} ${cy} L${cx+55} ${cy}`} {...stroke} />
        <circle cx={cx} cy={cy-55} r="4" {...fillG} />
        <circle cx={cx} cy={cy+55} r="4" {...fillG} />
        <circle cx={cx-55} cy={cy} r="4" {...fillG} />
        <circle cx={cx+55} cy={cy} r="4" {...fillG} />
        <circle cx={cx} cy={cy} r="18" {...stroke} />
        <text x={cx} y={cy+5} textAnchor="middle" fill={color} fontSize="20" fontFamily="serif">∞</text>
      </g>
    ),
    priestess: (
      <g>
        <path d={`M${cx-40} ${cy+40} A50 50 0 1 1 ${cx+40} ${cy+40}`} {...stroke} />
        <path d={`M${cx-30} ${cy+30} A38 38 0 0 0 ${cx+30} ${cy+30}`} {...stroke} opacity="0.5" />
        <circle cx={cx} cy={cy} r="4" {...fillG} />
        <path d={`M${cx-40} ${cy+40} L${cx+40} ${cy+40}`} {...stroke} />
      </g>
    ),
    empress: (
      <g>
        <circle cx={cx} cy={cy-15} r="35" {...stroke} />
        <path d={`M${cx} ${cy+20} L${cx} ${cy+55}`} {...stroke} />
        <path d={`M${cx-22} ${cy+55} L${cx+22} ${cy+55}`} {...stroke} />
        <circle cx={cx} cy={cy-15} r="6" {...fillG} />
        <path d={`M${cx-15} ${cy-30} L${cx} ${cy-45} L${cx+15} ${cy-30}`} {...stroke} />
      </g>
    ),
    emperor: (
      <g>
        <rect x={cx-40} y={cy-50} width="80" height="100" {...stroke} />
        <path d={`M${cx-25} ${cy-50} L${cx-15} ${cy-65} L${cx-5} ${cy-50}`} {...stroke} />
        <path d={`M${cx+5} ${cy-50} L${cx+15} ${cy-65} L${cx+25} ${cy-50}`} {...stroke} />
        <circle cx={cx} cy={cy} r="8" {...fillG} />
      </g>
    ),
    hierophant: (
      <g>
        <path d={`M${cx-35} ${cy+45} L${cx-35} ${cy-30} L${cx} ${cy-50} L${cx+35} ${cy-30} L${cx+35} ${cy+45} Z`} {...stroke} />
        <path d={`M${cx} ${cy-50} L${cx} ${cy+45}`} {...stroke} />
        <path d={`M${cx-15} ${cy-15} L${cx+15} ${cy-15}`} {...stroke} />
        <path d={`M${cx-12} ${cy+5} L${cx+12} ${cy+5}`} {...stroke} />
      </g>
    ),
    lovers: (
      <g>
        <circle cx={cx-18} cy={cy} r="28" {...stroke} />
        <circle cx={cx+18} cy={cy} r="28" {...stroke} />
        <path d={`M${cx-2} ${cy-20} A8 8 0 0 1 ${cx+10} ${cy-12} L${cx+4} ${cy-2} L${cx-2} ${cy-12} Z`} {...fillG} opacity="0.7" />
      </g>
    ),
    chariot: (
      <g>
        <rect x={cx-40} y={cy-25} width="80" height="40" {...stroke} />
        <circle cx={cx-25} cy={cy+30} r="15" {...stroke} />
        <circle cx={cx+25} cy={cy+30} r="15" {...stroke} />
        <path d={`M${cx} ${cy-50} L${cx} ${cy-25}`} {...stroke} />
        <path d={`M${cx-12} ${cy-40} L${cx+12} ${cy-40}`} {...stroke} />
      </g>
    ),
    strength: (
      <g>
        <path d={`M${cx-45} ${cy} A45 45 0 0 1 ${cx+45} ${cy}`} {...stroke} />
        <path d={`M${cx-45} ${cy} A45 45 0 0 0 ${cx+45} ${cy}`} {...stroke} />
        <circle cx={cx} cy={cy-45} r="12" {...fillG} />
        <text x={cx} y={cy+5} textAnchor="middle" fill={color} fontSize="22" fontFamily="serif">∞</text>
      </g>
    ),
    hermit: (
      <g>
        <path d={`M${cx-30} ${cy+45} L${cx} ${cy-50} L${cx+30} ${cy+45} Z`} {...stroke} />
        <circle cx={cx} cy={cy} r="14" {...fillG} />
        <circle cx={cx} cy={cy} r="22" {...stroke} strokeDasharray="2 4" />
      </g>
    ),
    wheel: (
      <g>
        <circle cx={cx} cy={cy} r="50" {...stroke} />
        <circle cx={cx} cy={cy} r="35" {...stroke} opacity="0.5" />
        <circle cx={cx} cy={cy} r="6" {...fillG} />
        <path d={`M${cx-50} ${cy} L${cx+50} ${cy}`} {...stroke} />
        <path d={`M${cx} ${cy-50} L${cx} ${cy+50}`} {...stroke} />
        <path d={`M${cx-35} ${cy-35} L${cx+35} ${cy+35}`} {...stroke} opacity="0.6" />
        <path d={`M${cx-35} ${cy+35} L${cx+35} ${cy-35}`} {...stroke} opacity="0.6" />
      </g>
    ),
    justice: (
      <g>
        <path d={`M${cx} ${cy-50} L${cx} ${cy+50}`} {...stroke} />
        <path d={`M${cx-50} ${cy-25} L${cx+50} ${cy-25}`} {...stroke} />
        <circle cx={cx-35} cy={cy-10} r="10" {...stroke} />
        <circle cx={cx+35} cy={cy-10} r="10" {...stroke} />
        <path d={`M${cx-35} ${cy-25} L${cx-35} ${cy-15}`} {...stroke} />
        <path d={`M${cx+35} ${cy-25} L${cx+35} ${cy-15}`} {...stroke} />
        <path d={`M${cx-15} ${cy+50} L${cx+15} ${cy+50}`} {...stroke} />
      </g>
    ),
    hanged: (
      <g>
        <path d={`M${cx-40} ${cy-55} L${cx+40} ${cy-55}`} {...stroke} />
        <path d={`M${cx} ${cy-55} L${cx} ${cy-25}`} {...stroke} />
        <circle cx={cx} cy={cy-10} r="15" {...stroke} />
        <path d={`M${cx} ${cy+5} L${cx} ${cy+30}`} {...stroke} />
        <path d={`M${cx-15} ${cy+50} L${cx} ${cy+30} L${cx+15} ${cy+50}`} {...stroke} />
        <circle cx={cx} cy={cy-10} r="22" {...stroke} strokeDasharray="2 3" opacity="0.5" />
      </g>
    ),
    death: (
      <g>
        <path d={`M${cx-40} ${cy+40} L${cx} ${cy-50} L${cx+40} ${cy+40} Z`} {...stroke} />
        <path d={`M${cx-40} ${cy+40} L${cx+40} ${cy+40}`} {...stroke} />
        <circle cx={cx} cy={cy+5} r="6" {...fillG} />
        <path d={`M${cx-15} ${cy+25} L${cx+15} ${cy+25}`} {...stroke} />
      </g>
    ),
    temperance: (
      <g>
        <circle cx={cx-25} cy={cy-20} r="20" {...stroke} />
        <circle cx={cx+25} cy={cy+20} r="20" {...stroke} />
        <path d={`M${cx-12} ${cy-10} L${cx+12} ${cy+10}`} {...stroke} strokeWidth="1.5" />
        <path d={`M${cx-8} ${cy-5} L${cx+8} ${cy+5}`} {...stroke} opacity="0.5" />
      </g>
    ),
    devil: (
      <g>
        <path d={`M${cx-35} ${cy-30} L${cx-50} ${cy-55} M${cx+35} ${cy-30} L${cx+50} ${cy-55}`} {...stroke} />
        <path d={`M${cx-35} ${cy-30} L${cx-35} ${cy+40} L${cx+35} ${cy+40} L${cx+35} ${cy-30} Z`} {...stroke} />
        <path d={`M${cx-15} ${cy-10} L${cx+15} ${cy-10} M${cx-15} ${cy+15} L${cx+15} ${cy+15}`} {...stroke} />
        <path d={`M${cx} ${cy-30} L${cx} ${cy+40}`} {...stroke} opacity="0.6" />
      </g>
    ),
    tower: (
      <g>
        <path d={`M${cx-30} ${cy+50} L${cx-30} ${cy-30} L${cx-15} ${cy-45} L${cx+15} ${cy-45} L${cx+30} ${cy-30} L${cx+30} ${cy+50} Z`} {...stroke} />
        <path d={`M${cx-30} ${cy} L${cx+30} ${cy}`} {...stroke} />
        <path d={`M${cx-50} ${cy-50} L${cx-30} ${cy-30}`} {...stroke} strokeWidth="2" />
        <path d={`M${cx+50} ${cy-50} L${cx+30} ${cy-30}`} {...stroke} strokeWidth="2" />
        <circle cx={cx-50} cy={cy-50} r="3" {...fillG} />
        <circle cx={cx+50} cy={cy-50} r="3" {...fillG} />
      </g>
    ),
    star: (
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map(i => {
          const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={cx + Math.cos(a) * 45} cy={cy + Math.sin(a) * 45} r={i === 0 ? 6 : 3} {...fillG} />;
        })}
        <circle cx={cx} cy={cy} r="12" {...stroke} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const a = (i / 8) * Math.PI * 2;
          return <path key={i} d={`M${cx + Math.cos(a) * 14} ${cy + Math.sin(a) * 14} L${cx + Math.cos(a) * 22} ${cy + Math.sin(a) * 22}`} {...stroke} />;
        })}
      </g>
    ),
    moon: (
      <g>
        <circle cx={cx} cy={cy} r="45" {...stroke} />
        <path d={`M${cx-15} ${cy-40} A45 45 0 0 0 ${cx-15} ${cy+40} A35 45 0 0 1 ${cx-15} ${cy-40}`} {...fillG} opacity="0.85" />
        <circle cx={cx+10} cy={cy-15} r="2" {...fillG} />
        <circle cx={cx+18} cy={cy+5} r="1.5" {...fillG} />
        <circle cx={cx+5} cy={cy+20} r="2" {...fillG} />
      </g>
    ),
    sun: (
      <g>
        <circle cx={cx} cy={cy} r="28" {...fillG} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <path key={i} d={`M${cx + Math.cos(a) * 36} ${cy + Math.sin(a) * 36} L${cx + Math.cos(a) * 52} ${cy + Math.sin(a) * 52}`} {...stroke} strokeWidth="1.5" />;
        })}
      </g>
    ),
    judgement: (
      <g>
        <path d={`M${cx-45} ${cy+45} L${cx} ${cy-50} L${cx+45} ${cy+45} Z`} {...stroke} />
        <circle cx={cx} cy={cy-10} r="12" {...fillG} />
        <path d={`M${cx-25} ${cy+20} L${cx+25} ${cy+20}`} {...stroke} />
        <path d={`M${cx-30} ${cy+30} L${cx+30} ${cy+30}`} {...stroke} opacity="0.5" />
      </g>
    ),
    world: (
      <g>
        <ellipse cx={cx} cy={cy} rx="50" ry="55" {...stroke} />
        <ellipse cx={cx} cy={cy} rx="35" ry="55" {...stroke} opacity="0.5" />
        <path d={`M${cx-50} ${cy} L${cx+50} ${cy}`} {...stroke} opacity="0.5" />
        <circle cx={cx} cy={cy} r="6" {...fillG} />
        <circle cx={cx-58} cy={cy-58} r="3" {...fillG} />
        <circle cx={cx+58} cy={cy-58} r="3" {...fillG} />
        <circle cx={cx-58} cy={cy+58} r="3" {...fillG} />
        <circle cx={cx+58} cy={cy+58} r="3" {...fillG} />
      </g>
    ),
  };

  return glyphs[name] || null;
};

window.Glyph = Glyph;
