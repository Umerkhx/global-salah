import React from 'react';
import DateTimingDisplay from '../(Home)/DateTimingDisplay';
import Banner from '../(Home)/Banner';
import dynamic from 'next/dynamic';


const DuaSection = dynamic(() => import("../(Home)/dua-section"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />,
})
const IslamicCalculators = dynamic(() => import("../(Home)/islamic-calculators"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />,
})
const HadithSection = dynamic(() => import("../(Home)/hadith-section"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />,
})
const NamesOfAllahSection = dynamic(() => import("../(Home)/names-of-Allah-section"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />,
})
const HijirDivider = dynamic(() => import("../(Home)/HijirDivider"), {
  loading: () => <div className="h-10 bg-gray-100 animate-pulse rounded-xl" />,
})



export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Suivez Global Salah pour accomplir vos intentions religieuses à temps`;
      description = `Bienvenue chez Global Salah, découvrez nos services et notre expertise conçus pour vous tenir informé afin de pratiquer vos rituels religieux à l'heure partout dans le monde.`;
      break;
    case 'ru':
      title = `Следите за глобальным саляхом, чтобы вовремя исполнять свои религиозные намерения`;
      description = `Добро пожаловать на сайт Global Salah. Откройте для себя наши услуги и опыт, чтобы вы могли вовремя выполнять свои религиозные ритуалы в любой точке мира.`;
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
    case 'tr':
      title = `Global Salah'ı takip ederek dini niyetlerinizi zamanında gerçekleştirin`;
      description = `Global Salah'a hoş geldiniz, dini uygulamalarınızı dünya genelinde zamanında yapabilmeniz için tasarlanmış hizmetlerimizi ve uzmanlığımızı keşfedin.`;
      break;
    case 'de':
      title = `Folgen Sie Global Salah, um Ihre religiösen Absichten rechtzeitig zu erfüllen`;
      description = `Willkommen bei Global Salah, entdecken Sie unsere Dienstleistungen und Fachkenntnisse, die darauf ausgelegt sind, Ihnen Updates zu bieten, um religiöse Praktiken weltweit pünktlich auszuführen.`;
      break;
    case 'pt':
      title = `Siga Global Salah para cumprir suas intenções religiosas em tempo`;
      description = `Bem-vindo ao Global Salah, conheça nossos serviços e expertise que são projetados para fornecer atualizações para realizar práticas religiosas pontualmente em todo o mundo.`;
      break;
    case 'ur':
      title = `گلوبل صلاح کو فالو کریں تاکہ اپنے مذہبی مقاصد بروقت پورے کر سکیں`;
      description = `گلوبل صلاح میں خوش آمدید، ہمارے خدمات اور مہارت کا جائزہ لیں جو آپ کو دنیا بھر میں مذہبی عبادات وقت پر انجام دینے کے لیے اپ ڈیٹ فراہم کرنے کے لیے ڈیزائن کی گئی ہے۔`;
      break;
    default:
      title = `Follow Global Salah to accomplish your religious intentions timely`;
      description = `Welcome at Global Salah, investigate our services and expertise that is design to deliver you an update to perform religious practices on time across the world.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}`,
      languages: {
        en: 'https://globalsalah.com/en',
        fr: 'https://globalsalah.com/fr',
        ar: 'https://globalsalah.com/ar',
        es: 'https://globalsalah.com/es',
        'zh-CN': 'https://globalsalah.com/zh-CN',
        tr: 'https://globalsalah.com/tr',
        de: 'https://globalsalah.com/de',
        pt: 'https://globalsalah.com/pt',
        ur: 'https://globalsalah.com/ur',
        ru: 'https://globalsalah.com/ru',
      },
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
      follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}


export default function HomePage() {


  return (
    <>
      <Banner />
      <DateTimingDisplay />
      <DuaSection />
      <IslamicCalculators />
      <HadithSection />
      <NamesOfAllahSection />
      <HijirDivider />
    </>
  );
}
