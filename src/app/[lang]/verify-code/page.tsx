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
    case 'ru':
      title = `Проверьте свой код - безопасный доступ к Global Salah`;
      description = `Введите проверочный код для безопасного доступа к вашей учетной записи Global Salah. Защитите свою информацию и продолжайте путешествие с легкостью.`;
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
    case 'tr':
      title = `Kodunuzu Doğrulayın – Global Salah Güvenli Erişim`;
      description = `Global Salah hesabınıza güvenli bir şekilde erişmek için doğrulama kodunuzu girin. Bilgilerinizi koruyun ve yolculuğunuza sorunsuz devam edin.`;
      break;
    case 'de':
      title = `Überprüfen Sie Ihren Code – Sicherer Zugriff Global Salah`;
      description = `Geben Sie Ihren Bestätigungscode ein, um sicher auf Ihr Global Salah-Konto zuzugreifen. Schützen Sie Ihre Informationen und setzen Sie Ihre Reise nahtlos fort.`;
      break;
    case 'pt':
      title = `Verifique Seu Código – Acesso Seguro Global Salah`;
      description = `Digite seu código de verificação para acessar sua conta Global Salah com segurança. Proteja suas informações e continue sua jornada com autenticação tranquila.`;
      break;
    case 'ur':
      title = `اپنا کوڈ تصدیق کریں – گلوبل صلاح محفوظ رسائی`;
      description = `اپنے گلوبل صلاح اکاؤنٹ تک محفوظ رسائی کے لیے اپنا تصدیقی کوڈ درج کریں۔ اپنی معلومات کا تحفظ کریں اور آسان تصدیق کے ساتھ اپنا سفر جاری رکھیں۔`;
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
      tr: `https://www.globalsalah.com/tr/verify-code`,
      de: `https://www.globalsalah.com/de/verify-code`,
      pt: `https://www.globalsalah.com/pt/verify-code`,
      ur: `https://www.globalsalah.com/ur/verify-code`,
      ru: `https://www.globalsalah.com/ru/verify-code`,
      'x-default': `https://www.globalsalah.com/en/verify-code`,
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
      <VerifyCodePage/>
    </div>
  )
}

export default page