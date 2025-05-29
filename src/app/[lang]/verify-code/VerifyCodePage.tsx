"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlSplitter } from "@/lib";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyCode, verifyEmail } from "@/services/authentication";
import { toast } from "sonner";
import CustomCaptcha from "@/components/ui/common/CustomCaptcha";
import { useTranslation } from "@/hooks/useTranslation";

export default function VerifyCodePage() {
  const router = useRouter();
  const pathname = usePathname();
  const lang = urlSplitter(pathname);
  const { t } = useTranslation("forum")
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDetailsInLS, setUserDetailsInLS] = useState<any>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    const user: any = localStorage.getItem("userData");
    const parsedUser = JSON.parse(user);
    setUserDetailsInLS(parsedUser);
  }, []);

  const handleOTPChange = (value: string) => {
    setCode(value);
  };

  useEffect(() => {
    const user: any = localStorage.getItem("userData");
    const parseduser = JSON.parse(user);
    setEmail(parseduser.email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please Verify the Captcha");
      return;
    }
    setIsLoading(true);

    try {
      const userDetails = { email, code };
      const response = await verifyCode(userDetails);

      if (response.status === 200) {
        const updatedUserDetails = {
          ...userDetailsInLS,
          verification_status: 1,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserDetails));
        toast.success(response.data.message);
        if (userDetailsInLS.isSignedUp) {
          router.push(`/${lang}/forum`);
        } else {
          router.push(`/${lang}/reset-password`);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    try {
      if (isVerified) {
        const response = await verifyEmail(userDetailsInLS?.email);

        if (response.status === 200) {
          const user = response.data.user;

          const updatedDetails = { ...user, isSignedUp: true };
          localStorage.setItem("userData", JSON.stringify(updatedDetails));
          toast.success(response.data.message);
          setDisableButton(true);
        }
      } else {
        toast.error("Please verify the captcha first");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-emerald-400/20 bg-zinc-100 dark:bg-zinc-900 shadow-md">
          <CardHeader className="space-y-1">
            <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {t("forum.verifycode")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("forum.verifycode2")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={handleOTPChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  {t("forum.notrecievedcode")} {" "}
                  <button
                    disabled={disableButton}
                    onClick={sendVerificationCode}
                    type="button"
                    className={disableButton ? 'text-gray-300' : 'text-green-500 hover:underline'}
                  >
                    {t("forum.resend")}
                  </button>
                </p>
              </div>
              <div className="flex justify-center items-center">
                <CustomCaptcha setIsVerified={setIsVerified} />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     {t("forum.verifying")}
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            {/* <Link href={`/${lang}/verify-email`}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Email Verification
              </Button>
            </Link> */}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
