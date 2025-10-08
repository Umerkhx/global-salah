"use client"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AnswerModal } from "@/components/ui/answer-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import UserAvatar from "@/components/UserAvatar"
import { useTranslation } from "@/hooks/useTranslation"
import { urlSplitter } from "@/lib"
import { refactorDate } from "@/lib/date"
import { verifyEmail } from "@/services/authentication"
import { motion } from "framer-motion"
import { MessageSquare, Share2, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function QuestionPage() {
  const params = useParams()
  const pathname = usePathname()
  const lang = urlSplitter(pathname)
  const router = useRouter()
  const { t } = useTranslation("forum")
  const [question, setQuestion] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [url, setUrl] = useState("")
  const [userId, setUserId] = useState<any>(null)
  const [likedAnswers, setLikedAnswers] = useState<{ [key: string]: boolean }>({})
  const [isVerified, setIsVerified] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isQuestionOwner, setIsQuestionOwner] = useState(false)
  const titleSlug = params?.title as string

  useEffect(() => {
    setUrl(window.location.href)
  }, [pathname])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast("URL copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy URL:", error)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("userData")
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser) {
        setIsVerified(true)
        setIsLoggedIn(true)
        setUserData(parsedUser)
        setUserId(parsedUser.id)
      }
    }
    fetchQuestionData(JSON.parse(user || "null"))
  }, [])

  const fetchQuestionData = async (loggedUser?: any) => {
    try {
      const questionsRes = await fetch("/api/questions/get-questions", { cache: "no-store" })
      const questionsData = await questionsRes.json()

const normalize = (str: string) =>
  decodeURIComponent(str)               
    .toLowerCase()
    .replace(/-/g, " ")                 
    .replace(/[^\p{L}\p{N}\s]/gu, "")   
    .replace(/\s+/g, " ")               
    .trim()


const foundQuestion = questionsData?.questions?.find((q: any) => {
  const dbTitle = normalize(q.title)
  const urlTitle = normalize(titleSlug)
  return dbTitle === urlTitle
})

      if (!foundQuestion) {
        toast.error("Question not found")
        setIsLoading(false)
        return
      }

      const usersRes = await fetch("/api/users/get-users", { cache: "no-store" })
      const usersData = await usersRes.json()

      const answersRes = await fetch("/api/answers/get-answers", { cache: "no-store" })
      const answersData = await answersRes.json()

      const questionUser = usersData?.users?.find((user: any) => user.id === foundQuestion.user_id)

      const questionAnswers = answersData?.answers?.filter((answer: any) => answer.question_id === foundQuestion.id)

      const answersWithUser = questionAnswers.map((answer: any) => {
        const answerUser = usersData?.users?.find((user: any) => user.id === answer.user_id)
        return {
          ...answer,
          user: answerUser,
          like_count: answer.like_count ?? 0,
        }
      })

      const questionWithData = {
        ...foundQuestion,
        user: questionUser,
        answers: answersWithUser,
      }

      setQuestion(questionWithData)

      if (questionUser?.email === loggedUser?.email) {
        setIsQuestionOwner(true)
      }

      if (loggedUser?.id) {
        const likesRes = await fetch(`/api/answers/get-answer-likes?user_id=${loggedUser.id}`, { cache: "no-store" })
        if (likesRes.ok) {
          const likesData = await likesRes.json()
          const likedMap = likesData.liked_answers?.reduce((acc: any, id: number) => {
            acc[id] = true
            return acc
          }, {}) || {}
          setLikedAnswers(likedMap)
        }
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAnswerLike = async (answerId: number) => {
    if (!isLoggedIn) {
      toast.error("Please login first to like this answer")
      return
    }
    if (!userId) {
      toast.error("User not found")
      return
    }

    const isLiked = likedAnswers[answerId] || false
    const prevLikedAnswers = { ...likedAnswers }
    const prevQuestion = { ...question }

    setQuestion((prevQuestion: any) => ({
      ...prevQuestion,
      answers: prevQuestion.answers.map((answer: any) =>
        answer.id === answerId
          ? {
              ...answer,
              like_count: isLiked ? (answer.like_count ?? 0) - 1 : (answer.like_count ?? 0) + 1,
            }
          : answer,
      ),
    }))

    setLikedAnswers({ ...likedAnswers, [answerId]: !isLiked })

    try {
      const response = await fetch("/api/answers/add-answer-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer_id: answerId,
          user_id: userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update like")
      }

      await fetchQuestionData(userData)
    } catch (error: any) {
      toast.error(error?.message)
      setQuestion(prevQuestion)
      setLikedAnswers(prevLikedAnswers)
    }
  }

  if (isLoading) {
    return (
      <div className="px-8 mt-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="mt-3 h-screen rounded-lg w-full" />
      </div>
    )
  }

  const sendVerificationCode = async () => {
    try {
      const response = await verifyEmail(userData?.email)
      if (response.status === 200) {
        router.push(`/${lang}/verify-code`)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const approvedAnswers = question?.answers?.filter((answer: any) => answer.status === "approved") || []

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Breadcrumbs
            items={[
              { label: `${t("navigation.forum")}`, href: `/${lang}/forum` },
              { label: question?.title, href: `/${lang}/admin/questions` },
            ]}
          />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl font-bold mb-2 ">{question?.title}</h1>
          <div className="flex flex-col md:flex-row md:justify-end items-center text-sm text-muted-foreground my-4">
            <div className="flex items-center gap-4 text-xs">
              <UserAvatar userName={question?.user?.fullname} />
              <div className="flex flex-col">
                <span>{question?.user?.fullname}</span>
                <span>
                  {t("forum.posted")} {refactorDate(question?.created_at)}
                </span>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden border-primary/20 shadow-md">
            <CardContent className="pt-6">
              <p className="whitespace-pre-line">{question?.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between py-3 border-t bg-muted/20">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{approvedAnswers.length}</span>
                </Button>
              </div>
              <div className="flex gap-2">
                {isLoggedIn ? (
                  isQuestionOwner ? null : isVerified ? (
                    <AnswerModal questionId={question?.id} onAnswerAdded={() => fetchQuestionData(userData)} isVerified={isVerified} />
                  ) : (
                    <Button onClick={sendVerificationCode} className="bg-yellow-600 hover:bg-yellow-500 text-white capitalize py-2">
                      {t("forum.verifyanswer")}
                    </Button>
                  )
                ) : (
                  <Link href={`/${lang}/forum`}>
                    <Badge className="bg-red-700 hover:bg-red-600 text-white capitalize py-2">
                      {t("forum.loginanswer")}
                    </Badge>
                  </Link>
                )}
                <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={handleCopy}>
                  <Share2 className="h-4 w-4" />
                  {t("forum.share")}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 w-[90%] ml-auto">
          <MessageSquare className="h-5 w-5" />
          {approvedAnswers.length} {t("forum.answers")}
        </h2>
        <Separator className="mb-6 w-[90%] ml-auto" />
        {approvedAnswers.length > 0 ? (
          <div className="space-y-6">
            {approvedAnswers
              .slice()
              .reverse()
              .map((answer: any, index: any) => (
                <motion.div
                  key={answer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-primary/20 shadow-md w-[90%] ml-auto">
                    <CardHeader className="pb-3 bg-muted/20">
                      <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <div className="flex items-center gap-2">
                          <UserAvatar userName={answer?.user?.fullname} />
                          <span className="font-medium">{answer?.user?.fullname}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{refactorDate(answer?.created_at)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="whitespace-pre-line">{answer?.answer}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between py-3 border-t bg-muted/20">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleAddAnswerLike(answer?.id)}
                      >
                        {likedAnswers[answer.id] ? (
                          <ThumbsUp className="h-4 w-4 text-blue-500 fill-blue-500" />
                        ) : (
                          <ThumbsUp className="h-4 w-4 stroke-blue-500" />
                        )}
                        <span>{Math.max(answer.like_count ?? 0, 0)}</span>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/20 rounded-lg border border-primary/10">
            {!isQuestionOwner && (
              <>
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">{t("forum.noanswers")}</p>
                {isLoggedIn && (
                  <AnswerModal
                    isVerified
                    questionId={question?.id}
                    onAnswerAdded={() => fetchQuestionData(userData)}
                    buttonVariant="default"
                    buttonSize="default"
                    buttonClassName="text-zinc-50"
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}