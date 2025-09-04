import React from 'react'
import CalculationPage from './CalculationPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;
  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calculateur d'Héritage Islamique – Global Salah`;
      description = `Calculez facilement les parts d'héritage selon la loi islamique (Sharia). Notre calculateur vous aide à répartir l'héritage en toute clarté et simplicité.`;
      break;

    case 'ru':
      title = `Калькулятор исламского наследия - Глобальный салах`;
      description = `Легко рассчитайте доли наследства по исламскому праву (шариату). Наш калькулятор поможет вам четко и просто разделить наследство.`;
      break;

    case 'ar':
      title = `حاسبة الميراث الإسلامي – جلوبال صلاح`;
      description = `احسب أنصبة الورثة بسهولة وبدقة وفق الشريعة الإسلامية باستخدام حاسبة الميراث من جلوبال صلاح.`;
      break;

    case 'es':
      title = `Calculadora de Herencia Islámica – Global Salah`;
      description = `Calcule fácilmente las porciones de herencia según la ley islámica (Sharia). Nuestra calculadora le ayuda a distribuir la herencia de manera clara y sencilla.`;
      break;

    case 'zh-CN':
      title = `伊斯兰遗产计算器 – Global Salah`;
      description = `根据伊斯兰教法（Sharia）轻松计算继承份额。我们的计算器帮助您准确、清晰地分配遗产。`;
      break;

    case 'tr':
      title = `İslami Miras Hesaplayıcı – Global Salah`;
      description = `İslami hukuk (Şeriat) gereğince miras paylarını kolayca hesaplayın. Hesaplayıcımız, miras dağıtımını açık ve basit bir şekilde yapmanıza yardımcı olur.`;
      break;

    case 'de':
      title = `Islamischer Erbschaftsrechner – Global Salah`;
      description = `Berechnen Sie einfach die Erbanteile nach islamischem Recht (Scharia). Unser Rechner hilft Ihnen, die Erbschaft klar und einfach zu verteilen.`;
      break;

    case 'pt':
      title = `Calculadora de Herança Islâmica – Global Salah`;
      description = `Calcule facilmente as partes da herança de acordo com a lei islâmica (Sharia). Nossa calculadora ajuda você a distribuir a herança de forma clara e simples.`;
      break;

    case 'ur':
      title = `اسلامی وراثت کیلکولیٹر – گلوبل صلاح`;
      description = `اسلامی قانون (شریعہ) کے مطابق وراثت کے حصے آسانی سے حساب کریں۔ ہمارا کیلکولیٹر آپ کو وراثت کی تقسیم میں وضاحت اور آسانی فراہم کرتا ہے۔`;
      break;

    default:
      title = `Islamic Inheritance Calculator – Global Salah`;
      description = `Calculate inheritance shares according to Islamic law (Sharia) with our easy-to-use Inheritance Calculator. Quick, accurate, and Sharia-compliant.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/inheritance-calculator`,
      languages: {
        en: `https://www.globalsalah.com/en/inheritance-calculator`,
        fr: `https://www.globalsalah.com/fr/inheritance-calculator`,
        ar: `https://www.globalsalah.com/ar/inheritance-calculator`,
        es: `https://www.globalsalah.com/es/inheritance-calculator`,
        'zh-CN': `https://www.globalsalah.com/zh-CN/inheritance-calculator`,
        tr: `https://www.globalsalah.com/tr/inheritance-calculator`,
        de: `https://www.globalsalah.com/de/inheritance-calculator`,
        pt: `https://www.globalsalah.com/pt/inheritance-calculator`,
        ur: `https://www.globalsalah.com/ur/inheritance-calculator`,
        ru: `https://www.globalsalah.com/ru/inheritance-calculator`,
        'x-default': `https://www.globalsalah.com/en/inheritance-calculator`,
      },
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
        <CalculationPage/>
    </div>
  )
}

export default page