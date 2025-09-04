export const checkIsPathnameIsEqualToLang = (pathname: string) => {
    if (pathname === "en" || pathname === "fr" || pathname === "ar" || pathname === "es" ||
        pathname === "zh-CN" || pathname === "de" || pathname === "tr" || pathname === "pt"
        || pathname === "ur" || pathname === "ru") {
        return true
    }

}

// Enhanced URL splitter that handles invalid language codes better
export function urlSplitter(pathname: string): string {
  const supportedLangs = ["en", "ar", "fr", "es", "de", "zh-CN", "ur", "pt", "tr", "ru"];
  const segments = pathname.split("/").filter(Boolean);
  
  if (segments.length === 0) {
    return "en"; // Default fallback
  }
  
  const firstSegment = segments[0];
  
  // Check if first segment is a valid language code
  if (supportedLangs.includes(firstSegment)) {
    return firstSegment;
  }
  
  // Check if first segment starts with a supported language code
  for (const lang of supportedLangs) {
    const langCode = lang.split("-")[0]; // Handle cases like zh-CN
    if (firstSegment.startsWith(langCode) && firstSegment.length > langCode.length) {
      return lang; // Return the full supported language code
    }
  }
  
  // If no match found, default to English
  return "en";
}

// Extract the correct language from invalid URLs
export function extractValidLanguage(pathname: string): string {
  const supportedLangs = ["en", "ar", "fr", "es", "de", "zh-CN", "ur", "pt", "tr", "ru"];
  const segments = pathname.split("/").filter(Boolean);
  
  if (segments.length === 0) {
    return "en";
  }
  
  const firstSegment = segments[0];
  
  // If it's already a valid language, return it
  if (supportedLangs.includes(firstSegment)) {
    return firstSegment;
  }
  
  // Try to extract valid language from invalid combinations
  for (const lang of supportedLangs) {
    const langCode = lang.split("-")[0];
    if (firstSegment.startsWith(langCode)) {
      return lang;
    }
  }
  
  // Default fallback
  return "en";
}