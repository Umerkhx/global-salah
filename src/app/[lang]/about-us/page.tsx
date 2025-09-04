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
    case 'ru':
      title = `Самый надежный молитвенный портал для мусульман всего мира`;
      description = `Global Salah существует для того, чтобы помочь мусульманам всего мира вовремя совершать свои религиозные обряды. Мы предоставляем точную информацию и отправляем вам напоминания о точном времени молитв.`;
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
    case 'tr':
      title = `Dünyadaki Müslümanlar için en güvenilir namaz vakti portalı`;
      description = `Global Salah, dünya çapındaki Müslümanların dini görevlerini zamanında yerine getirmelerine rehberlik etmek için vardır. Doğru güncellemeler sunar ve namaz vaktinde size hatırlatmalar göndeririz.`;
      break;
    case 'de':
      title = `Das vertrauenswürdigste Gebetszeiten-Portal für Muslime weltweit`;
      description = `Global Salah hilft Muslimen weltweit, ihre religiösen Pflichten pünktlich zu erfüllen. Wir bieten genaue Updates und senden Gebetszeit-Erinnerungen.`;
      break;
    case 'pt':
      title = `O portal mais confiável de horários de oração para muçulmanos ao redor do mundo`;
      description = `A Global Salah existe para guiar os muçulmanos em todo o mundo a praticarem sua fé religiosamente no tempo certo. Oferecemos atualizações precisas e enviamos lembretes nos horários exatos das orações.`;
      break;
    case 'ur':
      title = `دنیا بھر کے مسلمانوں کے لیے سب سے قابل اعتماد نماز کا وقت پورٹل`;
      description = `گلوبل صلاح دنیا بھر کے مسلمانوں کی بروقت عبادات میں رہنمائی کے لیے موجود ہے۔ ہم درست معلومات فراہم کرتے ہیں اور عین نماز کے وقت پر یاد دہانی بھیجتے ہیں۔`;
      break;
    default:
      title = `Ultimate trusted prayer time portal by Muslims across the world`;
      description = `Global Salah exist to guide Muslims globally to perform their religious practices on time. we offer accurate updates and send you reminders at exact prayer time`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/about-us`,
      languages: {
        en: 'https://globalsalah.com/en/about-us',
        es: 'https://globalsalah.com/es/about-us',
        fr: 'https://globalsalah.com/fr/about-us',
        ar: 'https://globalsalah.com/ar/about-us',
        'zh-CN': 'https://globalsalah.com/zh-CN/about-us',
        tr: 'https://globalsalah.com/tr/about-us',
        de: 'https://globalsalah.com/de/about-us',
        pt: 'https://globalsalah.com/pt/about-us',
        ur: 'https://globalsalah.com/ur/about-us',
        ru: 'https://globalsalah.com/ru/about-us',
        'x-default': 'https://globalsalah.com/en/about-us',
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