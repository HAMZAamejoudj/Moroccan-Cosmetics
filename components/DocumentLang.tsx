"use client";

import { useEffect } from "react";

export default function DocumentLang({ locale }: { locale: string }) {
  const direction = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  return null;
}
