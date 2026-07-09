"use client"

import React, { Dispatch, SetStateAction } from 'react'
import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns' 

interface CalendarWindowProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
    onClose?: () => void; // Добавляем
}

const CalendarWindow = ({ windowName, setWindowsState, onClose, title = "TaskMate Calendar" }: CalendarWindowProps) => {
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
            x={150}
            y={80}
            width="80vw" 
            height="80vh"
            title={title}
            onClose={handleClose} // Используем новую функцию
        >
            <div className="w-full h-full bg-[#0b0b0b] relative overflow-hidden">
                <iframe 
                    src="https://kalendar-app-one.vercel.app/" 
                    title="Calendar App"
                    className="w-full h-full border-none"
                    allow="clipboard-read; clipboard-write;" 
                    sandbox="allow-scripts allow-same-origin allow-forms" 
                />
            </div>  
        </MacWindow>
    )
}

export default CalendarWindow