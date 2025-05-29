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
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(languages[0])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const updateLanguage = () => {
      localStorage.setItem("loading", "true")
      const pathLang = languages.find((lang) => lang.code === pathname.split("/")[1]) ? pathname.split("/")[1] : null

      if (pathLang) {
        const newLang = languages.find((lang) => lang.code === pathLang)!

        // Check if this is the initial mount
        if (!hasMounted) {
          console.log("🚀 Initial mount - saving initial language:", newLang.code)
          // Save initial language on first mount
          localStorage.setItem("initialLanguage", newLang.code)
          localStorage.setItem("language", newLang.label)
          setHasMounted(true)
        } else {
          // Language changed after initial mount
          const initialLang = localStorage.getItem("initialLanguage")
          const prevLang = localStorage.getItem("language")

          console.log("🔄 Language change detected:")
          console.log("  Initial language:", initialLang)
          console.log("  Previous language:", prevLang)
          console.log("  New language:", newLang.label)

          if (initialLang && newLang.code !== initialLang) {
            // Save previous language before changing
            if (prevLang) {
              localStorage.setItem("prevLanguage", prevLang)
            }

            // Update current language
            localStorage.setItem("language", newLang.label)

            // Redirect to blogs page of new language
            console.log(`✅ Redirecting to /${newLang.code}/blogs`)
            router.push(`/${newLang.code}/blogs`)
          }
        }

        setCurrentLang(newLang)

        setTimeout(() => {
          localStorage.setItem("loading", "false")
        }, 2000)
      } else {
        // No language in path - detect browser language
        const browserLang = navigator.language.split("-")[0]
        const defaultLang = languages.find((lang) => lang.code === browserLang) ? browserLang : "en"
        const selectedLang = languages.find((lang) => lang.code === defaultLang)!

        if (!hasMounted) {
          console.log("🚀 Initial mount (no lang in path) - saving initial language:", defaultLang)
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
    console.log("🎯 Manual language change triggered:", lang.code)

    // Get current language info for localStorage
    const currentLanguageName = localStorage.getItem("language")
    const initialLang = localStorage.getItem("initialLanguage")

    console.log("  Current language in storage:", currentLanguageName)
    console.log("  Initial language:", initialLang)

    // Save previous language
    if (currentLanguageName) {
      localStorage.setItem("prevLanguage", currentLanguageName)
      console.log("  Saved previous language:", currentLanguageName)
    }

    // Update current language
    localStorage.setItem("language", lang.label)
    console.log("  Updated current language to:", lang.label)

    // If changing from initial language, redirect to blogs
    if (initialLang && lang.code !== initialLang) {
      console.log(`✅ Redirecting to /${lang.code}/blogs (different from initial)`)
      router.push(`/${lang.code}/blogs`)
    } else {
      // Same as initial language, just navigate normally
      const newPathname = "/" + pathname.split("/").slice(2).join("/")
      console.log(`➡️ Navigating to /${lang.code}${newPathname} (same as initial)`)
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
          className="w-[180px] p-2 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg mt-2"
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
