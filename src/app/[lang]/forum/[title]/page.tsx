import React from "react";
import QuestionPage from "./single-question";
import { getQuestionByTitle } from "@/services/forum";

export async function generateMetadata({ params }: any) {
  const lang = params.lang;
  const titleSlug = params?.title as string;

  const metaslug = titleSlug
    ?.split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  try {
    const response = await getQuestionByTitle(titleSlug);

    if (response.status === 200) {
      const question = response.data;

      return {
        title: `${question?.title} – Global Salah Forum Discussion`,
        description: `${question?.description} in the Global Salah Forum. Share your insights, ask follow-up questions, and connect with the community.`,
        alternates: {
          canonical: `https://www.globalsalah.com/${lang}/forum/${titleSlug}`,
          en: `https://www.globalsalah.com/en/forum/${titleSlug}`,
          fr: `https://www.globalsalah.com/fr/forum/${titleSlug}`,
          ar: `https://www.globalsalah.com/ar/forum/${titleSlug}`,
          es: `https://www.globalsalah.com/es/forum/${titleSlug}`,
          de: `https://www.globalsalah.com/de/forum/${titleSlug}`,
          tr: `https://www.globalsalah.com/tr/forum/${titleSlug}`,
          pt: `https://www.globalsalah.com/pt/forum/${titleSlug}`,
          ur: `https://www.globalsalah.com/ur/forum/${titleSlug}`,
          'zh-CN': `https://www.globalsalah.com/zh-CN/forum/${titleSlug}`,
          'x-default': `https://www.globalsalah.com/en/forum/${titleSlug}`,
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
  } catch (error) {
    let fallbackTitle = '';
    let fallbackDescription = '';

    switch (lang) {
      case 'fr':
        fallbackTitle = `Question du Forum – Global Salah`;
        fallbackDescription = `Trouvez des réponses à vos questions dans le forum Global Salah. Partagez vos idées et discutez avec la communauté.`;
        break;
      case 'ru':
        fallbackTitle = `Вопрос на форуме - Глобальный салах`;
        fallbackDescription = `Найдите ответы на свои вопросы на форуме Global Salah. Поделитесь своими идеями и обсудите их с сообществом.`;
        break;
      case 'ar':
        fallbackTitle = `سؤال في المنتدى – جلوبال صلاح`;
        fallbackDescription = `ابحث عن إجابات لأسئلتك في منتدى جلوبال صلاح. شارك أفكارك وتواصل مع المجتمع.`;
        break;
      case 'es':
        fallbackTitle = `Pregunta del Foro – Global Salah`;
        fallbackDescription = `Encuentra respuestas a tus preguntas en el foro de Global Salah. Comparte tus ideas y conecta con la comunidad.`;
        break;
      case 'tr':
        fallbackTitle = `Forum Sorusu - Küresel Salah`;
        fallbackDescription = `Global Salah forumunda sorularınıza yanıt bulun. Fikirlerinizi paylaşın ve toplulukla bağlantı kurun.`;
        break;
      case 'de':
        fallbackTitle = `Forum Frage - Global Salah`;
        fallbackDescription = `Finden Sie Antworten auf Ihre Fragen im Global Salah Forum. Teilen Sie Ihre Ideen und vernetzen Sie sich mit der Gemeinschaft.`;
        break;
      case 'pt':
        fallbackTitle = `Pergunta do Fórum - Global Salah`;
        fallbackDescription = `Encontre respostas às suas perguntas no fórum Global Salah. Partilhe as suas ideias e ligue-se à comunidade.`;
        break;
      case 'ur':
        fallbackTitle = `فورم کا سوال - عالمی صلاح`;
        fallbackDescription = `گلوبل صلاح فورم میں اپنے سوالات کے جوابات تلاش کریں۔ اپنے خیالات کا اشتراک کریں اور کمیونٹی سے جڑیں۔`;
        break;
      case 'zh-CN':
        fallbackTitle = `论坛问题 - 全球萨拉赫`;
        fallbackDescription = `在 全球萨拉赫 论坛上找到问题的答案。分享您的想法并与社区建立联系。`;
        break;
      default:
        fallbackTitle = `Forum Question – Global Salah`;
        fallbackDescription = `Find answers to your questions in the Global Salah Forum. Share your thoughts and connect with the community.`;
    }

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: {
        canonical: `https://www.globalsalah.com/${lang}/forum/${titleSlug}`,
        en: `https://www.globalsalah.com/en/forum/${titleSlug}`,
        fr: `https://www.globalsalah.com/fr/forum/${titleSlug}`,
        ar: `https://www.globalsalah.com/ar/forum/${titleSlug}`,
        es: `https://www.globalsalah.com/es/forum/${titleSlug}`,
        de: `https://www.globalsalah.com/de/forum/${titleSlug}`,
        tr: `https://www.globalsalah.com/tr/forum/${titleSlug}`,
        pt: `https://www.globalsalah.com/pt/forum/${titleSlug}`,
        ur: `https://www.globalsalah.com/ur/forum/${titleSlug}`,
        ru: `https://www.globalsalah.com/ru/forum/${titleSlug}`,
        'zh-CN': `https://www.globalsalah.com/zh-CN/forum/${titleSlug}`,
        'x-default': `https://www.globalsalah.com/en/forum/${titleSlug}`,
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
}

function page() {
  return (
    <div>
      <QuestionPage />
    </div>
  );
}

export default page;
