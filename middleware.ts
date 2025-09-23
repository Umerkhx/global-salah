import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.includes("/forum/")) {
    const segments = pathname.split("/")
    const forumTitle = segments[segments.length - 1]

    const url = new URL("/api/get-question-by-title", request.url)
    url.searchParams.set("title", forumTitle)

    // Rewrite to the API route
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all forum routes in all languages
    "/:lang/forum/:title*",
    "/forum/:title*",
  ],
}