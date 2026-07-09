"use client"

import { dots, userDetails } from '@/lib/constatns';
import React, { useState, useEffect, useRef } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion';

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
    windowId?: string; // Сделал опциональным
    onFocus?: (id: string) => void;
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
    windowId = 'default', // Значение по умолчанию
    onFocus
}: MacWindowProps) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [savedState, setSavedState] = useState<{ x: number; y: number; width: string | number; height: string | number } | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    
    const [navHeight, setNavHeight] = useState(40);
    const [dockHeight, setDockHeight] = useState(60);

    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeights = () => {
            const nav = document.querySelector('nav');
            if (nav) {
                const height = nav.getBoundingClientRect().height;
                if (height > 0) {
                    setNavHeight(height);
                }
            }

            const dock = document.querySelector('footer');
            if (dock) {
                const height = dock.getBoundingClientRect().height;
                if (height > 0) {
                    setDockHeight(height + 12);
                }
            }
        };

        const timer = setTimeout(updateHeights, 100);
        window.addEventListener('resize', updateHeights);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateHeights);
        };
    }, []);

    const handleWindowClick = () => {
        setIsFocused(true);
        if (onFocus && windowId) {
            onFocus(windowId);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab' && e.altKey) {
                e.preventDefault();
                if (onFocus && isVisible && windowId) {
                    onFocus(windowId);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onFocus, isVisible, windowId]);

    const handleMaximize = () => {
        if (!isMaximized) {
            setSavedState({
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height
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
        if (type === 'maximize') {
            handleMaximize();
        }
    };

    const getWindowSize = () => {
        if (isMaximized) {
            return {
                width: '100vw',
                height: `calc(100vh - ${navHeight}px - ${dockHeight}px)`
            };
        }
        return {
            width: size.width,
            height: size.height
        };
    };

    const getWindowPosition = () => {
        if (isMaximized) {
            return { x: 0, y: navHeight };
        }
        return { x: position.x, y: position.y };
    };

    if (!isVisible) return null;

    return (
        <Rnd
            size={getWindowSize()}
            position={getWindowPosition()}
            onDragStop={(_e, d) => {
                if (!isMaximized) {
                    setPosition({ x: d.x, y: d.y });
                }
            }}
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
                <div className="window-nav-handle flex items-center justify-between px-4 py-2.5 border-b border-[#2a2a2a] bg-[#1e1e1e] cursor-move">
                    <div className="flex items-center gap-2">
                        {dots.map((dot, index) => (
                            <button
                                key={index}
                                className={`w-3.5 h-3.5 ${dot.icon} rounded-full transition-all duration-150 hover:scale-110 active:scale-95 focus:outline-none`}
                                onClick={() => handleDotClick(dot.type)}
                                aria-label={dot.type}
                            />
                        ))}
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
    )
}

export default MacWindow;