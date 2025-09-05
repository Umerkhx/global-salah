"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Translations = Record<string, any>;

const defaultLang = "en";

const cache: Record<string, Translations> = {};


export function useTranslation(p0?: string) {


  const pathname = usePathname();
  const lang = pathname.split("/")[1] || defaultLang

    const [translations, setTranslations] = useState<Translations>(
    cache[lang] || {}
  );

useEffect(() => {
    const loadTranslations = async () => {
      if (cache[lang]) {
        setTranslations(cache[lang]);
        return;
      }

      try {
        const stored = localStorage.getItem(`translations:${lang}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          cache[lang] = parsed;
          setTranslations(parsed);
          return;
        }

        const res = await fetch(`/locales/${lang}.json`);
        const data = await res.json();

        cache[lang] = data;
        localStorage.setItem(`translations:${lang}`, JSON.stringify(data));
        setTranslations(data);
      } catch (error: any) {
        console.error("Error loading translations", error.message);
      }
    };

    loadTranslations();
  }, [lang]);

  return { t: (key: string) => key?.split(".").reduce((o: any, i) => o?.[i], translations) || key, lang };
}