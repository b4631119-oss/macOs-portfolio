"use client"

import React, { Dispatch, SetStateAction } from 'react'
import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns'

interface NoteProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
    onClose?: () => void; // Добавляем
}

const Note = ({ windowName, setWindowsState, onClose, title = "Cuaderno — Цифровая тетрадь" }: NoteProps) => {
    // Функция закрытия
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setWindowsState((prev) => ({ ...prev, [windowName]: false }));
        }
    };

    return (
        <MacWindow
            x={100}
            y={50}
            width="75vw" 
            height="75vh"
            title={title}
            onClose={handleClose} // Используем новую функцию
        >
            <div className="w-full h-full bg-[#0b0b0b] relative overflow-hidden">
                <iframe 
                    src="https://cuaderno-nine.vercel.app" 
                    title="Cuaderno App"
                    className="w-full h-full border-none"
                    allow="clipboard-read; clipboard-write;"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                />
            </div>  
        </MacWindow>
    )
}

export default Note