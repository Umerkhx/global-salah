import React from 'react';
import DateTimingDisplay from '../(Home)/DateTimingDisplay';
import StoryImageSec from '../(Home)/StoryImageSec';
import CountrySection from '../(Home)/CountrySection';
import HijirDivider from '../(Home)/HijirDivider';
import Banner from '../(Home)/Banner';
import DuaSection from '../(Home)/dua-section';
import IslamicCalculators from '../(Home)/islamic-calculators';
import HadithSection from '../(Home)/hadith-section';
import NamesOfAllahSection from '../(Home)/names-of-Allah-section';



export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Suivez Global Salah pour accomplir vos intentions religieuses à temps`;
      description = `Bienvenue chez Global Salah, découvrez nos services et notre expertise conçus pour vous tenir informé afin de pratiquer vos rituels religieux à l'heure partout dans le monde.`;
      break;
    case 'ar':
      title = `تابع جلوبال صلاح لتحقيق نواياك الدينية في الوقت المناسب`;
      description = `مرحبًا بك في جلوبال صلاح، استكشف خدماتنا وخبراتنا المصممة لمساعدتك على أداء الممارسات الدينية في الوقت المحدد حول العالم.`;
      break;
    case 'es':
      title = `Siga Global Salah para cumplir a tiempo sus intenciones religiosas`;
      description = `Bienvenido a Global Salah, investigue nuestros servicios y experiencia que está diseñada para ofrecerle una actualización para realizar las prácticas religiosas a tiempo en todo el mundo.`;
      break;
    case 'zh-CN':
      title = `关注全球萨拉赫，准时实现您的宗教愿望`;
      description = `欢迎访问 全球萨拉赫，了解我们的服务和专业知识，这些服务和专业知识旨在为您提供升级服务，以便在全球范围内及时开展宗教活动。`;
      break;
    default:
      title = `Follow Global Salah to accomplish your religious intentions timely`;
      description = `Welcome at Global Salah, investigate our services and expertise that is design to deliver you an update to perform religious practices on time across the world.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}`,
      languages: {
        en: 'https://www.globalsalah.com/en',
        fr: 'https://www.globalsalah.com/fr',
        ar: 'https://www.globalsalah.com/ar',
        es: 'https://www.globalsalah.com/es',
        'zh-CN': 'https://www.globalsalah.com/zh-CN',
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


export default function Home() {



  return (
    <>
    <Banner/>
    <DateTimingDisplay/>
    <StoryImageSec/>
    <CountrySection/>
    <DuaSection/>
    <IslamicCalculators/>
    <HadithSection/>
    <NamesOfAllahSection/>
    <HijirDivider/>
    </>   
  );
}