import React from 'react'
import MadinaPage from './MadinaPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Regardez Madina TV en direct – Global Salah`;
      description = `Regardez Madina TV en direct pour une couverture 24h/24 de la Mosquée du Prophète (Masjid an-Nabawi). Vivez la sérénité de la mosquée avec des prières et des sermons en direct.`;
      break;

    case 'ru':
      title = `Смотрите прямой эфир Мадина ТВ - Глобальный Салах`;
      description = `Смотрите на Madina TV круглосуточные репортажи из мечети Пророка (Масджид ан-Набави). Ощутите спокойствие мечети во время молитв и проповедей в прямом эфире.`;
      break;

    case 'ar':
      title = `شاهد قناة المدينة مباشر – جلوبال صلاح`;
      description = `شاهد قناة المدينة على الهواء مباشرة لتغطية مسجد النبي ﷺ على مدار الساعة. عِش روحانية المسجد النبوي الشريف مع الصلوات والخطب المباشرة.`;
      break;

    case 'es':
      title = `Ver Madina TV en Vivo – Global Salah`;
      description = `Transmite en vivo Madina TV para una cobertura continua de Masjid an-Nabawi. Vive la serenidad de la Mezquita del Profeta con oraciones y sermones en directo.`;
      break;

    case 'zh-CN':
      title = `在线观看Madina电视 – 全球萨拉赫`;
      description = `全天候直播Madina电视，覆盖先知清真寺（Masjid an-Nabawi）。体验先知清真寺的宁静，观看实时祈祷和讲道。`;
      break;

    case 'tr':
      title = `Madina TV'yi Canlı İzle – Global Salah`;
      description = `Madina TV'yi 7/24 canlı yayınla takip edin, Peygamber Camii'nin (Masjid an-Nabawi) kapsamlı yayını için. Canlı dualar ve vaazlarla caminin huzurunu yaşayın.`;
      break;

    case 'de':
      title = `Madina TV Live Sehen – Global Salah`;
      description = `Streamen Sie Madina TV live für eine 24/7-Berichterstattung von der Moschee des Propheten (Masjid an-Nabawi). Erleben Sie die Ruhe der Moschee mit Live-Gebeten und Predigten.`;
      break;

    case 'pt':
      title = `Assista Madina TV Ao Vivo – Global Salah`;
      description = `Transmita Madina TV ao vivo para cobertura 24 horas da Mesquita do Profeta (Masjid an-Nabawi). Experimente a serenidade da mesquita com orações e sermões ao vivo.`;
      break;

    case 'ur':
      title = `مدینہ ٹی وی براہِ راست دیکھیں – گلوبل صلاح`;
      description = `مدینہ ٹی وی کو 24/7 براہِ راست دیکھیں، مسجد نبوی ﷺ کی مکمل کوریج کے لیے۔ براہِ راست نمازوں اور خطبات کے ساتھ مسجد کی روحانیت کا تجربہ کریں۔`;
      break;

    default:
      title = `Watch Madina TV Live – Global Salah`;
      description = `Stream Madina TV live for 24/7 coverage of Masjid an-Nabawi. Experience the serenity of the Prophet’s Mosque with live prayers and sermons.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/madina-tv`,
      en: `https://www.globalsalah.com/en/madina-tv`,
      fr: `https://www.globalsalah.com/fr/madina-tv`,
      ar: `https://www.globalsalah.com/ar/madina-tv`,
      es: `https://www.globalsalah.com/es/madina-tv`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/madina-tv`,
      tr: `https://www.globalsalah.com/tr/madina-tv`,
      de: `https://www.globalsalah.com/de/madina-tv`,
      pt: `https://www.globalsalah.com/pt/madina-tv`,
      ur: `https://www.globalsalah.com/ur/madina-tv`,
      ru: `https://www.globalsalah.com/ru/madina-tv`,
      'x-default': `https://www.globalsalah.com/en/madina-tv`,
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
        <MadinaPage/>
    </div>
  )
}

export default page