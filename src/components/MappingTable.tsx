import type { CategoryId, MappingEntry } from "@/lib/anonymize";

const CATEGORY_LABELS: Record<CategoryId, string> = {
  company: "会社名",
  person: "個人名",
  university: "大学",
  highschool: "高校",
  vocationalSchool: "専門学校",
  juniorHighSchool: "中学校",
  elementarySchool: "小学校",
  address: "住所",
  birthdate: "生年月日",
  phoneNumber: "電話番号",
  email: "メールアドレス",
  gender: "性別",
  age: "年齢",
};

interface MappingTableProps {
  entries: MappingEntry[];
  onExclude: (entry: MappingEntry) => void;
}

export function MappingTable({ entries, onExclude }: MappingTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">置換対応表</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">検出された項目はありません</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-zinc-300 dark:border-zinc-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">カテゴリ</th>
                <th className="px-3 py-2 font-medium">元の文字列</th>
                <th className="px-3 py-2 font-medium">置換後</th>
                <th className="px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={`${entry.category}:${entry.original}`}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
                    {CATEGORY_LABELS[entry.category]}
                  </td>
                  <td className="px-3 py-2 font-mono">{entry.original}</td>
                  <td className="px-3 py-2 font-mono">{entry.label}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => onExclude(entry)}
                      className="text-xs text-zinc-500 underline hover:text-red-600 dark:text-zinc-400"
                    >
                      除外
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
