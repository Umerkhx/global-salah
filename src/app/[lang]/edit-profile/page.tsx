import React from 'react'
import EditProfilePage from './EditProfilePage'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Modifier le Profil – Global Salah`;
      description = `Mettez à jour votre profil sur Global Salah pour personnaliser votre expérience. Gérez vos informations, préférences et paramètres pour une interaction fluide avec la communauté.`;
      break;
    case 'ru':
      title = `Редактировать профиль - Global Salah`;
      description = `Обновите свой профиль на сайте Global Salah, чтобы персонализировать свой опыт. Управляйте своей информацией, предпочтениями и настройками для беспрепятственного взаимодействия с сообществом.`;
      break;
    case 'ar':
      title = `تعديل الملف الشخصي – جلوبال صلاح`;
      description = `قم بتحديث ملفك الشخصي على جلوبال صلاح لتخصيص تجربتك. إدارة معلوماتك وتفضيلاتك وإعداداتك لتعزيز التفاعل داخل المجتمع.`;
      break;
    case 'es':
      title = `Editar Perfil – Global Salah`;
      description = `Actualiza tu perfil en Global Salah para personalizar tu experiencia. Administra tus datos, preferencias y ajustes para una interacción fluida con la comunidad.`;
      break;
    case 'zh-CN':
      title = `编辑个人资料 – 全球萨拉赫`;
      description = `更新您在 全球萨拉赫 上的个人资料，打造个性化体验。管理您的信息、偏好和设置，实现与社区的顺畅互动。`;
      break;
    case 'tr':
      title = `Profili Düzenle – Global Salah`;
      description = `Deneyiminizi kişiselleştirmek için Global Salah üzerindeki profilinizi güncelleyin. Bilgilerinizi, tercihlerinizi ve ayarlarınızı yönetin.`;
      break;
    case 'de':
      title = `Profil bearbeiten – Global Salah`;
      description = `Aktualisieren Sie Ihr Profil bei Global Salah, um Ihre Erfahrung zu personalisieren. Verwalten Sie Ihre Daten, Präferenzen und Einstellungen für eine nahtlose Interaktion in der Community.`;
      break;
    case 'pt':
      title = `Editar Perfil – Global Salah`;
      description = `Atualize seu perfil no Global Salah para personalizar sua experiência. Gerencie seus dados, preferências e configurações para uma interação perfeita com a comunidade.`;
      break;
    case 'ur':
      title = `پروفائل میں ترمیم کریں – گلوبل صلاح`;
      description = `اپنے تجربے کو شخصی بنانے کے لیے گلوبل صلاح پر اپنا پروفائل اپ ڈیٹ کریں۔ اپنی تفصیلات، ترجیحات، اور ترتیبات کا انتظام کریں۔`;
      break;
    default:
      title = `Edit Profile – Global Salah`;
      description = `Update your profile on Global Salah to personalize your experience. Manage your details, preferences, and settings for a seamless community engagement.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/edit-profile`,
      en: `https://globalsalah.com/en/edit-profile`,
      fr: `https://globalsalah.com/fr/edit-profile`,
      ar: `https://globalsalah.com/ar/edit-profile`,
      es: `https://globalsalah.com/es/edit-profile`,
      'zh-CN': `https://globalsalah.com/zh-CN/edit-profile`,
      tr: `https://globalsalah.com/tr/edit-profile`,
      de: `https://globalsalah.com/de/edit-profile`,
      pt: `https://globalsalah.com/pt/edit-profile`,
      ur: `https://globalsalah.com/ur/edit-profile`,
      ru: `https://globalsalah.com/ru/edit-profile`,
      'x-default': `https://globalsalah.com/en/edit-profile`,
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
      <EditProfilePage/>
    </div>
  )
}

export default page