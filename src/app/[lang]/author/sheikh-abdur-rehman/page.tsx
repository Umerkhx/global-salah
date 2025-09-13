import React from 'react'
import AuthorBanner from './author-banner'
import AuthorTestmonials from './author-testmonials'
import AuthorBlogs from './author-blogs'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Sheikh Abdur Rehman – Auteur et Blogueur Islamique`;
      description = `Découvrez les réflexions de Sheikh Abdur Rehman sur l'Islam, la spiritualité et la foi quotidienne. Plus d'une décennie d'expérience d'écriture pour guider les lecteurs avec authenticité.`;
      break;
    case 'ru':
      title = `Шейх Абдур Рехман – Исламский Автор и Блогер`;
      description = `Откройте для себя размышления Шейха Абдура Рехмана о исламе, духовности и повседневной вере. Более десяти лет опыта письма, чтобы направлять читателей с подлинными знаниями.`;
      break;
    case 'ar':
      title = `الشيخ عبد الرحمن – مؤلف ومدون إسلامي`;
      description = `اكتشف تأملات الشيخ عبد الرحمن حول الإسلام والروحانية والإيمان اليومي. أكثر من عقد من الخبرة الكتابية لإرشاد القراء بمعرفة أصيلة.`;
      break;
    case 'zh-CN':
      title = `谢赫 阿卜杜尔·雷赫曼 – 伊斯兰作者与博主`;
      description = `探索谢赫 阿卜杜尔·雷赫曼关于伊斯兰、灵性和日常信仰的见解。拥有十多年写作经验，引导读者获取真实知识。`;
      break;
    case 'tr':
      title = `Şeyh Abdur Rehman – İslami Yazar ve Blog Yazarı`;
      description = `Şeyh Abdur Rehman'ın İslam, maneviyat ve günlük inanç üzerine içgörülerini keşfedin. Okuyucuları otantik bilgilerle yönlendiren on yılı aşkın yazarlık tecrübesi.`;
      break;
    case 'de':
      title = `Sheikh Abdur Rehman – Muslimischer Autor & Blogger`;
      description = `Entdecken Sie die Einsichten von Sheikh Abdur Rehman über Islam, Spiritualität und den Alltag des Glaubens. Über ein Jahrzehnt Erfahrung im Schreiben, um Leser authentisch zu begleiten.`;
      break;
    case 'pt':
      title = `Sheikh Abdur Rehman – Autor e Blogueiro Islâmico`;
      description = `Descubra os pensamentos de Sheikh Abdur Rehman sobre o Islã, espiritualidade e fé cotidiana. Mais de uma década de experiência em escrita para guiar os leitores com conhecimento autêntico.`;
      break;
    case 'ur':
      title = `شیخ عبد الرحمن – مسلم مصنف اور بلاگر`;
      description = `شیخ عبد الرحمن کی اسلام، روحانیت اور روزمرہ ایمان پر بصیرتیں دریافت کریں۔ قارئین کو مستند علم کے ساتھ رہنمائی فراہم کرنے کا دس سال سے زیادہ کا تجربہ۔`;
      break;
    default:
      title = `Sheikh Abdur Rehman – Muslim Author & Islamic Blogger`;
      description = `Explore the insights of Sheikh Abdur Rehman on Islam, spirituality, and everyday faith. Over a decade of writing experience guiding readers with authentic knowledge.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/author/sheikh-abdur-rehman`,
      languages: {
        en: 'https://globalsalah.com/en/author/sheikh-abdur-rehman',
        fr: 'https://globalsalah.com/fr/author/sheikh-abdur-rehman',
        ar: 'https://globalsalah.com/ar/author/sheikh-abdur-rehman',
        'zh-CN': 'https://globalsalah.com/zh-CN/author/sheikh-abdur-rehman',
        tr: 'https://globalsalah.com/tr/author/sheikh-abdur-rehman',
        de: 'https://globalsalah.com/de/author/sheikh-abdur-rehman',
        pt: 'https://globalsalah.com/pt/author/sheikh-abdur-rehman',
        ur: 'https://globalsalah.com/ur/author/sheikh-abdur-rehman',
        ru: 'https://globalsalah.com/ru/author/sheikh-abdur-rehman',
        'x-default': 'https://globalsalah.com/en/author/sheikh-abdur-rehman',
      },
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



type PageProps = {
  params: {
    lang: string;
  };
};


const page: React.FC<PageProps> = ({ params }) => {
  const { lang } = params;

  return (
    <div>
        <AuthorBanner/>
        <AuthorBlogs lang={lang} />
        <AuthorTestmonials/>
    </div>
  )
}

export default page