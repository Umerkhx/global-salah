import React from 'react'
import TermsContent from './TermsContent'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Visiteurs, veuillez lire attentivement les conditions générales avant d'utiliser nos services`;
      description = `En utilisant nos services de prière mondiale, vous acceptez nos conditions générales. Veuillez lire notre politique de confidentialité pour préserver un environnement respectueux.`;
      break;
    case 'ru':
      title = `Посетители, пожалуйста, внимательно ознакомьтесь с условиями и положениями, прежде чем пользоваться нашими услугами.`;
      description = `Пользуясь нашими всемирными молитвенными услугами, вы соглашаетесь с нашими правилами и условиями. Пожалуйста, ознакомьтесь с нашей политикой конфиденциальности, чтобы сохранить уважительную атмосферу.`;
      break;
    case 'ar':
      title = `يرجى من الزوار قراءة الشروط والأحكام بعناية قبل استخدام الخدمات`;
      description = `باستخدامك لخدمات مواعيد الصلاة العالمية، فإنك توافق على الشروط والأحكام الخاصة بنا. نرجو قراءة سياسة الخصوصية للحفاظ على بيئة محترمة.`;
      break;
    case 'es':
      title = `Visitantes, por favor lean atentamente los términos y condiciones antes de usar nuestros servicios`;
      description = `Al usar nuestros servicios globales de horarios de oración, usted acepta nuestros términos y condiciones. Por favor, lea nuestra política de privacidad para mantener un entorno respetuoso.`;
      break;
    case 'zh-CN':
      title = `访客请仔细阅读条款和条件后再使用我们的服务`;
      description = `使用我们的全球祷告时间服务，即表示您同意我们的条款和条件。请阅读我们的隐私政策，以维护一个尊重的环境。`;
      break;
    case 'tr':
      title = `Ziyaretçiler, hizmetlerimizi kullanmadan önce lütfen şartlar ve koşulları dikkatlice okuyun`;
      description = `Küresel namaz vakti hizmetlerimizi kullanarak şartlarımızı kabul etmiş olursunuz. Lütfen saygılı bir ortam için gizlilik politikamızı okuyunuz.`;
      break;
    case 'de':
      title = `Besucher, bitte lesen Sie die Allgemeinen Geschäftsbedingungen sorgfältig, bevor Sie unsere Dienste nutzen`;
      description = `Durch die Nutzung unserer globalen Gebetszeiten-Dienste stimmen Sie unseren Bedingungen zu. Bitte lesen Sie unsere Datenschutzrichtlinie, um eine respektvolle Umgebung zu gewährleisten.`;
      break;
    case 'pt':
      title = `Visitantes, por favor leiam atentamente os termos e condições antes de usar nossos serviços`;
      description = `Ao usar nossos serviços globais de horários de oração, você concorda com nossos termos e condições. Por favor, leia nossa política de privacidade para manter um ambiente respeitoso.`;
      break;
    case 'ur':
      title = `زائرین، براہ کرم ہماری خدمات استعمال کرنے سے پہلے شرائط و ضوابط غور سے پڑھیں`;
      description = `ہمارے عالمی نماز کے اوقات کی خدمات استعمال کرتے ہوئے، آپ ہماری شرائط و ضوابط سے اتفاق کرتے ہیں۔ مہربانی فرما کر ایک معزز ماحول برقرار رکھنے کے لیے ہماری پرائیویسی پالیسی پڑھیں۔`;
      break;
    default:
      title = `Visitors read carefully terms and conditions before using services`;
      description = `By using our global prayer time services, you have to agree on our terms and conditions. Kindly read our privacy and policy to maintain respected environment.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/terms-and-conditions`,
      en: `https://www.globalsalah.com/en/terms-and-conditions`,
      fr: `https://www.globalsalah.com/fr/terms-and-conditions`,
      ar: `https://www.globalsalah.com/ar/terms-and-conditions`,
      es: `https://www.globalsalah.com/es/terms-and-conditions`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/terms-and-conditions`,
      tr: `https://www.globalsalah.com/tr/terms-and-conditions`,
      de: `https://www.globalsalah.com/de/terms-and-conditions`,
      pt: `https://www.globalsalah.com/pt/terms-and-conditions`,
      ur: `https://www.globalsalah.com/ur/terms-and-conditions`,
      ru: `https://www.globalsalah.com/ru/terms-and-conditions`,
      'x-default': `https://www.globalsalah.com/en/terms-and-conditions`,
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
    <div>
      <TermsContent/>
    </div>
  )
}

export default page