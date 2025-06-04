import React from 'react'
import RamadanCalender from './RamadanCalender'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calendrier du Ramadan 2025 – Horaires de Sehri et Iftar`;
      description = `Restez informé grâce au calendrier du Ramadan 2025 avec les horaires quotidiens de Sehri et d'Iftar. Planifiez votre jeûne avec des heures de prière précises pour un mois béni.`;
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
    default:
      title = `Ramadan Calendar 2025 – Sehri & Iftar Timings`;
      description = `Stay updated with the Ramadan 2025 calendar, featuring daily Sehri and Iftar timings. Plan your fasting schedule with accurate prayer times for a blessed month.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/ramadan-calendar`,
      en: `https://www.globalsalah.com/en/ramadan-calendar`,
      fr: `https://www.globalsalah.com/fr/ramadan-calendar`,
      ar: `https://www.globalsalah.com/ar/ramadan-calendar`,
      es: `https://www.globalsalah.com/es/ramadan-calendar`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/ramadan-calendar`,
      'x-default': `https://www.globalsalah.com/en/ramadan-calendar`,
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




function page() {
  return (
    <div>
        <RamadanCalender/>
    </div>
  )
}

export default page