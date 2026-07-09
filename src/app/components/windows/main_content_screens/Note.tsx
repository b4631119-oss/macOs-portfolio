"use client"

import React from 'react'

const Note = () => {
    return (
        <div className="w-full h-full bg-[#0b0b0b] relative overflow-hidden">
            <iframe 
                src="https://cuaderno-nine.vercel.app" 
                title="Cuaderno App"
                className="w-full h-full border-none"
                allow="clipboard-read; clipboard-write;"
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        </div>  
    )
}

export default Note