"use client"

import React, { useState, useMemo, useEffect } from 'react';
import MacWindow from './MacWindow';

interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
}

interface WindowConfig {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  component: React.ReactNode;
}

interface WindowManagerProps {
  windowsState: WindowsState;
  onClose: (id: keyof WindowsState) => void;
  windowConfigs: Record<keyof WindowsState, WindowConfig>;
}

const WindowManager = ({ windowsState, onClose, windowConfigs }: WindowManagerProps) => {
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  
  // Получаем список активных окон
  const activeWindows = useMemo(() => {
    return Object.entries(windowsState)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id);
  }, [windowsState]);

  // ХАК ДЛЯ REACT 19: Сбрасываем фокус прямо во время рендера, если окно закрылось.
  // Это заменяет ломающийся useEffect и предотвращает cascading renders.
  const currentFocused = focusedWindow && activeWindows.includes(focusedWindow) ? focusedWindow : null;
  if (focusedWindow !== currentFocused) {
    setFocusedWindow(currentFocused);
  }

  const handleFocus = (id: string) => {
    setFocusedWindow(id);
  };

  // Alt+Tab
  useEffect(() => {
    const handleAltTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        if (activeWindows.length === 0) return;

        const currentIndex = activeWindows.indexOf(currentFocused || '');
        const nextIndex = (currentIndex + 1) % activeWindows.length;
        const nextWindow = activeWindows[nextIndex];
        
        if (nextWindow) {
          handleFocus(nextWindow);
        }
      }
    };

    window.addEventListener('keydown', handleAltTab);
    return () => window.removeEventListener('keydown', handleAltTab);
  }, [currentFocused, activeWindows]);

  // Рендерим окна
  const renderWindows = () => {
    const windows: React.ReactNode[] = [];

    activeWindows.forEach((id, index) => {
      const config = windowConfigs[id as keyof WindowsState];
      if (!config) return;

      const isFocused = currentFocused === id;
      const zIndex = 40 + index * 5;

      windows.push(
        <MacWindow
          key={id}
          windowId={id}
          x={config.x + (index * 20)}
          y={config.y + (index * 20)}
          width={config.width}
          height={config.height}
          title={config.title}
          isVisible={true}
          onClose={() => onClose(id as keyof WindowsState)}
          onFocus={handleFocus}
          isFocused={isFocused}
          zIndex={isFocused ? zIndex + 10 : zIndex}
        >
          {config.component}
        </MacWindow>
      );
    });

    return windows;
  };

  return <>{renderWindows()}</>;
};

export default WindowManager;