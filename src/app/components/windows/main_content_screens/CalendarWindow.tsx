"use client"

import React, { Dispatch, SetStateAction } from 'react'
import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns' 

interface CalendarWindowProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
}

const CalendarWindow = ({ windowName, setWindowsState, title = "TaskMate Calendar" }: CalendarWindowProps) => {
    return (
        <MacWindow
            x={150}
            y={80}
            width="75vw" 
            height="75vh"
            title={title}
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
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