import React from 'react'
import SunanPage from './sunan-page'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sunan Abu Dawood – Recueil Authentique de Hadiths | Global Salah`;
      description = `Accédez aux hadiths authentiques de Sunan Abu Dawood sur Global Salah. Un recueil précieux des enseignements prophétiques à travers des hadiths validés.`;
      break;
    case 'ru':
      title = `Сунан Абу Давуд - аутентичный сборник хадисов | Global Salah`;
      description = `Получите доступ к достоверным хадисам из Сунан Абу Давуда о глобальном саляхе. Ценный сборник пророческих учений, содержащий достоверные хадисы.`;
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
    case 'tr':
      title = `Sunan Abu Dawood – Otentik Hadis Koleksiyonu | Global Salah`;
      description = `Global Salah'da Sunan Abu Dawood'dan otantik hadislere erişin. Doğrulanmış hadisler aracılığıyla peygamberî öğretilerin değerli bir koleksiyonu.`;
      break;
    case 'de':
      title = `Sunan Abu Dawood – Authentische Hadith-Sammlung | Global Salah`;
      description = `Greifen Sie auf authentische Hadithe von Sunan Abu Dawood bei Global Salah zu. Eine wertvolle Sammlung prophetischer Lehren durch verifizierte Hadithe.`;
      break;
    case 'pt':
      title = `Sunan Abu Dawood – Coleção Autêntica de Hadiths | Global Salah`;
      description = `Acesse hadiths autênticos de Sunan Abu Dawood no Global Salah. Uma coleção valiosa de ensinamentos proféticos através de hadiths verificados.`;
      break;
    case 'ur':
      title = `سنن ابو داود – مستند احادیث کا مجموعہ | گلوبل صلاح`;
      description = `گلوبل صلاح پر سنن ابو داود کی مستند احادیث تک رسائی حاصل کریں۔ تصدیق شدہ احادیث کے ذریعے نبوی تعلیمات کا ایک قیمتی مجموعہ۔`;
      break;
    default:
      title = `Sunan Abu Dawood – Authentic Hadith Collection | Global Salah`;
      description = `Access authentic hadiths from Sunan Abu Dawood on Global Salah. A valuable collection of prophetic teachings through verified hadiths.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/sunan-abu-dawood`,
      en: `https://globalsalah.com/en/sunan-abu-dawood`,
      fr: `https://globalsalah.com/fr/sunan-abu-dawood`,
      ar: `https://globalsalah.com/ar/sunan-abu-dawood`,
      es: `https://globalsalah.com/es/sunan-abu-dawood`,
      de: `https://globalsalah.com/de/sunan-abu-dawood`,
      pt: `https://globalsalah.com/pt/sunan-abu-dawood`,
      tr: `https://globalsalah.com/tr/sunan-abu-dawood`,
      ur: `https://globalsalah.com/ur/sunan-abu-dawood`,
      ru: `https://globalsalah.com/ru/sunan-abu-dawood`,
      'zh-CN': `https://globalsalah.com/zh-CN/sunan-abu-dawood`,
      'x-default': `https://globalsalah.com/en/sunan-abu-dawood`,
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
    <div>
      <SunanPage/>
    </div>
  )
}

export default page