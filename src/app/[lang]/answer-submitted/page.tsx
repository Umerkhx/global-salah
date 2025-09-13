import React from 'react'
import AnswerSubmitted from './AnswerSubmitted'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Réponse soumise avec succès – Forum Global Salah`;
      description = `Votre réponse a été soumise avec succès ! Merci pour votre contribution. Restez à l'écoute pour les mises à jour ou soumettez une autre réponse si nécessaire.`;
      break;
    case 'ru':
      title = `Ответ успешно отправлен - Форум Глобальный Салах`;
      description = `Ваш ответ был успешно отправлен! Спасибо за ваш вклад. Следите за обновлениями или при необходимости отправьте еще один ответ.`;
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
    case 'tr':
      title = `Yanıt Başarıyla Gönderildi – Global Salah Forumu`;
      description = `Yanıtınız başarıyla gönderildi! Katkınız için teşekkür ederiz. Güncellemeleri takip edin veya gerekirse başka bir yanıt gönderin.`;
      break;
    case 'de':
      title = `Antwort erfolgreich übermittelt – Global Salah Forum`;
      description = `Ihre Antwort wurde erfolgreich übermittelt! Vielen Dank für Ihre Teilnahme. Bleiben Sie dran für Updates oder senden Sie bei Bedarf eine weitere Antwort.`;
      break;
    case 'pt':
      title = `Resposta enviada com sucesso – Fórum Global Salah`;
      description = `Sua resposta foi enviada com sucesso! Obrigado pela sua contribuição. Fique atento para atualizações ou envie outra resposta, se necessário.`;
      break;
    case 'ur':
      title = `جواب کامیابی سے بھیج دیا گیا – گلوبل صلاح فورم`;
      description = `آپ کا جواب کامیابی سے بھیج دیا گیا ہے! آپ کی شرکت کا شکریہ۔ اپ ڈیٹس کے لیے باخبر رہیں یا ضرورت پڑنے پر ایک اور جواب جمع کروائیں۔`;
      break;
    default:
      title = `Answer Submitted Successfully – Global Salah Forum`;
      description = `Your answer has been submitted successfully! Thank you for your response. Stay tuned for updates or submit another answer if needed.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/answer-submitted`,
      languages: {
        en: 'https://globalsalah.com/en/answer-submitted',
        fr: 'https://globalsalah.com/fr/answer-submitted',
        ar: 'https://globalsalah.com/ar/answer-submitted',
        'zh-CN': 'https://globalsalah.com/zh-CN/answer-submitted',
        es: 'https://globalsalah.com/es/answer-submitted',
        tr: 'https://globalsalah.com/tr/answer-submitted',
        de: 'https://globalsalah.com/de/answer-submitted',
        pt: 'https://globalsalah.com/pt/answer-submitted',
        ur: 'https://globalsalah.com/ur/answer-submitted',
        ru: 'https://globalsalah.com/ru/answer-submitted',
        'x-default': 'https://globalsalah.com/en/answer-submitted',
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



function page() {
  return (
    <div>
        <AnswerSubmitted/>
    </div>
  )
}

export default page