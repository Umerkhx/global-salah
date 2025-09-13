import React from 'react'
import NotificationsPage from './NotificationsPage'

export async function generateMetadata({ params }: any) {
  const lang = await params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Global Salah Notifications – Restez informé des alertes de prière et de la communauté`;
      description = `Recevez des mises à jour en temps réel avec les notifications Global Salah. Restez informé des heures de prière, des événements communautaires et des annonces importantes. Ne manquez jamais une mise à jour !`;
      break;
    case 'ru':
      title = `Глобальные уведомления о саляхах - будьте в курсе событий, связанных с молитвами и оповещениями о сообществах`;
      description = `Получайте обновления в режиме реального времени с помощью уведомлений Global Salah. Будьте в курсе времени молитв, событий в общине и важных объявлений. Никогда не пропускайте обновления!`;
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
    case 'tr':
      title = `Global Salah Bildirimleri – Namaz ve Topluluk Uyarılarında Güncel Kalın`;
      description = `Global Salah bildirimleri ile gerçek zamanlı güncellemeler alın. Namaz vakitleri, topluluk etkinlikleri ve önemli duyurular hakkında bilgi sahibi olun. Hiçbir güncellemeyi kaçırmayın!`;
      break;
    case 'de':
      title = `Global Salah Benachrichtigungen – Bleiben Sie über Gebets- und Gemeinschaftsalarmierungen informiert`;
      description = `Erhalten Sie Echtzeit-Updates mit Global Salah Benachrichtigungen. Bleiben Sie informiert über Gebetszeiten, Gemeinschaftsveranstaltungen und wichtige Ankündigungen. Verpassen Sie kein Update!`;
      break;
    case 'pt':
      title = `Notificações Global Salah – Fique Atualizado com Alertas de Oração e Comunidade`;
      description = `Receba atualizações em tempo real com as notificações do Global Salah. Fique informado sobre horários de oração, eventos comunitários e anúncios importantes. Nunca perca uma atualização!`;
      break;
    case 'ur':
      title = `گلوبل صلاح کی اطلاعات – نماز اور کمیونٹی کی الرٹس سے باخبر رہیں`;
      description = `گلوبل صلاح کی اطلاعات کے ذریعے حقیقی وقت میں اپ ڈیٹس حاصل کریں۔ نماز کے اوقات، کمیونٹی کے پروگرامز اور اہم اعلانات سے باخبر رہیں۔ کوئی اپ ڈیٹ نہ چھوڑیں!`;
      break;
    default:
      title = `Global Salah Notifications – Stay Updated on Prayer & Community Alerts`;
      description = `Get real-time updates with Global Salah notifications. Stay informed on prayer times, community events, and important announcements. Never miss an update!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/notifications`,
      en: `https://globalsalah.com/en/notifications`,
      fr: `https://globalsalah.com/fr/notifications`,
      ar: `https://globalsalah.com/ar/notifications`,
      es: `https://globalsalah.com/es/notifications`,
      'zh-CN': `https://globalsalah.com/zh-CN/notifications`,
      tr: `https://globalsalah.com/tr/notifications`,
      de: `https://globalsalah.com/de/notifications`,
      pt: `https://globalsalah.com/pt/notifications`,
      ur: `https://globalsalah.com/ur/notifications`,
      ru: `https://globalsalah.com/ru/notifications`,
      'x-default': `https://globalsalah.com/en/notifications`,
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
        <NotificationsPage/>
    </div>
  )
}

export default page