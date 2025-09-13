import { type NextRequest, NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const segments = pathname.split("/").filter(Boolean);

  // 🔒 1. Force HTTPS
  if (url.protocol !== "https:") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

if (url.hostname.startsWith("www.")) {
  url.hostname = url.hostname.replace("www.", "");
  return NextResponse.redirect(url, 301);
}

  // 📝 3. Forum rewrite
  if (pathname.includes("/forum/")) {
    const forumTitle = segments[segments.length - 1];
    const apiUrl = new URL("/api/get-question-by-title", request.url);
    apiUrl.searchParams.set("title", forumTitle);
    return NextResponse.rewrite(apiUrl);
  }

  // 🌍 4. Language normalization
  let lang = segments[0] || "";

  if (lang.toLowerCase().startsWith("zh")) {
    lang = "zh-CN";
  } else if (lang.length > 2) {
    lang = lang.slice(0, 2).toLowerCase();
  }

  if (!lang) {
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }

  if (supportedLangs.includes(lang)) {
    url.pathname = `/${lang}`;
    return NextResponse.redirect(url, 302);
  } else {
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
