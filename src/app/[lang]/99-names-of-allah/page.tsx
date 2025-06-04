import React from 'react'
import NamesOfAllah from './NamesAllah'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `99 Noms d’Allah – Noms magnifiques et significations`;
      description = `Découvrez les 99 Noms d’Allah (Asma’ul Husna) et leurs significations. Explorez les attributs divins d’Allah qui reflètent Sa miséricorde, Sa sagesse et Sa puissance.`;
      break;
    case 'ar':
      title = `أسماء الله الحسنى – 99 اسمًا ومعانيها`;
      description = `اكتشف أسماء الله الحسنى ومعانيها. استكشف الصفات الإلهية التي تعكس رحمة الله وحكمته وقدرته.`;
      break;
    case 'es':
      title = `99 Nombres de Alá - Nombres hermosos y significados`;
      description = `Descubre los 99 Nombres de Alá (Asma'ul Husna) y sus significados. Explora los atributos divinos de Allah que reflejan Su misericordia, sabiduría y poder.`;
      break;
    case 'zh-CN':
      title = `真主的99个尊名——美丽的名字及其含义`;
      description = `探索真主的99个尊名（Asma'ul Husna）及其含义。了解反映真主仁慈、智慧和力量的神圣属性。`;
      break;
    default:
      title = `99 Names of Allah – Beautiful Names and Meanings`;
      description = `Discover the 99 Names of Allah (Asma'ul Husna) and their meanings. Explore the divine attributes of Allah that reflect His mercy, wisdom, and power.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/99-names-of-allah`,
      languages: {
        en: 'https://www.globalsalah.com/en/99-names-of-allah',
        fr: 'https://www.globalsalah.com/fr/99-names-of-allah',
        ar: 'https://www.globalsalah.com/ar/99-names-of-allah',
        es: 'https://www.globalsalah.com/es/99-names-of-allah',
        'zh-CN': 'https://www.globalsalah.com/zh-CN/99-names-of-allah',
        'x-default': 'https://www.globalsalah.com/en/99-names-of-allah',
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
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


function page() {
  return (
    <div>
      <NamesOfAllah />
    </div>
  )
}

export default page