import { Metadata } from "next";
import IslamicCalendar from "./IslamicCalender"



export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calendrier Islamique – Global Salah`;
      description = `Restez organisé avec le calendrier islamique de Global Salah. Trouvez les dates importantes de l’Islam, les horaires mensuels de prière et les événements clés pour suivre votre parcours spirituel.`;
      break;

    case 'ar':
      title = `التقويم الإسلامي – جلوبال صلاح`;
      description = `ابق منظمًا مع التقويم الإسلامي من جلوبال صلاح. اكتشف التواريخ الإسلامية المهمة، وجدول الصلاة الشهري، والأحداث الرئيسية لمتابعة رحلتك الروحية.`;
      break;

    case 'es':
      title = `Calendario Islámico – Global Salah`;
      description = `Organízate con el calendario islámico de Global Salah. Encuentra fechas islámicas importantes, horarios mensuales de oración y eventos clave para seguir tu camino espiritual.`;
      break;

    case 'zh-CN':
      title = `伊斯兰日历 – 全球萨拉赫`;
      description = `使用 全球萨拉赫 的伊斯兰日历保持有序。查找重要的伊斯兰日期、每月祈祷时间表和关键事件，跟踪您的精神旅程。`;
      break;

    default:
      title = `Islamic Calendar – Global Salah`;
      description = `Stay organized with the Global Salah Islamic Calendar. Find important Islamic dates, monthly prayer schedules, and key events to keep track of your spiritual journey.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/islamic-calendar`,
      en: `https://www.globalsalah.com/en/islamic-calendar`,
      fr: `https://www.globalsalah.com/fr/islamic-calendar`,
      ar: `https://www.globalsalah.com/ar/islamic-calendar`,
      es: `https://www.globalsalah.com/es/islamic-calendar`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/islamic-calendar`,
      'x-default': `https://www.globalsalah.com/en/islamic-calendar`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}





export default function page() {


  return (

    <IslamicCalendar />
  )
}
