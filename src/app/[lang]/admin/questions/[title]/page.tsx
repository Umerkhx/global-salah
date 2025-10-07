"use client";
import { notFound, useParams, usePathname } from "next/navigation";
import { ResponsiveAdminDashboard } from "@/components/responsive-admin-dashboard";
import { QuestionDetail } from "@/components/question-detail";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { urlSplitter } from "@/lib";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const normalize = (str: string) =>
  decodeURIComponent(str)
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

export default function QuestionPage() {
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const params = useParams();
  const rawTitle = params?.title as string;

  const normalizedTitle = normalize(rawTitle);

  const fetchData = async () => {
    try {
      const qRes = await fetch(`/api/questions/get-questions`);
      const qData = await qRes.json();
      if (qRes.status !== 200) throw new Error(qData.error || "Failed to fetch questions");

      const foundQuestion = qData.questions.find(
        (q: any) => normalize(q.title) === normalizedTitle
      );
      if (!foundQuestion) {
        notFound();
        return;
      }

      const aRes = await fetch(`/api/answers/get-answers`);
      const aData = await aRes.json();
      if (aRes.status !== 200) throw new Error(aData.error || "Failed to fetch answers");

      const relatedAnswers = aData.answers.filter(
        (ans: any) => ans.question_id === foundQuestion.id
      );

      const uRes = await fetch(`/api/users/get-users`);
      const uData = await uRes.json();
      if (uRes.status !== 200) throw new Error(uData.error || "Failed to fetch users");

      const questionUser = uData.users.find((u: any) => u.id === foundQuestion.user_id);

      const enrichedAnswers = relatedAnswers.map((ans: any) => ({
        ...ans,
        user: uData.users.find((u: any) => u.id === ans.user_id) || null,
      }));

      setQuestion({ ...foundQuestion, user: questionUser || null });
      setAnswers(enrichedAnswers);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [normalizedTitle]);

  if (isLoading) {
    return (
      <div className="px-8 mt-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="mt-3 h-screen rounded-lg w-full" />
      </div>
    );
  }

  return (
    <ResponsiveAdminDashboard title={`Question #${question?.id}`}>
      <div className="space-y-4 md:space-y-6">
        <Breadcrumbs
          items={[
            { label: "Admin", href: `/${lang}/admin` },
            { label: "Questions", href: `/${lang}/admin/questions` },
            {
              label: `Question #${question?.id}`,
              href: `/${lang}/admin/questions/${question?.id}`,
            },
          ]}
        />
        <QuestionDetail question={question} answers={answers} />
      </div>
    </ResponsiveAdminDashboard>
  );
}
