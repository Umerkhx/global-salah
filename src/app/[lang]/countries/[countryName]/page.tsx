import React from 'react'
import CountryPage from './CountryPage'
import { Metadata } from 'next';

export async function generateMetadata({ params }: any) {
  const lang = params.lang;
  const country = params.countryName;
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  const keywords = [
    `prayer times in ${countryName} `,
    `prayer times ${countryName} `,
    `salah times in ${countryName}`,
    `adhan times for ${countryName}`,
    `namaz time in ${countryName}`,
    `${countryName} prayer schedule`,
    `daily prayer times in ${countryName}`,
    `weekly prayer times in ${countryName}`,
    `monthly prayer schedule ${countryName}`,
  ];

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Heures de prière à ${countryName} – Global Salah`;
      description = `Obtenez les heures de prière précises à ${countryName} avec Global Salah. Accédez aux horaires quotidiens et mensuels pour rester régulier dans vos prières où que vous soyez.`;
      break;
    case 'ru':
      title = `Время молитвы в ${countryName} - Глобальный салах`;
      description = `Узнайте точное время молитвы в ${countryName} с помощью Global Salah. Получите доступ к ежедневным и ежемесячным расписаниям, чтобы не отставать от молитв, где бы вы ни находились.`;
      break;
    case 'es':
      title = `Horario de oración en ${countryName} - Global Salah`;
      description = `Obtenga horarios de oración precisos en ${countryName} con Global Salah. Acceda a los horarios diarios y mensuales de Salah para ser coherente con sus oraciones en cualquier lugar del país.`;
      break;
    case 'zh-CN':
      title = `在 ${countryName} 的祈祷时间 - 全球萨拉赫`;
      description = `通过 全球萨拉赫 获取 ${countryName} 的准确祈祷时间表。访问每日和每月的萨拉赫时间表，让您在全国各地的祈祷保持一致。`;
      break;
    case 'ar':
      title = `مواقيت الصلاة في ${countryName} – جلوبال صلاح`;
      description = `احصل على مواقيت الصلاة الدقيقة في ${countryName} مع جلوبال صلاح. تصفح الجداول اليومية والشهرية للصلاة لتبقى مواظبًا على عباداتك في أي مكان.`;
      break;
    case 'tr':
      title = `${countryName} için Namaz Vakitleri – Global Salah`;
      description = `Global Salah ile ${countryName} için doğru namaz vakitlerini öğrenin. Günlük ve aylık namaz programlarına erişerek ibadetlerinizi düzenli hale getirin.`;
      break;
    case 'de':
      title = `Gebetszeiten in ${countryName} – Global Salah`;
      description = `Erhalten Sie genaue Gebetszeiten in ${countryName} mit Global Salah. Greifen Sie auf tägliche und monatliche Zeitpläne zu, um Ihre Gebete überall einzuhalten.`;
      break;
    case 'pt':
      title = `Horários de oração em ${countryName} – Global Salah`;
      description = `Obtenha horários de oração precisos em ${countryName} com o Global Salah. Acesse horários diários e mensais de oração para manter sua regularidade espiritual em qualquer lugar.`;
      break;
    case 'ur':
      title = `${countryName} میں نماز کے اوقات – گلوبل صلاح`;
      description = `گلوبل صلاح کے ساتھ ${countryName} میں درست نماز کے اوقات حاصل کریں۔ روزانہ اور ماہانہ نماز کے شیڈول تک رسائی حاصل کریں تاکہ آپ اپنی عبادات کو باقاعدگی سے انجام دے سکیں۔`;
      break;
    default:
      title = `Prayer Times in ${countryName} – Global Salah`;
      description = `Get accurate prayer times in ${countryName} with Global Salah. Access daily and monthly Salah schedules to stay consistent with your prayers anywhere in the country.`;
  }

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/countries/${country}`,
      languages: {
        en: `https://www.globalsalah.com/en/countries/${country}`,
        fr: `https://www.globalsalah.com/fr/countries/${country}`,
        es: `https://www.globalsalah.com/es/countries/${country}`,
        ar: `https://www.globalsalah.com/ar/countries/${country}`,
        'zh-CN': `https://www.globalsalah.com/zh-CN/countries/${country}`,
        tr: `https://www.globalsalah.com/tr/countries/${country}`,
        de: `https://www.globalsalah.com/de/countries/${country}`,
        pt: `https://www.globalsalah.com/pt/countries/${country}`,
        ur: `https://www.globalsalah.com/ur/countries/${country}`,
        ru: `https://www.globalsalah.com/ru/countries/${country}`,
        'x-default': `https://www.globalsalah.com/en/countries/${country}`,
      },
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



function page({ params }: any) {


  return (
    <div>
      <CountryPage />
    </div>
  )
}

export default page