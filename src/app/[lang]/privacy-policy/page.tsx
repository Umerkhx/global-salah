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
    case 'ru':
      title = `Global Salah информирует вас, сохраняя конфиденциальность`;
      description = `Global Salah собирает личную информацию от своих пользователей в соответствии со строгой политикой конфиденциальности. Мы не передаем ваши данные никому без вашего разрешения.`;
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
    case 'tr':
      title = `Global Salah gizliliği koruyarak size güncellemeler sağlar`;
      description = `Global Salah, kullanıcılarının kişisel bilgilerini gizlilik politikalarına sıkı sıkıya uyarak toplar. İzniniz olmadan verilerinizi kimseyle paylaşmayız.`;
      break;
    case 'de':
      title = `Global Salah informiert Sie unter Wahrung der Vertraulichkeit`;
      description = `Global Salah sammelt persönliche Informationen seiner Nutzer unter Einhaltung strenger Datenschutzrichtlinien. Wir teilen Ihre Daten ohne Ihre Erlaubnis mit niemandem.`;
      break;
    case 'pt':
      title = `Global Salah informa você mantendo a confidencialidade`;
      description = `Global Salah coleta informações pessoais de seus usuários respeitando uma política rigorosa de privacidade. Não compartilhamos seus dados com ninguém sem sua permissão.`;
      break;
    case 'ur':
      title = `گلوبل صلاح آپ کو رازداری برقرار رکھتے ہوئے تازہ ترین معلومات فراہم کرتا ہے`;
      description = `گلوبل صلاح اپنے صارفین کی ذاتی معلومات کو سخت پرائیویسی پالیسی کے تحت جمع کرتا ہے۔ ہم آپ کی اجازت کے بغیر آپ کا ڈیٹا کسی کے ساتھ شیئر نہیں کرتے۔`;
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
      tr: `https://www.globalsalah.com/tr/privacy-policy`,
      de: `https://www.globalsalah.com/de/privacy-policy`,
      pt: `https://www.globalsalah.com/pt/privacy-policy`,
      ur: `https://www.globalsalah.com/ur/privacy-policy`,
      ru: `https://www.globalsalah.com/ru/privacy-policy`,
      'x-default': `https://www.globalsalah.com/en/privacy-policy`,
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
      <PrivacyContent />
    </div>
  )
}

export default page