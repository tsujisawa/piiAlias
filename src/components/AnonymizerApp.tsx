"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { anonymizeText, excludeKey } from "@/lib/anonymize";
import type { MappingEntry } from "@/lib/anonymize";
import { AgreementNotice, useAgreement } from "./AgreementNotice";
import { MappingTable } from "./MappingTable";
import { ResultPane } from "./ResultPane";
import { SourcePane } from "./SourcePane";

export function AnonymizerApp() {
  const [source, setSource] = useState("");
  const [excludedKeys, setExcludedKeys] = useState<Set<string>>(new Set());
  const { agreed, setAgreed } = useAgreement();
  const deferredSource = useDeferredValue(source);

  const { output, mapping } = useMemo(
    () => anonymizeText(deferredSource, excludedKeys),
    [deferredSource, excludedKeys],
  );

  const handleExclude = (entry: MappingEntry) => {
    const key = excludeKey({ category: entry.category, text: entry.original });
    setExcludedKeys((prev) => new Set(prev).add(key));
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">個人情報伏せ字ツール</h1>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          入力したテキストは一切サーバーに送信されません（すべてブラウザ内で処理されます）
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          自動検出には限界があります。AIに送信する前に必ず内容をご確認ください。
        </p>
        <Link
          href="/guide"
          className="mt-1 text-xs text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          使い方・利用規約はこちら
        </Link>
      </header>

      <AgreementNotice agreed={agreed} onChange={setAgreed} />

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <SourcePane value={source} onChange={setSource} disabled={!agreed} />
        <ResultPane text={output} />
      </div>

      <MappingTable entries={mapping} onExclude={handleExclude} />
    </div>
  );
}
