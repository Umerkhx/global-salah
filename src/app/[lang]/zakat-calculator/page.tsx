import React from 'react'
import ZakatPage from './ZakatPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;
  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calculateur de Zakat – Global Salah`;
      description = `Calculez votre Zakat rapidement et facilement selon la loi islamique. Entrez vos actifs et obtenez le montant exact à donner.`;
      break;
    case 'ar':
      title = `حاسبة الزكاة – جلوبال صلاح`;
      description = `احسب زكاتك بسهولة وفق الشريعة الإسلامية. أدخل أصولك واحصل على المبلغ الواجب دفعه بدقة.`;
      break;
    case 'es':
      title = `Calculadora de Zakat – Global Salah`;
      description = `Calcula tu Zakat fácilmente según las reglas islámicas. Ingresa tus bienes y obtén al instante la cantidad exacta a dar.`;
      break;
    case 'zh-CN':
      title = `扎卡特计算器 – 全球萨拉赫`;
      description = `根据伊斯兰教法轻松计算您的扎卡特。输入您的资产，即可准确获得应支付的金额。`;
      break;
    default:
      title = `Zakat Calculator – Global Salah`;
      description = `Easily calculate your Zakat based on Islamic rules. Enter your assets and instantly get the accurate amount to give.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/zakat-calculator`,
      en: `https://www.globalsalah.com/en/zakat-calculator`,
      fr: `https://www.globalsalah.com/fr/zakat-calculator`,
      ar: `https://www.globalsalah.com/ar/zakat-calculator`,
      es: `https://www.globalsalah.com/es/zakat-calculator`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/zakat-calculator`,
      'x-default': `https://www.globalsalah.com/en/zakat-calculator`,
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
      <ZakatPage/>
    </div>
  )
}

export default page