import React from 'react'
import Home from './Home'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Modifier le Profil – Global Salah`;
      description = `Mettez à jour votre profil sur Global Salah pour personnaliser votre expérience. Gérez vos informations, préférences et paramètres pour une interaction fluide avec la communauté.`;
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
      description = `更新您的 全球萨拉赫 个人资料，打造个性化体验。管理您的信息、偏好和设置，实现顺畅的社区互动。`;
      break;
    default:
      title = `Edit Profile – Global Salah`;
      description = `Update your profile on Global Salah to personalize your experience. Manage your details, preferences, and settings for a seamless community engagement.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/edit-profile`,
      languages: {
        en: `https://www.globalsalah.com/en/edit-profile`,
        fr: `https://www.globalsalah.com/fr/edit-profile`,
        ar: `https://www.globalsalah.com/ar/edit-profile`,
        es: `https://www.globalsalah.com/es/edit-profile`,
        'zh-CN': `https://www.globalsalah.com/zh-CN/edit-profile`,
        'x-default': `https://www.globalsalah.com/en/edit-profile`,
      },
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
            <Home />
        </div>
    )
}

export default page