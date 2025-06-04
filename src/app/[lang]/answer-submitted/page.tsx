import React from 'react'
import AnswerSubmitted from './AnswerSubmitted'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Réponse soumise avec succès – Forum Global Salah`;
      description = `Votre réponse a été soumise avec succès ! Merci pour votre contribution. Restez à l'écoute pour les mises à jour ou soumettez une autre réponse si nécessaire.`;
      break;
    case 'ar':
      title = `تم إرسال الإجابة بنجاح – منتدى جلوبال صلاح`;
      description = `تم إرسال إجابتك بنجاح! شكرًا لمساهمتك. ترقب التحديثات أو أضف إجابة أخرى إذا لزم الأمر.`;
      break;
    case 'zh-CN':
      title = `回答提交成功 – Global Salah 论坛`;
      description = `您的回答已成功提交！感谢您的参与。如有需要，您可以继续关注或提交另一个回答。`;
      break;
    case 'es':
      title = `Respuesta enviada con éxito – Foro de Global Salah`;
      description = `¡Tu respuesta ha sido enviada con éxito! Gracias por tu participación. Mantente atento para más actualizaciones o envía otra respuesta si es necesario.`;
      break;
    default:
      title = `Answer Submitted Successfully – Global Salah Forum`;
      description = `Your answer has been submitted successfully! Thank you for your response. Stay tuned for updates or submit another answer if needed.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/answer-submitted`,
      languages: {
        en: 'https://www.globalsalah.com/en/answer-submitted',
        fr: 'https://www.globalsalah.com/fr/answer-submitted',
        ar: 'https://www.globalsalah.com/ar/answer-submitted',
        'zh-CN': 'https://www.globalsalah.com/zh-CN/answer-submitted',
        es: 'https://www.globalsalah.com/es/answer-submitted',
        'x-default': 'https://www.globalsalah.com/en/answer-submitted',
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
        <AnswerSubmitted/>
    </div>
  )
}

export default page