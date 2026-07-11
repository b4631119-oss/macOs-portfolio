"use client"

import React, { useState, useEffect, useCallback } from 'react'

const CalculatorWindow = () => {
    const [display, setDisplay] = useState('0')
    const [prevValue, setPrevValue] = useState<number | null>(null)
    const [operation, setOperation] = useState<string | null>(null)
    const [equationStart, setEquationStart] = useState(true)

    const inputDigit = useCallback((digit: string) => {
        if (equationStart) {
            setDisplay(digit)
            setEquationStart(false)
        } else {
            setDisplay(display === '0' ? digit : display + digit)
        }
    }, [display, equationStart])

    const inputDecimal = useCallback(() => {
        if (equationStart) {
            setDisplay('0.')
            setEquationStart(false)
            return
        }
        if (!display.includes('.')) {
            setDisplay(display + '.')
        }
    }, [display, equationStart])

    const clearAll = useCallback(() => {
        setDisplay('0')
        setPrevValue(null)
        setOperation(null)
        setEquationStart(true)
    }, [])

    const clearCurrent = useCallback(() => {
        setDisplay('0')
        setEquationStart(true)
    }, [])

    const toggleSign = useCallback(() => {
        setDisplay((parseFloat(display) * -1).toString())
    }, [display])

    const inputPercent = useCallback(() => {
        setDisplay((parseFloat(display) / 100).toString())
    }, [display])

    const calculate = useCallback((prev: number, current: number, op: string): number => {
        switch (op) {
            case '+': return prev + current
            case '-': return prev - current
            case '×': return prev * current
            case '÷': return current === 0 ? 0 : prev / current
            default: return current
        }
    }, [])

    const handleOperation = useCallback((nextOp: string) => {
        const inputValue = parseFloat(display)
        
        if (prevValue === null) {
            setPrevValue(inputValue)
        } else if (operation && !equationStart) {
            const currentResult = calculate(prevValue, inputValue, operation)
            setPrevValue(currentResult)
            setDisplay(String(currentResult))
        }
        
        setOperation(nextOp)
        setEquationStart(true)
    }, [display, prevValue, operation, equationStart, calculate])

    const handleEquals = useCallback(() => {
        const inputValue = parseFloat(display)
        if (prevValue !== null && operation) {
            const result = calculate(prevValue, inputValue, operation)
            setDisplay(String(result))
            setPrevValue(null)
            setOperation(null)
            setEquationStart(true)
        }
    }, [display, prevValue, operation, calculate])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= '0' && e.key <= '9') inputDigit(e.key)
            if (e.key === '.' || e.key === ',') inputDecimal()
            if (e.key === '=' || e.key === 'Enter') handleEquals()
            if (e.key === 'Escape') clearAll()
            if (e.key === 'Backspace') {
                if (display.length > 1) setDisplay(display.slice(0, -1))
                else setDisplay('0')
            }
            if (e.key === '+') handleOperation('+')
            if (e.key === '-') handleOperation('-')
            if (e.key === '*') handleOperation('×')
            if (e.key === '/') handleOperation('÷')
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [inputDigit, inputDecimal, handleEquals, clearAll, handleOperation, display])

    const showClearAll = display === '0' && prevValue === null;

    const buttons = [
        { 
            label: showClearAll ? 'AC' : 'C', 
            bg: 'bg-zinc-400 text-black hover:bg-zinc-300', 
            action: showClearAll ? clearAll : clearCurrent 
        },
        { label: '±', bg: 'bg-zinc-400 text-black hover:bg-zinc-300', action: toggleSign },
        { label: '%', bg: 'bg-zinc-400 text-black hover:bg-zinc-300', action: inputPercent },
        { 
            label: '÷', 
            bg: operation === '÷' ? 'bg-white text-amber-500' : 'bg-amber-500 text-white hover:bg-amber-400', 
            action: () => handleOperation('÷') 
        },
        
        { label: '7', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('7') },
        { label: '8', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('8') },
        { label: '9', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('9') },
        { 
            label: '×', 
            bg: operation === '×' ? 'bg-white text-amber-500' : 'bg-amber-500 text-white hover:bg-amber-400', 
            action: () => handleOperation('×') 
        },
        
        { label: '4', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('4') },
        { label: '5', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('5') },
        { label: '6', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('6') },
        { 
            label: '-', 
            bg: operation === '-' ? 'bg-white text-amber-500' : 'bg-amber-500 text-white hover:bg-amber-400', 
            action: () => handleOperation('-') 
        },
        
        { label: '1', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('1') },
        { label: '2', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('2') },
        { label: '3', bg: 'bg-zinc-700 text-white hover:bg-zinc-600', action: () => inputDigit('3') },
        { 
            label: '+', 
            bg: operation === '+' ? 'bg-white text-amber-500' : 'bg-amber-500 text-white hover:bg-amber-400', 
            action: () => handleOperation('+') 
        },
    ]

    return (
        <div className="w-full h-full bg-[#17171c] p-4 flex flex-col justify-between select-none font-sans box-border overflow-hidden">
            {/* Дисплей: аккуратный отступ сверху и автоматический размер шрифта */}
            <div className="text-white text-right font-light tracking-wide overflow-hidden text-ellipsis whitespace-nowrap mt-auto mb-4 text-4xl sm:text-5xl leading-none">
                {display}
            </div>
            
            {/* Сетка кнопок подстраивается под высоту родителя */}
            <div className="grid grid-cols-4 gap-2.5 w-full flex-1 max-h-[75%] items-stretch">
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={btn.action}
                        className={`rounded-2xl font-normal text-lg md:text-xl flex items-center justify-center transition-all duration-150 active:scale-95 shadow-md py-3 sm:py-4 ${btn.bg}`}
                    >
                        {btn.label}
                    </button>
                ))}
                
                {/* Ноль, запятая и равно */}
                <button
                    onClick={() => inputDigit('0')}
                    className="col-span-2 rounded-2xl bg-zinc-700 text-white text-left pl-6 text-lg md:text-xl flex items-center hover:bg-zinc-600 transition-all active:scale-95 shadow-md py-3 sm:py-4"
                >
                    0
                </button>
                <button
                    onClick={inputDecimal}
                    className="rounded-2xl bg-zinc-700 text-white font-normal text-lg md:text-xl flex items-center justify-center hover:bg-zinc-600 transition-all active:scale-95 shadow-md py-3 sm:py-4"
                >
                    ,
                </button>
                <button
                    onClick={handleEquals}
                    className="rounded-2xl bg-amber-500 text-white font-normal text-lg md:text-xl flex items-center justify-center hover:bg-amber-400 transition-all active:scale-95 shadow-md py-3 sm:py-4"
                >
                    =
                </button>
            </div>
        </div>
    )
}

export default CalculatorWindow;