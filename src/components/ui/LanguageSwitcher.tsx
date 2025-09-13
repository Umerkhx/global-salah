"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Language {
  code: string
  label: string
  flag: string
}

const languages: Language[] = [
  { code: "en", label: "English", flag: "/flag-dropdown/icons8-great-britain-48.png" },
  { code: "fr", label: "Français", flag: "/flag-dropdown/icons8-french-flag-48.png" },
  { code: "ar", label: "العربية", flag: "/flag-dropdown/icons8-sudan-circular-48.png" },
  { code: "es", label: "Español", flag: "/flag-dropdown/icons8-spain-48.png" },
  { code: "zh-CN", label: "普通话", flag: "/flag-dropdown/icons8-china-48.png" },
  { code: "de", label: "Deutsch", flag: "/flag-dropdown/icons8-germany-48.png" },
  { code: "tr", label: "Turkish", flag: "/flag-dropdown/icons8-turkey-48.png" },
  { code: "pt", label: "Português", flag: "/flag-dropdown/icons8-portugal-48.png" },
  { code: "ur", label: "اردو", flag: "/flag-dropdown/icons8-pakistan-48.png" },
  { code: "ru", label: "русский", flag: "/flag-dropdown/icons8-russia-48.png" },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(languages[0])
  const [hasMounted, setHasMounted] = useState(false)

  const isBlogDetail = () => {
    const parts = pathname.split("/")
    return parts.length >= 4 && parts[2] === "blog" && !!parts[3]
  }

  useEffect(() => {
    const updateLanguage = () => {
      localStorage.setItem("loading", "true")
      const pathLang = languages.find((lang) => lang.code === pathname.split("/")[1]) ? pathname.split("/")[1] : null

      if (pathLang) {
        const newLang = languages.find((lang) => lang.code === pathLang)!

        if (!hasMounted) {
          localStorage.setItem("initialLanguage", newLang.code)
          localStorage.setItem("language", newLang.label)
          setHasMounted(true)
        } else {
          const initialLang = localStorage.getItem("initialLanguage")
          const prevLang = localStorage.getItem("language")

          if (initialLang && newLang.code !== initialLang) {
            if (prevLang) {
              localStorage.setItem("prevLanguage", prevLang)
            }
            localStorage.setItem("language", newLang.label)

            // Only redirect to blogs page if on a blog detail page
            if (isBlogDetail()) {
              router.push(`/${newLang.code}/blogs`)
            }
          }
        }

        setCurrentLang(newLang)

        setTimeout(() => {
          localStorage.setItem("loading", "false")
        }, 2000)
      } else {
        const browserLang = navigator.languages?.[0]?.split("-")[0] || "en"
        const defaultLang = languages.find((lang) => lang.code === browserLang) ? browserLang : "en"
        const selectedLang = languages.find((lang) => lang.code === defaultLang)!

        if (!hasMounted) {
          localStorage.setItem("initialLanguage", defaultLang)
          localStorage.setItem("language", selectedLang.label)
          setHasMounted(true)
        }

        setCurrentLang(selectedLang)
        router.replace(`/${defaultLang}${pathname}`)
      }
    }

    updateLanguage()

    window.addEventListener("languagechange", updateLanguage)
    return () => {
      window.removeEventListener("languagechange", updateLanguage)
    }
  }, [pathname, router, hasMounted])

  const changeLanguage = (lang: Language) => {
    const currentLanguageName = localStorage.getItem("language")
    const initialLang = localStorage.getItem("initialLanguage")

    if (currentLanguageName) {
      localStorage.setItem("prevLanguage", currentLanguageName)
    }

    localStorage.setItem("language", lang.label)

    // Only redirect to blogs page if on a blog detail page
    if (initialLang && lang.code !== initialLang && isBlogDetail()) {
      router.push(`/${lang.code}/blogs`)
    } else {
      const newPathname = "/" + pathname.split("/").slice(2).join("/")
      router.push(`/${lang.code}${newPathname}`)
    }

    setIsOpen(false)
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 transition-colors outline-none",
            isOpen && "bg-gray-50",
          )}
        >
          <Image
            src={currentLang.flag || "/placeholder.svg"}
            alt={`${currentLang.label} flag`}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-black dark:text-zinc-100">{currentLang.label}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn(
            "w-[180px] p-2 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg mt-2 ",
          )}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer outline-none group",
                currentLang.code === lang.code
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-50 dark:hover:bg-gray-950",
              )}
            >
              <Image
                src={lang.flag || "/placeholder.svg"}
                alt={`${lang.label} flag`}
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-black dark:text-zinc-100">{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
