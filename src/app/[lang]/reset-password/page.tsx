import React from 'react'
import ResetPassword from './ResetPassword'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Réinitialiser le mot de passe – Global Salah`;
      description = `Réinitialisez votre mot de passe Global Salah en toute sécurité. Suivez les étapes pour définir un nouveau mot de passe et sécuriser votre compte.`;
      break;
    case 'ar':
      title = `إعادة تعيين كلمة المرور – جلوبال صلاح`;
      description = `أعد تعيين كلمة مرور حسابك على جلوبال صلاح بأمان. اتبع الخطوات لإعداد كلمة مرور جديدة وتأمين حسابك.`;
      break;
    case 'es':
      title = `Restablecer la contraseña – Global Salah`;
      description = `Restablezca de forma segura la contraseña de su cuenta de Global Salah. Siga los pasos para establecer una nueva contraseña y proteger su cuenta.`;
      break;
    case 'zh-CN':
      title = `重置密码 – 全球萨拉赫`;
      description = `安全地重置您的 全球萨拉赫 账户密码。按照步骤设置新密码，保护您的账户安全。`;
      break;
    default:
      title = `Reset Password – Global Salah`;
      description = `Securely reset your Global Salah account password. Follow the steps to set a new password and protect your account.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/reset-password`,
      en: `https://www.globalsalah.com/en/reset-password`,
      fr: `https://www.globalsalah.com/fr/reset-password`,
      ar: `https://www.globalsalah.com/ar/reset-password`,
      es: `https://www.globalsalah.com/es/reset-password`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/reset-password`,
      'x-default': `https://www.globalsalah.com/en/reset-password`,
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
        <ResetPassword/>
    </div>
  )
}

export default page