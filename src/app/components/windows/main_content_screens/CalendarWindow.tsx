"use client"

import React from 'react'

const CalendarWindow = () => {
    return (
        <div className="w-full h-full bg-[#0b0b0b] relative overflow-hidden">
            <iframe 
                src="https://kalendar-app-one.vercel.app/" 
                title="Calendar App"
                className="w-full h-full border-none"
                allow="clipboard-read; clipboard-write;" 
                sandbox="allow-scripts allow-same-origin allow-forms" 
            />
        </div>  
    )
}

export default CalendarWindow