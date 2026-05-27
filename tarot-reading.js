// パーソナル鑑定エンジン
// カード結果 + お客さん情報 → オーダーメイドの鑑定文を生成

const ELEMENT_COMPAT = {
  "火": { "火": "共鳴", "風": "促進", "水": "葛藤", "地": "挑戦" },
  "水": { "水": "共鳴", "地": "促進", "火": "葛藤", "風": "挑戦" },
  "風": { "風": "共鳴", "火": "促進", "地": "葛藤", "水": "挑戦" },
  "地": { "地": "共鳴", "水": "促進", "風": "葛藤", "火": "挑戦" },
};

function generatePersonalReading(picks, theme, customerInfo) {
  const themeMeta = { love: "恋愛運", work: "仕事運", general: "総合運" }[theme];
  const cards = picks.map((p, i) => ({
    card: MAJOR_ARCANA[p.cardIdx],
    reversed: p.reversed,
    position: ["past", "present", "future"][i],
    posLabel: ["過去", "現在", "未来"][i],
  }));

  const zodiac = customerInfo.birthday
    ? getZodiacSign(customerInfo.birthday.month, customerInfo.birthday.day)
    : null;

  const reversedCount = cards.filter(c => c.reversed).length;

  const sections = [];

  // ── 1. 開幕 ──
  sections.push({
    title: "あなただけの星のメッセージ",
    body: buildOpening(customerInfo, themeMeta, zodiac),
  });

  // ── 2. 各カード詳細解釈 ──
  cards.forEach((c, i) => {
    sections.push({
      title: `${c.posLabel}のカード — ${c.card.name}${c.reversed ? "（逆位置）" : ""}`,
      subtitle: c.card.en,
      keywords: c.card.keywords,
      body: buildCardReading(c, theme, zodiac, customerInfo),
      cardIdx: c.card.n,
      reversed: c.reversed,
      position: c.posLabel,
    });
  });

  // ── 3. 三枚の繋がり ──
  sections.push({
    title: "三枚のカードが織りなす物語",
    body: buildStoryArc(cards, theme, customerInfo),
  });

  // ── 4. 星座との響き合い ──
  if (zodiac) {
    sections.push({
      title: `${zodiac.name}のあなたへ`,
      body: buildZodiacMessage(zodiac, cards, theme),
    });
  }

  // ── 5. 総合メッセージ＆アドバイス ──
  sections.push({
    title: "星々からの最終メッセージ",
    body: buildFinalMessage(cards, theme, customerInfo, reversedCount),
  });

  // ── 6. ラッキーポイント ──
  sections.push({
    title: "今日のラッキーポイント",
    body: buildLuckyPoints(cards, zodiac),
    isLucky: true,
  });

  return {
    customerName: customerInfo.name,
    theme: themeMeta,
    date: new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }),
    zodiac,
    cards,
    sections,
  };
}

function buildOpening(info, themeMeta, zodiac) {
  const name = info.name || "あなた";
  const zodiacLine = zodiac ? `${zodiac.symbol} ${zodiac.name}の星のもとに生まれた${name}さん。${zodiac.trait}` : "";
  const questionLine = info.question
    ? `\n\n「${info.question}」——この問いかけを胸に、星々はあなたのために三枚のカードを選びました。`
    : `\n\n${themeMeta}について、星々は${name}さんのために特別なメッセージを用意してくれました。`;

  return `${name}さん、月夜のタロットへようこそ。\n\n${zodiacLine}${questionLine}\n\nそれでは、カードが語りかける物語を、一枚ずつ紐解いていきましょう。`;
}

