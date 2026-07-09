"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dispatch, SetStateAction } from "react";

interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
  jerdesh: boolean;
}

interface DockProps {
  setWindowsState: Dispatch<SetStateAction<WindowsState>>;
  windowsState: WindowsState;
}

const Dock = ({ setWindowsState, windowsState }: DockProps) => {
    const icons = [
        { 
            src: "github.svg", 
            alt: "GitHub", 
            color: "bg-gradient-to-b from-[#444d56] to-[#24292e]", 
            key: "github" as const
        }, 
        { 
            src: "jerdesh.png", // Закинь иконку/логотип в папку public/doc-icons/jerdesh.png
            alt: "JERDESH-MOSCVA", 
            color: "bg-gradient-to-b from-[#1e3a8a] to-[#0f172a]", // Красивый синий градиент
            key: "jerdesh" as const
        },
        { 
            src: "calender.svg", 
            alt: "Calendar", 
            color: "bg-gradient-to-b from-[#7A83FF] to-[#5856D6]", 
            key: "calender" as const
        }, 
        { 
            src: "note.svg", 
            alt: "Notes", 
            color: "bg-gradient-to-b from-[#ffd54f] via-[#ffcc00] to-[#ffb300]", 
            key: "note" as const
        },
        { 
            src: "calculator.svg", 
            alt: "Calculator", 
            color: "bg-gradient-to-b from-[#FF9F0A] to-[#FF8E00]", 
            key: "calculator" as const
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
            {/* Невидимая плашка у нижнего края экрана для вызова скрытого Дока */}
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
                                    <img
                                        src={`./doc-icons/${icon.src}`}
                                        alt={icon.alt}
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