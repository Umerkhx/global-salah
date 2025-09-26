"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Banner } from "./Banner";
import { PrayerTimesTable } from "./PrayerTimeTable";
import { CountryInfo } from "./CountryInfo";
import CustomSkeleton from "@/components/ui/CustomSkeleton";
import Link from "next/link";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { timezoneMapping } from "../timzone";
import { urlSplitter } from "@/lib";

type CityPrayerTimes = {
  name: string;
  times: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
};
interface PrayerTimesTableProps {
  country: string;
  timezone: string;
}

type CountryData = {
  timezones: string[];
  countryCode: string; // ISO country code
  cities: CityPrayerTimes[];
  name: string;
  timezone: string;
  bannerImage: string;
};


export default function CountryPage() {
  const pathname = usePathname();
  let extracted = "";
  const pathParts = pathname.split("/");
  if (pathParts[1] === "countries") {
    extracted = pathParts[2]?.toLowerCase();
  } else if (pathParts[2] === "countries") {
    extracted = pathParts[3]?.toLowerCase();
  }
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<string>("");
    const lang = urlSplitter(pathname);
  
  const router = useRouter();

  const { t } = useTranslation("country")

  useEffect(() => {
    localStorage.setItem("loading", "true");
    setIsLoading(true);

    const timer = setTimeout(() => {
      localStorage.setItem("loading", "false");
      setIsLoading(false); // This will now execute AFTER 2 seconds
    }, 800);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);


  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${extracted.replaceAll("-", " ")}?fullText=true`
        );

        if (!response.ok) {
          router.push(`/${lang}`)
          throw new Error("Country not found");
        }

        const data = await response.json();
        const rawTimezone = data[0].timezones?.[0];

        if (!rawTimezone || typeof rawTimezone !== "string") {
          throw new Error("Invalid timezone data");
        }

        let mappedTimezone: string;
        const countryData: CountryData = {
          countryCode: data[0].cca2,
          name: data[0].name.common,
          timezone: "",
          bannerImage: data[0].flags.svg,
          cities: [],
          timezones: []
        };

        if (data[0].name.common === "United States") {
          mappedTimezone = "US/Eastern"; // Default to Eastern Time
          countryData.timezones = ["US/Eastern", "US/Central", "US/Mountain", "US/Pacific"];
        } else if (data[0].name.common === "Australia") {
          mappedTimezone = "Australia/Sydney"; // Default to Sydney Time
          countryData.timezones = ["Australia/Sydney", "Australia/Adelaide", "Australia/Perth", "Australia/Melbourne", "Australia/Canberra", "Australia/Darwin", "Australia/Brisbane", "Australia/Hobart"];
        } else if (data[0].name.common === "Canada") {
          mappedTimezone = "America/Toronto"; // Default to Eastern Time
          countryData.timezones = ["America/Toronto", "America/Edmonton", "America/Vancouver"];
        } else if (data[0].name.common === "Brazil") {
          mappedTimezone = "America/Sao_Paulo"; // Default to Sao Paulo Time
          countryData.timezones = ["America/Sao_Paulo", "America/Manaus", "America/Cuiaba", "America/Fortaleza"];
        } else if (data[0].name.common === "Russia") {
          mappedTimezone = "Europe/Moscow"; // Default to Moscow Time
          countryData.timezones = ["Europe/Moscow", "Asia/Yekaterinburg", "Asia/Novosibirsk", "Asia/Vladivostok"];
        } else if (data[0].name.common === "China") {
          mappedTimezone = "Asia/Shanghai"; // Default to Shanghai Time
          countryData.timezones = ["Asia/Shanghai", "Asia/Urumqi"];
        } else if (data[0].name.common === "India") {
          mappedTimezone = "Asia/Kolkata"; // Default to Kolkata Time
          countryData.timezones = ["Asia/Kolkata"];
        } else if (data[0].name.common === "Mexico") {
          mappedTimezone = "America/Mexico_City"; // Default to Mexico City Time
          countryData.timezones = ["America/Mexico_City", "America/Cancun", "America/Chihuahua", "America/Hermosillo"];
        } else if (data[0].name.common === "Indonesia") {
          mappedTimezone = "Asia/Jakarta"; // Default to Jakarta Time
          countryData.timezones = ["Asia/Jakarta", "Asia/Pontianak", "Asia/Makassar", "Asia/Jayapura"];
        } else if (data[0].name.common === "Argentina") {
          mappedTimezone = "America/Argentina/Buenos_Aires"; // Default to Buenos Aires Time
          countryData.timezones = ["America/Argentina/Buenos_Aires", "America/Argentina/Cordoba", "America/Argentina/Salta", "America/Argentina/Ushuaia"];
        } else if (data[0].name.common === "United Kingdom") {
          mappedTimezone = "Europe/London";
          countryData.timezones = ["Europe/London"];
        } else if (data[0].name.common === "France") {
          mappedTimezone = "Europe/Paris";
          countryData.timezones = ["Europe/Paris"];
        } else if (data[0].name.common === "Germany") {
          mappedTimezone = "Europe/Berlin";
          countryData.timezones = ["Europe/Berlin"];
        } else if (data[0].name.common === "Japan") {
          mappedTimezone = "Asia/Tokyo";
          countryData.timezones = ["Asia/Tokyo"];
        } else if (data[0].name.common === "South Korea") {
          mappedTimezone = "Asia/Seoul";
          countryData.timezones = ["Asia/Seoul"];
        } else if (data[0].name.common === "South Africa") {
          mappedTimezone = "Africa/Johannesburg";
          countryData.timezones = ["Africa/Johannesburg"];
        } else if (data[0].name.common === "New Zealand") {
          mappedTimezone = "Pacific/Auckland";
          countryData.timezones = ["Pacific/Auckland"];
        } else if (data[0].name.common === "Saudi Arabia") {
          mappedTimezone = "Asia/Riyadh";
          countryData.timezones = ["Asia/Riyadh"];
        } else if (data[0].name.common === "United Arab Emirates") {
          mappedTimezone = "Asia/Dubai";
          countryData.timezones = ["Asia/Dubai"];
        } else if (data[0].name.common === "Turkey") {
          mappedTimezone = "Europe/Istanbul";
          countryData.timezones = ["Europe/Istanbul"];
        } else if (data[0].name.common === "Italy") {
          mappedTimezone = "Europe/Rome";
          countryData.timezones = ["Europe/Rome"];
        } else if (data[0].name.common === "Spain") {
          mappedTimezone = "Europe/Madrid";
          countryData.timezones = ["Europe/Madrid"];
        } else if (data[0].name.common === "Nigeria") {
          mappedTimezone = "Africa/Lagos";
          countryData.timezones = ["Africa/Lagos"];
        } else if (data[0].name.common === "Afghanistan") {
          mappedTimezone = "Asia/Kabul";
          countryData.timezones = ["Asia/Kabul"];
        } else if (data[0].name.common === "Pakistan") {
          mappedTimezone = "Asia/Karachi";
          countryData.timezones = ["Asia/Karachi"];
        } else if (data[0].name.common === "Bangladesh") {
          mappedTimezone = "Asia/Dhaka";
          countryData.timezones = ["Asia/Dhaka"];
        } else if (data[0].name.common === "Philippines") {
          mappedTimezone = "Asia/Manila";
          countryData.timezones = ["Asia/Manila"];
        } else if (data[0].name.common === "Vietnam") {
          mappedTimezone = "Asia/Ho_Chi_Minh";
          countryData.timezones = ["Asia/Ho_Chi_Minh"];
        } else if (data[0].name.common === "Thailand") {
          mappedTimezone = "Asia/Bangkok";
          countryData.timezones = ["Asia/Bangkok"];
        } else if (data[0].name.common === "Malaysia") {
          mappedTimezone = "Asia/Kuala_Lumpur";
          countryData.timezones = ["Asia/Kuala_Lumpur"];
        } else if (data[0].name.common === "Singapore") {
          mappedTimezone = "Asia/Singapore";
          countryData.timezones = ["Asia/Singapore"];
        } else if (data[0].name.common === "Israel") {
          mappedTimezone = "Asia/Jerusalem";
          countryData.timezones = ["Asia/Jerusalem"];
        } else if (data[0].name.common === "Palestine") {
          mappedTimezone = "Asia/Gaza";
          countryData.timezones = ["Asia/Gaza", "Asia/Hebron"];
        } else if (data[0].name.common === "Netherlands") {
          mappedTimezone = "Europe/Amsterdam";
          countryData.timezones = ["Europe/Amsterdam"];
        } else if (data[0].name.common === "Sweden") {
          mappedTimezone = "Europe/Stockholm";
          countryData.timezones = ["Europe/Stockholm"];
        } else if (data[0].name.common === "Norway") {
          mappedTimezone = "Europe/Oslo";
          countryData.timezones = ["Europe/Oslo"];
        } else if (data[0].name.common === "Denmark") {
          mappedTimezone = "Europe/Copenhagen";
          countryData.timezones = ["Europe/Copenhagen"];
        } else if (data[0].name.common === "Finland") {
          mappedTimezone = "Europe/Helsinki";
          countryData.timezones = ["Europe/Helsinki"];
        } else if (data[0].name.common === "Switzerland") {
          mappedTimezone = "Europe/Zurich";
          countryData.timezones = ["Europe/Zurich"];
        } else if (data[0].name.common === "Austria") {
          mappedTimezone = "Europe/Vienna";
          countryData.timezones = ["Europe/Vienna"];
        } else if (data[0].name.common === "Belgium") {
          mappedTimezone = "Europe/Brussels";
          countryData.timezones = ["Europe/Brussels"];
        } else if (data[0].name.common === "Ireland") {
          mappedTimezone = "Europe/Dublin";
          countryData.timezones = ["Europe/Dublin"];
        } else if (data[0].name.common === "Portugal") {
          mappedTimezone = "Europe/Lisbon";
          countryData.timezones = ["Europe/Lisbon"];
        } else if (data[0].name.common === "Greece") {
          mappedTimezone = "Europe/Athens";
          countryData.timezones = ["Europe/Athens"];
        } else if (data[0].name.common === "Poland") {
          mappedTimezone = "Europe/Warsaw";
          countryData.timezones = ["Europe/Warsaw"];
        } else if (data[0].name.common === "Hungary") {
          mappedTimezone = "Europe/Budapest";
          countryData.timezones = ["Europe/Budapest"];
        } else if (data[0].name.common === "Romania") {
          mappedTimezone = "Europe/Bucharest";
          countryData.timezones = ["Europe/Bucharest"];
        } else if (data[0].name.common === "Bulgaria") {
          mappedTimezone = "Europe/Sofia";
          countryData.timezones = ["Europe/Sofia"];
        } else if (data[0].name.common === "Uruguay") {
          mappedTimezone = "America/Montevideo";
          countryData.timezones = ["America/Montevideo"];
        } else if (data[0].name.common === "Uzbekistan") {
          mappedTimezone = "Asia/Tashkent";
          countryData.timezones = ["Asia/Tashkent"];
        } else if (data[0].name.common === "Tajikistan") {
          mappedTimezone = "Asia/Dushanbe";
          countryData.timezones = ["Asia/Dushanbe"];
        } else if (data[0].name.common === "Ukraine") {
          mappedTimezone = "Europe/Kiev";
          countryData.timezones = ["Europe/Kiev"];
        } else if (data[0].name.common === "Turkey") {
          mappedTimezone = "Europe/Istanbul";
          countryData.timezones = ["Europe/Istanbul"];
        } else if (data[0].name.common === "South Africa") {
          mappedTimezone = "Africa/Johannesburg";
          countryData.timezones = ["Africa/Johannesburg"];
        } else if (data[0].name.common === "Nigeria") {
          mappedTimezone = "Africa/Lagos";
          countryData.timezones = ["Africa/Lagos"];
        } else if (data[0].name.common === "Kenya") {
          mappedTimezone = "Africa/Nairobi";
          countryData.timezones = ["Africa/Nairobi"];
        } else if (data[0].name.common === "Morocco") {
          mappedTimezone = "Africa/Casablanca";
          countryData.timezones = ["Africa/Casablanca"];
        } else if (data[0].name.common === "Algeria") {
          mappedTimezone = "Africa/Algiers";
          countryData.timezones = ["Africa/Algiers"];
        } else if (data[0].name.common === "Tunisia") {
          mappedTimezone = "Africa/Tunis";
          countryData.timezones = ["Africa/Tunis"];
        } else if (data[0].name.common === "Libya") {
          mappedTimezone = "Africa/Tripoli";
          countryData.timezones = ["Africa/Tripoli"];
        } else if (data[0].name.common === "Sudan") {
          mappedTimezone = "Africa/Khartoum";
          countryData.timezones = ["Africa/Khartoum"];
        } else if (data[0].name.common === "Ethiopia") {
          mappedTimezone = "Africa/Addis_Ababa";
          countryData.timezones = ["Africa/Addis_Ababa"];
        } else if (data[0].name.common === "Ghana") {
          mappedTimezone = "Africa/Accra";
          countryData.timezones = ["Africa/Accra"];
        } else if (data[0].name.common === "Senegal") {
          mappedTimezone = "Africa/Dakar";
          countryData.timezones = ["Africa/Dakar"];
        } else if (data[0].name.common === "Uganda") {
          mappedTimezone = "Africa/Kampala";
          countryData.timezones = ["Africa/Kampala"];
        } else if (data[0].name.common === "Tanzania") {
          mappedTimezone = "Africa/Dar_es_Salaam";
          countryData.timezones = ["Africa/Dar_es_Salaam"];
        } else if (data[0].name.common === "Zambia") {
          mappedTimezone = "Africa/Lusaka";
          countryData.timezones = ["Africa/Lusaka"];
        } else if (data[0].name.common === "Zimbabwe") {
          mappedTimezone = "Africa/Harare";
          countryData.timezones = ["Africa/Harare"];
        } else if (data[0].name.common === "Angola") {
          mappedTimezone = "Africa/Luanda";
          countryData.timezones = ["Africa/Luanda"];
        } else if (data[0].name.common === "Mozambique") {
          mappedTimezone = "Africa/Maputo";
          countryData.timezones = ["Africa/Maputo"];
        } else if (data[0].name.common === "Botswana") {
          mappedTimezone = "Africa/Gaborone";
          countryData.timezones = ["Africa/Gaborone"];
        } else if (data[0].name.common === "Namibia") {
          mappedTimezone = "Africa/Windhoek";
          countryData.timezones = ["Africa/Windhoek"];
        } else if (data[0].name.common === "Madagascar") {
          mappedTimezone = "Indian/Antananarivo";
          countryData.timezones = ["Indian/Antananarivo"];
        } else if (data[0].name.common === "Mauritius") {
          mappedTimezone = "Indian/Mauritius";
          countryData.timezones = ["Indian/Mauritius"];
        } else if (data[0].name.common === "Seychelles") {
          mappedTimezone = "Indian/Mahe";
          countryData.timezones = ["Indian/Mahe"];
        } else if (data[0].name.common === "Maldives") {
          mappedTimezone = "Indian/Maldives";
          countryData.timezones = ["Indian/Maldives"];
        } else if (data[0].name.common === "Sri Lanka") {
          mappedTimezone = "Asia/Colombo";
          countryData.timezones = ["Asia/Colombo"];
        } else if (data[0].name.common === "Nepal") {
          mappedTimezone = "Asia/Kathmandu";
          countryData.timezones = ["Asia/Kathmandu"];
        } else if (data[0].name.common === "Bhutan") {
          mappedTimezone = "Asia/Thimphu";
          countryData.timezones = ["Asia/Thimphu"];
        } else if (data[0].name.common === "Myanmar") {
          mappedTimezone = "Asia/Yangon";
          countryData.timezones = ["Asia/Yangon"];
        } else if (data[0].name.common === "Cambodia") {
          mappedTimezone = "Asia/Phnom_Penh";
          countryData.timezones = ["Asia/Phnom_Penh"];
        } else if (data[0].name.common === "Bahrain") {
          mappedTimezone = "Asia/Bahrain";
          countryData.timezones = ["Asia/Bahrain"];
        } else if (data[0].name.common === "Belize") {
          mappedTimezone = "America/Belize";
          countryData.timezones = ["America/Belize"];
        } else if (data[0].name.common === "Barbados") {
          mappedTimezone = "America/Barbados";
          countryData.timezones = ["America/Barbados"];
        } else if (data[0].name.common === "Belarus") {
          mappedTimezone = "Europe/Minsk";
          countryData.timezones = ["Europe/Minsk"];
        } else if (data[0].name.common === "Benin") {
          mappedTimezone = "Africa/Porto-Novo";
          countryData.timezones = ["Africa/Porto-Novo"];
        } else if (data[0].name.common === "Bolivia") {
          mappedTimezone = "America/La_Paz";
          countryData.timezones = ["America/La_Paz"];
        } else if (data[0].name.common === "Bosnia and Herzegovina") {
          mappedTimezone = "Europe/Sarajevo";
          countryData.timezones = ["Europe/Sarajevo"];
        } else if (data[0].name.common === "Czechia") {
          mappedTimezone = "Europe/Prague";
          countryData.timezones = ["Europe/Prague"];
        } else if (data[0].name.common === "Cyprus") {
          mappedTimezone = "Asia/Nicosia";
          countryData.timezones = ["Asia/Nicosia"];
        } else if (data[0].name.common === "Cuba") {
          mappedTimezone = "America/Havana";
          countryData.timezones = ["America/Havana"];
        } else if (data[0].name.common === "Croatia") {
          mappedTimezone = "Europe/Zagreb";
          countryData.timezones = ["Europe/Zagreb"];
        } else if (data[0].name.common === "Costa Rica") {
          mappedTimezone = "America/Costa_Rica";
          countryData.timezones = ["America/Costa_Rica"];
        } else if (data[0].name.common === "Comoros") {
          mappedTimezone = "Indian/Comoro";
          countryData.timezones = ["Indian/Comoro"];
        } else if (data[0].name.common === "Colombia") {
          mappedTimezone = "America/Bogota";
          countryData.timezones = ["America/Bogota"];
        } else if (data[0].name.common === "Chile") {
          mappedTimezone = "America/Santiago";
          countryData.timezones = ["America/Santiago"];
        } else if (data[0].name.common === "Chad") {
          mappedTimezone = "Africa/Ndjamena";
          countryData.timezones = ["Africa/Ndjamena"];
        } else if (data[0].name.common === "Central African Republic") {
          mappedTimezone = "Africa/Bangui";
          countryData.timezones = ["Africa/Bangui"];
        } else if (data[0].name.common === "Cameroon") {
          mappedTimezone = "Africa/Douala";
          countryData.timezones = ["Africa/Douala"];
        } else if (data[0].name.common === "Jamaica") {
          mappedTimezone = "America/Jamaica";
          countryData.timezones = ["America/Jamaica"];
        } else if (data[0].name.common === "Djibouti") {
          mappedTimezone = "Africa/Djibouti";
          countryData.timezones = ["Africa/Djibouti"];
        } else if (data[0].name.common === "Dominica") {
          mappedTimezone = "America/Dominica";
          countryData.timezones = ["America/Dominica"];
        } else if (data[0].name.common === "Dominican Republic") {
          mappedTimezone = "America/Santo_Domingo";
          countryData.timezones = ["America/Santo_Domingo"];
        } else if (data[0].name.common === "Ecuador") {
          mappedTimezone = "America/Guayaquil";
          countryData.timezones = ["America/Guayaquil"];
        } else if (data[0].name.common === "Egypt") {
          mappedTimezone = "Africa/Cairo";
          countryData.timezones = ["Africa/Cairo"];
        } else if (data[0].name.common === "El Salvador") {
          mappedTimezone = "America/El_Salvador";
          countryData.timezones = ["America/El_Salvador"];
        } else if (data[0].name.common === "Equatorial Guinea") {
          mappedTimezone = "Africa/Malabo";
          countryData.timezones = ["Africa/Malabo"];
        } else if (data[0].name.common === "Eritrea") {
          mappedTimezone = "Africa/Asmara";
          countryData.timezones = ["Africa/Asmara"];
        } else if (data[0].name.common === "Estonia") {
          mappedTimezone = "Europe/Tallinn";
          countryData.timezones = ["Europe/Tallinn"];
        } else if (data[0].name.common === "Eswatini") {
          mappedTimezone = "Africa/Mbabane";
          countryData.timezones = ["Africa/Mbabane"];
        } else if (data[0].name.common === "Fiji") {
          mappedTimezone = "Pacific/Fiji";
          countryData.timezones = ["Pacific/Fiji"];
        } else if (data[0].name.common === "Gabon") {
          mappedTimezone = "Africa/Libreville";
          countryData.timezones = ["Africa/Libreville"];
        } else if (data[0].name.common === "Gambia") {
          mappedTimezone = "Africa/Banjul";
          countryData.timezones = ["Africa/Banjul"];
        } else if (data[0].name.common === "Georgia") {
          mappedTimezone = "Asia/Tbilisi";
          countryData.timezones = ["Asia/Tbilisi"];
        } else if (data[0].name.common === "Grenada") {
          mappedTimezone = "America/Grenada";
          countryData.timezones = ["America/Grenada"];
        } else if (data[0].name.common === "Guatemala") {
          mappedTimezone = "America/Guatemala";
          countryData.timezones = ["America/Guatemala"];
        } else if (data[0].name.common === "Guyana") {
          mappedTimezone = "America/Guyana";
          countryData.timezones = ["America/Guyana"];
        } else if (data[0].name.common === "Haiti") {
          mappedTimezone = "America/Port-au-Prince";
          countryData.timezones = ["America/Port-au-Prince"];
        } else if (data[0].name.common === "Honduras") {
          mappedTimezone = "America/Tegucigalpa";
          countryData.timezones = ["America/Tegucigalpa"];
        } else if (data[0].name.common === "Iraq") {
          mappedTimezone = "Asia/Baghdad";
          countryData.timezones = ["Asia/Baghdad"];
        } else if (data[0].name.common === "Jordan") {
          mappedTimezone = "Asia/Amman";
          countryData.timezones = ["Asia/Amman"];
        } else if (data[0].name.common === "Kazakhstan") {
          mappedTimezone = "Asia/Almaty";
          countryData.timezones = ["Asia/Almaty"];
        } else if (data[0].name.common === "Kiribati") {
          mappedTimezone = "Pacific/Tarawa";
          countryData.timezones = ["Pacific/Tarawa"];
        } else if (data[0].name.common === "Kuwait") {
          mappedTimezone = "Asia/Kuwait";
          countryData.timezones = ["Asia/Kuwait"];
        } else if (data[0].name.common === "Kyrgyzstan") {
          mappedTimezone = "Asia/Bishkek";
          countryData.timezones = ["Asia/Bishkek"];
        } else if (data[0].name.common === "North Korea") {
          mappedTimezone = "Asia/Pyongyang";
          countryData.timezones = ["Asia/Pyongyang"];
        } else if (data[0].name.common === "Nauru") {
          mappedTimezone = "Pacific/Nauru";
          countryData.timezones = ["Pacific/Nauru"];
        } else if (data[0].name.common === "Nicaragua") {
          mappedTimezone = "America/Managua";
          countryData.timezones = ["America/Managua"];
        } else if (data[0].name.common === "Niger") {
          mappedTimezone = "Africa/Niamey";
          countryData.timezones = ["Africa/Niamey"];
        } else if (data[0].name.common === "North Macedonia") {
          mappedTimezone = "Europe/Skopje";
          countryData.timezones = ["Europe/Skopje"];
        } else if (data[0].name.common === "Laos") {
          mappedTimezone = "Asia/Vientiane";
          countryData.timezones = ["Asia/Vientiane"];
        } else if (data[0].name.common === "Latvia") {
          mappedTimezone = "Europe/Riga";
          countryData.timezones = ["Europe/Riga"];
        } else if (data[0].name.common === "Lebanon") {
          mappedTimezone = "Asia/Beirut";
          countryData.timezones = ["Asia/Beirut"];
        } else if (data[0].name.common === "Lesotho") {
          mappedTimezone = "Africa/Maseru";
          countryData.timezones = ["Africa/Maseru"];
        } else if (data[0].name.common === "Liberia") {
          mappedTimezone = "Africa/Monrovia";
          countryData.timezones = ["Africa/Monrovia"];
        } else if (data[0].name.common === "Liechtenstein") {
          mappedTimezone = "Europe/Vaduz";
          countryData.timezones = ["Europe/Vaduz"];
        } else if (data[0].name.common === "Lithuania") {
          mappedTimezone = "Europe/Vilnius";
          countryData.timezones = ["Europe/Vilnius"];
        } else if (data[0].name.common === "Luxembourg") {
          mappedTimezone = "Europe/Luxembourg";
          countryData.timezones = ["Europe/Luxembourg"];
        } else if (data[0].name.common === "Malawi") {
          mappedTimezone = "Africa/Blantyre";
          countryData.timezones = ["Africa/Blantyre"];
        } else if (data[0].name.common === "Malta") {
          mappedTimezone = "Europe/Malta";
          countryData.timezones = ["Europe/Malta"];
        } else if (data[0].name.common === "Marshall Islands") {
          mappedTimezone = "Pacific/Majuro";
          countryData.timezones = ["Pacific/Majuro"];
        } else if (data[0].name.common === "Micronesia") {
          mappedTimezone = "Pacific/Chuuk";
          countryData.timezones = ["Pacific/Chuuk"];
        } else if (data[0].name.common === "Moldova") {
          mappedTimezone = "Europe/Chisinau";
          countryData.timezones = ["Europe/Chisinau"];
        } else if (data[0].name.common === "Monaco") {
          mappedTimezone = "Europe/Monaco";
          countryData.timezones = ["Europe/Monaco"];
        } else if (data[0].name.common === "Mongolia") {
          mappedTimezone = "Asia/Ulaanbaatar";
          countryData.timezones = ["Asia/Ulaanbaatar"];
        } else if (data[0].name.common === "Montenegro") {
          mappedTimezone = "Europe/Podgorica";
          countryData.timezones = ["Europe/Podgorica"];
        } else if (data[0].name.common === "Oman") {
          mappedTimezone = "Asia/Muscat";
          countryData.timezones = ["Asia/Muscat"];
        } else if (data[0].name.common === "Palau") {
          mappedTimezone = "Pacific/Palau";
          countryData.timezones = ["Pacific/Palau"];
        } else if (data[0].name.common === "Panama") {
          mappedTimezone = "America/Panama";
          countryData.timezones = ["America/Panama"];
        } else if (data[0].name.common === "Papua New Guinea") {
          mappedTimezone = "Pacific/Port_Moresby";
          countryData.timezones = ["Pacific/Port_Moresby"];
        } else if (data[0].name.common === "Paraguay") {
          mappedTimezone = "America/Asuncion";
          countryData.timezones = ["America/Asuncion"];
        } else if (data[0].name.common === "Peru") {
          mappedTimezone = "America/Lima";
          countryData.timezones = ["America/Lima"];
        } else if (data[0].name.common === "Puerto Rico") {
          mappedTimezone = "America/Puerto_Rico";
          countryData.timezones = ["America/Puerto_Rico"];
        } else if (data[0].name.common === "Qatar") {
          mappedTimezone = "Asia/Qatar";
          countryData.timezones = ["Asia/Qatar"];
        } else if (data[0].name.common === "Rwanda") {
          mappedTimezone = "Africa/Kigali";
          countryData.timezones = ["Africa/Kigali"];
        } else if (data[0].name.common === "Saint Kitts and Nevis") {
          mappedTimezone = "America/St_Kitts";
          countryData.timezones = ["America/St_Kitts"];
        } else if (data[0].name.common === "Saint Lucia") {
          mappedTimezone = "America/St_Lucia";
          countryData.timezones = ["America/St_Lucia"];
        } else if (data[0].name.common === "Samoa") {
          mappedTimezone = "Pacific/Apia";
          countryData.timezones = ["Pacific/Apia"];
        } else if (data[0].name.common === "San Marino") {
          mappedTimezone = "Europe/San_Marino";
          countryData.timezones = ["Europe/San_Marino"];
        } else if (data[0].name.common === "Serbia") {
          mappedTimezone = "Europe/Belgrade";
          countryData.timezones = ["Europe/Belgrade"];
        } else if (data[0].name.common === "Slovakia") {
          mappedTimezone = "Europe/Bratislava";
          countryData.timezones = ["Europe/Bratislava"];
        } else if (data[0].name.common === "Slovenia") {
          mappedTimezone = "Europe/Ljubljana";
          countryData.timezones = ["Europe/Ljubljana"];
        } else if (data[0].name.common === "Solomon Islands") {
          mappedTimezone = "Pacific/Guadalcanal";
          countryData.timezones = ["Pacific/Guadalcanal"];
        } else if (data[0].name.common === "Somalia") {
          mappedTimezone = "Africa/Mogadishu";
          countryData.timezones = ["Africa/Mogadishu"];
        } else if (data[0].name.common === "South Korea") {
          mappedTimezone = "Asia/Seoul";
          countryData.timezones = ["Asia/Seoul"];
        } else if (data[0].name.common === "Suriname") {
          mappedTimezone = "America/Paramaribo";
          countryData.timezones = ["America/Paramaribo"];
        } else if (data[0].name.common === "Syria") {
          mappedTimezone = "Asia/Damascus";
          countryData.timezones = ["Asia/Damascus"];
        } else if (data[0].name.common === "Taiwan") {
          mappedTimezone = "Asia/Taipei";
          countryData.timezones = ["Asia/Taipei"];
        } else if (data[0].name.common === "Tokelau") {
          mappedTimezone = "Pacific/Fakaofo";
          countryData.timezones = ["Pacific/Fakaofo"];
        } else if (data[0].name.common === "Tonga") {
          mappedTimezone = "Pacific/Tongatapu";
          countryData.timezones = ["Pacific/Tongatapu"];
        } else if (data[0].name.common === "Trinidad and Tobago") {
          mappedTimezone = "America/Port_of_Spain";
          countryData.timezones = ["America/Port_of_Spain"];
        } else if (data[0].name.common === "Turkmenistan") {
          mappedTimezone = "Asia/Ashgabat";
          countryData.timezones = ["Asia/Ashgabat"];
        } else if (data[0].name.common === "Tuvalu") {
          mappedTimezone = "Pacific/Funafuti";
          countryData.timezones = ["Pacific/Funafuti"];
        } else if (data[0].name.common === "Vanuatu") {
          mappedTimezone = "Pacific/Efate";
          countryData.timezones = ["Pacific/Efate"];
        } else if (data[0].name.common === "Vatican City") {
          mappedTimezone = "Europe/Vatican";
          countryData.timezones = ["Europe/Vatican"];
        }
        else if (data[0].name.common === "Venezuela") {
          mappedTimezone = "America/Caracas";
          countryData.timezones = ["America/Caracas"];
        }
        else if (data[0].name.common === "Yemen") {
          mappedTimezone = "Asia/Aden";
          countryData.timezones = ["Asia/Aden"];
        }
        else if (data[0].name.common === "Azerbaijan") {
          mappedTimezone = "Asia/Baku";
          countryData.timezones = ["Asia/Baku"];
        } else if (data[0].name.common === "Armenia") {
          mappedTimezone = "Asia/Yerevan";
          countryData.timezones = ["Asia/Yerevan"];
        } else if (data[0].name.common === "Antigua and Barbuda") {
          mappedTimezone = "America/Antigua";
          countryData.timezones = ["America/Antigua"];
        } else if (data[0].name.common === "Andorra") {
          mappedTimezone = "Europe/Andorra";
          countryData.timezones = ["Europe/Andorra"];
        } else if (data[0].name.common === "American Samoa") {
          mappedTimezone = "Pacific/Pago_Pago";
          countryData.timezones = ["Pacific/Pago_Pago"];
        } else if (data[0].name.common === "Bahamas") {
          mappedTimezone = "America/Nassau";
          countryData.timezones = ["America/Nassau"];
        } else if (data[0].name.common === "Iran") {
          mappedTimezone = "Asia/Tehran";
          countryData.timezones = ["Asia/Tehran"];
        } else if (data[0].name.common === "Albania") {
          mappedTimezone = "Europe/Tirane";
          countryData.timezones = ["Europe/Tirane"];
        }
        else {
          const timezoneEntry = timezoneMapping.find(tz => tz.zone === rawTimezone);
          mappedTimezone = timezoneEntry ? timezoneEntry.zone : rawTimezone;
          countryData.timezones = [mappedTimezone];
        }

        countryData.timezone = mappedTimezone;


        setCountry(countryData);

        localStorage.setItem("countryData", JSON.stringify(countryData));


      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (extracted) {
      fetchCountryData();
    }
  }, [extracted]);


  useEffect(() => {
    if (country?.timezone) {
      const updateTime = () => {
        try {
          const now = new Date();
          const options: Intl.DateTimeFormatOptions = {
            timeZone: country.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          };
          const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);
          setTime(formattedTime);
        } catch (error) {
          console.error("Error updating time:", error);
        }
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [country?.timezone]);

  if (loading) {
    return <CustomSkeleton />;
  }

  if (!country) {
    return null;
  }
  const isArabic = pathname.split("/")[1]

  const flagUrl = `https://flagcdn.com/w320/${country.countryCode.toLowerCase()}.png`;


  return (
    <>
      {isLoading ? <CustomSkeleton /> :
        (<div className="bg-background">
          <Banner image={country.bannerImage} />

          <main className="mx-auto px-4 py-8 -mt-32 relative z-10">
            <div className="bg-background rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <CountryInfo
                  name={country.name}
                  flagUrl={flagUrl}
                  timezone={country.timezone} 
                  time={time} 
                />
              </div>

              <div className="">

                {isArabic === "ar" ? (<div className={`mb-6 flex items-center text-sm text-muted-foreground justify-end text-right `}>

                  <span className="text-foreground">{country.name}</span>
                  <ChevronLeft className="h-4 w-4 mx-1" />
                  <Link href="/countries" className="hover:text-green-500">
                    {t("navigation.countries")}
                  </Link>
                  <ChevronLeft className="h-4 w-4 mx-1" />
                  <Link href="/" className="hover:text-green-500">
                    {t("navigation.home")}
                  </Link>
                </div>) :
                  (<div className={`mb-6 flex items-center text-sm text-muted-foreground `}>
                    <Link href="/" className="hover:text-green-500">
                      {t("navigation.home")}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link href="/countries" className="hover:text-green-500">
                      {t("navigation.countries")}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground">{country.name}</span>
                  </div>)
                }

                {isArabic === "ar" ? (
                  <h2 className="lg:text-2xl text-xl font-bold lg:text-right text-center">
                    <span className="capitalize">{country.name}</span> {t("country.title")}
                  </h2>
                ) : (
                  <h2 className="lg:text-2xl text-xl font-bold lg:text-left text-center">
                    {t("country.title")} <span className="capitalize">{country.name}</span>
                  </h2>
                )}

                <PrayerTimesTable country={country.name} countryCode={country.countryCode} timezone={country.timezone} timezoneMapping={timezoneMapping} />
              </div>

              {isArabic === "ar" ? (
                <h2 className="text-2xl md:text-4xl font-bold lg:text-right text-center text-blue-900 dark:text-zinc-100 pt-8 pb-1 ">
                  {country.name}  {t("country.subheading_1")}
                </h2>
              ) : (
                <h2 className="text-2xl md:text-4xl font-bold lg:text-left text-center text-blue-900 dark:text-zinc-100 pt-8 pb-1">
                  {t("country.subheading_1")} {country.name}
                </h2>
              )}

              <p className="mt-1 text-muted-foreground lg:text-base text-sm pb-3 lg:text-left text-center">
                {t("country.subparagraph_1")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:my-10 mt-10 max-w-6xl mx-auto">
                {/* First Column */}
                <div className="bg-transparent border border-muted rounded-lg shadow-md p-6">
                  <h3 className="text-xl lg:text-left text-center font-semibold text-blue-900 dark:text-zinc-100 ">{t("country.subheading_2")}</h3>
                  <p className="mt-4 text-muted-foreground lg:text-left text-center text-sm">
                    {t("country.subparagraph_2")}
                  </p>
                </div>
                {/* Second Column */}
                <div className="bg-transparent border border-muted rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-zinc-100 lg:text-left text-center">{t("country.subheading_3")}</h3>
                  <p className="mt-4 text-muted-foreground lg:text-left text-center text-sm">
                    {t("country.subparagraph_3")}
                  </p>
                </div>
                {/* Third Column */}
                <div className="bg-transparent border border-muted rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-zinc-100 lg:text-left text-center">{t("country.subheading_4")}</h3>
                  <p className="mt-4 text-muted-foreground lg:text-left text-center text-sm">
                    {t("country.subparagraph_4")}
                  </p>
                </div>
                {/* Fourth Column */}
                <div className="bg-transparent border border-muted rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-zinc-100 lg:text-left text-center">{t("country.subheading_5")}</h3>
                  <p className="mt-4 text-muted-foreground lg:text-left text-center text-sm">
                    {t("country.subparagraph_5")}
                  </p>
                </div>

              </div>

            </div>
          </main>
        </div>)}
    </>
  );
}