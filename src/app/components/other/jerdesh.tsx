"use client"

import React from 'react'
import { ExternalLink, Github, Layers, ArrowUpRight, CheckCircle2, ShieldAlert } from "lucide-react"

const JerdeshWindowContent = () => {
    const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"];
    const features = [
        "Поиск и фильтрация жилья (комнаты, квартиры)",
        "Объявления о поиске работы и вакансиях",
        "Попутчики и логистика между городами",
        "Быстрая подача объявлений без лишней регистрации",
        "Адаптивный мобильный интерфейс (Mobile-First)"
    ];

    return (
        <div className="h-full w-full bg-[#09090b] text-zinc-100 overflow-y-auto font-sans selection:bg-blue-500/30 relative custom-scrollbar">
            {/* Сетка на бэкграунде */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-8 space-y-8">
                
                {/* Хедер проекта */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                                JERDESH-MOSCVA
                            </h1>
                        </div>
                        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                            Специализированная веб-платформа и мобильный маркетплейс, созданный для поиска жилья, работы и попутчиков. Проект оптимизирован под высокие нагрузки и быстрый отклик на мобильных устройствах.
                        </p>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex items-center gap-3 shrink-0">
                        <a 
                            href="https://github.com/b4631119-oss/jerdesh-moscva" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-all text-zinc-300"
                        >
                            <Github size={14} /> Repository
                        </a>
                        <a 
                            href="https://jerdesh-moscva.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                        >
                            Live Demo <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>

                {/* Две колонки: Скриншот/Превью и Описание */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    
                    {/* Левая колонка: Промо-баннер или скриншот */}
                    <div className="md:col-span-2 group relative rounded-2xl border border-white/5 overflow-hidden bg-zinc-950 aspect-[4/3] md:aspect-auto md:h-full flex items-center justify-center min-h-[200px]">
                        <img 
                            src="/jerdesh.png" 
                            alt="Jerdesh Project Preview" 
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-102 transition-all duration-500"
                            onError={(e) => {
                                // Фоллбэк, если картинка еще не добавлена в public
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                            }}
                        />
                        <div className="absolute inset-0 hidden flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-blue-950/20 to-black/40">
                            <Layers size={32} className="text-blue-500 mb-2" />
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Marketplace UI</span>
                        </div>
                    </div>

                    {/* Правая колонка: Ключевой функционал */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="bg-zinc-900/30 backdrop-blur-md rounded-2xl border border-white/5 p-5 md:p-6 space-y-4">
                            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-blue-500" />
                                Основной функционал
                            </h3>
                            <ul className="space-y-2.5">
                                {features.map((feature, i) => (
                                    <li key={i} className="text-xs md:text-sm text-zinc-400 flex items-start gap-2.5 leading-snug">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Технологический стек */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        Используемый стек технологий
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, i) => (
                            <span 
                                key={i} 
                                className="text-xs px-3 py-1.5 bg-blue-500/5 text-blue-300 rounded-xl border border-blue-500/10 font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JerdeshWindowContent;