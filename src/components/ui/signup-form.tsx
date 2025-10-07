"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { urlSplitter } from "@/lib";
import { useTranslation } from "@/hooks/useTranslation";

interface SignupFormProps {
  setShowAuthModal: (value: boolean) => void;
  onLoginClick: () => void;
}

export default function SignupForm({ onLoginClick,setShowAuthModal }: SignupFormProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userDetails = { fullname, email, password };

    try {
      const response = await fetch("/api/users/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        if (email === "webnikedevelopment365@gmail.com") {
          const updatedDetails = { ...data.user, role: "admin", isSignedUp: true };
          localStorage.setItem("userData", JSON.stringify(updatedDetails));
        } else {
          const updatedDetails = { ...data.user, isSignedUp: true };
          localStorage.setItem("userData", JSON.stringify(updatedDetails));
        }
        
        setShowAuthModal(false);
        toast.success("Account created successfully!");
      } else {
        toast.error(data.error || "Failed to sign up");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Card className="border-0 shadow-none">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                {t("forum.fullname")}
              </Label>
              <Input
                id="name"
                placeholder={t("forum.fullnameplaceholder")}
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-signup" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {t("forum.email")}
              </Label>
              <Input
                id="email-signup"
                type="email"
                placeholder={t("forum.emailplaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                {t("forum.password")}
              </Label>
              <div className="flex items-center border border-primary/20 px-2 rounded-lg">
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
              <p className="text-xs text-muted-foreground">{t("forum.pwlimit")}</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("forum.createacc")}
                </>
              ) : (
                `${t("forum.createaccount")}`
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {t("forum.haveaccount")}{" "}
            <button
              onClick={onLoginClick}
              className="text-emerald-500 hover:underline font-medium"
            >
              {t("forum.login")}
            </button>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
