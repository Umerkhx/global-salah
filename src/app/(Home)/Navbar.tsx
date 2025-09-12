"use client"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import Link from "next/link"
import { MainNav } from "./MainNav"
import { MobileNav } from "./MobileNav"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "next/navigation"
import { checkIsPathnameIsEqualToLang, urlSplitter } from "@/lib"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"
import { SidebarButton } from "@/components/sidebar-button"
import { SearchButton } from "@/components/ui/search-button"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

function Navbar() {
  const { t } = useTranslation("navigation")
  const pathname = usePathname()
  const currentLang = urlSplitter(pathname)
  const isLang = checkIsPathnameIsEqualToLang(currentLang)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500) 
    return () => clearTimeout(timeout)
  }, [])

  return (
    <header className="sticky top-0 z-[9999999999] border-b border-white/10 bg-[#003422] backdrop-blur dark:supports-[backdrop-filter]:bg-[#000717]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href={isLang ? `/${currentLang}` : "/"} className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image
                src="/global-salah-logo.webp"
                alt="globalsalah"
                width={260}
                height={230}
                priority
              />
            </div>

            {loading ? (
              <Skeleton className="h-4 w-28 md:block hidden" />
            ) : (
              <span className="text-lg font-semibold text-white md:block hidden">
                {isLang ? t("navigation.title") : "Global Salah"}
              </span>
            )}
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          {loading ? (
            <Skeleton className="h-6 w-64" />
          ) : (
            <MainNav />
          )}
        </div>

        <div className="flex items-center md:gap-5 gap-2">
          {loading ? (
            <>
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md lg:block hidden" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </>
          ) : (
            <>
              <SearchButton />
              <div className="lg:flex gap-2 hidden">
                <SidebarButton />
              </div>
              <LanguageSwitcher />
              <ModeToggle />
              <div className="md:hidden">
                <MobileNav />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
