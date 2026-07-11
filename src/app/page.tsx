"use client"
import { useState } from "react";

import { wallpapersList } from "@/lib/constants";
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
import JerdeshWindowContent from "./components/other/jerdesh";
// 1. ИМПОРТИРУЕМ НАШ НОВЫЙ ТЕРМИНАЛ ZELLIJ
import ZellijTerminal from "./components/windows/main_content_screens/ZellijTerminal"; 

// Выносим интерфейс стейта окон для типизации
interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
  terminal: boolean;
  jerdesh: boolean;
}

const Page = () => {
  const [wallpaper, setWallpaper] = useState(wallpapersList[0].url);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number, y: number } | null>(null);
  
  // Состояние окон с добавленным терминалом
  const [windowsState, setWindowsState] = useState<WindowsState>({
    github: false,
    note: false,
    calender: false,
    calculator: false, 
    terminal: false, // Инициализация терминала
    jerdesh: false 
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseWindow = (id: keyof WindowsState) => {
    setWindowsState(prev => ({ ...prev, [id]: false }));
  };

  // 2. ДОБАВИЛИ КОНФИГУРАЦИЮ ДЛЯ ТЕРМИНАЛА В windowConfigs
  const windowConfigs = {
    github: {
      title: "GitHub",
      x: 50,
      y: 80,
      width: 900,
      height: 650,
      component: <Github />
    },
    terminal: {
      title: "justnpm@linux: ~ (Zellij)",
      x: 120,
      y: 130,
      width: 800,
      height: 500,
      component: <ZellijTerminal />
    },
    jerdesh: { 
      title: "JERDESH-MOSCVA — Маркетплейс",
      x: 80,
      y: 90,
      width: 850,
      height: 600,
      component: <JerdeshWindowContent />
    },
    note: {
      title: "Notes",
      x: 100,
      y: 100,
      width: 600,
      height: 500,
      component: <Note />
    },
    calender: {
      title: "Calendar",
      x: 200,
      y: 90,
      width: 750,
      height: 550,
      component: <CalendarWindow />
    },
    calculator: {
      title: "Calculator",
      x: 80,
      y: 110,
      width: 400,
      height: 550,
      disableMaximize: true,
      component: <CalculatorWindow />
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