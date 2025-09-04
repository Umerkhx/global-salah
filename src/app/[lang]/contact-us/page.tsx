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
    case 'ru':
      title = `Свяжитесь с нами - Global Salah`;
      description = `У вас есть вопросы или вам нужна помощь? Обращайтесь в Global Salah за вопросами о времени молитв, исламских календарях и многом другом. Мы всегда готовы помочь!`;
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
    case 'tr':
      title = `Bize Ulaşın – Global Salah`;
      description = `Sorularınız mı var veya yardıma mı ihtiyacınız var? Namaz vakitleri, İslami takvimler ve daha fazlası için Global Salah ile iletişime geçin. Size yardımcı olmak için buradayız!`;
      break;
    case 'de':
      title = `Kontaktieren Sie uns – Global Salah`;
      description = `Haben Sie Fragen oder benötigen Sie Hilfe? Kontaktieren Sie Global Salah für Anfragen zu Gebetszeiten, islamischen Kalendern und mehr. Wir sind für Sie da!`;
      break;
    case 'pt':
      title = `Contate-nos – Global Salah`;
      description = `Tem perguntas ou precisa de ajuda? Entre em contato com a Global Salah para dúvidas sobre horários de oração, calendários islâmicos e muito mais. Estamos aqui para ajudar!`;
      break;
    case 'ur':
      title = `ہم سے رابطہ کریں – گلوبل صلاح`;
      description = `کیا آپ کے پاس سوالات ہیں یا مدد درکار ہے؟ نماز کے اوقات، اسلامی کیلنڈرز اور مزید کے لیے گلوبل صلاح سے رابطہ کریں۔ ہم آپ کی مدد کے لیے یہاں موجود ہیں!`;
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
        tr: 'https://www.globalsalah.com/tr/contact-us',
        de: 'https://www.globalsalah.com/de/contact-us',
        pt: 'https://www.globalsalah.com/pt/contact-us',
        ur: 'https://www.globalsalah.com/ur/contact-us',
        ru: 'https://www.globalsalah.com/ru/contact-us',
        'x-default': 'https://www.globalsalah.com/en/contact-us',
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




function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  
  return (
    <div>
      <ContactPage lang={lang} />
    </div>
  );
}

export default Page;