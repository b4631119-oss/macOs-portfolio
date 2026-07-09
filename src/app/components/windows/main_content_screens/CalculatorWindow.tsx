"use client"

import React, { useState, Dispatch, SetStateAction } from 'react'
import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns'

interface CalculatorProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    onClose?: () => void; // Добавляем
}

const CalculatorWindow = ({ windowName, setWindowsState, onClose }: CalculatorProps) => {
    const [display, setDisplay] = useState('0')
    const [prevValue, setPrevValue] = useState<number | null>(null)
    const [operation, setOperation] = useState<string | null>(null)
    const [equationStart, setEquationStart] = useState(true)

    const inputDigit = (digit: string) => {
        if (equationStart) {
            setDisplay(digit)
            setEquationStart(false)
        } else {
            setDisplay(display === '0' ? digit : display + digit)
        }
    }

    const inputDecimal = () => {
        if (equationStart) {
            setDisplay('0.')
            setEquationStart(false)
            return
        }
        if (!display.includes('.')) {
            setDisplay(display + '.')
        }
    }

    const clearAll = () => {
        setDisplay('0')
        setPrevValue(null)
        setOperation(null)
        setEquationStart(true)
    }

    const toggleSign = () => {
        setDisplay((parseFloat(display) * -1).toString())
    }

    const inputPercent = () => {
        setDisplay((parseFloat(display) / 100).toString())
    }

    const handleOperation = (nextOp: string) => {
        const inputValue = parseFloat(display)
        
        if (prevValue === null) {
            setPrevValue(inputValue)
        } else if (operation) {
            const currentResult = calculate(prevValue, inputValue, operation)
            setPrevValue(currentResult)
            setDisplay(String(currentResult))
        }
        
        setOperation(nextOp)
        setEquationStart(true)
    }

    const calculate = (prev: number, current: number, op: string): number => {
        switch (op) {
            case '+': return prev + current
            case '-': return prev - current
            case '×': return prev * current
            case '÷': return current === 0 ? 0 : prev / current
            default: return current
        }
    }

    const handleEquals = () => {
        const inputValue = parseFloat(display)
        if (prevValue !== null && operation) {
            const result = calculate(prevValue, inputValue, operation)
            setDisplay(String(result))
            setPrevValue(null)
            setOperation(null)
            setEquationStart(true)
        }
    }

    // Функция закрытия
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setWindowsState((prev) => ({ ...prev, [windowName]: false }));
        }
    };

    const buttons = [
        { label: 'C', bg: 'bg-zinc-400 text-black hover:bg-zinc-300', action: clearAll },
        { label: '±', bg: 'bg-zinc-400 text-black hover:bg-zinc-300', action: toggleSign },
        { label: '%', bg: 'bg-zinc-400 text-black hover:bg-zinc-300', action: inputPercent },
        { label: '÷', bg: 'bg-amber-500 text-white hover:bg-amber-400', action: () => handleOperation('÷') },
        
        { label: '7', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('7') },
        { label: '8', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('8') },
        { label: '9', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('9') },
        { label: '×', bg: 'bg-amber-500 text-white hover:bg-amber-400', action: () => handleOperation('×') },
        
        { label: '4', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('4') },
        { label: '5', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('5') },
        { label: '6', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('6') },
        { label: '-', bg: 'bg-amber-500 text-white hover:bg-amber-400', action: () => handleOperation('-') },
        
        { label: '1', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('1') },
        { label: '2', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('2') },
        { label: '3', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('3') },
        { label: '+', bg: 'bg-amber-500 text-white hover:bg-amber-400', action: () => handleOperation('+') },
    ]

    return (
        <MacWindow
            x={300}
            y={150}
            width="260px"
            height="420px"
            title="Калькулятор"
            onClose={handleClose} // Используем новую функцию
        >
            <div className="w-full h-full bg-zinc-900 p-3 flex flex-col justify-end select-none font-sans">
                <div className="text-white text-4xl text-right mb-4 px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {display}
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            onClick={btn.action}
                            className={`h-12 w-12 rounded-full font-medium text-lg flex items-center justify-center transition-colors active:opacity-70 ${btn.bg}`}
                        >
                            {btn.label}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => inputDigit('0')}
                        className="col-span-2 h-12 rounded-full bg-zinc-700 text-white text-left pl-5 text-lg hover:bg-zinc-600 transition-colors active:opacity-70"
                    >
                        0
                    </button>
                    <button
                        onClick={inputDecimal}
                        className="h-12 w-12 rounded-full bg-zinc-700 text-white font-medium text-lg flex items-center justify-center hover:bg-zinc-600 transition-colors active:opacity-70"
                    >
                        ,
                    </button>
                    <button
                        onClick={handleEquals}
                        className="h-12 w-12 rounded-full bg-amber-500 text-white font-medium text-lg flex items-center justify-center hover:bg-amber-400 transition-colors active:opacity-70"
                    >
                        =
                    </button>
                </div>
            </div>
        </MacWindow>
    )
}

export default CalculatorWindow