function buildCardReading(c, theme, zodiac, info) {
  const card = c.card;
  const orientation = c.reversed ? "reversed" : "upright";
  const mainText = card[orientation][theme];
  const positionText = card.positionHint[c.position];
  const elementInfo = card.element ? `このカードは「${card.element}」のエネルギーを持ち、${getElementMeaning(card.element)}を象徴しています。` : "";

  let zodiacConnection = "";
  if (zodiac && card.element) {
    const compat = ELEMENT_COMPAT[zodiac.element]?.[card.element];
    if (compat === "共鳴") {
      zodiacConnection = `\n\n${zodiac.name}のあなたとこのカードは同じエレメントを共有しており、特に強い共鳴を示しています。このカードのメッセージは、あなたの本質に深く響くものです。`;
    } else if (compat === "促進") {
      zodiacConnection = `\n\n${zodiac.name}のエレメントとこのカードのエネルギーは互いを高め合う関係。このカードの導きを素直に受け入れることで、大きな前進が期待できます。`;
    }
  }

  let questionContext = "";
  if (info.question && c.position === "present") {
    questionContext = `\n\nあなたが尋ねた問いに対して、このカードは「今まさにその答えの中にいる」と告げています。`;
  } else if (info.question && c.position === "future") {
    questionContext = `\n\nあなたの問いかけに対する答えは、このカードの示す未来の中にヒントが隠されています。`;
  }

  return `${positionText}\n\n${mainText}\n\n${elementInfo}${zodiacConnection}${questionContext}`;
}

function getElementMeaning(element) {
  return {
    "火": "情熱・行動力・変革のエネルギー",
    "水": "感情・直感・癒しのエネルギー",
    "風": "知性・コミュニケーション・自由のエネルギー",
    "地": "安定・物質・着実さのエネルギー",
  }[element] || "";
}

function buildStoryArc(cards, theme, info) {
  const [past, present, future] = cards;
  const name = info.name || "あなた";
  const reversedCount = cards.filter(c => c.reversed).length;

  let arcType, arcText;

  if (reversedCount === 0) {
    arcType = "順風";
    arcText = `三枚すべてが正位置で現れました。これは非常に恵まれた配置です。\n\n${past.card.name}が語る過去の経験は、${present.card.name}が示す現在の状況へと自然に流れ込み、そして${future.card.name}が照らす未来へと美しく繋がっています。\n\n${name}さんの歩んできた道は正しく、これからもその流れに乗って進むことで、望む未来に到達できるでしょう。カードたちは声を揃えて「そのまま進んで」と告げています。`;
  } else if (reversedCount === 3) {
    arcType = "内省";
    arcText = `三枚すべてが逆位置——これは珍しく、かつ深い意味を持つ配置です。\n\n${past.card.name}、${present.card.name}、${future.card.name}。すべてが「今までのやり方を見直しなさい」と語りかけています。\n\nこれは決して悪い暗示ではありません。むしろ、${name}さんが人生の大きな転換点に立っていることを示しています。古いパターンを手放し、新しい自分へと生まれ変わるための、宇宙からの優しい招待状です。`;
  } else if (past.reversed && !future.reversed) {
    arcType = "上昇";
    arcText = `過去のカード（${past.card.name}）が逆位置、そして未来のカード（${future.card.name}）が正位置。これは「困難から光へ」という上昇の物語を描いています。\n\n${name}さんが過去に経験した試練や葛藤は、決して無駄ではありませんでした。その経験があるからこそ、${present.card.name}が示す現在の学びを経て、${future.card.name}が約束する明るい未来へと歩んでいけるのです。\n\n暗闇を知っているからこそ、光の価値が分かる。それが今のあなたの強さです。`;
  } else if (!past.reversed && future.reversed) {
    arcType = "注意";
    arcText = `過去のカード（${past.card.name}）が正位置、未来のカード（${future.card.name}）が逆位置。これは「順調な流れの中に注意点がある」という配置です。\n\n${name}さんの歩みは正しい方向に向かっていますが、${future.card.name}（逆位置）は「このまま同じやり方だけでは壁にぶつかるかもしれない」と教えてくれています。\n\n${present.card.name}が示す今こそ、軌道修正のチャンス。柔軟に対応することで、困難を回避し、より良い結末へと導けるでしょう。`;
  } else {
    arcType = "変化";
    arcText = `正位置と逆位置が混在する配置——光と影が交互に現れる、ダイナミックな物語です。\n\n${past.card.name}から${present.card.name}、そして${future.card.name}へ。このカードの流れは、${name}さんの人生が一つの大きな変容の中にあることを示しています。\n\n順境も逆境も、すべてはあなたを成長させるための糧。一つ一つの経験が、あなたという人間をより深く、より豊かにしてくれています。`;
  }

  return arcText;
}

