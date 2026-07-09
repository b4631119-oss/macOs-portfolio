"use client"
import { useState } from "react";

import { wallpapersList } from "@/lib/constatns";
import ContextMenu from "./components/other/ContextMenu";
import WallpaperWindow from "./components/other/WallpaperWindow";
import Navigation from "./components/other/Navigation";
import Dock from "./components/other/Dock";
import WindowManager from "./components/windows/WindowManager";

// Контент для окон
import Github from "./components/windows/main_content_screens/Github";
import Note from "./components/windows/main_content_screens/Note";
import CalendarWindow from "./components/windows/main_content_screens/CalendarWindow"; 
import CalculatorWindow from "./components/windows/main_content_screens/CalculatorWindow";

const Page = () => {
  const [wallpaper, setWallpaper] = useState(wallpapersList[0].url);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number, y: number } | null>(null);
  
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    calender: false,
    calculator: false, 
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseWindow = (id: keyof typeof windowsState) => {
    setWindowsState(prev => ({ ...prev, [id]: false }));
  };

  const windowConfigs = {
    github: {
      title: "GitHub",
      x: 50,
      y: 80,
      width: 900,
      height: 650,
      component: <Github windowName="github" setWindowsState={setWindowsState} />
    },
    note: {
      title: "Notes",
      x: 100,
      y: 100,
      width: 600,
      height: 500,
      component: <Note windowName="note" setWindowsState={setWindowsState} />
    },
    calender: {
      title: "Calendar",
      x: 200,
      y: 90,
      width: 750,
      height: 550,
      component: <CalendarWindow windowName="calender" setWindowsState={setWindowsState} />
    },
    calculator: {
      title: "Calculator",
      x: 80,
      y: 110,
      width: 400,
      height: 550,
      component: <CalculatorWindow windowName="calculator" setWindowsState={setWindowsState} />
    }
  };

  return (
    <main
      onContextMenu={(e) => { handleContextMenu(e); }}
      style={{ backgroundImage: `url("${wallpaper}")` }}
      className="fixed inset-0 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-in-out z-0"
    >
      <Navigation />
      
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

      <WindowManager
        windowsState={windowsState}
        onClose={handleCloseWindow}
        windowConfigs={windowConfigs}
      />

      <Dock setWindowsState={setWindowsState} windowsState={windowsState} />
    </main>
  );
}

export default Page;