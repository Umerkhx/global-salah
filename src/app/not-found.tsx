"use client"

import { Button } from "@/components/ui/button"
import { extractValidLanguage } from "@/lib"
import { FileQuestion } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()
  const correctLang = extractValidLanguage(pathname)
  const [countdown, setCountdown] = useState(3)

  const hasInvalidLangCombo = (): { hasInvalid: boolean; detectedLang: string } => {
    const supportedLangs = ["en", "ar", "fr", "es", "de", "zh-CN", "ur", "pt", "tr", "ru"]
    const segments = pathname.split("/").filter(Boolean)

    if (segments.length === 0) {
      return { hasInvalid: false, detectedLang: "en" }
    }

    const firstSegment = segments[0]

    // Check if first segment is exactly a supported language
    if (supportedLangs.includes(firstSegment)) {
      // Check for multiple language codes
      const langCodes = segments.filter(
        (segment) =>
          supportedLangs.includes(segment) || supportedLangs.some((lang) => segment.startsWith(lang.split("-")[0])),
      )
      return { hasInvalid: langCodes.length > 1, detectedLang: firstSegment }
    }

    // Check if first segment starts with a supported language but has extra characters
    for (const lang of supportedLangs) {
      const langCode = lang.split("-")[0]
      if (firstSegment.startsWith(langCode) && firstSegment.length > langCode.length) {
        return { hasInvalid: true, detectedLang: lang }
      }
    }

    // Check for multiple language codes in the path
    const langCodes = segments.filter(
      (segment) =>
        supportedLangs.includes(segment) || supportedLangs.some((lang) => segment.startsWith(lang.split("-")[0])),
    )

    return { hasInvalid: langCodes.length > 1 || !supportedLangs.includes(firstSegment), detectedLang: correctLang }
  }

  const { hasInvalid, detectedLang } = hasInvalidLangCombo()

  useEffect(() => {
    const redirectTime = hasInvalid ? 500 : 3000

    const timer = setTimeout(() => {
      router.replace(`/${detectedLang}`)
    }, redirectTime)

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownTimer)
    }
  }, [detectedLang, router, pathname, hasInvalid])

  const handleReturnHome = () => {
    router.replace(`/${detectedLang}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <FileQuestion className="w-24 h-24 text-muted-foreground mb-8" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-4 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      {hasInvalid ? (
        <div className="text-center mb-4">
          <p className="text-sm text-red-500 mb-2 font-medium">
            Invalid language code detected in URL
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to /{detectedLang}...
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Redirecting to home page in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>
      )}
      <Button className="text-white bg-emerald-700 hover:bg-emerald-800" onClick={handleReturnHome}>
        Return to /{detectedLang} Now
      </Button>
    </div>
  )
}