function buildZodiacMessage(zodiac, cards, theme) {
  const elements = cards.map(c => c.card.element);
  const sameElementCount = elements.filter(e => e === zodiac.element).length;

  let resonance = "";
  if (sameElementCount >= 2) {
    resonance = `今回の鑑定では、${zodiac.element}のエレメントを持つカードが複数現れており、${zodiac.name}のあなたとの共鳴が非常に強く表れています。自分らしさを大切にすることが、最も良い結果に繋がるでしょう。`;
  } else if (sameElementCount === 1) {
    resonance = `${zodiac.element}のカードが一枚現れており、あなたの本質と呼応しています。その部分に特に注意を払うことで、より深い気づきが得られるでしょう。`;
  } else {
    resonance = `今回のカードはあなたとは異なるエレメントが中心です。これは「普段と違う視点を取り入れなさい」というメッセージ。いつもの自分とは違うアプローチが、新しい道を開いてくれるかもしれません。`;
  }

  return `${zodiac.trait}\n\n${resonance}\n\n${zodiac.name}の守護のもと、あなたの道には常に星の光が降り注いでいます。自分の星座の特性を味方につけて、カードのメッセージを日々の行動に活かしてください。`;
}

function buildFinalMessage(cards, theme, info, reversedCount) {
  const name = info.name || "あなた";
  const [past, present, future] = cards;
  const themeLabel = { love: "愛の道", work: "仕事の道", general: "人生の道" }[theme];

  let tone;
  if (reversedCount === 0) tone = "bright";
  else if (reversedCount >= 2) tone = "gentle";
  else tone = "balanced";

  const messages = {
    bright: `${name}さん、あなたの${themeLabel}は今、追い風に恵まれています。\n\n${past.card.name}が教えてくれた過去の力、${present.card.name}が照らす現在の輝き、そして${future.card.name}が約束する未来の光——すべてが美しいハーモニーを奏でています。\n\nこの恵まれた流れを最大限に活かすために、今日できる小さな一歩を踏み出してください。星々はあなたの背中を押しています。\n\n自分を信じて。あなたの未来は、想像以上に明るく輝いています。`,
    gentle: `${name}さん、今は少し立ち止まって、自分自身を見つめ直す大切な時期です。\n\nカードたちは「今のままでは少し苦しいよ」と、優しく教えてくれています。でも、それは批判ではなく、愛情からのメッセージです。\n\n${present.card.name}が示す今の状況を冷静に受け止め、${future.card.name}のヒントを活かして方向転換することで、${themeLabel}は必ず好転します。\n\n逆境は成長のチャンス。今この瞬間のあなたの気づきが、明日の大きな変化の種になります。大丈夫、あなたは乗り越えられます。`,
    balanced: `${name}さん、あなたの${themeLabel}は光と影の両方を含んだ、リアルで力強い物語を描いています。\n\n順調な面もあれば、見直すべき面もある——それこそが人生の自然な姿です。大切なのは、光の部分を活かしながら、影の部分に向き合う勇気を持つこと。\n\n${future.card.name}が示す未来に向かって、今できることから一つずつ。完璧である必要はありません。あなたのペースで、あなたらしく進んでいけば大丈夫です。\n\n星々はいつもあなたのそばで見守っています。`,
  };

  return messages[tone];
}

function buildLuckyPoints(cards, zodiac) {
  const colors = ["深い紫", "ゴールド", "ミッドナイトブルー", "シルバー", "ローズピンク", "エメラルドグリーン", "琥珀色", "白銀"];
  const items = ["お気に入りのペン", "天然石のアクセサリー", "手書きのメモ", "温かい飲み物", "花を一輪", "お気に入りの香り", "月の見える場所", "朝の散歩"];
  const actions = ["深呼吸を3回してから一日を始める", "夜空を見上げて願いを込める", "感謝の気持ちを声に出して伝える", "自分へのご褒美を用意する", "新しい道を通って帰ってみる", "ずっと気になっていたことに一歩踏み出す"];

  const seed = cards.reduce((s, c) => s + c.card.n + (c.reversed ? 100 : 0), 0);
  const pick = (arr) => arr[(seed + arr.length) % arr.length];
  const pick2 = (arr) => arr[(seed * 7 + 3) % arr.length];

  const zodiacColor = zodiac ? `${zodiac.name}と相性の良い` : "";

  return `🎨 ラッキーカラー：${pick(colors)}\n🔮 ラッキーアイテム：${pick2(items)}\n✨ 開運アクション：${pick(actions)}`;
}

window.generatePersonalReading = generatePersonalReading;
