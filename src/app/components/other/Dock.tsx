"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dispatch, SetStateAction } from "react";
// 1. Импортируем оптимизированный компонент Image из Next.js
import Image from "next/image"; 

interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
  jerdesh: boolean;
  terminal: boolean;
}

interface DockProps {
  setWindowsState: Dispatch<SetStateAction<WindowsState>>;
  windowsState: WindowsState;
}

// 2. Явно описываем тип для объектов в массиве иконок
interface DockIcon {
  src: string;
  alt: string;
  color: string;
  key: keyof WindowsState;
  isAbsoluteSrc?: boolean; // Делаем поле опциональным для всех
}

const Dock = ({ setWindowsState, windowsState }: DockProps) => {
    const icons: DockIcon[] = [
        { 
            src: "github.svg", 
            alt: "GitHub", 
            color: "bg-gradient-to-b from-[#444d56] to-[#24292e]", 
            key: "github"
        }, 
        { 
            src: "cli.svg", 
            alt: "Zellij Terminal", 
            color: "bg-gradient-to-b from-[#313244] to-[#11111b]", 
            key: "terminal"
        },
        { 
            src: "/jerdesh.png", 
            alt: "JERDESH-MOSCVA", 
            color: "bg-gradient-to-b from-[#1e3a8a] to-[#0f172a]", 
            key: "jerdesh",
            isAbsoluteSrc: true 
        },
        { 
            src: "calender.svg", 
            alt: "Calendar", 
            color: "bg-gradient-to-b from-[#7A83FF] to-[#5856D6]", 
            key: "calender"
        }, 
        { 
            src: "note.svg", 
            alt: "Notes", 
            color: "bg-gradient-to-b from-[#ffd54f] via-[#ffcc00] to-[#ffb300]", 
            key: "note"
        },
        { 
            src: "calculator.svg", 
            alt: "Calculator", 
            color: "bg-gradient-to-b from-[#FF9F0A] to-[#FF8E00]", 
            key: "calculator"
        }, 
    ];

    const handleIconClick = (key: keyof WindowsState) => {
        setWindowsState((prev) => ({ 
            ...prev, 
            [key]: !prev[key] 
        }));
    };

    return (
        <>
            <div className="dock-trigger-zone" />
            
            <footer className="dock-container z-50">
                {icons.map((icon, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleIconClick(icon.key)}
                        className="relative"
                    >
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div className={`dock-icons ${icon.color}`}>
                                    {/* 4. Заменяем <img> на <Image /> с обязательными пропсами width и height */}
                                   <Image
    src={icon.isAbsoluteSrc ? icon.src : `/doc-icons/${icon.src}`}
    alt={icon.alt}
    width={48} 
    height={48}
    className="object-contain"
    unoptimized={icon.isAbsoluteSrc} // Отключает оптимизацию для абсолютных путей, если они ломаются
/>
                                    {windowsState[icon.key] && (
                                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full z-20 shadow-md" />
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800/90 backdrop-blur-md border border-gray-700">
                                <p className="text-sm text-gray-200">{icon.alt}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </footer>
        </>
    )
}

export default Dock;