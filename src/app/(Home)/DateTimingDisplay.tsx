"use client"
import { useEffect, useState, useCallback, useMemo } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { addDays, subDays } from "date-fns"
import { PrayerTimes, Coordinates, CalculationMethod, Madhab, type CalculationParameters } from "adhan"
import "swiper/css"
import "swiper/css/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CloudSun,
  LucideSunset,
  MoonStarIcon,
  SunDimIcon,
  SunMediumIcon,
  SunriseIcon,
} from "lucide-react"
import moment from "moment-hijri"
import { Navigation } from "swiper/modules"
import dynamic from "next/dynamic"
import { useTranslation } from "@/hooks/useTranslation"

const MonthlyNamazTimings = dynamic(() => import("./MonthlyNamaz"), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-32">Loading...</div>,
})

const prayerIcons = {
  fajr: <CloudSun className="w-5 h-5" />,
  sunrise: <SunriseIcon className="w-5 h-5" />,
  dhuhr: <SunDimIcon className="w-5 h-5" />,
  asr: <SunMediumIcon className="w-5 h-5" />,
  maghrib: <LucideSunset className="w-5 h-5" />,
  isha: <MoonStarIcon className="w-5 h-5" />,
}

const calculationMethodCache = new Map<string, any>()

function DateTimingDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [prayerTimes, setPrayerTimes] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState(1)
  const [location, setLocation] = useState<Coordinates | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState<string | null>(null)
  const [timeZone, setTimeZone] = useState<string>("UTC")
  const [selectedMadhab, setSelectedMadhab] = useState("Shafi")

  const { t } = useTranslation("CurrentNamazTime")

  const getCalculationMethod = useCallback((country: string) => {
    if (calculationMethodCache.has(country)) {
      return calculationMethodCache.get(country)
    }

    let method
    switch (country) {
      case "Pakistan":
        method = CalculationMethod.Karachi()
        break
      case "United States":
      case "Germany":
        method = CalculationMethod.NorthAmerica()
        break
      case "United Kingdom":
        method = CalculationMethod.MuslimWorldLeague()
        break
      case "Saudi Arabia":
        method = CalculationMethod.UmmAlQura()
        break
      case "Egypt":
        method = CalculationMethod.Egyptian()
        break
      case "Singapore":
        method = CalculationMethod.Singapore()
        break
      case "Kuwait":
        method = CalculationMethod.Kuwait()
        break
      case "Iran":
        method = CalculationMethod.Tehran()
        break
      case "Turkey":
        method = CalculationMethod.Turkey()
        break
      case "Dubai":
        method = CalculationMethod.Dubai()
        break
      default:
        method = CalculationMethod.MuslimWorldLeague()
    }

    calculationMethodCache.set(country, method)
    return method
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchLocation = async () => {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(
          `https://pro.ip-api.com/json/?key=kHg84ht9eNasCRN&fields=lat,lon,city,country,timezone`,
          {
            cache: "force-cache",
            signal: controller.signal,
          },
        )

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const { lat, lon, city, country, timezone } = await response.json()

        if (isMounted) {
          setLocation(new Coordinates(lat, lon))
          setCity(city)
          setCountry(country)
          setTimeZone(timezone)
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching location data:", error.message)
          // Fallback to geolocation API
          if (navigator.geolocation && isMounted) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                if (isMounted) {
                  const { latitude, longitude } = position.coords
                  setLocation(new Coordinates(latitude, longitude))
                }
              },
              (error) => console.error("Error fetching geolocation", error),
              { timeout: 10000 },
            )
          }
        }
      }
    }

    fetchLocation()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const calculatePrayerTimes = useCallback(
    (date: Date, location: Coordinates, country: string, madhab: string, timeZone: string) => {
      if (!location) return null

      const calculationMethod = getCalculationMethod(country)
      const madhabEnum = madhab === "Shafi" ? Madhab.Shafi : Madhab.Hanafi

      const params: CalculationParameters = {
        ...calculationMethod,
        madhab: madhabEnum,
        nightPortions: () => ({ fajr: 1.0, isha: 1.0 }),
      }

      const prayerTimeObj = new PrayerTimes(location, date, params)

      const formatTime = (time: Date, timeZone: string) =>
        time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: timeZone,
        })

      const isArabic = window.location.pathname.includes("/ar")

      const prayers = [
        {
          name: isArabic ? "الفجر" : "Fajr",
          time: formatTime(prayerTimeObj.fajr, timeZone),
          isActive: false,
          icon: prayerIcons.fajr,
        },
        {
          name: isArabic ? "الشروق" : "Sunrise",
          time: formatTime(prayerTimeObj.sunrise, timeZone),
          isActive: false,
          icon: prayerIcons.sunrise,
        },
        {
          name: isArabic ? "الظهر" : "Dhuhr",
          time: formatTime(prayerTimeObj.dhuhr, timeZone),
          isActive: false,
          icon: prayerIcons.dhuhr,
        },
        {
          name: isArabic ? "العصر" : "Asr",
          time: formatTime(prayerTimeObj.asr, timeZone),
          isActive: false,
          icon: prayerIcons.asr,
        },
        {
          name: isArabic ? "المغرب" : "Maghrib",
          time: formatTime(prayerTimeObj.maghrib, timeZone),
          isActive: false,
          icon: prayerIcons.maghrib,
        },
        {
          name: isArabic ? "العشاء" : "Isha",
          time: formatTime(prayerTimeObj.isha, timeZone),
          isActive: false,
          icon: prayerIcons.isha,
        },
      ]

      // Find next prayer
      const now = new Date()
      const nextPrayer = prayers.find((prayer) => {
        const prayerTime = new Date(`${date.toDateString()} ${prayer.time}`)
        return prayerTime > now
      })

      return {
        date: {
          gregorian: isArabic
            ? date.toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
          hijri: isArabic
            ? moment(subDays(date, 1)).locale("ar-SA").format("iD iMMMM, iYYYY")
            : moment(subDays(date, 1)).locale("en").format("iD iMMMM, iYYYY"),
        },
        prayers,
        location: `Lat: ${location.latitude.toFixed(2)}, Lon: ${location.longitude.toFixed(2)}`,
        nextPrayer: nextPrayer
          ? {
              name: nextPrayer.name,
              time: nextPrayer.time,
              countdown: () =>
                Math.max(
                  0,
                  Math.floor(
                    (new Date(`${date.toDateString()} ${nextPrayer.time}`).getTime() - new Date().getTime()) / 1000,
                  ),
                ),
            }
          : null,
      }
    },
    [getCalculationMethod],
  )

  useEffect(() => {
    let isMounted = true

    const loadPrayerTimes = () => {
      if (!location || !country) return

      requestAnimationFrame(() => {
        if (!isMounted) return

        const yesterday = calculatePrayerTimes(subDays(currentDate, 1), location, country, selectedMadhab, timeZone)
        const today = calculatePrayerTimes(currentDate, location, country, selectedMadhab, timeZone)
        const tomorrow = calculatePrayerTimes(addDays(currentDate, 1), location, country, selectedMadhab, timeZone)

        setPrayerTimes([yesterday, today, tomorrow].filter(Boolean))
      })
    }

    loadPrayerTimes()

    return () => {
      isMounted = false
    }
  }, [currentDate, location, country, selectedMadhab, timeZone, calculatePrayerTimes])

  useEffect(() => {
    let animationFrame: number

    const updateCountdown = () => {
      const nextPrayer = prayerTimes[activeIndex]?.nextPrayer
      if (nextPrayer) {
        const countdownInSeconds = nextPrayer.countdown()
        if (countdownInSeconds > 0) {
          const hours = Math.floor(countdownInSeconds / 3600)
          const minutes = Math.floor((countdownInSeconds % 3600) / 60)
          const seconds = countdownInSeconds % 60
          setNextPrayerCountdown(`${hours}h ${minutes}m ${seconds}s`)
        } else {
          setNextPrayerCountdown(null)
        }
      }

      animationFrame = requestAnimationFrame(updateCountdown)
    }

    if (prayerTimes.length > 0) {
      updateCountdown()
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [prayerTimes, activeIndex])

  const handleSlideChange = useCallback((swiper: any) => {
    const newIndex = swiper.activeIndex
    setActiveIndex(newIndex)

    if (newIndex === 0) {
      setCurrentDate(subDays(new Date(), 1))
    } else if (newIndex === 1) {
      setCurrentDate(new Date())
    } else if (newIndex === 2) {
      setCurrentDate(addDays(new Date(), 1))
    }
  }, [])

  const gregorian = prayerTimes[activeIndex]?.date.gregorian
  const formattedDate = useMemo(() => {
    if (gregorian) {
      const [, month, day, year] = gregorian.split(" ")
      return `${day} ${month} ${year}`
    }
    return ""
  }, [gregorian, t])

  return (
    <div id="namaz-time" className="relative max-w-screen-xl mx-auto z-10 -mt-16">
      <div className="mx-auto w-[90%] lg:w-[95%] py-3 bg-slate-50 dark:bg-background rounded-xl shadow-lg px-2 border border-muted scale-90 lg:scale-100">
        {/* Header with date tabs */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center p-4 border-b-2 border-muted">
          <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 space-x-4">
            <label htmlFor="options" className="sr-only">
              Select an option
            </label>
            <select
              className="mx-auto lg:w-[205px] w-[90%] px-4 py-2 rounded-lg dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 outline-none text-white"
              value={selectedMadhab}
              onChange={(e) => setSelectedMadhab(e.target.value)}
            >
              <option value="Hanafi">{t("city.hanafi") || "Hanafi"}</option>
              <option value="Shafi">{t("city.shafi") || "Shafi"}</option>
            </select>

            <div className="grid grid-cols-2 lg:gap-0 gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                    activeIndex === 0
                      ? "bg-[#1e8e67] text-white"
                      : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                  }`}
                  onClick={() => {
                    setActiveIndex(0)
                    setCurrentDate(subDays(new Date(), 1))
                  }}
                >
                  {t("CurrentNamazTime.yesterday") || "Yesterday"}
                </button>

                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                    activeIndex === 1
                      ? "bg-[#1e8e67] text-white"
                      : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                  }`}
                  onClick={() => {
                    setActiveIndex(1)
                    setCurrentDate(new Date())
                  }}
                >
                  {t("CurrentNamazTime.today") || "Today"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                    activeIndex === 2
                      ? "bg-[#1e8e67] text-white"
                      : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                  }`}
                  onClick={() => {
                    setActiveIndex(2)
                    setCurrentDate(addDays(new Date(), 1))
                  }}
                >
                  {t("CurrentNamazTime.tomorrow") || "Tomorrow"}
                </button>

                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${
                    activeIndex === 3
                      ? "bg-[#1e8e67] text-white"
                      : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                  }`}
                  onClick={() => setActiveIndex(3)}
                >
                  {t("CurrentNamazTime.monthly") || "Monthly"}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:text-right text-center lg:pt-0 pt-3">
            <h2 className="text-xl font-semibold">{country ? `${city}, ${country}` : "Loading..."}</h2>
            <p className="font-medium">{prayerTimes[activeIndex]?.date.hijri || ""}</p>
            <p className="font-semibold text-lg">{formattedDate}</p>
          </div>
        </div>

        {/* Swiper for Prayer Times */}
        {activeIndex !== 3 ? (
          <div className="relative">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              initialSlide={1}
              className="w-full"
              navigation={{
                prevEl: "#prevBtn",
                nextEl: "#nextBtn",
              }}
              modules={[Navigation]}
            >
              {prayerTimes.map((day, index) => (
                <SwiperSlide key={index}>
                  <div className="grid lg:grid-cols-6 grid-cols-2 gap-4 p-4">
                    {day?.prayers.map((prayer: any, prayerIndex: number) => (
                      <div
                        key={prayerIndex}
                        className={`flex flex-col items-center justify-center py-4 rounded-lg ${
                          prayer.name === day?.nextPrayer?.name
                            ? "bg-[#1e8e67] text-white"
                            : "bg-background border border-muted text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        <div className="flex justify-between items-center mx-auto font-medium">
                          <div className="lg:pr-16 pr-8 text-lg">{prayer.name}</div>
                          {prayer.icon}
                        </div>
                        <p className="text-lg font-semibold pt-2">{prayer.time}</p>
                        {prayer.name === day?.nextPrayer?.name && nextPrayerCountdown && (
                          <p className="text-sm">{nextPrayerCountdown}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              <div className="flex justify-center items-center gap-2">
                <button
                  aria-label="Previous"
                  className="z-10 p-2 bg-[#1e8e67] text-zinc-100 rounded-full shadow-lg transition"
                  id="prevBtn"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next"
                  className="z-10 p-2 bg-[#1e8e67] text-zinc-100 rounded-full shadow-lg transition"
                  id="nextBtn"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </Swiper>
          </div>
        ) : (
          <MonthlyNamazTimings />
        )}
      </div>
    </div>
  )
}

export default DateTimingDisplay
