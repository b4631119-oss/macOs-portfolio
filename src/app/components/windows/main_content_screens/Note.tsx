"use client"

import React, { Dispatch, SetStateAction } from 'react'
import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns'

interface NoteProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
}

const Note = ({ windowName, setWindowsState, title = "Cuaderno — Цифровая тетрадь" }: NoteProps) => {
    return (
        <MacWindow
            x={100}
            y={50}
            width="75vw" // Сделаем чуть шире, чтобы сайту тетради было просторно
            height="75vh"
            title={title}
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
        >
            <div className="w-full h-full bg-[#0b0b0b] relative overflow-hidden">
                {/* Встраиваем твой реальный деплой прямо в окно макбука */}
                <iframe 
                    src="https://cuaderno-nine.vercel.app" 
                    title="Cuaderno App"
                    className="w-full h-full border-none"
                    allow="clipboard-read; clipboard-write;" // Разрешаем копирование, если в тетради есть код
                    sandbox="allow-scripts allow-same-origin allow-forms" // Защита и стабильность
                />
            </div>  

        </MacWindow>
    )
}

export default Note