# 月夜のタロット — 運用メモ

> このフォルダの中身を後から開いた時用のメモ。リンクや更新手順をまとめてある。

## 🔗 公開URL・リポジトリ

- **公開サイト**: https://ryoya9595.github.io/moonlit-tarot/
- **GitHubリポジトリ**: https://github.com/ryoya9595/moonlit-tarot
- **公開状態**: Public（GitHub Pages無料枠を使うため）
- **デプロイ方式**: GitHub Pages（mainブランチのルート）

## 🚀 公開した日

2026-05-02（Claude Code経由で初回デプロイ）

## 📝 修正・更新したい時

このフォルダ（`/Users/ryoya/Desktop/AI Agents/占い/`）でファイル編集 → コミット&プッシュ。

```sh
cd "/Users/ryoya/Desktop/AI Agents/占い"
git add .
git commit -m "更新内容のメモ"
git push
```

→ プッシュから30秒〜1分で公開サイトに反映される。

## 💻 ローカルで動作確認

```sh
cd "/Users/ryoya/Desktop/AI Agents/占い"
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

※ `index.html` を直接ダブルクリックでも動くけど、`file://` だとブラウザによってはCDN読み込みで詰まるのでローカルサーバー経由がおすすめ。

## 📁 ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | エントリーポイント。ReactとBabelをCDNから読み込む |
| `tarot-data.js` | 大アルカナ22枚のデータ（カード名・キーワード・解釈文） |
| `tarot-glyphs.jsx` | 各カードのSVGシンボル（22種類） |
| `tarot-card.jsx` | カード単体コンポーネント（裏/表・3D反転） |
| `tarot-screens.jsx` | 画面遷移ロジック（ランディング/テーマ選択/シャッフル/結果/履歴） |
| `tarot-styles.css` | スタイル全般 |
| `tweaks-panel.jsx` | Claude Designの編集モード用UI（公開サイトでは非表示） |
| `README.md` | リポジトリのトップページ用 |
| `MEMO.md` | このメモ（運用情報） |

## ⚠️ 注意点

- **AI解釈について**: `window.claude.complete` はClaude Design内専用の機能。公開サイトでは静的な解釈テキスト（`tarot-data.js` の `upright` / `reversed`）にフォールバックする仕組みになってるので問題なし
- **Tweaksパネル**: postMessage経由でしか開かないので、公開サイトには表示されない（編集モードUI）
- **localStorage**: 占い履歴はユーザーのブラウザに保存される（最大30件）。サイト側にはデータ送信されない

## 🔧 こんな時はこうする

### ドメイン独自にしたい
GitHubのリポジトリ Settings → Pages → Custom domain で設定。
お名前.com等で取得したドメインのDNSに `ryoya9595.github.io` をCNAME指定。

### サイトを非公開にしたい
リポジトリ Settings → Pages → Source を「None」に変更。
または、リポジトリ自体をPrivateに変更（GitHub Pages無料枠では同時にPagesが無効化される）。

### カードの解釈文を編集したい
`tarot-data.js` の各カードの `upright`（正位置）と `reversed`（逆位置）を編集。
`love` / `work` / `general` の3テーマ分ある。

### 新しいテーマ（例: 金運）を追加したい
1. `tarot-screens.jsx` の `THEMES` 配列に追加
2. `tarot-data.js` の各カードの `upright` / `reversed` に新テーマのキーを追加（22枚 × 2 = 44か所）

## 🧙 元のアイデア・由来

Claude Designで生成 → ZIPでダウンロード → デスクトップに配置 → このフォルダに展開 → GitHub Pagesで公開、という流れ。
Claude Designの作品をWebサイト化する練習にもなった一件。
