import type React from "react"
import AddQuestionPage from "./QuestionAdd"


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Posez une question – Forum Global Salah`;
      description = `Vous avez une question sur la prière, la foi ou les enseignements islamiques ? Publiez votre question sur le forum Global Salah et obtenez des réponses de la communauté. Lancez la discussion dès maintenant !`;
      break;
    case 'ar':
      title = `اطرح سؤالًا – منتدى جلوبال صلاح`;
      description = `هل لديك سؤال حول الصلاة أو الإيمان أو التعاليم الإسلامية؟ اطرح سؤالك في منتدى جلوبال صلاح واحصل على إجابات من المجتمع. ابدأ النقاش الآن!`;
      break;
    case 'zh-CN':
      title = `提出问题 – 全球萨拉赫 论坛`;
      description = `关于祈祷、信仰或伊斯兰教义有疑问？在 全球萨拉赫 论坛发帖提问，获取社区的解答。立即开始讨论！`;
      break;
    default:
      title = `Ask a Question – Global Salah Forum`;
      description = `Have a question about prayer, faith, or Islamic teachings? Post your question on the Global Salah Forum and get answers from the community. Start the discussion now!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/add-question`,
      languages: {
        en: 'https://www.globalsalah.com/en/add-question',
        fr: 'https://www.globalsalah.com/fr/add-question',
        ar: 'https://www.globalsalah.com/ar/add-question',
        'zh-CN': 'https://www.globalsalah.com/zh-CN/add-question',
        'x-default': 'https://www.globalsalah.com/en/add-question',
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



export default function Page() {
  return (
    <div >
      <AddQuestionPage />
    </div>
  )
}

