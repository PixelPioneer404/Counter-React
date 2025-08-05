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

    return (
        <div className={`absolute inset-0 rounded-full flex justify-center items-center bg-white shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${props.isOpen ? 'w-[360px]' : 'w-18'} h-full`}>
            <div onClick={() => { props.toggleMenu() }} className="w-18 aspect-square flex justify-center items-center cursor-pointer hover:bg-black/20 transition-all duration-300 ease-in-out rounded-full flex-shrink-0">
                <ChevronRight size={22} color='gray' strokeWidth={2} className={`transition-transform duration-300 ${props.isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            <div onClick={() => {setDiff(1)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full hover:bg-black/20 transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden`}>
                <span className={`transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}>+1</span>
            </div>
            <div onClick={() => {setDiff(2)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full hover:bg-black/20 transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden`}>
                <span className={`transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}>+10</span>
            </div>
            <div onClick={() => {setDiff(3)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full hover:bg-black/20 transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden`}>
                <span className={`transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}>+50</span>
            </div>
            <div onClick={() => {setDiff(4)}} className={`${props.isOpen ? 'w-18' : 'w-0'} aspect-square flex cursor-pointer justify-center items-center rounded-full hover:bg-black/20 transition-all duration-500 ease-in-out flex-shrink-0 overflow-hidden`}>
                <span className={`transition-opacity duration-300 ${props.isOpen ? 'opacity-100' : 'opacity-0'}`}>+100</span>
            </div>
        </div>
    );
};

export default Dropdown;