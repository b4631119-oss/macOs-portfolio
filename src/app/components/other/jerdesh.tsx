"use client"

import React from 'react'
import { ExternalLink, RefreshCw } from "lucide-react"

const JerdeshWindowContent = () => {
    const siteUrl = "https://jerdesh-moscva.vercel.app/";

    const handleRefresh = () => {
        const iframe = document.getElementById('jerdesh-iframe') as HTMLIFrameElement;
        if (iframe) {
            iframe.src = iframe.src;
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#09090b]">
            {/* Минималистичный тулбар управления в стиле macOS/браузера */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#141417] border-b border-white/5 text-xs text-zinc-400 select-none">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleRefresh}
                        className="p-1 rounded-md hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
                        title="Обновить страницу"
                    >
                        <RefreshCw size={13} />
                    </button>
                    <div className="text-zinc-500 tracking-wide font-mono text-[11px] bg-zinc-950/50 px-2.5 py-1 rounded-md border border-white/5">
                        jerdesh-moscva.vercel.app
                    </div>
                </div>
                
                <a 
                    href={siteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-800 hover:text-white transition-all text-zinc-400"
                >
                    Открыть в новой вкладке <ExternalLink size={12} />
                </a>
            </div>
            
            {/* Живой фрейм приложения */}
            <div className="w-full flex-1 bg-white relative">
                <iframe 
                    id="jerdesh-iframe"
                    src={siteUrl} 
                    className="w-full h-full border-none"
                    title="JERDESH-MOSCVA Live Preview"
                    allow="geolocation; microphone; camera"
                />
            </div>
        </div>
    )
}

export default JerdeshWindowContent;