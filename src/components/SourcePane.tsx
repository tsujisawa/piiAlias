interface SourcePaneProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SourcePane({ value, onChange, disabled = false }: SourcePaneProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">原文</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={
          disabled
            ? "上の「利用ガイド・利用規約に同意します」にチェックを入れると入力できます"
            : "ここにテキストを貼り付けてください"
        }
        className="min-h-[300px] flex-1 resize-y rounded-md border border-zinc-300 p-3 font-mono text-sm disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
      />
    </div>
  );
}
