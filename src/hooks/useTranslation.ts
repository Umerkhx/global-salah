"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"

type Translations = Record<string, any>

const memoryCache: Record<string, Translations> = {}
const loadingStates: Record<string, Promise<Translations>> = {}

const loadTranslations = async (lang: string): Promise<Translations> => {
  if (memoryCache[lang]) {
    return memoryCache[lang]
  }

  if (await loadingStates[lang]) {
    return loadingStates[lang]
  }

  const loadPromise = (async () => {
    try {
      let stored: string | null = null
      if (typeof window !== "undefined") {
        try {
          stored = localStorage.getItem(`translations:${lang}`)
        } catch (error) {
          console.warn("Failed to read from localStorage:", error)
        }
      }

      if (stored) {
        const parsed = JSON.parse(stored)
        memoryCache[lang] = parsed
        return parsed
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(`/locales/${lang}.json`, {
        signal: controller.signal,
        cache: "force-cache",
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
            localStorage.setItem(`translations:${lang}`, JSON.stringify(data))
          } catch (error) {
            console.warn("Failed to cache translations:", error)
          }
        })
      }

      return data
    } catch (error: any) {
      console.error("Error loading translations", error.message)
      // Return empty object as fallback
      return {}
    } finally {
      delete loadingStates[lang]
    }
  })()

  loadingStates[lang] = loadPromise
  return loadPromise
}

export function useTranslation(namespace?: string) {
  const pathname = usePathname()

  const lang = useMemo(() => {
    return pathname.split("/")[1] 
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

  return { t, lang, isLoading }
}