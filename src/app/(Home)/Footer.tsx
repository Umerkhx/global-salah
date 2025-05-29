"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { checkIsPathnameIsEqualToLang, urlSplitter } from "@/lib";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaXTwitter, FaFacebook, FaPinterest } from "react-icons/fa6";

function Footer() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const currentLang = urlSplitter(pathname);
  const { t } = useTranslation("Footer");
  const isLang = checkIsPathnameIsEqualToLang(currentLang);

  useEffect(() => {
    localStorage.setItem("loading", "true");
    setIsLoading(true);

    const timer = setTimeout(() => {
      localStorage.setItem("loading", "false");
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {isLoading ? <div className='px-8 mt-4'>
        <Skeleton className="mt-3 h-32 rounded-lg w-full" />
      </div> : (<footer className="mt-5 border-t border-muted-foreground bg-transparent lg:scale-100 scale-90">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">
                {" "}
                {isLang ? t("Footer.footertitle") : "Global Salah"}{" "}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground ">
                {isLang
                  ? t("Footer.footerdesc")
                  : "Global Salah is a website dedicated to providing accurate and convenient Islamic prayer time information to Muslims around the world."}
              </p>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-green-700 dark:text-green-400">
                {isLang ? t("Footer.quicklinkstitle") : "Quick links"}{" "}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">

                <li> {" "}
                  <Link href={isLang ? `/${currentLang}` : "/"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {" "}
                    {isLang ? t("navigation.home") : "home"}{" "}
                  </Link>
                </li>


                <li>
                  <Link
                    href={isLang ? `/${currentLang}/countries` : "/countries"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.countries") : "countries"}
                  </Link>
                </li>

                <li>
                  <Link
                    href={isLang ? `/${currentLang}/forum` : "/forum"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.forum") : "forum"}
                  </Link>
                </li>

                <li>
                  <Link
                    href={isLang ? `/${currentLang}/blogs` : "/blogs"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.blogs") : "blogs"}
                  </Link>
                </li>


                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/qibla-finder` : "/qibla-finder"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.qiblafinder") : "qiblafinder"}{" "}
                  </Link>
                </li>


                <li>
                  <Link
                    href={isLang ? `/${currentLang}/about-us` : "/about-us"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {" "}
                    {isLang ? t("navigation.aboutUs") : "about Us"}{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    href={isLang ? `/${currentLang}/contact-us` : "/contact-us"}
                    className=" hover:text-green-700 dark:hover:text-green-400"
                  >
                    {isLang ? t("navigation.contactUs") : "contact Us"}{" "}
                  </Link>
                </li>


              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-green-700 dark:text-green-400">
                {isLang ? t("Footer.companytitle") : "Company"}{" "}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/duas` : "/duas"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {isLang ? t("navigation.duas") : "duas"}{" "}
                  </Link>
                </li>

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/islamic-calender` : "/islamic-calender"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {isLang ? t("navigation.islamicCalender") : "islamic Calender"}{" "}
                  </Link>
                </li>

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/inheritance-calculator` : "/inheritance-calculator"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {isLang ? t("navigation.inheritance") : "inheritance"}{" "}
                  </Link>
                </li>

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/zakat-calculator` : "/zakat-calculator"} className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {isLang ? t("navigation.zakatcalculator") : "zakatcalculator"}{" "}
                  </Link>
                </li>


                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/ramadan-calender` : "/ramadan-calender"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize">
                    {isLang ? t("navigation.ramadan") : "Ramadan-Calender"}{" "}
                  </Link>
                </li>

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/99-names-of-allah` : "/99-names-of-allah"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.namesallah") : "99-Names-Of-Allah"}{" "}
                  </Link>
                </li>

                <li>{" "}
                  <Link href={isLang ? `/${currentLang}/qaza-namaz-calculator` : "/qaza-namaz-calculator"}
                    className=" hover:text-green-700 dark:hover:text-green-400 capitalize"
                  >
                    {isLang ? t("navigation.qaza-namaz-calculator") : "qaza-namaz-calculator"}{" "}
                  </Link>
                </li>



              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold text-green-700 dark:text-green-400">
                {isLang ? t("Footer.otherlinktitle") : "Other"}{" "}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    href={
                      isLang
                        ? `/${currentLang}/terms-and-conditions`
                        : "/terms-and-conditions"
                    }
                    className=" hover:text-green-700 dark:hover:text-green-400"
                  >
                    {" "}
                    {isLang ? t("Footer.termslink") : "Terms and conditions"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      isLang
                        ? `/${currentLang}/privacy-policy`
                        : "/privacy-policy"
                    }
                    className=" hover:text-green-700 dark:hover:text-green-400"
                  >
                    {isLang ? t("Footer.privacylink") : "Privacy policy"}{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10  border-t border-gray-200 pt-4">
            <div className="flex lg:flex-row flex-col items-center lg:justify-between  ">
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                {isLang
                  ? t("Footer.rightsdesc")
                  : "All Rights Reserved © 2025 Global Salah"}
              </p>
              <div className="flex md:justify-start justify-center md:mt-0 mt-3 space-x-6">
                <Link
                  href="https://www.facebook.com/globalsalahofficial/"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-6 w-6" />
                </Link>
                <Link
                  href="https://x.com/globalsalah"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Twitter</span>
                  <FaXTwitter className="h-6 w-6" />
                </Link>
                {/* <Link href="https://www.instagram.com/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link> */}
                <Link
                  href="https://www.pinterest.com/globalsalah/"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Pintrest</span>
                  <FaPinterest className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>)}
    </>
  )
}
export default Footer;
