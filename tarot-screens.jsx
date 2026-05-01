// アプリのメインロジックと画面遷移
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM, useCallback: uC } = React;

// ─────────── ユーティリティ ───────────
const THEMES = [
  { id: "love", label: "恋愛運", en: "Love", icon: "♥" },
  { id: "work", label: "仕事運", en: "Career", icon: "✦" },
  { id: "general", label: "総合運", en: "General", icon: "☾" },
];

const POSITIONS = [
  { id: "past", label: "過去", en: "Past", desc: "今に影響している背景" },
  { id: "present", label: "現在", en: "Present", desc: "あなたを取り巻く今" },
  { id: "future", label: "未来", en: "Future", desc: "進む先に待つもの" },
];

function shuffle(arr, seed) {
  const a = [...arr];
  let s = seed || Date.now();
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HISTORY_KEY = "tarot.history.v1";
const STATE_KEY = "tarot.state.v1";

// ─────────── 星空背景 ───────────
const Starfield = ({ density = 1 }) => {
  const stars = uM(() => {
    const n = Math.floor(80 * density);
    return Array.from({ length: n }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.6 + 0.3,
      d: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }));
  }, [density]);
  return (
    <svg className="starfield" preserveAspectRatio="none" viewBox="0 0 100 100">
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.3} fill="#f4d160" opacity={s.o}>
          <animate attributeName="opacity" values={`${s.o};${s.o * 0.2};${s.o}`} dur={`${s.d}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
};

// ─────────── サウンド ───────────
function useSound(enabled) {
  const ctxRef = uR(null);
  const getCtx = () => {
    if (!ctxRef.current && typeof AudioContext !== "undefined") ctxRef.current = new AudioContext();
    return ctxRef.current;
  };
  const tone = uC((freq, dur = 0.15, type = "sine", vol = 0.06) => {
    if (!enabled) return;
    const ctx = getCtx(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = 0; g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur);
  }, [enabled]);
  return {
    shuffle: () => { tone(220, 0.06, "triangle", 0.04); setTimeout(() => tone(330, 0.06, "triangle", 0.03), 60); },
    select: () => tone(523, 0.12, "sine", 0.05),
    flip: () => { tone(440, 0.08, "sine", 0.05); setTimeout(() => tone(660, 0.18, "sine", 0.06), 80); },
    chime: () => { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.4, "sine", 0.04), i * 120)); },
  };
}

// ─────────── 画面：ランディング ───────────
const LandingScreen = ({ onStart }) => (
  <div className="screen landing">
    <div className="landing-inner">
      <div className="brand-mark">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="#d4af37" strokeWidth="0.4" opacity="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={`M${50 + Math.cos(a) * 34} ${50 + Math.sin(a) * 34} L${50 + Math.cos(a) * 42} ${50 + Math.sin(a) * 42}`} stroke="#d4af37" strokeWidth="0.5" />;
          })}
          <circle cx="50" cy="50" r="6" fill="#d4af37" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#d4af37" strokeWidth="0.4" />
        </svg>
      </div>
      <h1 className="landing-title">月夜のタロット</h1>
      <p className="landing-en">MOONLIT TAROT</p>
      <p className="landing-tag">星々があなたに語りかける夜<br />三枚のカードに、過去・現在・未来を尋ねて</p>
      <button className="btn-primary" onClick={onStart}>占いを始める</button>
      <div className="landing-foot">
        <span>大アルカナ22枚</span><span className="dot">•</span><span>3枚引き</span><span className="dot">•</span><span>逆位置あり</span>
      </div>
    </div>
  </div>
);

// ─────────── 画面：テーマ選択 ───────────
const ThemeScreen = ({ onPick, onBack }) => (
  <div className="screen theme">
    <button className="back-btn" onClick={onBack}>← 戻る</button>
    <div className="screen-head">
      <p className="kicker">STEP 01</p>
      <h2 className="screen-title">何を占いますか</h2>
      <p className="screen-sub">心に浮かぶテーマを、ひとつ選んでください</p>
    </div>
    <div className="theme-grid">
      {THEMES.map(t => (
        <button key={t.id} className={`theme-card theme-${t.id}`} onClick={() => onPick(t.id)}>
          <div className="theme-icon">{t.icon}</div>
          <div className="theme-name">{t.label}</div>
          <div className="theme-en">{t.en}</div>
        </button>
      ))}
    </div>
  </div>
);

// ─────────── 画面：シャッフル＋選択 ───────────
const SelectScreen = ({ theme, onComplete, onBack, sound }) => {
  const [phase, setPhase] = uS("shuffling"); // shuffling -> spread -> selecting -> done
  const [deck, setDeck] = uS([]);
  const [picked, setPicked] = uS([]); // [{cardIdx, reversed}]

  uE(() => {
    sound.shuffle();
    const t1 = setTimeout(() => sound.shuffle(), 600);
    const t2 = setTimeout(() => sound.shuffle(), 1200);
    const t3 = setTimeout(() => {
      const shuffled = shuffle(MAJOR_ARCANA.map((c, i) => ({ idx: i, reversed: Math.random() < 0.35 })));
      setDeck(shuffled);
      setPhase("spread");
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const onPickCard = (deckPos) => {
    if (picked.find(p => p.deckPos === deckPos)) return;
    if (picked.length >= 3) return;
    sound.select();
    const card = deck[deckPos];
    const next = [...picked, { deckPos, cardIdx: card.idx, reversed: card.reversed }];
    setPicked(next);
    if (next.length === 3) {
      setTimeout(() => onComplete(next), 800);
    }
  };

  const themeMeta = THEMES.find(t => t.id === theme);

  return (
    <div className="screen select">
      <button className="back-btn" onClick={onBack}>← 戻る</button>
      <div className="screen-head">
        <p className="kicker">STEP 02 · {themeMeta.label}</p>
        <h2 className="screen-title">
          {phase === "shuffling" && "カードを切っています…"}
          {phase !== "shuffling" && `カードを ${3 - picked.length} 枚 選んでください`}
        </h2>
        <p className="screen-sub">
          {phase === "shuffling" ? "心を静かに、知りたいことを思い浮かべて" : `${POSITIONS[picked.length]?.label ?? ""}${picked.length < 3 ? " のカード" : ""}`}
        </p>
      </div>

      {phase === "shuffling" && (
        <div className="shuffle-stage">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="shuffle-card" style={{ "--i": i }}>
              <TarotCard size="md" />
            </div>
          ))}
        </div>
      )}

      {phase !== "shuffling" && (
        <>
          <div className="picked-row">
            {[0, 1, 2].map(i => {
              const p = picked[i];
              const pos = POSITIONS[i];
              return (
                <div key={i} className={`picked-slot ${p ? "is-filled" : ""} ${picked.length === i ? "is-active" : ""}`}>
                  <div className="picked-pos">{pos.label}</div>
                  <div className="picked-pos-en">{pos.en}</div>
                  {p ? <TarotCard size="sm" reversed={p.reversed} flipped={false} /> : <div className="picked-empty" />}
                </div>
              );
            })}
          </div>

          <div className="spread-fan">
            {deck.map((c, i) => {
              const isPicked = picked.some(p => p.deckPos === i);
              return (
                <div key={i} className="spread-slot" style={{ "--i": i, "--total": deck.length }}>
                  <TarotCard
                    size="md"
                    flipped={false}
                    selected={isPicked}
                    dim={isPicked}
                    onClick={() => onPickCard(i)}
                    hint={!isPicked && picked.length < 3 && i === Math.floor(deck.length / 2)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ─────────── 画面：結果 ───────────
const ResultScreen = ({ theme, picks, onRestart, onSave, sound }) => {
  const [revealed, setRevealed] = uS([false, false, false]);
  const [interpretations, setInterpretations] = uS([null, null, null]);
  const [overall, setOverall] = uS(null);
  const [loadingAi, setLoadingAi] = uS(false);
  const [aiTried, setAiTried] = uS(false);

  // 順番にめくる
  uE(() => {
    const timers = [];
    [0, 1, 2].forEach(i => {
      timers.push(setTimeout(() => {
        sound.flip();
        setRevealed(r => { const n = [...r]; n[i] = true; return n; });
        if (i === 2) setTimeout(() => sound.chime(), 600);
      }, 700 + i * 1400));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // 静的解釈をデフォルトでセット
  uE(() => {
    const stat = picks.map(p => {
      const c = MAJOR_ARCANA[p.cardIdx];
      const text = (p.reversed ? c.reversed : c.upright)[theme];
      return { text, source: "static" };
    });
    setInterpretations(stat);
  }, []);

  // 全カード公開後にAI解釈を試行
  uE(() => {
    if (!revealed.every(Boolean) || aiTried) return;
    setAiTried(true);
    if (!window.claude || !window.claude.complete) return;
    setLoadingAi(true);
    const themeLabel = THEMES.find(t => t.id === theme).label;
    const cardsBrief = picks.map((p, i) => {
      const c = MAJOR_ARCANA[p.cardIdx];
      return `${POSITIONS[i].label}: ${c.name}（${p.reversed ? "逆位置" : "正位置"}）— キーワード: ${c.keywords.join("、")}`;
    }).join("\n");
    const prompt = `あなたは神秘的で詩的なタロット占い師です。「${themeLabel}」について3枚引き（過去・現在・未来）を行いました。

引かれたカード:
${cardsBrief}

以下のJSON形式のみで返答してください。前後に文章は一切付けないでください。
{
  "past": "過去のカードの解釈（70〜90字、詩的で温かみのある日本語、語尾は「〜です」「〜ます」「〜でしょう」など丁寧に）",
  "present": "現在のカードの解釈（70〜90字）",
  "future": "未来のカードの解釈（70〜90字）",
  "overall": "3枚を統合した総合メッセージ（120〜160字、希望を含めて）"
}`;
    window.claude.complete(prompt).then(raw => {
      try {
        const m = raw.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("no json");
        const data = JSON.parse(m[0]);
        const keys = ["past", "present", "future"];
        setInterpretations(keys.map(k => ({ text: data[k], source: "ai" })));
        setOverall(data.overall);
      } catch (e) {
        // フォールバック維持
      } finally {
        setLoadingAi(false);
      }
    }).catch(() => setLoadingAi(false));
  }, [revealed]);

  const themeMeta = THEMES.find(t => t.id === theme);

  const shareText = uM(() => {
    const lines = [`🔮 月夜のタロット — ${themeMeta.label}占い`, ""];
    picks.forEach((p, i) => {
      const c = MAJOR_ARCANA[p.cardIdx];
      lines.push(`【${POSITIONS[i].label}】${c.name}${p.reversed ? "（逆位置）" : ""}`);
    });
    return lines.join("\n");
  }, [picks, themeMeta]);

  const onShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "月夜のタロット", text: shareText });
      else { await navigator.clipboard.writeText(shareText); alert("結果をコピーしました"); }
    } catch (e) {}
  };

  return (
    <div className="screen result">
      <div className="screen-head">
        <p className="kicker">{themeMeta.label} の結果</p>
        <h2 className="screen-title">星々からのメッセージ</h2>
      </div>

      <div className="result-cards">
        {picks.map((p, i) => {
          const c = MAJOR_ARCANA[p.cardIdx];
          const interp = interpretations[i];
          return (
            <div key={i} className={`result-card-block ${revealed[i] ? "is-revealed" : ""}`}>
              <div className="rcb-pos">
                <div className="rcb-pos-label">{POSITIONS[i].label}</div>
                <div className="rcb-pos-en">{POSITIONS[i].en}</div>
                <div className="rcb-pos-desc">{POSITIONS[i].desc}</div>
              </div>
              <div className="rcb-card">
                <TarotCard size="md" card={c} reversed={p.reversed} flipped={revealed[i]} />
              </div>
              <div className="rcb-meaning">
                <div className="rcb-name">
                  <span>{c.name}</span>
                  {p.reversed && <span className="reversed-tag">逆位置</span>}
                </div>
                <div className="rcb-en">{c.en}</div>
                <div className="rcb-keys">
                  {c.keywords.map(k => <span key={k} className="kw">{k}</span>)}
                </div>
                {revealed[i] && (
                  <p className="rcb-text">{interp?.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {revealed.every(Boolean) && (
        <div className="overall-block">
          <div className="overall-divider"><span>総合メッセージ</span></div>
          {loadingAi && <p className="overall-loading">星々が言葉を紡いでいます…</p>}
          {!loadingAi && overall && <p className="overall-text">{overall}</p>}
          {!loadingAi && !overall && (
            <p className="overall-text">
              {(() => {
                const r = picks.filter(p => p.reversed).length;
                if (r === 0) return "三枚すべてが順当に開かれました。流れはあなたに優しく、心の声に従えば道は明るく開けるでしょう。";
                if (r >= 2) return "逆位置が重なり、立ち止まるべき合図が見えます。焦らず内側を見つめ直す時、新しい光が差し込みます。";
                return "光と影が織りなす配置です。一つの陰影もまた、あなたを次の段階へ導く必然の一筆となるでしょう。";
              })()}
            </p>
          )}
          <div className="result-actions">
            <button className="btn-ghost" onClick={onShare}>結果をシェア</button>
            <button className="btn-ghost" onClick={() => onSave({ theme, picks, overall, ts: Date.now() })}>履歴に保存</button>
            <button className="btn-primary" onClick={onRestart}>もう一度占う</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────── 画面：履歴 ───────────
const HistoryScreen = ({ history, onClose, onClear }) => (
  <div className="screen history">
    <button className="back-btn" onClick={onClose}>← 戻る</button>
    <div className="screen-head">
      <p className="kicker">ARCHIVE</p>
      <h2 className="screen-title">占い履歴</h2>
      <p className="screen-sub">過去の星々の囁き</p>
    </div>
    {history.length === 0 ? (
      <p className="empty-state">まだ履歴はありません。<br />カードがあなたの物語を待っています。</p>
    ) : (
      <div className="history-list">
        {history.slice().reverse().map((h, idx) => {
          const tm = THEMES.find(t => t.id === h.theme);
          const d = new Date(h.ts);
          return (
            <div key={idx} className="history-item">
              <div className="hi-head">
                <span className="hi-theme">{tm.label}</span>
                <span className="hi-date">{d.getFullYear()}.{String(d.getMonth() + 1).padStart(2, "0")}.{String(d.getDate()).padStart(2, "0")} {String(d.getHours()).padStart(2, "0")}:{String(d.getMinutes()).padStart(2, "0")}</span>
              </div>
              <div className="hi-cards">
                {h.picks.map((p, i) => {
                  const c = MAJOR_ARCANA[p.cardIdx];
                  return (
                    <div key={i} className="hi-card">
                      <TarotCard size="sm" card={c} reversed={p.reversed} flipped={true} />
                      <div className="hi-card-label">
                        <div className="hi-pos">{POSITIONS[i].label}</div>
                        <div className="hi-name">{c.name}{p.reversed && <span className="reversed-tag-sm">逆</span>}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {h.overall && <p className="hi-msg">{h.overall}</p>}
            </div>
          );
        })}
      </div>
    )}
    {history.length > 0 && (
      <div className="history-foot">
        <button className="btn-ghost" onClick={onClear}>履歴をすべて削除</button>
      </div>
    )}
  </div>
);

window.LandingScreen = LandingScreen;
window.ThemeScreen = ThemeScreen;
window.SelectScreen = SelectScreen;
window.ResultScreen = ResultScreen;
window.HistoryScreen = HistoryScreen;
window.Starfield = Starfield;
window.useSound = useSound;
window.HISTORY_KEY = HISTORY_KEY;
