"use client"

import { dots, userDetails } from '@/lib/constants';
import React, { useState, useEffect, useRef } from 'react'
import { Rnd, DraggableData } from 'react-rnd'
import { motion, AnimatePresence } from 'framer-motion';

interface MacWindowProps {
    children: React.ReactNode;
    x: number;
    y: number;
    width: string | number;
    height: string | number;
    title?: string;
    onClose?: () => void;
    onMinimize?: () => void;
    zIndex?: number;
    isVisible?: boolean;
    windowId?: string;
    onFocus?: (id: string) => void;
    isFocused?: boolean;
    disableMaximize?: boolean;
}

const MacWindow = ({ 
    children, 
    x: initialX, 
    y: initialY, 
    width: initialWidth, 
    height: initialHeight, 
    title, 
    onClose,
    onMinimize,
    zIndex = 40,
    isVisible = true,
    windowId = 'default',
    onFocus,
    isFocused: controlledIsFocused,
    disableMaximize = false
}: MacWindowProps) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [savedState, setSavedState] = useState<{ x: number; y: number; width: string | number; height: string | number } | null>(null);
    const [localIsFocused, setLocalIsFocused] = useState(false);
    const isFocused = controlledIsFocused !== undefined ? controlledIsFocused : localIsFocused;
    
    const [navHeight, setNavHeight] = useState(40);

    const [snapPreview, setSnapPreview] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    const windowRef = useRef<HTMLDivElement>(null);
    const clampedInitialized = useRef(false);

 
    useEffect(() => {
        const html = document.documentElement;
        if (isMaximized) {
            html.classList.add('window-maximized');
        } else {
            html.classList.remove('window-maximized');
        }
        return () => html.classList.remove('window-maximized');
    }, [isMaximized]);

    // Initial clamp on mount to fit within smaller viewports
    useEffect(() => {
        if (clampedInitialized.current) return;
        clampedInitialized.current = true;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        let currentNavHeight = 40;
        const nav = document.querySelector('nav');
        if (nav) {
            const height = nav.getBoundingClientRect().height;
            if (height > 0) {
                currentNavHeight = height;
                requestAnimationFrame(() => {
                    setNavHeight(height);
                });
            }
        }

        let parsedW = typeof initialWidth === 'number' ? initialWidth : parseInt(String(initialWidth)) || 800;
        let parsedH = typeof initialHeight === 'number' ? initialHeight : parseInt(String(initialHeight)) || 600;

        if (parsedW > screenW - 20) {
            parsedW = Math.max(320, screenW - 20);
        }
        if (parsedH > screenH - currentNavHeight - 80) {
            parsedH = Math.max(240, screenH - currentNavHeight - 80);
        }

        let parsedX = initialX;
        let parsedY = initialY;
        if (parsedX + parsedW > screenW) {
            parsedX = Math.max(10, screenW - parsedW - 10);
        }
        if (parsedY + parsedH > screenH - 70) {
            parsedY = Math.max(currentNavHeight + 10, screenH - 70 - parsedH - 10);
        }

        setSize({ width: parsedW, height: parsedH });
        setPosition({ x: parsedX, y: parsedY });
    }, [initialWidth, initialHeight, initialX, initialY]);

    // Handle viewport resize
    useEffect(() => {
        const updateHeightsAndMaximize = () => {
            let currentNavHeight = 40;
            const nav = document.querySelector('nav');
            if (nav) {
                const height = nav.getBoundingClientRect().height;
                if (height > 0) {
                    setNavHeight(height);
                    currentNavHeight = height;
                }
            }

            if (isMaximized) {
                setPosition({ x: 0, y: currentNavHeight });
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight - currentNavHeight
                });
            }
        };

        const timer = setTimeout(updateHeightsAndMaximize, 100);
        window.addEventListener('resize', updateHeightsAndMaximize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateHeightsAndMaximize);
        };
    }, [isMaximized]);

    const handleWindowClick = () => {
        setLocalIsFocused(true);
        if (onFocus && windowId) {
            onFocus(windowId);
        }
    };

    const handleMaximize = () => {
        if (disableMaximize) return;

        if (!isMaximized) {
            setSavedState({
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height
            });
            setPosition({ x: 0, y: navHeight });
            setSize({
                width: window.innerWidth,
                height: window.innerHeight - navHeight
            });
        } else if (savedState) {
            setPosition({ x: savedState.x, y: savedState.y });
            setSize({ width: savedState.width, height: savedState.height });
            setSavedState(null);
        }
        setIsMaximized(!isMaximized);
    };

    const handleDotClick = (type: string) => {
        if (type === 'close' && onClose) {
            onClose();
        }
        if (type === 'minimize' && onMinimize) {
            onMinimize();
        }
        if (type === 'maximize' && !disableMaximize) {
            handleMaximize();
        }
    };

    const handleDrag = (_e: MouseEvent | TouchEvent, d: DraggableData) => {
        if (isMaximized) return;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const mouseY = d.y;

        // ВЕРХНИЙ КРАЙ: Оставляем только эту проверку
        if (mouseY <= navHeight + 5) {
            setSnapPreview({ x: 0, y: navHeight, width: screenW, height: screenH - navHeight });
        } 
        // ИСПРАВЛЕНО: Убраны проверки для левого и правого краев
        else {
            setSnapPreview(null);
        }
    };

    // 2. ФИКСАЦИЯ ПРИЛИПАНИЯ ПРИ ОТПУСКАНИИ МЫШКИ
    const handleDragStop = (_e: MouseEvent | TouchEvent, d: DraggableData) => {
        if (isMaximized) return;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const mouseY = d.y;

        // ВЕРХНИЙ КРАЙ: Оставляем логику фуллскрина
        if (mouseY <= navHeight + 5 && !disableMaximize) {
            setSavedState({ x: position.x, y: position.y, width: size.width, height: size.height });
            setPosition({ x: 0, y: navHeight });
            setSize({ width: screenW, height: screenH - navHeight });
            setIsMaximized(true); 
        } 
        // ИСПРАВЛЕНО: Убрана логика деления экрана для боковых краев.
        // Просто сохраняем текущие координаты окна, где его отпустили.
        else {
            setPosition({ x: d.x, y: d.y });
        }

        setSnapPreview(null);
    };

    if (!isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {snapPreview && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'fixed',
                            left: snapPreview.x,
                            top: snapPreview.y,
                            width: snapPreview.width,
                            height: snapPreview.height,
                            zIndex: 30,
                        }}
                        className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl pointer-events-none backdrop-blur-[2px]"
                    />
                )}
            </AnimatePresence>

            <Rnd
                size={{ width: size.width, height: size.height }}
                position={{ x: position.x, y: position.y }}
                onDrag={handleDrag} 
                onDragStop={handleDragStop} 
                onResizeStop={(_e, _direction, ref, _delta, pos) => {
                    if (!isMaximized) {
                        setSize({ width: ref.style.width, height: ref.style.height });
                        setPosition(pos);
                    }
                }}
                onDragStart={handleWindowClick}
                disableDragging={isMaximized}
                enableResizing={!isMaximized}
                minWidth={320}
                minHeight={240}
                dragHandleClassName="window-nav-handle"
                style={{ 
                    zIndex: isFocused ? zIndex + 10 : zIndex,
                    boxShadow: isFocused 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' 
                        : '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
                }}
                bounds="window"
