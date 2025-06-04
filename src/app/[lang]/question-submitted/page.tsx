import React from 'react'
import QuestionSubmit from './QuestionSubmit'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Question Soumise – Global Salah`;
      description = `Votre question a été soumise avec succès sur Global Salah. Notre communauté l'examinera et répondra bientôt. Restez à l'écoute pour des discussions et réponses enrichissantes !`;
      break;
    case 'ar':
      title = `تم إرسال السؤال – جلوبال صلاح`;
      description = `تم إرسال سؤالك بنجاح على جلوبال صلاح. ستقوم مجتمعنا بمراجعته والرد قريباً. تابعنا للنقاشات والإجابات المفيدة!`;
      break;
    case 'es':
      title = `Pregunta Enviada – Global Salah`;
      description = `Su pregunta ha sido enviada con éxito en Global Salah. Nuestra comunidad la revisará y responderá pronto. ¡Manténgase atento para discusiones y respuestas informativas!`;
      break;
    case 'zh-CN':
      title = `问题已提交 – 全球萨拉赫`;
      description = `您的问题已成功提交到 全球萨拉赫。我们的社区将尽快审核并回复。敬请关注深入的讨论和答案！`;
      break;
    default:
      title = `Question Submitted – Global Salah`;
      description = `Your question has been successfully submitted on Global Salah. Our community will review and respond soon. Stay tuned for insightful discussions and answers!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/question-submitted`,
      en: `https://www.globalsalah.com/en/question-submitted`,
      fr: `https://www.globalsalah.com/fr/question-submitted`,
      ar: `https://www.globalsalah.com/ar/question-submitted`,
      es: `https://www.globalsalah.com/es/question-submitted`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/question-submitted`,
      'x-default': `https://www.globalsalah.com/en/question-submitted`,
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
      <QuestionSubmit/>
    </div>
  )
}

export default page