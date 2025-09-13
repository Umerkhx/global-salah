const langCache = new Map<string, string>()

export const checkIsPathnameIsEqualToLang = (pathname: string): boolean => {
  const supportedLangs = ["en", "fr", "ar", "es", "zh-CN", "de", "tr", "pt", "ur", "ru"]
  return supportedLangs.includes(pathname)
}

export function urlSplitter(pathname: string): string {
  if (langCache.has(pathname)) {
    return langCache.get(pathname)!
  }

  const supportedLangs = ["en", "ar", "fr", "es", "de", "zh-CN", "ur", "pt", "tr", "ru"]
  const segments = pathname.split("/").filter(Boolean)

  let result = "en" // default

  if (segments.length === 0) {
    langCache.set(pathname, result)
    return result
  }

  const firstSegment = segments[0]

  if (supportedLangs.includes(firstSegment)) {
    result = firstSegment
  } else {
    for (const lang of supportedLangs) {
      const langCode = lang.split("-")[0]
      if (firstSegment.startsWith(langCode) && firstSegment.length > langCode.length) {
        result = lang
        break
      }
    }
  }

  langCache.set(pathname, result)
  return result
}

export function extractValidLanguage(pathname: string): string {
  return urlSplitter(pathname)
}
