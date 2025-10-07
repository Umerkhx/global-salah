"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urlSplitter } from "@/lib";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface LoginFormProps {
  onSignUpClick: () => void;
  setShowAuthModal: (value: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginForm({
  onSignUpClick,
  setShowAuthModal,
  setIsLoggedIn,
}: LoginFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      localStorage.setItem("userData", JSON.stringify(data.user));

      if (data.user.email === ADMIN_EMAIL) {
        router.push(`/${lang}/admin`)
      } else {
        router.push(`/${lang}/forum`)
      }

      setShowAuthModal(false);
      setIsLoggedIn(true);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-none">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {t("forum.email")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("forum.emailplaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary/30"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  {t("forum.password")}
                </Label>
                {/* <Link
                  href={`/${lang}/verify-email`}
                  className="text-sm text-green-500 hover:underline"
                >
                  {t("forum.forgotpassword")}
                </Link> */}
              </div>
              <div className="flex items-center border border-primary/20 focus-visible:ring-primary/30 px-2 rounded-lg">
                <Input
                  id="password"
                  type={!viewPassword ? "password" : "text"}
                  placeholder={t("forum.passwordplaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-none"
                  required
                />
                {viewPassword ? (
                  <Eye onClick={() => setViewPassword(false)} />
                ) : (
                  <EyeOff onClick={() => setViewPassword(true)} />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("forum.logging")}
                </>
              ) : (
                `${t("forum.login")}`
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {t("forum.noaccount")}{" "}
            <button
              onClick={onSignUpClick}
              className="text-green-600 hover:underline font-medium"
            >
              {t("forum.signup")}
            </button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
