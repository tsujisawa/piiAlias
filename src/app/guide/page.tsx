import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用ガイド・利用規約 | 個人情報伏せ字ツール",
  description: "個人情報伏せ字ツールの使い方と利用規約・免責事項です。",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-lg font-bold text-zinc-900 dark:text-zinc-50">{children}</h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">{children}</h3>
  );
}

export default function GuidePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-2 px-4 py-8">
      <Link
        href="/"
        className="text-sm text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← ツールに戻る
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        利用ガイド・利用規約
      </h1>

      <div className="prose-sm mt-2 flex flex-col gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
        <SectionHeading>このツールについて</SectionHeading>
        <p>
          個人情報伏せ字ツールは、会社名・氏名・住所・生年月日などの個人情報（PII）を含むテキストを、AIサービスなどに入力する前に、一貫した仮名（「会社名A」「人物A」など）へ自動的に置き換える無料のブラウザツールです。
        </p>
        <p>
          変換処理はすべてお使いのブラウザ内（JavaScript）で完結しており、入力したテキストが外部のサーバーへ送信されることはありません。
        </p>

        <SectionHeading>使い方</SectionHeading>
        <ol className="list-decimal space-y-2 pl-5">
          <li>トップページ左側の「原文」欄に、変換したいテキストを貼り付けます。</li>
          <li>入力すると同時に、右側の「変換後」欄に自動的に変換結果が表示されます（変換ボタンの操作は不要です）。</li>
          <li>
            画面下部の「置換対応表」で、どの文字列が何に置き換わったかを一覧で確認できます。
          </li>
          <li>
            誤って検出された項目がある場合は、対応表の各行にある「除外」ボタンを押すと、その項目を検出対象から外し、元の文字列に戻すことができます。
          </li>
          <li>
            「変換後」欄の「コピー」ボタンで変換後のテキストをコピーし、AIサービスなど貼り付け先に貼り付けてご利用ください。
          </li>
        </ol>

        <SubHeading>検出対象のカテゴリ</SubHeading>
        <p>
          以下のカテゴリを自動検出の対象としています。同じ文字列が文中に複数回登場した場合は、同じ仮名に置き換えられます。
        </p>
        <div className="overflow-x-auto rounded-md border border-zinc-300 dark:border-zinc-700">
          <table className="w-full border-collapse text-left text-xs leading-6 sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">種別</th>
                <th className="px-3 py-2 font-medium">変換できるパターン</th>
                <th className="px-3 py-2 font-medium">変換できないパターン</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">会社名</td>
                <td className="px-3 py-2">
                  株式会社・有限会社・合同会社・合資会社・合名会社、一般社団法人・一般財団法人・公益社団法人・公益財団法人・NPO法人・社会福祉法人・医療法人・学校法人・宗教法人・独立行政法人などの法人格付きの名称（現在の勤務先を含む、前後どちらの位置でも可）
                </td>
                <td className="px-3 py-2">法人格が付かない屋号・商号のみ（例：「鈴木製作所」）</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">個人名</td>
                <td className="px-3 py-2">
                  敬称付き（「様」「さん」「氏」「殿」）、「氏名：」「名前：」ラベルの直後、よくある苗字（上位約90種）＋続く1〜3文字
                </td>
                <td className="px-3 py-2">
                  敬称・ラベルがなく辞書にない苗字。逆に「鈴木製作所」のような会社名・屋号を人名と誤検出することもあります
                </td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">大学・高校・専門学校・中学校</td>
                <td className="px-3 py-2">漢字・カタカナ表記の学校名</td>
                <td className="px-3 py-2">ひらがなを含む学校名</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">小学校</td>
                <td className="px-3 py-2">漢字・ひらがな・カタカナ表記の学校名（「さくら小学校」なども対応）</td>
                <td className="px-3 py-2">—</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">住所</td>
                <td className="px-3 py-2">
                  都道府県名からの住所、または「渋谷区渋谷1-2-3」のように都道府県名を省略した市区町村名＋番地
                </td>
                <td className="px-3 py-2">番地のない単なる地名の言及（例：「渋谷区は再開発が進んでいる」）</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">生年月日</td>
                <td className="px-3 py-2">
                  西暦・和暦の日付。「生年月日」「生まれ」などの文脈語句がある場合、または文脈がなくてももっともらしい生年の日付
                </td>
                <td className="px-3 py-2">文脈がなく生年らしくない日付（提出日・入学年など）</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">電話番号</td>
                <td className="px-3 py-2">ハイフンあり・なしの携帯電話番号、固定電話番号</td>
                <td className="px-3 py-2">—</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">メールアドレス</td>
                <td className="px-3 py-2">標準的な形式のメールアドレス</td>
                <td className="px-3 py-2">—</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">性別</td>
                <td className="px-3 py-2">「性別：男性」のようにラベルが付いている場合</td>
                <td className="px-3 py-2">ラベルのない単語のみ（例：「男性向けの求人」）</td>
              </tr>
              <tr className="border-t border-zinc-200 align-top dark:border-zinc-800">
                <td className="px-3 py-2 whitespace-nowrap">年齢</td>
                <td className="px-3 py-2">「30歳」のような表記</td>
                <td className="px-3 py-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubHeading>自動検出の限界について（重要）</SubHeading>
        <p>
          検出は正規表現によるパターンマッチングで行っており、完全なものではありません。文脈によっては、検出すべき個人情報が検出されなかったり（検出漏れ）、逆に個人情報でない語句が誤って検出されたりすることがあります。
        </p>
        <p>
          そのため、変換後のテキストをAIサービスなどに送信する前には、必ずご自身の目で内容を確認し、個人情報が残っていないかをチェックしてください。
        </p>

        <SectionHeading>利用規約・免責事項</SectionHeading>

        <SubHeading>1. ご利用は自己責任でお願いします</SubHeading>
        <p>
          変換後のテキストをAIサービスやその他の第三者サービスに送信するかどうかの最終判断は、必ず利用者ご自身が内容を確認した上で、利用者ご自身の責任において行ってください。本ツールは判断の補助を行うものであり、判断そのものを代替するものではありません。
        </p>

        <SubHeading>2. 本サービスの内容・品質について保証しません</SubHeading>
        <p>
          本サービスは無償で提供しており、検出精度、正確性、完全性、特定の目的への適合性について、明示または黙示を問わずいかなる保証も行いません。前述のとおり検出漏れ・誤検出が発生し得ることを十分ご理解の上でご利用ください。
        </p>

        <SubHeading>3. 免責事項</SubHeading>
        <p>
          本サービスの利用（利用できなかった場合を含みます）に起因して利用者または第三者に生じたいかなる損害についても、運営者は一切の責任を負いません。個人情報の漏えいや意図しない情報の送信など、結果について運営者は責任を負いかねますので、本サービスの信頼性にご不安がある場合は、ご利用をお控えください。
        </p>

        <SubHeading>4. データの取り扱いについて</SubHeading>
        <p>
          本サービスはサーバーサイドでの処理を行わない設計になっており、入力されたテキストを運営者側のサーバーに送信・保存することはありません。
        </p>
        <p>
          ただし、以下のような本サービスの管理範囲外の要因によって、入力内容がお使いの環境に残ってしまう可能性があります。これらについては本サービスとは関係のない、利用者側の環境・ネットワーク管理者の設定によるものです。
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>共有PCやキオスク端末でのブラウザの閲覧履歴・入力履歴・キャッシュ</li>
          <li>OSやブラウザのクリップボード履歴</li>
          <li>社内ネットワークやプロキシ、セキュリティ製品等によるアクセスログ・通信記録</li>
          <li>ブラウザの拡張機能によるページ内容の取得</li>
        </ul>
        <p>
          共有PCや会社支給の端末、監視・記録が行われているネットワーク環境でご利用の際は、これらの点にご注意の上、ご自身の判断でご利用ください。
        </p>

        <SubHeading>5. 規約の変更について</SubHeading>
        <p>
          本ガイド・利用規約の内容は、予告なく変更されることがあります。最新の内容は都度このページでご確認ください。
        </p>

        <SectionHeading>運営者・お問い合わせ</SectionHeading>
        <p>
          運営: UPDATE株式会社
          <br />
          お問い合わせ: info [@] updates.jp（[@]の部分を@に置き換えてください）
          <br />
          ソースコード:{" "}
          <a
            href="https://github.com/tsujisawa/piiAlias"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            github.com/tsujisawa/piiAlias
          </a>
        </p>
      </div>
    </div>
  );
}
