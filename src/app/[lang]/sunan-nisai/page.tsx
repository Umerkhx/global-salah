import React from 'react'
import SunanNisaiPage from './nisai-page'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sunan Nisai – Recueil Authentique de Hadiths | Global Salah`;
      description = `Accédez aux hadiths authentiques de Sunan Nisai sur Global Salah. Un recueil précieux des enseignements prophétiques à travers des hadiths validés.`;
      break;
    case 'ar':
      title = `سنن النسائي – مجموعة الأحاديث الصحيحة | جلوبال صلاح`;
      description = `استعرض الأحاديث النبوية الصحيحة من سنن النسائي على جلوبال صلاح. مصدر موثوق لفهم تعاليم النبي ﷺ من خلال هذا الكتاب الحديثي الهام.`;
      break;
    case 'es':
      title = `Sunan Nisai – Colección Auténtica de Hadices | Global Salah`;
      description = `Accede a los hadices auténticos de Sunan Nisai en Global Salah. Una valiosa colección de enseñanzas proféticas a través de hadices verificados.`;
      break;
    case 'zh-CN':
      title = `Sunan Nisai – 真实的圣训合集 | 全球萨拉赫`;
      description = `在 全球萨拉赫 上访问 Sunan Nisai 的真实圣训。通过经过验证的圣训，了解宝贵的先知教导。`;
      break;
    default:
      title = `Sunan Nisai – Authentic Hadith Collection | Global Salah`;
      description = `Access authentic hadiths from Sunan Nisai on Global Salah. A valuable collection of prophetic teachings through verified hadiths.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/sunan-nisai`,
      en: `https://www.globalsalah.com/en/sunan-nisai`,
      fr: `https://www.globalsalah.com/fr/sunan-nisai`,
      ar: `https://www.globalsalah.com/ar/sunan-nisai`,
      es: `https://www.globalsalah.com/es/sunan-nisai`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/sunan-nisai`,
      'x-default': `https://www.globalsalah.com/en/sunan-nisai`,
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
      <SunanNisaiPage />
    </div>
  )
}

export default page