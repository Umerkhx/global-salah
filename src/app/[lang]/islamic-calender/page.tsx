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
    case 'fr':
      title = `Исламский календарь - Глобальный салах`;
      description = `Оставайтесь организованными с исламским календарем Глобальный салах. Найдите важные исламские даты, время ежемесячных молитв и ключевые события, чтобы следить за своим духовным путем.`;
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

    case 'tr':
      title = `İslami Takvim – Global Salah`;
      description = `Global Salah İslami Takvimi ile düzenli kalın. Önemli İslami tarihleri, aylık namaz vakitlerini ve ruhani yolculuğunuzu takip etmek için önemli etkinlikleri bulun.`;
      break;

    case 'de':
      title = `Islamischer Kalender – Global Salah`;
      description = `Bleiben Sie organisiert mit dem Islamischen Kalender von Global Salah. Finden Sie wichtige islamische Daten, monatliche Gebetszeiten und wichtige Ereignisse, um Ihre spirituelle Reise zu verfolgen.`;
      break;

    case 'pt':
      title = `Calendário Islâmico – Global Salah`;
      description = `Mantenha-se organizado com o Calendário Islâmico da Global Salah. Encontre datas importantes do Islã, horários mensais de oração e eventos-chave para acompanhar sua jornada espiritual.`;
      break;

    case 'ur':
      title = `اسلامی کیلنڈر – گلوبل صلاح`;
      description = `گلوبل صلاح کے اسلامی کیلنڈر کے ساتھ منظم رہیں۔ اہم اسلامی تاریخیں، ماہانہ نماز کے اوقات اور روحانی سفر کو جاری رکھنے کے لیے اہم مواقع تلاش کریں۔`;
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
      tr: `https://www.globalsalah.com/tr/islamic-calendar`,
      de: `https://www.globalsalah.com/de/islamic-calendar`,
      pt: `https://www.globalsalah.com/pt/islamic-calendar`,
      ur: `https://www.globalsalah.com/ur/islamic-calendar`,
      ru: `https://www.globalsalah.com/ru/islamic-calendar`,
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
