import { ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Dropdown = (props) => {

    const [focusedIndex, setFocusedIndex] = useState(0); // Track which option is focused
    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false); // Track if using keyboard
    const options = [1, 10, 50, 100]; // Available increment values

    const setDiff = (n) => {
        if (n === 1) {
            props.diff(1)
        }
        else if (n === 2) {
            props.diff(10)
        }
        else if (n === 3) {
            props.diff(50)
        }
        else if (n === 4) {
            props.diff(100)
        }
        props.toggleMenu()
        setIsKeyboardNavigation(false); // Reset keyboard navigation when menu closes
    }

    // Helper function to check if option is active
    const isActive = (value) => {
        return props.currentDiff === value;
    }

    // Helper function to check if option is focused (only when using keyboard)
    const isFocused = (index) => {
        return isKeyboardNavigation && focusedIndex === index;
    }

    useEffect(() => {
        const arrowListeners = (e) => {
            // Right Arrow: Open dropdown OR navigate right through options
            if (e.key === "ArrowRight") {
                e.preventDefault();
                setIsKeyboardNavigation(true); // Enable keyboard navigation mode
                if (!props.isOpen) {
                    // Open dropdown and focus first option
                    props.toggleMenu();
                    setFocusedIndex(0);
                } else {
                    // Navigate right through options (cycling)
                    setFocusedIndex(prev => prev < options.length - 1 ? prev + 1 : 0);
                }
            }
            // Left Arrow: Navigate left through options OR close dropdown
            else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setIsKeyboardNavigation(true); // Enable keyboard navigation mode
                if (props.isOpen) {
                    if (focusedIndex > 0) {
                        // Navigate left through options
                        setFocusedIndex(prev => prev - 1);
                    } else {
                        // At first option, close dropdown
                        props.toggleMenu();
                        setIsKeyboardNavigation(false); // Reset when closing
                    }
                }
            }
            // Enter: Select focused option
            else if (e.key === "Enter" && props.isOpen) {
                e.preventDefault();
                setDiff(focusedIndex + 1); // +1 because setDiff expects 1-4, but focusedIndex is 0-3
            }
            // Escape: Close dropdown
            else if (e.key === "Escape" && props.isOpen) {
                e.preventDefault();
                props.toggleMenu();
                setIsKeyboardNavigation(false); // Reset when closing
            }
        }

        document.addEventListener("keydown", arrowListeners)

        return () => {
            document.removeEventListener("keydown", arrowListeners)
        }
    }, [props.isOpen, focusedIndex, options.length])

    return (
        <div className={`absolute inset-0 rounded-full flex justify-center items-center bg-white shadow-lg transition-all duration-500 ease-in-out overflow-visible ${props.isOpen ? 'lg:w-[360px]' : 'w-18'} h-full`}>
            {/* Mobile/Tablet: Connected expandable menu */}
            <div className={`${props.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} absolute top-full mt-2 left-1/2 -translate-x-1/2 lg:hidden transition-all duration-500 ease-in-out z-10`}>
                <div className="bg-white rounded-full shadow-lg p-2 flex flex-col gap-2">
                    <div onClick={() => { setIsKeyboardNavigation(false); setDiff(1) }} className={`w-14 h-14 flex cursor-pointer justify-center items-center rounded-full transition-all duration-300 ease-in-out ${isActive(1) ? 'bg-purple-500' : isFocused(0) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}>
                        <span className={`font-medium transition-colors duration-200 ${isActive(1) ? 'text-white' : isFocused(0) ? 'text-blue-800' : 'text-black hover:text-gray-600'}`}>+1</span>
                    </div>
                    <div onClick={() => { setIsKeyboardNavigation(false); setDiff(2) }} className={`w-14 h-14 flex cursor-pointer justify-center items-center rounded-full transition-all duration-300 ease-in-out ${isActive(10) ? 'bg-purple-500' : isFocused(1) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}>
                        <span className={`font-medium transition-colors duration-200 ${isActive(10) ? 'text-white' : isFocused(1) ? 'text-blue-800' : 'text-black hover:text-gray-600'}`}>+10</span>
                    </div>
                    <div onClick={() => { setIsKeyboardNavigation(false); setDiff(3) }} className={`w-14 h-14 flex cursor-pointer justify-center items-center rounded-full transition-all duration-300 ease-in-out ${isActive(50) ? 'bg-purple-500' : isFocused(2) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}>
                        <span className={`font-medium transition-colors duration-200 ${isActive(50) ? 'text-white' : isFocused(2) ? 'text-blue-800' : 'text-black hover:text-gray-600'}`}>+50</span>
                    </div>
                    <div onClick={() => { setIsKeyboardNavigation(false); setDiff(4) }} className={`w-14 h-14 flex cursor-pointer justify-center items-center rounded-full transition-all duration-300 ease-in-out ${isActive(100) ? 'bg-purple-500' : isFocused(3) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}>
                        <span className={`font-medium transition-colors duration-200 ${isActive(100) ? 'text-white' : isFocused(3) ? 'text-blue-800' : 'text-black hover:text-gray-600'}`}>+100</span>
                    </div>
                </div>
            </div>

            {/* Desktop: Horizontal expansion */}
            <div className="hidden lg:flex justify-center items-center w-full h-full">
                <div onClick={() => { setIsKeyboardNavigation(false); props.toggleMenu() }} className="w-18 aspect-square flex justify-center items-center cursor-pointer hover:bg-black/20 transition-all duration-300 ease-in-out rounded-full flex-shrink-0">
                    <ChevronRight size={22} color='gray' strokeWidth={2} className={`transition-transform duration-300 ${props.isOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                <div onClick={() => { setIsKeyboardNavigation(false); setDiff(1) }} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(1) ? 'bg-purple-500 hover:bg-purple-600' : isFocused(0) ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-black/20'}`}>
                    <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(1) ? 'text-white' : isFocused(0) ? 'text-blue-800' : 'text-black'}`}>+1</span>
                </div>
                <div onClick={() => { setIsKeyboardNavigation(false); setDiff(2) }} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(10) ? 'bg-purple-500 hover:bg-purple-600' : isFocused(1) ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-black/20'}`}>
                    <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(10) ? 'text-white' : isFocused(1) ? 'text-blue-800' : 'text-black'}`}>+10</span>
                </div>
                <div onClick={() => { setIsKeyboardNavigation(false); setDiff(3) }} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(50) ? 'bg-purple-500 hover:bg-purple-600' : isFocused(2) ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-black/20'}`}>
                    <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(50) ? 'text-white' : isFocused(2) ? 'text-blue-800' : 'text-black'}`}>+50</span>
                </div>
                <div onClick={() => { setIsKeyboardNavigation(false); setDiff(4) }} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(100) ? 'bg-purple-500 hover:bg-purple-600' : isFocused(3) ? 'bg-blue-200 hover:bg-blue-300' : 'hover:bg-black/20'}`}>
                    <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(100) ? 'text-white' : isFocused(3) ? 'text-blue-800' : 'text-black'}`}>+100</span>
                </div>
            </div>

            {/* Mobile: Just the toggle button */}
            <div onClick={() => { setIsKeyboardNavigation(false); props.toggleMenu() }} className="lg:hidden w-18 aspect-square flex justify-center items-center cursor-pointer hover:bg-black/20 transition-all duration-300 ease-in-out rounded-full">
                <ChevronRight size={22} color='gray' strokeWidth={2} className={`transition-transform duration-300 ${props.isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </div>
        </div>
    );
};

export default Dropdown;