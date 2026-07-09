import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dispatch, SetStateAction } from "react";

interface WindowsState {
  github: boolean;
  note: boolean;
  cli: boolean;
  calender: boolean;
  calculator: boolean;
}

const Dock = ({ setWindowsState, windowsState }: { setWindowsState: Dispatch<SetStateAction<WindowsState>>, windowsState: WindowsState }) => {
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
            src: "cli.svg", 
            alt: "Terminal", 
            color: "bg-gradient-to-b from-[#757575] to-[#4d4d4d]", 
            key: "cli" as const
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
        <footer className="w-full relative">
            <div className='dock-container'>
                {icons.map((icon, index) => (
                    <div key={index} onClick={() => handleIconClick(icon.key)}>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <img
                                    className={`dock-icons p-2 rounded-lg ${icon.color} cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95`}
                                    src={`./doc-icons/${icon.src}`}
                                    alt={icon.alt}
                                />
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