import { redirect } from "next/navigation";

const supportedLangs = [
  "en",
  "fr",
  "ar",
  "ur",
  "pt",
  "de",
  "zh-CN",
  "tr",
  "ru",
  "es",
];

export default function NotFound() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  let lang = pathname.split("/")[1] || "";

  if (!lang) {
    redirect("/");
  }

  if (lang.toLowerCase().startsWith("zh")) {
    lang = "zh-CN";
  } else if (lang.length > 2) {
    lang = lang.slice(0, 2).toLowerCase();
  }

  if (supportedLangs.includes(lang)) {
    redirect(`/${lang}`);
  } else {
    redirect("/");
  }
}
