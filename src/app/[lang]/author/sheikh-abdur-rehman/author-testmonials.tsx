"use client"
import { useTranslation } from '@/hooks/useTranslation'
import { Quote } from 'lucide-react'
import React from 'react'

function AuthorTestmonials() {
        const { t } = useTranslation("author")
    
  return (
        <div className=" pt-10 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4"> {t("author.heading")} </h2>
            <p className="text-xl ">{t("author.desc2")}</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-slate-900/90 dark:bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-6 hover:scale-95 transition ease-in duration-200 delay-200 hover:border-emerald-500">
              <Quote className="w-8 h-8 text-emerald-500 mb-4" />
              <blockquote className="text-slate-300 mb-6 italic">
                "{t("author.test1")}"
              </blockquote>
              <div className="flex items-center">
                <div>
                <div className="font-semibold dark:text-zinc-100 text-slate-300">{t("author.reader1")}</div>
                <div className="text-sm text-slate-400">{t("author.readerrole")}</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/90 dark:bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-6 hover:scale-95 transition ease-in duration-200 delay-200 hover:border-emerald-500">
              <Quote className="w-8 h-8 text-emerald-500 mb-4" />
              <blockquote className="text-slate-300 mb-6 italic">
                "{t("author.test2")}"
              </blockquote>
              <div className="flex items-center">
                <div>
                <div className="font-semibold dark:text-zinc-100 text-slate-300">{t("author.reader2")}</div>
                <div className="text-sm text-slate-400">{t("author.readerrole")}</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/90 dark:bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-6 hover:scale-95 transition ease-in duration-200 delay-200 hover:border-emerald-500">
              <Quote className="w-8 h-8 text-emerald-500 mb-4" />
              <blockquote className="text-slate-300 mb-6 italic">
                "{t("author.test3")}"
              </blockquote>
              <div className="flex items-center">
                <div>
                <div className="font-semibold dark:text-zinc-100 text-slate-300">{t("author.reader3")}</div>
                <div className="text-sm text-slate-400">{t("author.readerrole")}</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      
  )
}

export default AuthorTestmonials