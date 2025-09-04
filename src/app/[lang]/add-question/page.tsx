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
    case 'ru':
      title = `Задать вопрос - Форум Глобальный Салах`;
      description = `У вас есть вопрос о молитве, вере или исламских учениях? Задайте свой вопрос на форуме Global Salah и получите ответы от сообщества. Начните обсуждение прямо сейчас!`;
      break;
    case 'ar':
      title = `اطرح سؤالًا – منتدى جلوبال صلاح`;
      description = `هل لديك سؤال حول الصلاة أو الإيمان أو التعاليم الإسلامية؟ اطرح سؤالك في منتدى جلوبال صلاح واحصل على إجابات من المجتمع. ابدأ النقاش الآن!`;
      break;
    case 'zh-CN':
      title = `提出问题 – 全球萨拉赫 论坛`;
      description = `关于祈祷、信仰或伊斯兰教义有疑问？在 全球萨拉赫 论坛发帖提问，获取社区的解答。立即开始讨论！`;
      break;
    case 'tr':
      title = `Soru Sor – Global Salah Forumu`;
      description = `Namaz, inanç veya İslami öğretiler hakkında bir sorunuz mu var? Sorunuzu Global Salah Forumunda paylaşın ve topluluktan yanıtlar alın. Tartışmaya hemen başlayın!`;
      break;
    case 'de':
      title = `Stelle eine Frage – Global Salah Forum`;
      description = `Hast du eine Frage zum Gebet, Glauben oder zu islamischen Lehren? Stelle deine Frage im Global Salah Forum und erhalte Antworten von der Community. Starte jetzt die Diskussion!`;
      break;
    case 'pt':
      title = `Faça uma Pergunta – Fórum Global Salah`;
      description = `Tem uma pergunta sobre oração, fé ou os ensinamentos islâmicos? Publique sua pergunta no Fórum Global Salah e receba respostas da comunidade. Comece a discussão agora!`;
      break;
    case 'ur':
      title = `سوال پوچھیں – گلوبل صلاح فورم`;
      description = `کیا آپ کے ذہن میں نماز، ایمان یا اسلامی تعلیمات سے متعلق کوئی سوال ہے؟ گلوبل صلاح فورم پر اپنا سوال پوسٹ کریں اور کمیونٹی سے جوابات حاصل کریں۔ ابھی بحث کا آغاز کریں!`;
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
        tr: 'https://www.globalsalah.com/tr/add-question',
        de: 'https://www.globalsalah.com/de/add-question',
        pt: 'https://www.globalsalah.com/pt/add-question',
        ur: 'https://www.globalsalah.com/ur/add-question',
        ru: 'https://www.globalsalah.com/ru/add-question',
        'x-default': 'https://www.globalsalah.com/en/add-question',
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



export default function Page() {
  return (
    <div >
      <AddQuestionPage />
    </div>
  )
}

