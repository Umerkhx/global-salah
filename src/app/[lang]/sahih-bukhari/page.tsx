import React from 'react'
import SahihBukhariPage from './sahih-bukhari-page'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sahih Bukhari – Recueil Authentique de Hadiths | Global Salah`;
      description = `Découvrez les hadiths authentiques du Sahih Bukhari sur Global Salah. Approfondissez votre compréhension des enseignements du Prophète à travers l’un des recueils les plus fiables de l’Islam.`;
      break;
    case 'ar':
      title = `صحيح البخاري – مجموعة الأحاديث الصحيحة | جلوبال صلاح`;
      description = `استكشف الأحاديث النبوية الصحيحة من صحيح البخاري على جلوبال صلاح. تعمق في فهمك لتعاليم النبي ﷺ من خلال أحد أصح كتب الحديث في الإسلام.`;
      break;
    case 'es':
      title = `Sahih Bukhari – Colección Auténtica de Hadices | Global Salah`;
      description = `Explora los hadices auténticos del Sahih Bukhari en Global Salah. Profundiza en tu comprensión de las enseñanzas del Profeta a través de una de las colecciones más confiables del Islam.`;
      break;
    case 'zh-CN':
      title = `萨希赫布哈里 – 真实圣训集 | 全球萨拉赫`;
      description = `在 全球萨拉赫 探索萨希赫布哈里的真实圣训。通过伊斯兰最可靠的圣训集之一，深入理解先知的教导。`;
      break;
    default:
      title = `Sahih Bukhari – Authentic Hadith Collection | Global Salah`;
      description = `Explore the authentic hadiths from Sahih Bukhari on Global Salah. Deepen your understanding of the Prophet’s teachings through one of the most trusted collections in Islam.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/sahih-bukhari`,
      en: `https://www.globalsalah.com/en/sahih-bukhari`,
      fr: `https://www.globalsalah.com/fr/sahih-bukhari`,
      ar: `https://www.globalsalah.com/ar/sahih-bukhari`,
      es: `https://www.globalsalah.com/es/sahih-bukhari`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/sahih-bukhari`,
      'x-default': `https://www.globalsalah.com/en/sahih-bukhari`,
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
      <SahihBukhariPage/>
    </div>
  )
}

export default page