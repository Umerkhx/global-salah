import { headers } from "next/headers"
import { NextResponse } from "next/server"

const supportedLangs = ["en", "fr", "ar", "ur", "pt", "de", "zh-CN", "tr", "ru", "es"]

export async function GET() {
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

return NextResponse.redirect(new URL(`/${lang}`, "https://globalsalah.vercel.app"), 301)
}
