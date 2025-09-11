"use client";
import { useTranslation } from "@/hooks/useTranslation";
import moment from "moment-hijri";
import React, { useEffect, useState } from "react";

function HijirDivider() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({ city: "", country: "" });
  const [currentHijriDate, setCurrentHijriDate] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;
    setPath(pathname);
  }, []);

  useEffect(() => {
    const hijriDate = moment().subtract(1, "days");
    if (path.includes("/ar")) {
      moment.locale("ar-SA");
      setCurrentHijriDate(hijriDate.format("iD iMMMM, iYYYY"));
    } else {
      moment.locale("en");
      setCurrentHijriDate(hijriDate.format("iD iMMMM, iYYYY"));
    }
  }, [path]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("https://pro.ip-api.com/json/?key=kHg84ht9eNasCRN")
      .then((response) => response.json())
      .then((data) => {
        setLocation({ city: data.city, country: data.country });
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  }, []);

  const formattedDate = currentTime.toLocaleDateString(
    path.includes("/ar") ? "ar-EG" : "en-US",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { t } = useTranslation("HijriDivider");

  return (
    <div className="w-full max-w-7xl mx-auto p-6 scale-90 lg:scale-100">
      <div className="relative rounded-2xl overflow-hidden bg-black py-10 flex items-center justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-800 to-black" />

        {/* Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px]">
          <div className="w-full h-full rounded-[50%] bg-gradient-to-t from-emerald-700/70 to-transparent blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-[40px] bg-white/80 blur-lg rounded-full" />
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold animate-fade-in drop-shadow-lg">
            {t("HijriDivider.dividertitle")}
          </h1>

          {location.city && location.country && (
            <h2 className="text-lg md:text-xl font-medium animate-fade-in drop-shadow-md">
              {location.city}, {location.country}
            </h2>
          )}

          <div className="grid lg:grid-cols-3 gap-4 pt-6">
            {[
              {
                label: t("HijriDivider.currenttime"),
                value: formattedTime,
              },
              {
                label: t("HijriDivider.hijrititle"),
                value: currentHijriDate,
              },
              {
                label: t("HijriDivider.currentdate"),
                value: formattedDate,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 transition-all duration-300 rounded-lg p-4 w-full max-w-[220px] mx-auto shadow-lg hover:shadow-xl hover:scale-105"
              >
                <h3 className="text-lg font-semibold drop-shadow-md">
                  {item.label}
                </h3>
                <div className="text-base mt-1 drop-shadow-sm">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HijirDivider;
