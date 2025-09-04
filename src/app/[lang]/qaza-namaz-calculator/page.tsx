import React from 'react'
import QazaNamazHome from './QazaNamazHome'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Calculateur de Qaza Namaz – Suivez Vos Prières Manquées | Global Salah`;
      description = `Utilisez notre calculateur de Qaza Namaz pour suivre et rattraper facilement vos prières manquées. Planifiez vos rattrapages de manière simple et efficace.`;
      break;
    case 'ru':
      title = `Калькулятор Qaza Namaz - отслеживайте пропущенные молитвы | Global Salah`;
      description = `Используйте наш калькулятор Qaza Namaz, чтобы легко отслеживать и наверстывать пропущенные молитвы. Планируйте пропущенные молитвы просто и эффективно.`;
      break;
    case 'ar':
      title = `حاسبة قضاء الصلوات – تتبع صلواتك الفائتة | جلوبال صلاح`;
      description = `استخدم حاسبة قضاء الصلوات لتتبع صلواتك الفائتة بسهولة. خطط لقضائها بطريقة منظمة ومريحة عبر جلوبال صلاح.`;
      break;
    case 'es':
      title = `Calculadora de Qaza Namaz – Rastrea las Oraciones Perdidas | Global Salah`;
      description = `Utiliza nuestra calculadora de Qaza Namaz para rastrear y recuperar fácilmente tus oraciones perdidas. Planifica tus rezos de forma simple y eficiente.`;
      break;
    case 'zh-CN':
      title = `Qaza Namaz 计算器 – 跟踪未完成的祈祷 | Global Salah`;
      description = `使用我们的 Qaza Namaz 计算器轻松跟踪并补做未完成的祈祷。高效规划您的补祷计划。`;
      break;
    case 'tr':
      title = `Qaza Namaz Hesaplayıcı – Kaçırılan Namazları Takip Edin | Global Salah`;
      description = `Qaza Namaz Hesaplayıcımızı kullanarak kaçırdığınız namazları kolayca takip edin ve telafi edin. Global Salah ile namazlarınızı verimli şekilde planlayın.`;
      break;
    case 'de':
      title = `Qaza Namaz Rechner – Verpasste Gebete Verfolgen | Global Salah`;
      description = `Nutzen Sie unseren Qaza Namaz Rechner, um verpasste Gebete einfach nachzuholen. Planen Sie Ihre Gebete effizient mit Global Salah.`;
      break;
    case 'pt':
      title = `Calculadora de Qaza Namaz – Acompanhe as Orações Perdidas | Global Salah`;
      description = `Use nossa Calculadora de Qaza Namaz para acompanhar e recuperar facilmente suas orações perdidas. Planeje seus Qaza Namaz de forma eficiente com Global Salah.`;
      break;
    case 'ur':
      title = `قضا نماز کیلکولیٹر – مس ہونے والی نمازوں کو ٹریک کریں | گلوبل صلاح`;
      description = `ہمارا قضا نماز کیلکولیٹر استعمال کریں تاکہ آپ آسانی سے مس ہونے والی نمازوں کو ٹریک اور پورا کر سکیں۔ گلوبل صلاح کے ساتھ اپنی قضا نماز کا منصوبہ بنائیں۔`;
      break;
    default:
      title = `Qaza Namaz Calculator – Track Missed Prayers | Global Salah`;
      description = `Use our Qaza Namaz Calculator to easily track and make up missed prayers. Plan your qaza namaz efficiently with Global Salah.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/qaza-namaz-calculator`,
      en: `https://www.globalsalah.com/en/qaza-namaz-calculator`,
      fr: `https://www.globalsalah.com/fr/qaza-namaz-calculator`,
      ar: `https://www.globalsalah.com/ar/qaza-namaz-calculator`,
      es: `https://www.globalsalah.com/es/qaza-namaz-calculator`,
      pt: `https://www.globalsalah.com/pt/qaza-namaz-calculator`,
      de: `https://www.globalsalah.com/de/qaza-namaz-calculator`,
      tr: `https://www.globalsalah.com/tr/qaza-namaz-calculator`,
      ur: `https://www.globalsalah.com/ur/qaza-namaz-calculator`,
      ru: `https://www.globalsalah.com/ru/qaza-namaz-calculator`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/qaza-namaz-calculator`,
      'x-default': `https://www.globalsalah.com/en/qaza-namaz-calculator`,
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
      <QazaNamazHome/>
    </div>
  )
}

export default page