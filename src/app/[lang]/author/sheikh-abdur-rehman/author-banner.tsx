"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "@/hooks/useTranslation"
import { useEffect, useState } from "react"

function AuthorBanner() {
    const { t } = useTranslation("author")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-emerald-950 text-white min-h-screen flex items-center">

            <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-40 text-center space-y-8 z-10">
                {loading ? (
                    <Skeleton className="h-12 w-[300px] md:w-[650px] " />
                ) : (
                    <h1 className="text-2xl lg:text-7xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-zinc-50 via-slate-50 to-zinc-50 bg-clip-text text-transparent"
                            style={{
                                filter: 'drop-shadow(0 0 20px hsla(158, 64%, 52%, 0.5))',
                                textShadow: '0 0 30px hsla(158, 64%, 52%, 0.3)'
                            }}>

                            {t("author.title")}
                        </span>
                    </h1>
                )}

                {loading ? (
                    <Skeleton className="h-10 w-[300px] md:w-[450px] mx-auto"/>
                ) : (
                    <p className="text-xl lg:text-3xl text-white font-light tracking-wide">
                        {t("author.desc")}
                    </p>)}

                {loading ? (
                    <Skeleton className="h-24 w-[300px] md:w-[650px] mx-auto" />
                ) : (
                <p className="text-base lg:text-xl max-w-3xl mx-auto text-white leading-relaxed font-light">
                    {t("author.para")}
                </p>)}

                <div className="flex justify-center mt-12">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-950 to-transparent" />
        </section>
    )
}

export default AuthorBanner
