"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"

type Translations = Record<string, any>

const defaultLang = "en"

const memoryCache: Record<string, Translations> = {}
const loadingStates: Record<string, Promise<Translations>> = {}

const CACHE_VERSION = Date.now() // Change this when you update translations
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

const loadTranslations = async (lang: string): Promise<Translations> => {
  if (memoryCache[lang]) {
    return memoryCache[lang]
  }

  // Deduplicate concurrent requests
  if (await loadingStates[lang]) {
    return loadingStates[lang]
  }

  const loadPromise = (async () => {
    try {
      let stored: string | null = null
      let shouldUseCache = false

      if (typeof window !== "undefined") {
        try {
          const cacheKey = `translations:${lang}:${CACHE_VERSION}`
          const timestampKey = `translations_timestamp:${lang}`

          stored = localStorage.getItem(cacheKey)
          const timestamp = localStorage.getItem(timestampKey)

          if (stored && timestamp) {
            const cacheAge = Date.now() - Number.parseInt(timestamp)
            shouldUseCache = cacheAge < CACHE_DURATION
          }

          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key?.startsWith(`translations:${lang}:`) && key !== cacheKey) {
              localStorage.removeItem(key)
            }
          }
        } catch (error) {
          console.warn("Failed to read from localStorage:", error)
        }
      }

      if (stored && shouldUseCache) {
        const parsed = JSON.parse(stored)
        memoryCache[lang] = parsed
        return parsed
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(`/locales/${lang}.json?v=${CACHE_VERSION}`, {
        signal: controller.signal,
        cache: "no-cache", // Changed from "force-cache"
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error(`Failed to load translations: ${res.status}`)
      }

      const data = await res.json()
      memoryCache[lang] = data

      if (typeof window !== "undefined") {
        requestIdleCallback(() => {
          try {
            const cacheKey = `translations:${lang}:${CACHE_VERSION}`
            const timestampKey = `translations_timestamp:${lang}`

            localStorage.setItem(cacheKey, JSON.stringify(data))
            localStorage.setItem(timestampKey, Date.now().toString())
          } catch (error) {
            console.warn("Failed to cache translations:", error)
          }
        })
      }

      return data
    } catch (error: any) {
      console.error("Error loading translations", error.message)
      return {}
    } finally {
      delete loadingStates[lang]
    }
  })()

  loadingStates[lang] = loadPromise
  return loadPromise
}

export const clearTranslationCache = (lang?: string) => {
  if (lang) {
    delete memoryCache[lang]
    if (typeof window !== "undefined") {
      try {
        // Clear all versions of this language from localStorage
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i)
          if (key?.startsWith(`translations:${lang}:`) || key === `translations_timestamp:${lang}`) {
            localStorage.removeItem(key)
          }
        }
      } catch (error) {
        console.warn("Failed to clear localStorage:", error)
      }
    }
  } else {
    // Clear all caches
    Object.keys(memoryCache).forEach((key) => delete memoryCache[key])
    if (typeof window !== "undefined") {
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i)
          if (key?.startsWith("translations:") || key?.startsWith("translations_timestamp:")) {
            localStorage.removeItem(key)
          }
        }
      } catch (error) {
        console.warn("Failed to clear localStorage:", error)
      }
    }
  }
}

export function useTranslation(namespace?: string) {
  const pathname = usePathname()

  const lang = useMemo(() => {
    return pathname.split("/")[1] || defaultLang
  }, [pathname])

  const [translations, setTranslations] = useState<Translations>(() => memoryCache[lang] || {})
  const [isLoading, setIsLoading] = useState(() => !memoryCache[lang])

  const t = useCallback(
    (key: string) => {
      if (!key) return key

      const result = key.split(".").reduce((o: any, i) => o?.[i], translations)
      return result || key
    },
    [translations],
  )

  const refreshTranslations = useCallback(async () => {
    clearTranslationCache(lang)
    setIsLoading(true)
    try {
      const data = await loadTranslations(lang)
      setTranslations(data)
    } catch (error) {
      console.error("Failed to refresh translations:", error)
    } finally {
      setIsLoading(false)
    }
  }, [lang])

  useEffect(() => {
    let isMounted = true

    const loadLangTranslations = async () => {
      if (memoryCache[lang]) {
        if (isMounted && translations !== memoryCache[lang]) {
          setTranslations(memoryCache[lang])
          setIsLoading(false)
        }
        return
      }

      if (isMounted) {
        setIsLoading(true)
      }

      try {
        const data = await loadTranslations(lang)
        if (isMounted) {
          setTranslations(data)
          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLangTranslations()

    return () => {
      isMounted = false
    }
  }, [lang, translations])

  return { t, lang, isLoading, refreshTranslations }
}