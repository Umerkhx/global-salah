"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { addDays, subDays } from "date-fns";
import { PrayerTimes, Coordinates, CalculationMethod, Madhab, CalculationParameters } from "adhan";
import "swiper/css";
import "swiper/css/navigation";
import { CloudSun, LucideSunset, MoonStarIcon, SunDimIcon, SunMediumIcon, SunriseIcon, } from "lucide-react";
import moment from "moment-hijri";
const MonthlyNamazTimings = dynamic(() => import("./MonthlyNamaz"), {
  ssr: true, 
});
import { useTranslation } from "@/hooks/useTranslation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import dynamic from "next/dynamic";


function DateTimingDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [location, setLocation] = useState<any>(null);
  const [city, setCity] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<string>("UTC");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedMadhab, setSelectedMadhab] = useState("Shafi");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://pro.ip-api.com/json/?key=kHg84ht9eNasCRN&fields=lat,lon,city,country,timezone`, { cache: "reload" }
        );
        const { lat, lon, city, country, timezone } = await response.json();

        setLocation(new Coordinates(lat, lon));
        setCity(city);
        setCountry(country);
        setTimeZone(timezone); // Update the current timezone
      } catch (error: any) {
        console.error("Error fetching location data:", error.message);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(new Coordinates(latitude, longitude));
      },
      (error) => console.error("Error fetching location", error)
    );
  }, []);

  const getCalculationMethod = (country: string) => {
    if (country === "Pakistan") {
      return CalculationMethod.Karachi();
    } else if (country === "United States") {
      return CalculationMethod.NorthAmerica();
    } else if (country === "Germany") {
      return CalculationMethod.NorthAmerica();
    } else if (country === "United Kingdom") {
      return CalculationMethod.MuslimWorldLeague();
    } else if (country === "Saudi Arabia") {
      return CalculationMethod.UmmAlQura();
    } else if (country === "Egypt") {
      return CalculationMethod.Egyptian();
    } else if (country === "Singapore") {
      return CalculationMethod.Singapore();
    } else if (country === "Kuwait") {
      return CalculationMethod.Kuwait();
    } else if (country === "Iran") {
      return CalculationMethod.Tehran();
    } else if (country === "Turkey") {
      return CalculationMethod.Turkey();
    } else if (country === "Dubai") {
      return CalculationMethod.Dubai();
    } else {
      return CalculationMethod.MuslimWorldLeague();
    }
  };

  const params = getCalculationMethod(country as any);



  useEffect(() => {
    const fetchPrayerTimes = (date: Date) => {
      if (!location) return null;

      const calculationMethod = getCalculationMethod(location.country);

      const madhab = selectedMadhab === "Shafi" ? Madhab.Shafi : Madhab.Hanafi;
      const nightPortions = () => {
        return {
          fajr: 1.0,
          isha: 1.0,
        };
      };

      const params: CalculationParameters = {
        ...calculationMethod,
        madhab,
        nightPortions,
      };

      const prayerTimeObj = new PrayerTimes(location, date, params);

      const formatTime = (time: Date, timeZone: string) =>
        time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: timeZone,
        });

      const isArabic = window.location.pathname.includes("/ar");
      const prayers = [
        {
          name: isArabic ? "الفجر" : "Fajr",
          time: formatTime(prayerTimeObj.fajr, timeZone || "UTC"),
          isActive: false,
          icon: <CloudSun className="w-5 h-5 " />,
        },
        {
          name: isArabic ? "الشروق" : "Sunrise",
          time: formatTime(prayerTimeObj.sunrise, timeZone || "UTC"),
          isActive: false,
          icon: <SunriseIcon className="w-5 h-5 " />,
        },
        {
          name: isArabic ? "الظهر" : "Dhuhr",
          time: formatTime(prayerTimeObj.dhuhr, timeZone || "UTC"),
          isActive: false,
          icon: <SunDimIcon className="w-5 h-5 " />,
        },
        {
          name: isArabic ? "العصر" : "Asr",
          time: formatTime(prayerTimeObj.asr, timeZone || "UTC"),
          isActive: false,
          icon: <SunMediumIcon className="w-5 h-5 " />,
        },
        {
          name: isArabic ? "المغرب" : "Maghrib",
          time: formatTime(prayerTimeObj.maghrib, timeZone || "UTC"),
          isActive: false,
          icon: <LucideSunset className="w-5 h-5 " />,
        },
        {
          name: isArabic ? "العشاء" : "Isha",
          time: formatTime(prayerTimeObj.isha, timeZone || "UTC"),
          isActive: false,
          icon: <MoonStarIcon className="w-5 h-5 " />,
        },
      ];

      // Determine the next prayer
      const now = new Date();
      const nextPrayer = prayers.find((prayer) => {
        const prayerTime = new Date(`${date.toDateString()} ${prayer.time}`);
        return prayerTime > now;
      });


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
              differenceInSeconds(
                new Date(`${date.toDateString()} ${nextPrayer.time}`),
                new Date()
              ),
          }
          : null,
      };
    };

    const loadPrayerTimes = async () => {
      if (location) {
        // Fetch prayer times for yesterday, today, and tomorrow
        const yesterday = fetchPrayerTimes(subDays(currentDate, 1));
        const today = fetchPrayerTimes(currentDate);
        const tomorrow = fetchPrayerTimes(addDays(currentDate, 1));
        setPrayerTimes([yesterday, today, tomorrow]);
      }
    };
    loadPrayerTimes();
  }, [currentDate, location, selectedMadhab]);


  useEffect(() => {
    const interval = setInterval(() => {
      const nextPrayer = prayerTimes[activeIndex]?.nextPrayer;
      if (nextPrayer) {
        const countdownInSeconds = nextPrayer.countdown();
        if (countdownInSeconds > 0) {
          const hours = Math.floor(countdownInSeconds / 3600);
          const minutes = Math.floor((countdownInSeconds % 3600) / 60);
          const seconds = countdownInSeconds % 60;
          setNextPrayerCountdown(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setNextPrayerCountdown(null);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes, activeIndex]);

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex;

    // Set the active index based on the slide change
    setActiveIndex(newIndex);

    // Update date based on active index
    if (newIndex === 0) {
      setCurrentDate(subDays(new Date(), 0));
    } else if (newIndex === 1) {
      setCurrentDate(new Date());
    } else if (newIndex === 2) {
      setCurrentDate(addDays(new Date(), 0));
    }
  };

  const { t } = useTranslation("CurrentNamazTime")

  const gregorian = prayerTimes[activeIndex]?.date.gregorian;
  if (gregorian) {
    const [, month, day, year] = gregorian.split(" "); // Extract month, day, year
    const translatedMonth = t(`CurrentNamazTime.months.${month}`); // Translate month

    const formattedDate = `${day} ${translatedMonth} ${year}`;

  }
  const formattedDate = gregorian
    ? (() => {
      const [, month, day, year] = gregorian.split(" ");
      return `${day} ${t(`CurrentNamazTime.months.${month}`)} ${year}`;
    })()
    : "";

  return (
    <div id="namaz-time" className="relative max-w-screen-xl mx-auto z-10 -mt-16">
      <div className="mx-auto w-[90%] lg:w-[95%] py-3 bg-slate-50 dark:bg-background rounded-xl shadow-lg px-2 border border-muted scale-90 lg:scale-100">
        {/* Header with date tabs */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center p-4 border-b-2 border-muted">
          <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 space-x-4">
          <label htmlFor="options" className="sr-only">Select an option</label>
            <select className=" mx-auto lg:w-[205px] w-[90%] px-4 py-2 rounded-lg dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 outline-none text-white"
              value={selectedMadhab} onChange={(e) => setSelectedMadhab(e.target.value)}>
              <option  className="rounded-lg dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 outline-none "
                value="Hanafi">{t("city.hanafi")}</option>
              <option className="rounded-lg dark:bg-zinc-200 px-4 dark:text-zinc-800 bg-zinc-800 outline-none"
                value="Shafi">{t("city.shafi")}</option>
            </select>

            <div className="grid grid-cols-2 lg:gap-0 gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Yesterday */}
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${activeIndex === 0 ? "bg-[#1e8e67] text-white" : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                    }`}
                  onClick={() => {
                    setActiveIndex(0);
                    setCurrentDate(subDays(new Date(), 1));
                  }}
                >
                  {t("CurrentNamazTime.yesterday")}
                </button>

                {/* Today */}
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${activeIndex === 1 ? "bg-[#1e8e67] text-white" : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                    }`}
                  onClick={() => {
                    setActiveIndex(1);
                    setCurrentDate(new Date());
                  }}
                >
                  {t("CurrentNamazTime.today")}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {/* Tomorrow */}
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${activeIndex === 2 ? "bg-[#1e8e67] text-white" : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                    }`}
                  onClick={() => {
                    setActiveIndex(2);
                    setCurrentDate(addDays(new Date(), 1));
                  }}
                >
                  {t("CurrentNamazTime.tomorrow")}
                </button>

                {/* Monthly */}
                <button
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg ${activeIndex === 3 ? "bg-[#1e8e67] text-white" : "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-50"
                    }`}
                  onClick={() => {
                    setActiveIndex(3);
                  }}
                >
                  {t("CurrentNamazTime.monthly")}
                </button>
              </div>
            </div>

          </div>

          <div className="lg:text-right text-center lg:pt-0 pt-3">
            <h2 className="text-xl font-semibold ">
              {country ? `${city}, ${country}` : "Loading..."}
            </h2>
            <p className="font-medium ">
              {prayerTimes[activeIndex]?.date.hijri || ""}
            </p>
            <p className="font-semibold text-lg">
              {prayerTimes[activeIndex]?.date.gregorian
                ? (() => {
                  const gregorian = prayerTimes[activeIndex]?.date.gregorian;
                  const [, month, day, year] = gregorian.split(" ");
                  return `${day} ${month} ${year}`;
                })()
                : ""}
            </p>
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
              modules={[Navigation]}>
              {prayerTimes.map((day, index) => (
                <SwiperSlide key={index}>
                  <div className="grid lg:grid-cols-6 grid-cols-2 gap-4 p-4">
                    {day?.prayers.map((prayer: { name: string; time: string; icon: any }, prayerIndex: number) => (
                      <div key={prayerIndex} className={`flex flex-col items-center justify-center py-4 rounded-lg 
                    ${prayer.name === day?.nextPrayer?.name ? "bg-[#1e8e67] text-white" : "bg-background border border-muted text-zinc-900 dark:text-zinc-100"}`}>

                        <div className="flex justify-between items-center mx-auto font-medium">
                          <div className="lg:pr-16 pr-8 text-lg">{prayer.name}</div>{prayer.icon}
                        </div>
                        <p className="text-lg font-semibold pt-2">{prayer.time}</p>
                        {prayer.name === day?.nextPrayer?.name && nextPrayerCountdown && (
                          <p className="text-sm ">{nextPrayerCountdown}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              <div className="flex justify-center items-center gap-2">
                <button aria-label="prevBtn" className="z-10 p-2 bg-[#1e8e67] text-zinc-100 rounded-full shadow-lg transition"
                  id="prevBtn"> <FaArrowLeft size={24} /></button>

                <button aria-label="nextBtn" className="z-10 p-2 bg-[#1e8e67] text-zinc-100 rounded-full shadow-lg transition"
                  id="nextBtn"><FaArrowRight size={24} /></button>
              </div>
            </Swiper>

          </div>
        ) : (
          <MonthlyNamazTimings />
        )}



      </div>
    </div>
  );
}

export default DateTimingDisplay;

function differenceInSeconds(date1: Date, date2: Date): number {
  return Math.floor((date1.getTime() - date2.getTime()) / 1000);
}
