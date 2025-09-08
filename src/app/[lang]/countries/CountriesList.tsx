"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronRight, Search, X } from "lucide-react"
import type { Country } from "@/lib/country"
import { formatTime } from "@/lib/Time"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"
import { checkIsPathnameIsEqualToLang, urlSplitter } from "@/lib"
import { usePathname } from "next/navigation"

export default function CountriesList({ countries }: any) {
  const [time, setTime] = useState<Date>(new Date())
  const [selectedLetter, setSelectedLetter] = useState<string>("A")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      if (query.trim() === "") {
        setFilteredCountries([])
      } else {
        const filtered = countries.filter((country: any) => country.name.toLowerCase().includes(query.toLowerCase()))
        setFilteredCountries(filtered)
      }
    },
    [countries],
  )

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅ".split("")

  const groupedCountries = countries.reduce(
    (acc: any, country: any) => {
      const firstLetter = country.name[0].toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(country)
      return acc
    },
    {} as Record<string, Country[]>,
  )

  const handleCountryClick = (countryName: string) => {
    const letter = countryName[0].toUpperCase()
    setSelectedLetter(letter)
    setSearchQuery("")
    setFilteredCountries([])
    setIsSearchFocused(false)
    setSelectedCountry(countryName)
    const element = document.getElementById(letter)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleImageLoad = (countryCode: string) => {
    setImagesLoaded((prev) => new Set(prev).add(countryCode))
  }

  const pathname = usePathname()
  const currentLang = urlSplitter(pathname)
  const { t } = useTranslation("countrieslist")
  const isLang = checkIsPathnameIsEqualToLang(currentLang)
  const isArabic = pathname.split("/")[1]

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div
          className={`mb-6 flex items-center text-sm text-muted-foreground ${isArabic === "ar" ? "justify-end text-right" : "justify-start text-left"}`}
        >
          <Link href="/" className="hover:text-green-500">
            {t("navigation.home")}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">{t("navigation.countries")}</span>
        </div>

        {/* Header */}
        <div className={`mb-8 ${isArabic === "ar" ? "justify-end text-right" : "justify-start text-left"}`}>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t("countrieslist.title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("countrieslist.desc")}</p>
        </div>

        {/* Search input */}
        <div className="mb-8 relative" ref={searchRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder={t("countrieslist.placeholder")}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className={`w-full pl-10 pr-10 ${isArabic === "ar" ? "justify-end text-right" : "justify-start text-left"}`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => handleSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {isSearchFocused && filteredCountries.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              <ScrollArea className="h-64">
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleCountryClick(country.name)}
                  >
                    <div className="relative w-8 h-6 flex-shrink-0">
                      <img
                        src={`https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`}
                        alt={`${country.name} flag`}
                        sizes="32px"
                        fetchPriority="high"
                        className="object-cover rounded"
                        onLoad={() => handleImageLoad(country.code)}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{country.name}</h3>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Countries list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
            {Object.entries(groupedCountries).map(([letter, countries]: any) => (
              <div key={letter} id={letter} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white scale-90">{letter}</h2>
                <div className="grid gap-4">
                  {countries.map((country: any) => (
                    <Link
                      href={
                        isLang
                          ? `/${currentLang}/countries/${country.name.toLowerCase().replaceAll(" ", "-")}`
                          : `/countries/${country.name.toLowerCase().replaceAll(" ", "-")}`
                      }
                      key={country.code}
                    >
                      <div
                        className={`flex items-center justify-between scale-95 bg-transparent border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 hover:scale-100 rounded-lg p-4 transition ease-in duration-200 hover:shadow-lg ${selectedCountry === country.name
                            ? "text-zinc-100 dark:text-zinc-900 dark:bg-zinc-100 bg-zinc-900 font-semibold"
                            : ""
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-8 h-6 flex-shrink-0">
                            <img
                              src={`https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`}
                              alt={`${country.name} flag`}
                              sizes="32px"
                              className="object-cover rounded"
                              fetchPriority="high"
                              onLoad={() => handleImageLoad(country.code)}
                            />
                          </div>
                          <div>
                            <h3 className="text-sm">{country.name}</h3>
                          </div>
                        </div>
                        <div className="text-base">{formatTime(country.offset)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Alphabet navigation */}
          <div className="sticky h-fit scale-95 lg:block hidden">
            <div className="flex lg:flex-col items-center justify-center lg:justify-start bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
              {alphabet.map((letter) => (
                <a
                  key={letter}
                  href={`#${letter}`}
                  className={`p-2 text-sm hover:text-green-500 transition-colors ${selectedLetter === letter ? "text-green-700 font-bold" : "text-gray-500 dark:text-gray-400"
                    }`}
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
