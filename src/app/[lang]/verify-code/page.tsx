import React from 'react'
import VerifyCodePage from './VerifyCodePage'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Vérifiez votre code – Accès sécurisé Global Salah`;
      description = `Saisissez votre code de vérification pour accéder en toute sécurité à votre compte Global Salah. Protégez vos informations et poursuivez votre parcours en toute simplicité.`;
      break;
    case 'ar':
      title = `تحقق من الرمز – وصول آمن إلى جلوبال صلاح`;
      description = `أدخل رمز التحقق للوصول الآمن إلى حسابك على جلوبال صلاح. احمِ معلوماتك وتابع رحلتك بسهولة.`;
      break;
    case 'es':
      title = `Verifica tu código – Acceso seguro Global Salah`;
      description = `Ingresa tu código de verificación para acceder de manera segura a tu cuenta de Global Salah. Protege tu información y continúa tu camino con autenticación sencilla.`;
      break;
    case 'zh-CN':
      title = `验证您的代码 – 全球萨拉赫安全访问`;
      description = `输入您的验证码以安全访问您的全球萨拉赫账户。保护您的信息，轻松继续您的旅程。`;
      break;
    default:
      title = `Verify Your Code – Global Salah Secure Access`;
      description = `Enter your verification code to securely access your Global Salah account. Protect your information and continue your journey with seamless authentication.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/verify-code`,
      en: `https://www.globalsalah.com/en/verify-code`,
      fr: `https://www.globalsalah.com/fr/verify-code`,
      ar: `https://www.globalsalah.com/ar/verify-code`,
      es: `https://www.globalsalah.com/es/verify-code`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/verify-code`,
      'x-default': `https://www.globalsalah.com/en/verify-code`,
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
      <VerifyCodePage/>
    </div>
  )
}

export default page