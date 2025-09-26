import React from 'react'
import DuasPage from './DuasPage'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Invocations pour Chaque Occasion – Global Salah`;
      description = `Découvrez une collection puissante de duas islamiques pour chaque occasion avec Global Salah. Renforcez votre foi avec des invocations et des prières quotidiennes.`;
      break;
    case 'ru':
      title = `Приглашения на все случаи жизни - Глобальный Салах`;
      description = `Откройте для себя мощную коллекцию исламских дуа на все случаи жизни с Global Salah. Укрепляйте свою веру ежедневными призывами и молитвами.`;
      break;
    case 'ar':
      title = `أدعية لكل مناسبة – جلوبال صلاح`;
      description = `اكتشف مجموعة قوية من الأدعية الإسلامية لكل مناسبة مع جلوبال صلاح. قوّ إيمانك بالأدعية والصلوات اليومية.`;
      break;
    case 'es':
      title = `Duas para Cada Ocasión – Global Salah`;
      description = `Descubre una colección poderosa de súplicas islámicas para cada ocasión con Global Salah. Fortalece tu fe con súplicas y oraciones diarias.`;
      break;
    case 'zh-CN':
      title = `适合各种场合的杜斯 - 全球礼赞`;
      description = `通过 全球萨拉赫 发现适合各种场合的强大伊斯兰祈祷文集。通过每天的祈求和祷告来加强您的信仰。`;
      break;
    case 'tr':
      title = `Her Durum İçin Dualar – Global Salah`;
      description = `Global Salah ile her durum için güçlü İslami dualar koleksiyonunu keşfedin. İnancınızı günlük dualar ve yakarışlarla güçlendirin.`;
      break;
    case 'de':
      title = `Duas für Jede Gelegenheit – Global Salah`;
      description = `Entdecken Sie mit Global Salah eine kraftvolle Sammlung islamischer Duas für jeden Anlass. Stärken Sie Ihren Glauben mit täglichen Bittgebeten und Gebeten.`;
      break;
    case 'pt':
      title = `Duas para Toda Ocasião – Global Salah`;
      description = `Descubra uma coleção poderosa de duas islâmicas para toda ocasião com Global Salah. Fortaleça sua fé com súplicas e orações diárias.`;
      break;
    case 'ur':
      title = `ہر موقع کے لیے دعائیں – گلوبل صلاح`;
      description = `گلوبل صلاح کے ساتھ ہر موقع کے لیے طاقتور اسلامی دعاؤں کا مجموعہ دریافت کریں۔ اپنی ایمان کو روزانہ کی دعاؤں اور عبادات سے مضبوط کریں۔`;
      break;
    default:
      title = `Duas for Every Occasion – Global Salah`;
      description = `Discover a collection of powerful Islamic duas for every occasion with Global Salah. Strengthen your faith with daily supplications and prayers.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/duas`,
      en: `https://globalsalah.com/en/duas`,
      fr: `https://globalsalah.com/fr/duas`,
      ar: `https://globalsalah.com/ar/duas`,
      es: `https://globalsalah.com/es/duas`,
      'zh-CN': `https://globalsalah.com/zh-CN/duas`,
      tr: `https://globalsalah.com/tr/duas`,
      de: `https://globalsalah.com/de/duas`,
      pt: `https://globalsalah.com/pt/duas`,
      ur: `https://globalsalah.com/ur/duas`,
      ru: `https://globalsalah.com/ru/duas`,
      'x-default': `https://globalsalah.com/en/duas`,
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
    <div><DuasPage/></div>
  )
}

export default page