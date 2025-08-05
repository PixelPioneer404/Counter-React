import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const Dropdown = (props) => {

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
    }

    // Helper function to check if option is active
    const isActive = (value) => {
        return props.currentDiff === value;
    }

    return (
        <div className={`absolute inset-0 rounded-full flex justify-center items-center bg-white shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${props.isOpen ? 'w-[360px]' : 'w-18'} h-full`}>
            <div onClick={() => { props.toggleMenu() }} className="w-18 aspect-square flex justify-center items-center cursor-pointer hover:bg-black/20 transition-all duration-300 ease-in-out rounded-full flex-shrink-0">
                <ChevronRight size={22} color='gray' strokeWidth={2} className={`transition-transform duration-300 ${props.isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            <div onClick={() => {setDiff(1)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(1) ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-black/20'}`}>
                <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(1) ? 'text-white' : 'text-black'}`}>+1</span>
            </div>
            <div onClick={() => {setDiff(2)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(10) ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-black/20'}`}>
                <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(10) ? 'text-white' : 'text-black'}`}>+10</span>
            </div>
            <div onClick={() => {setDiff(3)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(50) ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-black/20'}`}>
                <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(50) ? 'text-white' : 'text-black'}`}>+50</span>
            </div>
            <div onClick={() => {setDiff(4)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden ${isActive(100) ? 'bg-purple-500 hover:bg-purple-600' : 'hover:bg-black/20'}`}>
                <span className={`transition-opacity duration-300 font-medium ${props.isOpen ? 'opacity-100' : 'opacity-0'} ${isActive(100) ? 'text-white' : 'text-black'}`}>+100</span>
            </div>
        </div>
    );
};

export default Dropdown;