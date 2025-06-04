import React from 'react'
import JamiaTirmaziPage from './jamia-tirmazi-page'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Jami' Tirmizi – Recueil Authentique de Hadiths | Global Salah`;
      description = `Accédez aux hadiths authentiques de Jami' Tirmizi sur Global Salah. Un recueil essentiel de hadiths qui vous aide à mieux comprendre les enseignements prophétiques.`;
      break;

    case 'ar':
      title = `جامع الترمذي – مجموعة الأحاديث الصحيحة | جلوبال صلاح`;
      description = `استعرض الأحاديث النبوية الصحيحة من جامع الترمذي على جلوبال صلاح. مصدر موثوق لفهم تعاليم النبي ﷺ من خلال كتاب حديثي مهم في الإسلام.`;
      break;

    case 'es':
      title = `Jami' Tirmizi – Colección Auténtica de Hadices | Global Salah`;
      description = `Accede a los hadices auténticos de Jami' Tirmizi en Global Salah. Una colección clave para comprender mejor las enseñanzas del Profeta.`;
      break;

    case 'zh-CN':
      title = `集密·梯尔米兹集 – 正统圣训合集 | 全球祷告`;
      description = `访问全球祷告平台上的集密·梯尔米兹集正统圣训。这是一部重要的圣训合集，帮助您更好地理解先知的教导。`;
      break;

    default:
      title = `Jami' Tirmizi – Authentic Hadith Collection | Global Salah`;
      description = `Access authentic hadiths from Jami' Tirmizi on Global Salah. A crucial hadith collection to help you understand the Prophet’s teachings.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/jamia-tirmizi`,
      en: `https://www.globalsalah.com/en/jamia-tirmizi`,
      fr: `https://www.globalsalah.com/fr/jamia-tirmizi`,
      ar: `https://www.globalsalah.com/ar/jamia-tirmizi`,
      es: `https://www.globalsalah.com/es/jamia-tirmizi`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/jamia-tirmizi`,
      'x-default': `https://www.globalsalah.com/en/jamia-tirmizi`,
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
      <JamiaTirmaziPage/>
    </div>
  )
}

export default page