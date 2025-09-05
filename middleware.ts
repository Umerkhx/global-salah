import { type NextRequest, NextResponse } from "next/server"


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)



  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }


  if (pathname.includes("/forum/")) {
    const forumTitle = segments[segments.length - 1]
    const url = new URL("/api/get-question-by-title", request.url)
    url.searchParams.set("title", forumTitle)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
