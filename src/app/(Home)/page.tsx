// app/page.tsx
import { headers } from "next/headers"
import { permanentRedirect } from "next/navigation"

const supportedLangs = ["en", "fr", "ar", "ur", "pt", "de", "zh-CN", "tr", "ru", "es"]

export default async function Home() {
  const acceptLang = (await headers()).get("accept-language") || ""
  let lang = acceptLang.split(",")[0].toLowerCase()

  if (lang.startsWith("zh")) {
    lang = "zh-CN"
  } else {
    lang = lang.slice(0, 2)
  }

  if (!supportedLangs.includes(lang)) {
    lang = "en"
  }

  permanentRedirect(`/${lang}`)
}
