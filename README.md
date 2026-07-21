# 個人情報伏せ字ツール (piiAlias)

会社名・氏名・住所・生年月日などの個人情報（PII）を含むテキストを、AIサービスに入力する前に一貫した仮名（「会社名A」「人物A」など）へ自動的に置き換えるブラウザツールです。

🔗 <https://pii-alias.updates.jp/>

## 特徴

- 変換処理はすべてブラウザ内（JavaScript）で完結し、入力したテキストを外部サーバーへ送信しません
- 同じ文字列は文中で常に同じ仮名に置き換えられます
- 会社名（各種法人格に対応）、個人名、大学・高校・専門学校・中学校・小学校、住所、生年月日、電話番号、メールアドレス、性別、年齢を自動検出
- 誤検出があれば置換対応表から個別に除外可能

detection のパターンや利用規約・免責事項の詳細はアプリ内の「利用ガイド・利用規約」ページ（`/guide`）を参照してください。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

## テスト

```bash
npm test
```

## ビルド

```bash
npm run build
```

`next.config.ts` で `output: "export"` を指定しているため、`out/` に静的ファイルが出力されます。

## 技術スタック

- [Next.js](https://nextjs.org)（App Router, 静的エクスポート）
- TypeScript
- Tailwind CSS
- [Vitest](https://vitest.dev)（単体テスト）

## デプロイ

Vercel でホスティングしています。