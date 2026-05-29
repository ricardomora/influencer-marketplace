"use client";

import { useEffect, useMemo, useState } from "react";
import { createTranslator, type Translator } from "./create-translator";
import { getDictionary } from "./get-dictionary";
import type { Dictionary } from "./types";
import type { Locale } from "./locale";

export function useDictionary(locale: Locale) {
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    let cancelled = false;
    getDictionary(locale).then((loaded) => {
      if (!cancelled) setDict(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = useMemo<Translator | null>(
    () => (dict ? createTranslator(dict) : null),
    [dict],
  );

  return { dict, t, isLoading: !dict };
}
