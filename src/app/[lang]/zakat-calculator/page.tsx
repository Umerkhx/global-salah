import React from 'react'
import ZakatPage from './ZakatPage'


export async function generateMetadata({ params }: any) {
  const lang = await params.lang;
  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calculateur de Zakat – Global Salah`;
      description = `Calculez votre Zakat rapidement et facilement selon la loi islamique. Entrez vos actifs et obtenez le montant exact à donner.`;
      break;
    case 'ru':
      title = `Калькулятор закята - Глобальный салах`;
      description = `Рассчитайте свой закят быстро и легко в соответствии с исламским законодательством. Введите данные о своем имуществе и получите точную сумму, которую нужно отдать.`;
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
    case 'tr':
      title = `Zekat Hesaplayıcı – Global Salah`;
      description = `İslami kurallara göre zekatınızı kolayca hesaplayın. Varlıklarınızı girin ve vermeniz gereken doğru miktarı anında öğrenin.`;
      break;
    case 'de':
      title = `Zakat Rechner – Global Salah`;
      description = `Berechnen Sie Ihren Zakat einfach und schnell nach islamischen Regeln. Geben Sie Ihre Vermögenswerte ein und erhalten Sie sofort den genauen Betrag.`;
      break;
    case 'pt':
      title = `Calculadora de Zakat – Global Salah`;
      description = `Calcule seu Zakat facilmente com base nas regras islâmicas. Insira seus bens e obtenha instantaneamente o valor exato a ser doado.`;
      break;
    case 'ur':
      title = `زکات کیلکولیٹر – گلوبل صلاح`;
      description = `اسلامی اصولوں کے مطابق اپنی زکات آسانی سے حساب کریں۔ اپنی دولت درج کریں اور صحیح رقم فوری حاصل کریں۔`;
      break;
    default:
      title = `Zakat Calculator – Global Salah`;
      description = `Easily calculate your Zakat based on Islamic rules. Enter your assets and instantly get the accurate amount to give.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/zakat-calculator`,
      en: `https://globalsalah.com/en/zakat-calculator`,
      fr: `https://globalsalah.com/fr/zakat-calculator`,
      ar: `https://globalsalah.com/ar/zakat-calculator`,
      es: `https://globalsalah.com/es/zakat-calculator`,
      'zh-CN': `https://globalsalah.com/zh-CN/zakat-calculator`,
      tr: `https://globalsalah.com/tr/zakat-calculator`,
      de: `https://globalsalah.com/de/zakat-calculator`,
      pt: `https://globalsalah.com/pt/zakat-calculator`,
      ur: `https://globalsalah.com/ur/zakat-calculator`,
      ru: `https://globalsalah.com/ru/zakat-calculator`,
      'x-default': `https://globalsalah.com/en/zakat-calculator`,
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
      <ZakatPage/>
    </div>
  )
}

export default page