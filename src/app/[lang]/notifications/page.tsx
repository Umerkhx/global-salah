import React from 'react'
import NotificationsPage from './NotificationsPage'

export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Global Salah Notifications – Restez informé des alertes de prière et de la communauté`;
      description = `Recevez des mises à jour en temps réel avec les notifications Global Salah. Restez informé des heures de prière, des événements communautaires et des annonces importantes. Ne manquez jamais une mise à jour !`;
      break;
    case 'ar':
      title = `إشعارات جلوبال صلاح – ابقَ على اطلاع بالتنبيهات الخاصة بالصلاة والمجتمع`;
      description = `احصل على تحديثات فورية مع إشعارات جلوبال صلاح. كن على علم بمواعيد الصلاة، والفعاليات المجتمعية، والإعلانات المهمة. لا تفوت أي تحديث!`;
      break;
    case 'es':
      title = `Notificaciones de Global Salah – Mantente actualizado con alertas de oración y comunidad`;
      description = `Recibe actualizaciones en tiempo real con las notificaciones de Global Salah. Mantente informado sobre los horarios de oración, eventos comunitarios y anuncios importantes. ¡No te pierdas ninguna actualización!`;
      break;
    case 'zh-CN':
      title = `全球萨拉赫 通知 – 实时获取祷告和社区提醒`;
      description = `通过 全球萨拉赫 通知获取实时更新。随时了解祷告时间、社区活动和重要公告。绝不错过任何更新！`;
      break;
    default:
      title = `Global Salah Notifications – Stay Updated on Prayer & Community Alerts`;
      description = `Get real-time updates with Global Salah notifications. Stay informed on prayer times, community events, and important announcements. Never miss an update!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.globalsalah.com/${lang}/notifications`,
      en: `https://www.globalsalah.com/en/notifications`,
      fr: `https://www.globalsalah.com/fr/notifications`,
      ar: `https://www.globalsalah.com/ar/notifications`,
      es: `https://www.globalsalah.com/es/notifications`,
      'zh-CN': `https://www.globalsalah.com/zh-CN/notifications`,
      'x-default': `https://www.globalsalah.com/en/notifications`,
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
        <NotificationsPage/>
    </div>
  )
}

export default page