"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"
import { urlSplitter } from "@/lib"
import { useTranslation } from "@/hooks/useTranslation"

const languageDataCache: Record<string, any> = {}

const loadLanguageData = async (lang: string) => {
  if (languageDataCache[lang]) {
    return languageDataCache[lang]
  }

  try {
    const response = await fetch(`/locales/${lang}.json`, { cache: "force-cache" })
    const data = await response.json()
    languageDataCache[lang] = data
    return data
  } catch (error) {
    console.error(`Failed to load language data for ${lang}:`, error)
    return null
  }
}

function Banner() {
  const [isHadith, setIsHadith] = useState(true)
  const [hadithIndex, setHadithIndex] = useState(0)
  const [ayatIndex, setAyatIndex] = useState(0)
  const [languageData, setLanguageData] = useState<any>(() => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : ""
    const lang = urlSplitter(pathname) || "en"
    return languageDataCache[lang] || null
  })

  const pathname = usePathname()
  const lang = urlSplitter(pathname)
  const { t, isLoading: translationLoading } = useTranslation("banner")

  const currentContent = useMemo(() => {
    if (!languageData?.banner) return null

    if (isHadith) {
      return languageData.banner.hadiths?.[hadithIndex] || null
    } else {
      return languageData.banner.ayats?.[ayatIndex] || null
    }
  }, [languageData, isHadith, hadithIndex, ayatIndex])

  useEffect(() => {
    const initializeFromStorage = () => {
      if (typeof window === "undefined") return

      try {
        const today = new Date().toDateString()
        const storedDate = localStorage.getItem("lastContentChange")

        if (storedDate !== today) {
          setIsHadith((prev) => !prev)
          setHadithIndex(0)
          setAyatIndex(0)
          requestIdleCallback(() => {
            localStorage.setItem("lastContentChange", today)
          })
        } else {
          const storedHadithIndex = localStorage.getItem("hadithIndex")
          const storedAyatIndex = localStorage.getItem("ayatIndex")
          if (storedHadithIndex) setHadithIndex(Number.parseInt(storedHadithIndex))
          if (storedAyatIndex) setAyatIndex(Number.parseInt(storedAyatIndex))
        }
      } catch (error) {
        console.warn("Failed to initialize from localStorage:", error)
      }
    }

    initializeFromStorage()
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      const langToLoad = lang || "en"

      if (languageDataCache[langToLoad]) {
        if (isMounted && languageData !== languageDataCache[langToLoad]) {
          setLanguageData(languageDataCache[langToLoad])
        }
        return
      }

      try {
        const data = await loadLanguageData(langToLoad)
        if (isMounted && data) {
          setLanguageData(data)
        }
      } catch (error) {
        console.error("Failed to load language data:", error)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [lang, languageData])

  const handleContentChange = useCallback((value: string) => {
    setIsHadith(value === "hadith")
  }, [])

  const handleNext = useCallback(() => {
    if (!languageData?.banner) return

    if (isHadith) {
      const nextIndex = (hadithIndex + 1) % (languageData.banner.hadiths?.length || 1)
      setHadithIndex(nextIndex)

      requestIdleCallback(() => {
        localStorage.setItem("hadithIndex", nextIndex.toString())
      })
    } else {
      const nextIndex = (ayatIndex + 1) % (languageData.banner.ayats?.length || 1)
      setAyatIndex(nextIndex)

      requestIdleCallback(() => {
        localStorage.setItem("ayatIndex", nextIndex.toString())
      })
    }
  }, [languageData, isHadith, hadithIndex, ayatIndex])

  const isLoading = translationLoading || !languageData

  return (
    <div className="relative lg:h-screen h-[500px] bg-[#FAFAFF] dark:bg-[#0a1f0b] text-zinc-100 overflow-hidden">
      <Image
        src="/banner-img-salah.webp"
        alt="Banner background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#101110] via-emerald-950 to-[#000000]/60 backdrop-blur-sm" />

      <div className="container relative z-20 lg:mx-auto px-4 lg:pt-20 pt-6 h-full">
        {isLoading ? (
          <Skeleton className="h-12 w-2/4 mx-auto bg-gray-700/30" />
        ) : (
          <h1 className="text-xl text-center lg:text-5xl font-bold my-5">
            {t("banner.title") || "Welcome to Global Salah"}
          </h1>
        )}

        <div className="max-w-3xl lg:mt-12 py-2 lg:mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex md:flex-row flex-col lg:justify-between justify-start lg:items-center space-y-2 mb-4">
                <Skeleton className="h-8 w-48 bg-gray-700/30" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-32 bg-gray-700/30" />
                  <Skeleton className="h-10 w-32 bg-gray-700/30" />
                </div>
              </div>
              <Skeleton className="h-24 w-full bg-gray-700/30" />
              <Skeleton className="h-16 w-full bg-gray-700/30" />
              <Skeleton className="h-6 w-40 bg-gray-700/30" />
            </div>
          ) : (
            <>
              <div className="flex md:flex-row flex-col lg:justify-between justify-start lg:items-center space-y-2 mb-4">
                <h2 className="lg:text-2xl text-lg font-semibold lg:text-left text-center">
                  {isHadith
                    ? t("banner.hadithofday") || "Hadith of the Day"
                    : t("banner.ayatofday") || "Ayat of the Day"}
                </h2>

                <div className="grid grid-cols-2 lg:gap-4 gap-8 lg:mx-0 mx-auto pl-10 pt-2 scale-90 lg:scale-100">
                  <div>
                    <label htmlFor="content-select" className="sr-only">
                      Select content
                    </label>
                    <Select value={isHadith ? "hadith" : "ayat"} onValueChange={handleContentChange}>
                      <SelectTrigger id="content-select" className="lg:w-[180px] w-[130px]">
                        <SelectValue placeholder="Select content" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hadith">{t("banner.titlehadith") || "Hadith"}</SelectItem>
                        <SelectItem value="ayat">{t("banner.titleayat") || "Ayat"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <button
                      aria-label="Next Content"
                      onClick={handleNext}
                      className="bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                    >
                      {`Next ${isHadith ? t("banner.titlehadith") || "Hadith" : t("banner.titleayat") || "Ayat"}`}
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${isHadith ? "hadith" : "ayat"}-${isHadith ? hadithIndex : ayatIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[200px]"
                >
                  {currentContent && (
                    <>
                      <p className="lg:text-lg text-sm text-center pt-6 px-2 leading-relaxed">
                        {!isHadith ? currentContent.text : currentContent.arabic}
                      </p>
                      <p className="text-sm text-center pt-3 px-2 leading-relaxed">
                        {!isHadith ? t(currentContent.translation) : t(currentContent.translation)}
                      </p>
                      <p className="mt-4 text-sm opacity-75 lg:text-left text-center">{currentContent.refrence}</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner
