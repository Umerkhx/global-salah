import React from 'react'
import SunanPage from './sunan-page'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sunan Abu Dawood – Recueil Authentique de Hadiths | Global Salah`;
      description = `Accédez aux hadiths authentiques de Sunan Abu Dawood sur Global Salah. Un recueil précieux des enseignements prophétiques à travers des hadiths validés.`;
      break;
    case 'ar':
      title = `سنن أبو داود – مجموعة الأحاديث الصحيحة | جلوبال صلاح`;
      description = `استعرض الأحاديث النبوية الصحيحة من سنن أبو داود على جلوبال صلاح. مصدر موثوق لفهم تعاليم النبي ﷺ من خلال هذا الكتاب الحديثي الهام.`;
      break;
    case 'es':
      title = `Sunan Abu Dawood – Colección Auténtica de Hadices | Global Salah`;
      description = `Accede a los hadices auténticos de Sunan Abu Dawood en Global Salah. Una colección valiosa de enseñanzas proféticas a través de hadices verificados.`;
      break;
    case 'zh-CN':
      title = `Sunan Abu Dawood– 真实圣训集 | 全球萨拉赫`;
      description = `在 全球萨拉赫 获取 Sunan Abu Dawood 的真实圣训。这是通过验证的圣训，宝贵的先知教义合集。`;
      break;
    default:
      title = `Sunan Abu Dawood – Authentic Hadith Collection | Global Salah`;
      description = `Access authentic hadiths from Sunan Abu Dawood on Global Salah. A valuable collection of prophetic teachings through verified hadiths.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/sunan-abu-dawood`,
      en: `https://www.globalsalah.com/en/sunan-abu-dawood`,
      fr: `https://www.globalsalah.com/fr/sunan-abu-dawood`,
      ar: `https://www.globalsalah.com/ar/sunan-abu-dawood`,
      es: `https://www.globalsalah.com/es/sunan-abu-dawood`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/sunan-abu-dawood`,
      'x-default': `https://www.globalsalah.com/en/sunan-abu-dawood`,
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
      <SunanPage/>
    </div>
  )
}

export default page