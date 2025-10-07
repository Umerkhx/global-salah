"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { usePathname } from "next/navigation";
import { urlSplitter } from "@/lib";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";


interface Question {
  id: string;
  title: string;
  lang: string;
  createdAt?: string;
}

interface ApiResponse {
  questions: Question[];
  success?: boolean;
  error?: string;
}

export function QuestionsTable() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pathname = usePathname();
  const lang = urlSplitter(pathname);

  const itemsPerPage = 20;

  const fetchQuestions = async (lang: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/questions/get-questions?lang=${lang}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const safeQuestions: Question[] = (data.questions || []).map((q) => ({
        ...q,
      }));

      setQuestions(safeQuestions.reverse());
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching questions"
      );
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lang) {
      fetchQuestions(lang);
      setCurrentPage(1);
    }
  }, [lang]);

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("?", "")
      .replaceAll(/[^\w\s-]/g, "");
  };

  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full max-w-md" />
          </TableCell>
          <TableCell className="text-center">
            <Skeleton className="h-4 w-8 mx-auto" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-20 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Question Title</TableHead>
              <TableHead className="w-24 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : paginatedQuestions.length > 0 ? (
              paginatedQuestions.map((question, index) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="max-w-md truncate" title={question.title}>
                    {question.title}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/${lang}/admin/questions/${createSlug(
                          question.title
                        )}`}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-10 w-10 mb-2 opacity-50" />
                    <p className="text-lg font-medium">No questions found</p>
                    <p className="text-sm">
                      No questions available for language: <b>{lang}</b>
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && questions.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, questions.length)} of{" "}
            {questions.length} questions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}