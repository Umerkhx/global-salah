import React from 'react'
import RamadanCalender from './RamadanCalender'


export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calendrier du Ramadan 2025 – Horaires de Sehri et Iftar`;
      description = `Restez informé grâce au calendrier du Ramadan 2025 avec les horaires quotidiens de Sehri et d'Iftar. Planifiez votre jeûne avec des heures de prière précises pour un mois béni.`;
      break;
    case 'ru':
      title = `Календарь Рамадана на 2025 год - время сехри и ифтара`;
      description = `Будьте в курсе событий благодаря календарю Рамадана на 2025 год с ежедневным временем сехри и ифтара. Планируйте свой пост с точным временем молитв для благословенного месяца.`;
      break;
    case 'ar':
      title = `تقويم رمضان 2025 – مواعيد السحور والإفطار`;
      description = `ابقَ على اطلاع بتقويم رمضان 2025 الذي يحتوي على مواعيد السحور والإفطار اليومية. نظّم جدول صيامك بمواقيت الصلاة الدقيقة لشهر مبارك.`;
      break;
    case 'es':
      title = `Calendario de Ramadán 2025 – Horarios de Sehri e Iftar`;
      description = `Manténgase informado con el calendario de Ramadán 2025, con horarios diarios de Sehri e Iftar. Planifique su ayuno con tiempos precisos de oración para un mes bendecido.`;
      break;
    case 'zh-CN':
      title = `2025年斋月日历 – Sehri 和 Iftar 时间`;
      description = `通过2025年斋月日历获取每日 Sehri 和 Iftar 时间的最新信息。用准确的祷告时间规划您的斋戒，迎接一个福气满满的月份。`;
      break;
    case 'tr':
      title = `2025 Ramazan Takvimi – Sehri ve İftar Saatleri`;
      description = `Günlük Sehri ve İftar saatlerini içeren 2025 Ramazan Takvimi ile güncel kalın. Kutsal bir ay için doğru namaz vakitleriyle orucunuzu planlayın.`;
      break;
    case 'de':
      title = `Ramadan Kalender 2025 – Sehri & Iftar Zeiten`;
      description = `Bleiben Sie mit dem Ramadan Kalender 2025 auf dem Laufenden, der tägliche Sehri- und Iftar-Zeiten enthält. Planen Sie Ihren Fastenplan mit genauen Gebetszeiten für einen gesegneten Monat.`;
      break;
    case 'pt':
      title = `Calendário do Ramadã 2025 – Horários de Sehri e Iftar`;
      description = `Mantenha-se atualizado com o calendário do Ramadã 2025, com horários diários de Sehri e Iftar. Planeje seu jejum com horários de oração precisos para um mês abençoado.`;
      break;
    case 'ur':
      title = `رمضان کیلنڈر 2025 – سحری اور افطار کے اوقات`;
      description = `روزانہ سحری اور افطار کے اوقات کے ساتھ رمضان 2025 کیلنڈر سے باخبر رہیں۔ بابرکت مہینے کے لیے درست نماز کے اوقات کے ساتھ اپنا روزہ شیڈول بنائیں۔`;
      break;
    default:
      title = `Ramadan Calendar 2025 – Sehri & Iftar Timings`;
      description = `Stay updated with the Ramadan 2025 calendar, featuring daily Sehri and Iftar timings. Plan your fasting schedule with accurate prayer times for a blessed month.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/ramadan-calendar`,
      en: `https://globalsalah.com/en/ramadan-calendar`,
      fr: `https://globalsalah.com/fr/ramadan-calendar`,
      ar: `https://globalsalah.com/ar/ramadan-calendar`,
      es: `https://globalsalah.com/es/ramadan-calendar`,
      'zh-CN': `https://globalsalah.com/zh-CN/ramadan-calendar`,
      tr: `https://globalsalah.com/tr/ramadan-calendar`,
      de: `https://globalsalah.com/de/ramadan-calendar`,
      pt: `https://globalsalah.com/pt/ramadan-calendar`,
      ur: `https://globalsalah.com/ur/ramadan-calendar`,
      ru: `https://globalsalah.com/ru/ramadan-calendar`,
      'x-default': `https://globalsalah.com/en/ramadan-calendar`,
    },
    robots: {
    index: false,
      follow: false,
      nocache: false,
      googleBot: {
    index: false,
      follow: false,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}





function page() {
  return (
    <div>
        <RamadanCalender/>
    </div>
  )
}

export default page