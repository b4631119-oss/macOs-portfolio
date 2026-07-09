"use client"

import React, { useState, useEffect } from 'react';
import MacWindow from './MacWindow';

interface WindowsState {
  github: boolean;
  note: boolean;
  cli: boolean;
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
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  // Обновляем порядок окон
  useEffect(() => {
    const activeWindows = Object.entries(windowsState)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id);

    setWindowOrder(prev => {
      const newOrder = [...prev];
      
      activeWindows.forEach(id => {
        if (!newOrder.includes(id)) {
          newOrder.push(id);
        }
      });
      
      const filtered = newOrder.filter(id => activeWindows.includes(id));
      
      if (filtered.length !== prev.length || 
          !filtered.every((id, i) => id === prev[i])) {
        return filtered;
      }
      return prev;
    });

    if (focusedWindow && !activeWindows.includes(focusedWindow)) {
      setFocusedWindow(null);
    }
  }, [windowsState, focusedWindow]);

  const handleFocus = (id: string) => {
    setFocusedWindow(id);
    setWindowOrder(prev => {
      const newOrder = prev.filter(w => w !== id);
      return [...newOrder, id];
    });
  };

  // Alt+Tab
  useEffect(() => {
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

      // Просто передаем component как children, без cloneElement
      windows.push(
        <MacWindow
          key={id}
          windowId={id}
          x={config.x + (windowOrder.indexOf(id) * 20)}
          y={config.y + (windowOrder.indexOf(id) * 20)}
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