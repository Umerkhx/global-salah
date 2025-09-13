import QiblaFinder from "./qibla-finder";


export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Trouver la Qibla – Direction de Prière Précise | Global Salah`;
      description = `Utilisez notre outil de localisation de la Qibla pour déterminer avec précision la direction de la Mecque depuis n’importe où dans le monde.`;
      break;
    case 'ru':
      title = `Поиск Киблы - точное направление молитвы | Global Salah`;
      description = `Используйте наш локатор Киблы, чтобы определить точное направление на Мекку из любой точки мира.`;
      break;
    case 'ar':
      title = `تحديد اتجاه القبلة – اعرف اتجاه مكة بدقة | جلوبال صلاح`;
      description = `استخدم أداة تحديد اتجاه القبلة لمعرفة الاتجاه الصحيح للصلاة أينما كنت حول العالم.`;
      break;
    case 'es':
      title = `Buscador de Qibla – Dirección Precisa de Oración | Global Salah`;
      description = `Utiliza nuestra herramienta de búsqueda de la Qibla para determinar la dirección precisa de La Meca desde cualquier lugar del mundo. Alinea tus oraciones con precisión.`;
      break;
    case 'zh-CN':
      title = `寻找朝拜方向 – 精确的祷告方向 | Global Salah`;
      description = `使用我们的朝拜方向查找工具，从世界任何地方准确确定麦加的方向。精确调整您的祷告方向。`;
      break;
    case 'tr':
      title = `Kıble Bulucu – Doğru Namaz Yönü | Global Salah`;
      description = `Kıble Bulucu aracımızı kullanarak dünyanın herhangi bir yerinden Mekke'nin doğru yönünü belirleyin. Namazlarınızı hassas bir şekilde yönlendirin.`;
      break;
    case 'de':
      title = `Qibla Finder – Genaue Gebetsrichtung | Global Salah`;
      description = `Verwenden Sie unser Qibla Finder Tool, um die genaue Richtung nach Mekka von überall auf der Welt zu bestimmen. Richten Sie Ihre Gebete präzise aus.`;
      break;
    case 'pt':
      title = `Localizador de Qibla – Direção Precisa de Oração | Global Salah`;
      description = `Use nossa ferramenta Localizador de Qibla para determinar a direção precisa de Meca de qualquer lugar do mundo. Alinhe suas orações com precisão.`;
      break;
    case 'ur':
      title = `قبلہ فائنڈر – درست نماز کی سمت | گلوبل صلاح`;
      description = `ہمارا قبلہ فائنڈر ٹول استعمال کریں تاکہ دنیا کے کسی بھی مقام سے مکہ مکرمہ کی درست سمت معلوم کریں۔ اپنی نمازوں کی سمت درست طریقے سے سیدھ کریں۔`;
      break;
    default:
      title = `Qibla Finder – Accurate Prayer Direction | Global Salah`;
      description = `Use our Qibla Finder tool to determine the accurate direction of Makkah from anywhere in the world. Align your prayers with precision.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/qibla-finder`,
      en: `https://globalsalah.com/en/qibla-finder`,
      fr: `https://globalsalah.com/fr/qibla-finder`,
      ar: `https://globalsalah.com/ar/qibla-finder`,
      es: `https://globalsalah.com/es/qibla-finder`,
      de: `https://globalsalah.com/de/qibla-finder`,
      pt: `https://globalsalah.com/pt/qibla-finder`,
      ur: `https://globalsalah.com/ur/qibla-finder`,
      ru: `https://globalsalah.com/ru/qibla-finder`,
      tr: `https://globalsalah.com/tr/qibla-finder`,
      'zh-CN': `https://globalsalah.com/zh-CN/qibla-finder`,
      'x-default': `https://globalsalah.com/en/qibla-finder`,
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





export default function Home() {
  return (
    <main className="py-10 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-900 dark:text-white">
      <QiblaFinder />
    </main>
  )
}
