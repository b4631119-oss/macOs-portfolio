"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { wallpapersList } from "@/lib/constatns";
import { memo } from "react";

interface WallpaperWindowProps {
  isOpen: boolean;
  onClose: () => void;
  currentWallpaper: string;
  onSelect: (url: string) => void;
}

const WallpaperItem = memo(({ 
  wallpaper, 
  isActive, 
  onSelect 
}: { 
  wallpaper: typeof wallpapersList[0]; 
  isActive: boolean; 
  onSelect: (url: string) => void;
}) => (
  <button
    onClick={() => onSelect(wallpaper.url)}
    className="group cursor-pointer space-y-2 w-full text-left"
  >
    <div
      className={`
        aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200
        ${isActive 
          ? "border-blue-500 scale-[0.98] ring-2 ring-blue-500/30" 
          : "border-transparent group-hover:border-white/20"
        }
      `}
    >
      <img
        src={wallpaper.thumbnail}
        alt={wallpaper.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <p className="text-[11px] text-center text-white/70 group-hover:text-white transition-colors">
      {wallpaper.name}
    </p>
  </button>
));

WallpaperItem.displayName = "WallpaperItem";

const WallpaperWindow = ({ isOpen, onClose, currentWallpaper, onSelect }: WallpaperWindowProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-2xl bg-[#1e1e1e]/90 backdrop-blur-xl border-white/10 text-white p-0 overflow-hidden outline-none rounded-xl">
        <div className="flex flex-col md:flex-row h-auto md:h-[450px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-black/20 p-4 border-b md:border-b-0 md:border-r border-white/5 flex md:block items-center justify-between md:justify-start">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">
              Appearance
            </h3>
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-md text-sm font-medium">
              Wallpaper
            </span>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-semibold">Wallpaper</DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-[340px] pr-4">
              <div className="grid grid-cols-2 gap-4">
                {wallpapersList.map((wp) => (
                  <WallpaperItem
                    key={wp.id}
                    wallpaper={wp}
                    isActive={currentWallpaper === wp.url}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WallpaperWindow;