>
                <motion.div
                    ref={windowRef}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 350, 
                        damping: 25,
                        mass: 0.8
                    }}
                    className={`w-full h-full bg-[#1a1a1a] rounded-xl border ${isFocused ? 'border-[#3a3a3a]' : 'border-[#2a2a2a]'} shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
                    onClick={handleWindowClick}
                >
                    <div
                        className="window-nav-handle flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#1e1e1e] cursor-move"
                        onDoubleClick={() => !disableMaximize && handleMaximize()}
                    >
                        <div className="flex items-center gap-2">
                            {dots.map((dot, index) => {
                                const isDisabled = dot.type === 'maximize' && disableMaximize;
                                return (
                                    <button
                                        key={index}
                                        className={`w-3.5 h-3.5 rounded-full transition-all duration-150 focus:outline-none ${
                                            isDisabled 
                                                ? 'bg-zinc-600/50 cursor-not-allowed opacity-55' 
                                                : `${dot.icon} hover:scale-110 active:scale-95`
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDotClick(dot.type);
                                        }}
                                        aria-label={dot.type}
                                        disabled={isDisabled}
                                    />
                                );
                            })}
                        </div>
                        
                        <div className="pointer-events-none px-2">
                            <p className={`text-xs font-medium select-none ${isFocused ? 'text-gray-300' : 'text-gray-500'}`}>
                                {title || `${userDetails.name} ~zsh`}
                            </p>
                        </div>

                        <div className="w-[52px]" />
                    </div>

                    <div className={`flex-1 overflow-auto ${isFocused ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'}`}>
                        {children}
                    </div>
                </motion.div>
            </Rnd>
        </>
    )
}

export default MacWindow;