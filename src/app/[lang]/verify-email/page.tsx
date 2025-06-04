import React from 'react'
import VerifyEmailPage from './VerifyEmailPage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = 'Verify Your Email – Global Salah';
  let description = 'Confirm your email to complete your registration on Global Salah. Stay connected with the community and access all features seamlessly. Verify now!';

  switch (lang) {
    case 'fr':
      title = `Vérifiez votre e-mail – Global Salah`;
      description = `Confirmez votre e-mail pour compléter votre inscription sur Global Salah. Restez connecté avec la communauté et accédez à toutes les fonctionnalités sans interruption. Vérifiez maintenant !`;
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
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/verify-email`,
      en: `https://www.globalsalah.com/en/verify-email`,
      fr: `https://www.globalsalah.com/fr/verify-email`,
      ar: `https://www.globalsalah.com/ar/verify-email`,
      es: `https://www.globalsalah.com/es/verify-email`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/verify-email`,
      'x-default': `https://www.globalsalah.com/en/verify-email`,
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
      <VerifyEmailPage/>
    </div>
  )
}

export default page