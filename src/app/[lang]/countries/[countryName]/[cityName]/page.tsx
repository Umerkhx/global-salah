import React from 'react'
import CityData from './CityData'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;
  const country = params.countryName;
  const city = params.cityName;
  
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  
  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Heures de prière à ${cityName} – Global Salah`;
      description = `Trouvez les heures de prière précises pour ${cityName} avec Global Salah. Accédez aux horaires quotidiens et mensuels pour rester régulier dans vos prières.`;
      break;
    case 'es':
      title = `Horario de oración de ${cityName} - Salah global`;
      description = `Encuentre horarios de oración precisos para ${cityName} con Global Salah. Accede a horarios diarios y mensuales para ser coherente con tus oraciones.`;
      break;
    case 'zh-CN':
      title = `${cityName} 的祈祷时间表 - 全球萨拉赫`;
      description = `通过 全球萨拉赫 查找 ${cityName} 的准确祈祷时间表。访问每日和每月的日程表，使您的祈祷保持一致。`;
      break;
    case 'ar':
      title = `مواقيت الصلاة في ${cityName} – جلوبال صلاح`;
      description = `اكتشف مواقيت الصلاة الدقيقة في ${cityName} مع جلوبال صلاح. تصفح الجداول اليومية والشهرية للحفاظ على التزامك بالصلاة.`;
      break;
    default:
      title = `${cityName} Prayer Timings – Global Salah`;
      description = `Find precise prayer timings for ${cityName} with Global Salah. Access daily and monthly schedules to stay consistent with your prayers.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/countries/${country}/${city}`,
      fr: `https://www.globalsalah.com/fr/countries/${country}/${city}`,
      es: `https://www.globalsalah.com/es/countries/${country}/${city}`,
      ar: `https://www.globalsalah.com/ar/countries/${country}/${city}`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/countries/${country}/${city}`,
      'x-default': `https://www.globalsalah.com/en/countries/${country}/${city}`,
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
    <div><CityData/></div>
  )
}

export default page