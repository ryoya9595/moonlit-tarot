// 大アルカナ22枚のデータ
const MAJOR_ARCANA = [
  {
    n: 0, name: "愚者", en: "The Fool", glyph: "fool",
    keywords: ["始まり", "自由", "純粋", "可能性"],
    upright: { love: "新しい出会いの予感。先入観を捨てて飛び込んで。", work: "未経験の分野への挑戦が吉。直感を信じる時。", general: "心のままに進めば道は開ける。" },
    reversed: { love: "軽率な行動に注意。一歩立ち止まって。", work: "計画不足。準備を整えてから動こう。", general: "無謀さが裏目に出るかも。慎重に。" }
  },
  {
    n: 1, name: "魔術師", en: "The Magician", glyph: "magician",
    keywords: ["創造", "意志", "技術", "始動"],
    upright: { love: "あなたの魅力が最大限に発揮される時。", work: "持てる力を結集すれば成果が出る。", general: "意志の力で現実を動かせる。" },
    reversed: { love: "口先だけの相手に注意。本心を見極めて。", work: "才能の空回り。基礎に立ち返って。", general: "迷いが行動を鈍らせている。" }
  },
  {
    n: 2, name: "女教皇", en: "The High Priestess", glyph: "priestess",
    keywords: ["直感", "神秘", "知恵", "内省"],
    upright: { love: "静かに育まれる絆。言葉より感性で繋がる関係。", work: "情報収集と熟考の時期。深く学ぶべし。", general: "内なる声に耳を澄ませて。" },
    reversed: { love: "秘密や誤解が距離を生んでいる。", work: "情報不足のまま判断しない方が良い。", general: "感情に振り回されている。" }
  },
  {
    n: 3, name: "女帝", en: "The Empress", glyph: "empress",
    keywords: ["豊穣", "愛情", "創造", "母性"],
    upright: { love: "愛が実り、心が満たされる時期。", work: "豊かな成果と人間関係に恵まれる。", general: "自然体でいることが幸運を呼ぶ。" },
    reversed: { love: "依存や束縛が重荷に。距離感を見直して。", work: "停滞期。リフレッシュが必要。", general: "自分を後回しにしすぎていないか。" }
  },
  {
    n: 4, name: "皇帝", en: "The Emperor", glyph: "emperor",
    keywords: ["権威", "統率", "安定", "意志"],
    upright: { love: "頼りがいのある関係性。安定した愛。", work: "リーダーシップで成功を掴む。", general: "確固たる意志が道を切り拓く。" },
    reversed: { love: "高圧的な態度が亀裂を生んでいる。", work: "頑固さが柔軟さを奪っている。", general: "支配欲を手放してみて。" }
  },
  {
    n: 5, name: "教皇", en: "The Hierophant", glyph: "hierophant",
    keywords: ["伝統", "助言", "信頼", "学び"],
    upright: { love: "誠実で安定した関係。結婚や約束の予兆。", work: "信頼できる助言者の存在。慣習を尊重して。", general: "尊敬できる人の言葉に耳を傾けて。" },
    reversed: { love: "形式的な関係に違和感。本音を語って。", work: "古い慣習が足かせに。新しい風を。", general: "他人の価値観に縛られていないか。" }
  },
  {
    n: 6, name: "恋人", en: "The Lovers", glyph: "lovers",
    keywords: ["愛", "選択", "調和", "結合"],
    upright: { love: "運命的な出会いや深い結びつき。", work: "良きパートナーとの協力で前進。", general: "心が惹かれる方を選んで。" },
    reversed: { love: "三角関係や迷い。決断の時。", work: "意見の不一致が課題。対話を。", general: "選択を先延ばしにしている。" }
  },
  {
    n: 7, name: "戦車", en: "The Chariot", glyph: "chariot",
    keywords: ["勝利", "意志", "前進", "克服"],
    upright: { love: "情熱的に進めば道は開ける。", work: "困難を突破し勝利を掴む時。", general: "勢いのまま突き進んで吉。" },
    reversed: { love: "焦りが空回り。落ち着いて。", work: "暴走に注意。方向性を見直して。", general: "コントロールを失いかけている。" }
  },
  {
    n: 8, name: "力", en: "Strength", glyph: "strength",
    keywords: ["勇気", "忍耐", "内なる力", "情熱"],
    upright: { love: "穏やかな愛が強い絆を育てる。", work: "粘り強さが評価される時。", general: "優しさこそが真の強さ。" },
    reversed: { love: "感情の制御が難しい時期。", work: "自信喪失。小さな成功を積み重ねて。", general: "弱さを認めることから始めて。" }
  },
  {
    n: 9, name: "隠者", en: "The Hermit", glyph: "hermit",
    keywords: ["内省", "孤独", "探求", "導き"],
    upright: { love: "ひとりの時間が答えをくれる。", work: "専門性を深める時期。集中して。", general: "静寂の中に真理がある。" },
    reversed: { love: "孤立感が強まっている。心を開いて。", work: "閉じこもりすぎ。視野を広げて。", general: "孤独と向き合う勇気を。" }
  },
  {
    n: 10, name: "運命の輪", en: "Wheel of Fortune", glyph: "wheel",
    keywords: ["転機", "運命", "循環", "好転"],
    upright: { love: "運命的な変化。チャンス到来。", work: "潮目が変わる。波に乗って。", general: "時の流れがあなたに味方する。" },
    reversed: { love: "サイクルの停滞。タイミングを待って。", work: "予期せぬ遅延。柔軟に対応を。", general: "流れに逆らっていないか。" }
  },
  {
    n: 11, name: "正義", en: "Justice", glyph: "justice",
    keywords: ["公正", "均衡", "真実", "決断"],
    upright: { love: "対等で誠実な関係が築ける。", work: "公正な評価を得られる時。", general: "因果は正しく巡る。" },
    reversed: { love: "不公平感が募っている。話し合いを。", work: "判断ミスに注意。事実確認を。", general: "偏見が真実を曇らせている。" }
  },
  {
    n: 12, name: "吊るされた男", en: "The Hanged Man", glyph: "hanged",
    keywords: ["停滞", "視点転換", "犠牲", "受容"],
    upright: { love: "今は待つ時期。視点を変えて。", work: "発想の転換が突破口に。", general: "停滞は意味のある時間。" },
    reversed: { love: "無駄な我慢を続けていないか。", work: "犠牲の見返りが見えない。手放して。", general: "執着を解き放つ時。" }
  },
  {
    n: 13, name: "死神", en: "Death", glyph: "death",
    keywords: ["終焉", "再生", "変容", "解放"],
    upright: { love: "関係性の大きな変化。新たな段階へ。", work: "古い役割が終わり、再出発の時。", general: "終わりは始まりと表裏一体。" },
    reversed: { love: "別れを引きずっている。前を向いて。", work: "変化を恐れて停滞している。", general: "手放せないものに縛られている。" }
  },
  {
    n: 14, name: "節制", en: "Temperance", glyph: "temperance",
    keywords: ["調和", "節度", "融合", "癒し"],
    upright: { love: "穏やかで調和のとれた関係。", work: "バランス感覚が成功を呼ぶ。", general: "中庸の美徳を大切に。" },
    reversed: { love: "極端な感情が関係を揺らす。", work: "過剰な負荷。配分を見直して。", general: "心身のバランスが崩れている。" }
  },
  {
    n: 15, name: "悪魔", en: "The Devil", glyph: "devil",
    keywords: ["束縛", "誘惑", "執着", "欲望"],
    upright: { love: "強烈な惹かれ合い。依存に注意。", work: "目先の利益に囚われていないか。", general: "鎖は自分で外せると気づいて。" },
    reversed: { love: "腐れ縁から解放される兆し。", work: "束縛から自由になる時。", general: "欲望と向き合い、抜け出せる。" }
  },
  {
    n: 16, name: "塔", en: "The Tower", glyph: "tower",
    keywords: ["崩壊", "衝撃", "変革", "啓示"],
    upright: { love: "突然の出来事が関係を揺るがす。", work: "予期せぬ変化。基盤を見直して。", general: "壊れることで真実が見える。" },
    reversed: { love: "崩壊を回避できる兆し。話し合いを。", work: "危機をなんとか乗り越えられる。", general: "変化への抵抗が苦しみを長引かせる。" }
  },
  {
    n: 17, name: "星", en: "The Star", glyph: "star",
    keywords: ["希望", "癒し", "理想", "ひらめき"],
    upright: { love: "理想的な出会いや関係の回復。", work: "ビジョンが明確になる時。", general: "希望の光が道を照らす。" },
    reversed: { love: "理想と現実のギャップに失望。", work: "目標を見失いかけている。", general: "現実を直視する勇気を。" }
  },
  {
    n: 18, name: "月", en: "The Moon", glyph: "moon",
    keywords: ["不安", "幻想", "潜在意識", "秘密"],
    upright: { love: "曖昧な関係。本心が見えない。", work: "不確実な状況。情報を集めて。", general: "見えないものを恐れすぎないで。" },
    reversed: { love: "誤解が解け、霧が晴れる。", work: "不安要素が明らかに。対処可能。", general: "幻想から目覚める時。" }
  },
  {
    n: 19, name: "太陽", en: "The Sun", glyph: "sun",
    keywords: ["成功", "喜び", "活力", "祝福"],
    upright: { love: "明るく幸せな関係。祝福される愛。", work: "大きな成功と評価が訪れる。", general: "輝かしい未来が待っている。" },
    reversed: { love: "幸せの中に小さな影。素直になって。", work: "成功が遅れている。焦らずに。", general: "喜びを素直に受け取って。" }
  },
  {
    n: 20, name: "審判", en: "Judgement", glyph: "judgement",
    keywords: ["復活", "覚醒", "再生", "決断"],
    upright: { love: "復縁や再会の予兆。新しい段階へ。", work: "過去の努力が実を結ぶ。再評価される。", general: "魂の呼び声に応えて。" },
    reversed: { love: "過去に囚われ前に進めない。", work: "決断の遅れがチャンスを逃す。", general: "後悔より行動を。" }
  },
  {
    n: 21, name: "世界", en: "The World", glyph: "world",
    keywords: ["完成", "達成", "統合", "成就"],
    upright: { love: "理想的な関係の完成。深い満足。", work: "プロジェクト完遂、目標達成。", general: "すべてが調和する至福の時。" },
    reversed: { love: "あと一歩で完成。最後の努力を。", work: "未完のまま放置している。仕上げを。", general: "完成を恐れていないか。" }
  }
];

window.MAJOR_ARCANA = MAJOR_ARCANA;
