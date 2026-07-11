"use client"

import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';

const ZellijTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Инициализируем терминал
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e2e', // Приятный Catppuccin Mocha
        foreground: '#cdd6f4',
        cursor: '#89b4fa',
      },
      fontFamily: 'Courier New, Courier, monospace',
      fontSize: 13,
    });

    term.open(terminalRef.current);
    xtermRef.current = term;

    // Приветствие в стиле сессии Zellij
    term.writeln('\x1b[1;32mWelcome to Fedora Linux (Zellij Multiplexer Session)\x1b[0m');
    term.writeln('Type commands like "neofetch", "clear" or "help".\r\n');
    term.write('\x1b[1;35muser@fedora:~$\x1b[0m ');

    let currentLine = '';

    // Обработка ввода
    const disposable = term.onData((data) => {
      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        term.writeln('');
        const cmd = currentLine.trim().toLowerCase();
        
        if (cmd === 'help') {
          term.writeln('Available simulated commands: help, clear, neofetch, zellij');
        } else if (cmd === 'neofetch') {
          term.writeln('\x1b[1;34m   /\\_/\\   \x1b[0m  OS: Fedora Linux 2026');
          term.writeln('\x1b[1;34m  ( o.o )  \x1b[0m  Kernel: x86_64 Turbopack-v8');
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
        term.write('\x1b[1;35muser@fedora:~$\x1b[0m ');
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
      disposable.dispose();
      term.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#1e1e2e] p-2 flex flex-col justify-between select-text">
      {/* Область вывода xterm */}
      <div ref={terminalRef} className="w-full flex-1 overflow-hidden" />
      
      {/* Стилизованный статус-бар Zellij */}
      <div className="bg-[#a6e3a1] text-[#11111b] text-[11px] px-3 py-1 flex items-center gap-4 font-sans font-bold select-none mt-2 rounded-md">
        <span className="bg-[#11111b] text-[#a6e3a1] px-1.5 py-0.5 rounded text-[10px]">ZELLIJ</span>
        <span>Ctrl + p Pane</span>
        <span>Ctrl + t Tab</span>
        <span className="ml-auto font-mono text-[10px]">session: portfolio</span>
      </div>
    </div>
  );
};

export default ZellijTerminal;