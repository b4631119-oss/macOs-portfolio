"use client"

import React, { useState, useMemo } from 'react';
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
  
  // Вычисляем порядок окон через useMemo
  const windowOrder = useMemo(() => {
    return Object.entries(windowsState)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id);
  }, [windowsState]);

  // Проверяем фокус при рендере
  const activeWindows = useMemo(() => 
    Object.entries(windowsState)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id),
    [windowsState]
  );

  // Если фокус на закрытом окне - сбрасываем
  if (focusedWindow && !activeWindows.includes(focusedWindow)) {
    // Используем setTimeout чтобы избежать ошибки
    setTimeout(() => setFocusedWindow(null), 0);
  }

  const handleFocus = (id: string) => {
    setFocusedWindow(id);
  };

  // Alt+Tab
  React.useEffect(() => {
    const handleAltTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        const activeWindows = Object.entries(windowsState)
          .filter(([_, isOpen]) => isOpen)
          .map(([id]) => id);

        if (activeWindows.length === 0) return;

        const currentIndex = activeWindows.indexOf(focusedWindow || '');
        const nextIndex = (currentIndex + 1) % activeWindows.length;
        const nextWindow = activeWindows[nextIndex];
        
        if (nextWindow) {
          handleFocus(nextWindow);
        }
      }
    };

    window.addEventListener('keydown', handleAltTab);
    return () => window.removeEventListener('keydown', handleAltTab);
  }, [focusedWindow, windowsState]);

  // Рендерим окна
  const renderWindows = () => {
    const windows: React.ReactNode[] = [];
    const sortedWindows = [...windowOrder];

    sortedWindows.forEach((id, index) => {
      const config = windowConfigs[id as keyof WindowsState];
      if (!config || !windowsState[id as keyof WindowsState]) return;

      const isFocused = focusedWindow === id;
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
          isVisible={windowsState[id as keyof WindowsState]}
          onClose={() => onClose(id as keyof WindowsState)}
          onFocus={handleFocus}
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