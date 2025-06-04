import React from 'react'
import PrivacyContent from './PrivacyContent'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Global Salah vous informe tout en préservant la confidentialité`;
      description = `Global Salah collecte les informations personnelles de ses utilisateurs tout en respectant une politique de confidentialité stricte. Nous ne partageons vos données avec personne sans votre autorisation.`;
      break;
    case 'ar':
      title = `جلوبال صلاح توفر لك التحديثات مع الحفاظ على السرية`;
      description = `جلوبال صلاح تجمع المعلومات الشخصية لمستخدميها مع الحفاظ على سياسة خصوصية صارمة. لا نشارك بياناتك مع أي طرف دون إذنك.`;
      break;
    case 'es':
      title = `Global Salah le informa manteniendo la confidencialidad`;
      description = `Global Salah recopila la información personal de sus usuarios respetando una estricta política de privacidad. No compartimos sus datos con nadie sin su permiso.`;
      break;
    case 'zh-CN':
      title = `全球萨拉赫 在保护隐私的同时为您提供更新`;
      description = `全球萨拉赫 收集用户的个人信息，并严格遵守隐私政策。未经您的许可，我们不会与任何人共享您的数据。`;
      break;
    default:
      title = `Global Salah provide you update while maintaining confidentiality`;
      description = `Global Salah collect personal information of their users with maintaining strict privacy and policy. we do not share your data with anyone without your permission.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/privacy-policy`,
      en: `https://www.globalsalah.com/en/privacy-policy`,
      fr: `https://www.globalsalah.com/fr/privacy-policy`,
      ar: `https://www.globalsalah.com/ar/privacy-policy`,
      es: `https://www.globalsalah.com/es/privacy-policy`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/privacy-policy`,
      'x-default': `https://www.globalsalah.com/en/privacy-policy`,
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
      <PrivacyContent />
    </div>
  )
}

export default page