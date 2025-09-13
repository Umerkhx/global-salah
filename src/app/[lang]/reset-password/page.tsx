import React from 'react'
import ResetPassword from './ResetPassword'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Réinitialiser le mot de passe – Global Salah`;
      description = `Réinitialisez votre mot de passe Global Salah en toute sécurité. Suivez les étapes pour définir un nouveau mot de passe et sécuriser votre compte.`;
      break;
    case 'ru':
      title = `Сбросить пароль - Глобальный салах`;
      description = `Сбросьте свой пароль Global Salah в безопасном режиме. Выполните следующие действия, чтобы установить новый пароль и защитить свою учетную запись.`;
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
    case 'tr':
      title = `Şifre Sıfırlama – Global Salah`;
      description = `Global Salah hesabınızın şifresini güvenli bir şekilde sıfırlayın. Yeni bir şifre belirlemek ve hesabınızı korumak için adımları takip edin.`;
      break;
    case 'de':
      title = `Passwort zurücksetzen – Global Salah`;
      description = `Setzen Sie Ihr Global Salah Konto-Passwort sicher zurück. Folgen Sie den Schritten, um ein neues Passwort festzulegen und Ihr Konto zu schützen.`;
      break;
    case 'pt':
      title = `Redefinir senha – Global Salah`;
      description = `Redefina com segurança a senha da sua conta Global Salah. Siga os passos para definir uma nova senha e proteger sua conta.`;
      break;
    case 'ur':
      title = `پاس ورڈ ری سیٹ کریں – گلوبل صلاح`;
      description = `اپنے گلوبل صلاح اکاؤنٹ کا پاس ورڈ محفوظ طریقے سے ری سیٹ کریں۔ نیا پاس ورڈ سیٹ کرنے اور اپنے اکاؤنٹ کو محفوظ بنانے کے لیے مراحل پر عمل کریں۔`;
      break;
    default:
      title = `Reset Password – Global Salah`;
      description = `Securely reset your Global Salah account password. Follow the steps to set a new password and protect your account.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/reset-password`,
      en: `https://globalsalah.com/en/reset-password`,
      fr: `https://globalsalah.com/fr/reset-password`,
      ar: `https://globalsalah.com/ar/reset-password`,
      es: `https://globalsalah.com/es/reset-password`,
      'zh-CN': `https://globalsalah.com/zh-CN/reset-password`,
      tr: `https://globalsalah.com/tr/reset-password`,
      de: `https://globalsalah.com/de/reset-password`,
      pt: `https://globalsalah.com/pt/reset-password`,
      ur: `https://globalsalah.com/ur/reset-password`,
      ru: `https://globalsalah.com/ru/reset-password`,
      'x-default': `https://globalsalah.com/en/reset-password`,
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
        <ResetPassword/>
    </div>
  )
}

export default page