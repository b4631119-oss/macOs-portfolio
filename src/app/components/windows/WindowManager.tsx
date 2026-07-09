"use client"

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import MacWindow from './MacWindow';

interface WindowsState {
  github: boolean;
  note: boolean;
  calender: boolean;
  calculator: boolean;
  jerdesh: boolean;
}

interface WindowConfig {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  component: React.ReactNode;
  disableMaximize?: boolean;
}

interface WindowManagerProps {
  windowsState: WindowsState;
  onClose: (id: keyof WindowsState) => void;
  windowConfigs: Record<keyof WindowsState, WindowConfig>;
}

const WindowManager = ({ windowsState, onClose, windowConfigs }: WindowManagerProps) => {
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());

  // Массив ID только открытых окон
  const activeWindows = useMemo(() => {
    return Object.entries(windowsState)
      .filter(([_, isOpen]) => isOpen)
      .map(([id]) => id);
  }, [windowsState]);

  // Валидация текущего фокуса: если окно закрыли, фокус сбрасывается
  const currentFocused = focusedWindow && activeWindows.includes(focusedWindow) ? focusedWindow : null;

  // ПАТТЕРН REACT: Синхронизация стейта при изменении пропсов/мемо БЕЗ useEffect
  if (focusedWindow !== currentFocused) {
    setFocusedWindow(currentFocused);
  }

  // Очистка minimizedIds на лету во время рендера (убираем закрытые окна)
  let cleanMinimizedIds = minimizedIds;
  const hasDeadIds = Array.from(minimizedIds).some(id => !activeWindows.includes(id));
  if (hasDeadIds) {
    const nextSet = new Set(minimizedIds);
    minimizedIds.forEach((id) => {
      if (!activeWindows.includes(id)) nextSet.delete(id);
    });
    setMinimizedIds(nextSet);
    cleanMinimizedIds = nextSet;
  }

  const handleFocus = useCallback((id: string) => {
    setFocusedWindow(id);
    setMinimizedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const handleMinimize = useCallback((id: string) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setFocusedWindow((prevFocused) => (prevFocused === id ? null : prevFocused));
  }, []);

  const handleClose = useCallback((id: keyof WindowsState) => {
    setMinimizedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    onClose(id);
  }, [onClose]);

  // Alt+Tab глобальный обработчик переключения фокуса
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
  }, [currentFocused, activeWindows, handleFocus]);

  const renderWindows = () => {
    return activeWindows.map((id, index) => {
      const config = windowConfigs[id as keyof WindowsState];
      if (!config) return null;

      const isFocused = currentFocused === id;
      const isMinimized = cleanMinimizedIds.has(id);
      const zIndex = 40 + index * 5;

      return (
        <MacWindow
          key={id}
          windowId={id}
          x={config.x + (index * 20)}
          y={config.y + (index * 20)}
          width={config.width}
          height={config.height}
          title={config.title}
          isVisible={!isMinimized}
          onClose={() => handleClose(id as keyof WindowsState)}
          onMinimize={() => handleMinimize(id)}
          onFocus={handleFocus}
          isFocused={isFocused}
          zIndex={zIndex}
          disableMaximize={config.disableMaximize}
        >
          {config.component}
        </MacWindow>
      );
    });
  };

  return <>{renderWindows()}</>;
};

export default WindowManager;