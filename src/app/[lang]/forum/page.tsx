import React from 'react'
import Home from './Home'


export async function generateMetadata({ params }: any) {
  const lang = params.lang;

  let title = '';
  let description = '';

  switch (lang) {
    case 'fr':
      title = `Forum Global Salah – Connectez-vous, discutez et partagez des connaissances islamiques`;
      description = `Rejoignez le Forum Global Salah pour connecter avec d'autres musulmans, discuter de sujets islamiques et partager des connaissances sur la prière, la foi et la communauté. Engagez-vous dans des conversations significatives dès aujourd'hui !`;
      break;
    case 'ru':
      title = `Глобальный форум «Салах» - общайтесь, обсуждайте и делитесь исламскими знаниями`;
      description = `Присоединяйтесь к Global Salah Forum, чтобы общаться с другими мусульманами, обсуждать исламские темы и делиться знаниями о молитве, вере и общине. Примите участие в содержательных беседах уже сегодня!`;
      break;
    case 'ar':
      title = `منتدى جلوبال صلاح – تواصل، ناقش وشارك المعرفة الإسلامية`;
      description = `انضم إلى منتدى جلوبال صلاح لتتواصل مع المسلمين الآخرين، تناقش المواضيع الإسلامية، وتشارك المعرفة حول الصلاة، الإيمان، والمجتمع. شارك في محادثات ذات معنى اليوم!`;
      break;
    case 'es':
      title = `Foro Global Salah – Conéctate, discute y comparte conocimiento islámico`;
      description = `Únete al Foro Global Salah para conectar con otros musulmanes, discutir temas islámicos y compartir conocimiento sobre la oración, la fe y la comunidad. ¡Participa en conversaciones significativas hoy mismo!`;
      break;
    case 'zh-CN':
      title = `全球萨拉赫论坛 – 连接、讨论并分享伊斯兰知识`;
      description = `加入全球萨拉赫论坛，与其他穆斯林交流，讨论伊斯兰话题，分享关于祈祷、信仰和社区的知识。立即参与有意义的讨论！`;
      break;
    case 'tr':
      title = `Global Salah Forum – Bağlanın, Tartışın ve İslami Bilgileri Paylaşın`;
      description = `Global Salah Forum'a katılın, diğer Müslümanlarla bağlantı kurun, İslami konuları tartışın ve namaz, iman ve topluluk hakkında bilgi paylaşın. Bugün anlamlı sohbetlere katılın!`;
      break;
    case 'de':
      title = `Global Salah Forum – Vernetzen, Diskutieren & Islamisches Wissen Teilen`;
      description = `Treten Sie dem Global Salah Forum bei, um sich mit anderen Muslimen zu verbinden, islamische Themen zu diskutieren und Wissen über Gebet, Glauben und Gemeinschaft zu teilen. Beteiligen Sie sich noch heute an bedeutungsvollen Gesprächen!`;
      break;
    case 'pt':
      title = `Fórum Global Salah – Conecte-se, Discuta e Compartilhe Conhecimento Islâmico`;
      description = `Junte-se ao Fórum Global Salah para conectar-se com outros muçulmanos, discutir temas islâmicos e compartilhar conhecimento sobre oração, fé e comunidade. Participe de conversas significativas hoje!`;
      break;
    case 'ur':
      title = `گلوبل صلاح فورم – جڑیں، گفتگو کریں اور اسلامی علم شیئر کریں`;
      description = `گلوبل صلاح فورم میں شامل ہوں تاکہ دیگر مسلمانوں سے رابطہ کریں، اسلامی موضوعات پر بات چیت کریں، اور نماز، ایمان اور کمیونٹی کے بارے میں علم شیئر کریں۔ آج ہی معنی خیز گفتگو میں شامل ہوں!`;
      break;
    default:
      title = `Global Salah Forum – Connect, Discuss & Share Islamic Knowledge`;
      description = `Join the Global Salah Forum to connect with fellow Muslims, discuss Islamic topics, and share knowledge on prayer, faith, and community. Engage in meaningful conversations today!`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/forum`,
      en: `https://globalsalah.com/en/forum`,
      fr: `https://globalsalah.com/fr/forum`,
      ar: `https://globalsalah.com/ar/forum`,
      tr: `https://globalsalah.com/tr/forum`,
      de: `https://globalsalah.com/de/forum`,
      pt: `https://globalsalah.com/pt/forum`,
      ur: `https://globalsalah.com/ur/forum`,
      ru: `https://globalsalah.com/ru/forum`,
      es: `https://globalsalah.com/es/forum`,
      'zh-CN': `https://globalsalah.com/zh-CN/forum`,
      'x-default': `https://globalsalah.com/en/forum`,
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
            <Home />
        </div>
    )
}

export default page