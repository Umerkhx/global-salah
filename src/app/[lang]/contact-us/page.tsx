import React from 'react'
import ContactPage from './ContactPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Contactez-nous – Global Salah`;
      description = `Vous avez des questions ou besoin d’aide ? Contactez Global Salah pour toute demande concernant les horaires de prière, les calendriers islamiques et plus encore. Nous sommes là pour vous aider !`;
      break;
    case 'es':
      title = `Contáctenos - Global Salah`;
      description = `¿Tiene preguntas o necesita ayuda? Póngase en contacto con Global Salah para consultas sobre horarios de oración, calendarios islámicos y mucho más. ¡Estamos aquí para ayudarle!`;
      break;
    case 'ar':
      title = `اتصل بنا – جلوبال صلاح`;
      description = `هل لديك أسئلة أو تحتاج إلى مساعدة؟ تواصل مع جلوبال صلاح للاستفسارات حول أوقات الصلاة والتقويمات الإسلامية والمزيد. نحن هنا لمساعدتك!`;
      break;
    case 'zh-CN':
      title = `联系我们 – 全球萨拉赫`;
      description = `有问题或需要帮助吗？请联系 全球萨拉赫 了解有关祷告时间、伊斯兰日历等方面的咨询。我们随时为您服务！`;
      break;
    default:
      title = `Contact Us – Global Salah`;
      description = `Have questions or need assistance? Get in touch with Global Salah for inquiries about prayer times, Islamic calendars, and more. We’re here to help!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/contact-us`,
      languages: {
        en: 'https://www.globalsalah.com/en/contact-us',
        es: 'https://www.globalsalah.com/es/contact-us',
        fr: 'https://www.globalsalah.com/fr/contact-us',
        ar: 'https://www.globalsalah.com/ar/contact-us',
        'zh-CN': 'https://www.globalsalah.com/zh-CN/contact-us',
        'x-default': 'https://www.globalsalah.com/en/contact-us',
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




function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  
  return (
    <div>
      <ContactPage lang={lang} />
    </div>
  );
}

export default Page;