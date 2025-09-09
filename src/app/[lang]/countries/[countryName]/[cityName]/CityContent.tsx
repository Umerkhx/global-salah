"use client"
import { useTranslation } from '@/hooks/useTranslation';
import { Calendar, Clock, MapPin, Moon, Star, Sun } from 'lucide-react'
import React from 'react'

function CityContent({ country, city, arabic }: any) {
    const { t } = useTranslation("city");

    return (
        <div className="max-w-6xl mx-auto p-6  rounded-xl shadow-lg">
            <div className=" my-8 pb-6 border-b border-gray-200 ">
                <div className="flex items-center md:justify-start justify-center mb-4">
                    <MapPin className="w-8 h-8 text-emerald-600 mr-3" />
                    <h1 className="text-4xl font-bold ">
                        {t("city.heading")} <span className='capitalize'>{city}, {country}</span> 
                    </h1>
                </div>
                <div className='flex items-center md:justify-start justify-center '>
                    <p className="md:text-base text-sm text-muted-foreground  leading-relaxed">
                        {t("city.description")}
                    </p>
                </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-lg border border-emerald-100">
                    <div className="flex items-center mb-3">
                        <Clock className="w-6 h-6 text-emerald-600 mr-2" />
                        <h3 className="font-semibold ">{t("city.dailyTitle")}</h3>
                    </div>
                    <p className="text-sm ">
                        {t("city.dailyDesc")}
                    </p>
                </div>

                <div className=" p-6 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-3">
                        <Calendar className="w-6 h-6 text-blue-600 mr-2" />
                        <h3 className="font-semibold ">{t("city.monthlyTitle")}
                        </h3>
                    </div>
                    <p className="text-sm ">
                        {t("city.monthlyDesc")}
                    </p>
                </div>

                <div className=" p-6 rounded-lg border border-purple-100">
                    <div className="flex items-center mb-3">
                        <Star className="w-6 h-6 text-purple-600 mr-2" />
                        <h3 className="font-semibold ">{t("city.authenticTitle")}
</h3>
                    </div>
                    <p className="text-sm ">
                       {t("city.authenticDesc")}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <div className="flex items-center mb-4">
                        <Sun className="w-7 h-7 text-orange-500 mr-3" />
                        <h2 className="text-2xl font-bold capitalize  mb-0">
                        {t("city.scheduletitle")} <span className='capitalize'>{city}</span>
                        </h2>
                    </div>
                    <p className=" leading-relaxed">
                 {t("city.scheduleDesc")}
                        <span className="font-semibold "> Fajr </span>,
                        <span className="font-semibold "> Dhuhr </span>,
                        <span className="font-semibold "> Asr </span>,
                        <span className="font-semibold "> Maghrib </span>, and
                        <span className="font-semibold "> Isha </span>.
                    </p>

                </section>

                <section className=" p-6 rounded-lg border-l-4 border-emerald-500">
                    <div className="flex items-center mb-4">
                        <Moon className="w-7 h-7 text-indigo-600 mr-3" />
                        <h2 className="text-2xl font-bold  mb-0">
                            {t("city.importancetitle")}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold  mb-2">{t("city.religiousTitle")}</h3>
                            <p className=" text-sm leading-relaxed mb-4">
                              {t("city.religiousDesc")}
                            </p>
                            <h3 className="font-semibold  mb-2">{t("city.communityTitle")}</h3>
                            <p className=" text-sm leading-relaxed">
                               {t("city.communityDesc")}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold  mb-2">{t("city.seasonalTitle")}</h3>
                            <p className=" text-sm leading-relaxed mb-4">
                               {t("city.seasonalDesc")}
                            </p>
                            <h3 className="font-semibold  mb-2">{t("city.planningTitle")}</h3>
                            <p className=" text-sm leading-relaxed">
                               {t("city.planningDesc")}
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold  mb-4">
                        {t("city.methodstitle")}
                    </h2>
                    <p className=" leading-relaxed mb-4">
                     {t("city.desc")}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3 ">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                             {t("city.point1")} {city}
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {t("city.point2")}
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {t("city.point3")}
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                           {t("city.point4")}
                        </li>
                    </ul>
                </section>

                <section className=" p-6 rounded-lg">
                    <h2 className="text-2xl font-bold capitalize mb-4">
                        {t("city.perfecttitle")} {city}
                    </h2>
                    <p className=" leading-relaxed mb-4">
                       {t("city.perfectdesc")}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="border border-muted-foreground p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold  mb-2">{t("city.residentsTitle")}</h3>
                            <p className="text-sm text-muted-foreground">
                               {t("city.residentsDesc")}
                            </p>
                        </div>
                        <div className="border border-muted-foreground p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold  mb-2">{t("city.travelersTitle")}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t("city.travelersDesc")} {country}
                            </p>
                        </div>
                        <div className="border border-muted-foreground p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold  mb-2">{t("city.studentsTitle")}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t("city.studentsDesc")}
                            </p>
                        </div>
                    </div>
                </section>
            </div>


        </div>
    )
}

export default CityContent