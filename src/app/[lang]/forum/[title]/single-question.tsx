"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerModal } from "@/components/ui/answer-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/UserAvatar";
import { useTranslation } from "@/hooks/useTranslation";
import { urlSplitter } from "@/lib";
import { refactorDate } from "@/lib/date";
import { verifyEmail } from "@/services/authentication";
import { addAnswerLike, getQuestionByTitle } from "@/services/forum";
import { motion } from "framer-motion";
import { MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { toast } from "sonner";

export default function QuestionPage() {
  const params = useParams();
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const router = useRouter();
  const { t } = useTranslation("forum")
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState<any>(null);
  const [likedAnswers, setLikedAnswers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isQuestionOwner, setIsQuestionOwner] = useState(false);
  const [isAnswerLiked, setIsAnswerLiked] = useState(false);

  const title = params?.title as string;

  useEffect(() => {
    setUrl(window.location.href);
  }, [pathname]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const parsedUser = JSON.parse(user);

      if (parsedUser?.verification_status === 1) {
        setIsVerified(true);
      }
      if (parsedUser?.token) {
        setIsLoggedIn(true);
      }
      setUserData(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchQuestionByTitle();
    }
  }, [userData]);

  const fetchQuestionByTitle = async () => {
    try {
      const response = await getQuestionByTitle(title);

      if (response.status === 200) {
        setQuestion(response.data);
      }

      const answers = response.data.answers.map((answer: any) => answer);

      const answerLikes = answers.flatMap(
        (answer: any) => answer.liked_user_ids || []
      );

      const hasLiked = answerLikes.some((like: any) => like === userData?.id);

      if (hasLiked) {
        setIsAnswerLiked(true);
      }

      if (response?.data?.user?.email === userData?.email) {
        setIsQuestionOwner(true);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likedAnswers") || "[]"
    );
    setLikedAnswers(storedLikes);
  }, []);

  const handleAddAnswerLike = async (answerId: number) => {
    if (!isLoggedIn) {
      toast.error("Please login first to like this answer");
      return;
    }

    if (!userId) {
      toast.error("User not found");
      return;
    }

    // Load liked answers from local storage to maintain state after refresh
    const storedLikedAnswers = JSON.parse(
      localStorage.getItem("likedAnswers") || "[]"
    );

    // Determine if the answer is already liked
    const isLiked = storedLikedAnswers.includes(answerId);

    // Optimistically update UI
    setQuestion((prevQuestion: any) => ({
      ...prevQuestion,
      answers: prevQuestion.answers.map((answer: any) =>
        answer.id === answerId
          ? { ...answer, like_count: answer.like_count + (isLiked ? -1 : 1) }
          : answer
      ),
    }));

    // Toggle liked state
    const updatedLikedAnswers = isLiked
      ? storedLikedAnswers.filter((id: number) => id !== answerId)
      : [...storedLikedAnswers, answerId];

    setLikedAnswers(updatedLikedAnswers);
    localStorage.setItem("likedAnswers", JSON.stringify(updatedLikedAnswers));

    try {
      const response = await addAnswerLike(answerId, userId);

      if (response.status === 201) {
        setIsAnswerLiked(true);
      } else if (response.status === 200) {
        setIsAnswerLiked(false);
      }
    } catch (error: any) {
      toast.error(error?.message);

      // Rollback UI on error
      setQuestion((prevQuestion: any) => ({
        ...prevQuestion,
        answers: prevQuestion.answers.map((answer: any) =>
          answer.id === answerId
            ? { ...answer, like_count: answer.like_count + (isLiked ? 1 : -1) }
            : answer
        ),
      }));

      // Restore previous liked state
      setLikedAnswers(storedLikedAnswers);
      localStorage.setItem("likedAnswers", JSON.stringify(storedLikedAnswers));
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserId(parsedUserData.id);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="px-8 mt-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="mt-3 h-screen rounded-lg w-full" />
      </div>
    );
  }

  const sendVerificationCode = async () => {
    try {
      const response = await verifyEmail(userData?.email);

      if (response.status === 200) {
        const user = response.data.user;

        // const updatedDetails = { ...user, isSignedUp: true };
        // localStorage.setItem("userData", JSON.stringify(updatedDetails));
        toast.success(response.data.message);

        router.push(`/${lang}/verify-code`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Breadcrumbs
            items={[
              { label: `${t('navigation.forum')}`, href: `/${lang}/forum` },
              { label: question?.title, href: `/${lang}/admin/questions` },
            ]}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2 ">{question?.title}</h1>
          <div className="flex flex-col md:flex-row  md:justify-end items-center text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4 text-xs">
              <UserAvatar userName={question?.user?.fullname} />
              <div className="flex flex-col">
                <span>{question?.user?.fullname}</span>
                <span> {t("forum.posted")} {refactorDate(question?.created_at)}</span>
              </div>
            </div>
          </div>
          <Card className="overflow-hidden border-primary/20 shadow-md">
            <CardContent className="pt-6">
              <p className="whitespace-pre-line">{question?.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between py-3 border-t bg-muted/20">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>
                    {
                      question?.answers?.filter(
                        (answer: any) => answer.status === "approved"
                      ).length
                    }
                  </span>
                </Button>
              </div>
              <div className="flex gap-2">
                {isLoggedIn ? (
                  isQuestionOwner ? null : isVerified ? (
                    <AnswerModal
                      questionId={question?.id}
                      onAnswerAdded={fetchQuestionByTitle}
                      isVerified={isVerified}
                    />
                  ) : (
                    <Button
                      onClick={sendVerificationCode}
                      className="bg-yellow-600 hover:bg-yellow-500 text-white capitalize py-2"
                    >
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

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleCopy}
                >
                  <Share2 className="h-4 w-4" />
                  {t("forum.share")}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <div className="mb-6 ">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 w-[90%] ml-auto">
          <MessageSquare className="h-5 w-5 " />
          {
            question?.answers?.filter(
              (answer: any) => answer.status === "approved"
            ).length
          }{" "}
          {t("forum.answers")}
        </h2>
        <Separator className="mb-6 w-[90%] ml-auto" />

        {question?.answers?.length > 0 ? (
          <div className="space-y-6">
            {question?.answers
              .slice()
              .reverse()
              .filter((answer: any) => answer.status === "approved")
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
                          <span className="font-medium">
                            {answer?.user?.fullname}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {refactorDate(answer?.created_at)}
                        </span>
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
                          <AiFillLike className="h-4 w-4 text-blue-500" /> // Outline when not liked
                        ) : (
                          <AiOutlineLike className="h-4 w-4 text-blue-500" /> // Filled color when liked
                        )}
                        <span>{Math.max(answer.like_count, 0)}</span>
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
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />{" "}
                <p className="text-muted-foreground mb-2">
                {t("forum.noanswers")}
                </p>
                <AnswerModal
                  isVerified
                  questionId={question?.id}
                  onAnswerAdded={fetchQuestionByTitle}
                  buttonVariant="default"
                  buttonSize="default"
                  buttonClassName="text-zinc-50"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
