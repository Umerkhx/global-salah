import { Metadata } from 'next';
import AboutUs from './AboutUs';




export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Portail de prière fiable et ultime pour les musulmans à travers le monde`;
      description = `Global Salah existe pour guider les musulmans du monde entier à accomplir leurs pratiques religieuses à l’heure. Nous offrons des mises à jour précises et vous envoyons des rappels à l’heure exacte des prières.`;
      break;
    case 'ar':
      title = `البوابة الموثوقة والأفضل لأوقات الصلاة للمسلمين حول العالم`;
      description = `توجد جلوبال صلاح لتوجيه المسلمين في جميع أنحاء العالم لأداء عباداتهم في الوقت المناسب. نقدم تحديثات دقيقة ونرسل لك تذكيرات في وقت الصلاة بالضبط.`;
      break;
    case 'es':
      title = `El portal más fiable sobre la hora de la oración para musulmanes de todo el mundo`;
      description = `Global Salah existe para guiar a los musulmanes de todo el mundo a realizar sus prácticas religiosas a tiempo. Ofrecemos actualizaciones precisas y le enviamos recordatorios a la hora exacta de la oración.`;
      break;
    case 'zh-CN':
      title = `全球穆斯林最信赖的祈祷时间门户网站`;
      description = `全球萨拉赫 的存在是为了指导世界各地的穆斯林按时进行宗教活动。我们提供准确的最新信息，并在准确的祈祷时间向您发送提醒。`;
      break;
    default:
      title = `Ultimate trusted prayer time portal by Muslims across the world`;
      description = `Global Salah exist to guide Muslims globally to perform their religious practices on time. we offer accurate updates and send you reminders at exact prayer time`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/about-us`,
      languages: {
        en: 'https://www.globalsalah.com/en/about-us',
        es: 'https://www.globalsalah.com/es/about-us',
        fr: 'https://www.globalsalah.com/fr/about-us',
        ar: 'https://www.globalsalah.com/ar/about-us',
        'zh-CN': 'https://www.globalsalah.com/zh-CN/about-us',
        'x-default': 'https://www.globalsalah.com/en/about-us',
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



function page() {

  return (
    <AboutUs />
  )
}

export default page