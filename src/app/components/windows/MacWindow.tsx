"use client"

import { dots, userDetails } from '@/lib/constatns';
import React, { useState } from 'react'
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
    zIndex = 40 
}: MacWindowProps) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [savedState, setSavedState] = useState<{ x: number; y: number; width: string | number; height: string | number } | null>(null);

    const handleMaximize = () => {
        if (!isMaximized) {
            // Сохраняем текущее состояние перед максимизацией
            setSavedState({
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height
            });
            // Устанавливаем позицию в 0,0
            setPosition({ x: 0, y: 0 });
        } else if (savedState) {
            // Восстанавливаем сохраненное состояние
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

    // Определяем финальные значения
    const finalPosition = {
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y
    };

    const finalSize = {
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? '100vh' : size.height
    };

    return (
        <Rnd
            size={finalSize}
            position={finalPosition}
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
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            minWidth={320}
            minHeight={240}
            dragHandleClassName="window-nav-handle"
            style={{ zIndex }}
            bounds="window"
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 350, 
                    damping: 25,
                    mass: 0.8
                }}
                className="w-full h-full bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Шапка окна */}
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
                        <p className="text-xs font-medium text-gray-400 select-none">
                            {title || `${userDetails.name} ~zsh`}
                        </p>
                    </div>

                    <div className="w-[52px]" /> {/* Пустой блок для баланса */}
                </div>

                {/* Контент */}
                <div className="flex-1 overflow-auto bg-[#0d0d0d]">
                    {children}
                </div>
            </motion.div>
        </Rnd>
    )
}

export default MacWindow;