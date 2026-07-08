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
        { src: "github.svg", alt: "GitHub", color: "bg-gradient-to-b from-[#444d56] to-[#24292e]", onClick: () => setWindowsState((prev) => ({ ...prev, github: !windowsState.github })) }, // 3D Slate
        { src: "calender.svg", alt: "Calendar", color: "bg-gradient-to-b from-[#7A83FF] to-[#5856D6]", onClick: () => setWindowsState((prev) => ({ ...prev, calender: !windowsState.calender })) }, // 3D Red
        { src: "cli.svg", alt: "Terminal", color: "bg-gradient-to-b from-[#757575] to-[#4d4d4d]", onClick: () => setWindowsState((prev) => ({ ...prev, cli: !windowsState.cli })) }, // 3D Gray
        { src: "note.svg", alt: "Notes", color: "bg-gradient-to-b from-[#ffd54f] via-[#ffcc00] to-[#ffb300]", onClick: () => setWindowsState((prev) => ({ ...prev, note: !windowsState.note })) },
        { src: "calculator.svg", alt: "calculator", color: "bg-gradient-to-b from-[#ffd54f] via-[#ffcc00] to-[#ffb300]", onClick: () => setWindowsState((prev) => ({ ...prev, note: !windowsState.note })) }, // 3D Yellow
    ];

    return (
        <footer className="w-full relative">
            <div className='dock-container'>
                {icons.map((icon, index) => (
                    <div key={index} onClick={icon.onClick}>
                        <Tooltip delayDuration={100}  >
                            <TooltipTrigger asChild>
                                <img
                                    className={`dock-icons p-2 rounded-lg ${icon.color}`}
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

export default Dock