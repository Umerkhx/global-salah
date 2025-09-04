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
    case 'ru':
      title = `Сахих Бухари - аутентичный сборник хадисов | Глобальный салах`;
      description = `Откройте для себя достоверные хадисы из Сахиха Бухари на сайте Global Salah. Углубите свое понимание учения Пророка с помощью одного из самых надежных сборников ислама.`;
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
    case 'tr':
      title = `Sahih Buhari – Otantik Hadis Koleksiyonu | Global Salah`;
      description = `Global Salah'da Sahih Buhari'nin otantik hadislerini keşfedin. İslam'ın en güvenilir koleksiyonlarından biri aracılığıyla Peygamber’in öğretilerini derinlemesine anlayın.`;
      break;
    case 'de':
      title = `Sahih Bukhari – Authentische Hadith Sammlung | Global Salah`;
      description = `Entdecken Sie die authentischen Hadithe aus Sahih Bukhari auf Global Salah. Vertiefen Sie Ihr Verständnis der Lehren des Propheten durch eine der vertrauenswürdigsten Sammlungen im Islam.`;
      break;
    case 'pt':
      title = `Sahih Bukhari – Coleção Autêntica de Hadiths | Global Salah`;
      description = `Explore os hadiths autênticos do Sahih Bukhari no Global Salah. Aprofunde sua compreensão dos ensinamentos do Profeta através de uma das coleções mais confiáveis do Islã.`;
      break;
    case 'ur':
      title = `صحیح بخاری – مستند احادیث کا مجموعہ | گلوبل صلاح`;
      description = `گلوبل صلاح پر صحیح بخاری کی مستند احادیث دریافت کریں۔ اسلام کی سب سے معتبر مجموعوں میں سے ایک کے ذریعے نبی ﷺ کی تعلیمات کو گہرائی سے سمجھیں۔`;
      break;
    default:
      title = `Sahih Bukhari – Authentic Hadith Collection | Global Salah`;
      description = `Explore the authentic hadiths from Sahih Bukhari on Global Salah. Deepen your understanding of the Prophet’s teachings through one of the most trusted collections in Islam.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/sahih-bukhari`,
      en: `https://globalsalah.com/en/sahih-bukhari`,
      fr: `https://globalsalah.com/fr/sahih-bukhari`,
      ar: `https://globalsalah.com/ar/sahih-bukhari`,
      es: `https://globalsalah.com/es/sahih-bukhari`,
      'zh-CN': `https://globalsalah.com/zh-CN/sahih-bukhari`,
      tr: `https://globalsalah.com/tr/sahih-bukhari`,
      de: `https://globalsalah.com/de/sahih-bukhari`,
      pt: `https://globalsalah.com/pt/sahih-bukhari`,
      ur: `https://globalsalah.com/ur/sahih-bukhari`,
      ru: `https://globalsalah.com/ru/sahih-bukhari`,
      'x-default': `https://globalsalah.com/en/sahih-bukhari`,
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
      <SahihBukhariPage/>
    </div>
  )
}

export default page