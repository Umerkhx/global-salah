import React from 'react'
import CityData from './CityData'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;
  const country = await params.countryName;
  const city = await params.cityName;

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Heures de prière à ${cityName} – Global Salah`;
      description = `Trouvez les heures de prière précises pour ${cityName} avec Global Salah. Accédez aux horaires quotidiens et mensuels pour rester régulier dans vos prières.`;
      break;
    case 'ru':
      title = `Время молитвы в ${cityName} - Глобальный салах`;
      description = `Узнайте точное время молитвы для ${cityName} с помощью Global Salah. Получите доступ к ежедневным и ежемесячным расписаниям, чтобы не отставать от своих молитв.`;
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
    case 'tr':
      title = `${cityName} Namaz Vakitleri – Global Salah`;
      description = `Global Salah ile ${cityName} için doğru namaz vakitlerini bulun. Günlük ve aylık takvimlerle namazlarınızı düzenli kılın.`;
      break;
    case 'de':
      title = `Gebetszeiten in ${cityName} – Global Salah`;
      description = `Finden Sie präzise Gebetszeiten für ${cityName} mit Global Salah. Greifen Sie auf tägliche und monatliche Zeitpläne zu, um regelmäßig zu beten.`;
      break;
    case 'pt':
      title = `Horários de oração em ${cityName} – Global Salah`;
      description = `Encontre horários precisos de oração para ${cityName} com a Global Salah. Acesse agendas diárias e mensais para manter sua regularidade.`;
      break;
    case 'ur':
      title = `${cityName} کے نماز کے اوقات – گلوبل صلاۃ`;
      description = `گلوبل صلاۃ کے ساتھ ${cityName} کے درست نماز کے اوقات معلوم کریں۔ روزانہ اور ماہانہ شیڈول تک رسائی حاصل کریں تاکہ آپ کی نماز میں تسلسل برقرار رہے۔`;
      break;
    default:
      title = `${cityName} Prayer Timings – Global Salah`;
      description = `Find precise prayer timings for ${cityName} with Global Salah. Access daily and monthly schedules to stay consistent with your prayers.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/countries/${country}/${city}`,
      fr: `https://globalsalah.com/fr/countries/${country}/${city}`,
      es: `https://globalsalah.com/es/countries/${country}/${city}`,
      ar: `https://globalsalah.com/ar/countries/${country}/${city}`,
      'zh-CN': `https://globalsalah.com/zh-CN/countries/${country}/${city}`,
      tr: `https://globalsalah.com/tr/countries/${country}/${city}`,
      de: `https://globalsalah.com/de/countries/${country}/${city}`,
      pt: `https://globalsalah.com/pt/countries/${country}/${city}`,
      ur: `https://globalsalah.com/ur/countries/${country}/${city}`,
      ru: `https://globalsalah.com/ru/countries/${country}/${city}`,
      'x-default': `https://globalsalah.com/en/countries/${country}/${city}`,
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
    <div><CityData/></div>
  )
}

export default page