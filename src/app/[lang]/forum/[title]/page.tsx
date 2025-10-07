import QuestionPage from "./single-question"

export async function generateMetadata({ params }: any) {
  const lang = await params.lang
  const titleSlug = params?.title as string

  const metaslug = titleSlug
    ?.split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/questions/get-question-by-title`, {
      cache: "no-store",
    })

    if (response.ok) {
      const data = await response.json()

      const question = data?.questions?.find((q: any) => q.title === metaslug || q.title === titleSlug)

      if (question) {
        return {
          title: `${question?.title} – Global Salah Forum Discussion`,
          description: `${question?.description?.substring(0, 160)}...`,
          alternates: {
            canonical: `https://globalsalah.com/${lang}/forum/${titleSlug}`,
            en: `https://globalsalah.com/en/forum/${titleSlug}`,
            fr: `https://globalsalah.com/fr/forum/${titleSlug}`,
            ar: `https://globalsalah.com/ar/forum/${titleSlug}`,
            es: `https://globalsalah.com/es/forum/${titleSlug}`,
            de: `https://globalsalah.com/de/forum/${titleSlug}`,
            tr: `https://globalsalah.com/tr/forum/${titleSlug}`,
            pt: `https://globalsalah.com/pt/forum/${titleSlug}`,
            ur: `https://globalsalah.com/ur/forum/${titleSlug}`,
            "zh-CN": `https://globalsalah.com/zh-CN/forum/${titleSlug}`,
            "x-default": `https://globalsalah.com/en/forum/${titleSlug}`,
          },
          robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
              index: false,
              follow: false,
              noimageindex: false,
              "max-video-preview": -1,
              "max-image-preview": "large",
              "max-snippet": -1,
            },
          },
          openGraph: {
            title: `${question?.title} – Global Salah Forum Discussion`,
            description: `${question?.description?.substring(0, 160)}...`,
            url: `https://globalsalah.com/${lang}/forum/${titleSlug}`,
            siteName: "Global Salah",
            locale: lang,
            type: "article",
          },
        }
      }
    }
  } catch (error) {
    console.error("Error fetching question for metadata:", error)
  }

  let fallbackTitle = ""
  let fallbackDescription = ""

  switch (lang) {
    case "fr":
      fallbackTitle = `Question du Forum – Global Salah`
      fallbackDescription = `Trouvez des réponses à vos questions dans le forum Global Salah. Partagez vos idées et discutez avec la communauté.`
      break
    case "ru":
      fallbackTitle = `Вопрос на форуме - Глобальный салах`
      fallbackDescription = `Найдите ответы на свои вопросы на форуме Global Salah. Поделитесь своими идеями и обсудите их с сообществом.`
      break
    case "ar":
      fallbackTitle = `سؤال في المنتدى – جلوبال صلاح`
      fallbackDescription = `ابحث عن إجابات لأسئلتك في منتدى جلوبال صلاح. شارك أفكارك وتواصل مع المجتمع.`
      break
    case "es":
      fallbackTitle = `Pregunta del Foro – Global Salah`
      fallbackDescription = `Encuentra respuestas a tus preguntas en el foro de Global Salah. Comparte tus ideas y conecta con la communauté.`
      break
    case "tr":
      fallbackTitle = `Forum Sorusu - Küresel Salah`
      fallbackDescription = `Global Salah forumunda sorularınıza yanıt bulun. Fikirlerinizi paylaşın ve toplulukla bağlantı kurun.`
      break
    case "de":
      fallbackTitle = `Forum Frage - Global Salah`
      fallbackDescription = `Finden Sie Antworten auf Ihre Fragen im Global Salah Forum. Teilen Sie Ihre Ideen und vernetzen Sie sich mit der Gemeinschaft.`
      break
    case "pt":
      fallbackTitle = `Pergunta do Fórum - Global Salah`
      fallbackDescription = `Encontre respostas às suas perguntas no fórum Global Salah. Partilhe as suas ideias e ligue-se à comunidade.`
      break
    case "ur":
      fallbackTitle = `فورم کا سوال - عالمی صلاح`
      fallbackDescription = `گلوبل صلاح فورم میں اپنے سوالات کے جوابات تلاش کریں۔ اپنے خیالات کا اشتراک کریں اور کمیونٹی سے جڑیں۔`
      break
    case "zh-CN":
      fallbackTitle = `论坛问题 - 全球萨拉赫`
      fallbackDescription = `在 全球萨拉赫 论坛上找到问题的答案。分享您的想法并与社区建立联系。`
      break
    default:
      fallbackTitle = `Forum Question – Global Salah`
      fallbackDescription = `Find answers to your questions in the Global Salah Forum. Share your thoughts and connect with the community.`
  }

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    alternates: {
      canonical: `https://globalsalah.com/${lang}/forum/${titleSlug}`,
      en: `https://globalsalah.com/en/forum/${titleSlug}`,
      fr: `https://globalsalah.com/fr/forum/${titleSlug}`,
      ar: `https://globalsalah.com/ar/forum/${titleSlug}`,
      es: `https://globalsalah.com/es/forum/${titleSlug}`,
      de: `https://globalsalah.com/de/forum/${titleSlug}`,
      tr: `https://globalsalah.com/tr/forum/${titleSlug}`,
      pt: `https://globalsalah.com/pt/forum/${titleSlug}`,
      ur: `https://globalsalah.com/ur/forum/${titleSlug}`,
      ru: `https://globalsalah.com/ru/forum/${titleSlug}`,
      "zh-CN": `https://globalsalah.com/zh-CN/forum/${titleSlug}`,
      "x-default": `https://globalsalah.com/en/forum/${titleSlug}`,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      url: `https://globalsalah.com/${lang}/forum/${titleSlug}`,
      siteName: "Global Salah",
      locale: lang,
      type: "website",
    },
  }
}

function Page() {
  return (
    <div>
      <QuestionPage />
    </div>
  )
}

export default Page
