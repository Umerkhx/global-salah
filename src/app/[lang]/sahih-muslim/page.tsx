import React from 'react'
import SahihMuslimPage from './sahih-muslim-page'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sahih Muslim – Recueil Authentique de Hadiths | Global Salah`;
      description = `Accédez aux hadiths authentiques de Sahih Muslim sur Global Salah. Un pilier essentiel de la tradition islamique pour mieux comprendre les enseignements prophétiques.`;
      break;
    case 'ru':
      title = `Сахих Муслим - аутентичный сборник хадисов | Глобальный салах`;
      description = `Получите доступ к достоверным хадисам из Сахиха Муслима о глобальном саляхе. Важнейший столп исламской традиции для лучшего понимания пророческих учений.`;
      break;
    case 'ar':
      title = `صحيح مسلم – مجموعة الأحاديث الصحيحة | جلوبال صلاح`;
      description = `استعرض الأحاديث النبوية الصحيحة من صحيح مسلم على جلوبال صلاح. مصدر موثوق لفهم تعاليم النبي ﷺ من خلال ثاني أصح كتب الحديث في الإسلام.`;
      break;
    case 'es':
      title = `Sahih Muslim – Colección Auténtica de Hadices | Global Salah`;
      description = `Accede a los hadices auténticos de Sahih Muslim en Global Salah. Un pilar fundamental de la tradición islámica para comprender mejor las enseñanzas del Profeta.`;
      break;
    case 'zh-CN':
      title = `萨希赫·穆斯林 – 真实圣训集 | 全球萨拉赫`;
      description = `在 全球萨拉赫 上访问萨希赫·穆斯林的真实圣训。这是理解先知教义的重要伊斯兰传统基石。`;
      break;
    case 'tr':
      title = `Sahih Muslim – Otantik Hadis Koleksiyonu | Global Salah`;
      description = `Global Salah'da Sahih Muslim'in otantik hadislerine erişin. Peygamberin öğretilerini daha iyi anlamak için İslami geleneğin temel taşlarından biridir.`;
      break;
    case 'de':
      title = `Sahih Muslim – Authentische Hadith-Sammlung | Global Salah`;
      description = `Greifen Sie auf authentische Hadithe von Sahih Muslim auf Global Salah zu. Ein Grundpfeiler der islamischen Tradition, um die Lehren des Propheten besser zu verstehen.`;
      break;
    case 'pt':
      title = `Sahih Muslim – Coleção Autêntica de Hadiths | Global Salah`;
      description = `Acesse os hadiths autênticos de Sahih Muslim no Global Salah. Um pilar fundamental da tradição islâmica para compreender melhor os ensinamentos do Profeta.`;
      break;
    case 'ur':
      title = `صحیح مسلم – مستند احادیث کا مجموعہ | گلوبل صلاح`;
      description = `گلوبل صلاح پر صحیح مسلم کی مستند احادیث تک رسائی حاصل کریں۔ پیغمبر ﷺ کی تعلیمات کو بہتر سمجھنے کے لیے اسلامی روایت کا ایک اہم ستون۔`;
      break;
    default:
      title = `Sahih Muslim – Authentic Hadith Collection | Global Salah`;
      description = `Access authentic hadiths from Sahih Muslim on Global Salah. A cornerstone of Islamic tradition to better understand the Prophet’s teachings.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/sahih-muslim`,
      en: `https://www.globalsalah.com/en/sahih-muslim`,
      fr: `https://www.globalsalah.com/fr/sahih-muslim`,
      ar: `https://www.globalsalah.com/ar/sahih-muslim`,
      es: `https://www.globalsalah.com/es/sahih-muslim`,
      de: `https://www.globalsalah.com/de/sahih-muslim`,
      tr: `https://www.globalsalah.com/tr/sahih-muslim`,
      pt: `https://www.globalsalah.com/pt/sahih-muslim`,
      ur: `https://www.globalsalah.com/ur/sahih-muslim`,
      ru: `https://www.globalsalah.com/ru/sahih-muslim`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/sahih-muslim`,
      'x-default': `https://www.globalsalah.com/en/sahih-muslim`,
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
      <SahihMuslimPage/>
    </div>
  )
}

export default page