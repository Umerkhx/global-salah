import React from 'react'
import MakkahPage from './MakkahPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Regardez Makkah TV en direct – Global Salah`;
      description = `Regardez Makkah TV en direct pour une couverture continue de la Mosquée al-Haram. Suivez les prières, les sermons et l’atmosphère spirituelle de la Kaaba à tout moment.`;
      break;

    case 'ru':
      title = `Смотреть Мекка ТВ в прямом эфире - Глобальный Салах`;
      description = `Смотрите прямой эфир Мекка ТВ для непрерывного освещения мечети аль-Харам. Следите за молитвами, проповедями и духовной атмосферой Каабы в любое время.`;
      break;

    case 'ar':
      title = `شاهد قناة مكة مباشر – جلوبال صلاح`;
      description = `شاهد قناة مكة مباشر لتغطية مستمرة من المسجد الحرام. تابع الصلوات والخطب والأجواء الروحانية حول الكعبة المشرفة في أي وقت.`;
      break;

    case 'es':
      title = `Ver Makkah TV en Vivo – Global Salah`;
      description = `Transmite en vivo Makkah TV para cobertura continua de Masjid al-Haram. Mira oraciones, sermones y la atmósfera espiritual de la Kaaba en cualquier momento.`;
      break;

    case 'zh-CN':
      title = `观看麦加电视直播 – 全球萨拉赫`;
      description = `在线观看麦加电视，持续直播圣寺（Masjid al-Haram）的精彩内容。随时观看祈祷、讲道和圣洁的卡巴氛围。`;
      break;

    case 'tr':
      title = `Makkah TV Canlı Yayın – Global Salah`;
      description = `Makkah TV'yi canlı izleyin, Mescid-i Haram'ın sürekli yayını için. Namazları, vaazları ve Kabe'nin manevi atmosferini her an takip edin.`;
      break;

    case 'de':
      title = `Makkah TV Live ansehen – Global Salah`;
      description = `Streamen Sie Makkah TV live für eine kontinuierliche Berichterstattung von der Masjid al-Haram. Sehen Sie Gebete, Predigten und die spirituelle Atmosphäre der Heiligen Kaaba jederzeit.`;
      break;

    case 'pt':
      title = `Assista Makkah TV ao Vivo – Global Salah`;
      description = `Assista ao vivo Makkah TV para cobertura contínua da Mesquita al-Haram. Veja orações, sermões e a atmosfera espiritual da Kaaba a qualquer momento.`;
      break;

    case 'ur':
      title = `مکہ ٹی وی براہ راست دیکھیں – گلوبل صلاح`;
      description = `مکہ ٹی وی براہ راست دیکھیں جو مسجد الحرام کی مسلسل کوریج فراہم کرتا ہے۔ نمازیں، خطبے اور خانہ کعبہ کا روحانی ماحول کسی بھی وقت دیکھیں۔`;
      break;

    default:
      title = `Watch Makkah TV Live – Global Salah`;
      description = `Stream Makkah TV live for continuous coverage of Masjid al-Haram. Watch prayers, sermons, and the spiritual atmosphere of the Holy Kaaba anytime.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/makkah-tv`,
      en: `https://www.globalsalah.com/en/makkah-tv`,
      fr: `https://www.globalsalah.com/fr/makkah-tv`,
      ar: `https://www.globalsalah.com/ar/makkah-tv`,
      es: `https://www.globalsalah.com/es/makkah-tv`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/makkah-tv`,
      tr: `https://www.globalsalah.com/tr/makkah-tv`,
      de: `https://www.globalsalah.com/de/makkah-tv`,
      pt: `https://www.globalsalah.com/pt/makkah-tv`,
      ur: `https://www.globalsalah.com/ur/makkah-tv`,
      ru: `https://www.globalsalah.com/ru/makkah-tv`,
      'x-default': `https://www.globalsalah.com/en/makkah-tv`,
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
        <MakkahPage/>
    </div>
  )
}

export default page