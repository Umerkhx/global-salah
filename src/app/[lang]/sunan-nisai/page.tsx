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
    case 'ru':
      title = `Сунан Нисаи - аутентичный сборник хадисов | Глобальный Салах`;
      description = `Доступ к достоверным хадисам из Сунан Нисаи о глобальном саляхе. Ценный сборник пророческих учений, содержащий достоверные хадисы.`;
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
    case 'tr':
      title = `Sunan Nisai – Hadislerin Gerçek Koleksiyonu | Global Salah`;
      description = `Global Salah'da Sunan Nisai'den gerçek hadislere erişin. Doğrulanmış hadisler aracılığıyla peygamber öğretilerinin değerli bir koleksiyonu.`;
      break;
    case 'de':
      title = `Sunan Nisai – Authentische Hadith-Sammlung | Global Salah`;
      description = `Greifen Sie auf authentische Hadithe von Sunan Nisai auf Global Salah zu. Eine wertvolle Sammlung prophetischer Lehren durch verifizierte Hadithe.`;
      break;
    case 'pt':
      title = `Sunan Nisai – Coleção Autêntica de Hadiths | Global Salah`;
      description = `Acesse hadiths autênticos de Sunan Nisai no Global Salah. Uma coleção valiosa de ensinamentos proféticos através de hadiths verificados.`;
      break;
    case 'ur':
      title = `سنن نسائی – صحیح احادیث کا مجموعہ | گلوبل صلاح`;
      description = `گلوبل صلاح پر سنن نسائی کی صحیح احادیث تک رسائی حاصل کریں۔ حدیثوں کی تصدیق شدہ تعلیمات کا ایک قیمتی مجموعہ۔`;
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
      tr: `https://www.globalsalah.com/tr/sunan-nisai`,
      de: `https://www.globalsalah.com/de/sunan-nisai`,
      pt: `https://www.globalsalah.com/pt/sunan-nisai`,
      ur: `https://www.globalsalah.com/ur/sunan-nisai`,
      ru: `https://www.globalsalah.com/ru/sunan-nisai`,
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