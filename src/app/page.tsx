"use client"
import { useState } from "react";

import { wallpapersList } from "@/lib/constatns";
import ContextMenu from "./components/other/ContextMenu";
import WallpaperWindow from "./components/other/WallpaperWindow";
import Github from "./components/windows/main_content_screens/Github";
import Note from "./components/windows/main_content_screens/Note";
import CalendarWindow from "./components/windows/main_content_screens/CalendarWindow"; 
import CalculatorWindow from "./components/windows/main_content_screens/CalculatorWindow";
import Navigation from "./components/other/Navigation";
import Dock from "./components/other/Dock";

const Page = () => {
  const [wallpaper, setWallpaper] = useState(wallpapersList[0].url);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number, y: number } | null>(null);
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    cli: false,
    calender: false,
    calculator: false, 
  })

  return (
    <main
      onContextMenu={(e) => { handleContextMenu(e); }}
      style={{ backgroundImage: `url("${wallpaper}")` }}
      className="fixed inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out z-0"
    >
      {/* Top Navbar fix rahega */}
      <Navigation />
      
      {/* Desktop Space */}
      <div className="w-full h-full" onClick={() => setMenu(null)}>
        {/* Portfolio icons yahan aayenge */}
      </div>

      {menu && (
        <ContextMenu
          x={menu?.x || 0}
          y={menu?.y || 0}
          onClose={() => setMenu(null)}
          onChangeWallpaper={() => setIsWindowOpen(true)} 
        />
      )}

      <WallpaperWindow
        isOpen={isWindowOpen}
        onClose={() => setIsWindowOpen(false)}
        currentWallpaper={wallpaper}
        onSelect={(url) => setWallpaper(url)}
      />

      {windowsState.github && <Github windowName="github" setWindowsState={setWindowsState} />}
      {windowsState.note && <Note windowName="note" setWindowsState={setWindowsState} />}
      {windowsState.calender && <CalendarWindow windowName="calender" setWindowsState={setWindowsState} />}
      
      {/* Исправлено: теперь передаётся правильный windowName="calculator" */}
      {windowsState.calculator && <CalculatorWindow windowName="calculator" setWindowsState={setWindowsState} />}

      <Dock setWindowsState={setWindowsState} windowsState={windowsState} />
    </main>
  );
}
export default Page;