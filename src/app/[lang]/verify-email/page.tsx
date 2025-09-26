import React from 'react'
import VerifyEmailPage from './VerifyEmailPage'


export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = 'Verify Your Email – Global Salah';
  let description = 'Confirm your email to complete your registration on Global Salah. Stay connected with the community and access all features seamlessly. Verify now!';

  switch (lang) {
    case 'fr':
      title = `Vérifiez votre e-mail – Global Salah`;
      description = `Confirmez votre e-mail pour compléter votre inscription sur Global Salah. Restez connecté avec la communauté et accédez à toutes les fonctionnalités sans interruption. Vérifiez maintenant !`;
      break;
    case 'ru':
      title = `Проверьте свою электронную почту - Глобальный салах`;
      description = `Подтвердите свой e-mail, чтобы завершить регистрацию на сайте Global Salah. Оставайтесь на связи с сообществом и получайте доступ ко всем функциям без перерыва. Проверьте это прямо сейчас!`;
      break;
    case 'ar':
      title = `تحقق من بريدك الإلكتروني – جلوبال صلاح`;
      description = `قم بتأكيد بريدك الإلكتروني لإكمال التسجيل في جلوبال صلاح. ابقَ متصلاً بالمجتمع وتمتع بالوصول إلى جميع الميزات بسلاسة. تحقق الآن!`;
      break;
    case 'es':
      title = `Verifica tu correo electrónico – Global Salah`;
      description = `Confirma tu correo electrónico para completar tu registro en Global Salah. Mantente conectado con la comunidad y accede a todas las funciones sin problemas. ¡Verifica ahora!`;
      break;
    case 'zh-CN':
      title = `验证您的电子邮件 – 全球萨拉赫`;
      description = `确认您的电子邮件以完成在 全球萨拉赫 的注册。保持与社区的联系，畅享所有功能。立即验证！`;
      break;
    case 'tr':
      title = `E-postanızı Doğrulayın – Global Salah`;
      description = `Kayıt işleminizi tamamlamak için e-postanızı doğrulayın. Toplulukla bağlı kalın ve tüm özelliklere sorunsuzca erişin. Hemen doğrulayın!`;
      break;
    case 'de':
      title = `Bestätigen Sie Ihre E-Mail – Global Salah`;
      description = `Bestätigen Sie Ihre E-Mail, um Ihre Registrierung bei Global Salah abzuschließen. Bleiben Sie mit der Gemeinschaft verbunden und nutzen Sie alle Funktionen nahtlos. Jetzt bestätigen!`;
      break;
    case 'pt':
      title = `Verifique Seu E-mail – Global Salah`;
      description = `Confirme seu e-mail para completar seu cadastro no Global Salah. Mantenha-se conectado com a comunidade e acesse todos os recursos sem interrupções. Verifique agora!`;
      break;
    case 'ur':
      title = `اپنا ای میل تصدیق کریں – گلوبل صلاح`;
      description = `اپنا ای میل تصدیق کریں تاکہ گلوبل صلاح پر اپنی رجسٹریشن مکمل کر سکیں۔ کمیونٹی سے جڑے رہیں اور تمام خصوصیات تک آسانی سے رسائی حاصل کریں۔ ابھی تصدیق کریں!`;
      break;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/verify-email`,
      en: `https://globalsalah.com/en/verify-email`,
      fr: `https://globalsalah.com/fr/verify-email`,
      ar: `https://globalsalah.com/ar/verify-email`,
      es: `https://globalsalah.com/es/verify-email`,
      'zh-CN': `https://globalsalah.com/zh-CN/verify-email`,
      tr: `https://globalsalah.com/tr/verify-email`,
      de: `https://globalsalah.com/de/verify-email`,
      pt: `https://globalsalah.com/pt/verify-email`,
      ur: `https://globalsalah.com/ur/verify-email`,
      ru: `https://globalsalah.com/ru/verify-email`,
      'x-default': `https://globalsalah.com/en/verify-email`,
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
      <VerifyEmailPage/>
    </div>
  )
}

export default page