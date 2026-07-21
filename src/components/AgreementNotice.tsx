"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AGREEMENT_STORAGE_KEY = "piiAlias:agreedToGuide";

interface AgreementNoticeProps {
  agreed: boolean;
  onChange: (agreed: boolean) => void;
}

export function AgreementNotice({ agreed, onChange }: AgreementNoticeProps) {
  return (
    <label className="flex items-start gap-2 rounded-md border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0"
      />
      <span>
        <Link href="/guide" className="underline hover:text-zinc-900 dark:hover:text-zinc-100">
          利用ガイド・利用規約
        </Link>
        （自己責任でのご利用、免責事項、データの取り扱いについて）の内容を確認し、同意します。
      </span>
    </label>
  );
}

export function useAgreement() {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // 静的エクスポートのためサーバー側にwindowがなく、hydration不一致を避けて
    // マウント後にlocalStorageの値を読み込む(two-pass rendering)。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgreed(window.localStorage.getItem(AGREEMENT_STORAGE_KEY) === "true");
  }, []);

  const updateAgreed = (next: boolean) => {
    setAgreed(next);
    if (next) {
      window.localStorage.setItem(AGREEMENT_STORAGE_KEY, "true");
    } else {
      window.localStorage.removeItem(AGREEMENT_STORAGE_KEY);
    }
  };

  return { agreed, setAgreed: updateAgreed };
}
