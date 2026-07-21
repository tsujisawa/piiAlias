import { CopyButton } from "./CopyButton";

interface ResultPaneProps {
  text: string;
}

export function ResultPane({ text }: ResultPaneProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">変換後</h2>
        <CopyButton text={text} />
      </div>
      <textarea
        value={text}
        readOnly
        placeholder="変換後のテキストがここに表示されます"
        className="min-h-[300px] flex-1 resize-y rounded-md border border-zinc-300 bg-zinc-50 p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
    </div>
  );
}
