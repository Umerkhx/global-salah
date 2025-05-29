"use client"
import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Tv, ChevronDown } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import { checkIsPathnameIsEqualToLang, urlSplitter } from "@/lib"

export function MainNav() {
  const pathname = usePathname()
  const currentLang = urlSplitter(pathname)
  const { t } = useTranslation("navigation")
  const isLang = checkIsPathnameIsEqualToLang(currentLang)

  const createPath = (path: string) => (isLang ? `/${currentLang}${path}` : path)
  const isActive = (path: string) => pathname === path
  const getText = (key: string) => (isLang ? t(`navigation.${key}`) : key)

  return (
    <div className="flex items-center space-x-6">
      <nav className="hidden space-x-6 md:flex items-center">
        {/* Home Link */}
        <NavLink href={createPath("/")} isActive={isActive(createPath("/"))} text={getText("home")} />

        {/* About Us Link */}
        <NavLink
          href={createPath("/about-us")}
          isActive={isActive(createPath("/about-us"))}
          text={getText("aboutUs")}
        />

        {/* Countries Link */}
        <NavLink
          href={createPath("/countries")}
          isActive={isActive(createPath("/countries"))}
          text={getText("countries")}
        />


        {/* Forum Link */}
        <NavLink href={createPath("/forum")} isActive={isActive(createPath("/forum"))} text={getText("forum")} />

        {/* Blogs Link */}
        <NavLink href={createPath("/blogs")} isActive={isActive(createPath("/blogs"))} text={getText("blogs")} />

        {/* Contact Link */}
        <NavLink
          href={createPath("/contact-us")}
          isActive={isActive(createPath("/contact-us"))}
          text={getText("contactUs")}
        />

     
      </nav>

    </div>
  )
}

function NavLink({ href, isActive, text }: { href: string; isActive: boolean; text: string }) {
  return (
    <Link
      href={href}
      className="relative px-1 py-2 text-sm font-medium text-white transition-colors hover:text-gray-200 capitalize group"
    >
      <span className="relative z-10 group-hover:text-white transition-colors duration-200">{text}</span>
      {isActive ? (
        <motion.div
          layoutId="activeNav"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      ) : (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      )}
    </Link>
  )
}

function NavDropdown({
  icon,
  text,
  isActive,
  children,
}: {
  icon: React.ReactNode
  text: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative group">
      <button className="relative px-1 py-2 text-sm font-medium text-white transition-colors hover:text-gray-200 capitalize flex items-center gap-1 focus:outline-none group-hover:text-white">
        {icon}
        <span>{text}</span>
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 duration-300" />
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 transform origin-top scale-95 group-hover:scale-100">
        <div className="py-1 rounded-md shadow-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-50"></div>
          {children}
        </div>
      </div>
    </div>
  )
}

function DropdownLink({ href, isActive, text }: { href: string; isActive: boolean; text: string }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2 text-xs text-white hover:bg-slate-700 relative transition-colors duration-200 ${isActive ? "bg-slate-700" : ""}`}
    >
      <span className="relative z-10">{text}</span>
      {isActive && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></span>}
    </Link>
  )
}
