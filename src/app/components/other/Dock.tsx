import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dispatch, SetStateAction } from "react";

interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
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
        <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-[#2a2a2a] shadow-2xl">
                {icons.map((icon, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleIconClick(icon.key)}
                        className="relative"
                    >
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div className="relative">
                                    <img
                                        className={`w-12 h-12 p-2 rounded-xl ${icon.color} cursor-pointer transition-all duration-200 hover:scale-110 hover:-translate-y-1 active:scale-95`}
                                        src={`./doc-icons/${icon.src}`}
                                        alt={icon.alt}
                                    />
                                    {/* Индикатор активного окна */}
                                    {windowsState[icon.key] && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 border-gray-700">
                                <p className="text-sm text-gray-200">{icon.alt}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </footer>
    )
}

export default Dock;