"use client"

import React from 'react'
import MacWindow from '../windows/MacWindow'
import { wallpapersList } from '@/lib/constants'

interface WallpaperWindowProps {
    isOpen: boolean;
    onClose: () => void;
    currentWallpaper: string;
    onSelect: (url: string) => void;
}

const WallpaperWindow = ({ isOpen, onClose, currentWallpaper, onSelect }: WallpaperWindowProps) => {
    if (!isOpen) return null;

    return (
        <MacWindow
            x={100}
            y={80}
            width="600px"
            height="500px"
            title="Choose Wallpaper"
            onClose={onClose}
            zIndex={100}
            disableMaximize={true}
        >
            <div className="w-full h-full p-4 bg-[#0d0d0d] overflow-y-auto">
                <h2 className="text-white text-lg font-semibold mb-4">Select Wallpaper</h2>
                <div className="grid grid-cols-2 gap-4">
                    {wallpapersList.map((wp, index) => (
                        <div
                            key={index}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                currentWallpaper === wp.url 
                                    ? 'border-blue-500 scale-105' 
                                    : 'border-transparent hover:border-gray-500'
                            }`}
                            onClick={() => onSelect(wp.url)}
                        >
                            <img 
                                src={wp.url} 
                                alt={`Wallpaper ${index + 1}`}
                                className="w-full h-32 object-cover"
                            />
                            {currentWallpaper === wp.url && (
                                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </MacWindow>
    )
}

export default WallpaperWindow