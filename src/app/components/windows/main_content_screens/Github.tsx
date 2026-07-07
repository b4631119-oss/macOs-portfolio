"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MacWindow from '../MacWindow'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, ExternalLink, Layers, Users, FolderGit2, Github as GithubIcon } from "lucide-react"
import { projects, userDetails, WindowsState } from '@/lib/constatns' // Исправлена опечатка в импорте

interface GitHubUser {
    avatar_url: string;
    name: string | null;
    html_url: string;
    login: string;
    followers: number;
    public_repos: number;
    bio: string | null;
    location: string | null;
}

interface GithubProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
}

const Github = ({ windowName, setWindowsState }: GithubProps) => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        
        const dataFetcher = async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${userDetails.githubUsername}`,
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error("Ошибка при загрузке профиля");
                const data: GitHubUser = await res.json();
                
                setUser(data);
                setLoading(false); 
            } catch (err: unknown) {
                if (err instanceof Error) {
                    if (err.name !== 'AbortError') {
                        console.error("Error fetching data:", err.message);
                        setLoading(false); 
                    }
                } else {
                    console.error("An unexpected error occurred:", err);
                    setLoading(false);
                }
            }
        };
        
        dataFetcher();

        return () => controller.abort();
    }, []);

    return (
        <MacWindow
            x={300}
            y={100}
            width="60vw"
            height="65vh"
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
        >
            <div className="flex flex-col md:flex-row h-full w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans selection:bg-indigo-500/30 relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {loading || !user ? (
                    /* --- СТИЛЬНЫЙ СКЕЛЕТОН ДЛЯ ЗАГРУЗКИ --- */
                    <div className="flex flex-col md:flex-row w-full h-full animate-pulse relative z-10">
                        <div className="w-full md:w-[280px] p-6 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 flex flex-col items-center justify-between">
                            <div className="flex flex-col items-center w-full">
                                <div className="w-24 h-24 rounded-full bg-zinc-800" />
                                <div className="h-4 w-32 bg-zinc-800 rounded mt-4" />
                                <div className="h-3 w-20 bg-zinc-800 rounded mt-2" />
                                <div className="h-10 w-full bg-zinc-800 rounded mt-6" />
                            </div>
                            <div className="h-8 w-full bg-zinc-800 rounded mt-4" />
                        </div>
                        <div className="flex-1 p-5 space-y-4">
                            <div className="h-4 w-24 bg-zinc-800 rounded" />
                            <div className="space-y-3">
                                <div className="h-28 w-full bg-zinc-800/50 rounded-xl" />
                                <div className="h-28 w-full bg-zinc-800/50 rounded-xl" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <aside className="w-full md:w-[280px] relative z-10 flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-black/20 backdrop-blur-xl shrink-0">
                            <div className="p-6 flex flex-col h-full justify-between">
                                <div className="flex flex-col items-center">
                                    <Avatar className="w-24 h-24 border-2 border-white/10 shadow-sm">
                                        <AvatarImage src={user.avatar_url} className="object-cover" />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                            {user.login.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="mt-4 text-center">
                                        <h2 className="text-lg font-bold tracking-tight text-white">
                                            {user.name || user.login}
                                        </h2>
                                        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-zinc-500 hover:text-indigo-400 transition-colors">
                                            @{user.login}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4 w-full justify-center">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
                                            <Users size={12} className="text-indigo-400" />
                                            <span className="font-semibold">{user.followers}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
                                            <FolderGit2 size={12} className="text-emerald-400" />
                                            <span className="font-semibold">{user.public_repos}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 w-full pt-6 border-t border-dashed border-white/10">
                                        <p className="text-sm text-center text-zinc-300 leading-relaxed">
                                            {user.bio || "Описание профиля отсутствует"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-auto space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                                        <MapPin size={12} className="text-zinc-600" />
                                        {user.location || "Location not specified"}
                                    </div>
                                    <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-100 text-black text-xs font-bold rounded-md hover:bg-white transition-colors">
                                        <GithubIcon size={14} /> GitHub Profile
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* --- Правая колонка: Проекты --- */}
                        <div className="flex-1 relative z-10 flex flex-col min-w-0 bg-gradient-to-br from-transparent to-white/[0.02] overflow-hidden">
                            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md shrink-0">
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={14} className="text-indigo-500" />
                                    Projects
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                    {projects.length} Total
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                                <div className="grid grid-cols-1 gap-3">
                                    {projects.map((project, index) => (
                                        <div key={index} className="group relative bg-[#121214] hover:bg-[#18181b] rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex overflow-hidden h-32 shrink-0">
                                            
                                            {/* Превью проекта */}
                                            <div className="w-28 md:w-40 relative overflow-hidden bg-zinc-900 border-r border-white/5 shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                                />
                                            </div>

                                            {/* Контент карточки */}
                                            <div className="flex-1 p-3 md:p-4 flex flex-col justify-between min-w-0">
                                                <div>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className="text-sm font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors truncate">
                                                            {project.title}
                                                        </h4>
                                                        <div className="flex gap-3 text-zinc-500 shrink-0">
                                                            {/* Возвращены иконки гитхаба */}
                                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                                                <GithubIcon size={14} />
                                                            </a>
                                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                {/* Теги технологий */}
                                                <div className="flex gap-1.5 mt-2 overflow-hidden flex-wrap">
                                                    {project.tech.slice(0, 4).map((t, i) => (
                                                        <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-zinc-400 rounded border border-white/5 whitespace-nowrap">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MacWindow>
    )
}

export default Github;