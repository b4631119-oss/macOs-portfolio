"use client"

import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

const ZellijTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current || !containerRef.current) return;

    // Инициализируем терминал с кастомными цветами
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#11111b', // Глубокий темный
        foreground: '#cdd6f4',
        cursor: '#89b4fa',
        black: '#1e1e2e',
        red: '#f38ba8',
        green: '#a6e3a1',
        yellow: '#f9e2af',
        blue: '#89b4fa',
        magenta: '#f5c2e7',
        cyan: '#94e2d5',
        white: '#bac2de',
      },
      fontFamily: 'JetBrains Mono, Fira Code, Courier New, monospace',
      fontSize: 13,
      lineHeight: 1.2,
    });

    // Подключаем аддон для авто-размера
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    xtermRef.current = term;

    // Подгоняем размер под контейнер
    fitAddon.fit();

    // Пересчитываем размеры при изменении окна
    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (e) {
        console.log(e);
      }
    };
    window.addEventListener('resize', handleResize);

    // Стартовый текст
    term.writeln('\x1b[1;32mWelcome to Linux (Zellij Multiplexer Session)\x1b[0m');
    term.writeln('Type commands like "neofetch", "clear" or "help".\r\n');
    term.write('\x1b[1;35mjustnpm@linux:~$\x1b[0m ');

    let currentLine = '';

    const disposable = term.onData((data) => {
      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        term.writeln('');
        const cmd = currentLine.trim().toLowerCase();
        
        if (cmd === 'help') {
          term.writeln('Available commands: help, clear, neofetch, zellij');
        } else if (cmd === 'neofetch') {
          term.writeln('\x1b[1;34m   /\\_/\\   \x1b[0m  OS: Fedora Linux 2026');
          term.writeln('\x1b[1;34m  ( o.o )  \x1b[0m  Kernel: x86_64 Turbopack');
          term.writeln('\x1b[1;34m   > ^ <   \x1b[0m  Shell: zsh 5.9');
          term.writeln('             WM: Zellij (Rust)');
        } else if (cmd === 'clear') {
          term.clear();
        } else if (cmd === 'zellij') {
          term.writeln('Zellij is already multiplexing this terminal tab!');
        } else if (cmd !== '') {
          term.writeln(`sh: command not found: ${currentLine}`);
        }

        currentLine = '';
        term.write('\x1b[1;35mjustnpm@linux:~$\x1b[0m ');
      } else if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else {
        currentLine += data;
        term.write(data);
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      disposable.dispose();
      term.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#11111b] p-3 flex flex-col justify-between overflow-hidden select-text box-border">
      
      {/* Имитация активной панели Zellij с оранжевой/зеленой рамкой */}
      <div className="flex-1 w-full border border-[#74c7ec]/40 rounded-lg p-2 bg-[#11111b] overflow-hidden flex flex-col">
        <div ref={terminalRef} className="w-full flex-1 overflow-hidden" />
      </div>
      
      {/* Статус-бар Zellij внизу */}
      <div className="bg-[#a6e3a1] text-[#11111b] text-[11px] px-3 py-1 flex items-center gap-4 font-sans font-bold select-none mt-2 rounded-md shrink-0">
        <span className="bg-[#11111b] text-[#a6e3a1] px-1.5 py-0.5 rounded text-[10px]">ZELLIJ</span>
        <div className="flex gap-3 text-[10px] md:text-[11px]">
          <span>Ctrl + <span className="underline">p</span> Pane</span>
          <span>Ctrl + <span className="underline">t</span> Tab</span>
          <span>Ctrl + <span className="underline">n</span> Move</span>
        </div>
        <span className="ml-auto font-mono text-[10px] hidden sm:inline">session: portfolio</span>
      </div>
    </div>
  );
};

export default ZellijTerminal;