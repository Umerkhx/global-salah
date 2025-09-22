import { type NextRequest, NextResponse } from "next/server"

const supportedLangs = ["en", "fr", "ar", "ur", "pt", "de", "zh-CN", "tr", "ru", "es"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔹 Forum rewrite logic (your existing code)
  if (pathname.includes("/forum/")) {
    const segments = pathname.split("/")
    const forumTitle = segments[segments.length - 1]

    const url = new URL("/api/get-question-by-title", request.url)
    url.searchParams.set("title", forumTitle)

    return NextResponse.rewrite(url)
  }

  // 🔹 Language redirect for homepage "/"
  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language") || ""
    let lang = acceptLang.split(",")[0].toLowerCase()

    if (lang.startsWith("zh")) {
      lang = "zh-CN"
    } else {
      lang = lang.slice(0, 2)
    }

    if (!supportedLangs.includes(lang)) {
      lang = "en"
    }

    return NextResponse.redirect(new URL(`/${lang}`, request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/", // homepage redirect
    "/:lang/forum/:title*",
    "/forum/:title*",
  ],
}
